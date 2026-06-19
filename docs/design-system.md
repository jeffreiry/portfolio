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

Duas famílias (ambas self-hosted em `public/fonts/`, sem round-trip Google Fonts):

- **DM Serif Display** — títulos e display
- **Barlow** — corpo (pesos 500 e 800)

### Escala tokenizada (2026-06-19)

Tokens CSS em `@theme` (`global.css`). **Usar sempre os tokens — nunca px soltos no markup.**

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-display` | `clamp(1.75rem, 7vw, 5rem)` | Hero h1 responsivo |
| `--text-h1` | `3.75rem` (60px) | H1 de página |
| `--text-h2` | `2.25rem` (36px) | Títulos de seção |
| `--text-h3` | `1.25rem` (20px) | Subtítulos |
| `--text-body-lg` | `1.125rem` (18px) | Parágrafo de intro |
| `--text-body` | `1.0625rem` (17px) | Corpo padrão |
| `--text-sm` | `0.9375rem` (15px) | Secundário, inputs |
| `--text-xs` | `0.8125rem` (13px) | Labels, captions |
| `--text-eyebrow` | `0.6875rem` (11px) | Labels uppercase |
| `--text-caption` | `0.625rem` (10px) | Metadados, anos |

### Line-heights e letter-spacings

| Token | Valor | Uso |
|-------|-------|-----|
| `--leading-tight` | `0.92` | Hero h1 |
| `--leading-heading` | `1.1` | Headings |
| `--leading-normal` | `1.625` | Corpo compacto |
| `--leading-relaxed` | `1.75` | Corpo de case, parágrafos longos |
| `--tracking-heading` | `-0.01em` | DM Serif headings |
| `--tracking-eyebrow` | `0.12em` | Labels uppercase |
| `--tracking-tag` | `0.04em` | Filter pills |
| `--tracking-caption` | `0.09em` | Anos nos cards |

### Escala de referência (desktop · tablet · mobile)

| Estilo | Fonte / peso | Desktop | Tablet (810–1199) | Mobile (≤809) |
|--------|--------------|---------|-------------------|----------------|
| H1 / Display | DM Serif 400 | 60/72 | 48/60 | 28/36 *(clamp)* |
| H2 | DM Serif 400 | 36/44 | 36/44 | 36/44 |
| Corpo | Barlow 500 | 18/28 | 18/28 | 16/24 |

*(formato: `tamanho / line-height` em px)*

---

## Espaçamento e layout

### Tokens de espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-4` | `4px` | Micro-gaps |
| `--space-8` | `8px` | Gaps internos de componente |
| `--space-16` | `16px` | Gap padrão |
| `--space-24` | `24px` | Gap entre elementos relacionados |
| `--space-32` | `32px` | Gap entre seções próximas |
| `--space-40` | `40px` | Gap médio |
| `--space-48` | `48px` | Padding de seção pequeno |
| `--space-64` | `64px` | Padding de seção médio |
| `--space-96` | `96px` | Padding de seção grande |
| `--container-max` | `1200px` | Largura máxima do conteúdo |

### Tokens de raio

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `8px` | Badges, code inline |
| `--radius-input` | `12px` | Inputs, imagens inline |
| `--radius-card` | `20px` | CaseCard |
| `--radius-hero` | `24px` | Hero card |
| `--radius-modal` | `24px` | Modais e overlays |
| `--radius-lg` | `32px` | Hero original |
| `--radius-pill` | `999px` | Botões pill, nav pills |
| `--radius-tag` | `999px` | Pills de tag/filtro |

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

## Motion

Tokens de animação para consistência em todas as transições do site.

