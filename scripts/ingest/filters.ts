import { existsSync, readFileSync } from 'node:fs';
import type { RawJob } from './types.ts';
import type { Seniority } from './classify.ts';

export type SeniorityFilter = 'sr' | 'pleno' | 'junior' | 'null'; // 'null' = não classificada
export type WorkplaceFilter = 'remote' | 'hybrid' | 'onsite' | 'null'; // 'null' = não detectado

export interface IngestFilters {
  maxAgeDays: number | null; // null = sem limite
  seniorities: SeniorityFilter[];
  origins: Array<'br' | 'intl'>;
  workplaces: WorkplaceFilter[];
  excludeBancoDeTalentos: boolean;
}

// Default = comportamento de hoje (tudo passa, só descarta banco de talentos,
// que nunca é uma vaga real aberta — nenhum motivo legítimo pra querer isso).
export const DEFAULT_INGEST_FILTERS: IngestFilters = {
  maxAgeDays: null,
  seniorities: ['sr', 'pleno', 'junior', 'null'],
  origins: ['br', 'intl'],
  workplaces: ['remote', 'hybrid', 'onsite', 'null'],
  excludeBancoDeTalentos: true,
};

// Compartilhado entre orchestrate.ts (CLI) e a API route do modal de config
// (src/pages/api/ingest-config.ts) — um cérebro, dois consumidores, mesmo
// princípio do core.ts.
export function loadIngestFilters(path: string): IngestFilters {
  if (!existsSync(path)) return DEFAULT_INGEST_FILTERS;
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf-8'));
    return { ...DEFAULT_INGEST_FILTERS, ...parsed };
  } catch {
    return DEFAULT_INGEST_FILTERS;
  }
}

// "Banco de talentos" (ou "talent pool") não é uma vaga aberta de verdade —
// é cadastro contínuo de currículo. Analisar isso como se fosse uma vaga real
// gasta API e polui o board com um score que não representa uma candidatura
// possível (casos reais vistos num teste: New Vegas, Instituto Eldorado).
const BANCO_DE_TALENTOS_PATTERN = /banco de talentos|talent pool|talent bank/i;

export interface FilterSkip {
  job: RawJob;
  reason: string;
}

// Filtros que não dependem de classificação de senioridade — rodam antes do
// dedup, descartando cedo o que nunca seria analisado mesmo.
export function applyPreFilters(jobs: RawJob[], filters: IngestFilters): { survivors: RawJob[]; skipped: FilterSkip[] } {
  const survivors: RawJob[] = [];
  const skipped: FilterSkip[] = [];

  for (const job of jobs) {
    if (!filters.origins.includes(job.origin)) {
      skipped.push({ job, reason: `origem "${job.origin}" fora do filtro` });
      continue;
    }
    if (filters.maxAgeDays !== null) {
      const ageDays = (Date.now() - new Date(job.publishedAt).getTime()) / 86_400_000;
      if (ageDays > filters.maxAgeDays) {
        skipped.push({ job, reason: `publicada há mais de ${filters.maxAgeDays} dias` });
        continue;
      }
    }
    if (filters.excludeBancoDeTalentos && BANCO_DE_TALENTOS_PATTERN.test(job.title)) {
      skipped.push({ job, reason: 'banco de talentos' });
      continue;
    }
    if (!filters.workplaces.includes((job.workplace ?? 'null') as WorkplaceFilter)) {
      skipped.push({ job, reason: `modalidade "${job.workplace ?? 'não detectada'}" fora do filtro` });
      continue;
    }
    survivors.push(job);
  }

  return { survivors, skipped };
}

// Filtro de senioridade — roda DEPOIS da classificação (prioritizeJobs), já
// que o RawJob cru ainda não sabe sua própria senioridade.
export function passesSeniorityFilter(seniority: Seniority, filters: IngestFilters): boolean {
  return filters.seniorities.includes((seniority ?? 'null') as SeniorityFilter);
}
