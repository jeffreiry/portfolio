---
title: "Cartela de Cores"
slug: cartela-cores
role: "Product Designer, solo, end-to-end"
summary: "Transformou um PDF estático de consultoria de coloração em um sistema vivo que pontua peças do guarda-roupa em tempo real."
company: "Projeto pessoal"
year: 2024
accent: "#fff7ef"
tags: ["Web app", "Algoritmo de cor", "Design system", "Acessibilidade"]
url: ""
metrics:
  - label: "Precisão do score"
    value: "4,8% de erro médio vs. avaliação manual"
  - label: "Cores validadas"
    value: "22 de 28 dentro de ±10%"
featured: true
draft: true
order: 4
---

## Do PDF morto ao guarda-roupa que se combina sozinho

**TL;DR** — Product Designer solo, end-to-end (pesquisa → produção). App web que traduz uma consultoria de coloração pessoal — normalmente entregue como um PDF estático — em um sistema vivo que pontua, em tempo real, se cada peça do guarda-roupa combina com a cartela do usuário e ajuda a montar looks harmônicos.

---

## Contexto & Problema

Uma consultoria de coloração pessoal termina num veredito ("você é *Outono Quente*, use estas cores") entregue como documento estático. O problema aparece **depois**: na frente do armário. A pessoa não consegue aplicar o conhecimento — não sabe se a camisa que já tem entra na cartela, nem como combinar o que tem em looks que funcionam. O valor da consultoria fica preso num PDF que ninguém reabre.

**Estado anterior:** conhecimento correto, mas inerte. Decisão de vestir-se permanecia no "achismo".

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Antes / Depois</strong>
  <span>PDF estático da consultoria → interface de pontuação em tempo real</span>
</div>

---

## Seu papel

Solo, end-to-end: pesquisa do domínio (teoria de coloração), definição de produto, design de interação, design system e implementação (HTML/CSS/JS + Firebase). Um case de Product Designer que prototipa em alta fidelidade até produção.

---

## Restrições

- **Solo e sem orçamento** — nenhuma infra paga, decisões enviesadas para custo zero.
- **Dados sensíveis** — fotos do guarda-roupa do usuário, exigindo isolamento por conta.
- **Multiusuário depois de pronto** — a arquitetura inicial single-user precisou evoluir sem reescrita.

---

## Descoberta & Insight

A virada foi reformular a pergunta. "Essa cor combina?" parece subjetiva, mas pode virar **medida**: a *distância perceptual de cor* (ΔE no espaço CIE L\*a\*b\*) modela exatamente "quão longe essa peça está da minha cartela". Se o computador mede a distância, o palpite vira score.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Diagrama técnico</strong>
  <span>Pipeline de cor: HEX → RGB → XYZ → CIE L*a*b* → ΔE → Score</span>
</div>

---

## Processo & Decisões

**1. Espaço de cor — problema:** RGB e HSL não são perceptualmente uniformes (a mesma diferença numérica significa diferenças visuais distintas conforme a região do espectro). **Opções:** ficar no RGB (simples) vs. converter para CIE L\*a\*b\* (complexo). **Escolha:** L\*a\*b\* + ΔE. **Porquê:** é o único espaço onde "distância" corresponde à percepção humana. Validei o score contra avaliações manuais: **erro médio de 4,8%**, com 22 de 28 cores dentro de ±10%.

**2. O que é uma peça "coringa" — problema:** "versátil" é vago. **Escolha:** transformei em regra explícita — score ≥ 85% **e** cor neutra da cartela **e** lisa/estampa discreta **e** funciona em ≥ 3 ocasiões. **Porquê:** uma peça de cor de acento (laranja queimado, vinho) é bonita mas limita combinações — então é "versátil", não "coringa". Isso é design de um sistema de regras, não só de telas.

**3. Arquitetura multiusuário — problema:** ao adicionar login, dados de um usuário vazavam para outro durante a troca de sessão. **Causa raiz:** o app renderizava antes do Firestore responder e `loadData()` disparava um `saveData()` que sobrescrevia a conta errada. **Escolha:** catálogo de roupas compartilhado no localStorage vs. looks isolados por usuário no Firestore; render movido para dentro do `.then()` do Firestore; flag `_authReady` bloqueando saves durante o carregamento. **Porquê:** separar o que é comum do que é privado e nunca renderizar/gravar antes de confirmar de quem são os dados.

**4. Acessibilidade do score — problema:** comunicar qualidade só por cor exclui daltônicos. **Escolha:** todo score traz **cor + ícone + rótulo textual** (✓ Excelente / ↑ Ótimo / – Regular / ↓ Revisar); bloqueios de regra explicados inline, não só em toast efêmero. **Porquê:** a informação não pode depender de um único canal sensorial.

**5. Navegação — problema:** sidebar consumia espaço e escondia abas. **Escolha:** substituí por topbar horizontal permanente (e bottom nav no mobile). **Porquê:** todas as 7 áreas acessíveis em um toque, sem menu oculto.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Fluxo principal</strong>
  <span>Interface do Combinador — zonas corporais (Topo, Camiseta, Acessórios, Inferior, Calçado) com badges de score</span>
</div>

---

## Solução

Sete áreas: Início (hub com stats e último look), Catálogo (com multisseleção e "aposentar" peças), **Combinador inteligente**, Sugestões, Looks, Compras e Cartela (a referência de cor).

O coração é o **Combinador**: mostra as zonas do corpo (Topo, Camiseta, Acessórios, Inferior, Calçado) sempre visíveis; cada slot vazio sugere a melhor peça (dimmed) com "+ Adicionar"; um botão "↺" abre um picker de alternativas **ordenado por harmonia**; cada slot exibe um badge de score ("✓ 87%") e um card flutuante explica **qual peça ancora ou derruba** a harmonia do look.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Diagrama de sistema</strong>
  <span>7 áreas e fluxo de dados: Catálogo → Combinador → Cartela</span>
</div>

---

## Craft & Acessibilidade

- `object-fit: contain` + fundo branco nos cards para mostrar a peça inteira sem corte nem moldura vazia.
- `aspect-ratio` consistente entre catálogo (3/4) e slots do combinador para ritmo visual.
- Score sempre multicanal (cor + ícone + texto); confirmação antes de excluir looks.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Detalhe de craft</strong>
  <span>Estados do badge de score: ✓ Excelente · ↑ Ótimo · – Regular · ↓ Revisar</span>
</div>

---

## Colaboração técnica

Pipeline de cor implementado por mim: `HEX → RGB linear → XYZ (D65) → CIE L*a*b* → ΔE mínimo → Score`. Paleta âncora de 18 cores com score próprio; o score final herda uma fração do âncora mais próximo (`final = anchorScore/100 × base`). Backend em Firebase Auth (e-mail + Google) e Firestore com regras por `uid`.

---

## Impacto

- **Precisão:** algoritmo de score com **4,8% de erro médio** vs. avaliação manual.
- **Qualitativo:** uma consultoria estática virou ferramenta de decisão diária — "essa peça combina?" passou de achismo a número explicável.

---

## Aprendizados

O modelo tem um limite honesto: ΔE não captura **temperatura perceptual**, então cores frias (branco puro, rosa frio, amarelo neon) são superestimadas em ~15–23% vs. o julgamento manual. Já mapeei a correção — uma penalidade para *hue* > 150° — e a próxima evolução: extrair a cor dominante da foto automaticamente (ColorThief) em vez de seleção manual. **Lição:** reconhecer onde o modelo erra e ter o plano de correção vale mais do que fingir precisão total.
