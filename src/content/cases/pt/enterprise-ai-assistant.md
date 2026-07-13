---
title: "Assistente de IA para Conhecimento Corporativo"
slug: enterprise-ai-assistant
role: "Product Designer, time de produto, 6 meses"
summary: "Evoluiu um MVP de assistente IA em plataforma de conhecimento centrada na rastreabilidade de fontes."
company: "Enterprise (confidencial)"
year: 2025
cover: /cases/enterprise-ai-assistant/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1762330465857-07e4c81c0dfa?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#efedff"
tags: ["Enterprise", "AI & Automation", "UX Research"]
metrics:
  - label: "Usuários impactados"
    value: "~8.000"
  - label: "Escopo"
    value: "MVP → plataforma completa"
  - label: "Duração"
    value: "6 meses"
featured: true
draft: false
order: 4
---

## Dez repositórios, uma conversa: como a rastreabilidade de fontes se tornou o produto

**TL;DR** — Product Designer em time de produto, 6 meses. Scale-up de um MVP de assistente com IA para uma plataforma de acesso ao conhecimento interno de uma grande organização. O desafio central não era a qualidade das respostas — era que os usuários não agiam sobre elas sem saber de onde vinham.

---

## Contexto & Problema

Grandes organizações acumulam documentação técnica e regulatória distribuída por múltiplos sistemas — intranets, repositórios de arquivos, bases por área. O funcionário que precisa de uma informação enfrenta um **problema de localização antes de um problema de conteúdo**: não sabe onde procurar, busca em vários lugares, encontra versões desatualizadas ou desiste. Um MVP de assistente com IA havia sido lançado para atacar esse problema, mas o uso real revelou uma segunda camada: mesmo quando a resposta era correta, os usuários saíam para confirmá-la em outro sistema antes de agir.

**Estado anterior:** conhecimento corporativo correto, mas inacessível — e um MVP que respondia mas não era confiado.

---

## Meu papel

Product Designer responsável pelo scale-up: conduzi as atividades de discovery (entrevistas com usuários do MVP + análise de comportamento via Clarity + testes de usabilidade com métricas de conclusão de tarefa), sintetizei as oportunidades em Mural, defini as funcionalidades da versão escalada e desenvolvi todo o design em Figma. Atuei em colaboração com time de produto e engenharia, 6 meses, do discovery ao handoff.

---

## Restrições

- **Produto existente com base de usuários ativa** — as decisões de design precisavam evoluir o MVP sem quebrar os fluxos que já funcionavam.
- **Uma resposta errada de IA tem custo real** — decisão incorreta, risco de conformidade. Os usuários precisavam enxergar a origem de uma resposta antes de agir sobre ela. Esse era o problema de design, não o modelo.
- **Escopo fechado de 6 meses** — priorizar entre o que seria escalado agora e o que ficaria para iterações seguintes.

---

## Descoberta & Insight

Os registros do Clarity foram o ponto de virada. Víamos exatamente onde as pessoas paravam: liam a resposta, abriam uma nova aba. Toda vez. Não porque a resposta estava errada. Porque não sabiam de onde ela tinha vindo.

Era o segundo problema — e o mais profundo. O primeiro era a própria interface de busca: ela pedia que os usuários *navegassem* pela documentação quando o que queriam era *perguntar*. Busca é uma tarefa que as pessoas executam só porque não têm alternativa.

**A virada:** o produto não precisava melhorar a busca. Precisava eliminar a necessidade de buscar — e fazer a fonte de cada resposta tão visível quanto a resposta em si.

![](/cases/enterprise-ai-assistant/02-user-research.png)

---

## Processo & Decisões

De todas as decisões desse projeto, a que eu estava menos certo foi o painel lateral de fontes — a dúvida real era se os usuários iriam abri-lo, ou se viraria um ornamento de confiança sem mudar o comportamento de fato.

**1. Paradigma de interface — problema:** melhorar a busca existente (filtros mais precisos, ranking melhor) era a saída de menor risco. **Opções:** otimizar a busca (esforço menor, impacto incremental) vs. substituir a busca por uma interface conversacional (maior mudança, potencial de eliminar a fricção na raiz). **Escolha:** interface conversacional inspirada em LLMs modernos, com input em linguagem natural e prompts sugeridos como ponto de entrada para novos usuários. **Porquê:** otimizar a busca resolve um problema que o usuário não quer ter — ele quer a resposta, não um buscador melhor.

**2. Visibilidade das fontes** — as respostas sem origem não eram acionadas. Os usuários abriam outro sistema para confirmar antes de agir, cancelando o ganho de produtividade do assistente.

O problema não era preferência de UX. Era a condição para que a resposta fosse usada. Uma resposta sem fonte visível não estava incompleta — estava inutilizável.

Três opções na mesa: ocultar fontes (interface mais limpa, menos confiança); citações inline no texto (mantém conexão com o trecho, mas fragmenta a leitura); ou painel lateral permanente acessível de cada resposta. Fui com o painel. Mantém a leitura fluida e a verificação disponível — sem forçar quem já confia, sem esconder de quem ainda não confia.

