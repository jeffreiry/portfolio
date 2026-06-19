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
| Framework | **Astro 5** | Site centrado em conteúdo; zero-JS por padrão; content collections tipadas; i18n nativo |
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
| [docs/a11y-checklist.md](docs/a11y-checklist.md) | Checklist de leitor de tela (NVDA/VoiceOver) — passada manual de acessibilidade |
| [docs/roadmap.md](docs/roadmap.md) | Fases de construção, decisões técnicas e questões em aberto |

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
| Currículo | PDF linkado, versões PT e EN (`public/curriculo-pt.pdf` e `public/resume-en.pdf`) |
| Contato | Formulário (envia para `jfreiry@gmail.com`) + botão WhatsApp |
| Modo escuro | Sim, com toggle claro/escuro |
| Microinterações | Expressivas — scroll reveals, hover com personalidade, transições de página |

---

## Variáveis de ambiente necessárias

| Variável | Onde usar | Para quê |
|---|---|---|
| `PORTFOLIO_PASSWORD` | Vercel → Settings → Env Vars | Proteção por senha nas páginas de case (`/work/*`) |
| `JOBANALYSIS_PASSWORD` | Vercel → Settings → Env Vars | Senha do bench (`/jobanalysis`), independente dos cases. Se ausente, cai na `PORTFOLIO_PASSWORD` |
| `RESEND_API_KEY` | Vercel → Settings → Env Vars | Envio de email do formulário de contato |

O sender do Resend configurado é `contato@portfolio.jefersonfreiry.com` — o domínio precisa ser verificado no painel do Resend antes do envio funcionar em produção.

---

## Estado atual

**Fase 5 em andamento.** Formulário de contato, dark mode e microinterações expressivas implementados. PDFs de currículo em `public/`. Acessibilidade parcialmente implementada (skip nav, foco visível, contraste de títulos). Hero com vídeo `Gh011011.mp4` (autoral, 8MB) e carregamento condicional (mobile/slow-connection recebe fallback de imagem Unsplash). Revisão de voz concluída em 2026-06-11 (9 cases × 18 arquivos). Lighthouse auditado em 2026-06-11: Desktop 99/95/100/100 ✅, Mobile 73/95/100/100 ⚠️. Bench de 11 vagas concluído em 2026-06-12: score médio 60%; ver [Bench_job_applications/_index.md](Bench_job_applications/_index.md).

**Integração Painel Saúde (2026-06-15):** Widgets `RunWidget.astro` e `WorkoutWidget.astro` adicionados ao About, mostrando km mensais (Strava) e horas mensais de treino (Hevy) via API em `painel-saude-zeta.vercel.app`. Bottom row dos widgets em `flex-column` (count acima, "Syncing with" abaixo — evita quebra no mobile). Rebuild automático do portfólio via Vercel deploy hook sempre que o painel-saude detectar dados novos no sync diário (00:00 BRT). Logos em `public/logos/` (strava.png, hevy.png); brancos no dark mode via `filter: brightness(0) invert(1)`. Fundo dos widgets: `#fafafa` (light) / `var(--color-surface)` (dark) — igual aos cards de carreira. Widgets com scroll reveal (`data-animate`).

**Dev local (2026-06-18):** `astro.config.mjs` exclui `**/.vercel/**` do Vite watcher para evitar `ELOOP: too many symbolic links` ao rodar `npm run dev`.

**Página /jobanalysis (2026-06-18):** Rota PT única (`src/pages/jobanalysis.astro`) com os resultados do bench (`Bench_job_applications/_index.md`): resumo, ranking de aderência por vaga (barra de score), gaps transversais e metodologia. Dados embutidos na frontmatter (não vem do content collection). **Protegida por senha própria** (`JOBANALYSIS_PASSWORD`, independente dos cases): `prerender = false` + lógica de áreas em `src/auth.ts` (mapeia path → cookie + senha). O bench usa cookie `jobanalysis_auth`; cases usam `portfolio_auth`. `middleware.ts` e `api/login.ts` consomem `src/auth.ts`; `api/logout.ts` limpa os dois cookies. Fallback p/ `PORTFOLIO_PASSWORD` se `JOBANALYSIS_PASSWORD` não estiver setada. Defesa em profundidade: `noindex={true}` no `Base.astro` (nova prop, injeta `<meta name="robots" content="noindex, nofollow">`) e fora do sitemap via `filter` em `astro.config.mjs`. Ao atualizar o bench, sincronizar o array `vagas`/`gaps` da página.

**Seção About (2026-06-15):** Education/Formação e label de hobbies usam estilo de label 11px uppercase (`font-body`, 600, 0.12em letter-spacing, `color-faint`). Botão de currículo: "Download my Resume" / "Baixe meu Currículo". Logo header: `jeferson-black.png` (light) / `jeferson-white.png` (dark).

**Seção Cases (2026-06-15):** Tags reestruturadas para 7 categorias de filtro: Enterprise, AI & Automation, UX Research, Design System, Branding, Mobile, Data & Analytics. Drafts recebem tag oculta "Projetos Pessoais". Filtro interativo (JS vanilla, `<script>` inline) adicionado acima do grid em EN e PT — botões pill, "All/Todos" ativo por padrão. `CaseCard.astro` simplificado: campo `role` removido do card, exibe apenas o `year`.

**Acessibilidade WCAG AA (2026-06-15):** Auditoria de contraste por script (`f(c)` luminância relativa). Tokens novos: `--color-jambu-text` (#a8480c light / jambu dark) para jambu como texto/borda; `--color-jambu-deep` (#a8480c) para texto branco sobre laranja (Hero CTA, submit, skip-link). `--color-faint` escurecido em ambos os modos para ≥4.5:1. Bars decorativas mantêm `--color-jambu`. Formulário de contato: validação acessível (`aria-invalid`/`aria-describedby`/erros inline), foco gerenciado, `aria-live`. **Ao criar elementos novos: nunca usar `--color-jambu` como texto sobre fundo claro nem texto branco sobre `--color-jambu` — usar os tokens `-text`/`-deep`.** Pendente: passada de leitor de tela end-to-end.

**Próximas ações por criticidade:** 🔴 artefatos visíveis (telas/flows), 🔴 métricas de impacto (`⬜`), 🟠 acessibilidade enterprise, 🟠 performance mobile (Lighthouse 73→95+), 🟡 narrativa mobile.

Estrutura de código real: `src/components/`, `src/layouts/`, `src/pages/`,
`src/content/cases/{pt,en}/` (9 cases × 2 idiomas — 7 publicados + 2 draft), `src/middleware.ts`
(proteção por senha), `src/pages/api/login.ts` + `logout.ts`.
