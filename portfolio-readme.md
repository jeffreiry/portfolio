# Portfólio Jeferson Freiry · Guia do Projeto

Portfólio pessoal de **Product Designer Sênior**, construído em Astro com cases
bilíngues (PT/EN) em Markdown, hospedado na Vercel.

**URL:** https://portfolio.jefersonfreiry.com
**Repositório:** github.com/jeffreiry/portfolio
**Objetivo:** vitrine para candidaturas a vagas de Product Designer Sênior

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Astro 6 |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS v4 |
| Interatividade | Svelte 5 (ilhas) |
| Conteúdo | Content Collections (Markdown) |
| i18n | Astro i18n routing (EN raiz + PT em /pt) |
| Hospedagem | Vercel (output hybrid) |
| Fontes | Cactus Regular (display) + Barlow (corpo) |
| Email | Resend (formulário de contato) |
| Versionamento | Git → GitHub |

---

## Estrutura de arquivos

```
Portfolio/
├── CLAUDE.md                       # Instruções operacionais para o Claude Code
├── portfolio-readme.md             # Este arquivo
├── docs/
│   ├── design-system.md            # Cores, tipografia, espaçamento, componentes
│   ├── cases-portfolio.md          # Guia-mestre + modelo técnico + cases escritos (PT/EN)
│   └── roadmap.md                  # Fases, decisões técnicas e questões em aberto
├── src/
│   ├── content.config.ts           # Schema Zod do frontmatter dos cases
│   ├── content/
│   │   └── cases/
│   │       ├── pt/                 # 8 cases em português (.md)
│   │       └── en/                 # 8 cases em inglês (.md)
│   ├── components/
│   │   ├── Header.astro            # Nav sticky com logo, links, toggle dark e switcher EN↔PT
│   │   ├── Hero.astro              # Card escuro com headline + CTA
│   │   ├── CaseCard.astro          # Card de case com cover, tags e hover expressivo
│   │   ├── Footer.astro            # Copyright e links sociais
│   │   ├── ContactForm.svelte      # Ilha Svelte: formulário com estados loading/sucesso/erro
│   │   └── ThemeToggle.svelte      # Ilha Svelte: toggle dark/light mode
│   ├── layouts/
│   │   └── Base.astro              # Shell HTML: SEO, meta, fonts, anti-flash dark mode
│   ├── middleware.ts               # Proteção por senha em /work/* e /pt/work/*
│   ├── pages/
│   │   ├── index.astro             # Home EN (raiz)
│   │   ├── login.astro             # Tela de login (proteção de cases)
│   │   ├── contact.astro           # Página de contato EN
│   │   ├── api/
│   │   │   ├── login.ts            # POST — valida senha, define cookie
│   │   │   ├── logout.ts           # POST — apaga cookie
│   │   │   └── contact.ts          # POST — envia email via Resend
│   │   ├── work/[slug].astro       # Página de case EN (SSR)
│   │   └── pt/
│   │       ├── index.astro         # Home PT
│   │       ├── contact.astro       # Página de contato PT
│   │       └── work/[slug].astro   # Página de case PT (SSR)
│   └── styles/
│       └── global.css              # Tokens Tailwind v4 (@theme), dark mode, animações
├── public/
│   ├── Jeferson_Freiry_PT.pdf      # Currículo em português
│   ├── Jeferson_Freiry_EN.pdf      # Resume in English
│   ├── cases/                      # Imagens de cover por case (a preencher)
│   └── favicon.svg
├── astro.config.mjs                # output: hybrid, adapter Vercel, i18n
├── svelte.config.js
└── package.json
```

---

## Arquitetura de conteúdo

Os cases vivem em `src/content/cases/{pt,en}/` como Markdown puro. O Astro os
carrega via **content collections** com frontmatter tipado (TypeScript). Não há
banco de dados nem CMS — o conteúdo é versionado no Git.

```
src/content/cases/pt/projeto-x.md  ─┐
src/content/cases/en/projeto-x.md  ─┤→ content collection → páginas SSR
config.ts (schema do frontmatter)  ─┘   (protegidas por senha via middleware)
```

Cada case PT tem um par EN com o mesmo `slug`. Campos ainda não definidos ficam
com `⬜`. Detalhes do modelo e o template completo em
[docs/cases-portfolio.md](docs/cases-portfolio.md).

---

## Identidade visual

Formalizada em [docs/design-system.md](docs/design-system.md):

- **Tipografia:** Cactus Regular (títulos uppercase, via @font-face em `public/fonts/`) + Barlow 300–500 (corpo)
- **Acento:** laranja jambu `#ed6707`
- **Fundo:** off-white `#f5f2ee` (light) · warm dark `#18120e` (dark)
- **Texto principal:** cha-mate `#5c2d11` (light) · `#e8ddd5` (dark)
- **Container:** `1200px` máx · grade de cases em 2 colunas
- **Dark mode:** tokens warm-dark via `html[data-theme="dark"]`, toggle no Header

---

## Rodando localmente

```bash
# 1. Instalar dependências
npm install

# 2. Servidor de desenvolvimento
npm run dev
# → http://localhost:4321

# 3. Build de produção
npm run build

# 4. Preview do build
npm run preview
```

---

## Variáveis de ambiente (Vercel)

| Variável | Para quê |
|---|---|
| `PORTFOLIO_PASSWORD` | Proteção por senha nas páginas de case (`/work/*`) |
| `RESEND_API_KEY` | Envio de email do formulário de contato |

---

## Deploy — Vercel

- **Trigger:** automático a cada push para `main`
- **Build command:** `npm run build`
- **Output:** hybrid (SSR para middleware e API routes, estático para o resto)
- **Domínio:** `portfolio.jefersonfreiry.com` (Cloudflare DNS → Vercel)

---

## Estado atual

**Fase 5 em andamento · Deploy ativo.** O site está em produção com 8 cases
bilíngues (6 publicados, 2 em draft), proteção por senha, formulário de contato
com Resend, dark mode e microinterações expressivas.

**Pendente (Fase 5):**
- Responsividade fina nos 3 breakpoints (≥1200 / 810–1199 / ≤809)
- Acessibilidade: foco, contraste WCAG AA, leitor de tela
- Lighthouse 95+ em todas as métricas
- Preencher métricas reais (`⬜`) nos frontmatters dos cases
- Reunir e otimizar imagens de cada case em `public/cases/<slug>/`
