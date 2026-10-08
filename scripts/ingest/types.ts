// Schema comum de vaga normalizada — todo adapter de fonte (scripts/ingest/sources/*.ts)
// retorna RawJob[], independente de como a fonte original representa os dados.
// Ver ingest-plan.md § "Schema comum" para o racional de cada campo.

export type JobSource = 'gupy' | 'greenhouse' | 'lever' | 'ashby' | 'remotive' | 'remoteok' | 'adzuna' | 'fourdayweek' | 'weworkremotely';

export type Workplace = 'remote' | 'hybrid' | 'onsite';

export type Origin = 'br' | 'intl';

export interface RawJob {
  source: JobSource;
  externalId: string;
  title: string;
  company: string;
  description: string;
  url: string;
  location?: string;
  workplace?: Workplace;
  publishedAt: string;
  origin: Origin;
  salary?: string; // texto já formatado pelo adapter — cada fonte representa salário de um jeito bem diferente
}

export interface TargetCompany {
  name: string;
  ats: 'greenhouse' | 'lever' | 'ashby';
  slug: string;
  origin: Origin;
}
