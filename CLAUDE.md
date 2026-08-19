# CLAUDE.md · Portfólio Jeferson Freiry

Instruções operacionais para o Claude Code trabalhar neste repositório.
Estas instruções têm prioridade sobre o comportamento padrão.

---

## O que é este projeto

Portfólio pessoal de **Jeferson Freiry — Product Designer Sênior**, voltado a
candidaturas para vagas sênior. Site próprio, em código, acessado via
`portfolio.jefersonfreiry.com`, com controle total de identidade, performance e conteúdo.

Objetivo de negócio: o portfólio é a peça central de recrutamento. Cada decisão
deve servir a **clareza da narrativa dos cases** e à **qualidade percebida**
(performance, tipografia, microinterações) — é a vitrine do trabalho de um designer.

---

## Stack

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| Framework | **Astro 6** | Site centrado em conteúdo; zero-JS por padrão; content collections tipadas; i18n nativo |
| Linguagem | **TypeScript** | Frontmatter de cases tipado e seguro |
| Estilo | **Tailwind CSS v4** | Tokens do design system como utilitários; rápido de iterar |
| Interatividade | **Svelte 5 (ilhas)** | Aproveita o conhecimento do autor; só hidrata o que precisa |
| Conteúdo | **Content Collections (Markdown)** | Cases em Markdown puro, versionados no Git |
| i18n | **Astro i18n routing** | PT (padrão) + EN |
| Deploy | **Vercel** | Mesmo fluxo do projeto Painel Saúde |
| Fontes | **DM Serif Display** (display) + **Barlow 500/800** (corpo) | Ambas self-hosted em `public/fonts/` com subset latin para performance mobile |

> A stack foi decidida pelo Claude a pedido do autor. O racional completo e as
> alternativas consideradas estão em [docs/roadmap.md](docs/roadmap.md).

---

## Princípios inegociáveis

1. **Conteúdo antes de código.** Os cases ditam a estrutura, não o contrário.
2. **Markdown puro nos cases.** Sem componentes acoplados ao texto. Lacunas a
   preencher são marcadas com `⬜` (convenção do autor).
3. **Bilíngue de verdade.** Todo case e toda página de UI existem em PT e EN.
   Nunca deixar conteúdo só em um idioma sem marcar a lacuna com `⬜`.
4. **Zero-JS por padrão.** Só usar ilha Svelte quando houver interação real.
5. **Acessibilidade e performance não são fase final.** Lighthouse 95+ em todas
   as métricas é meta contínua, não um polish do fim.
6. **Identidade visual derivada do design system** em
   [docs/design-system.md](docs/design-system.md) — não inventar cores/tipos novos
   sem registrar lá primeiro.

---

## Documentação do projeto

| Arquivo | Para quê |
|---------|----------|
| [portfolio-readme.md](portfolio-readme.md) | Visão geral, estrutura de arquivos, como rodar |
| [docs/design-system.md](docs/design-system.md) | Cores, tipografia, espaçamento, componentes |
| [docs/cases-portfolio.md](docs/cases-portfolio.md) | **Guia-mestre dos cases**: régua sênior, template, narrativa, modelo técnico no Astro (arquivos, schema, i18n) + os cases já escritos (PT/EN) |
| [docs/home-copy.md](docs/home-copy.md) | Textos editáveis da home (hero, sobre, carreira, contato) em PT+EN — autor edita aqui, Claude aplica em `index.astro`/`pt/index.astro` |
| [docs/a11y-checklist.md](docs/a11y-checklist.md) | Checklist de leitor de tela (NVDA/VoiceOver) — passada manual de acessibilidade |
| [docs/roadmap.md](docs/roadmap.md) | Fases de construção, decisões técnicas e questões em aberto |
| [Bench_designers/_insights-melhorias.md](Bench_designers/_insights-melhorias.md) | Insights consolidados de benchmark de designers — referência para melhorias nas páginas de case |

