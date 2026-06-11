---
title: "Arezzo&Co · Sistema de Anúncios"
slug: arezzo-ad-management
role: "UX Researcher · UX Designer · UI Designer"
summary: "Redesign da plataforma de anúncios da Arezzo&Co para três perfis distintos em um sistema unificado."
company: "Arezzo&Co (via CWI)"
year: 2023
cover: /cases/arezzo-ad-management/visao-geral.jpg
bgImage: "https://images.unsplash.com/photo-1748570569710-008d3050c104?fm=jpg&w=1400&q=80&auto=format&fit=crop"
accent: "#ecf0f3"
tags: ["Retail", "Multi-perfil", "Design de sistema", "Dashboard", "Mobile"]
featured: true
draft: false
order: 3
---

## Um sistema, três jornadas: como a arquitetura por papel desbloqueou o gerenciamento de anúncios do grupo Arezzo&Co

**TL;DR** — UX Researcher, UX Designer e UI Designer, 3 meses. Redesenho do sistema de gerenciamento de anúncios em redes sociais do grupo Arezzo&Co, servindo três perfis com necessidades radicalmente diferentes — Marketing, Gestores de Tráfego e Lojistas — em uma única plataforma com arquitetura de informação adaptada por papel.

**Tags:** Retail · Multi-perfil · Design de sistema · Dashboard · Mobile · Figma

---

## Contexto & Problema

O grupo Arezzo&Co opera múltiplas marcas (Arezzo, Schutz e outras) com centenas de lojas físicas, cada uma com autonomia para criar e submeter anúncios em redes sociais. A cadeia envolve três atores com objetivos distintos: o **Lojista** que cria e acompanha seus próprios anúncios, o **Gestor de Tráfego** que supervisiona um conjunto de lojas e aprova as peças, e o time de **Marketing** que monitora a performance consolidada de toda a marca e gerencia o orçamento. O sistema existente não refletia essa estrutura — todos os perfis acessavam as mesmas telas, independentemente do que precisavam fazer.

**Estado anterior:** um sistema único sem diferenciação de papel, onde o Lojista se perdia em métricas corporativas e o Marketing não conseguia visão consolidada sem navegar por lojas individualmente.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Arquitetura por papel</strong>
  <span>Três navegações distintas — Marketing, Gestores de Tráfego, Lojistas — dentro de uma única plataforma</span>
</div>

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

**1. Arquitetura de informação por papel — problema:** uma única IA para três perfis obrigava cada usuário a ignorar a maior parte do sistema. **Opções:** personalização por preferência (usuário escolhe o que ver — mais flexível, mais complexo de manter) vs. arquitetura fixa por papel (rotas e telas definidas no login — mais simples, mais adequada ao contexto corporativo). **Escolha:** arquitetura de informação diferenciada por papel, com navegação lateral distinta para cada perfil — Marketing (Home, Aprovações, Painel, Métricas, Orçamento, Cadastro, Notificações), Gestores de Tráfego (Home, Relatórios, Feed, Novo, Envios, Notificações) e Lojistas (Home, Novo, Meus Envios, Feed, Notificações). **Porquê:** o contexto de cada perfil é mutuamente exclusivo — misturá-los numa tela única prejudica todos.

**2. Home como painel de controle contextual — problema:** a home precisava responder perguntas diferentes para cada perfil sem virar uma tela genérica inútil. **Opções:** home única com filtros por papel (complexo, confuso) vs. três homes distintas otimizadas para a tarefa primária de cada papel. **Escolha:** homes diferenciadas — Marketing vê orçamento consolidado, distribuição de investimento (Investido/Provisionado/Restante), métricas de performance das lojas ativas e Receita Impactada; Gestores de Tráfego veem as lojas sob sua responsabilidade com foco em decisões táticas; Lojistas veem seu valor disponível, seus anúncios ativos com resultados inline e um banner de alerta quando há orçamento não utilizado. **Porquê:** a home é a primeira tela de cada sessão — ela precisa responder imediatamente à pergunta mais frequente de cada papel, sem exigir navegação.

