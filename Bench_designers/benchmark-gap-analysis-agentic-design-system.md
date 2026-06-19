# Agentic Design System (mchiu.co.uk) vs. Meu Portfólio — Comparação de Padrões

**Referência:** https://mchiu.co.uk/case-studies/agentic-design-system/
**Data:** 19/06/2026

## Contexto do meu portfólio atual
- Hero com cor/imagem de fundo + tags + título + summary + role/empresa/ano
- Imagem cover full-width
- Grid de metrics cards (se houver dados)
- Markdown puro como conteúdo
- Related cases automáticos por tags no final

---

## 1. O que essa página TEM que o meu NÃO tem

| Padrão observado | Tenho? | Lacuna / Oportunidade |
|---|---|---|
| H1 / tese com resultado ou afronta conceitual | ❌ | Título + summary são descritivos; falta a frase-manifesto contrastante ("I built a design system that AI can use") que cria tensão |
| Toggle Detailed / TL;DR (densidade de leitura) | ❌ | Markdown puro serve um único nível de profundidade; não atende recrutador apressado e design lead no mesmo doc |
| Demos interativas no lugar de imagens (accordion, tabs) | ❌ | Markdown puro não comporta componentes interativos embutidos |
| Workflows como loop INPUT → FINDING → OUTCOME | ❌ | Processo narrado em prosa; falta taxonomia visual de etapas |
| Entregável vivo embedado (Storybook real no fim) | ❌ | Cover é imagem estática full-width; não há artefato funcional |
| Code-switching de fundo por bloco (claro ↔ dark) | ❌ | Conteúdo Markdown tem background uniforme; sem ritmo de cor entre blocos |
| Mockups em device/browser chrome (LIGHT vs DARK lado a lado) | ❌ | Imagens soltas, sem moldura/contexto de UI |
| Pull-quote / destaque inline colorido dentro do texto | ⚠️ | Markdown permite blockquote, mas sem estilo de pull-quote ou highlight em gradiente |
| Métricas como payoff posicionado no fim (não só existir) | ⚠️ | Tenho grid de metrics cards, mas o impacto depende de posição narrativa, não só de renderizar dados |

---

## 2. O que o MEU portfólio TEM que essa página NÃO tem

| Padrão (meu) | A página tem? | Vantagem |
|---|---|---|
| Barra de metadados estruturada (role / empresa / ano) no hero | ❌ | Escaneável em 2s; na página, role/stack estão diluídos como headings no corpo |
| Tags no hero | ❌ | Categorização explícita e imediata; a página não expõe taxonomia ao leitor |
| Cover full-width como âncora visual única | ⚠️ | Hero dela é card contido, não full-bleed; meu cover tem mais presença de entrada |
| Related cases automáticos por tags no final | ❌ | Ofereço caminho de saída/continuidade; o case dela é overlay e fecha de volta para a grade |
| Conteúdo em Markdown puro (portável, versionável, rápido de publicar) | ❌ | Manutenção e velocidade de publicação muito maiores; a dela exige componentes custom por seção |
| Summary visível antes do scroll | ⚠️ | Entrego contexto textual direto; a dela aposta em curiosidade (hero sem explicação) |

---

## 3. Recomendações priorizadas (alto impacto, baixo esforço no stack Markdown)

1. **Frase-tese no frontmatter** — adicionar campo `tldr` ou `thesis` para gerar uma frase-manifesto acima do summary, criando tensão narrativa sem quebrar o pipeline.
2. **Pull-quote estilizado** — convenção de blockquote com classe CSS (`.case-content blockquote`) para introduzir a pergunta norteadora de cada case.
3. **Componente de step** — shortcode simples (INPUT/FINDING/OUTCOME ou Problema/Decisão/Resultado) usável dentro do Markdown, dando taxonomia de processo sem página custom.
4. **Code-switching de fundo** — classe alternada por seção (`.block--dark`) para criar ritmo de cor.
5. **Embed interativo** — ao menos um iframe (Figma/Storybook) no fim dos cases técnicos, mantendo o resto em Markdown.

---

Gerado a partir de análise de mchiu.co.uk/case-studies/agentic-design-system/
