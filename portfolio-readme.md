# Portfólio Jeferson Freiry · Guia do Projeto

Portfólio pessoal de **Product Designer Sênior**, construído em Astro com cases
bilíngues (PT/EN) em Markdown, hospedado na Vercel. Substitui o site atual feito
no Framer por uma base própria, em código.

**Site atual (a substituir):** https://jefersonfreiry.framer.website
**URL futura:** ⬜ (definir domínio próprio)
**Repositório:** ⬜ (criar no GitHub — sugestão: `github.com/jeffreiry/portfolio`)
**Objetivo:** vitrine para candidaturas a vagas de Product Designer Sênior

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Astro 5 |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Interatividade | Svelte 5 (ilhas) |
| Conteúdo | Content Collections (Markdown) |
| i18n | Astro i18n routing (PT padrão + EN) |
| Hospedagem | Vercel |
| Fontes | Manrope (display) + Inter (corpo) |
| Versionamento | Git → GitHub |

---

## Estrutura de arquivos (planejada)

```
Portfolio/
├── CLAUDE.md                       # Instruções operacionais para o Claude Code
├── portfolio-readme.md             # Este arquivo
├── docs/
│   ├── design-system.md            # Cores, tipografia, espaçamento, componentes
│   ├── cases-portfolio.md          # Guia-mestre + modelo técnico + cases escritos (PT/EN)
│   └── roadmap.md                  # Fases, decisões técnicas e questões em aberto
│
└── (a criar quando o build começar)
    ├── src/
    │   ├── content/
    │   │   ├── cases/
    │   │   │   ├── pt/              # Cases em português (.md)
    │   │   │   └── en/              # Cases em inglês (.md)
    │   │   └── config.ts           # Schema tipado do frontmatter dos cases
    │   ├── components/             # Componentes Astro + ilhas Svelte
    │   ├── layouts/                # Shells de página (base, case)
    │   ├── pages/
    │   │   ├── index.astro         # Home PT
    │   │   ├── [...slug].astro     # Páginas de case PT
    │   │   └── en/                 # Espelho em inglês
    │   ├── styles/                 # Tokens globais + Tailwind
    │   └── i18n/                   # Strings de UI (PT/EN)
    ├── public/                     # Imagens dos cases, favicon, OG
    ├── astro.config.mjs
    ├── tailwind.config / CSS de tokens
    └── package.json
```

> A estrutura definitiva é decidida na Fase 1 do [roadmap](docs/roadmap.md).
> Esta árvore é o alvo, não um estado atual.

---

## Arquitetura de conteúdo

Os cases vivem em `src/content/cases/{pt,en}/` como Markdown puro. O Astro os
carrega via **content collections** com frontmatter tipado (TypeScript). Não há
banco de dados nem CMS — o conteúdo é versionado no Git, igual ao fluxo do
projeto Painel Saúde.

```
src/content/cases/pt/projeto-x.md  ─┐
src/content/cases/en/projeto-x.md  ─┤→ content collection → páginas estáticas
config.ts (schema do frontmatter)  ─┘   (build estático na Vercel)
```

Cada case PT tem um par EN com o mesmo `slug`. Campos ainda não definidos ficam
com `⬜`. Detalhes do modelo e o template completo em
[docs/cases-portfolio.md](docs/cases-portfolio.md).

---

## Identidade visual

Derivada do site atual no Framer e formalizada em
[docs/design-system.md](docs/design-system.md):

- **Tipografia:** Manrope (títulos) + Inter (corpo)
- **Acento:** laranja `#ff4800`
- **Neutros:** do branco `#fff` ao quase-preto `#1a1a1a`
- **Card hero escuro:** `#383838`, cantos de `32px`
- **Container:** `1200px` máx · grade de projetos em 2 colunas

---

## Rodando localmente (quando o build existir)

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

> ⬜ Comandos finais a confirmar após o scaffolding do Astro na Fase 1.

---

## Deploy — Vercel

- **Plataforma:** vercel.com → novo projeto `portfolio`
- **Trigger:** automático a cada push para `main`
- **Build command:** `npm run build` (output estático ou adapter-vercel)
- **Domínio:** ⬜ (apontar domínio próprio)

---

## Estado atual

**Planejamento.** O repositório contém apenas os arquivos de instrução em
`docs/` + este guia + `CLAUDE.md`. O build da aplicação começa quando o autor
der o sinal — ver fases em [docs/roadmap.md](docs/roadmap.md).
