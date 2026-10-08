// Compartilhado entre adapters cuja fonte não tem busca por termo no servidor
// (Greenhouse devolve o board inteiro da empresa; a API grátis do Remotive
// tem "search" mas ele não filtra nada, ver comentário em sources/remotive.ts)
// — o filtro por cargo de design precisa acontecer no lado do cliente antes
// de virar RawJob, senão a fila enche de vaga de engenharia/vendas/etc.
//
// Exclusão de subdisciplinas de design fora do escopo de produto digital —
// adicionada ao ligar fontes de mercado geral (4 Day Week, We Work Remotely,
// RemoteOK, 2026-10-08), que misturam "Designer" de qualquer área (gráfico,
// jogos, interiores, moda, etc.) na mesma categoria/tag. Sem isso, "Senior
// Graphic Designer" ou "Game Designer" batiam no regex base (contém
// "designer") e viravam análise desperdiçada — o bench inteiro é sobre
// Product/UX/UI Designer. Heurística, não garantida (mesmo princípio dos
// outros filtros de texto livre do pipeline): "Learning & Development
// Designer" ou títulos sem essas palavras-chave continuam passando.
const EXCLUDED_DESIGN_SUBTYPE = /\b(3d|game|level|graphic|packaging|interior|industrial|instructional|fashion|jewelry|jewellery|architectural|set|exhibit|costume|sound|lighting|textile|floral|landscape|automotive)\s+designers?\b/i;

export function isDesignRole(title: string): boolean {
  if (EXCLUDED_DESIGN_SUBTYPE.test(title)) return false;
  return /designer|\bux\b|\bui\b|design system/i.test(title);
}
