---
title: "Assistente de IA para Conhecimento Corporativo"
slug: enterprise-ai-assistant
role: "Product Designer, time de produto, 6 meses"
summary: "Uma plataforma de conhecimento corporativo que responde em linguagem natural e mostra a origem de cada resposta."
thesis: "O problema não era a qualidade das respostas da IA — era que ninguém agia sobre elas sem saber de onde vinham."
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
protected: true
order: 4
---

## Dez repositórios, uma conversa: como a rastreabilidade de fontes se tornou o produto

**TL;DR** — Product Designer em time de produto, 6 meses. Scale-up de um MVP de assistente com IA para uma plataforma de acesso ao conhecimento interno de uma grande organização. O desafio central não era a qualidade das respostas — era que os usuários não agiam sobre elas sem saber de onde vinham.

---

## Contexto & Problema

Grandes organizações acumulam documentação técnica e regulatória distribuída por múltiplos sistemas — intranets, repositórios de arquivos, bases por área. O funcionário que precisa de uma informação enfrenta um **problema de localização antes de um problema de conteúdo**: não sabe onde procurar, busca em vários lugares, encontra versões desatualizadas ou desiste. Um MVP de assistente com IA havia sido lançado para atacar esse problema, mas o uso real revelou uma segunda camada: mesmo quando a resposta era correta, os usuários saíam para confirmá-la em outro sistema antes de agir.

Entrei como Product Designer responsável pelo scale-up — conduzindo as atividades de discovery (entrevistas com usuários do MVP, análise de comportamento via Clarity, testes de usabilidade com métricas de conclusão de tarefa), sintetizando as oportunidades em Mural e desenvolvendo todo o design em Figma ao longo de 6 meses do discovery ao handoff.

Duas restrições moldaram cada decisão: o MVP tinha base de usuários ativa, então não poderíamos quebrar o que já funcionava; e nesse contexto, uma resposta errada de IA tem custo real — risco de conformidade, decisão incorreta. Os usuários precisavam ver a origem de uma resposta antes de agir sobre ela. Esse era o problema de design, não o modelo.

**Estado anterior:** conhecimento corporativo correto, mas inacessível — e um MVP que respondia mas não era confiado.

---

## Descoberta & Insight

Os registros do Clarity foram o ponto de virada. Víamos exatamente onde as pessoas paravam: liam a resposta, abriam uma nova aba. Toda vez. Não porque a resposta estava errada. Porque não sabiam de onde ela tinha vindo.

Era o segundo problema — e o mais profundo. O primeiro era a própria interface de busca: ela pedia que os usuários *navegassem* pela documentação quando o que queriam era *perguntar*. Busca é uma tarefa que as pessoas executam só porque não têm alternativa.

**A virada:** o produto não precisava melhorar a busca. Precisava eliminar a necessidade de buscar — e fazer a fonte de cada resposta tão visível quanto a resposta em si.

---

## Processo & Decisões

A interface conversacional no lugar da busca foi a decisão fácil. Depois das gravações do Clarity ficou óbvio: a busca existente não tinha um problema de ranking — tinha um problema de ferramenta errada. Os usuários construíam queries para navegar documentos quando o que queriam era fazer uma pergunta. Nenhuma melhoria de filtro resolve isso.

A decisão difícil foi o painel de fontes.

Sabíamos que os usuários saíam para confirmar respostas antes de agir. A solução parecia clara — mostrar a origem. Mas fiquei mais tempo do que esperava no formato. Três opções: citações inline no texto da resposta, tooltip ao passar o mouse, ou painel lateral persistente. As citações inline pareciam naturais no início — a conexão entre afirmação e fonte é mais forte quando estão adjacentes. Mas quando prototipei, a resposta ficou difícil de ler. As citações quebravam a síntese. Fui com o painel lateral — não porque era a resposta óbvia, mas porque as outras duas resolviam a versão errada do problema.

O que ainda não sei: o painel muda o comportamento de verdade, ou só faz as pessoas se sentirem melhor com um comportamento que já tinham? Tem uma versão dessa feature que é um mecanismo real de confiança e uma versão que é teatro caro de segurança. Eu acredito que seja a primeira. Lançamos antes de conseguir medir.