**3. Redução de barreira — problema:** usuários novos não sabiam o que perguntar a um assistente que integra bases técnica, regulatória e operacional ao mesmo tempo. **Opções:** onboarding textual (tutorial, tooltips) vs. prompts sugeridos contextuais na tela inicial (ação imediata, sem leitura prévia). **Escolha:** prompts sugeridos derivados dos padrões reais de busca identificados nas sessões do Clarity — não genéricos, mas calibrados às perguntas mais frequentes da organização. **Porquê:** o usuário aprende o que o assistente pode fazer ao ver um exemplo concreto, não ao ler uma descrição.

**4. Modelo de integração — problema:** o conhecimento corporativo não vivia em uma base única — eram sistemas distintos, com autoridade sobre áreas distintas. **Opções:** assistente respondendo de uma base consolidada (mais simples, menos fiel à origem) vs. consulta distribuída com citação por fonte de cada trecho (mais complexo, rastreabilidade preservada). **Escolha:** integração distribuída com citação de origem por trecho. **Porquê:** o usuário precisa saber se aquela resposta vem da política de TI ou do manual de compliance. Esconder essa pluralidade numa base consolidada teria destruído a confiança pela raiz.

![](/cases/enterprise-ai-assistant/03-main-interface.png)

---

## Solução

Uma plataforma centralizada de acesso ao conhecimento corporativo. O usuário abre uma interface única e pode:

- **Perguntar em linguagem natural** — sem precisar saber em qual sistema a informação mora.
- **Receber respostas estruturadas** geradas a partir dos documentos internos reais.
- **Verificar as fontes** — painel lateral mostra quais documentos embasaram cada resposta e permite acessá-los diretamente.
- **Explorar documentos relacionados** — contexto adicional sem sair da interface.
- **Retomar conversas anteriores** — histórico de chat para continuidade entre sessões.

---

## Craft & Acessibilidade

- O **estado inicial vazio** exibe prompts sugeridos como chips clicáveis — as pessoas não sabem por onde começar com um assistente que integra três bases de conhecimento ao mesmo tempo. Os prompts mostram isso sem exigir leitura prévia.
- O **painel de fontes** é uma coluna lateral persistente, não um modal ou tooltip: permanece disponível sem interromper a leitura da resposta. O badge com o número de fontes em cada mensagem sinaliza rastreabilidade antes mesmo de abrir o painel.
- A **estrutura da resposta** separa visualmente a síntese do AI do acesso às fontes — hierarquia clara entre "o que o assistente concluiu" e "de onde isso vem".
- O **painel de fontes** como coluna lateral persistente não exige interação adicional para abrir ou manter aberto — todos os fluxos, incluindo acesso a fontes e histórico de conversas, são operáveis por teclado. A ordem de tabulação segue a sequência de leitura e interação (WCAG 2.1.1).
- **Daltonismo** — indicadores de confiança e badges de fonte usam combinações de ícone + label, não apenas cor. O significado é acessível a usuários com limitação na percepção de cores em toda a interface.
- A **estrutura semântica** (hierarquia de headings, ARIA roles, regiões de landmark) foi especificada como parte do design — não como uma passada de QA. Uma diretriz de acessibilidade para a plataforma foi estabelecida em conjunto com engenharia e entregue junto ao handoff no Figma.

![](/cases/enterprise-ai-assistant/01-file-source.png)

---

## Colaboração técnica

Pipeline de discovery e design: `gravações Clarity + heatmaps → entrevistas com usuários do MVP → síntese em Mural → oportunidades priorizadas → wireframes Figma → protótipo navegável → validação com engenharia → handoff`. As gravações foram determinantes: mostraram os pontos exatos de abandono no MVP — onde os usuários paravam, saíam para confirmar ou repetiam a mesma busca de forma diferente.

Seis meses para projetar e lançar uma plataforma de uso corporativo amplo — sem conseguir validar todas as hipóteses com usuários reais antes do lançamento — é apertado. Inferimos bastante a partir do comportamento no MVP e de benchmarking de produtos similares. A maior parte se confirmou.

O Microsoft Copilot foi usado na fase de hipóteses de solução para validar alternativas estruturais e estressar o racional de design antes de definir a direção — especialmente na avaliação do modelo do painel de fontes e da arquitetura de integração.

---

## O que eu faria diferente

A plataforma foi lançada e o feedback foi positivo. Mas tem uma coisa que eu queria ter medido e não consegui: se o painel de fontes mudou o comportamento real dos usuários, ou só fez as pessoas se sentirem mais seguras com um comportamento que já tinham. Tem uma diferença entre uma feature que constrói confiança e uma que sinaliza confiança. Eu acredito que seja a primeira. Não consegui provar.

---

## Aprendizados

Este é um case de scale-up, não de 0→1 — e isso muda o tipo de julgamento exigido. Algumas decisões de arquitetura já estavam tomadas pelo MVP; o trabalho foi identificar o que estava errado *na camada de experiência*, não na tecnologia.

O que descobri: o assistente tinha a resposta certa, mas a experiência errada. Em produtos de IA corporativa, confiança não emerge da precisão do modelo. É um problema de design. Resolve-se da mesma forma que qualquer problema de design — tornando o invisível visível.

É isso que vou carregar desse projeto.
