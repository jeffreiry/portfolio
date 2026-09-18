---
title: "Arezzo&Co · Sistema de Anúncios"
slug: arezzo-ad-management
role: "Product Designer"
summary: "Um app white-label de gerenciamento de anúncios no Instagram, vinculado ao Gerenciador de Negócios do Facebook, substituindo a ferramenta usada anteriormente pelo grupo Arezzo&Co."
thesis: "Três perfis, três produtos dentro do mesmo sistema — não uma tela genérica tentando servir todo mundo."
company: "Arezzo&Co (via CWI)"
year: 2023
cover: /cases/arezzo-ad-management/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1748570569710-008d3050c104?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#ecf0f3"
template: brand-split
tags: ["AI & Automation", "UX Research", "Data & Analytics"]
scope: ["Pesquisa com usuários", "Arquitetura de informação por papel", "Interfaces web + mobile"]
duration: "3 meses"
metrics:
  - label: "Lojas atendidas"
    value: "350"
  - label: "Marcas do grupo"
    value: "3"
  - label: "Usuários impactados"
    value: "1500"
  - label: "Perfis de usuário atendidos"
    value: "3"
featured: true
draft: false
order: 7
---

## Um sistema, três jornadas: como a arquitetura por papel desbloqueou o gerenciamento de anúncios do grupo Arezzo&Co

**Resumo** — Product Designer, atuando na UX e UI da solução, 3 meses. Desenvolvimento de UX e UI de um app white-label — em parceria com uma empresa de tecnologia parceira — vinculado ao Gerenciador de Negócios do Facebook, para envio e acompanhamento de anúncios de lojas do grupo Arezzo&Co veiculados no Instagram, substituindo a ferramenta usada anteriormente pelo grupo. Três perfis com necessidades radicalmente diferentes — Marketing, Gestores de Tráfego e Lojistas — atendidos em uma única plataforma com arquitetura de informação adaptada por papel.

---

## Contexto & Problema

O grupo Arezzo&Co operava múltiplas marcas (Arezzo, Schutz e outras) com centenas de lojas físicas, cada uma com autonomia para criar e submeter anúncios em redes sociais. A cadeia envolvia três atores com objetivos distintos: o **Lojista** que criava e acompanhava seus próprios anúncios, o **Gestor de Tráfego** que supervisionava um conjunto de lojas e aprovava as peças, e o time de **Marketing** que monitorava a performance consolidada de toda a marca e gerenciava o orçamento.

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_matriz_responsabilidades_gestao_anuncios_arezzo.png" alt="Matriz de responsabilidades — Loja, Gestor de Tráfego e Marketing cruzados com 11 tarefas (Aprovação de Anúncios, Solicitação de Ajuste, Corrigir Anúncio Reprovado, Garantir utilização de 100% da verba, Métricas Estratégicas, Métricas Táticas, Acompanhamento de Anúncios Publicados, Cadastro de Orçamento e Loja, Acompanhar Receita Impactada, Otimizar Investimentos, Buscar Referências de Posts de Sucesso), com totais de 4 (Loja), 7 (Gestor) e 7 (Marketing)">
  <figcaption>Matriz de responsabilidades — gestão de anúncios</figcaption>
</figure>

Entrei como Product Designer, atuando na UX e UI da solução, responsável pelo projeto completo — conduzindo entrevistas com cada perfil de usuário, mapeando as jornadas e a arquitetura de informação por papel, e desenvolvendo todas as interfaces (web e mobile) em Figma ao longo de 3 meses. O projeto foi feito em parceria com uma empresa de tecnologia parceira, e consistia em desenvolver um terceiro app — com proposta white-label, direcionado às marcas do grupo (Arezzo, Schutz e Anacapri) — vinculado ao Gerenciador de Negócios do Facebook, substituindo a ferramenta de gestão de anúncios usada anteriormente pelo grupo.

O escopo tinha três restrições fixas: a solução precisava ser uma plataforma coerente com rotas diferenciadas por papel, não três produtos separados; o mesmo sistema atendia Arezzo, Schutz e outras marcas do grupo, exigindo consistência visual sem perder a identidade de cada marca nos contextos relevantes; e 3 meses de prazo cobriram pesquisa, arquitetura, design e prototipação de web + mobile para todos os perfis.

**Estado anterior:** a ferramenta usada anteriormente pelo grupo não diferenciava por papel — Lojista, Gestor de Tráfego e Marketing acessavam essencialmente as mesmas telas, independentemente do que precisavam fazer, e o Lojista se perdia em métricas corporativas enquanto o Marketing não conseguia visão consolidada sem navegar por lojas individualmente.

