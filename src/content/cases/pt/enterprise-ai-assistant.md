---
title: "Assistente de IA para Conhecimento Corporativo"
slug: enterprise-ai-assistant
role: "Product Designer, time de produto, 6 meses"
summary: "Escalou um MVP de assistente com IA para uma plataforma de conhecimento interno onde a rastreabilidade de fontes se tornou o produto."
company: "Enterprise (confidencial)"
year: 2025
cover: /cases/enterprise-ai-assistant/visao-geral.jpg
bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fm=jpg&w=1400&q=80&auto=format&fit=crop"
accent: "#efedff"
tags: ["Enterprise", "IA conversacional", "Design de informação", "Transparência"]
metrics:
  - label: "Escopo"
    value: "MVP → plataforma completa"
  - label: "Duração"
    value: "6 meses"
featured: true
draft: false
order: 1
---

## Dez repositórios, uma conversa: como a rastreabilidade de fontes se tornou o produto

**TL;DR** — Product Designer em time de produto, 6 meses. Scale-up de um MVP de assistente com IA para uma plataforma de acesso ao conhecimento interno de uma grande organização. O desafio central não era a qualidade das respostas — era que os usuários não agiam sobre elas sem saber de onde vinham.

---

## Contexto & Problema

Grandes organizações acumulam documentação técnica e regulatória distribuída por múltiplos sistemas — intranets, repositórios de arquivos, bases por área. O funcionário que precisa de uma informação enfrenta um **problema de localização antes de um problema de conteúdo**: não sabe onde procurar, busca em vários lugares, encontra versões desatualizadas ou desiste. Um MVP de assistente com IA havia sido lançado para atacar esse problema, mas o uso real revelou uma segunda camada: mesmo quando a resposta era correta, os usuários saíam para confirmá-la em outro sistema antes de agir.

**Estado anterior:** conhecimento corporativo correto, mas inacessível — e um MVP que respondia mas não era confiado.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Antes / Depois</strong>
  <span>Interface de busca do MVP → plataforma conversacional com painel de fontes</span>
</div>

---

## Meu papel

Product Designer responsável pelo scale-up: conduzi as atividades de discovery (entrevistas com usuários do MVP + análise de comportamento via Clarity), sintetizei as oportunidades em Mural, defini as funcionalidades da versão escalada e desenvolvi todo o design em Figma. Atuei em colaboração com time de produto e engenharia, 6 meses, do discovery ao handoff.

---

## Restrições

- **Produto existente com base de usuários ativa** — as decisões de design precisavam evoluir o MVP sem quebrar os fluxos que já funcionavam.
- **Confiança não é opcional em enterprise** — uma resposta errada de IA tem custo real: decisão incorreta, risco de conformidade. A experiência precisava tornar a origem da informação inegociável.
- **Escopo fechado de 6 meses** — priorizar entre o que seria escalado agora e o que ficaria para iterações seguintes.

---

## Descoberta & Insight

A discovery revelou dois problemas encadeados, não um. O primeiro: a interface de busca do MVP pedia que os usuários *navegassem* pela documentação quando o que eles queriam era *perguntar* — a busca é uma tarefa intermediária que as pessoas executam só porque não têm alternativa. O segundo: mesmo quando a IA respondia bem, os usuários não acionavam a resposta porque não sabiam de onde ela vinha. Sem rastreabilidade, a resposta certa e a resposta errada têm a mesma aparência — e em contexto de compliance, isso é suficiente para paralisar a adoção.

**A virada:** o produto não precisava melhorar a busca. Precisava eliminar a necessidade de buscar — e precisava fazer a fonte da resposta tão visível quanto a própria resposta.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Síntese da discovery</strong>
  <span>Gravações do Clarity mostrando os pontos de abandono no MVP — onde os usuários saíam para confirmar respostas em outro sistema</span>
</div>

---

## Processo & Decisões

**1. Paradigma de interface — problema:** melhorar a busca existente (filtros mais precisos, ranking melhor) era a saída de menor risco. **Opções:** otimizar a busca (esforço menor, impacto incremental) vs. substituir a busca por uma interface conversacional (maior mudança, potencial de eliminar a fricção na raiz). **Escolha:** interface conversacional inspirada em LLMs modernos, com input em linguagem natural e prompts sugeridos como ponto de entrada para novos usuários. **Porquê:** otimizar a busca resolve um problema que o usuário não quer ter — ele quer a resposta, não um buscador melhor.

