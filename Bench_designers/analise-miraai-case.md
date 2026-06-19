# Mira.ai (sanvithi.com) vs. Meu Portfólio — Comparação de Padrões

**Referência:** https://sanvithi.com/miraai
**Data:** 19/06/2026

---

## 1. Seções e ordem

1. **Hero animado** — campo de cor full-bleed (lime green) com padrão de checkerboard que se constrói por animação; pill-nav flutuante no topo (sanvithi · work / play / résumé / story).
2. **Título do hero** — "Innovating the future of AI in pregnancy nutrition" + tags (0→1 Speculative Design · AI + Wearable · 16 weeks · Product Mira.ai) + summary.
3. **"Trailer" sticky** — mockup do app (Artichoke Stir Fry / "Pair with a spoon of tahini…") que fica pinado enquanto o texto rola por cima.
4. **Overview em 2 colunas** — Esquerda: Product + Details (surface, role, team, scope). Direita: Problem / Solution / Result, cada um com header serifado + subtítulo itálico.
5. **Metrics row** — "Projected Impact, validated in user testing" → 3 cards (15/15 · 100% · ~70%).
6. **CONTEXT** — narrativa pessoal (por que o projeto existe).
7. **PROBLEM** — full-bleed cinematic frame com foto P&B + quote overlay ("In a multi-billion dollar market…" — National Library of Medicine).
8. **GOALS + NORTH STAR** — statement serifado itálico de 2 pesos + lista (Sense Early / Relieve Safely / Personalize Deeply / Earn Trust).
9. **PROCESS + KEY INSIGHTS** — 3 insights.
10. **SOLUTION** — statement-quote grande + divisor com logo Mira.ai animado (onion → fig morph).
11. **TECH FRAMEWORK** — sistema em 3 camadas (Inputs / Intelligence / Outputs).
12. **DESIGN 1/6 → 6/6** — 6 blocos de tela, cada um com contador "DESIGN x/6", título serifado e mídia sticky (alguns com micro-animação, ex: typing "Let's _").
13. **REFLECTIONS** — 3 reflexões honestas (consent, systems thinking, speculative ≠ untethered).
14. **WHAT I WOULD DO NEXT** — próximo passo (clinician-facing view).
15. **Fairytale close** — "Mira.ai's nourished mothers lived happily ever after." / "fin."
16. **Footer** — botões (email / résumé / LinkedIn / X) + wordmark "sanvithi" 3D inflado/soft-body + copyright lúdico ("all rights (and wrongs) reserved ✦ human-generated work").

---

## 2. Como métricas/resultados são apresentados

- **Linha de 3 cards** sob a label itálica "Projected Impact — validated in user testing".
- Número **gigante em serifa** (15/15, 100%, ~70%) → **subtítulo bold curto** (o que significa) → **caption cinza** (contexto/fonte).
- Honestidade intelectual: distingue **resultado validado** (15/15, 100% em user testing) de **dado de mercado** (~70% com citação real: Einarson et al., PubMed, 2013). Métrica especulativa não é vendida como métrica real.
- Resultados também aparecem **inline** no frame cinematic do Problem (stat como quote sobre imagem), não só nos cards.

---

## 3. O que o layout faz de incomum/interessante

- **Mídia sticky + texto que rola por cima** ("scrollytelling"): a coluna de imagem fica pinada enquanto a narrativa avança — sensação de "trailer".
- **Full-bleed cinematic frames** com stat/quote sobreposto + atribuição de fonte (parece um documentário, não um case).
- **Statement-quotes serifados itálicos com dois pesos/cores** destacando palavras-chave dentro da própria frase (ex.: *design a companion + digital twin* em bold dentro de texto cinza).
- **Contador "DESIGN x/6"** dá ritmo e expectativa de progresso ao bloco de telas.
- **Logo do produto que morfa** como divisor de seção (onion → fig) — transição com personalidade.
- **Voz autoral/fairytale**: eyebrow labels em caixa-alta, fechamento "lived happily ever after / fin.", copyright "(and wrongs)".
- **Wordmark 3D soft-body** no footer como assinatura memorável.
- **Pill-nav flutuante** persistente com ícones.

