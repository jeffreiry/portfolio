# Changelog · Portfólio Jeferson Freiry

## 2026-08-19

### Adicionado
- **Campo `thesis` preenchido nos 9 cases (PT+EN)** — primeira leva da "Fase 1" de [Bench_designers/_insights-melhorias.md](Bench_designers/_insights-melhorias.md#cruzamento-com-o-bench-de-vagas): a hero de cada case (H1 + subtítulo itálico) agora carrega a frase-manifesto que antes só aparecia depois do scroll, no primeiro H2 do corpo (`.case-content h2:first-of-type`, já estilizado desde antes como tese). Frases extraídas/condensadas do parágrafo "A virada" de cada case, não inventadas.

### Descoberto (infraestrutura da Fase 1 já existia)
- Pull-quote estilizado (`.case-content blockquote`), eyebrow labels de seção (`.case-content h2:not(:first-of-type)`), campo `metrics[].source` (schema + render) e count-up animado nas métricas já estavam implementados antes desta sessão — só não tinham conteúdo usando-os. Nenhum código novo necessário para esses itens.

### Não feito — motivo registrado
- **Fase 2 (métricas inline, count-up com dado real)**: bloqueada por dado, não por código. Das métricas hoje preenchidas, só Enterprise AI tem um número de impacto real (~8.000 usuários); o resto é escopo/prazo. Fazer "métricas distribuídas pela narrativa" agora seria construir em cima de `⬜` do `docs/gaps-para-responder.md`.
- **Fase 3 — captions de decisão**: cheguei a prototipar um plugin rehype para promover o `alt` das imagens a legenda visível, mas parei — `docs/cases-portfolio.md §4.2` documenta que o alt text é **deliberadamente** escopado a "o que está na tela", com a decisão de design vivendo no parágrafo imediatamente anterior à imagem (regra 1 da mesma seção). Promover o alt como está duplicaria "o que é mostrado", não entregaria "a decisão" que o insight pede — precisa de legendas novas, escritas propositalmente, não geradas do alt existente. Fica como tarefa separada.
- **Embeds** (Fase 3): depende de artefato vivo (Figma/Storybook) publicável — não avaliado ainda.

## 2026-08-18

### Adicionado
- **Proteção por senha por case individual** — novo campo `protected: boolean` no schema de `content.config.ts` (default `false`), independente de `draft`. Antes, `PORTFOLIO_PASSWORD` protegia `/work/*` inteiro como um bloco único; agora `src/middleware.ts` consulta a collection pelo slug (`workSlugFromPath` em `src/auth.ts`) e só exige login se aquele case específico tiver `protected: true` — o resto de `/work/*` fica público sem senha. `enterprise-ai-assistant`, `shipping-capacity-platform` e `power-apps-dummy-app` (PT+EN) marcados como `protected: true` (os dois primeiros saíram de `draft: true`, que os deixava inacessíveis mesmo com senha). Excluídos da home (EN+PT) e do carrossel "próximo case" em `[slug].astro`/`pt/[slug].astro` — só acessíveis via link direto + login. Removidos do `customPages` do sitemap em `astro.config.mjs`. Testado localmente (build + dev server): case protegido redireciona para `/login`, case público carrega direto, cookie de sessão após login libera todos os protegidos da área.

### Alterado
- **`Bench_job_applications/_index.md`** — reconciliadas 3 vagas analisadas em julho/2026 que nunca tinham entrado na tabela: Itaú Especialista Core Experience PF (72%, 2026-07-09), ADP Senior UX Designer (**89% — alta aderência, categoria "submeter"**, 2026-07-10) e Meta Product Designer (40%, 2026-07-11). Média geral atualizada de 52% (23 vagas) para 54% (26 vagas). Gap "UX Research estruturado" na tabela de gaps transversais passou a listar ADP e Itaú entre as vagas afetadas — ambas citam ausência de usability testing/A/B testing formal como bloqueador ou diferencial ausente.
- **`src/pages/jobanalysis.astro`** — array `gaps[]` (hardcoded, espelha a seção "Gaps transversais" do `_index.md`) sincronizado com a mudança acima.
- **Contagem de cases publicados**: 7 → 4 públicos sem senha (arezzo, del-valle-website, hypera-hypergestor, del-valle-kapo) + 3 protegidos por senha (`CLAUDE.md` atualizado).
- **Seção "[Não lançado]" deste changelog** — estava presa ao bench de 2026-06-12 (11 vagas) e misturava pendências já resolvidas (Lighthouse, responsividade, sitemap, imagens) com as ainda abertas. Reescrita para espelhar a tabela "Gaps transversais" atual do `_index.md` e separar o que já foi concluído.

---

## 2026-06-20

### Adicionado
- **Imagens dos cases** — screenshots em `public/cases/{slug}/`: `card-home.*` (card na home) + `hero.*` (hero do case) + `01-*.png / 02-*.png / 03-*.png` (inline) para arezzo-ad-management, del-valle-kapo, del-valle-website, enterprise-ai-assistant, shipping-capacity-platform e power-apps-dummy-app
- **`src/utils/cover.ts`** — `detectHero(slug)` detecta `hero.*` → fallback `visao-geral.*`; `detectCardImage(slug)` detecta `card-home.*` → fallback `visao-geral.*`; ambas via `fs.existsSync`, sem necessidade de `cover:` no frontmatter

### Alterado
- **Home (EN+PT)** — CaseCard recebe `cover={detectCardImage(slug) ?? c.data.cover}` — usa `card-home.*` se existir
- **`work/[slug].astro` (EN+PT)** — hero background resolvido via `detectHero(slug!) ?? entry.data.cover ?? bgImage` — usa `hero.*` se existir
- **`src/middleware.ts`** — senha vazia em dev libera acesso sem redirecionar ao login; em prod retorna 404
- **Cases content (EN+PT)** — placeholders `<div class="image-placeholder">` substituídos por `![alt](path)` em arezzo, del-valle-kapo e del-valle-website; 3ª imagem adicionada ao fim da seção Solução em cada um
- **Frontmatters** — extensão `.jpg` → `.png` em arezzo-ad-management, del-valle-kapo, del-valle-website e power-apps-dummy-app

---

## 2026-06-18

### Adicionado
- **Página `/jobanalysis`** (PT, só rota raiz) — apresenta os resultados do bench de candidaturas (`Bench_job_applications/_index.md`): resumo (11 vagas, média 60%), ranking de aderência com barra de score por vaga, gaps transversais e metodologia (rubrica + interpretação). Reusa tokens do design system. **Protegida por senha** (`PORTFOLIO_PASSWORD`) — `prerender = false` + prefixo `/jobanalysis` no `middleware.ts`. Defesa em profundidade: também `noindex, nofollow` (prop nova em `Base.astro`) e fora do sitemap (filtro em `astro.config.mjs`).

### Alterado
- **Auth por área** — `src/auth.ts` centraliza o mapa path → cookie + senha. `/jobanalysis` agora tem senha própria (`JOBANALYSIS_PASSWORD`, fallback p/ `PORTFOLIO_PASSWORD`) e cookie `jobanalysis_auth`, isolado dos cases. `middleware.ts`, `api/login.ts` e `api/logout.ts` (limpa os dois cookies) atualizados. Copy do `login.astro` neutralizado ("This page is protected").
- **Hero video** — substituído `hero.mp4` por `Gh011011.mp4` (vídeo de autoria própria) em EN e PT
- **RunWidget + WorkoutWidget** — bottom row alterado de `flex-row space-between` para `flex-column`, evitando quebra do "Syncing with" ao lado da contagem no mobile

### Corrigido
- **Vite watcher** — adicionado `**/.vercel/**` ao `server.watch.ignored` no `astro.config.mjs` para evitar `ELOOP: too many symbolic links` na pasta `.vercel/output/` ao rodar `dev` localmente

---

## [Não lançado]

### Pendente — por criticidade (bench 2026-08-18 · 26 vagas · score médio 54%)

Espelha a tabela "Gaps transversais" de [`Bench_job_applications/_index.md`](Bench_job_applications/_index.md) — ao atualizar uma, sincronizar a outra (e o array `gaps[]` em `src/pages/jobanalysis.astro`).

- 🔴 **Métricas de impacto** (`⬜`) (todas as vagas) — Enterprise AI, Shipping, Arezzo, Hypera
- 🔴 **Artefatos visíveis** (todas as vagas) — expor telas, flows ou wireframes; imagens já adicionadas em 6 cases (2026-06-20/07-12) mas o gap segue aberto no bench — vagas analisadas depois da adição ainda cobram mais artefatos
- 🟠 **Acessibilidade documentada** (SAP, BTG, Boticário) — enterprise cases com `⬜`; Cartela Cores é a referência WCAG 1.4.1
- 🟠 **UX Research estruturado** (C&A, SAP, ADP, Itaú) — A/B testing e testes de usabilidade formais não aparecem em nenhum case
- 🟡 **Mobile nativo (iOS/Android)** — bloqueador 🔴 explícito no Itaú (72%, arco de acesso 100% mobile) e gap estrutural desde o SAP Concur (52%); Power Apps é low-code, não conta como equivalente
- Página About dedicada (`/about` + `/pt/about`)

### Concluído desde a última auditoria (não relançado formalmente)
- Lighthouse mobile 95+ atingido (2026-06-19: FCP 1.0s/100, LCP 2.0s/97, Speed Index 1.0s/100)
- Responsividade fina nos 3 breakpoints (2026-06-23)
- Sitemap.xml (2026-06-19)
- Imagens reais dos cases via `card-home.*`/`hero.*` (2026-06-20), substituindo o plano original de `cover.webp`

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
