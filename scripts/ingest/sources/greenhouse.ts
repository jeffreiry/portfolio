import type { RawJob, TargetCompany } from '../types.ts';
import { htmlToText } from '../html-to-text.ts';
import { isDesignRole } from '../design-role-filter.ts';

interface GreenhouseJob {
  id: number;
  title: string;
  company_name: string;
  absolute_url: string;
  updated_at: string;
  first_published?: string;
  location?: { name?: string };
  content?: string;
}

interface GreenhouseResponse {
  jobs: GreenhouseJob[];
}

function detectWorkplace(location: string | undefined): RawJob['workplace'] {
  if (!location) return undefined;
  const l = location.toLowerCase();
  if (l.includes('remote') || l.includes('remoto')) return 'remote';
  if (l.includes('hybrid') || l.includes('híbrido') || l.includes('hibrido')) return 'hybrid';
  return 'onsite';
}

export async function fetchGreenhouseJobs(target: TargetCompany): Promise<RawJob[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${target.slug}/jobs?content=true`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Greenhouse board "${target.slug}" (${target.name}) respondeu ${res.status}`);
  }
  const data = (await res.json()) as GreenhouseResponse;

  // O endpoint devolve o board INTEIRO da empresa (engenharia, vendas, etc.)
  // — sem filtro por termo no servidor, diferente do Gupy (MCP já busca por
  // termo). Filtra aqui antes de virar RawJob, senão a fila enche de vaga
  // irrelevante (2557 vagas de 12 empresas num teste real, quase todas fora
  // de design).
  return data.jobs.filter((job) => isDesignRole(job.title)).map((job) => ({
    source: 'greenhouse',
    externalId: String(job.id),
    title: job.title,
    company: target.name,
    description: job.content ? htmlToText(job.content) : '',
    url: job.absolute_url,
    location: job.location?.name,
    workplace: detectWorkplace(job.location?.name),
    publishedAt: job.first_published ?? job.updated_at,
    origin: target.origin,
  }));
}
