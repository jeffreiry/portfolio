---
title: "Shipping Capacity Optimization Platform"
slug: shipping-capacity-platform
role: "Product Designer, time de produto, 6 meses"
summary: "Substituiu planilhas dispersas por um timeline visual para otimizar capacidade de carga marítima."
company: "Enterprise (confidencial)"
year: 2025
cover: /cases/shipping-capacity-platform/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#e1f5fe"
tags: ["Enterprise", "Data & Analytics"]
metrics:
  - label: "Escopo"
    value: "MVP end-to-end"
  - label: "Prazo"
    value: "6 meses"
featured: true
draft: false
order: 3
---

## O navio parte com espaço vazio: como um timeline visual transformou dados operacionais em oportunidades comerciais

**TL;DR** — Product Designer em time de produto, 6 meses. MVP de plataforma de otimização de capacidade de carga para operações de logística marítima — substituindo planilhas dispersas e e-mails por um ambiente centralizado de monitoramento de rotas, simulação de alocação e gestão de oportunidades comerciais.

**Tags:** Enterprise · Logística marítima · DataViz · Simulação operacional · Figma · Mural

---

## Contexto & Problema

Em logística marítima, navios frequentemente partem com capacidade de carga disponível que poderia ser comercializada. O problema não é a falta de oportunidade — é a falta de visibilidade sobre ela. As informações de rota, disponibilidade de espaço e restrições operacionais estavam distribuídas em planilhas, e-mails e documentos internos sem nenhuma superfície unificada. Para identificar se um navio tinha espaço em uma determinada janela de tempo, um operador precisava cruzar múltiplas fontes manualmente, dependendo de experiência individual e comunicação informal com diferentes áreas.

**Estado anterior:** oportunidades comerciais existiam na operação, mas eram invisíveis sem análise manual — e o processo de gerenciar pedidos de parceiros era conduzido por e-mail, sem rastreabilidade.


---

## Meu papel

Product Designer responsável pelo design do MVP do início ao fim: conduzi as atividades de discovery (reviews de workflow com especialistas em logística e sessões recorrentes de validação com stakeholders internos), sintetizei os padrões operacionais em Mural, e desenvolvi todo o design da plataforma em Figma. Atuei em colaboração com time de produto e engenharia, 6 meses, do discovery ao handoff.

---

## Restrições

- **Domínio de alta complexidade** — logística marítima tem restrições operacionais específicas (janelas portuárias, tempo de trânsito, compatibilidade de carga, regulações). O design precisava ser validado continuamente com especialistas do domínio, não apenas com usuários.
- **MVP para audiência dupla** — a plataforma seria apresentada tanto às equipes internas de logística quanto a parceiros comerciais externos selecionados. A clareza da interface não era apenas uma meta de UX — era um requisito de negócio.
- **Escopo fechado de 6 meses** — um sistema de monitoramento + simulação + gestão de pedidos precisava ser priorizado sem comprometer a coerência da experiência.

---

## Descoberta & Insight

Os especialistas em logística sabiam onde estavam as oportunidades — mas esse conhecimento vivia na cabeça de cada operador, distribuído e não transferível. O bottleneck não era analítico, era de superfície: sem uma visão consolidada e escanável da capacidade dos navios ao longo do tempo, cada avaliação de oportunidade exigia um trabalho manual que poucos conseguiam fazer com velocidade.

**A virada:** a oportunidade de carga não estava escondida nos dados — estava invisível pela ausência de um timeline. Quando você consegue *ver* o espaço disponível numa rota em vez de calculá-lo em planilha, a identificação de oportunidades deixa de ser uma análise e passa a ser uma leitura visual. O design da plataforma inteira partiu dessa premissa.

---

## Processo & Decisões

De todas as decisões desse projeto, a que eu estava menos seguro foi o módulo de simulação — a dúvida real era se os operadores iriam usar aquela camada ou se ficariam só no monitoramento, onde a curva de aprendizado era menor.

**1. Representação temporal das rotas — problema:** tabelas e listas de rotas obrigam o operador a reconstruir mentalmente a sequência de eventos ao longo do tempo. A análise de disponibilidade numa tabela é uma operação cognitiva; num timeline, é uma leitura. **Opções:** lista de rotas com filtros (familiar, sem curva de aprendizado) vs. timeline visual por navio e período (mais complexo de construir, muito mais rápido de interpretar). **Escolha:** timeline visual representando movimentos entre portos, janelas de capacidade disponível e restrições operacionais. **Porquê:** o principal ganho da plataforma era transformar análise em percepção — e isso só é possível com uma representação temporal.

**2. Módulo de simulação** — havia uma tensão real aqui. Fazer a plataforma só de monitoramento era o caminho mais seguro: menos curva de aprendizado, mais fácil de adotar. Mas o problema que os operadores descreviam não era só visibilidade — era incerteza antes de agir. Antes de confirmar uma alocação nova, eles queriam saber: "se eu aceitar esse pedido, o que muda no restante da rota?" Essa pergunta não tem resposta numa plataforma de leitura.

