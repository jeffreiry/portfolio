// Áreas protegidas por senha. Cada área tem cookie e senha próprios,
// para que o acesso aos cases e ao bench (/jobanalysis) seja independente.
//
// Dentro da área "cases", a senha não se aplica a /work/* inteiro — só aos
// cases com `protected: true` no frontmatter (ver src/middleware.ts, que
// consulta a collection por slug antes de exigir login).

export type AreaId = 'cases' | 'jobanalysis';

/** Mapeia um pathname para a área protegida correspondente (ou null se pública). */
export function areaForPath(pathname: string): AreaId | null {
  if (pathname.startsWith('/work/') || pathname.startsWith('/pt/work/')) return 'cases';
  if (pathname.startsWith('/jobanalysis')) return 'jobanalysis';
  return null;
}

const WORK_PATH = /^\/(?:pt\/)?work\/([^/]+)\/?$/;

/** Extrai o slug de um pathname de case (/work/:slug ou /pt/work/:slug), ou null. */
export function workSlugFromPath(pathname: string): string | null {
  return pathname.match(WORK_PATH)?.[1] ?? null;
}

/** Nome do cookie de sessão por área. */
export const COOKIE: Record<AreaId, string> = {
  cases: 'portfolio_auth',
  jobanalysis: 'jobanalysis_auth',
};

// Acesso via `_env['VAR']` (não `import.meta.env.VAR` direto) de propósito —
// o Vite faz inlining estático de `import.meta.env.X` em build time, então
// se a env var não estivesse disponível no exato momento do build (cache de
// build, ordem de propagação na Vercel), o valor ficava CONGELADO errado no
// bundle compilado — permanentemente, até o próximo build, independente do
// que estivesse configurado depois. Já causou bypass de autenticação real
// (ver CHANGELOG). Mesmo padrão já usado em jobanalysis-analyze.ts.
const _env = process.env;

export function passwordFor(area: AreaId): string | undefined {
  if (area === 'jobanalysis') {
    return _env['JOBANALYSIS_PASSWORD'] ?? import.meta.env.JOBANALYSIS_PASSWORD;
  }
  return _env['PORTFOLIO_PASSWORD'] ?? import.meta.env.PORTFOLIO_PASSWORD;
}

// Token de link mágico: ?access=TOKEN em qualquer URL do site seta o cookie
// de sessão sem passar pelo /login. Só existe pra área "cases" (cases sob
// NDA) — separado da senha de propósito, pra dar pra revogar/trocar o link
// mandado a recrutadores sem mexer na senha manual. Não é pra ser digitado
// em lugar nenhum, só existe embutido no link.
export function accessTokenFor(area: AreaId): string | undefined {
  if (area !== 'cases') return undefined;
  return _env['PORTFOLIO_ACCESS_TOKEN'] ?? import.meta.env.PORTFOLIO_ACCESS_TOKEN;
}

/** Um cookie de sessão da área é válido se bater com a senha OU com o token de link mágico. */
export function isValidSessionValue(area: AreaId, value: string | undefined): boolean {
  if (!value) return false;
  return value === passwordFor(area) || value === accessTokenFor(area);
}