<div class="before-after" style="--stages: 2;">
  <figure>
    <img src="/cases/arezzo-ad-management/home_before.png" alt="Home da ferramenta anterior — seções Verba e Atividade sem diferenciação por papel">
    <figcaption>Antes</figcaption>
  </figure>
  <figure>
    <img src="/cases/arezzo-ad-management/home_after.png" alt="Home do novo app — Novos Anúncios, Anúncios Aprovados, Orçamento Mensal, Lojas Ativas e Receita Impactada, com identidade Arezzo">
    <figcaption>Depois</figcaption>
  </figure>
</div>

---

## Descoberta & Insight

As entrevistas revelaram que o problema não era de funcionalidade ausente — era de **audiência errada**. O sistema tinha as informações certas, mas as direcionava para quem não precisava delas. Um Lojista não queria saber o ROAS consolidado das 350 lojas do grupo; queria saber se o anúncio tinha sido aprovado e quanto do orçamento ainda sobrava. Um Gestor de Tráfego gerenciava aprovações de um portfólio inteiro de lojas — a pergunta dele era "o que estava pendente e de onde", não como criar uma submissão. O Marketing era o único perfil que precisava do funil completo, de impressões a vendas, para a marca inteira.

Consolidar 2 entrevistas com stakeholders internos e a leitura de 2 painéis existentes num único board revelou que "orçamento" era o fio condutor entre todas as fontes — só que com rótulos diferentes em cada uma:

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_board_sintese_pesquisa_pt.png" alt="Board de síntese de pesquisa — clusters de métricas identificados a partir de 2 entrevistas e 2 painéis (Identificação da Loja, Orçamento e Investimento, Metas e Progresso, Anúncios, Desempenho e Engajamento, Receita e Retorno, Visão Agregada), com 4 insights transformados em oportunidades e 3 perguntas em aberto para validar">
  <figcaption>Board de síntese de pesquisa — métricas de gestão de anúncios</figcaption>
</figure>

**A virada:** isso transformou o redesenho em um problema de arquitetura de informação, não de interface. Cada perfil precisava de um produto diferente dentro do mesmo sistema.

Desenhei um Canvas de Proposta de Valor pra cada um dos três perfis — o exemplo abaixo é o do Marketing:

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_value-proposition_admin.png" alt="Canvas de Proposta de Valor do perfil Marketing — dores, ganhos e tarefas de um lado; produtos/serviços, criadores de ganho e aliviadores de dor do outro">
  <figcaption>Canvas de Proposta de Valor — perfil Marketing (um dos três desenhados)</figcaption>
</figure>

Cada tarefa do Marketing virou um Job to be Done — a estrutura "quando eu vou / eu quero / para que eu possa" tirou a ambiguidade de tarefas genéricas como "acompanhar métricas" e forçou nomear o motivo real por trás de cada uma:

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_jtbd_pt.png" alt="Tabela de Jobs to be Done do perfil Marketing — 7 tarefas (Aprovação de Anúncios, Solicitação de Ajuste, Garantir utilização de 100% da verba, Métricas Estratégicas, Métricas Táticas, Acompanhamento de Anúncios Publicados, Cadastro de Orçamento e Loja) traduzidas no formato quando/quero/para que">
  <figcaption>Jobs to be Done — perfil Marketing</figcaption>
</figure>

---

## Processo & Decisões

A decisão que mais me custou foi a dos três fluxos distintos — a dúvida era se criar experiências separadas por papel ia dificultar a vida de quem, na prática, às vezes ocupava mais de um papel. Um gestor regional que também acompanhava os próprios anúncios não ia se sentir em casa em nenhum dos fluxos.

**1. Arquitetura de informação por papel — problema:** uma única arquitetura de informação para três perfis obrigava cada usuário a ignorar a maior parte do sistema. **Opções:** personalização por preferência (usuário escolhe o que ver — mais flexível, mais complexo de manter) vs. arquitetura fixa por papel (rotas e telas definidas no login — mais simples, mais adequada ao contexto corporativo). **Escolha:** arquitetura de informação diferenciada por papel, com navegação lateral distinta para cada perfil — Marketing (Home, Aprovações, Painel, Métricas, Orçamento, Cadastro, Notificações), Gestores de Tráfego (Home, Relatórios, Feed, Novo, Envios, Notificações) e Lojistas (Home, Novo, Meus Envios, Feed, Notificações). **Porquê:** o contexto de cada perfil é mutuamente exclusivo — misturá-los numa tela única prejudica todos.

