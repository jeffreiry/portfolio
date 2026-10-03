// Runner diário da camada de ingestão (ingest-plan.md).
//
// Estado atual (passo 6 da implementação incremental): 4 fontes — Greenhouse
// (config/target-companies.json), Gupy (JSON pré-buscado pelo run agêntico,
// --gupy-json), Remotive (sem chave, sempre roda) e Adzuna (roda só se
// ADZUNA_APP_ID/ADZUNA_APP_KEY estiverem no ambiente) — → dedup (dentro do
// lote + contra bench/ledger) → classificação/priorização → análise real
// (Groq+Claude via core.ts) → gate por score → escreve ficha ou digest →
// reconcilia o _index.md → registra no ledger.
//
// Por padrão continua em modo dry-run (só mostra a fila, não gasta API nem
// escreve nada). Use --live pra rodar de verdade, e --limit N pra controlar
// quantas vagas analisar numa passada (a fila já vem ordenada por prioridade).
// --skip-remotive pula essa fonte (ex.: pra não estourar o limite de chamadas/dia
// da API deles enquanto testa outra coisa repetidamente).
//
// Rodar (dry-run):
//   node --env-file=.env --experimental-strip-types scripts/ingest/orchestrate.ts [--gupy-json <path>]
// Rodar de verdade (gasta Groq/Claude, escreve no bench):
//   node --env-file=.env --experimental-strip-types scripts/ingest/orchestrate.ts --live --limit 3 [--gupy-json <path>]

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RawJob, TargetCompany } from './types.ts';
import { fetchGreenhouseJobs } from './sources/greenhouse.ts';
import { normalizeGupyJob, type GupySearchResult } from './sources/gupy.ts';
import { fetchRemotiveJobs } from './sources/remotive.ts';
import { fetchAdzunaJobs } from './sources/adzuna.ts';
import { prioritizeJobs, type ClassifiedJob } from './prioritize.ts';
import { loadBenchKeys, loadLedger, saveLedger, dedupJobs, dedupByUrl, ledgerKey, type Ledger } from './dedup.ts';
import { analyzeJob } from './analyze-job.ts';
import { shouldPromoteToFicha } from './gate.ts';
import { writeFicha, appendDigestEntry, reconcileIndex } from './bench-write.ts';
import { loadIngestFilters, applyPreFilters, passesSeniorityFilter } from './filters.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const BENCH_DIR = join(ROOT, 'Bench_job_applications');
const LEDGER_PATH = join(ROOT, 'data', 'ingest-ledger.json');
const FILTERS_PATH = join(ROOT, 'config', 'ingest-filters.json');

function loadTargetCompanies(): TargetCompany[] {
  const path = join(ROOT, 'config', 'target-companies.json');
  return JSON.parse(readFileSync(path, 'utf-8')) as TargetCompany[];
}

async function collectGreenhouse(targets: TargetCompany[]): Promise<RawJob[]> {
  const greenhouseTargets = targets.filter((t) => t.ats === 'greenhouse');
  const results: RawJob[] = [];
  for (const target of greenhouseTargets) {
    try {
      const jobs = await fetchGreenhouseJobs(target);
      console.log(`[greenhouse] ${target.name} (${target.slug}): ${jobs.length} vagas`);
      results.push(...jobs);
    } catch (e) {
      console.error(`[greenhouse] Falha em "${target.name}" (${target.slug}):`, e instanceof Error ? e.message : e);
    }
  }
  return results;
}

function loadGupyJobs(path: string): RawJob[] {
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as GupySearchResult[];
  const jobs = raw.map(normalizeGupyJob);
  console.log(`[gupy] ${path}: ${jobs.length} vagas normalizadas`);
  return jobs;
}

// Sem chave, sempre roda — uma chamada só (o parâmetro "search" da API grátis
// não filtra nada, ver comentário em sources/remotive.ts; o filtro por design
// acontece lá dentro, no lado do cliente). Respeita o aviso da própria API de
// no máximo ~4 chamadas/dia (o cron diário já fica bem abaixo disso).
async function collectRemotive(): Promise<RawJob[]> {
  try {
    const jobs = await fetchRemotiveJobs();
    console.log(`[remotive] ${jobs.length} vagas de design (filtradas no cliente)`);
    return jobs;
  } catch (e) {
    console.error('[remotive] Falha:', e instanceof Error ? e.message : e);
    return [];
  }
}

