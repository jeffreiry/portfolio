import type { RawJob, Workplace } from '../types.ts';
import { isDesignRole } from '../design-role-filter.ts';

interface FourDayWeekLocation {
  city?: string;
  country?: string;
  continent?: string;
  work_arrangement?: string;
  is_primary?: boolean;
}

interface FourDayWeekCompany {
  name: string;
}

interface FourDayWeekJob {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  category: string;
  work_arrangement?: 'remote' | 'hybrid' | 'onsite';
  locations: FourDayWeekLocation[];
  posted_at: string;
  salary_min?: number | null;
  salary_max?: number | null;
  company: FourDayWeekCompany;
}

interface FourDayWeekResponse {
  data: FourDayWeekJob[];
  total: number;
}

// API pública v2, sem chave, achada e validada manualmente em 2026-10-08
// (docs em https://4dayweek.io/developers) — pede só link de volta como
// crédito, igual Remotive/RemoteOK. category=design já filtra no servidor,
// mas devolve TODA subdisciplina de design (gráfico, jogos, instrucional,
// industrial) misturada com produto/UX — isDesignRole() filtra de novo no
// título, igual os outros adapters sem busca por termo real.
function toWorkplace(w: FourDayWeekJob['work_arrangement']): Workplace | undefined {
  if (w === 'remote' || w === 'hybrid' || w === 'onsite') return w;
  return undefined;
}

function toLocation(job: FourDayWeekJob): string | undefined {
  const primary = job.locations.find((l) => l.is_primary) ?? job.locations[0];
  if (!primary) return undefined;
  return [primary.city, primary.country].filter(Boolean).join(', ') || undefined;
}

function hasBrazil(job: FourDayWeekJob): boolean {
  return job.locations.some((l) => l.country === 'Brazil');
}

// Valores em centavos de USD (doc da API) — sem conversão de moeda, só
// formata o número; "(estimado)" não existe aqui, a fonte não marca isso.
function toSalary(job: FourDayWeekJob): string | undefined {
  if (!job.salary_min || !job.salary_max) return undefined;
  const min = Math.round(job.salary_min / 100).toLocaleString('en-US');
  const max = Math.round(job.salary_max / 100).toLocaleString('en-US');
  return `US$ ${min}–${max}`;
}

export async function fetchFourDayWeekJobs(): Promise<RawJob[]> {
  const params = new URLSearchParams({ category: 'design', limit: '100', sort: 'date' });
  const res = await fetch(`https://4dayweek.io/api/v2/jobs?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`4 Day Week respondeu ${res.status}`);
  }
  const data = (await res.json()) as FourDayWeekResponse;

  return data.data
    .filter((job) => isDesignRole(job.title))
    .map((job) => ({
      source: 'fourdayweek',
      externalId: job.id,
      title: job.title,
      company: job.company?.name ?? 'Empresa não identificada',
      description: job.description,
      url: job.url,
      location: toLocation(job),
      workplace: toWorkplace(job.work_arrangement),
      publishedAt: job.posted_at,
      origin: hasBrazil(job) ? 'br' : 'intl',
      salary: toSalary(job),
    }));
}
