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
| Fontes | **DM Serif Display** (display) + **Barlow 500** (corpo) | Google Fonts; DM Serif Display para títulos (mixed case, letter-spacing -0.01em), Barlow peso 500 para todo o corpo |

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
| `PORTFOLIO_PASSWORD` | Vercel → Settings → Env Vars | Proteção por senha nas páginas de case |
| `RESEND_API_KEY` | Vercel → Settings → Env Vars | Envio de email do formulário de contato |

O sender do Resend configurado é `contato@portfolio.jefersonfreiry.com` — o domínio precisa ser verificado no painel do Resend antes do envio funcionar em produção.

---

## Estado atual

**Fase 5 em andamento.** Formulário de contato, dark mode e microinterações expressivas implementados. PDFs de currículo em `public/`. Acessibilidade parcialmente implementada (skip nav, foco visível, contraste de títulos). Hero.mp4 com carregamento condicional (mobile/slow-connection recebe fallback de imagem). Seções da home reordenadas: Hero → Cases → About/Career → Contact. Cases relacionados ao final de cada página de case. Próximas ações: responsividade fina e Lighthouse 95+.

Estrutura de código real: `src/components/`, `src/layouts/`, `src/pages/`,
`src/content/cases/{pt,en}/` (8 cases × 2 idiomas), `src/middleware.ts`
(proteção por senha), `src/pages/api/login.ts` + `logout.ts`.
