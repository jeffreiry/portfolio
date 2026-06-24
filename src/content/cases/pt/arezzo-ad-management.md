---
title: "Arezzo&Co · Sistema de Anúncios"
slug: arezzo-ad-management
role: "UX Researcher · UX Designer · UI Designer"
summary: "Redesign da plataforma de anúncios da Arezzo&Co para três perfis distintos em um sistema unificado."
company: "Arezzo&Co (via CWI)"
year: 2023
cover: /cases/arezzo-ad-management/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1748570569710-008d3050c104?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#ecf0f3"
template: brand
tags: ["AI & Automation", "UX Research", "Data & Analytics"]
featured: true
draft: false
order: 7
---

## Um sistema, três jornadas: como a arquitetura por papel desbloqueou o gerenciamento de anúncios do grupo Arezzo&Co

**TL;DR** — UX Researcher, UX Designer e UI Designer, 3 meses. Redesenho do sistema de gerenciamento de anúncios em redes sociais do grupo Arezzo&Co, servindo três perfis com necessidades radicalmente diferentes — Marketing, Gestores de Tráfego e Lojistas — em uma única plataforma com arquitetura de informação adaptada por papel.

**Tags:** Retail · Multi-perfil · Design de sistema · Dashboard · Mobile · Figma

---

## Contexto & Problema

O grupo Arezzo&Co opera múltiplas marcas (Arezzo, Schutz e outras) com centenas de lojas físicas, cada uma com autonomia para criar e submeter anúncios em redes sociais. A cadeia envolve três atores com objetivos distintos: o **Lojista** que cria e acompanha seus próprios anúncios, o **Gestor de Tráfego** que supervisiona um conjunto de lojas e aprova as peças, e o time de **Marketing** que monitora a performance consolidada de toda a marca e gerencia o orçamento. O sistema existente não refletia essa estrutura — todos os perfis acessavam as mesmas telas, independentemente do que precisavam fazer.

**Estado anterior:** um sistema único sem diferenciação de papel, onde o Lojista se perdia em métricas corporativas e o Marketing não conseguia visão consolidada sem navegar por lojas individualmente.

![Lojista — painel de anúncios com orçamento disponível e resultados inline](/cases/arezzo-ad-management/01-store-view.png)

---

## Meu papel

UX Researcher, UX Designer e UI Designer responsável pelo projeto completo: conduzi entrevistas com cada perfil de usuário, mapeei as jornadas e a arquitetura de informação por papel, e desenvolvi todas as interfaces — web e mobile — em Figma. O projeto foi feito em parceria com uma empresa de tecnologia que fornecia a plataforma para o grupo.

---

## Restrições

- **Três perfis, um sistema** — a solução não podia ser três produtos separados; precisava ser uma plataforma coerente com rotas e telas diferenciadas por papel sem que o custo de manutenção explodisse.
- **Multi-marca** — o mesmo sistema atendia Arezzo, Schutz e outras marcas do grupo, exigindo consistência visual sem perder a identidade de cada marca nos contextos relevantes.
- **3 meses de prazo** — escopo apertado para pesquisa, arquitetura, design e prototipação de web + mobile para todos os perfis.

---

## Descoberta & Insight

As entrevistas revelaram que o problema não era de funcionalidade ausente — era de **audiência errada**. O sistema tinha as informações certas, mas as apresentava para quem não precisava delas. Um Lojista não quer saber o ROAS consolidado de todas as 165 lojas da marca; quer saber se seu anúncio foi aprovado e quanto do orçamento dele ainda está disponível. Um Gestor de Tráfego não quer ver o fluxo de submissão do Lojista; quer ver a fila de aprovações pendentes e a performance das lojas sob sua responsabilidade. O Marketing quer o funil completo — de impressões a vendas — para a marca inteira.

**A virada:** o redesenho não era uma questão de interface. Era uma questão de arquitetura de informação: cada perfil precisava de um produto diferente dentro da mesma plataforma.

---

## Processo & Decisões

A decisão que mais me custou foi a das três homes distintas — a dúvida era se criar experiências separadas por papel ia dificultar a vida de quem, na prática, às vezes ocupava mais de um papel. Um gestor regional que também acompanhava os próprios anúncios não ia se sentir em casa em nenhuma das homes.

**1. Arquitetura de informação por papel — problema:** uma única IA para três perfis obrigava cada usuário a ignorar a maior parte do sistema. **Opções:** personalização por preferência (usuário escolhe o que ver — mais flexível, mais complexo de manter) vs. arquitetura fixa por papel (rotas e telas definidas no login — mais simples, mais adequada ao contexto corporativo). **Escolha:** arquitetura de informação diferenciada por papel, com navegação lateral distinta para cada perfil — Marketing (Home, Aprovações, Painel, Métricas, Orçamento, Cadastro, Notificações), Gestores de Tráfego (Home, Relatórios, Feed, Novo, Envios, Notificações) e Lojistas (Home, Novo, Meus Envios, Feed, Notificações). **Porquê:** o contexto de cada perfil é mutuamente exclusivo — misturá-los numa tela única prejudica todos.

**2. Home como painel de controle contextual — problema:** a home precisava responder perguntas diferentes para cada perfil sem virar uma tela genérica inútil. **Opções:** home única com filtros por papel (complexo, confuso) vs. três homes distintas otimizadas para a tarefa primária de cada papel. **Escolha:** homes diferenciadas — Marketing vê orçamento consolidado, distribuição de investimento (Investido/Provisionado/Restante), métricas de performance das lojas ativas e Receita Impactada; Gestores de Tráfego veem as lojas sob sua responsabilidade com foco em decisões táticas; Lojistas veem seu valor disponível, seus anúncios ativos com resultados inline e um banner de alerta quando há orçamento não utilizado. **Porquê:** a home é a primeira tela de cada sessão — ela precisa responder imediatamente à pergunta mais frequente de cada papel, sem exigir navegação.

