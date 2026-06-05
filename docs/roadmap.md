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

### Fase 1 — Fundação

- [ ] Scaffolding do Astro 5 + TypeScript
- [ ] Tailwind CSS v4 com os tokens do [design-system.md](design-system.md)
- [ ] Carregar fontes Manrope + Inter localmente (woff2)
- [ ] Integração Svelte 5 (ilhas)
- [ ] i18n routing (PT padrão `/`, EN em `/en`)
- [ ] Layout base + header + footer
- [ ] Deploy inicial na Vercel (página em branco no ar — validar pipeline)

### Fase 2 — Design system em código

- [ ] Tokens de cor, tipografia e espaçamento como tema Tailwind (`@theme`)
- [ ] Componentes base: botão, link, tag, card de case, seção
- [ ] Hero (card escuro `#383838`, cantos `32px`)
- [ ] View Transitions API entre páginas

### Fase 3 — Páginas core

- [ ] Schema do frontmatter de case (Zod) em `src/content/config.ts`
- [ ] Home: hero + intro + showcase (grade 2 col → 1 col) + footer
- [ ] Template de página de case
- [ ] Página "Sobre"

### Fase 4 — Conteúdo ⚡ parcialmente adiantado

O conteúdo dos cases foi escrito integralmente durante a Fase 0 — PT e EN —
em [cases-portfolio.md](cases-portfolio.md). O trabalho restante é recortar
cada case para seu arquivo `.md` individual e reunir os assets visuais.

**Cases prontos para publicar (texto completo PT+EN):**

| # | Case | Slug sugerido |
|---|------|---------------|
| 1 | Cartela_Cores | `cartela-cores` |
| 2 | Painel Saúde | `painel-saude` |
| 3 | Enterprise AI Knowledge Assistant | `enterprise-ai-assistant` |
| 4 | Shipping Capacity Optimization Platform | `shipping-capacity-platform` |
| 5 | Arezzo&Co · Sistema de Anúncios | `arezzo-ad-management` |
| 6 | Del Valle · Redesign de Site | `del-valle-website` |
| 7 | Hypera Pharma · HYPERGESTOR | `hypera-hypergestor` |
| 8 | Del Valle Kapo · Redesign de Site | `del-valle-kapo` |

**Pendente para cada case:**
- [ ] Criar `src/content/cases/pt/<slug>.md` com frontmatter + body do case
- [ ] Criar `src/content/cases/en/<slug>.md` (par PT/EN)
- [ ] Preencher os `⬜` de métricas com dados reais
- [ ] Reunir e otimizar imagens em `public/cases/<slug>/` (webp/avif + alt bilíngue)
- [ ] Definir `accent` (pastel do card) e `featured` para cada case

**⬜ Quantos e quais cases entram no lançamento?** — ver Questões em aberto.

### Fase 5 — Polish & lançamento

- [ ] Responsividade fina nos 3 breakpoints (≥1200 / 810–1199 / ≤809)
- [ ] Acessibilidade: foco visível, contraste WCAG AA, navegação por teclado, leitor de tela
- [ ] SEO: meta tags, Open Graph, sitemap.xml, canonical, hreflang PT/EN
- [ ] Lighthouse 95+ em todas as métricas (Performance, A11y, Best Practices, SEO)
- [ ] Domínio próprio + apontar DNS
- [ ] Analytics (ver Questões em aberto)
- [ ] Lançar e redirecionar `jefersonfreiry.framer.website` para o novo domínio

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

---

## Questões em aberto

Decisões que dependem do autor antes/durante o build:

- ⬜ **Domínio:** comprar domínio próprio? Qual? (ex.: jefersonfreiry.com)
- ⬜ **Idioma padrão:** PT como raiz (`/`) e EN em `/en`, ou o contrário? (vagas podem ser internacionais)
- ⬜ **Cases no lançamento:** dos 8 prontos, quais priorizar para o v1? Sugestão: começar com os 4 mais recentes e de maior impacto (Enterprise AI, Shipping, Arezzo&Co, Cartela_Cores).
- ⬜ **Métricas dos cases:** preencher os `⬜` de impacto em [cases-portfolio.md](cases-portfolio.md) antes de publicar.
- ⬜ **Currículo:** link para PDF, página dedicada, ou só LinkedIn?
- ⬜ **Contato:** formulário, e-mail direto (`jfreiry@gmail.com`), ou ambos?
- ⬜ **Analytics:** Vercel Analytics, Plausible, ou nenhum?
- ⬜ **Modo escuro:** o site terá toggle claro/escuro?
- ⬜ **Animações:** nível de microinteração desejado (sutil vs. expressivo).
