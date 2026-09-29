import type { RawJob } from './types.ts';
import { classifySeniority, type Seniority } from './classify.ts';

export interface ClassifiedJob extends RawJob {
  seniority: Seniority;
  priorityRank: number; // menor = mais prioritário
}

// Cota como PRIORIDADE, não corte duro (ingest-plan.md § Pipeline): origem
// br mira ~80% Sr / 20% Pleno; intl mira ~50/50. Vaga fora da cota-alvo não é
// descartada — só entra com priorityRank maior (analisada depois, ou fica
// pra trás se o volume do dia estourar algum limite de custo/rate).
function rankFor(origin: RawJob['origin'], seniority: Seniority): number {
  if (origin === 'br') {
    if (seniority === 'sr') return 0;
    if (seniority === 'pleno') return 1;
    if (seniority === 'junior') return 3;
    return 2; // não classificado — nem alvo nem excluído, prioridade média
  }
  // intl: sr e pleno empatam na prioridade (cota 50/50)
  if (seniority === 'sr' || seniority === 'pleno') return 0;
  if (seniority === 'junior') return 2;
  return 1;
}

export function prioritizeJobs(jobs: RawJob[]): ClassifiedJob[] {
  const classified = jobs.map((job) => {
    const seniority = classifySeniority(job.title);
    return { ...job, seniority, priorityRank: rankFor(job.origin, seniority) };
  });

  return classified.sort((a, b) => {
    if (a.priorityRank !== b.priorityRank) return a.priorityRank - b.priorityRank;
    // Dentro do mesmo rank, vaga mais recente primeiro.
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