**2. Home como painel de controle contextual — problema:** a home precisava responder perguntas diferentes para cada perfil sem virar uma tela genérica inútil. **Opções:** home única com filtros por papel (complexo, confuso) vs. três fluxos distintos otimizados para a tarefa primária de cada papel. **Escolha:** fluxos diferenciados — Marketing via orçamento consolidado, distribuição de investimento (Investido/Provisionado/Restante), métricas de performance das lojas ativas e Receita Impactada; Gestores de Tráfego viam as lojas sob sua responsabilidade com foco em decisões táticas; Lojistas viam seu valor disponível, seus anúncios ativos com resultados inline e um banner de alerta quando havia orçamento não utilizado. **Porquê:** a home era a primeira tela de cada sessão — ela precisava responder imediatamente à pergunta mais frequente de cada papel, sem exigir navegação.

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_fluxo_home_metricas.png" alt="Fluxograma da Home do Marketing — a partir da Home, decisões sobre acompanhar métricas estratégicas, anúncios postados ou postagens de outras lojas levam a Relatórios, Anúncios ou Feed; ramificação separada para criar anúncio, com validação de informações completas e loop de correção de erros">
  <figcaption>Fluxo de usuário — Home do Marketing</figcaption>
</figure>

**3. Fluxo de aprovação com filtros compostos — problema:** o Gestor de Tráfego recebia anúncios de múltiplas lojas simultaneamente; sem filtragem eficiente, a fila de aprovações virava ruído. **Opções:** lista linear com busca simples vs. grid visual com filtros compostos (Loja, Status, Orçamento, Posicionamento, Arquivo) e chips de acesso rápido. **Escolha:** grid de anúncios com filtros em cascata — ao selecionar "Status", os sub-status apareciam com contagem (Novo: 5, Aprovado: 10, Reprovado: 2); chips de data, status ativo e ordenação sempre visíveis no topo. **Porquê:** o Gestor precisava priorizar a fila, não apenas percorrê-la — ver a contagem por status antes de filtrar permitia uma decisão de onde começar.

**4. Métricas em funil para o Marketing** — os primeiros wireframes tinham cards de KPIs isolados. Receita Impactada. ROAS. Ticket Médio. Cada número numa caixa separada. Fiz uma apresentação interna e o feedback foi educado demais para ser sincero — as pessoas concordavam que estava "claro" mas não conseguiam dizer o que o dashboard *dizia* sobre a saúde dos anúncios.

O problema era que cards isolados mostravam estado, não relação. O que o Marketing precisava entender era: em que ponto a cadeia perdia eficiência? "Conversas: 20" não respondia isso. "Impressões 3.538 → Conversas 20" respondia. Substituí os cards por um funil visual (Impressões → Engajamento → Cliques → Conversas → Vendas) — os KPIs ficaram como complemento, não como protagonistas.

Pipeline de pesquisa e design: entrevistas por perfil → mapeamento de jornadas + benchmarking → arquitetura de informação por papel → wireframes Figma → validações internas → interfaces web + mobile → prototipação → handoff para empresa parceira. A etapa de arquitetura de informação por papel foi feita antes de qualquer tela — definir quais rotas e módulos existiam para cada perfil foi o que tornou possível desenvolver as interfaces sem retrabalho.

O blueprint de serviço deixou visível o que nenhuma tela sozinha mostrava: o anúncio criado pelo Lojista passava por aprovação do Admin, integração com a API da empresa parceira e o Business Manager antes de voltar como métrica na tela do próprio Lojista — um ciclo que atravessava 4 camadas diferentes de visibilidade.

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_blueprint_gestao_anuncios_arezzo_pt.png" alt="Blueprint de serviço da gestão de anúncios — linha de interação (Usuário Loja, Usuário Gestão, Usuário Admin) e linha de visibilidade (API Parceira, Business Manager) ao longo das etapas Preparação, Envio, Acompanhamento e Resultados">
  <figcaption>Blueprint de serviço — gestão de anúncios</figcaption>
</figure>

O handoff em si era documentado tela a tela: cada fluxo saía com o Job to be Done que o originou, os wireframes anotados com comportamentos especiais (validações, regras de campo, mensagens de erro específicas por tipo de arquivo) e os modais de sucesso/erro especificados à parte — pra reduzir dúvida de implementação sem exigir alinhamento síncrono pra cada detalhe.