Antes de implementar qualquer coisa, ler o doc relevante. Ao tomar uma decisão
de arquitetura nova, registrá-la na seção "Decisões técnicas" do roadmap.

---

## Convenções

- **Idioma da documentação e dos commits:** Português (PT-BR).
- **Idioma do código** (variáveis, componentes, rotas): Inglês.
- **Conteúdo dos cases:** PT e EN, em arquivos separados por idioma.
- **Commits:** mensagens curtas em PT, estilo `feat:`, `fix:`, `chore:`,
  `content:` (novo para entradas de case/conteúdo).
- **Nunca commitar** sem o autor pedir explicitamente.
- Marcar todo texto/dado ainda não definido com `⬜` em vez de inventar.

---

## Ao escrever ou reescrever cases

Antes de redigir ou revisar qualquer case, fazer as perguntas abaixo ao autor. São derivadas dos gaps transversais identificados em [Bench_job_applications/_index.md](Bench_job_applications/_index.md) — cada resposta preenchida aumenta o score de aderência em todas as vagas:

1. **Artefatos** — "Tem telas, flows ou wireframes disponíveis? (screenshots do Figma, Notion ou exportações)"
2. **Métricas** — "Há algum número de resultado real? (tempo economizado, usuários impactados, taxa de adoção, redução de erros)"
3. **Acessibilidade** — "Houve alguma decisão de acessibilidade no projeto? (contraste, daltonismo, leitor de tela, navegação por teclado)"
4. **Mobile** — "O produto tinha versão mobile ou responsiva? Houve decisões específicas de design para mobile?"
5. **Mentoria/liderança** — "Neste projeto, você fez onboarding de alguém, revisou o trabalho de outro designer, ou apresentou decisões de design internamente?"

---

## Decisões de produto fechadas

| Decisão | Escolha |
|---|---|
| Currículo | PDF linkado, versões PT e EN (`public/Jeferson_Freiry_PT.pdf` e `public/Jeferson_Freiry_EN.pdf`) |
| Contato | Formulário (envia para `jfreiry@gmail.com`) + botão WhatsApp |
| Modo escuro | Sim, com toggle claro/escuro |
| Microinterações | Expressivas — scroll reveals, hover com personalidade, transições de página |
| Visibilidade de case novo | `draft: true` só enquanto o projeto pessoal está incompleto (hoje: `cartela-cores`, `painel-saude`). Todo o resto fica `draft: false`. Cases sob NDA/empresa confidencial ganham `protected: true` (exige senha do `/login` ou `?access=` do link mágico — ver `PORTFOLIO_ACCESS_TOKEN`); cases com cliente nomeável ficam públicos sem `protected`. |

---

## Variáveis de ambiente necessárias

| Variável | Onde usar | Para quê |
|---|---|---|
| `PORTFOLIO_PASSWORD` | Vercel → Settings → Env Vars | Proteção por senha só dos cases com `protected: true` no frontmatter (não é mais `/work/*` inteiro) |
| `PORTFOLIO_ACCESS_TOKEN` | Vercel → Settings → Env Vars | Token de link mágico — `?access=TOKEN` em qualquer URL do site seta o cookie de sessão dos cases sem passar pelo `/login`. Separado da senha de propósito (dá pra trocar o link mandado a recrutadores sem mexer na senha manual). Gerar como string longa aleatória, nunca digitada — só existe embutida no link (ex: `openssl rand -hex 24`) |
| `JOBANALYSIS_PASSWORD` | Vercel → Settings → Env Vars | Senha do bench (`/jobanalysis`), totalmente independente dos cases (sem fallback pra `PORTFOLIO_PASSWORD`) |
| `RESEND_API_KEY` | Vercel → Settings → Env Vars | Envio de email do formulário de contato |
| `ANTHROPIC_API_KEY` | Vercel → Settings → Env Vars | Análise de vagas com Claude (passo 2 do pipeline em `/api/jobanalysis-analyze`) |

