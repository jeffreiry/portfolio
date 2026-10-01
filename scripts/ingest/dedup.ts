import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RawJob } from './types.ts';
import { toSlug } from '../../src/lib/jobanalysis/core.ts';

export interface LedgerEntry {
  status: 'promovida' | 'reprovada';
  score: number;
  evaluatedAt: string;
}

export type Ledger = Record<string, LedgerEntry>;

export interface BenchKeys {
  slugs: Set<string>;
  urls: Set<string>;
}

// Lê o bench atual pra saber o que já existe: slug do arquivo (nome do
// arquivo, sem .md) e a URL manual opcional (**Link da vaga:**, quando
// preenchida). Ignora _index.md, que não é uma ficha de vaga.
export function loadBenchKeys(benchDir: string): BenchKeys {
  const slugs = new Set<string>();
  const urls  = new Set<string>();

  if (!existsSync(benchDir)) return { slugs, urls };

  for (const file of readdirSync(benchDir)) {
    if (!file.endsWith('.md') || file === '_index.md') continue;
    slugs.add(file.replace(/\.md$/, ''));

    const content = readFileSync(join(benchDir, file), 'utf-8');
    const linkMatch = content.match(/\*\*Link da vaga:\*\*\s*(\S+)/);
    if (linkMatch) urls.add(linkMatch[1]);
  }

  return { slugs, urls };
}

// Registro de URLs já avaliadas (inclusive reprovadas) — para não requeimar
// token reanalisando todo dia uma vaga de score baixo que já foi vista.
export function loadLedger(path: string): Ledger {
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, 'utf-8')) as Ledger;
}

export function saveLedger(path: string, ledger: Ledger): void {
  writeFileSync(path, JSON.stringify(ledger, null, 2) + '\n', 'utf-8');
}

// Slug aproximado pré-análise (mesma função usada em jobanalysis-analyze.ts,
// mas com company/title crus da fonte — não passou pela extração do Groq
// ainda). Serve só pra filtrar duplicata óbvia antes de gastar token; o slug
// final e a colisão real são resolvidos na escrita, como já acontece hoje.
export function approximateSlug(job: RawJob): string {
  return toSlug(`${job.company}-${job.title}`);
}

// Dedup DENTRO do próprio lote coletado — necessário porque uma fonte
// term-based (Remotive) pode devolver a mesma vaga em buscas por termos
// diferentes ("product designer" e "ux designer" acertando o mesmo posting).
// Sem isso, a mesma URL entraria duas vezes na fila e seria analisada (e
// gastaria API) duas vezes na MESMA rodada, antes do bench/ledger existirem
// pra pegar a duplicata.
//
// Além da URL exata, também dedupa por (empresa+cargo+início da descrição) —
// achado real (2026-09-30): a Adzuna publica o MESMO anúncio uma vez por
// escritório/cidade, cada um com um ID/URL de anúncio diferente (5 URLs
// distintas pra "Cerity Partners · Product Designer", texto idêntico). Sem
// isso, a mesma vaga seria analisada várias vezes na mesma rodada. O início
// da descrição entra na chave pra não fundir por engano duas vagas
// genuinamente diferentes que só coincidem em empresa+título (caso real:
// FCamara posta "Product Designer Sênior" pra clientes diferentes).
export function dedupByUrl(jobs: RawJob[]): RawJob[] {
  const seenUrls = new Set<string>();
  const seenContent = new Set<string>();
  const result: RawJob[] = [];
  for (const job of jobs) {
    if (seenUrls.has(job.url)) continue;
    const contentKey = `${job.source}|${job.company.toLowerCase()}|${job.title.toLowerCase()}|${job.description.slice(0, 150).toLowerCase()}`;
    if (seenContent.has(contentKey)) continue;
    seenUrls.add(job.url);
    seenContent.add(contentKey);
    result.push(job);
  }
  return result;
}

export interface DedupResult {
  survivors: RawJob[];
  skipped: Array<{ job: RawJob; reason: 'ja-no-bench' | 'ja-no-ledger' }>;
}

export function dedupJobs(jobs: RawJob[], bench: BenchKeys, ledger: Ledger): DedupResult {
  const survivors: RawJob[] = [];
  const skipped: DedupResult['skipped'] = [];

  for (const job of jobs) {
    if (bench.urls.has(job.url) || bench.slugs.has(approximateSlug(job))) {
      skipped.push({ job, reason: 'ja-no-bench' });
      continue;
    }
    if (ledger[job.url]) {
      skipped.push({ job, reason: 'ja-no-ledger' });
      continue;
    }
    survivors.push(job);
  }

  return { survivors, skipped };
}