Construir a simulação integrada era o caminho mais longo. Mas era o único que tornava o julgamento mais rápido em vez de só mais visível. Fui com a simulação — o usuário testa o hipotético antes de confirmar, e o delta entre o estado atual e o simulado fica visível lado a lado.

**3. Workflow de pedidos de parceiros — problema:** solicitações de espaço de carga chegavam por e-mail, sem estrutura, sem histórico centralizado e sem visibilidade sobre o estágio de cada negociação. **Opções:** integrar e-mail (menor mudança de comportamento, não resolve rastreabilidade) vs. workflow estruturado dentro da plataforma com etapas explícitas (mudança maior, resolve o problema na raiz). **Escolha:** workflow centralizado com etapas de recebimento, avaliação, aprovação e acompanhamento, substituindo o e-mail como canal principal de gestão. **Porquê:** o problema não era o volume de pedidos — era a invisibilidade do status de cada um. Um canal estruturado torna o pipeline comercial gerenciável sem depender de memória individual.

**4. Vista de oportunidades — problema:** o timeline completo mostra tudo — incluindo navios já no limite da capacidade. Para identificar oportunidades comerciais rapidamente, o operador não quer analisar o todo; quer ver só o que tem espaço. **Opções:** filtros no timeline principal (flexível, mas exige interação) vs. vista dedicada de "capacidade disponível" (menos flexível, mais imediata para o caso de uso principal). **Escolha:** vista dedicada de oportunidades que agrega os períodos com capacidade disponível por rota e navio, separada do monitoramento geral. **Porquê:** o fluxo de identificação de oportunidades é diferente do fluxo de monitoramento operacional — misturá-los num único painel sacrifica a velocidade de ambos.

![](/cases/shipping-capacity-platform/01-route-calendar.png)

---

## Solução

Uma plataforma unificada para equipes de logística monitorarem a operação e avaliarem novas oportunidades de carga. Os usuários podem:

- **Visualizar rotas e cronogramas** via timeline por navio e porto, com restrições operacionais representadas visualmente.
- **Identificar capacidade disponível** em vistas dedicadas que destacam janelas de oportunidade sem exigir análise manual.
- **Simular alocações de carga** antes de confirmar decisões, avaliando o impacto na capacidade e no cronograma.
- **Acompanhar pedidos de parceiros** por um workflow estruturado com etapas explícitas de negociação e aprovação.
- **Avaliar impacto operacional** antes de confirmar qualquer oportunidade comercial.

![](/cases/shipping-capacity-platform/02-route-opportunities.png)

---

## Craft & Acessibilidade

- O **timeline** usa diferenciação por cor e densidade para comunicar utilização de capacidade de forma escanável — alta utilização vs. janela disponível são distinguíveis sem leitura de número.
- O **módulo de simulação** mantém o estado atual e o cenário simulado em comparação lado a lado, para que o operador veja o delta, não apenas o resultado final.
- O **workflow de pedidos** estrutura cada solicitação com histórico de etapas e responsável por ação — o operador sabe o que está pendente *dele*, não apenas o status geral.
- O **timeline** diferencia utilização de capacidade por cor e por densidade visual — dois canais simultâneos garantem que o status é legível para usuários com limitação na percepção de cores, sem depender exclusivamente da cor (WCAG 1.4.1).

![](/cases/shipping-capacity-platform/03-route-simulation.png)

---

## Colaboração técnica

Pipeline de discovery e design: `reviews de workflow com especialistas em logística → sessões recorrentes de validação com stakeholders → síntese em Mural → wireframes Figma → protótipo navegável → validação com engenharia → handoff MVP`. As sessões recorrentes de validação foram estruturais: o domínio de logística marítima tem restrições operacionais que não emergem em entrevistas únicas — precisaram de múltiplos ciclos de refinamento com especialistas para que o timeline e o módulo de simulação representassem a realidade operacional corretamente. ⬜ Stack técnica da plataforma — preencher se aplicável.

---

## O que eu faria diferente

O MVP foi disponibilizado para equipes internas e stakeholders externos selecionados, com feedback positivo sobre a consolidação da informação operacional. Mas tem uma coisa que eu não consegui medir: se o módulo de simulação foi adotado de verdade ou se os operadores usaram apenas o monitoramento e a vista de oportunidades.

A simulação é a parte mais cara do design e a mais difícil de validar antes do lançamento. Se eu pudesse refazer, teria definido uma métrica de adoção específica para a simulação na fase de discovery — não para justificar o feature, mas para entender se a hipótese de que "tornar o experimento seguro muda o comportamento de decisão" se confirmou na prática.

---

## Aprendizados

Ferramentas operacionais para domínios complexos têm um desafio duplo: o designer precisa entender o suficiente do domínio para não simplificar o que não pode ser simplificado — e precisa simplificar o suficiente para que o sistema seja utilizável sem treinamento extenso. A validação recorrente com especialistas não foi uma formalidade metodológica; foi o que garantiu que o timeline e a simulação representassem restrições reais, não aproximações.

O que fico é isso: a oportunidade estava nos dados o tempo todo. Ela só precisava de uma superfície. Às vezes o trabalho do designer é menos sobre inventar e mais sobre fazer o existente aparecer.
