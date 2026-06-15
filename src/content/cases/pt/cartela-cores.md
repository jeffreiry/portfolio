---
title: "Cartela de Cores"
slug: cartela-cores
role: "Product Designer, solo, end-to-end"
summary: "Transformou um PDF estático em sistema que avalia itens do guarda-roupa contra a paleta pessoal."
company: "Projeto pessoal"
year: 2026
accent: "#fff7ef"
tags: ["Design System", "Projetos Pessoais"]
url: ""
metrics:
  - label: "Precisão do score"
    value: "4,8% de erro médio vs. avaliação manual"
  - label: "Cores validadas"
    value: "22 de 28 dentro de ±10%"
featured: true
draft: true
order: 2
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

A parte que mais me custou foi a da escolha do espaço de cor — o risco real não era a complexidade técnica, era que eu não sabia se qualquer modelo matemático conseguiria capturar o que um consultor humano sente sobre uma cor. A hipótese era que conseguiria. Eu precisava testar.

**1. Espaço de cor** — comecei em RGB porque é simples. Funcionou mal: a mesma diferença numérica produzia percepções completamente distintas dependendo da região do espectro. Verdes próximos pareciam iguais; amarelos muito diferentes eram confundidos. Migrei para CIE L\*a\*b\*, que é projetado para que distância numérica corresponda à percepção humana — e validei o score contra avaliações manuais: **erro médio de 4,8%**, com 22 de 28 cores dentro de ±10%. A hipótese se confirmou. E o limite honesto também: cores frias são superestimadas.

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

O modelo tem um limite honesto: ΔE não captura **temperatura perceptual**, então cores frias (branco puro, rosa frio, amarelo neon) são superestimadas em ~15–23% vs. o julgamento manual. Já mapeei a correção — uma penalidade para *hue* > 150° — e a próxima evolução: extrair a cor dominante da foto automaticamente (ColorThief) em vez de seleção manual.

Esse projeto mudou como eu penso em métricas de produto. Chegar num número — 4,8% de erro — e conseguir dizer com honestidade "isso aqui o modelo erra de propósito" é mais útil do que um sistema que esconde as bordas. É o que eu quero em qualquer produto que eu construo: clareza sobre o que funciona e o que não funciona, em vez de uma superfície polida sobre incerteza não resolvida.
