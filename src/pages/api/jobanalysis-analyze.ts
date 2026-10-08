export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
  toSlug,
  calcScore,
  rewriteScoreSection,
  scoreLabel,
  classifySenioridade,
  extractWithGroq,
  analyzeWithClaude,
  type JdExtracted,
} from '../../lib/jobanalysis/core';

// ---- Handler principal ----

export const POST: APIRoute = async ({ request }) => {
  const _env      = process.env;
  const groqKey   = _env['GROQ_API_KEY']      ?? import.meta.env.GROQ_API_KEY;
  const claudeKey = _env['ANTHROPIC_API_KEY'] ?? import.meta.env.ANTHROPIC_API_KEY;

if (!groqKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY não configurada no .env' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!claudeKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada no .env' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { jd, slug: existingSlug } = await request.json();
    if (!jd?.trim()) {
      return new Response(JSON.stringify({ error: 'Cole a descrição da vaga.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // Passo 1: Groq extrai estrutura da JD
    let extracted: JdExtracted;
    try {
      extracted = await extractWithGroq(jd, groqKey);
    } catch (e) {
      console.error('[jobanalysis] Groq extraction failed:', e);
      const msg = e instanceof Error ? e.message : '';
      throw new Error(msg.includes('cortada por exceder') ? msg : 'Falha na extração da JD. Verifique o formato e tente novamente.');
    }

    if (!extracted.empresa || !extracted.cargo) {
      throw new Error('Não consegui identificar a empresa e/ou o cargo no texto colado. Cole a vaga completa, incluindo o nome da empresa e o título do cargo (não só a lista de requisitos).');
    }

    // Passo 2: Claude analisa os requisitos
    let raw: string;
    try {
      raw = await analyzeWithClaude(extracted, jd, claudeKey);
    } catch (e) {
      console.error('[jobanalysis] Claude analysis failed:', e);
      // Erros conhecidos (ex: truncamento por max_tokens) já vêm com mensagem
      // acionável — propaga em vez de esconder atrás do genérico.
      const msg = e instanceof Error ? e.message : '';
      throw new Error(msg.includes('cortada por exceder') ? msg : 'Falha na análise. Tente novamente.');
    }

    const [mdRaw, metaRaw] = raw.split('---METADATA---');
    if (!mdRaw || !metaRaw) throw new Error('Resposta fora do formato esperado.');

    let meta: Record<string, unknown>;
    try {
      meta = JSON.parse(metaRaw.trim());
    } catch {
      throw new Error('Metadados inválidos na resposta.');
    }

    const today = new Date().toISOString().slice(0, 10);
    const data  = extracted.data || String(meta.data ?? '').trim() || today;

    // Recalcula score deterministicamente — ignora o que o Claude colocou
    const calc  = calcScore(mdRaw);
    const score = calc.ok ? calc.score : 0;

    let finalMd = mdRaw.trim();
    finalMd = finalMd.replace(/\*\*Data da vaga:\*\*[^\n]*/, `**Data da vaga:** ${data}`);
    if (calc.ok) finalMd = rewriteScoreSection(finalMd, calc);

    // Carimbo determinístico (mesmo padrão do score) — alimenta o indicador de
    // "dias parado" no painel. Nunca deixado pro Claude escrever: a data real
    // de quando ESTE arquivo foi gravado é fato do servidor, não julgamento do modelo.
    const hojeISO = new Date().toISOString().slice(0, 10);
    finalMd = finalMd.includes('**Status atualizado em:**')
      ? finalMd.replace(/\*\*Status atualizado em:\*\*[^\n]*/, `**Status atualizado em:** ${hojeISO}`)
      : finalMd.replace(/(\*\*Status:\*\*[^\n]*)/, `$1\n**Status atualizado em:** ${hojeISO}`);

    // Slug e escrita (só funciona localmente — Vercel tem filesystem read-only)
    let slug = existingSlug?.trim() || toSlug(`${extracted.empresa}-${extracted.cargo}`);
    let duplicateSlugWarning: string | undefined;
    try {
      let filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
      if (!existingSlug && existsSync(filePath)) {
        const originalSlug = slug;
        slug = `${slug}-${Date.now()}`;
        filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
        // Antes isso era silencioso e só descoberto meses depois (2x já) por
        // leitura manual da pasta — agora sobe pro response pra aparecer na UI.
        duplicateSlugWarning = `Já existe um arquivo "${originalSlug}.md" — esta vaga foi salva como "${slug}.md". Confira se não é duplicata antes de manter os dois.`;
        console.warn(`[jobanalysis] Slug collision: "${originalSlug}" já existe, salvando como "${slug}"`);
      }
      // Reanálise reescreve o arquivo inteiro — preserva o link da vaga (campo
      // manual), a marca de origem, salário, localização e modalidade (quando
      // a ficha veio da ingestão automática) — nenhum desses é algo que este
      // fluxo gera.
      if (existingSlug && existsSync(filePath)) {
        const prevContent = readFileSync(filePath, 'utf-8');
        const prevLink       = prevContent.match(/\*\*Link da vaga:\*\*[^\n]*/)?.[0];
        const prevOrigem     = prevContent.match(/\*\*Origem:\*\*[^\n]*/)?.[0];
        const prevSalario    = prevContent.match(/\*\*Salário:\*\*[^\n]*/)?.[0];
        const prevLocalizacao = prevContent.match(/\*\*Localização:\*\*[^\n]*/)?.[0];
        const prevModalidade  = prevContent.match(/\*\*Modalidade:\*\*[^\n]*/)?.[0];
        if (prevLink && !finalMd.includes('**Link da vaga:**')) {
          finalMd = finalMd.replace(/(\*\*Data da vaga:\*\*[^\n]*)/, (m) => `${m}\n${prevLink}`);
        }
        if (prevOrigem && !finalMd.includes('**Origem:**')) {
          const anchor = finalMd.includes('**Link da vaga:**') ? /(\*\*Link da vaga:\*\*[^\n]*)/ : /(\*\*Data da vaga:\*\*[^\n]*)/;
          finalMd = finalMd.replace(anchor, (m) => `${m}\n${prevOrigem}`);
        }
        if (prevSalario && !finalMd.includes('**Salário:**')) {
          const anchor = finalMd.includes('**Origem:**') ? /(\*\*Origem:\*\*[^\n]*)/ : /(\*\*Data da vaga:\*\*[^\n]*)/;
          finalMd = finalMd.replace(anchor, (m) => `${m}\n${prevSalario}`);
        }
        if ((prevLocalizacao || prevModalidade) && !finalMd.includes('**Localização:**')) {
          const anchor = finalMd.includes('**Salário:**') ? /(\*\*Salário:\*\*[^\n]*)/ : /(\*\*Origem:\*\*[^\n]*)/;
          const bits = [prevLocalizacao, prevModalidade].filter(Boolean).join('\n');
          finalMd = finalMd.replace(anchor, (m) => `${m}\n${bits}`);
        }
      }
      writeFileSync(filePath, finalMd + '\n', 'utf-8');
    } catch {
      // Silencioso em produção — filesystem read-only na Vercel
    }

    // Parseia gaps para retornar ao card
    const gapsSection = finalMd.split(/## Gaps prioritários/i)[1] ?? '';
    function gapItems(pat: RegExp, strip: RegExp): string[] {
      const m = gapsSection.match(pat);
      const raw = m?.[1]?.trim() ?? '';
      if (!raw || raw.toLowerCase().startsWith('nenhum')) return [];
      return raw.split('\n')
        .map((l) => l.replace(strip, '').trim())
        // Divisor de seção ("---") às vezes fica dentro do bloco capturado quando
        // o Claude o insere antes do próximo "###" — não é item de lista.
        .filter((l) => Boolean(l) && !/^-{3,}$/.test(l));
    }
    const bloqueadores = gapItems(/### 🔴 Bloqueadores[^\n]*\n\n([\s\S]*?)(?=\n###|$)/, /^\*\s*/);
    const ausentes     = gapItems(/### 🟡 Diferenciais ausentes[^\n]*\n\n([\s\S]*?)(?=\n###|$)/, /^\d+\.\s*/);
    const boaAderencia = gapItems(/### 🟢 Boa ader[eê]ncia[^\n]*\n\n([\s\S]*?)(?=\n###|$)/, /^[-*]\s*/);
    const origemAutomatica = finalMd.match(/\*\*Origem:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const salario = finalMd.match(/\*\*Salário:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const modalidade = finalMd.match(/\*\*Modalidade:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const localizacao = finalMd.match(/\*\*Localização:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const senioridade = classifySenioridade(extracted.nivel ?? '');

    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        duplicateSlugWarning,
        empresa:            extracted.empresa,
        produto:            extracted.produto,
        cargo:              extracted.cargo,
        score,
        interpretacao:      scoreLabel(score),
        interpretacaoTexto: String(meta.interpretacaoTexto ?? ''),
        status:             'A avaliar',
        candidatura:        'Não',
        data,
        tags:               [],
        atsPct:             null, // recalculado só no próximo reload — depende do tagsFull, não recomputado aqui
        atsMissing:         [],
        origemAutomatica,
        salario,
        modalidade,
        localizacao,
        senioridade,
        bloqueadores,
        ausentes,
        boaAderencia,
        obtObrig:  calc.ok ? calc.somaObrig * 2 : 0,
        maxObrigW: calc.ok ? calc.maxObrig  * 2 : 0,
        obtPref:   calc.ok ? calc.somaPref      : 0,
        maxPrefW:  calc.ok ? calc.maxPref       : 0,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('[jobanalysis-analyze]', e);
    const raw = e instanceof Error ? e.message : String(e);
    let msg = 'Erro ao analisar. Tente novamente.';
    if (raw.includes('429') || raw.toLowerCase().includes('quota') || raw.toLowerCase().includes('rate')) {
      msg = 'Limite de requisições atingido. Aguarde 1 minuto e tente novamente.';
    } else if (raw.includes('formato esperado')) {
      msg = 'A IA retornou um formato inesperado. Tente novamente.';
    } else if (raw.includes('ANTHROPIC_API_KEY')) {
      msg = 'ANTHROPIC_API_KEY não configurada.';
    } else if (raw.includes('extração') || raw.includes('identificar a empresa')) {
      msg = raw;
    }
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
