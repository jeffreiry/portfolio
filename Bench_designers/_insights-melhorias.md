# Insights de Melhoria — Páginas de Case

Arquivo consolidado e atualizado a cada novo benchmark. Cada insight tem referência à(s) análise(s) de origem.

**Última atualização:** 19/06/2026
**Benchmarks incorporados:** Sage (Emily Backes) · Agentic DS (mchiu) · 3M M\*Modal (Lawrence Zheng) · Gen AI Summaries (Nicole Roberts) · Mira.ai (sanvithi)

---

## Alto impacto / Baixo esforço

### H1 com resultado quantificado ou frase-manifesto
O título do case carrega o resultado ou a tese, não a descrição do projeto.
- Exemplos: "How I Doubled Chatbot Resolution Rate…" (Sage) · "I built a design system that AI can use" (mchiu)
- **Onde implementar:** campo `title` no frontmatter + peso tipográfico no hero de `[slug].astro`
- _Fonte: Sage, Agentic DS_

### Frame cinematic full-bleed (quote + imagem + fonte)
Foto em P&B ou cor full-bleed com stat/quote sobreposto e atribuição de fonte. Cria contraste de ritmo entre blocos densos e momento emocional.
- **Onde implementar:** componente `<Cinematic>` via MDX no corpo do case; CSS `margin-inline: calc(50% - 50vw)` para quebrar o container
- _Fonte: Mira.ai_

### Pull-quote estilizado com pergunta norteadora
Blockquote destacado (itálico, centralizado, entre filetes ou cor de marca) introduzindo a questão central do case. Diferente do `<blockquote>` padrão do markdown.
- **Onde implementar:** `.case-content blockquote` em `global.css`
- _Fonte: Sage, Agentic DS, Mira.ai_

### Eyebrow labels por seção (caixa-alta, colorido)
Rótulo pequeno em caixa-alta com tracking largo abrindo cada seção (RESEARCH · IDEATION · IMPACT). Dá ritmo e escaneabilidade sem mudar o conteúdo.
- **Onde implementar:** CSS `.case-content` — estilizar `h2` com `::before` ou wrapper de eyebrow
- _Fonte: Nicole Roberts, Mira.ai, Sage_

### Métricas com número serifado gigante + fonte citada
Hierarquia: número grande em serifa → claim curto em bold → caption cinza com fonte/contexto. Mais credível que card genérico.
- **Onde implementar:** campo `metrics[].source` no frontmatter + ajuste tipográfico no componente de metrics em `[slug].astro`
- _Fonte: Mira.ai_

---

## Alto impacto / Médio esforço

### Métricas inline distribuídas pela narrativa
Cada feature/iniciativa tem seu bloco de 2–3 métricas ao lado, não tudo centralizado no fim. O leitor conecta decisão → resultado no momento certo.
- **Onde implementar:** array `metrics` por seção no frontmatter ou componente `<MetricRow>` via MDX
- _Fonte: Nicole Roberts, Mira.ai_

### Frase-tese no frontmatter (`thesis` ou `tldr`)
Campo separado do `summary` para uma frase-manifesto contrastante exibida com destaque acima do summary no hero.
- **Onde implementar:** novo campo no schema `content.config.ts` + render em `[slug].astro`
- _Fonte: Agentic DS_

### Alternância de cor de fundo por bloco (code-switching)
Fundos alternam entre processo (claro) e resultado (tintado) para segmentar visualmente o scroll sem títulos pesados.
- **Onde implementar:** utilitário `.band` ou `.block--tinted` em `.case-content`; acionado por classe no markdown/MDX
- _Fonte: Sage, Agentic DS, Lawrence Zheng_

### Admissão de falhas / seção retrospectiva honesta
Seção explícita de limitações, trade-offs ou "o que faria diferente". Aumenta credibilidade sênior.
- **Onde implementar:** convenção de conteúdo markdown (seção `## Retrospectiva`) + estilo de destaque opcional
- _Fonte: Sage, Lawrence Zheng, Mira.ai_

### Sticky process nav numerada com scroll-spy
Barra de âncoras numeradas (1. Contexto · 2. Processo · 3. Resultado) que destaca a seção ativa ao rolar. Orienta leitura de cases longos.
- **Onde implementar:** componente Svelte 5 com `IntersectionObserver`; âncoras geradas de `sections[]` no frontmatter ou dos `##` headings do markdown
- _Fonte: Lawrence Zheng_

### Seção ANALYSIS separada de OUTCOMES
Distinguir "números de impacto" (OUTCOMES) de "o que funcionou e por que" (ANALYSIS: taxonomia, falhas, aprendizados). Mais profundidade analítica.
- **Onde implementar:** convenção de conteúdo markdown + estilo de bloco diferenciado
- _Fonte: Sage_

