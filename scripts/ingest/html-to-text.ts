// Compartilhado entre adapters cuja fonte devolve a JD em HTML (Greenhouse,
// Remotive) — decodifica entidades e remove tags, deixando o texto no mesmo
// formato "colável" que uma JD copiada manualmente de uma página de vaga (o
// que o analisador já espera). Decodificar entidades que não existem no texto
// é inofensivo, então a mesma função serve tanto pra HTML com tags literais
// (Remotive) quanto pra HTML com tags entity-encoded dentro do JSON (Greenhouse).
export function htmlToText(html: string): string {
  const decoded = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  return decoded
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6])\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
