# Template de Prompt — Benchmark de Case Study

Cole o prompt abaixo no Claude (chrome/web) ao analisar uma nova página de case.

---

## Prompt completo (análise detalhada)

```
Analise esta página de case study de portfolio como benchmark de design.

Extraia e estruture as seguintes informações:

**1. ESTRUTURA DE SEÇÕES**
- Liste todas as seções em ordem (hero, contexto, problema, processo, solução, resultados, etc.)
- Qual é a seção de abertura e como ela apresenta o projeto?
- Existe alguma seção incomum ou que se destaca?

**2. HERO / TOPO**
- Como o projeto é apresentado logo de cara? (título, subtítulo, imagem, vídeo, cor de fundo)
- Quais metadados aparecem no topo? (cliente, ano, role, duração, tools)
- Existe uma "proposition" ou summary visível antes do scroll?

**3. APRESENTAÇÃO DE RESULTADOS / MÉTRICAS**
- Métricas são exibidas? Como? (cards, destaque tipográfico, inline no texto)
- Em que ponto da página elas aparecem?
- Há diferença visual clara entre resultados e conteúdo de processo?

**4. HIERARQUIA VISUAL E RITMO**
- Como o conteúdo alterna entre texto, imagem e espaço?
- Existem elementos de destaque (quotes, callouts, destaques coloridos)?
- O layout é single-column, com sidebars, ou muda ao longo da página?

**5. IMAGENS E MEDIA**
- Como as imagens são apresentadas? (full-width, em grid, com caption, mockup em device)
- Há animações, vídeos, protótipos embed?
- Qual a proporção texto vs visual na página?

**6. NAVEGAÇÃO CONTEXTUAL**
- Existe navegação interna (anchor links, progress bar, índice lateral)?
- Como o usuário vai para o próximo case?

**7. PADRÕES INTERESSANTES**
- O que essa página faz que é diferente do padrão?
- Qual elemento você roubaria para um portfolio próprio?
- Para cada item "roubaria": indique impacto estimado (alto/médio/baixo) e esforço estimado (alto/médio/baixo).

**8. DELTA VS. MEU PORTFOLIO**
Compare cada padrão relevante observado com o meu portfolio atual, descrito abaixo.
Formato: tabela com colunas "Padrão observado", "Tenho?", "Lacuna / Oportunidade".

**9. IMPLEMENTAÇÃO PROVÁVEL**
Para cada item da seção 7 que valha a pena adotar, indique onde no projeto isso seria implementado, com base na estrutura abaixo.

---

Contexto do meu portfolio atual:

**Estrutura de páginas de case:**
- Hero com cor sólida (`accent`) ou imagem de fundo (`bgImage`) + tags + título + summary + role/empresa/ano + link ao vivo
- Imagem cover full-width abaixo do hero
- Grid de metrics cards (se houver dados no frontmatter)
- Markdown puro como conteúdo (`.case-content`)
- Related cases automáticos por tags no final

**Stack:** Astro 6 + Tailwind CSS v4 + Svelte 5 (ilhas). Cases em Markdown com frontmatter tipado.

**Arquivos relevantes:**
- `src/pages/work/[slug].astro` — template das páginas de case (EN)
- `src/pages/pt/work/[slug].astro` — template das páginas de case (PT)
- `src/styles/global.css` — estilos `.case-content` para o markdown renderizado
- `src/content/cases/en/*.md` e `src/content/cases/pt/*.md` — conteúdo dos cases
- `src/content.config.ts` — schema do frontmatter (title, summary, role, company, year, tags, accent, bgImage, cover, metrics[], order, draft)

---

**FORMATAÇÃO OBRIGATÓRIA DO ARQUIVO DE SAÍDA:**
- Salve o resultado como Markdown (.md)
- Use acentuação correta em português (ã, é, ç, ó, etc.) — nunca "Nao", "pagina", "titulo"
- Cabeçalho padrão obrigatório:
  ```
  # [Nome do Case] ([Autor/Site]) vs. Meu Portfólio — Comparação de Padrões
  **Referência:** [URL completa]
  **Data:** [DD/MM/AAAA]
  ```
- Seções numeradas: `## 1.`, `## 2.`, etc.
- Tabelas com separador `|---|---|---|`

**ATUALIZAÇÃO OBRIGATÓRIA DO ARQUIVO `_insights-melhorias.md`:**
Ao final de cada análise, gere também uma versão atualizada do arquivo `_insights-melhorias.md` incorporando os insights novos desta análise. Regras:
- Atualize o campo `**Última atualização:**` e adicione o benchmark à lista `**Benchmarks incorporados:**`
- Se um insight já existe no arquivo, apenas adicione `· [Fonte nova]` na linha `_Fonte:_` correspondente — não duplique
- Se o insight é genuinamente novo, insira-o na categoria de impacto/esforço correta
- Se um insight existente muda de classificação (ex.: mais evidência o eleva de médio para alto impacto), atualize a categoria
- Mantenha a seção "O que manter" caso o benchmark confirme ou questione alguma vantagem atual

Seja específico sobre o que você está vendo na página analisada, não sobre o que geralmente funciona.
```

---

## Prompt curto (análise rápida de múltiplas páginas)

```
Você é um design critic analisando cases de portfolio como benchmark.

Sobre esta página, responda:
1. Quais seções existem e em que ordem?
2. Como métricas/resultados são apresentados?
3. O que o layout faz de incomum ou interessante?
4. Qual elemento eu "roubaria"? Indique impacto e esforço (alto/médio/baixo).
5. Delta rápido: o que essa página tem que o meu não tem?

Contexto do meu portfolio: hero com cor/imagem + tags + título + summary +
role/empresa/ano → cover full-width → metrics cards → markdown puro →
related cases por tags. Stack: Astro 6 + Tailwind + Svelte 5.

Seja direto e específico sobre o que está na tela. Para o item "implementação",
indique se a mudança seria no template `[slug].astro`, no CSS `.case-content`,
no frontmatter dos cases, ou no conteúdo markdown em si.

**FORMATAÇÃO:** use acentuação correta em português. Cabeçalho:
`# [Nome] ([Site]) · Análise Rápida · [DD/MM/AAAA]`

**APÓS A ANÁLISE:** gere também a versão atualizada do `_insights-melhorias.md`
com os insights novos desta análise incorporados (sem duplicar os existentes).
```
