# Roadmap

Fases de construção, decisões técnicas e questões em aberto. Este é o documento
vivo do projeto — atualizar à medida que decisões forem tomadas.

---

## Fases

### Fase 0 — Planejamento ✅

- [x] Definir stack
- [x] Extrair design system do Framer
- [x] Definir modelo de conteúdo bilíngue
- [x] Escrever arquivos de instrução (`CLAUDE.md`, `docs/`)
- [x] Escrever e revisar todos os cases em PT e EN ([cases-portfolio.md](cases-portfolio.md))

### Fase 1 — Fundação ✅

- [x] Scaffolding do Astro 5 + TypeScript (strict)
- [x] Tailwind CSS v4 com os tokens do [design-system.md](design-system.md)
- [x] Fontes DM Serif Display (display) + Barlow 500 (corpo) via Google Fonts (`display=swap`)
- [x] Integração Svelte 5 (ilhas)
- [x] i18n routing — EN na raiz (`/`), PT em `/pt`
- [x] Layout base (`src/layouts/Base.astro`)
- [x] Deploy na Vercel + repositório `github.com/jeffreiry/portfolio`
- [x] Domínio `portfolio.jefersonfreiry.com` apontado via CNAME no Cloudflare

### Fase 2 — Design system em código ✅

- [x] Tokens de cor, tipografia e espaçamento como tema Tailwind (`@theme` em `global.css`)
- [x] `Header.astro` — nav sticky com logo, links Work/About e switcher EN↔PT
- [x] `Footer.astro` — nome, LinkedIn e e-mail
- [x] `Hero.astro` — card escuro `#383838`, cantos `32px`, headline + subtitle
- [x] `CaseCard.astro` — acento pastel, imagem, título, role, ano e tags
- [x] Home EN + PT com Hero + grade 2 colunas de cases (→ 1 coluna no mobile)
- [x] View Transitions — native browser API (`<meta name="view-transition">`, Astro 6)

### Fase 3 — Páginas core ✅ (parcial)

- [x] Schema do frontmatter de case (Zod) em `src/content.config.ts`
- [x] Template de página de case (`src/pages/work/[slug].astro` + `/pt/work/[slug].astro`)
- [x] Home refinada: seções About, Career e Education entre Hero e grade de cases
- [x] Home lendo da content collection (`getCollection`) — sem array hardcoded
- [ ] Página "About" dedicada (`src/pages/about.astro` + `/pt/about`) — conteúdo existe na home, página separada ainda não criada

### Fase 4 — Conteúdo ⚡ quase completa

**Cases com arquivo `.md` criado (PT + EN):**

| # | Case | Slug | Status |
|---|------|------|--------|
| 1 | Enterprise AI Knowledge Assistant | `enterprise-ai-assistant` | ✅ PT + EN |
| 2 | Shipping Capacity Optimization Platform | `shipping-capacity-platform` | ✅ PT + EN |
| 3 | Arezzo&Co · Sistema de Anúncios | `arezzo-ad-management` | ✅ PT + EN |
| 4 | Cartela de Cores | `cartela-cores` | ✅ PT + EN |
| 5 | Painel Saúde | `painel-saude` | ✅ PT + EN |
| 6 | Del Valle · Redesign de Site | `del-valle-website` | ✅ PT + EN |
| 7 | Hypera Pharma · HYPERGESTOR | `hypera-hypergestor` | ✅ PT + EN |
| 8 | Del Valle Kapo · Redesign de Site | `del-valle-kapo` | ✅ PT + EN |

**Pendente (igual para todos os cases):**
- [ ] Preencher os `⬜` de métricas com dados reais
- [ ] Reunir e otimizar imagens em `public/cases/<slug>/` (webp/avif + alt bilíngue)

**⬜ Quantos e quais cases entram no lançamento?** — ver Questões em aberto.

### Fase 4.5 — Segurança ✅

- [x] Output `hybrid` (Vercel SSR) para suportar middleware
- [x] Middleware de proteção por senha (`/work/*` + `/pt/work/*`)
- [x] Login page (`/login`) + API POST (`/api/login`, `/api/logout`)
- [x] Páginas de case convertidas para SSR (sem `getStaticPaths`)
- [ ] **Ação necessária:** adicionar `PORTFOLIO_PASSWORD` no painel Vercel