| Token | Valor | Uso |
|-------|-------|-----|
| `--duration-fast` | `150ms` | Hover de nav links, filter pills |
| `--duration-base` | `350ms` | Transições de header, hover de cards |
| `--duration-slow` | `600ms` | Scroll reveals (`[data-animate]`) |
| `--ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | Easing padrão — entra rápido, desacelera |

### Micro-interações catalogadas

| Elemento | Duração | Easing | Propriedade |
|----------|---------|--------|-------------|
| Scroll reveal | `--duration-slow` | `--ease-out-expo` | opacity + translateY(22px) |
| Header comprime | `350ms` | `cubic-bezier(0.16,1,0.3,1)` | padding |
| Logo fade | `300ms` | ease | opacity + translateY(-6px) |
| CaseCard hover | `350ms` | `cubic-bezier(0.16,1,0.3,1)` | translateY(-6px) + box-shadow |
| Filter pill | `150ms` | ease | color + background + border-color |
| Feedback form | `300ms` | ease | opacity + translateY(6px) |

> `prefers-reduced-motion: reduce` desativa todos os `[data-animate]` via CSS e para a animação dos dots pulsantes. Verificado em global.css.

---

## Arquitetura de tokens em duas camadas (Fase 6 — 2026-06-19)

O DS usa **indireção semântica**: componentes referenciam tokens de papel (semânticos), nunca os primitivos de cor diretamente. Isso torna o tema trocável e o dark mode escalável.

### Camada 1 — Primitivos (em `@theme`)

Valores de cor fixos — **não são re-tematizados no dark mode**:
`--color-jambu`, `--color-cha-mate`, `--color-azul-pantanal`, etc.

> Exceção atual: `--color-cha-mate` e `--color-faint` são re-tematizados no dark mode porque ainda são referenciados diretamente em componentes legados. A migração incremental para os tokens semânticos abaixo resolve isso.

### Camada 2 — Semânticos (em `:root`, após `@theme`)

Aliases de papel → primitivo. Como os primitivos são re-tematizados no `html[data-theme="dark"]`, os semânticos seguem automaticamente.

| Token semântico | Light (via primitivo) | Dark (via primitivo) | Papel |
|---|---|---|---|
| `--text-heading` | `var(--color-cha-mate)` = `#5c2d11` | `#e8ddd5` | Títulos, eyebrows de marca |
| `--text-primary` | `var(--color-ink)` = `#0d0d0d` | `#f0ebe4` | Corpo principal |
| `--text-secondary` | `var(--color-muted)` = `#7a6a60` | `#a89080` | Texto de apoio |
| `--text-subtle` | `var(--color-faint)` = `#776559` | `#998a7e` | Eyebrows, metadados |
| `--bg-page` | `var(--color-page-bg)` = `#f5f2ee` | `#18120e` | Fundo da página |
| `--bg-surface` | `var(--color-surface)` = `#ede8e2` | `#221a14` | Cards, inputs |
| `--bg-surface-alt` | `var(--color-surface-2)` = `#e2dbd3` | `#2c2118` | Pills, separadores |
| `--border-default` | `var(--color-border)` = `#d9d2c8` | `#3d2e23` | Bordas padrão |
| `--accent-deco` | `var(--color-jambu)` = `#ed6707` | `#ed6707` | Decorativo — accent bars |
| `--accent-text` | `var(--color-jambu-text)` = `#a8480c` | `#ed6707` | Jambu como texto/borda |
| `--accent-btn` | `var(--color-jambu-deep)` = `#a8480c` | `#a8480c` | Fundo de botão + texto branco |

**Regra:** novos componentes sempre referenciam tokens semânticos. Migração concluída em 2026-06-19 — zero primitivos no markup público.

### Utilities CSS semânticas (usáveis como classes Tailwind)

Definidas em `@layer utilities` no `global.css`. Use como classes diretamente no markup:

| Classe | Token semântico | Uso |
|--------|----------------|-----|
| `text-heading` | `var(--text-heading)` | Títulos de seção, h2, h3 de marca |
| `text-primary` | `var(--text-primary)` | Corpo forte, spans em cards |
| `text-secondary` | `var(--text-secondary)` | Parágrafos, texto de apoio |
| `text-subtle` | `var(--text-subtle)` | Eyebrows, anos, metadados |
| `bg-page` | `var(--bg-page)` | Fundo da página |
| `bg-surface` | `var(--bg-surface)` | Cards, inputs, education cards |
| `bg-surface-alt` | `var(--bg-surface-alt)` | Pills de tag, separadores |
| `border-subtle` | `0.5px solid var(--border-default)` | Bordas padrão |

> Prefira estas classes a `text-neutral-*` / `bg-neutral-*` do Tailwind — elas seguem o tema automaticamente.

---

## Como isto vira código

- Cores e medidas viram **tokens do Tailwind v4** (CSS custom properties em `@theme` em `global.css`).
- Fontes self-hosted (`woff2`, subset latin) em `public/fonts/`, com `font-display: swap` e `rel="preload"` para as duas críticas.
- Cada token desta página deve ter um nome correspondente no tema — sem hex soltos no markup.
- Componentes novos usam tokens **semânticos** (`--text-heading`, `--bg-surface`, etc.). Tokens primitivos aparecem apenas na camada de definição.
