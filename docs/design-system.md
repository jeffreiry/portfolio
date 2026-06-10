# Design System

Tokens e padrões visuais do portfólio, **extraídos do site atual no Framer** e
formalizados aqui para o build em código. Esta é a fonte de verdade da
identidade — não introduzir cores, fontes ou medidas fora desta lista sem
registrá-las aqui primeiro.

---

## Cores

### Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| `white` | `#ffffff` | Superfície base, fundo de seções claras |
| `neutral-50` | `#f5f4f6` | Fundo claro alternativo |
| `neutral-100` | `#f2f2f2` | Fundo de seção |
| `neutral-200` | `#e6e6e6` | Bordas e divisórias |
| `neutral-400` | `#a7a7a7` | Texto desabilitado / placeholder |
| `neutral-500` | `#8e8e8e` | Texto secundário |
| `neutral-700` | `#383838` | **Superfície escura** (card hero) |
| `neutral-800` | `#212121` | Texto de corpo |
| `neutral-900` | `#1a1a1a` | Títulos / quase-preto |

### Acento — Laranja (cor da marca)

| Token | Hex | Uso |
|-------|-----|-----|
| `accent-tint` | `#fff7ef` | Fundo de destaque suave |
| `accent-300` | `#ff8532` | Laranja claro |
| `accent-400` | `#ff620a` | Laranja médio |
| `accent-500` | `#ff4800` | **Primária** — CTAs, links em destaque |

### Pastéis (fundos de card por case)

Usados como fundo individual de cada projeto, dando cor própria a cada case.

`#ecf0f3` · `#d0dfe6` · `#efedff` · `#f9fbe7` · `#e1f5fe` · `#d4e2e8` ·
`#afdced` · `#c6d0f7` · `#e0ac90` · `#ebee58` (lima)

> Definir 1 pastel por case no frontmatter (`accent`) — ver
> [cases-portfolio.md](cases-portfolio.md).

---

## Tipografia

Duas famílias:

- **Cactus Regular** — títulos e display (arquivo local `public/fonts/Cactus Regular.otf`, via `@font-face`)
- **Barlow** — corpo (pesos 300 / 400 / 500, Google Fonts)

### Escala (desktop · tablet · mobile)

| Estilo | Fonte / peso | Desktop | Tablet (810–1199) | Mobile (≤809) |
|--------|--------------|---------|-------------------|----------------|
| H1 / Display | Cactus 400 | 60 / 72 | 48 / 60 | 28 / 36 |
| H2 | Cactus 400 | 36 / 44 | 36 / 44 | 36 / 44 |
| Corpo | Barlow 300 | 18 / 28 | 18 / 28 | 16 / 24 |

*(formato: `tamanho / line-height` em px)*

- **Links:** cor `#1a1a1a`, hover `#383838`, **sem sublinhado**.
- `letter-spacing`: 0 em todos os estilos.

---

## Espaçamento e layout

| Token | Valor | Uso |
|-------|-------|-----|
| Container | `1200px` máx | Largura máxima do conteúdo |
| Radius | `32px` | Cantos de cards e seções |
| Gaps | `16 / 24 / 32 / 40 / 64px` | Espaçamento entre elementos |
| Padding de seção (vertical) | `48 / 64 / 96px` | Respiro entre blocos |
| Padding de seção (horizontal) | `16 → 64px` | Estreita no mobile |
| Hero (padding-top) | `160px` | Respiro generoso acima do título |

### Breakpoints

| Faixa | Largura |
|-------|---------|
| Desktop | ≥ 1200px |
| Tablet | 810px – 1199px |
| Mobile | ≤ 809px |

---

## Componentes & seções (IA observada no Framer)

A home atual segue esta sequência. Manter como ponto de partida:

1. **Header / nav** — fixo no topo (~84px), navegação enxuta.
2. **Hero** — card escuro `#383838`, cantos `32px`, `padding-top: 160px`;
   título grande (máx ~640px) + 1–2 subtextos (máx ~560px).
3. **Intro / sobre** — bloco centralizado, largura de container.
4. **Showcase de projetos** — cards de case em linhas; grade de **2 colunas** no
   desktop que vira **1 coluna** no mobile. Cada card usa um pastel próprio.
5. **Seção de fechamento** — superfície branca com CTA.
6. **Footer** — grade de 2 colunas com contato e links.

### Padrões de interação

- Microinterações sutis no hover dos cards (escala/elevação leve).
- Transições de página suaves — usar a **View Transitions API** do Astro.
- Cursor/animações discretos; nada que prejudique performance ou acessibilidade.

---

## Como isto vira código

- Cores e medidas viram **tokens do Tailwind v4** (CSS custom properties em
  `@theme`).
- Fontes carregadas localmente (`woff2`) ou via Fontshare/Google, com
  `font-display: swap`.
- Cada token desta página deve ter um nome correspondente no tema — sem hex
  soltos no markup.