Para usuários novos, a tela inicial em branco era um problema real. Ninguém sabia o que perguntar a um assistente que integrava três bases ao mesmo tempo. Tentamos um tooltip de onboarding. Ninguém leu. A resposta certa veio dos dados do Clarity: as buscas mais comuns eram previsíveis — viraram chips de prompt sugerido na tela inicial. Específicos, não genéricos. "Qual é o procedimento para X?" em vez de "Tente me perguntar algo."

A arquitetura de integração não foi uma decisão de design. Assim que entendemos que os usuários precisavam saber se uma resposta vinha da política de TI ou do manual de compliance, consolidar as fontes numa base única saiu da mesa. Resolveria um problema técnico e criaria um problema de confiança. Consulta distribuída com citação por fonte foi o único caminho que preservava o que a plataforma precisava ser.

O pipeline do discovery ao handoff passou por gravações Clarity e heatmaps → entrevistas com usuários do MVP → síntese em Mural → wireframes Figma → protótipo navegável → validação com engenharia. As gravações foram o input decisivo: mostraram os pontos exatos de abandono — onde os usuários paravam, saíam para confirmar ou repetiam a mesma busca de forma diferente. O Microsoft Copilot foi usado na fase de hipóteses para estressar o racional de design antes de definir a direção — especialmente na avaliação do modelo do painel de fontes.

---

## Solução & Craft

Uma plataforma centralizada de acesso ao conhecimento corporativo. O usuário abre uma interface única e pode perguntar em linguagem natural, receber respostas estruturadas geradas a partir dos documentos internos reais, verificar as fontes num painel lateral persistente, explorar documentos relacionados e retomar conversas anteriores.

- O **estado inicial vazio** exibe prompts sugeridos como chips clicáveis — as pessoas não sabem por onde começar com um assistente que integra três bases ao mesmo tempo. Os prompts mostram isso sem exigir leitura prévia.

![Estado inicial vazio — "How can I help you?" com 6 chips de prompt sugerido derivados dos padrões de busca mais frequentes da organização](/cases/enterprise-ai-assistant/03-main-interface.png)

- O **painel de fontes** é uma coluna lateral persistente, não um modal: permanece disponível sem interromper a leitura. O badge com o número de fontes em cada mensagem sinaliza rastreabilidade antes mesmo de abrir o painel. A estrutura da resposta separa visualmente a síntese do AI do acesso às fontes — hierarquia clara entre "o que o assistente concluiu" e "de onde isso vem".

![Interface conversacional — resposta com painel de Data Source aberto listando arquivos por similaridade e formulário CSAT de feedback no canto da tela](/cases/enterprise-ai-assistant/02-user-research.png)

- **Acessibilidade:** todos os fluxos são operáveis por teclado, a ordem de tabulação segue a sequência de leitura e interação (WCAG 2.1.1). Indicadores de confiança e badges de fonte usam combinações de ícone + label, não apenas cor. Hierarquia de headings, ARIA roles e regiões de landmark foram especificados como parte do design — não como uma passada de QA — e entregues junto ao handoff no Figma.

![Painel de fontes — arquivos listados por similaridade com a query e opção de download individual; botão "Data Source" no rodapé da resposta reabre o painel](/cases/enterprise-ai-assistant/01-file-source.png)

---

## Aprendizados

Tem uma coisa que eu queria ter medido: se o painel de fontes mudou o comportamento real dos usuários, ou só fez as pessoas se sentirem mais seguras com um comportamento que já tinham. Saímos antes que esse loop pudesse fechar.

A lição mais ampla: este é um case de scale-up, não de 0→1 — e isso muda o tipo de julgamento exigido. Algumas decisões de arquitetura já estavam tomadas pelo MVP; o trabalho foi identificar o que estava errado *na camada de experiência*, não na tecnologia. Em produtos de IA corporativa, confiança não emerge da precisão do modelo. É um problema de design.