// País br + um mercado de fora, como o plano pede — ajustar esta lista
// conforme o volume/qualidade for validado nos primeiros runs reais.
const ADZUNA_SEARCHES: Array<{ country: string; term: string; origin: RawJob['origin'] }> = [
  { country: 'br', term: 'product designer', origin: 'br' },
  { country: 'us', term: 'product designer', origin: 'intl' },
];

async function collectAdzuna(appId: string, appKey: string): Promise<RawJob[]> {
  const results: RawJob[] = [];
  for (const { country, term, origin } of ADZUNA_SEARCHES) {
    try {
      const jobs = await fetchAdzunaJobs(country, term, appId, appKey, origin);
      console.log(`[adzuna] ${country}/"${term}": ${jobs.length} vagas`);
      results.push(...jobs);
    } catch (e) {
      console.error(`[adzuna] Falha em ${country}/"${term}":`, e instanceof Error ? e.message : e);
    }
  }
  return results;
}

function printQueue(jobs: ClassifiedJob[]) {
  for (const job of jobs) {
    console.log(`\n— [prioridade ${job.priorityRank}] ${job.company} · ${job.title}`);
    console.log(`  senioridade: ${job.seniority ?? 'não classificada'} · origem: ${job.origin}`);
    console.log(`  url: ${job.url}`);
    console.log(`  local: ${job.location ?? '⬜'} (${job.workplace ?? 'não detectado'})`);
    console.log(`  publicada em: ${job.publishedAt}`);
    console.log(`  descrição: ${job.description.slice(0, 140).replace(/\n/g, ' ')}...`);
  }
}