<figure>
  <img src="/cases/arezzo-ad-management/arezzo_handoff.png" alt="Documento de handoff do fluxo Criar Anúncio — Job to be Done no topo, wireframes anotados com comportamentos especiais, mensagens de erro por campo e modais de sucesso/erro">
  <figcaption>Handoff documentado — fluxo Criar Anúncio</figcaption>
</figure>

<!--metrics-here-->

---

## Solução & Craft

Uma plataforma multi-perfil de gerenciamento de anúncios com três experiências distintas dentro do mesmo sistema:

- **Lojistas** criavam e acompanhavam seus próprios anúncios, visualizavam seus resultados (engajamento, cliques, receita gerada, ROAS) e eram alertados quando tinham orçamento disponível não utilizado.
- **Gestores de Tráfego** aprovavam ou reprovavam anúncios via fila filtrada, monitoravam as lojas sob sua responsabilidade e acompanhavam relatórios táticos de performance.
- **Marketing** acessava o painel consolidado com funil de conversão, gerenciava o orçamento mensal por loja com edição inline, e monitorava a saúde do portfólio de anúncios de toda a marca.

Todas as telas foram entregues em versão **web e mobile**, mas o quanto de polimento cada perfil recebia no mobile variava — e isso vinha direto de como cada um realmente ia usar o app: Lojistas usavam o app quase inteiramente no celular, então o fluxo precisava ser tão simples quanto tirar uma foto do produto na loja e criar o anúncio ali mesmo. Gestores de Tráfego dividiam o uso quase igualmente entre mobile e desktop. Marketing operava majoritariamente no desktop, com o mobile como apoio pontual em deslocamento.

<div class="platform-split">
  <div class="platform-split-row">
    <span class="platform-split-role">Lojista</span>
    <div class="platform-split-bar">
      <div class="platform-split-mobile" style="width: 90%;">Mobile 90%</div>
      <div class="platform-split-desktop" style="width: 10%;">10%</div>
    </div>
  </div>
  <div class="platform-split-row">
    <span class="platform-split-role">Gestor de Tráfego</span>
    <div class="platform-split-bar">
      <div class="platform-split-mobile" style="width: 50%;">Mobile 50%</div>
      <div class="platform-split-desktop" style="width: 50%;">Desktop 50%</div>
    </div>
  </div>
  <div class="platform-split-row">
    <span class="platform-split-role">Marketing</span>
    <div class="platform-split-bar">
      <div class="platform-split-mobile" style="width: 20%;">20%</div>
      <div class="platform-split-desktop" style="width: 80%;">Desktop 80%</div>
    </div>
  </div>
  <div class="platform-split-legend">
    <span><span class="dot" style="background: var(--color-jambu);"></span>Mobile</span>
    <span><span class="dot" style="background: var(--color-azul-pantanal);"></span>Desktop</span>
  </div>
</div>

A tela de Lojas do Gestor de Tráfego é um bom exemplo de como a mesma informação se adaptava aos dois formatos, sem virar uma versão reduzida um do outro:

<figure>
  <div class="device-compare">
    <div class="monitor-svg">
      <img class="screen" src="/cases/arezzo-ad-management/arezzo_gestor_lojas_desktop.png" alt="Tela de Lojas do Gestor de Tráfego no desktop — orçamento mensal, lojas ativas, com anúncio e sem anúncio, tabela completa com total de anúncios, ações em massa, orçamento e valores investido/provisionado">
      <img class="frame" src="/cases/arezzo-ad-management/Monitor_white.svg" alt="">
    </div>
    <div class="phone-frame"><img src="/cases/arezzo-ad-management/arezzo_gestor_lojas_mobile.png" alt="Tela de Lojas do Gestor de Tráfego no mobile — orçamento mensal, lojas ativas e listagem simplificada por loja com status"></div>
  </div>
  <figcaption>Tela de Lojas do Gestor de Tráfego — desktop e mobile</figcaption>
</figure>

Já no Lojista, a mudança mais visível foi de fundo: o app anterior era genérico (mesmo conteúdo pra qualquer perfil); o novo já nasce mostrando o que o Lojista mais queria ver no primeiro segundo — o próprio saldo:

<div class="before-after" style="--stages: 2; grid-template-columns: max-content max-content; justify-content: center; gap: 50px; align-items: center;">
  <figure>
    <div class="phone-frame"><img src="/cases/arezzo-ad-management/app_before.jpg" alt="App anterior no mobile — home com anúncio em destaque e dicas em formato de stories"></div>
    <figcaption>Antes</figcaption>
  </figure>
  <figure>
    <div class="phone-frame"><img src="/cases/arezzo-ad-management/app_after.jpg" alt="Novo app no mobile — home do Lojista com banner de orçamento disponível, valor disponível e anúncio ativo com resultados inline"></div>
    <figcaption>Depois</figcaption>
  </figure>
