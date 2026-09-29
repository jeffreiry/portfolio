import type { RawJob, Origin } from '../types.ts';

interface AdzunaJob {
  id: string;
  title: string;
  description: string;
  redirect_url: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  created: string;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string; // "1" ou "0" — string mesmo, não boolean, como a API devolve
}

interface AdzunaResponse {
  results: AdzunaJob[];
}

// ATENÇÃO — limitação conhecida, ainda sem solução: diferente de Gupy/Greenhouse,
// o campo "description" da Adzuna é um SNIPPET truncado pela própria API, não a
// JD completa (não tem como pedir o texto inteiro nesse endpoint). O princípio
// "JD completa -> sem novo fetch" do schema comum (ingest-plan.md) não se
// sustenta aqui: analisar esse snippet direto vai gerar uma análise mais pobre
// que Gupy/Greenhouse, porque faltam requisitos que só estão no anúncio original
// (redirect_url). Buscar o texto completo exigiria scraping do site de destino,
// que varia por empresa/board e é frágil demais pra confiar sem revisão manual.
function detectWorkplace(text: string): RawJob['workplace'] {
  const l = text.toLowerCase();
  if (l.includes('remote') || l.includes('remoto') || l.includes('home office')) return 'remote';
  if (l.includes('hybrid') || l.includes('híbrido') || l.includes('hibrido')) return 'hybrid';
  return undefined;
}

// A Adzuna não expõe moeda no payload (varia pelo país da busca) — mostra só
// o número, sem inventar símbolo de moeda. "(estimado)" quando a própria API
// marca o valor como inferido por modelo, não informado pelo anunciante.
function toSalary(job: AdzunaJob): string | undefined {
  if (!job.salary_min || !job.salary_max) return undefined;
  const min = Math.round(job.salary_min).toLocaleString('pt-BR');
  const max = Math.round(job.salary_max).toLocaleString('pt-BR');
  const predicted = job.salary_is_predicted === '1' ? ' (estimado)' : '';
  return `${min}–${max}${predicted}`;
}

export async function fetchAdzunaJobs(
  country: string,
  searchTerm: string,
  appId: string,
  appKey: string,
  origin: Origin,
): Promise<RawJob[]> {
  // "content_type=application/json" (sugerido em alguma documentação da Adzuna)
  // quebra com 400 nesse endpoint — testado manualmente (2026-09-28). A resposta
  // já vem em JSON por padrão sem esse parâmetro.
  const params = new URLSearchParams({ app_id: appId, app_key: appKey, what: searchTerm });
  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Adzuna (${country}) respondeu ${res.status} pro termo "${searchTerm}"`);
  }
  const data = (await res.json()) as AdzunaResponse;

  return data.results.map((job) => ({
    source: 'adzuna',
    externalId: job.id,
    title: job.title,
    company: job.company?.display_name ?? 'Empresa não identificada',
    description: job.description,
    url: job.redirect_url,
    location: job.location?.display_name,
    workplace: detectWorkplace(`${job.title} ${job.description}`),
    publishedAt: job.created,
    origin,
    salary: toSalary(job),
  }));
}
