import type { RawJob } from './types.ts';
import {
  extractWithGroq,
  analyzeWithClaude,
  calcScore,
  rewriteScoreSection,
  scoreLabel,
  toSlug,
} from '../../src/lib/jobanalysis/core.ts';

export interface AnalyzeOutcome {
  slug: string;
  score: number;
  empresa: string;
  produto: string;
  cargo: string;
  interpretacao: string;
  finalMd: string;
}

const SOURCE_LABELS: Record<RawJob['source'], string> = {
  gupy: 'Gupy',
  greenhouse: 'Greenhouse',
  lever: 'Lever',
  ashby: 'Ashby',
  remotive: 'Remotive',
  remoteok: 'RemoteOK',
  adzuna: 'Adzuna',
};

// Mesmo pipeline de jobanalysis-analyze.ts (Groq extrai → Claude analisa →
// servidor recalcula o score), só que a "JD colada" é a description já
// normalizada pelo adapter da fonte. Um cérebro, dois consumidores — nada
// aqui reimplementa scoring.
export async function analyzeJob(job: RawJob, groqKey: string, claudeKey: string): Promise<AnalyzeOutcome> {
  const extracted = await extractWithGroq(job.description, groqKey);

  // Empresa/cargo do adapter são mais confiáveis que a extração da prosa: o
  // Gupy/Greenhouse já entregam os dois como campos estruturados, então o
  // corpo do anúncio (a "description" que vira a JD analisada) frequentemente
  // não os repete por extenso — o prompt do Groq foi desenhado pra JD colada
  // manualmente (que tipicamente abre com "Empresa X contrata Cargo Y..."), e
  // falha em achar os dois quando o texto pula direto pras responsabilidades
  // (causa real de ~30% de falha observada num teste com 44 vagas do Gupy).
  // Fica só com o Groq a parte que exige parsing de verdade: a lista de
  // requisitos obrigatórios/preferenciais.
  extracted.empresa = job.company;
  extracted.cargo = job.title;

  const raw = await analyzeWithClaude(extracted, job.description, claudeKey);
  const [mdRaw, metaRaw] = raw.split('---METADATA---');
  if (!mdRaw || !metaRaw) throw new Error('Resposta do Claude fora do formato esperado.');

  // Só valida que veio JSON parseável — os campos do bloco de metadados são
  // eco do que já está em `extracted` (empresa/cargo/data), sem informação nova.
  try {
    JSON.parse(metaRaw.trim());
  } catch {
    throw new Error('Metadados inválidos na resposta do Claude.');
  }

  const today = new Date().toISOString().slice(0, 10);
  const data  = extracted.data || job.publishedAt.slice(0, 10) || today;

  const calc  = calcScore(mdRaw);
  const score = calc.ok ? calc.score : 0;

  let finalMd = mdRaw.trim();
  finalMd = finalMd.replace(/\*\*Data da vaga:\*\*[^\n]*/, `**Data da vaga:** ${data}`);
  if (calc.ok) finalMd = rewriteScoreSection(finalMd, calc);

  finalMd = finalMd.includes('**Status atualizado em:**')
    ? finalMd.replace(/\*\*Status atualizado em:\*\*[^\n]*/, `**Status atualizado em:** ${today}`)
    : finalMd.replace(/(\*\*Status:\*\*[^\n]*)/, `$1\n**Status atualizado em:** ${today}`);

  // Diferente do fluxo manual (onde o link é opcional e preenchido depois pelo
  // modal), aqui a URL de origem já é um fato conhecido do adapter — não é a
  // IA inventando o campo, é o mesmo tipo de carimbo determinístico que
  // "Status atualizado em" já é.
  if (!finalMd.includes('**Link da vaga:**')) {
    finalMd = finalMd.replace(/(\*\*Data da vaga:\*\*[^\n]*)/, (m) => `${m}\n**Link da vaga:** ${job.url}`);
  }

  // Marca a ficha como gerada pela ingestão automática, não pelo modal manual —
  // fica visível na UI (badge) pra diferenciar do que o autor colou à mão.
  if (!finalMd.includes('**Origem:**')) {
    finalMd = finalMd.replace(/(\*\*Link da vaga:\*\*[^\n]*)/, (m) => `${m}\n**Origem:** Ingestão automática (${SOURCE_LABELS[job.source]})`);
  }

  // Salário: fato do adapter (quando a fonte informa), não julgamento do
  // Claude — mesmo padrão do Link/Origem. Maioria das vagas não tem esse dado,
  // então só entra na ficha quando existe de verdade.
  if (job.salary && !finalMd.includes('**Salário:**')) {
    finalMd = finalMd.replace(/(\*\*Origem:\*\*[^\n]*)/, (m) => `${m}\n**Salário:** ${job.salary}`);
  }

  // Localização/Modalidade: mesmo princípio — o adapter já sabe isso (texto
  // bruto da fonte + classificação remote/hybrid/onsite), só não estava sendo
  // gravado na ficha. Achado real (2026-09-30): sem isso, dava pra saber que
  // uma vaga era "remota" mas não que era "Remote - USA" (remoto restrito a
  // outro país, inviável pra candidatura do Brasil) — a única forma de auditar
  // isso depois é ter o texto de localização original arquivado.
  const WORKPLACE_LABELS: Record<string, string> = { remote: 'Remoto', hybrid: 'Híbrido', onsite: 'Presencial' };
  if (!finalMd.includes('**Localização:**')) {
    const parts: string[] = [];
    if (job.location) parts.push(`**Localização:** ${job.location}`);
    if (job.workplace && WORKPLACE_LABELS[job.workplace]) parts.push(`**Modalidade:** ${WORKPLACE_LABELS[job.workplace]}`);
    if (parts.length > 0) {
      const anchor = finalMd.includes('**Salário:**') ? /(\*\*Salário:\*\*[^\n]*)/ : /(\*\*Origem:\*\*[^\n]*)/;
      finalMd = finalMd.replace(anchor, (m) => `${m}\n${parts.join('\n')}`);
    }
  }

  // Sobrescreve a seção "Job description original" com a JD real e completa
  // do adapter — o Claude recebe a JD inteira no prompt, mas, sem instrução
  // explícita no fluxo de ingestão (o prompt foi desenhado pro caso de JD
  // colada manualmente), às vezes deixa um resumo truncado ali ou até afirma
  // "arquivada acima" sem realmente reproduzir o texto. Isso quebra o
  // propósito da seção: permitir reconferir o score contra a fonte depois
  // (mesmo risco do caso Zuri que o audit:bench existe pra pegar). A JD real
  // é fato do adapter, não julgamento do Claude — mesmo princípio do score
  // recalculado e do carimbo de data.
  const jdSectionPattern = /(## Job description original\n\n)[\s\S]*?(\n+---\n+## Gaps prioritários)/;
  if (jdSectionPattern.test(finalMd)) {
    finalMd = finalMd.replace(jdSectionPattern, (_m, before, after) => `${before}${job.description}${after}`);
  }

  const slug = toSlug(`${extracted.empresa}-${extracted.cargo}`);

  return {
    slug,
    score,
    empresa: extracted.empresa,
    produto: extracted.produto,
    cargo: extracted.cargo,
    interpretacao: scoreLabel(score),
    finalMd: finalMd + '\n',
  };
}
