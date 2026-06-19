// Áreas protegidas por senha. Cada área tem cookie e senha próprios,
// para que o acesso aos cases e ao bench (/jobanalysis) seja independente.

export type AreaId = 'cases' | 'jobanalysis';

/** Mapeia um pathname para a área protegida correspondente (ou null se pública). */
export function areaForPath(pathname: string): AreaId | null {
  if (pathname.startsWith('/jobanalysis')) return 'jobanalysis';
  if (pathname.startsWith('/work/') || pathname.startsWith('/pt/work/')) return 'cases';
  return null;
}

/** Nome do cookie de sessão por área. */
export const COOKIE: Record<AreaId, string> = {
  cases: 'portfolio_auth',
  jobanalysis: 'jobanalysis_auth',
};

/**
 * Senha esperada por área.
 * O bench usa JOBANALYSIS_PASSWORD; se não estiver configurada, cai na
 * PORTFOLIO_PASSWORD (evita lockout antes de definir a env no Vercel).
 */
export function passwordFor(area: AreaId): string | undefined {
  if (area === 'jobanalysis') {
    return import.meta.env.JOBANALYSIS_PASSWORD || import.meta.env.PORTFOLIO_PASSWORD;
  }
  return import.meta.env.PORTFOLIO_PASSWORD;
}