async function runLive(jobs: ClassifiedJob[], ledger: Ledger, groqKey: string, claudeKey: string) {
  const promoted: string[] = [];
  const digested: string[] = [];
  const failed: Array<{ job: ClassifiedJob; error: string }> = [];

  // Sequencial, não paralelo — evita estourar rate limit da Groq/Claude e
  // mantém o log legível durante teste manual.
  for (const job of jobs) {
    console.log(`\n[analisando] ${job.company} · ${job.title}`);
    try {
      const outcome = await analyzeJob(job, groqKey, claudeKey);
      const today = new Date().toISOString().slice(0, 10);

      if (shouldPromoteToFicha(outcome.score)) {
        const finalSlug = writeFicha(BENCH_DIR, outcome.slug, outcome.finalMd);
        reconcileIndex(join(BENCH_DIR, '_index.md'), [{
          titulo: outcome.cargo,
          slug: finalSlug,
          empresa: outcome.empresa,
          produto: outcome.produto,
          score: outcome.score,
          interpretacao: outcome.interpretacao,
          status: 'A avaliar',
          data: today,
        }]);
        ledger[ledgerKey(job)] = { status: 'promovida', score: outcome.score, evaluatedAt: today };
        promoted.push(`${finalSlug}.md (${outcome.score}%)`);
        console.log(`  ✅ promovida — ${outcome.score}% — Bench_job_applications/${finalSlug}.md`);
      } else {
        appendDigestEntry(BENCH_DIR, {
          titulo: outcome.cargo,
          empresa: outcome.empresa,
          score: outcome.score,
          data: today,
          url: job.url,
        });
        ledger[ledgerKey(job)] = { status: 'reprovada', score: outcome.score, evaluatedAt: today };
        digested.push(`${outcome.empresa} · ${outcome.cargo} (${outcome.score}%)`);
        console.log(`  ⬇️  abaixo do gate — ${outcome.score}% — foi pro _digest.md`);
      }

      // Grava a cada vaga (não só no fim) — uma falha na vaga N não perde o
      // progresso de 1..N-1 já processadas.
      saveLedger(LEDGER_PATH, ledger);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      failed.push({ job, error: msg });
      console.error(`  ❌ falhou: ${msg}`);
    }
  }

  console.log(`\n[ingest] Resumo: ${promoted.length} promovidas, ${digested.length} no digest, ${failed.length} falharam`);
  if (promoted.length > 0) console.log('  Promovidas:', promoted.join(', '));
  if (failed.length > 0) {
    console.log('  Falhas:');
    for (const f of failed) console.log(`    - ${f.job.company} · ${f.job.title}: ${f.error}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const live = args.includes('--live');
  const gupyJsonIdx = args.indexOf('--gupy-json');
  const gupyJsonPath = gupyJsonIdx !== -1 ? args[gupyJsonIdx + 1] : undefined;
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? Number(args[limitIdx + 1]) : undefined;

  const targets = loadTargetCompanies();
  const jobs: RawJob[] = [];

  if (targets.length === 0) {
    console.log(
      '[ingest] config/target-companies.json está vazio — nenhuma empresa-alvo configurada ainda.\n' +
      '[ingest] Adicione entradas { "name", "ats": "greenhouse", "slug", "origin" } pra testar o adapter.'
    );
  } else {
    jobs.push(...(await collectGreenhouse(targets)));
  }

  if (gupyJsonPath) {
    jobs.push(...loadGupyJobs(gupyJsonPath));
  }

  if (!args.includes('--skip-remotive')) {
    jobs.push(...(await collectRemotive()));
  }

  const adzunaAppId  = process.env['ADZUNA_APP_ID'];
  const adzunaAppKey = process.env['ADZUNA_APP_KEY'];
  if (adzunaAppId && adzunaAppKey) {
    jobs.push(...(await collectAdzuna(adzunaAppId, adzunaAppKey)));
  } else {
    console.log('[adzuna] ADZUNA_APP_ID/ADZUNA_APP_KEY não configuradas — pulando esta fonte.');
  }

  if (jobs.length === 0) return;

  // Dedup DENTRO do lote antes de qualquer outra coisa — uma fonte term-based
  // (Remotive) pode repetir a mesma vaga em termos de busca diferentes.
  const uniqueJobs = dedupByUrl(jobs);
  console.log(`\n[ingest] Total normalizado: ${jobs.length} vagas (${uniqueJobs.length} únicas por URL)`);

  // Filtros configuráveis (config/ingest-filters.json, editável pelo modal
  // "Config. Ingestão" em /jobanalysis) — origem, idade máxima e banco de
  // talentos rodam aqui, antes do dedup contra bench/ledger, pra descartar
  // cedo o que nunca seria analisado mesmo.
  const filters = loadIngestFilters(FILTERS_PATH);
  const { survivors: preFiltered, skipped: filteredOut } = applyPreFilters(uniqueJobs, filters);
  if (filteredOut.length > 0) {
    console.log(`[ingest] Descartadas pelos filtros de config: ${filteredOut.length}`);
  }

  // Dedup contra o bench (fichas já escritas) e o ledger (URLs já avaliadas,
  // inclusive reprovadas) — não vale a pena gastar token reanalisando o que
  // já se sabe.
  const benchKeys = loadBenchKeys(BENCH_DIR);
  const ledger    = loadLedger(LEDGER_PATH);
  const { survivors, skipped } = dedupJobs(preFiltered, benchKeys, ledger);

  // Cota como prioridade, não corte duro: classifica por senioridade e ordena
  // os sobreviventes pela cota-alvo de cada origem (br ~80% Sr/20% Pleno,
  // intl ~50/50) — quem não bate a cota ainda entra, só depois na fila.
  // O filtro de senioridade do config roda só aqui, porque é o primeiro ponto
  // em que a vaga já sabe sua própria senioridade classificada.
  const prioritizedAll = prioritizeJobs(survivors);
  const prioritized = prioritizedAll.filter((j) => passesSeniorityFilter(j.seniority, filters));
  const queue = limit !== undefined ? prioritized.slice(0, limit) : prioritized;

  console.log(`[ingest] Descartadas por dedup: ${skipped.length} (${skipped.filter((s) => s.reason === 'ja-no-bench').length} já no bench, ${skipped.filter((s) => s.reason === 'ja-no-ledger').length} já no ledger)`);
  if (prioritizedAll.length !== prioritized.length) {
    console.log(`[ingest] Descartadas por senioridade fora do filtro: ${prioritizedAll.length - prioritized.length}`);
  }
  console.log(`[ingest] Sobreviventes pra análise: ${prioritized.length}${limit !== undefined ? ` (rodando só ${queue.length} por causa de --limit)` : ''}`);

  if (!live) {
    printQueue(queue);
    console.log(
      '\n[ingest] Dry-run: nenhuma vaga foi analisada (Groq/Claude) nem escrita no bench.\n' +
      '[ingest] Rode com --live (e opcionalmente --limit N) pra analisar de verdade.'
    );
    return;
  }

  const _env      = process.env;
  const groqKey   = _env['GROQ_API_KEY'];
  const claudeKey = _env['ANTHROPIC_API_KEY'];
  if (!groqKey || !claudeKey) {
    console.error(
      '[ingest] GROQ_API_KEY e/ou ANTHROPIC_API_KEY não encontradas em process.env.\n' +
      '[ingest] Rode com: node --env-file=.env --experimental-strip-types scripts/ingest/orchestrate.ts --live'
    );
    process.exitCode = 1;
    return;
  }

  await runLive(queue, ledger, groqKey, claudeKey);
}

main();
