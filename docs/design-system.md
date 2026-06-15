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

### Laranja jambu — variantes por contraste (WCAG AA)

`--color-jambu` (#ed6707) **não passa AA como texto** sobre fundos claros (≈2.6–2.9:1) nem carrega texto branco (3.21:1). Use as variantes conforme o papel:

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `--color-jambu` | `#ed6707` | `#ed6707` | **Só decorativo** — accent bars, fundos grandes (elementos não-texto, isentos da 1.4.3) |
| `--color-jambu-text` | `#a8480c` | `#ed6707` | Jambu como **texto ou borda** sobre fundo (ex: botão "View case →", erros de formulário) |
| `--color-jambu-deep` | `#a8480c` | `#a8480c` | **Fundo de botão com texto branco** (Hero CTA, submit, skip-link) — white 5.84:1 |

> Regra: nunca usar `--color-jambu` puro como cor de texto sobre fundo claro, nem texto branco sobre `--color-jambu`. Auditado por script em 2026-06-15.

### Neutros de texto — contraste

`--color-faint` foi escurecido (light `#776559`, dark `#998a7e`) para ≥4.5:1 — carrega texto pequeno real (ano dos cases, eyebrows, labels). `--color-muted` passa AA sobre `page-bg`/`surface`; sobre `surface-2` (fundo de tag) fica em 3.77:1 (AA-large only) — aceitável para as pills de tag.

### Pastéis (fundos de card por case)

Usados como fundo individual de cada projeto, dando cor própria a cada case.

`#ecf0f3` · `#d0dfe6` · `#efedff` · `#f9fbe7` · `#e1f5fe` · `#d4e2e8` ·
`#afdced` · `#c6d0f7` · `#e0ac90` · `#ebee58` (lima)

> Definir 1 pastel por case no frontmatter (`accent`) — ver
> [cases-portfolio.md](cases-portfolio.md).

---

## Tipografia

Duas famílias:

- **DM Serif Display** — títulos e display (arquivo local `public/fonts/`, self-hosted para eliminar round-trip HTTP no mobile)
- **Barlow** — corpo (pesos 500 e 800, self-hosted)

### Escala (desktop · tablet · mobile)

| Estilo | Fonte / peso | Desktop | Tablet (810–1199) | Mobile (≤809) |
|--------|--------------|---------|-------------------|----------------|
| H1 / Display | DM Serif Display 400 | 60 / 72 | 48 / 60 | 28 / 36 |
| H2 | DM Serif Display 400 | 36 / 44 | 36 / 44 | 36 / 44 |
| Corpo | Barlow 500 | 18 / 28 | 18 / 28 | 16 / 24 |

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

## Padrões de componente

### Label de seção (eyebrow)

Usado em cabeçalhos de subseção dentro do About: Education/Formação, label de hobbies.

```css
font-family: var(--font-body);
font-size: 11px;
font-weight: 600;
letter-spacing: 0.12em;
text-transform: uppercase;
color: var(--color-faint);
```

### CaseCard

Card de case no grid da home. Exibe: imagem de cover (200px altura fixa) · barra accent Jambu (3px, bottom da imagem) · ano · título · summary (2 linhas, clamp) · tags (até 3 pills) · botão "View case →" (mobile only).

- `role` não é exibido no card (redundante com o posicionamento do portfólio como Product Designer)
- Tags são as 7 categorias de filtro: Enterprise, AI & Automation, UX Research, Design System, Branding, Mobile, Data & Analytics
- Drafts têm tag extra "Projetos Pessoais" (não aparece como botão de filtro)
- Hover: `translateY(-6px)` + `box-shadow` via `onmouseover` inline

### Filtro de cases

Barra de botões pill acima do grid de cases. JS vanilla inline filtra `[data-tags]` por `display: none/''`. "All/Todos" ativo por padrão. "Projetos Pessoais" excluído dos botões visíveis.

---

### Widget de dados ao vivo (RunWidget / WorkoutWidget)

Cards na seção About mostrando dados mensais de Strava (km) e Hevy (horas de treino). Dados via API `painel-saude-zeta.vercel.app`; rebuild automático via Vercel deploy hook.

| Elemento | Fonte / peso | Tamanho | Cor (light) |
|----------|-------------|---------|-------------|
| Título | Barlow 700 | 14px | `#FC4C02` (Strava) / `var(--color-ink)` (Hevy) |
| Número | Barlow 800 | 48px | idem |
| Unidade | Barlow 700 | 20px | idem |
| Contagem | Barlow 700 | 14px | idem |
| Sync label | Barlow 500 | 12px | idem |
| Fundo | — | — | `#fafafa` (light) · `var(--color-surface)` (dark) |

Ponto pulsante verde (`#22c55e`, 6px) antes do texto "Syncing with …" indica atualização em tempo real.

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
