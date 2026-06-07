---
title: "Shipping Capacity Optimization Platform"
slug: shipping-capacity-platform
role: "Product Designer, time de produto, 6 meses"
summary: "MVP de plataforma de otimização de capacidade de carga para logística marítima — substituindo planilhas dispersas por um timeline visual que transforma dados operacionais em oportunidades comerciais em tempo real."
company: "Enterprise (confidencial)"
year: 2025
cover: /cases/shipping-capacity-platform/cover.webp
accent: "#e1f5fe"
tags: ["Enterprise", "Logística marítima", "DataViz", "Simulação operacional"]
metrics:
  - label: "Escopo"
    value: "MVP end-to-end"
  - label: "Prazo"
    value: "6 meses"
featured: true
draft: false
order: 2
---

## O navio parte com espaço vazio: como um timeline visual transformou dados operacionais em oportunidades comerciais

**TL;DR** — Product Designer em time de produto, 6 meses. MVP de plataforma de otimização de capacidade de carga para operações de logística marítima — substituindo planilhas dispersas e e-mails por um ambiente centralizado de monitoramento de rotas, simulação de alocação e gestão de oportunidades comerciais.

**Tags:** Enterprise · Logística marítima · DataViz · Simulação operacional · Figma · Mural

---

## Contexto & Problema

Em logística marítima, navios frequentemente partem com capacidade de carga disponível que poderia ser comercializada. O problema não é a falta de oportunidade — é a falta de visibilidade sobre ela. As informações de rota, disponibilidade de espaço e restrições operacionais estavam distribuídas em planilhas, e-mails e documentos internos sem nenhuma superfície unificada. Para identificar se um navio tinha espaço em uma determinada janela de tempo, um operador precisava cruzar múltiplas fontes manualmente, dependendo de experiência individual e comunicação informal com diferentes áreas.

**Estado anterior:** oportunidades comerciais existiam na operação, mas eram invisíveis sem análise manual — e o processo de gerenciar pedidos de parceiros era conduzido por e-mail, sem rastreabilidade.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Antes / Depois</strong>
  <span>Planilhas dispersas → timeline visual unificado de capacidade por navio e rota</span>
</div>

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

**1. Representação temporal das rotas — problema:** tabelas e listas de rotas obrigam o operador a reconstruir mentalmente a sequência de eventos ao longo do tempo. A análise de disponibilidade numa tabela é uma operação cognitiva; num timeline, é uma leitura. **Opções:** lista de rotas com filtros (familiar, sem curva de aprendizado) vs. timeline visual por navio e período (mais complexo de construir, muito mais rápido de interpretar). **Escolha:** timeline visual representando movimentos entre portos, janelas de capacidade disponível e restrições operacionais. **Porquê:** o principal ganho da plataforma era transformar análise em percepção — e isso só é possível com uma representação temporal.

**2. Módulo de simulação — problema:** avaliar o impacto de uma nova alocação de carga exigia considerar múltiplas variáveis simultaneamente (capacidade residual, tempo de trânsito, compatibilidade de porto). Fazer isso manualmente em planilha demorava e produzia erros. **Opções:** plataforma só de leitura (monitoramento sem experimentação) vs. simulação integrada com visualização do impacto em tempo real. **Escolha:** módulo de simulação que permite ao usuário testar alocações hipotéticas e visualizar o impacto na capacidade e no cronograma antes de confirmar qualquer decisão. **Porquê:** a resistência a adotar novas oportunidades comerciais vinha do risco percebido de "e se der errado operacionalmente" — a simulação torna o experimento seguro e o julgamento mais rápido.

**3. Workflow de pedidos de parceiros — problema:** solicitações de espaço de carga chegavam por e-mail, sem estrutura, sem histórico centralizado e sem visibilidade sobre o estágio de cada negociação. **Opções:** integrar e-mail (menor mudança de comportamento, não resolve rastreabilidade) vs. workflow estruturado dentro da plataforma com etapas explícitas (mudança maior, resolve o problema na raiz). **Escolha:** workflow centralizado com etapas de recebimento, avaliação, aprovação e acompanhamento, substituindo o e-mail como canal principal de gestão. **Porquê:** o problema não era o volume de pedidos — era a invisibilidade do status de cada um. Um canal estruturado torna o pipeline comercial gerenciável sem depender de memória individual.

