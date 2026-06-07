# Changelog · Portfólio Jeferson Freiry

## [Não lançado]

### Pendente
- Página About dedicada (`/about` + `/pt/about`)
- Imagens dos cases em `public/cases/<slug>/cover.webp`
- Preencher métricas reais (campos `⬜` nos frontmatters)
- SEO (meta tags, OG, sitemap, hreflang)
- Lighthouse 95+

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