---

## Médio impacto / Baixo esforço

### Subtítulo de insight comportamental (não descrição)
O `summary` do hero usa uma observação de usuário que cristaliza o problema, não um parágrafo descritivo do projeto.
- **Atenção:** `summary` aparece também no `CaseCard` na home — avaliar campo separado (`insight`) para o hero
- _Fonte: Sage_

### Captions de decisão sob cada visual
Cada imagem tem legenda explicando a *decisão* de design, não só o que está sendo mostrado.
- **Onde implementar:** convenção de conteúdo markdown (disciplina de autoria)
- _Fonte: Sage, Lawrence Zheng_

### Margin notes monoespaçadas na coluna direita
Asides pessoais e informais paralelos ao corpo formal — voz de bastidor que dá personalidade sem poluir o texto.
- **Onde implementar:** diretiva `:::aside` via remark-directive ou componente MDX; grid 3 colunas em `[slug].astro`; `.case-content aside` em `global.css`
- _Fonte: Lawrence Zheng_

### Rótulos pareados de duas pontas (V1 ↔ tese)
Para narrativas de iteração: rótulo à esquerda ("V1 / Full Page") + tese à direita ("SAGE AS A DESTINATION"). Deixa o raciocínio de versão explícito.
- **Onde implementar:** convenção de conteúdo markdown + CSS de layout 2 colunas
- _Fonte: Sage_

### Contador de progresso de seção ("DESIGN x/6")
Prefixo numerado nos blocos de telas/features dá ritmo e expectativa de progresso.
- **Onde implementar:** convenção de conteúdo markdown (prefixo manual) ou prop de componente
- _Fonte: Mira.ai_

### Voz autoral / fechamento com personalidade
Tom pessoal no fechamento do case (fairytale close, reflexão direta, copyright lúdico). Diferencia do case-de-portfólio genérico.
- **Onde implementar:** convenção de conteúdo markdown (copy)
- _Fonte: Mira.ai_

---

## Médio impacto / Médio esforço

### Count-up animado nos stats de impacto
Números sobem de 0 ao valor real ao entrar na viewport. Adiciona dramaticidade sem parecer gimmick se bem executado. Respeitar `prefers-reduced-motion`.
- **Onde implementar:** componente Svelte 5 com `$state` + `$effect` + `IntersectionObserver`
- _Fonte: Nicole Roberts_

### Próximo case como card rico (não só grid por tags)
Um card de preview com thumbnail + tags + 2 métricas headline do próximo case em vez do grid automático por tags.
- **Onde implementar:** `[slug].astro` — campo `next` no frontmatter ou lógica de ordenação por `order`
- _Fonte: Nicole Roberts_

### Prova social (quote de stakeholder/executivo)
Depoimento real atribuído a pessoa + cargo/empresa, exibido como blockquote destacado.
- **Onde implementar:** campo `testimonial: { quote, author, role }` no frontmatter + render em `[slug].astro`
- _Fonte: Lawrence Zheng, Nicole Roberts_

---

## Alto esforço / Para casos específicos

### Mockup interativo no hero (embed/protótipo HTML)
Substitui a imagem cover estática por um protótipo funcional embutido. Justificado apenas para cases de produto digital com interação demonstrável.
- **Onde implementar:** slot opcional no hero de `[slug].astro`; acionado por campo `heroEmbed` no frontmatter
- _Fonte: Sage, Agentic DS_

### Sticky scrollytelling (mídia pinada + texto que rola)
Coluna de imagem fica `position: sticky` enquanto a narrativa avança — sensação de "trailer". Alto impacto de percepção, esforço considerável.
- **Onde implementar:** componente Svelte 5 `StickyMedia.svelte`; CSS de layout em `.case-content`
- _Fonte: Mira.ai_

### Entregável vivo embedado (Figma / Storybook)
iframe do artefato real no fim do case. Justificado para cases de design system ou produto com protótipo navegável.
- **Onde implementar:** campo `embed` no frontmatter + slot no `[slug].astro`
- _Fonte: Agentic DS_

---

## O que manter (vantagens do portfolio atual)

| Vantagem | Por quê manter |
|---|---|
| Metadados estruturados no hero (role / empresa / ano + tags) | Escaneável em 2s; nenhum dos benchmarks tem algo tão imediato |
| Grid de metrics cards sistêmico | Consistência entre cases; menos esforço por case que soluções ad-hoc |
| Related cases automáticos por tags | Nenhum dos 5 benchmarks tem navegação de saída tão clara |
| Markdown puro como conteúdo | Manutenção simples, portável, rápido de publicar |
| Cover full-width dedicada | Impacto visual imediato; melhor para social sharing |
