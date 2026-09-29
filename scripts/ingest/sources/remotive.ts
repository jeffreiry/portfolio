import type { RawJob } from '../types.ts';
import { htmlToText } from '../html-to-text.ts';
import { isDesignRole } from '../design-role-filter.ts';

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  category: string;
  company_name: string;
  candidate_required_location?: string;
  publication_date: string;
  description: string;
  salary?: string;
}

interface RemotiveResponse {
  jobs: RemotiveJob[];
}

// ATENÇÃO — limitação descoberta em teste manual (2026-09-28): o parâmetro
// "search" da API pública/grátis do Remotive NÃO filtra nada — uma chamada com
// search=designer devolveu exatamente a mesma lista que uma chamada sem
// nenhum parâmetro (mesmo job-count, mesmos títulos, incluindo vagas de
// desenvolvedor/vendas/etc. sem relação nenhuma com design). O aviso legal da
// API menciona uma versão paga ($5k/mês) — a busca por termo provavelmente só
// existe nela. Solução: busca sempre TODAS as vagas atuais e filtra no
// cliente por categoria/título — funciona porque o volume total do endpoint
// grátis é pequeno (~16 vagas no teste), não por paginação.
function matchesDesignRole(job: RemotiveJob): boolean {
  return job.category === 'Design' || isDesignRole(job.title);
}

// Remotive é bucket internacional por natureza (plan ingest-plan.md § Fontes)
// — não vale a pena tentar inferir 'br' de "candidate_required_location", que
// é texto livre e inconsistente (ex.: "USA", "Worldwide", "Europe"). Todo job
// é 100% remoto, por definição do produto.
export async function fetchRemotiveJobs(): Promise<RawJob[]> {
  const res = await fetch('https://remotive.com/api/remote-jobs');
  if (!res.ok) {
    throw new Error(`Remotive respondeu ${res.status}`);
  }
  const data = (await res.json()) as RemotiveResponse;

  return data.jobs.filter(matchesDesignRole).map((job) => ({
    source: 'remotive',
    externalId: String(job.id),
    title: job.title,
    company: job.company_name,
    description: htmlToText(job.description),
    url: job.url,
    location: job.candidate_required_location,
    workplace: 'remote',
    publishedAt: job.publication_date,
    origin: 'intl',
    // Vem vazio na maioria das vagas (campo opcional que o anunciante escolhe
    // preencher ou não) — só inclui quando a fonte realmente informou algo.
    salary: job.salary?.trim() || undefined,
  }));
}
