// Compartilhado entre adapters cuja fonte não tem busca por termo no servidor
// (Greenhouse devolve o board inteiro da empresa; a API grátis do Remotive
// tem "search" mas ele não filtra nada, ver comentário em sources/remotive.ts)
// — o filtro por cargo de design precisa acontecer no lado do cliente antes
// de virar RawJob, senão a fila enche de vaga de engenharia/vendas/etc.
export function isDesignRole(title: string): boolean {
  return /designer|\bux\b|\bui\b|design system/i.test(title);
}