**4. Vista de oportunidades — problema:** o timeline completo mostra tudo — incluindo navios já no limite da capacidade. Para identificar oportunidades comerciais rapidamente, o operador não quer analisar o todo; quer ver só o que tem espaço. **Opções:** filtros no timeline principal (flexível, mas exige interação) vs. vista dedicada de "capacidade disponível" (menos flexível, mais imediata para o caso de uso principal). **Escolha:** vista dedicada de oportunidades que agrega os períodos com capacidade disponível por rota e navio, separada do monitoramento geral. **Porquê:** o fluxo de identificação de oportunidades é diferente do fluxo de monitoramento operacional — misturá-los num único painel sacrifica a velocidade de ambos.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Timeline principal</strong>
  <span>Movimentos entre portos com janelas de capacidade e restrições operacionais codificadas por cor</span>
</div>

---

## Solução

Uma plataforma unificada para equipes de logística monitorarem a operação e avaliarem novas oportunidades de carga. Os usuários podem:

- **Visualizar rotas e cronogramas** via timeline por navio e porto, com restrições operacionais representadas visualmente.
- **Identificar capacidade disponível** em vistas dedicadas que destacam janelas de oportunidade sem exigir análise manual.
- **Simular alocações de carga** antes de confirmar decisões, avaliando o impacto na capacidade e no cronograma.
- **Acompanhar pedidos de parceiros** por um workflow estruturado com etapas explícitas de negociação e aprovação.
- **Avaliar impacto operacional** antes de confirmar qualquer oportunidade comercial.

---

## Craft & Acessibilidade

- O **timeline** usa diferenciação por cor e densidade para comunicar utilização de capacidade de forma escanável — alta utilização vs. janela disponível são distinguíveis sem leitura de número.
- O **módulo de simulação** mantém o estado atual e o cenário simulado em comparação lado a lado, para que o operador veja o delta, não apenas o resultado final.
- O **workflow de pedidos** estrutura cada solicitação com histórico de etapas e responsável por ação — o operador sabe o que está pendente *dele*, não apenas o status geral.
- ⬜ Decisões de acessibilidade (contraste, foco por teclado, comportamento com daltonismo no uso de cor para capacidade) — preencher.

---

## Colaboração técnica

Pipeline de discovery e design: `reviews de workflow com especialistas em logística → sessões recorrentes de validação com stakeholders → síntese em Mural → wireframes Figma → protótipo navegável → validação com engenharia → handoff MVP`. As sessões recorrentes de validação foram estruturais: o domínio de logística marítima tem restrições operacionais que não emergem em entrevistas únicas — precisaram de múltiplos ciclos de refinamento com especialistas para que o timeline e o módulo de simulação representassem a realidade operacional corretamente. ⬜ Stack técnica da plataforma — preencher se aplicável.

---

## Impacto

- **Lançamento:** o MVP foi disponibilizado para equipes internas de logística e stakeholders externos selecionados.
- **Feedback inicial:** reações positivas à consolidação das informações operacionais em um único ambiente e à possibilidade de explorar oportunidades de forma mais eficiente.
- ⬜ Redução do tempo de avaliação de oportunidades de carga — preencher.
- ⬜ Volume de pedidos gerenciados pelo workflow vs. e-mail — preencher.
- ⬜ Número de usuários externos onboardados na fase inicial — preencher.

---

## Aprendizados

Ferramentas operacionais para domínios complexos têm um desafio duplo: o designer precisa entender o suficiente do domínio para não simplificar o que não pode ser simplificado — e precisa simplificar o suficiente para que o sistema seja utilizável sem treinamento extenso. A validação recorrente com especialistas não foi uma formalidade metodológica; foi o que garantiu que o timeline e a simulação representassem restrições reais, não aproximações. **Lição:** em produtos operacionais de alta complexidade, a fidelidade ao domínio não é um detalhe de conteúdo — é o que determina se a ferramenta será confiada ou contornada.
