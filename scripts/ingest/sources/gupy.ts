import type { RawJob, Workplace } from '../types.ts';

// Gupy não tem API REST pública sem chave — só é acessível via MCP
// (mcp__Gupy_MCP_-_Candidato__search_jobs), que só um agente Claude consegue
// chamar (não um script Node puro). Por isso este arquivo só normaliza — quem
// busca é o run agêntico (ver ingest-plan.md § Fontes), que grava o resultado
// bruto do search_jobs num JSON e o orchestrate.ts lê com --gupy-json.

export interface GupySearchResult {
  id: number;
  companyId?: number;
  name: string;
  description: string;
  careerPageName: string;
  publishedDate: string;
  city?: string;
  state?: string;
  country?: string;
  jobUrl: string;
  workplaceType?: 'on-site' | 'remote' | 'hybrid';
  isConfidentialCareerPage?: boolean;
  salary?: { status: string; label: string };
}

function toWorkplace(w: GupySearchResult['workplaceType']): Workplace | undefined {
  if (w === 'on-site') return 'onsite';
  if (w === 'remote') return 'remote';
  if (w === 'hybrid') return 'hybrid';
  return undefined;
}

// Quando o país é Brasil, cidade+estado já diz tudo que importa (não repete
// "Brasil" no fim, redundante pra quase toda vaga do bench). Fora do Brasil, a
// combinação é mais rara e o país costuma ser a informação mais relevante.
function toLocation(job: GupySearchResult): string | undefined {
  const isBrasil = job.country === 'Brasil' || job.country === 'Brazil';
  if (isBrasil) {
    const parts = [job.city, job.state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : job.country;
  }
  const parts = [job.city, job.state, job.country].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : undefined;
}

// Gupy raramente traz o valor real ("not_disclosed" é a norma), mas quando
// traz, vale capturar — a própria ferramenta recomenda usar "salary.label"
// como resposta principal. Ignora o caso "não informado" pra não poluir a
// ficha com um campo que só diz "sem informação".
function toSalary(job: GupySearchResult): string | undefined {
  if (!job.salary || job.salary.status === 'not_disclosed') return undefined;
  return job.salary.label;
}

// careerPageName costuma ser o nome real da empresa, mas em alguns casos
// (visto ao testar contra dados reais: FCamara postando pro BTG) é um slogan
// de employer branding com emoji/hashtag ("VENHA SER #SANGUELARANJA 🧡🚀").
// get_company_by_id não ajuda — devolve o mesmo slogan, não existe campo de
// razão social na MCP. O subdomínio da URL (ex.: fcamara.gupy.io) é a pista
// mais confiável nesse caso, mesmo com capitalização imperfeita.
function looksLikeSlogan(name: string): boolean {
  return /#|[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(name);
}

function companyFromUrl(jobUrl: string): string | undefined {
  const match = jobUrl.match(/^https?:\/\/([a-z0-9-]+)\.gupy\.io\//i);
  if (!match) return undefined;
  const slug = match[1];
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function resolveCompany(job: GupySearchResult): string {
  if (looksLikeSlogan(job.careerPageName)) {
    return companyFromUrl(job.jobUrl) ?? job.careerPageName;
  }
  return job.careerPageName;
}

// A resposta já traz a JD completa em texto puro (sem HTML) — alimenta o
// analisador direto, sem precisar de um segundo fetch como no Greenhouse.
export function normalizeGupyJob(job: GupySearchResult): RawJob {
  return {
    source: 'gupy',
    externalId: String(job.id),
    title: job.name,
    // isConfidentialCareerPage é ignorado de propósito pra resolução de empresa
    // (ingest-plan.md) — careerPageName (ou o subdomínio, se for slogan) é o
    // nome público disponível de qualquer forma.
    company: resolveCompany(job),
    description: job.description,
    url: job.jobUrl,
    location: toLocation(job),
    workplace: toWorkplace(job.workplaceType),
    publishedAt: job.publishedDate,
    origin: !job.country || job.country === 'Brasil' ? 'br' : 'intl',
    salary: toSalary(job),
  };
}