**3. Fluxo de aprovação com filtros compostos — problema:** o Gestor de Tráfego recebe anúncios de múltiplas lojas simultaneamente; sem filtragem eficiente, a fila de aprovações vira ruído. **Opções:** lista linear com busca simples vs. grid visual com filtros compostos (Loja, Status, Orçamento, Posicionamento, Arquivo) e chips de acesso rápido. **Escolha:** grid de anúncios com filtros em cascata — ao selecionar "Status", os sub-status aparecem com contagem (Novo: 5, Aprovado: 10, Reprovado: 2); chips de data, status ativo e ordenação sempre visíveis no topo. **Porquê:** o Gestor precisa priorizar a fila, não apenas percorrê-la — ver a contagem por status antes de filtrar permite uma decisão de onde começar.

**4. Métricas em funil para o Marketing — problema:** a visão consolidada de performance precisava comunicar não apenas volume, mas a conversão entre etapas — de impressão a venda. **Opções:** cards de KPIs isolados (cada métrica em sua caixa, sem relação visual entre elas) vs. visualização em funil com as etapas da jornada do consumidor. **Escolha:** funil visual (Impressões → Engajamento → Cliques → Conversas → Vendas) com os números de cada estágio abaixo das barras, complementado por cards de Receita Impactada, Ticket Médio e ROAS. **Porquê:** o Marketing precisa ver onde a cadeia perde eficiência — um card isolado de "Conversas: 20" não diz nada; "Impressões 3.538 → Conversas 20" diz tudo.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Funil de conversão — Marketing</strong>
  <span>Impressões → Engajamento → Cliques → Conversas → Vendas com contagem por estágio</span>
</div>

---

## Solução

Uma plataforma multi-perfil de gerenciamento de anúncios com três experiências distintas dentro do mesmo sistema:

- **Lojistas** criam e acompanham seus próprios anúncios, visualizam seus resultados (engajamento, cliques, receita gerada, ROAS) e são alertados quando têm orçamento disponível não utilizado.
- **Gestores de Tráfego** aprovam ou reprovam anúncios via fila filtrada, monitoram as lojas sob sua responsabilidade e acompanham relatórios táticos de performance.
- **Marketing** acessa o painel consolidado com funil de conversão, gerencia o orçamento mensal por loja com edição inline, e monitora a saúde do portfólio de anúncios de toda a marca.

Todas as telas foram entregues em versão **web e mobile**, com a navegação mobile adaptada ao padrão de uso de cada perfil.

---

## Craft & Acessibilidade

- O **banner de alerta de orçamento disponível** no Lojista usa cor âmbar (não vermelho — não é urgência, é oportunidade) e oferece ação imediata "Saiba mais" sem forçar interação.
- Os **cards de anúncio na aprovação** exibem status com badge colorido (laranja "Novo", verde "Ativo") + data de veiculação + orçamento no topo, permitindo leitura do contexto antes de abrir o anúncio.
- O **orçamento editável** na tela de Orçamento usa edição inline ativada por ícone de lápis — o campo abre com o valor atual pré-preenchido e um botão "Confirmar" sem saída da tabela.
- A **navegação mobile** foi redesenhada por perfil: Lojistas têm "Novo" com destaque central na bottom nav (sua ação primária); Gestores têm "Relatórios" como primeiro item.
- ⬜ Decisões de acessibilidade (contraste, foco por teclado) — preencher.

---

## Colaboração técnica

Pipeline de pesquisa e design: `entrevistas por perfil → mapeamento de jornadas + benchmarking → arquitetura de informação por papel → wireframes Figma → validações internas → interfaces web + mobile → prototipação → handoff para empresa parceira de tecnologia`. A etapa de arquitetura de informação por papel foi feita antes de qualquer tela — definir quais rotas e módulos existiam para cada perfil foi o que tornou possível desenvolver as interfaces sem retrabalho.

---

## Impacto

- **Entrega:** interfaces web e mobile para os três perfis, cobrindo todas as jornadas mapeadas na pesquisa.
- ⬜ Variação de satisfação dos usuários após o redesenho (pesquisa de satisfação pós-lançamento) — preencher.
- ⬜ Redução do tempo médio de aprovação de anúncios — preencher.
- ⬜ Aumento na taxa de uso do orçamento disponível pelos Lojistas — preencher.

---

## Aprendizados

O maior risco em projetos multi-perfil é cair na armadilha do "o sistema serve todo mundo" — que na prática significa que não serve ninguém bem. A decisão de definir a arquitetura de informação por papel antes de desenhar qualquer tela foi o que determinou o resultado: cada usuário entrava num produto desenhado para o que ele realmente precisava fazer. **Lição:** quando o produto serve perfis com objetivos radicalmente diferentes, a arquitetura de informação não é um artefato de processo — é a decisão de design mais importante do projeto.
