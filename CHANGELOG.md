# Changelog · Portfólio Jeferson Freiry

## [Não lançado]

### Pendente — por criticidade (bench 2026-06-12 · 11 vagas · score médio 60%)
- 🔴 **Artefatos visíveis** (11/11 vagas) — expor telas, flows ou wireframes em pelo menos 3 cases
- 🔴 **Métricas de impacto** (`⬜`) (11/11 vagas) — Enterprise AI, Shipping, Arezzo, Hypera
- 🟠 **Acessibilidade documentada** (8/11 vagas) — enterprise cases com `⬜`; Cartela Cores é a referência WCAG 1.4.1
- 🟠 **Lighthouse performance mobile 95+** (atual: 73) — Google Fonts render-blocking, LCP background-image sem `fetchpriority`, contraste footer (#6a5a52 / #18120e = 2.82:1)
- 🟡 **Mobile como plataforma** (4/11 vagas) — Arezzo tem tag "Mobile" — reforçar narrativa de decisões
- 🟡 **Responsividade fina** nos 3 breakpoints (≥1200 / 810–1199 / ≤809)
- 🟡 Imagens dos cases em `public/cases/<slug>/cover.webp`
- Página About dedicada (`/about` + `/pt/about`)
- Sitemap.xml

---

## 2026-06-12

### Adicionado
- **Bench_job_applications/** — nova pasta substituindo `BENCHMARK.md`; estrutura com arquivo por vaga + `_index.md` global com metodologia de score e gaps transversais
- **11 vagas analisadas** com score de aderência (Person-Job Fit ponderado 0–3, obrigatórios ×2, preferidos ×1):
  - Grupo Boticário · **76%** · Aderência parcial
  - BTG Pactual · **73%** · Aderência parcial
  - TOTVS ERP Moda · **67%** · Aderência parcial
  - MJV · Alelo RangoDS · **65%** · Aderência parcial
  - Méliuz · **59%** · Aderência baixa
  - Banco PAN · **58%** · Aderência baixa
  - Grupo Decolar Growth · **54%** · Aderência baixa
  - SAP Concur / TripIt · **52%** · Aderência baixa (migrado do BENCHMARK.md)
  - Bridger · **50%** · Aderência baixa
  - C&A · **46%** · Aderência baixa
  - Madeira Madeira Fintech & Credit · **41%** · Aderência baixa
- **Média geral: 60%** · Gaps transversais: artefatos visíveis (11/11), métricas (11/11), acessibilidade enterprise (8/11), UX Research estruturado (4/11)

### Conteúdo
- **Acessibilidade — 8 cases enterprise atualizados** (PT + EN): Enterprise AI, Shipping, Hypera, Arezzo — `⬜` substituídos por decisões WCAG reais derivadas do que já estava no case:
  - Enterprise AI: painel de fontes persistente acessível por teclado/leitor de tela (WCAG 2.1.1)
  - Shipping: timeline por cor + densidade (WCAG 1.4.1)
  - Hypera: badge numérico ícone + número, não só cor (WCAG 1.4.1)
  - Arezzo: badges de status com rótulo textual + cor (WCAG 1.4.1)

### Performance
- **Self-hosting de fontes** — DM Serif Display e Barlow migradas de Google Fonts para `public/fonts/` (5 arquivos woff2, subset latin); eliminado round-trip para fonts.googleapis.com no mobile
- **Preload hints** adicionados em `Base.astro` para Barlow 500 e DM Serif Display (LCP critical path)
- **Contraste footer dark mode** — `--color-faint` corrigido de `#6a5a52` (2.82:1, reprovado) para `#8a7a70` (~4.8:1, WCAG AA) no dark mode

### Documentação
- **Roadmap** — subitens da revisão de voz (`🟠 Alto` e `🟡 Médio`) marcados como concluídos com data; itens riscados para preservar histórico; nova seção "Melhorias críticas de conteúdo" com tabela de prioridades derivada do bench (11 vagas)
- **cases-portfolio.md** — seção "⚠️ Revisão de voz pendente" convertida em "✅ Revisão de voz concluída"; pendências de conteúdo reordenadas por criticidade com contexto de vagas afetadas
- **CLAUDE.md** — Estado atual atualizado: bench context + próximas ações ordenadas por criticidade
- **portfolio-readme.md** — seção Pendente reordenada por criticidade com contexto de vagas afetadas
- **CHANGELOG.md** — seção Pendente reordenada por criticidade
- **BENCHMARK.md** — deprecado; conteúdo migrado para `Bench_job_applications/sap-concur-tripit.md`

---

## 2026-06-11 (2)

### Alterado
- **Header** — toggle de tema e switcher de idioma separados em dois pills independentes (era um único `controls-pill`)
- **Language switcher** — redesenhado como switch segmentado: idioma ativo com pill interno preenchido (`--color-cha-mate` bg + `--color-page-bg` text), idioma inativo como link discreto com hover; ambos os idiomas são links quando não selecionados
- **ThemeToggle** — borda circular própria removida; pill do header é o container visual; tamanho ajustado de 30 → 28px
- **Career logos** — dark mode: `filter: brightness(0) invert(1)` + `opacity: 0.85` (coloridos no light, brancos no dark); bounding box `22×94px` (era `28×50px`); logos atualizados: `cwi.avif` → `cwi.png`, `intelipost.avif` → `Intelipost.png` (fundo transparente)

---

## 2026-06-11

### Adicionado
- **Case #9: Microsoft Power Apps · Dummy App** (`power-apps-dummy-app`) — PT + EN, `draft: false`

### Concluído
- **Revisão de voz dos cases** — 9 cases (18 arquivos PT+EN) reescritos com base no case-writing-guide: AI tells removidos, dúvida expressa adicionada, Impact sections vazias substituídas por "O que eu faria diferente", endings pessoais, anos e ordem dos cards corrigidos no frontmatter

### Auditado
- **Lighthouse** em produção (`portfolio.jefersonfreiry.com`):
  - Desktop: Performance **99** · Acessibilidade **95** · Best Practices **100** · SEO **100** ✅
  - Mobile: Performance **73** · Acessibilidade **95** · Best Practices **100** · SEO **100** ⚠️
  - Causas da performance mobile baixa: Google Fonts render-blocking 2.270ms, LCP element (background-image Unsplash) sem `fetchpriority`, Speed Index 10.0s, FCP 3.1s, LCP 4.0s
  - A11y pendente: `color-contrast` footer/seletor de idioma, `label-content-name-mismatch` link PT, 2 logos sem dimensões explícitas

---

## 2026-06-07 (2)

### Adicionado
- **Proteção por senha nos cases** via middleware SSR + cookie httpOnly:
  - `src/middleware.ts` — intercepta `/work/*` e `/pt/work/*`, verifica cookie `portfolio_auth`
  - `src/pages/api/login.ts` — POST que valida senha e define cookie de 30 dias
  - `src/pages/api/logout.ts` — POST que apaga o cookie e redireciona para `/`
  - `src/pages/login.astro` — tela de login com tratamento de erro
- **`astro.config.mjs`** — output `static` → `hybrid` para suportar SSR no middleware

### Alterado
- `src/pages/work/[slug].astro` — convertido para SSR: removido `getStaticPaths()`, adicionado `export const prerender = false`, carrega entry dinamicamente via `Astro.params.slug`
- `src/pages/pt/work/[slug].astro` — mesma conversão para SSR

### Próximo passo obrigatório
- Adicionar variável `PORTFOLIO_PASSWORD` no painel Vercel (Settings → Environment Variables → Production) para ativar a proteção

---

## 2026-06-07

### Adicionado
- **6 cases novos** em PT + EN (12 arquivos `.md`):
  - `painel-saude` — Dashboard pessoal Strava + Hevy
  - `shipping-capacity-platform` — Plataforma de logística marítima
  - `arezzo-ad-management` — Sistema de anúncios multi-perfil Arezzo&Co
  - `del-valle-website` — Redesign site Del Valle "Cheio de vida"
  - `hypera-hypergestor` — Sistema de verbas de trade marketing Hypera Pharma
  - `del-valle-kapo` — Redesign site Del Valle Kapo "Sempre Criança 2.0"

### Alterado
- **Home EN + PT** migradas de array hardcoded para `getCollection` — cases lidos da content collection, ordenados por `order`, filtrados por `draft: false`
- **Roadmap** atualizado: Fase 3 e Fase 4 marcadas como concluídas

---

## 2026-06-06

### Adicionado
- Seção **Education/Formação** na home (EN + PT): Feevale + Uniritter em grid 2 colunas
- Seção **Career/Carreira** na home (EN + PT): 5 cards em grid responsivo (eSales → Intelipost → CWI → ilegra → Braskem) com link para LinkedIn
- Seção **About/Sobre** na home (EN + PT): 2 parágrafos com foco em enterprise e sistemas complexos

### Alterado
- **Hero** atualizado com nome completo, tagline e parágrafo descritivo alinhados ao site Framer

---

## 2026-06-05 · Fase 2 — Componentes e layout

### Adicionado
- Componentes: `Header.astro`, `Hero.astro`, `CaseCard.astro`, `Footer.astro`
- Home page EN (`/`) e PT (`/pt`) com Hero + grid de cases (4 cards hardcoded)
- View Transitions API (Astro 6) entre páginas
- CSS tokens do design system em `global.css` via Tailwind v4 `@theme`
- Documentação: `docs/design-system.md`, `docs/cases-portfolio.md`, `docs/roadmap.md`

---

## 2026-06-05 · Fase 1 — Fundação

### Adicionado
- Setup inicial: Astro 5 + TypeScript strict + Tailwind CSS v4 + Svelte 5
- i18n routing (EN padrão `/`, PT em `/pt`)
- Adapter Vercel com Web Analytics
- Fontes Manrope + Inter via Google Fonts
- Domínio `portfolio.jefersonfreiry.com` configurado (Cloudflare + Vercel)
