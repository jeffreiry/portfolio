# Design Critique — Nicole Roberts: "Empowering Item Discovery with Gen AI Summaries"

**Referência:** https://www.nicolearoberts.com/case-studies/empowering-item-discovery-with-gen-ai-summaries
**Data:** 19/06/2026
**Benchmark para:** portfolio em Astro 6 + Tailwind + Svelte 5

---

## 1. Seções e ordem

1. **Hero** — eyebrow "WALMART CASE STUDY" + título grande. O hero NÃO é cor/imagem cheia: é um device mockup animado (mocks do produto que entram com motion no load).
2. **Overview** — layout 2 colunas: prose à esquerda (resumo + lista de Goals) / tabela de metadados à direita (ROLE, RESPONSIBILITIES, COLLABORATORS, TIMELINE).
3. **The challenge** — Business need vs User need lado a lado + mockups Item Page / Ratings & Reviews.
4. **In-person kickoff** — 3 focus areas (Awareness / Consideration / Decision) + "Problem to solve".
5. **Research** — competitive analysis, emerging themes (Essentials / Personalization / Trust), competitor screenshots, "Key insights" numerados (1,2,3).
6. **How might we** — faixa full-width com fundo tintado claro, frase grande centralizada.
7. **Ideation** — pill label + 4 cards (Item highlights / summary / specs / Review summary) + iterações 1→4.
8. **User testing** — learnings estruturados em Insight → Action; quotes de usuários por tema.
9. **Aligning E2E** — estratégia de cor light vs dark.
10. **Final design (MVP)** — flow E2E completo com mockups + 2 sub-iniciativas (Search, Comparison), cada uma com seu próprio bloco de métricas inline.
11. **Impact / The results** — faixa tintada com 4 stats grandes em teal (animados) + botão "Post from Walmart" (prova social executiva).
12. **What I learned** — 3 cards com ícone + título + texto.
13. **Next case study** — UM card rico de preview (não um grid de related por tag).
14. **Footer** — bloco teal com curva no topo.

Padrão recorrente: cada seção tem **pill/eyebrow label** (ex.: "RESEARCH", "IDEATION", "IMPACT") → **título** → **subtítulo curto** → conteúdo. Ritmo muito consistente.

---

## 2. Como métricas/resultados são apresentados

Há **três tratamentos distintos** de métrica, e isso é a parte mais forte da página:

- **Métricas inline por iniciativa:** cada sub-feature (Search, Comparison) tem seu próprio mini-trio de cards (ex.: +3.62% Search ATC, +2% CTR, -1.81% Referred ATC). Métrica colada no contexto que a gerou, não jogada toda no fim.
- **Bloco de impacto final ("The results"):** 4 stats grandes em teal sobre faixa tintada — +1.1% conversion, -0.93% bounce, -0.63% cart removal, 75% found module helpful. Os números fazem **count-up animado** ao entrar na viewport (vi o "75%" subindo 3→17→25→...).
- **Sinais qualitativos:** sinal +/- explícito nas métricas (mostra direção/intenção, não só magnitude) e uma quote de executivo da Walmart ("Post from Walmart" / Jon Alferness, EVP & CPO) como prova social.

Honestidade: incluem métricas negativas/ambíguas (-1.81% removal) sem esconder — passa credibilidade.

---

## 3. O que o layout faz de incomum/interessante

- **Métricas distribuídas, não centralizadas.** A maioria dos portfolios empilha tudo em "metrics cards" no fim. Aqui cada conquista vive ao lado da feature.
- **Hero com device mock animado** em vez de cover cheia de cor/imagem.
- **Sistema de pill labels** consistente para abrir toda seção (vocabulário visual repetido = sensação de produto, não de doc).
- **Estrutura Insight → Action** no user testing: mostra raciocínio, não só telas bonitas.
- **Faixas full-width tintadas** ("How might we", "Impact") quebram o ritmo de fundo branco e criam respiros/âncoras.
- **Count-up animado** nos números de impacto.
- **Design credits** nomeando colaboradores — maturidade de senioridade.

---

## 4. O elemento que eu "roubaria"

**Métricas inline por iniciativa + count-up no bloco final.**

- **Impacto: ALTO** — transforma resultado de "anexo no rodapé" em narrativa. O leitor conecta decisão→efeito.
- **Esforço: MÉDIO-BAIXO.**

Vice-campeão a roubar: **sistema de pill/eyebrow label** por seção (impacto médio, esforço baixo — é praticamente só CSS/markdown).

---

## 5. Delta rápido — o que essa página tem que o seu (provavelmente) não tem

| Eles têm | Você tem hoje |
|---|---|
| Métricas inline coladas em cada feature | metrics cards num bloco único |
| Count-up animado nos stats | (provável) números estáticos |
| Pill label + subtítulo abrindo CADA seção | markdown puro contínuo |
| Bloco de metadados em tabela 2-col no overview | role/empresa/ano em linha no hero |
| Prova social (quote de executivo) | — |
| Estrutura Insight → Action visível | — |
| Hero com device mock animado | hero cor/imagem + tags |
| Next case = 1 card rico de preview | related por tags (grid) |

---

## Implementação no seu stack (Astro 6 + Tailwind + Svelte 5)

**A. Métricas inline por iniciativa**
- **Onde:** `frontmatter` + `conteúdo markdown`. Crie um shortcode/componente `<MetricRow>` (Astro ou Svelte) usável no meio do markdown (via MDX) para plantar 2–3 stats ao lado de cada feature. Alternativa: array `metrics` por seção no frontmatter consumido pelo `[slug].astro`.

**B. Count-up animado**
- **Onde:** **componente Svelte 5** (use `$state` + `$effect` + IntersectionObserver) embutido no card de stat. É o caso de uso ideal pra ilha Svelte. Respeite `prefers-reduced-motion`.

**C. Pill/eyebrow label + subtítulo por seção**
- **Onde:** `.case-content` (CSS) + um pequeno componente `<SectionLabel>`. Estilize `h2`/`h3` no markdown para receber um eyebrow via `::before` ou wrapper. Mudança majoritariamente de **CSS .case-content**.

**D. Overview em 2 colunas (prose + tabela de metadados)**
- **Onde:** `[slug].astro` (template) lendo campos do `frontmatter` (role, responsibilities, collaborators, timeline) e renderizando o grid 2-col ao lado do summary.

**E. Faixas full-width tintadas**
- **Onde:** `.case-content` (CSS) — utilitário tipo `.band` que quebra o container e aplica bg tintado. Pode ser acionado por uma classe no markdown/MDX.

**F. Prova social (quote)**
- **Onde:** `frontmatter` (campo `testimonial`) → render no `[slug].astro`. Componente de blockquote destacado.

**G. Next case como card rico**
- **Onde:** `[slug].astro` — troque/complemente o "related por tags" por um card de preview com thumbnail + tags + 2 métricas headline do próximo case (puxadas do frontmatter do case alvo).

---

### TL;DR
A página vence ao **espalhar resultados pela narrativa** (não num bloco único) e ao manter um **sistema visual de labels por seção**. Maior ganho/esforço pra você: mover métricas pra junto das features (frontmatter/MDX) + uma ilha Svelte de count-up. Depois, eyebrow labels via CSS no `.case-content`.