**2. Visibilidade das fontes — problema:** respostas sem origem não eram acionadas. Os usuários abriam outro sistema para confirmar, anulando o ganho de produtividade do assistente. **Opções:** ocultar fontes (interface mais limpa, confiança menor) vs. citações inline no texto (fragmentado, dificulta leitura) vs. painel dedicado sempre acessível (mais informação disponível, contexto preservado). **Escolha:** painel lateral de fontes, acessível diretamente a partir de cada resposta, com os documentos originais e a possibilidade de explorar relacionados. **Porquê:** separar a resposta da sua rastreabilidade mantém a leitura fluida e deixa a verificação disponível para quem precisa dela — sem forçar quem já confia.

**3. Redução de barreira — problema:** usuários novos não sabiam o que perguntar a um assistente que integra bases técnica, regulatória e operacional ao mesmo tempo. **Opções:** onboarding textual (tutorial, tooltips) vs. prompts sugeridos contextuais na tela inicial (ação imediata, sem leitura prévia). **Escolha:** prompts sugeridos derivados dos padrões reais de busca identificados nas sessões do Clarity — não genéricos, mas calibrados às perguntas mais frequentes da organização. **Porquê:** o usuário aprende o que o assistente pode fazer ao ver um exemplo concreto, não ao ler uma descrição.

**4. Modelo de integração — problema:** o conhecimento corporativo não vivia em uma base única — eram sistemas distintos, com autoridade sobre áreas distintas. **Opções:** assistente respondendo de uma base consolidada (mais simples, menos fiel à origem) vs. consulta distribuída com citação por fonte de cada trecho (mais complexo, rastreabilidade preservada). **Escolha:** integração distribuída com citação de origem por trecho. **Porquê:** esconder a pluralidade das fontes numa base consolidada reduziria a confiança — o usuário precisa saber se aquela resposta vem da política de TI ou do manual de compliance.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Interface principal</strong>
  <span>Interface conversacional com painel de fontes — resposta e rastreabilidade lado a lado</span>
</div>

---

## Solução

Uma plataforma centralizada de acesso ao conhecimento corporativo. O usuário abre uma interface única e pode:

- **Perguntar em linguagem natural** — sem precisar saber em qual sistema a informação mora.
- **Receber respostas estruturadas** geradas a partir dos documentos internos reais.
- **Verificar as fontes** — painel lateral mostra quais documentos embasaram cada resposta e permite acessá-los diretamente.
- **Explorar documentos relacionados** — contexto adicional sem sair da interface.
- **Retomar conversas anteriores** — histórico de chat para continuidade entre sessões.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Visão geral do sistema</strong>
  <span>Estado vazio com prompts sugeridos → conversa → painel de fontes → documentos relacionados</span>
</div>

---

## Craft & Acessibilidade

- O **estado inicial vazio** da interface exibe os prompts sugeridos como chips clicáveis — reduz a ansiedade da tela em branco e demonstra o escopo do assistente em vez de descrevê-lo.
- O **painel de fontes** é uma coluna lateral persistente, não um modal ou tooltip: permanece disponível sem interromper a leitura da resposta. O badge com o número de fontes em cada mensagem sinaliza rastreabilidade antes mesmo de abrir o painel.
- A **estrutura da resposta** separa visualmente a síntese do AI do acesso às fontes — hierarquia clara entre "o que o assistente concluiu" e "de onde isso vem".

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Detalhe de craft</strong>
  <span>Chips do estado vazio · badge de contagem de fontes · hierarquia resposta / fontes</span>
</div>

---

## Colaboração técnica

Pipeline de discovery e design: `gravações Clarity + heatmaps → entrevistas com usuários do MVP → síntese em Mural → oportunidades priorizadas → wireframes Figma → protótipo navegável → validação com engenharia → handoff`. As gravações do Clarity foram determinantes: mostraram os pontos exatos de abandono no MVP — onde os usuários paravam, saíam para confirmar ou repetiam a mesma busca de forma diferente.

---

## Impacto

- **Lançamento:** a plataforma foi lançada como parte do ecossistema digital interno da organização.
- **Feedback inicial:** coletado via CSAT e mecanismos de feedback integrados ao produto.

---

## Aprendizados

Este é um case de scale-up, não de 0→1 — e isso muda o tipo de julgamento exigido. Algumas decisões de arquitetura já estavam tomadas pelo MVP; o trabalho foi identificar o que estava errado *na camada de experiência*, não na tecnologia. O que descobri: o assistente tinha a resposta certa, mas a experiência errada. **Lição:** em produtos de IA corporativa, a confiança não emerge da precisão do modelo — ela é um problema de design. Rastreabilidade visível não é um detalhe de UX; é a condição para que a resposta certa seja usada.