</div>

- O **banner de alerta de orçamento disponível** no Lojista usava cor âmbar (não vermelho — não era urgência, era oportunidade) e oferecia ação imediata "Saiba mais" sem forçar interação.
- Os **cards de anúncio na aprovação** exibiam status com badge colorido (laranja "Novo", verde "Ativo") + data de veiculação + orçamento no topo, permitindo leitura do contexto antes de abrir o anúncio.
- O **orçamento editável** usava edição inline ativada por ícone de lápis — o campo abria com o valor atual pré-preenchido e um botão "Confirmar" sem saída da tabela.
- A **navegação mobile** foi redesenhada por perfil: Lojistas tinham "Novo" com destaque central na bottom nav (sua ação primária); Gestores tinham "Relatórios" como primeiro item.
- Os **badges de status** (laranja "Novo", verde "Ativo") combinavam cor e rótulo textual — o estado era legível sem depender de cor isolada, atendendo WCAG 1.4.1 para usuários com daltonismo.

---

## Aprendizados

<div class="dual-cards">
  <div class="dual-card">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L3 10.5l7.5 3L13.5 21 21 3z"/></svg>
    <span class="dual-card-label">Desafios do Projeto</span>
    <p>A decisão que mais me custou foi a dos <strong>três fluxos distintos</strong> por papel — a dúvida era se isso dificultaria a vida de quem, na prática, ocupava mais de um papel. Um <strong>Gestor Regional</strong> que também acompanhava os próprios anúncios não se encaixava limpo em nenhuma das três.</p>
  </div>
  <div class="dual-card">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    <span class="dual-card-label">Lições Aprendidas</span>
    <p>A tentação constante era uma home única com filtros — o atalho de "servir todo mundo". Aprendi que quando duas necessidades <strong>não se sobrepõem, se cancelam</strong>: a home do Marketing e a do Lojista não podiam dividir a mesma tela.</p>
  </div>
</div>

Entreguei interfaces web e mobile para os três perfis, cobrindo todas as jornadas mapeadas na pesquisa. Antes do handoff, testei o protótipo navegável com usuários reais do perfil Marketing pelo Maze — a rodada de teste revelou gaps pontuais na home contextual, que corrigi antes da entrega final.

<div class="before-after" style="--stages: 3; grid-template-columns: repeat(3, max-content); justify-content: center; gap: 24px;">
  <figure>
    <div class="phone-frame"><img src="/cases/arezzo-ad-management/arezzo_marketing_maze_1.png" alt="Teste de usabilidade no Maze — Home do Marketing com Novos Anúncios, Anúncios Ativos e painel de Investido/Provisionado/Restante"></div>
    <figcaption>Teste Maze — Home</figcaption>
  </figure>
  <figure>
    <div class="phone-frame"><img src="/cases/arezzo-ad-management/arezzo_marketing_maze_2.png" alt="Teste de usabilidade no Maze — Aprovações de Anúncios com status Novo, Aprovado e Reprovado"></div>
    <figcaption>Teste Maze — Aprovações</figcaption>
  </figure>
  <figure>
    <div class="phone-frame"><img src="/cases/arezzo-ad-management/arezzo_marketing_maze_3.png" alt="Teste de usabilidade no Maze — Visão Geral com impressões, engajamento, cliques, conversas e vendas"></div>
    <figcaption>Teste Maze — Visão Geral</figcaption>
  </figure>
</div>

O aprendizado que fica pra próximos projetos é sobre o custo real de arquitetura por papel: três fluxos significam três superfícies pra manter consistentes conforme o produto evolui, três lugares pra replicar qualquer ajuste de identidade visual ou regra de negócio. Compensa quando os papéis são genuinamente mutuamente exclusivos — e essa confirmação veio de entrevista real com cada perfil, não de suposição de quem desenha.

Entrar via parceria de tecnologia trouxe uma disciplina de handoff que vale registrar: documentar cada fluxo com o Job to be Done que o originou, os wireframes anotados e os modais de erro especificados à parte garantiu que a equipe da empresa parceira desse sequência ao projeto de forma autônoma — a marca de um handoff bem-feito é o projeto continuar de pé sem o designer por perto.