---

## 4. O elemento que eu "roubaria"

**O frame cinematic full-bleed com stat/quote sobreposto + atribuição de fonte** (ex.: a foto P&B "In a multi-billion dollar market…" — National Library of Medicine).

- **Por quê:** transforma um dado seco num momento emocional e cria contraste de ritmo entre blocos densos de texto. É a coisa que mais "eleva" a página de case-comum para case-memorável.
- **Impacto: ALTO** — muda a percepção de qualidade do case inteiro com 1–2 inserções.
- **Esforço: BAIXO** — é só um `<figure>` full-bleed com imagem, overlay de texto e caption.

**Runner-up (alto impacto / médio esforço):** o número-serifado-gigante nos metrics cards com hierarquia número → claim → fonte. **Runner-up de "alma" (médio/médio):** a voz autoral + fairytale close.

---

## 5. Delta rápido — o que essa página tem que o seu (provavelmente) não tem

| Eles têm | Você tem hoje | Gap |
|---|---|---|
| Mídia **sticky / scrollytelling** | cover full-width estático | Engajamento de scroll |
| **Frames cinematic** com quote+fonte | markdown puro | Momentos de respiro/emoção |
| Metrics com **número serifado gigante + fonte citada** | metrics cards (estilo?) | Hierarquia e credibilidade |
| **Eyebrow labels** + statement-quotes itálicos | markdown puro | Ritmo tipográfico |
| **Contador de progresso** ("x/6") | — | Estrutura/expectativa |
| **Voz autoral** (fairytale close, copyright lúdico) | summary funcional | Personalidade/memorabilidade |
| **Wordmark assinatura** no footer | (related cases) | Branding |

Seu trunfo que eles **não** exploram: você já tem **related cases por tags** — eles encerram sem cross-link. Mantenha isso.

---

## 6. Implementação no seu stack (Astro 6 + Tailwind + Svelte 5)

**A. Frame cinematic (o item que eu roubaria) — ALTO impacto / BAIXO esforço**
- **Onde:** **conteúdo markdown** (componente reutilizável). Crie `<Cinematic image="" quote="" source="" />` e use via MDX no corpo do case. Estilo base em `.case-content` (regra para full-bleed quebrando o container: `margin-inline: calc(50% - 50vw)`).

**B. Metrics com número serifado gigante + fonte — ALTO / BAIXO**
- **Onde:** componente do **metrics card** + **frontmatter**. Adicione `metrics: [{ value, claim, source }]` no frontmatter; renderize no **[slug].astro**. Tipografia (serif, tamanho) em `.case-content` / Tailwind.

**C. Sticky scrollytelling — MÉDIO impacto / MÉDIO-ALTO esforço**
- **Onde:** **componente Svelte 5** (`StickyMedia.svelte`) embedado no markdown, com a coluna de mídia em `position: sticky; top: …`. CSS de layout em `.case-content`.

**D. Eyebrow labels + statement-quotes itálicos — MÉDIO / BAIXO**
- **Onde:** **CSS .case-content** — estilize `h2`/`h3` como eyebrow caixa-alta e crie uma classe `.statement` (serif itálico, 2 pesos). Aplicada via markdown.

**E. Contador "x/6" — BAIXO / BAIXO**
- **Onde:** **conteúdo markdown** (prefixo manual) ou prop do componente de seção de design.

**F. Voz autoral / fairytale close — BAIXO / BAIXO**
- **Onde:** **conteúdo markdown** (copy). Opcionalmente um slot de "outro" no **[slug].astro**.

**G. Wordmark assinatura no footer — BAIXO / MÉDIO**
- **Onde:** layout global / footer component (fora do `.case-content`). Versão simples = imagem; versão fancy (soft-body) = esforço maior, pular por ora.

---

### Ordem recomendada (ROI)
1. Frame cinematic (A) — alto/baixo
2. Metrics serifados + fonte (B) — alto/baixo
3. Eyebrow + statement quotes (D) — médio/baixo
4. Sticky scrollytelling (C) — só se quiser o "uau"
