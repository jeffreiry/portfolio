// Áreas protegidas por senha. Cada área tem cookie e senha próprios,
// para que o acesso aos cases e ao bench (/jobanalysis) seja independente.

export type AreaId = 'cases';

/** Mapeia um pathname para a área protegida correspondente (ou null se pública). */
export function areaForPath(pathname: string): AreaId | null {
  if (pathname.startsWith('/work/') || pathname.startsWith('/pt/work/')) return 'cases';
  return null;
}

/** Nome do cookie de sessão por área. */
export const COOKIE: Record<AreaId, string> = {
  cases: 'portfolio_auth',
};

export function passwordFor(area: AreaId): string | undefined {
  return import.meta.env.PORTFOLIO_PASSWORD;
}