O sender do Resend configurado é `contato@portfolio.jefersonfreiry.com` — o domínio precisa ser verificado no painel do Resend antes do envio funcionar em produção.

---

## Estado atual

**Fase 5 concluída. Fase 6 (fundação) implementada em 2026-06-19 — ver [docs/roadmap.md](docs/roadmap.md#fase-6).** Formulário de contato, dark mode e microinterações expressivas implementados. PDFs de currículo em `public/`. Acessibilidade: skip nav, foco visível, contraste AA auditado, segunda passada de código (2026-06-19). Sitemap implementado. Hero com vídeo `Gh011011.mp4` (autoral, 8MB) e carregamento condicional (mobile/slow-connection recebe fallback de imagem Unsplash). Revisão de voz concluída em 2026-06-11 (9 cases × 18 arquivos). Reestruturação de seções concluída em 2026-07-12: 7 cases publicados reduzidos de 11 → 6 seções (My Role + Constraints → Context & Problem; Technical Collaboration → Process & Decisions; Solution + Craft → Solution & Craft; What I'd Do Differently + Learnings → Learnings). Power Apps: 5 seções. Seção de voz humana (4.1) e template-mestre atualizados em docs/cases-portfolio.md. Lighthouse auditado em 2026-06-11: Desktop 99/95/100/100 ✅. Re-auditado mobile em 2026-06-19 após correções: FCP 1.0s (100), LCP 2.0s (97), Speed Index 1.0s (100) — meta de 95+ performance mobile atingida ✅. Bench de 26 vagas, média 54%; ver [Bench_job_applications/_index.md](Bench_job_applications/_index.md).

**Revisão de imagens e consistência visual-narrativa (2026-07-12):** Auditoria completa de todos os cases publicados. Regra implementada: imagens de solução não podem aparecer em seções de Contexto & Problema; alt text deve descrever elementos literalmente visíveis na tela. Correções aplicadas em 8 arquivos (EN+PT): Arezzo (01-store-view.png movida para Solution, alt text de 03-admin-view.png corrigido), Enterprise AI (02-user-research.png removida de Discovery, reposicionada em Solution), Del Valle Website (01-home.png removida de Context, reposicionada em Solution), Del Valle Kapo (01-smatphone.png removida de Context, reposicionada em Solution). Alt texts vazios `![]()` preenchidos: Enterprise AI (03-main-interface.png, 01-file-source.png EN+PT) e Shipping (01-route-calendar.png, 02-route-opportunities.png, 03-route-simulation.png EN+PT). Seção 4.2 "Imagens e texto — consistência visual-narrativa" adicionada em docs/cases-portfolio.md com 3 regras e checklist.

**Reposicionamento de imagens em todos os cases (2026-07-12):** Segunda passada: cada imagem aparece imediatamente após o texto que a descreve, sem imagens consecutivas sem texto entre elas. Moves em 12 arquivos (EN+PT): Arezzo (02-manager-view após D4, 03-admin-view após D3 — saiu do fim do Solution); Enterprise AI (03-main-interface após bullet 1, 02-user-research após bullet do source panel, 01-file-source após bullet de acessibilidade); Del Valle Website (02-tablet após D4, 03-smarphone após bullet de mobile); Del Valle Kapo (02-brincadeiras após D3, 03-brincadeiras-mobile após bullet da Hora de Brincar); Shipping (01-route-calendar após D1, 02 e 03 intercaladas com bullets no Solution); Power Apps (03-csat após lista de escopo, 03-faq após Brand Center, 02-actions após frase de replicabilidade). Título PT do Shipping corrigido. Next Case banner: usa `detectHero(nextCase.data.slug)` com fallback para `cover` e Unsplash (EN+PT em `work/[slug].astro`).

**Integração Painel Saúde (2026-06-15):** Widgets `RunWidget.astro` e `WorkoutWidget.astro` adicionados ao About, mostrando km mensais (Strava) e horas mensais de treino (Hevy) via API em `painel-saude-zeta.vercel.app`. Bottom row dos widgets em `flex-column` (count acima, "Syncing with" abaixo — evita quebra no mobile). Rebuild automático do portfólio via Vercel deploy hook sempre que o painel-saude detectar dados novos no sync diário (00:00 BRT). Logos em `public/logos/` (strava.png, hevy.png); brancos no dark mode via `filter: brightness(0) invert(1)`. Fundo dos widgets: `#fafafa` (light) / `var(--color-surface)` (dark) — igual aos cards de carreira. Widgets com scroll reveal (`data-animate`).

**Hero vídeo mobile (2026-06-19):** `Gh011011_mobile.mp4` (4.8MB, 640p) adicionado em `public/`. `Hero.astro` atualiza o JS para carregar a versão mobile em viewports < 768px e a versão desktop (8.1MB) em ≥ 768px. Conexão lenta ou `prefers-reduced-motion` mantém fallback de imagem. O `data-src-mobile` é derivado automaticamente do `bgVideo` via `.replace('.mp4', '_mobile.mp4')`.

**Dev local (2026-06-18):** `astro.config.mjs` exclui `**/.vercel/**` do Vite watcher para evitar `ELOOP: too many symbolic links` ao rodar `npm run dev`.

**Fix formulário de contato (2026-06-19):** `POST /api/contact` retornava HTTP 405 em produção porque, com `output: 'static'`, o Astro 6 prerenderiza todo endpoint por padrão e o `src/pages/api/contact.ts` não tinha `export const prerender = false` (diferente de `login.ts`/`logout.ts`). O endpoint virava arquivo estático em vez de função serverless. **Todo endpoint de API novo deve declarar `export const prerender = false`** enquanto o `output` for `static`. Também adicionado `console.error('[contact] Resend send failed:', error)` no caminho de falha para diagnóstico via logs da Vercel. Pré-requisitos do envio (que o build estático mascarava): `RESEND_API_KEY` setada na Vercel e domínio `portfolio.jefersonfreiry.com` verificado no Resend.

**Página /jobanalysis (2026-06-18, atualizada 2026-06-19):** Rota PT única (`src/pages/jobanalysis.astro`) com os resultados do bench de candidaturas: resumo, ranking de aderência, gaps transversais e metodologia. **Dados lidos dinamicamente via `fs.readdirSync`** dos arquivos `.md` em `Bench_job_applications/` a cada requisição SSR — não há array hardcoded de vagas. O parser extrai: score, empresa, cargo, produto, data, status, candidatura, blockquote de interpretação, tags de competências, gaps (bloqueadores/ausentes/boa aderência) e breakdown (obtObrig/maxObrigW/obtPref/maxPrefW). **Protegida por senha própria** (`JOBANALYSIS_PASSWORD`, independente dos cases): `prerender = false` + lógica de áreas em `src/auth.ts`. Defesa em profundidade: `noindex={true}` + fora do sitemap. **Nota (2026-08-19):** entre algum momento e essa data o middleware tinha ficado com um bloqueio incondicional (404 sempre em produção, sem checar senha nenhuma) — a página nunca esteve de fato acessível via senha, apesar da doc dizer o contrário. Corrigido: `/jobanalysis` agora usa o mesmo mecanismo de área/senha de `src/auth.ts` (`requireAuth` em `src/middleware.ts`), com `JOBANALYSIS_PASSWORD` configurada na Vercel. **Cards:** blockquote de interpretação, tags de competências, data de postagem, botão de candidatura (modal com toggle Sim/Não + status), filtros pill (Candidatura e Aderência), botão Editar (reabre modal de análise com slug pré-definido). **Expander "Ver análise":** seção inline colapsável por card — breakdown do score em duas mini-barras (Obrigatórios ×2 e Preferidos ×1 com pts obtido/máximo) + grid 3 colunas com 🔴 Bloqueadores, 🟡 Ausentes, 🟢 Boa aderência. Animação CSS via `grid-template-rows: 0fr → 1fr`. **Análise via IA — pipeline dois passos (atualizado 2026-08-19):** Passo 1: Groq `openai/gpt-oss-120b` extrai JSON estruturado da JD `{empresa, produto, cargo, nivel, data, obrigatorios[], preferenciais[]}` — só parsing, sem scoring. (Antes era `llama-3.3-70b-versatile`, descontinuado pela Groq — checar `GET /openai/v1/models` na Groq se esse modelo também sumir do catálogo no futuro.) Passo 2: Claude `claude-sonnet-4-6` recebe os requisitos estruturados + contexto completo do portfolio (9 cases com detalhes específicos, regras de evidência e gaps estratégicos) → gera análise completa com raciocínio estratégico contextualizado. **O servidor recalcula tudo deterministicamente:** score (math exato das tabelas), subtotais, tabela de cálculo. O Claude não faz aritmética — só avalia e raciocina. Requer `ANTHROPIC_API_KEY` no `.env` local e na Vercel. **Atenção técnica:** acessar `process.env` via variável local (`const _env = process.env`) para evitar que o Vite faça inlining estático das keys em build time — `process.env['VAR']` direto pode ser substituído por `undefined` no bundle. **Escrita de arquivo funciona apenas localmente** (filesystem read-only na Vercel) — na produção o card aparece na sessão mas não persiste ao recarregar. O array `gaps[]` da seção "Gaps transversais" permanece hardcoded — ao atualizar o `_index.md`, sincronizar na página. **Bench atual: 26 vagas, média 54%. "Atualizado em" na página é dinâmico (lê a data mais recente dos arquivos .md).**

**Seção About (2026-06-15):** Education/Formação e label de hobbies usam estilo de label 11px uppercase (`font-body`, 600, 0.12em letter-spacing, `color-faint`). Botão de currículo: "Download my Resume" / "Baixe meu Currículo". Logo header: `jeferson-black.png` (light) / `jeferson-white.png` (dark).

**Seção Cases (2026-06-15):** Tags reestruturadas para 7 categorias de filtro: Enterprise, AI & Automation, UX Research, Design System, Branding, Mobile, Data & Analytics. Drafts recebem tag oculta "Projetos Pessoais". Filtro interativo (JS vanilla, `<script>` inline) adicionado acima do grid em EN e PT — botões pill, "All/Todos" ativo por padrão. `CaseCard.astro` simplificado: campo `role` removido do card, exibe apenas o `year`.

**Acessibilidade WCAG AA (2026-06-15):** Auditoria de contraste por script (`f(c)` luminância relativa). Tokens novos: `--color-jambu-text` (#a8480c light / jambu dark) para jambu como texto/borda; `--color-jambu-deep` (#a8480c) para texto branco sobre laranja (Hero CTA, submit, skip-link). `--color-faint` escurecido em ambos os modos para ≥4.5:1. Bars decorativas mantêm `--color-jambu`. Formulário de contato: validação acessível (`aria-invalid`/`aria-describedby`/erros inline), foco gerenciado, `aria-live`. **Ao criar elementos novos: nunca usar `--color-jambu` como texto sobre fundo claro nem texto branco sobre `--color-jambu` — usar os tokens `-text`/`-deep`.** Pendente: passada de leitor de tela end-to-end.

**A11y e performance (2026-06-19):** Segunda passada de código de acessibilidade: `login.astro` Google Fonts → self-hosted (eliminava render-blocking); `role="alert"` + `aria-required` + `aria-describedby` no login; filter buttons com `aria-pressed` + live region de resultado; `CaseCard` `h2` → `h3` (hierarquia correta); "Other activities" `<p>` → `<h3>`; `ThemeToggle` com `focus-visible`; dots pulsantes dos widgets com `prefers-reduced-motion`; `ContactForm` `client:load` → `client:visible` (reduz TBT). Performance: `preconnect` + `dns-prefetch` para `images.unsplash.com` (hero LCP). Gargalo restante: hero `bgImage` externo — mover para asset self-hosted fecha o Lighthouse mobile.

**Sitemap (2026-06-19):** `astro.config.mjs` com `customPages` para os 7 cases publicados (EN + PT = 14 URLs), filtro para `/jobanalysis` e `/login`. `public/robots.txt` criado.

**Responsividade fina e a11y de contraste (2026-06-23):** Education e Activities grids na home (EN+PT) corrigidos de `grid-cols-2` fixo para `sm:grid-cols-2` — em mobile (<640px) ficam em 1 coluna. Tables nos cases receberam `display: block; overflow-x: auto` para evitar vazamento em viewports estreitos. `CaseCard` tags: `--text-secondary` → `--text-primary` sobre `--bg-surface-alt` (contraste era ~3.5:1, agora ≥7:1, WCAG AA cumprido).

**Fase 6 — Design System maturity (100% concluída, 2026-06-19):** Tokens de tipografia (`--text-*`, `--leading-*`, `--tracking-*`), motion (`--duration-*`, `--ease-out-expo`), raios e espaçamento adicionados ao `@theme`. Tokens `--text-section` (28px) e `--text-card` (24px) adicionados para fechar gaps da escala real. Camada semântica em `:root` + utilities CSS (`text-heading`, `text-primary`, `text-secondary`, `text-subtle`, `bg-surface-alt`). Migração total: `CaseCard`, `Header`, `Footer`, `RunWidget`, `WorkoutWidget`, `ContactForm`, `index.astro` EN+PT, `work/[slug].astro` EN+PT — zero primitivos no markup público. Tamanhos px arbitrários migrados para tokens (`text-[28px]` → `text-section`, `text-[10px]` → `text-caption`, etc.). `ContactForm` migrado para tokens semânticos + `var(--radius-input/pill)`. `design-system.md` completo: escala tipográfica, matriz de 5 variantes de botão, 4 estados de UI (empty/loading/error/success), iconografia formalizada. **Regra:** todo componente novo usa apenas tokens semânticos — nunca primitivos diretamente.

**Imagens dos cases (2026-06-20):** Imagens reais adicionadas em `public/cases/{slug}/`. Convenção de arquivos por case: `card-home.*` (imagem da home card) + `hero.*` (background do hero do case) + arquivos numerados `01-*.png`, `02-*.png`, `03-*.png` para screenshots inline. `src/utils/cover.ts` — `detectHero(slug)` procura `hero.*` → fallback `visao-geral.*`; `detectCardImage(slug)` procura `card-home.*` → fallback `visao-geral.*`; ambas via `fs.existsSync`. Usado em `index.astro` (EN+PT) como `cover={detectCardImage(slug) ?? c.data.cover}` e em `work/[slug].astro` (EN+PT) como `heroBg = detectHero(slug!) ?? entry.data.cover ?? bgImage`. Cases sem `card-home` ou `hero` fazem fallback para `visao-geral.*` ou `bgImage` Unsplash — nenhum case quebra. Placeholders `<div class="image-placeholder">` substituídos por `![alt](path)` nos cases com screenshots disponíveis (PT+EN). Extensões `.jpg` corrigidas para `.png` nos frontmatters de arezzo, del-valle-kapo, del-valle-website e power-apps-dummy-app.

**Próximas ações por criticidade:** 🔴 métricas de impacto (`⬜`), 🟠 acessibilidade enterprise nos cases, 🟠 passada manual de leitor de tela (NVDA/VoiceOver).

Estrutura de código real: `src/components/`, `src/layouts/`, `src/pages/`,
`src/content/cases/{pt,en}/` (9 cases × 2 idiomas — 4 públicos + 3 protegidos por senha + 2 draft), `src/middleware.ts`
(proteção por senha por case individual via campo `protected` no frontmatter — não é mais o `/work/*` inteiro, ver `src/auth.ts`), `src/pages/api/login.ts` + `logout.ts`.
