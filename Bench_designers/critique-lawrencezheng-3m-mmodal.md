# Design Critique — Lawrence Zheng / 3M M*Modal Case Study

**Referência:** https://www.lawrencezheng.com/3m-m-modal
**Tipo:** Case de portfólio UX (enterprise healthcare)
**Data:** 19/06/2026

---

## 1. Seções e ordem

A página NÃO segue o padrão "hero → cover → metrics → markdown → related". Ela é uma narrativa contínua dividida por uma navegação de processo:

1. **Hero centralizado** — logo co-brand (3M | M*Modal) + título reflexivo ("Reflecting on my time working in a complex problem space at 3M") + foto do setup de trabalho. Card creme com sombra empilhada sobre fundo azul claro.
2. **Intro / contexto** — parágrafo curto com período (2020–2022) e link para versão protegida por senha.
3. **Barra "Process overview" (sticky nav)** — 4 âncoras numeradas: `1. Work context`, `2. Balancing feedback`, `3. Cross collaboration`, `4. Design advocacy`. Vira a navbar quando rola.
4. **Seção 1 — Work context** ("Understanding the problem space" + "Designing for a complex workflow") com diagrama do fluxo CDI→Provider→Coder e o gráfico oficial de resultados 3M.
5. **Seção 2 — Balancing feedback** ("Avoiding design by committee", "Customers ≠ users").
6. **Seção 3 — Cross collaboration** ("Working with cross-functional teams") com diagramas de fluxo Agile (Reactive/Proactive).
7. **Seção 4 — Design advocacy** ("Importance of design advocacy").
8. **"Some final thoughts…"** — fecho reflexivo em fonte monoespaçada.
9. **Footer** — "Thanks for reading" + colunas Contact / Projects / Download (Resume).

Observação importante: não há tags, não há "summary/role/empresa/ano" estruturado no topo, e não há cover full-width tradicional — o hero é um card contido, não bleed.

---

## 2. Como métricas/resultados são apresentados

Aqui mora a maior diferença em relação ao seu modelo de **metrics cards**:

- **Não há cards de métrica nativos.** O resultado quantitativo aparece como **imagem oficial embutida do 3M** — um gráfico azul com setas para cima e o número grande "25%" (aumento no HCC RAF score com 3M messaging), legendado como "Official 3M outcome graphic for HCC Collaborate".
- A escolha é deliberadamente de **credibilidade por fonte terceira**: em vez de o designer afirmar o número, ele mostra o artefato oficial da empresa. Isso "terceiriza" a prova social do impacto.
- O outro tipo de "resultado" é **qualitativo**: um **blockquote serifado em itálico** com depoimento real ("The new 3M redesign is a lot better to look at…") atribuído a "- Lehigh Valley Health Network".
- Não há faixa de KPIs (ex.: "+30% / 2x / -40%") como blocos visuais — o impacto é narrado e ilustrado, não tabulado.

Veredito de crítico: ótima credibilidade, fraca escaneabilidade. Um recrutador apressado não captura o impacto em 5 segundos como capturaria com metric cards.

---

## 3. O que o layout faz de incomum ou interessante

O elemento mais distintivo é o **layout de três zonas** que se repete em cada seção:

- **Coluna esquerda:** imagem/diagrama + caption cinza pequeno.
- **Coluna central:** corpo de texto (sans-serif).
- **Coluna direita:** **"margin notes" em fonte monoespaçada** — asides pessoais e informais ("Think Grammarly but for doctor's notes!", "Being humble with not understanding a concept goes a long way."). Funcionam como voz de bastidor / comentário marginal, separando o "o quê formal" do "o que eu realmente aprendi".

Outros pontos:
- **Sticky process nav** que destaca a seção ativa (item ativo em azul) — orienta leitura de um case longo.
- **Alternância de cor de fundo por seção** (branco / azul-acinzentado) para segmentar o scroll sem títulos pesados.
- **Mudança de tipografia como sinal semântico:** o fecho ("Some final thoughts") inteiro em monospace, ecoando as margin notes — marca "este é o momento pessoal/honesto".
- **Hero como card empilhado** (sombra dupla / efeito de cartas sobrepostas), não full-bleed.
- **Co-branding no hero** (logo da empresa em vez de cor/imagem genérica) ancora credibilidade imediata.

---

## 4. Elemento que eu "roubaria"

**Roubo principal: as margin notes monoespaçadas na coluna direita.**

- **Por quê:** dão personalidade e voz autoral sem poluir o corpo formal. Resolvem a tensão "case profissional vs. mostrar quem eu sou" elegantemente. Diferencial de portfólio raro.
- **Impacto:** ALTO (memorabilidade, voz, diferenciação).
- **Esforço:** MÉDIO.
- **Implementação no seu stack (Astro 6 + Tailwind + Svelte 5):**
  - **Conteúdo markdown:** criar uma diretiva/component custom (ex.: `<Aside>…</Aside>` via MDX, ou remark-directive `:::aside`) para autorar as notas inline no markdown dos cases.
  - **Template `[slug].astro`:** mudar o grid do artigo para 3 colunas (img / prose / aside) — ou usar `float`/`grid` com a aside posicionada à direita do parágrafo correspondente. Em telas estreitas, colapsar a aside para baixo do parágrafo.
  - **CSS `.case-content`:** estilizar `.aside` com `font-mono`, cor cinza, tamanho menor; e definir o `grid-template-columns` responsivo.

**Roubo secundário (bônus): a sticky "Process overview" nav numerada.**
- **Impacto:** MÉDIO-ALTO (navegabilidade de cases longos, scroll-spy).
- **Esforço:** MÉDIO (componente Svelte 5 com IntersectionObserver para o estado ativo).
- **Implementação:** componente **Svelte 5** (ilha) montado no `[slug].astro`; âncoras geradas a partir dos `##` headings do markdown (ou de uma lista no **frontmatter** dos cases, ex.: `sections: [...]`).

---

## 5. Delta rápido — o que essa página tem que o seu não tem

- **Margin notes / asides monoespaçados** — voz pessoal paralela ao corpo. *(você não tem)*
- **Sticky process nav com scroll-spy** numerada por etapas. *(você não tem; seu related é só por tags no fim)*
- **Prova de impacto via artefato oficial de terceiro** (gráfico 3M) em vez de números auto-declarados. *(você usa metric cards próprios)*
- **Depoimento real citável** (blockquote serifado com atribuição). *(você não tem testemunho)*
- **Co-branding no hero** (logo da empresa) para credibilidade imediata. *(seu hero é cor/imagem + tags)*
- **Mudança tipográfica como sinal semântico** (fecho em monospace). *(seu markdown é "puro")*
- **Alternância de fundo por seção** para ritmar o scroll. *(seu layout é mais uniforme)*

O que VOCÊ tem que ELE não tem (a seu favor): metric cards escaneáveis, taxonomia por tags, related cases automático, e um cover full-width — ou seja, sua página ganha em **escaneabilidade e descoberta**; a dele ganha em **voz, narrativa e credibilidade**.

---

### Resumo executivo (1 linha)
Roube as **margin notes monoespaçadas** (alto impacto / médio esforço, mexe em markdown + `[slug].astro` + `.case-content`) e a **sticky process nav** (médio-alto / médio, componente Svelte + frontmatter) — mas mantenha seus metric cards, que dão a escaneabilidade que falta no case dele.
