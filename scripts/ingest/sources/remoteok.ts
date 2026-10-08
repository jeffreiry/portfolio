import type { RawJob } from '../types.ts';
import { htmlToText } from '../html-to-text.ts';
import { isDesignRole } from '../design-role-filter.ts';

interface RemoteOkJob {
  id: string;
  slug: string;
  position: string;
  company: string;
  description: string;
  tags: string[];
  location?: string;
  url: string;
  date: string;
  salary_min?: number;
  salary_max?: number;
}

// API pública sem chave (remoteok.com/api) — a própria resposta já pede
// atribuição com link de volta (primeiro item do array é um aviso legal, não
// uma vaga; por isso o .slice(1)). ACHADO (2026-10-08): a tag "design" do
// array `tags` é genérica demais pra filtrar — aparece em vagas de PM, infra,
// vendas etc. sem relação nenhuma com design de produto (ex.: "Senior .NET
// Software Engineer" vem com tag "design"). Filtra só pelo título, como os
// adapters sem busca por termo real. Também: o endpoint grátis devolve só as
// ~100 vagas mais recentes de TODAS as categorias (sem paginação/filtro
// server-side), então o yield de design é baixo (~1-2 vagas relevantes por
// rodada) — mantido mesmo assim por ser custo zero e já citado como fonte
// futura no ingest-plan.md.
function toSalary(job: RemoteOkJob): string | undefined {
  if (!job.salary_min || !job.salary_max) return undefined;
  return `US$ ${job.salary_min.toLocaleString('en-US')}–${job.salary_max.toLocaleString('en-US')}`;
}

function hasBrazil(job: RemoteOkJob): boolean {
  return /brazil|brasil/i.test(job.location ?? '');
}

export async function fetchRemoteOkJobs(): Promise<RawJob[]> {
  const res = await fetch('https://remoteok.com/api', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; jobanalysis-ingest/1.0)' },
  });
  if (!res.ok) {
    throw new Error(`RemoteOK respondeu ${res.status}`);
  }
  const data = (await res.json()) as unknown[];
  const jobs = data.slice(1) as RemoteOkJob[]; // [0] é o aviso legal, não vaga

  return jobs
    .filter((job) => isDesignRole(job.position))
    .map((job) => ({
      source: 'remoteok',
      externalId: job.id,
      title: job.position,
      company: job.company,
      description: htmlToText(job.description),
      url: job.url,
      location: job.location || undefined,
      // Board 100% remoto por definição — mesmo princípio do Remotive/WWR.
      workplace: 'remote',
      publishedAt: job.date,
      origin: hasBrazil(job) ? 'br' : 'intl',
      salary: toSalary(job),
    }));
}
