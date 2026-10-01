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
  excludeRestrictedRemote: boolean;
}

// Default = comportamento de hoje (tudo passa, só descarta banco de talentos,
// que nunca é uma vaga real aberta — nenhum motivo legítimo pra querer isso).
export const DEFAULT_INGEST_FILTERS: IngestFilters = {
  maxAgeDays: null,
  seniorities: ['sr', 'pleno', 'junior', 'null'],
  origins: ['br', 'intl'],
  workplaces: ['remote', 'hybrid', 'onsite', 'null'],
  excludeBancoDeTalentos: true,
  excludeRestrictedRemote: true,
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

// "Remote" sozinho não diz nada sobre elegibilidade — o problema real é
// "Remote - USA"/"Remote UK"/"Remote from the US": remoto de verdade, mas
// restrito a quem já tem autorização de trabalho naquele país específico.
// Achado real (2026-09-30): vagas assim passavam no filtro de modalidade
// (contêm "remote") mas são inviáveis pra candidatura do Brasil. Heurística
// de texto — pode ter falso positivo/negativo, por isso é configurável.
const REMOTE_ALLOWED_PATTERN = /brazil|brasil|latam|latin america|am[ée]rica latina|worldwide|global|anywhere/i;
const REMOTE_COUNTRY_PATTERN = /\b(usa?|u\.s\.a?\.?|united states|uk|u\.k\.|united kingdom|canada|australia|germany|france|netherlands|spain|portugal|ireland|poland|japan|singapore|india|mexico|argentina|chile|colombia|emea|apac)\b/i;

export function isRemoteRestrictedToOtherCountry(job: RawJob): boolean {
  if (job.workplace !== 'remote') return false;
  const text = job.location ?? '';
  if (!text) return false;
  if (REMOTE_ALLOWED_PATTERN.test(text)) return false;
  return REMOTE_COUNTRY_PATTERN.test(text);
}

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
    if (filters.excludeRestrictedRemote && isRemoteRestrictedToOtherCountry(job)) {
      skipped.push({ job, reason: `remoto restrito a outro país ("${job.location}")` });
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