### Fase 5 — Polish & lançamento

- [ ] Responsividade fina nos 3 breakpoints (≥1200 / 810–1199 / ≤809)
- [x] Acessibilidade (parcial): skip navigation link (`Base.astro`), foco visível nos nav links (outline `var(--color-cha-mate)`), contraste dos títulos de cards (#fff em vez de jambu sobre fundo escuro)
- [ ] Acessibilidade (pendente): contraste WCAG AA geral, leitor de tela end-to-end, teclado em formulário
- [x] SEO: meta tags, Open Graph, canonical, hreflang PT/EN (Base.astro)
- [ ] Sitemap.xml
- [ ] Lighthouse 95+ em todas as métricas (Performance, A11y, Best Practices, SEO)
- [x] Domínio `portfolio.jefersonfreiry.com` + DNS apontado
- [x] Analytics (Vercel Web Analytics ativo)
- [x] Formulário de contato (`/contact` + `/pt/contact`) com Resend + botão WhatsApp
- [x] Links de currículo PDF (PT + EN) prontos para `public/`
- [x] Dark mode com toggle (tokens de cor escuros + persistência localStorage + anti-flash)
- [x] Microinterações expressivas (scroll reveals com IntersectionObserver, stagger em grids, hover expressivo nos CaseCards)
- [ ] **Ação necessária:** adicionar `RESEND_API_KEY` no painel Vercel (Settings → Environment Variables)

---

## Decisões técnicas

**Por que Astro e não SvelteKit (que o autor já conhece)?**
O portfólio é centrado em conteúdo e quase totalmente estático. O Astro entrega
de fábrica: content collections tipadas (Zod), i18n routing nativo, zero-JS por
padrão (Lighthouse 100 — diferencial num portfólio de design) e Markdown em
primeira classe. No SvelteKit tudo isso seria montado à mão. Como o Astro suporta
**ilhas em Svelte**, o conhecimento do autor é reaproveitado nas partes interativas.

**Por que Markdown puro (e não MDX) nos cases?**
Cases em Markdown puro — portáveis e sem acoplamento a componentes. Conteúdo
durável e fácil de migrar. Se um case específico precisar de um componente
embutido, avaliar MDX caso a caso.

**Por que conteúdo no Git e não um CMS?**
Single-author, leitura-only, versionado, auditável, zero custo e zero infra.
Mesmo racional do Painel Saúde. CMS só se justificaria com múltiplos editores.

**Por que Vercel?**
Mesmo fluxo de deploy do Painel Saúde. Deploy automático por push, preview de
branches, suporte a output estático.

**Vídeo hero com carregamento condicional (hero.mp4, ~12MB)**
O vídeo tem `preload="none"` e o `src` é injetado via JS apenas quando:
(1) viewport ≥ 768px, (2) `prefers-reduced-motion: no-preference`, (3) conexão não é `slow-2g` ou `2g`.
A imagem Unsplash (`bgImage`) é sempre renderizada como camada de fallback — garante
visual para mobile, reduced-motion e conexões lentas sem flash de fundo vazio.
Script em `Hero.astro`, reutilizável via evento `astro:page-load` (View Transitions).

**Ordem das seções da home: Hero → Cases → About/Career → Contact**
Decisão motivada por critério de recrutamento: o portfólio é aberto para avaliar cases.
Mover a grade de cases para logo após o hero maximiza o tempo de exposição aos trabalhos
antes do scroll depth necessário para ver About/Career.

**Classes utilitárias de cor (`global.css`)**
As tokens `@theme` (`.text-jambu`, `.text-cha-mate`, `.bg-jambu`, etc.) são registradas
explicitamente em `@layer utilities` para evitar dependência de purge no Tailwind v4 e
eliminar o mix de `style="color: var(--color-jambu)"` inline com classes Tailwind.

---

## Revisão de voz dos cases (case-writing-guide) ✅

Concluída em 2026-06-11. Todos os 9 cases (18 arquivos PT+EN) reescritos com base em [case-writing-guide.md](../case-writing-guide.md).

**O que foi feito em todos os cases:**
- AI tells removidos (enterprise-ai-assistant tinha 5 frases literais do guia)
- Dúvida expressa adicionada (rule 2) — frase "a decisão que eu estava menos certo"
- Pelo menos 1 decisão por case convertida de P→O→C→W para narrativa (rule 3)
- Impact sections com `⬜` vazios substituídas por "O que eu faria diferente" (rule 7)
- Endings pessoais em todos os cases (rule 8)
- Anos e ordem dos cards corrigidos no frontmatter

### ~~🔴 Crítico — Enterprise AI Assistant (PT + EN)~~

O guia foi derivado diretamente desse case. Ele contém as frases citadas como exemplos de AI tells:

- EN: substituir `"Trust is non-negotiable in enterprise"` → nomear o custo concreto (rule 5)
- EN: substituir `"reduces blank-screen anxiety"` → frase mais específica (tabela Quick reference)
- EN: substituir `"collected via CSAT and in-product feedback mechanisms"` → remover ou virar "What I'd Do Differently" (rule 7)
- EN: substituir `"that's enough to stall adoption"` → `"that's enough to kill it"` (tabela Quick reference)
- EN: reescrever ending — `"Visible traceability isn't a UX detail; it's the condition for a correct answer to actually be used."` é literalmente o **AI version** do rule 8
- PT: equivalentes das frases acima em português
- Ambos: adicionar uma frase de dúvida ("a decisão que eu estava menos certo" — rule 2)
- Ambos: variar estrutura de pelo menos 1 das 4 decisões P→O→C→W (rule 3)
- Ambos: mencionar o que não foi validado (rule 6)

### 🟠 Alto — Shipping, Arezzo, Hypera (PT + EN cada)

**Problema compartilhado — Impact section vazia (rule 7):**
Todos têm 3 de 3–4 métricas quantitativas como `⬜`. Impact section sem números é pior que nenhuma Impact section.
Decisão a tomar para cada: ou preencher com dados reais, ou substituir a seção por "O que eu faria diferente".

- `shipping-capacity-platform`: 3 métricas ⬜ no Impact
- `arezzo-ad-management`: 3 métricas ⬜ no Impact
- `hypera-hypergestor`: 3 métricas ⬜ no Impact

**Outros issues comuns nesses três:**
- Adicionar dúvida expressa (rule 2)
- Variar estrutura de pelo menos 1 decisão (rule 3)

### 🟡 Médio — todos os outros cases (PT + EN)

Issues sistêmicos que afetam todos os 8 cases:

1. **Nenhum case expressa dúvida** (rule 2) — uma frase por case: "essa foi a decisão em que eu estava menos certo"
2. **Estrutura P→O→C→W 100% idêntica em todas as decisões** (rule 3) — variar pelo menos 1 decisão por case: narrativa, raciocínio primeiro, ou "o que não validei"
3. **Endings todos conclusivos, nenhum pessoal** (rule 8) — a última frase de Aprendizados deve soar como quem fechou o computador e pensou no caminho de volta
4. **Nenhum case menciona o que não foi validado** (rule 6)

Cartela Cores é o melhor case (tem métricas reais, tem limite honesto do modelo). Del Valle Kapo tem o melhor "momento de surpresa" (dado do GA). Esses dois são referência para os outros.

---

## Questões em aberto

Decisões que dependem do autor antes/durante o build:

- ✅ **Domínio:** `portfolio.jefersonfreiry.com` — Cloudflare + Vercel, HTTPS ativo
- ✅ **Idioma padrão:** EN na raiz (`/`), PT em `/pt`
- ✅ **Analytics:** Vercel Web Analytics ativo desde a Fase 1
- ✅ **Cases no lançamento:** todos os 8 estão com arquivo `.md` criado; definir quais ficam `draft: false` para o v1 está em aberto
- ⬜ **Métricas dos cases:** preencher os `⬜` de impacto em [cases-portfolio.md](cases-portfolio.md) antes de publicar.
- ✅ **Currículo:** PDF linkado, versões PT e EN (arquivos a adicionar em `public/`)
- ✅ **Contato:** formulário que envia para `jfreiry@gmail.com` + botão WhatsApp
- ✅ **Modo escuro:** sim, com toggle claro/escuro
- ✅ **Microinterações:** expressivas — animações com personalidade (scroll reveals, hover states, transições de página)