**3. Fluxo de aprovação com filtros compostos — problema:** o Gestor de Tráfego recebe anúncios de múltiplas lojas simultaneamente; sem filtragem eficiente, a fila de aprovações vira ruído. **Opções:** lista linear com busca simples vs. grid visual com filtros compostos (Loja, Status, Orçamento, Posicionamento, Arquivo) e chips de acesso rápido. **Escolha:** grid de anúncios com filtros em cascata — ao selecionar "Status", os sub-status aparecem com contagem (Novo: 5, Aprovado: 10, Reprovado: 2); chips de data, status ativo e ordenação sempre visíveis no topo. **Porquê:** o Gestor precisa priorizar a fila, não apenas percorrê-la — ver a contagem por status antes de filtrar permite uma decisão de onde começar.

**4. Métricas em funil para o Marketing** — os primeiros wireframes tinham cards de KPIs isolados. Receita Impactada. ROAS. Ticket Médio. Cada número numa caixa separada. Fiz uma apresentação interna e o feedback foi educado demais para ser sincero — as pessoas concordavam que estava "claro" mas não conseguiam dizer o que o dashboard *dizia* sobre a saúde dos anúncios.

O problema era que cards isolados mostram estado, não relação. O que o Marketing precisava entender era: em que ponto a cadeia perde eficiência? "Conversas: 20" não responde isso. "Impressões 3.538 → Conversas 20" responde. Substituí os cards por um funil visual (Impressões → Engajamento → Cliques → Conversas → Vendas) — os KPIs ficaram como complemento, não como protagonistas.

![Marketing — funil de conversão de impressões a vendas com métricas consolidadas](/cases/arezzo-ad-management/02-manager-view.png)

---

## Solução

Uma plataforma multi-perfil de gerenciamento de anúncios com três experiências distintas dentro do mesmo sistema:

- **Lojistas** criam e acompanham seus próprios anúncios, visualizam seus resultados (engajamento, cliques, receita gerada, ROAS) e são alertados quando têm orçamento disponível não utilizado.
- **Gestores de Tráfego** aprovam ou reprovam anúncios via fila filtrada, monitoram as lojas sob sua responsabilidade e acompanham relatórios táticos de performance.
- **Marketing** acessa o painel consolidado com funil de conversão, gerencia o orçamento mensal por loja com edição inline, e monitora a saúde do portfólio de anúncios de toda a marca.

Todas as telas foram entregues em versão **web e mobile**, com a navegação mobile adaptada ao padrão de uso de cada perfil.

![Admin — gestão de orçamento e performance consolidada por loja](/cases/arezzo-ad-management/03-admin-view.png)

---

## Craft & Acessibilidade

- O **banner de alerta de orçamento disponível** no Lojista usa cor âmbar (não vermelho — não é urgência, é oportunidade) e oferece ação imediata "Saiba mais" sem forçar interação.
- Os **cards de anúncio na aprovação** exibem status com badge colorido (laranja "Novo", verde "Ativo") + data de veiculação + orçamento no topo, permitindo leitura do contexto antes de abrir o anúncio.
- O **orçamento editável** na tela de Orçamento usa edição inline ativada por ícone de lápis — o campo abre com o valor atual pré-preenchido e um botão "Confirmar" sem saída da tabela.
- A **navegação mobile** foi redesenhada por perfil: Lojistas têm "Novo" com destaque central na bottom nav (sua ação primária); Gestores têm "Relatórios" como primeiro item.
- Os **badges de status** (laranja "Novo", verde "Ativo") combinam cor e rótulo textual — o estado é legível sem depender de cor isolada, atendendo WCAG 1.4.1 para usuários com daltonismo ou em contextos de baixo contraste.

---

## Colaboração técnica

Pipeline de pesquisa e design: `entrevistas por perfil → mapeamento de jornadas + benchmarking → arquitetura de informação por papel → wireframes Figma → validações internas → interfaces web + mobile → prototipação → handoff para empresa parceira de tecnologia`. A etapa de arquitetura de informação por papel foi feita antes de qualquer tela — definir quais rotas e módulos existiam para cada perfil foi o que tornou possível desenvolver as interfaces sem retrabalho.

---

## O que eu faria diferente

Entreguei interfaces web e mobile para os três perfis, cobrindo todas as jornadas da pesquisa. Mas não medimos nada depois do lançamento — sem satisfação por papel, sem tempo de aprovação, sem taxa de uso de orçamento pelos Lojistas.

Se pudesse refazer: antes de fechar o escopo, teria negociado uma rodada de validação com usuários reais de cada papel em cima do protótipo navegável — não para mudar a arquitetura, mas para confirmar se a home contextual de cada perfil respondia mesmo à pergunta mais frequente, ou se eu tinha errado a hierarquia de informação em algum caso. O design-por-papel parece certo na teoria. Sem feedback pós-lançamento, não sei onde errei.

---

## Aprendizados

O maior risco em projetos multi-perfil é cair na armadilha do "o sistema serve todo mundo" — que na prática significa que não serve ninguém bem. A decisão de definir a arquitetura de informação por papel antes de desenhar qualquer tela foi o que determinou o resultado: cada usuário entrava num produto desenhado para o que ele realmente precisava fazer.

O que fico pensando ainda é se um Gestor Regional que também acompanha suas próprias lojas conseguiria se situar nesse sistema. Ele não era o persona principal. Mas também não era impossível. Isso é o tipo de coisa que só aparece depois que o produto está nas mãos das pessoas.
