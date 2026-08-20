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
| Hospedagem | Vercel (output static + SSR por rota via `prerender = false`) |
| Fontes | DM Serif Display (display) + Barlow 500/800 (corpo) |
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
│   ├── a11y-checklist.md           # Checklist de leitor de tela (NVDA/VoiceOver)
│   └── roadmap.md                  # Fases, decisões técnicas e questões em aberto
├── Bench_designers/
│   ├── _prompt-template.md         # Prompt para análise de cases no Claude (chrome/web)
│   ├── _insights-melhorias.md      # Insights consolidados de todos os benchmarks (atualizado a cada análise)
│   └── *.md                        # Análises individuais por case/designer benchmarkado
├── src/
│   ├── content.config.ts           # Schema Zod do frontmatter dos cases
│   ├── content/
│   │   └── cases/
│   │       ├── pt/                 # 9 cases em português (.md)
│   │       └── en/                 # 9 cases em inglês (.md)
│   ├── components/
│   │   ├── Header.astro            # Nav sticky com logo, links, toggle dark e switcher EN↔PT
│   │   ├── Hero.astro              # Card escuro com headline + CTA
│   │   ├── CaseCard.astro          # Card de case com cover, tags e hover expressivo
│   │   ├── Footer.astro            # Copyright e links sociais
│   │   ├── RunWidget.astro         # Widget Strava: km mensais via painel-saude API
│   │   ├── WorkoutWidget.astro     # Widget Hevy: horas mensais via painel-saude API
│   │   ├── ContactForm.svelte      # Ilha Svelte: formulário com estados loading/sucesso/erro
│   │   └── ThemeToggle.svelte      # Ilha Svelte: toggle dark/light mode
│   ├── layouts/
│   │   └── Base.astro              # Shell HTML: SEO, meta, fonts, anti-flash dark mode
│   ├── middleware.ts               # Proteção por senha/link mágico por case (só os com `protected: true`) + /jobanalysis
│   ├── pages/
│   │   ├── index.astro             # Home EN (raiz)
│   │   ├── jobanalysis.astro       # Bench de candidaturas (PT, SSR, protegido por senha própria). Ações de escrita (Nova Vaga/Editar/Candidatura) só aparecem rodando local — em produção é só-visualização (filesystem read-only na Vercel)
│   │   ├── login.astro             # Tela de login (proteção de cases)
│   │   ├── contact.astro           # Página de contato EN
│   │   ├── api/
│   │   │   ├── login.ts                  # POST — valida senha, define cookie
│   │   │   ├── logout.ts                 # POST — apaga cookie
│   │   │   ├── contact.ts                # POST — envia email via Resend
│   │   │   ├── jobanalysis-update.ts     # POST — atualiza Candidatura/Status em arquivo .md
│   │   │   ├── jobanalysis-create.ts     # POST — cria novo arquivo .md de análise de vaga (manual)
│   │   │   └── jobanalysis-analyze.ts    # POST — pipeline Groq (extração) + Claude Sonnet (análise) → gera .md completo
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
│   ├── fonts/                      # Woff2 self-hosted: DM Serif Display + Barlow (5 arquivos, latin)
│   ├── logos/                      # Logos de parceiros (strava.png, hevy.png, etc.)
│   ├── cases/                      # Imagens de cover por case (a preencher)
│   └── favicon.svg
├── astro.config.mjs                # output: static (+ prerender=false por rota), adapter Vercel, i18n
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
config.ts (schema do frontmatter)  ─┘   (`protected: true` = senha/link mágico via middleware)
```

Cada case PT tem um par EN com o mesmo `slug`. Campos ainda não definidos ficam
com `⬜`. Detalhes do modelo e o template completo em
[docs/cases-portfolio.md](docs/cases-portfolio.md).

---

## Identidade visual

Formalizada em [docs/design-system.md](docs/design-system.md):

- **Tipografia:** DM Serif Display (títulos, self-hosted em `public/fonts/`) + Barlow 500/800 (corpo, self-hosted)
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
| `PORTFOLIO_PASSWORD` | Proteção por senha só dos cases com `protected: true` no frontmatter (não é mais `/work/*` inteiro) |
| `PORTFOLIO_ACCESS_TOKEN` | Token de link mágico (`?access=TOKEN`) — libera os cases protegidos sem passar pelo `/login`. Separado da senha de propósito |
| `JOBANALYSIS_PASSWORD` | Senha do bench (`/jobanalysis`), totalmente independente dos cases — **sem** fallback pra `PORTFOLIO_PASSWORD` |
| `RESEND_API_KEY` | Envio de email do formulário de contato |
| `GROQ_API_KEY` | Extração de estrutura da JD (passo 1 do pipeline em `/api/jobanalysis-analyze`) — modelo `openai/gpt-oss-120b` |
| `ANTHROPIC_API_KEY` | Análise de vagas com Claude Sonnet (passo 2 do pipeline em `/api/jobanalysis-analyze`) |

---

## Deploy — Vercel

- **Trigger:** automático a cada push para `main` — já falhou em silenciar 2x nesta sessão (webhook GitHub→Vercel não disparou); se um push não gerar deploy novo em `vercel ls`, rodar `vercel --prod --yes` manualmente
- **Build command:** `npm run build`
- **Output:** `static` — estático por padrão; rotas com `export const prerender = false` viram SSR sob demanda (cases protegidos, `/jobanalysis`, `/api/contact`), o que faz middleware e API routes funcionarem. (Astro 5+ unificou o antigo `hybrid` nesse modelo.)
- **Domínio:** `portfolio.jefersonfreiry.com` (Cloudflare DNS → Vercel)

---

## Estado atual

**Fase 5 concluída · Deploy ativo.** O site está em produção com 9 cases bilíngues — 4 públicos (sem senha), 3 protegidos por senha/link mágico (`protected: true`, cases sob NDA) e 2 em draft (`cartela-cores`, `painel-saude`) —, formulário de contato com Resend, dark mode e microinterações expressivas. Seção About com widgets ao vivo de Strava e Hevy (dados mensais via painel-saude API, rebuild automático via deploy hook). Seção Cases com filtro interativo por 7 categorias; `CaseCard` exibe apenas `year` (role removido). Lighthouse mobile 100/97/100/100 ✅.

**Link mágico (2026-08-19):** `?access=TOKEN` em qualquer URL do site libera os cases protegidos sem passar pelo `/login` — pensado pra mandar num link só pra recrutadores específicos. Funciona nativamente em páginas SSR (`/work/:slug`) via middleware; a home (estática) usa um endpoint (`/api/magic-link`) + script client-side, já que middleware não roda em rotas prerendered.

**Bench de vagas (2026-08-19 · 26 vagas · score médio 54%):** Análises em `Bench_job_applications/`, método Person-Job Fit ponderado. Pipeline de análise em dois passos: Groq (`openai/gpt-oss-120b`) extrai estrutura da JD em JSON, Claude Sonnet (`claude-sonnet-4-6`) raciocina sobre aderência ao portfolio com contexto completo dos 9 cases. Score e subtotais recalculados deterministicamente no servidor. "Atualizado em" na página dinâmico (lê maior `data` dos arquivos .md). Escrita de arquivo só funciona rodando local — em produção a página `/jobanalysis` é só-visualização (sem os botões Nova Vaga/Editar/Candidatura).

**Benchmark de designers (2026-06-19):** pasta `Bench_designers/` com 5 análises de cases de referência. Insights consolidados em `_insights-melhorias.md` por impacto/esforço.

**Pendente — por criticidade:**
- 🔴 **Artefatos visíveis** — expor telas, flows ou wireframes em pelo menos 3 cases (afeta todas as vagas)
- 🔴 **Métricas de impacto** (`⬜`) — Enterprise AI, Shipping, Arezzo, Hypera (afeta todas as vagas)
- 🟠 **Acessibilidade documentada** — enterprise cases precisam de 1 decisão WCAG; Cartela Cores é a referência
- 🟡 **Mobile como plataforma** — Arezzo tem tag "Mobile" sem narrativa de decisões
- 🟡 Passada completa de leitor de tela ([docs/a11y-checklist.md](docs/a11y-checklist.md))
- Reunir e otimizar imagens de cada case em `public/cases/<slug>/`
- ~~**Revisão de voz dos cases**~~ ✅ concluída (2026-06-11) — 9 cases × 18 arquivos PT+EN
