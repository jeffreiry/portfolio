---
title: "Hypera Pharma · Gerenciador de Verbas"
slug: hypera-hypergestor
role: "UX Designer · UI Designer"
summary: "Uma ferramenta de gestão de verbas de trade que substitui planilhas por um pipeline com rastreabilidade de aprovações."
thesis: "Não faltava nenhuma etapa no processo de verbas — faltava um ciclo conectado entre elas."
company: "Hypera Pharma (via ilegra)"
year: 2023
cover: /cases/hypera-hypergestor/visao-geral.jpg
bgImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#f3e5f5"
template: brand-split
tags: ["Enterprise", "Design System"]
scope: ["Mapeamento de jornadas", "Arquitetura de informação", "Interfaces e protótipos Figma"]
duration: "2 meses"
metrics:
  - label: "Perfis de usuário mapeados"
    value: "6"
  - label: "Fluxos de atividades"
    value: "5"
  - label: "da marca aplicado"
    value: "Design System"
featured: false
draft: false
order: 6
---

## Do orçamento à comprovação: como transformei o ciclo de verbas de trade marketing da Hypera Pharma em um pipeline rastreável

**Resumo** — UX e UI Designer, 2 meses. Criação do Gerenciador de Verbas, sistema interno de gerenciamento de orçamentos e verbas para ações de trade marketing da Hypera Pharma — centralizando em um único pipeline o fluxo que ia de planilhas e e-mails até a comprovação com integração SAP/SEV.

---

## Contexto & Problema

A Hypera Pharma gerenciava investimentos em trade marketing em larga escala — verbas que partiam de orçamentos corporativos, eram distribuídas por hierarquia de vendas (região → escritório → equipe → supervisor → vendedor) e precisavam ser comprovadas com evidências para integrarem o SAP. Sem um sistema centralizado, cada etapa desse ciclo acontecia de forma isolada: a criação de orçamentos era manual, a distribuição de verbas dependia de e-mails entre as áreas, e a comprovação de investimentos era feita por fora, sem rastreabilidade.

Entrei como UX e UI Designer responsável pelo design completo do Gerenciador de Verbas — mapeando as jornadas de cada perfil de usuário envolvido no ciclo, definindo a arquitetura de informação, projetando todas as interfaces e protótipos em Figma e trabalhando em colaboração com a equipe de desenvolvimento no Azure ao longo de 2 meses. O design precisava respeitar as diretrizes de marca da Hypera Pharma.

Três restrições moldaram o trabalho: a hierarquia de verbas em cascata (orçamentos primários → secundários → múltiplos níveis da hierarquia de vendas) precisava ser representada sem criar confusão; a integração SAP/SEV exigia um gate explícito antes de liberar dados para o SAP, para evitar erros com impacto financeiro real; e 2 meses de prazo cobriram mapear, projetar e prototipar um sistema com múltiplos módulos e perfis.

Do escopo mapeado nesses 2 meses, três módulos chegaram a ser de fato construídos nesse ciclo — Cadastro de Empresa, Apuração e Comprovação de Verbas e Aprovação de Integração com o SAP. Parametrização, login/SSO e relatórios ficaram mapeados, mas fora do build inicial.

**Estado anterior:** planilhas distribuídas pela companhia, sem visibilidade de ponta a ponta do ciclo de trade marketing.

<figure>
  <img src="/cases/hypera-hypergestor/hypergestor_matriz-card-pt.png" alt="Matriz de responsabilidades — 14 ações e 6 perfis (Administrador, Diretor, Gerente, Supervisor, Planejador BU, Key User), com o Gerente concentrando 6 das 14 ações mapeadas no fluxo de aprovação de verbas">
  <figcaption>Reconstrução do mapeamento de papéis do fluxo de aprovação de verbas</figcaption>
</figure>

<!--metrics-here-->

---

## Descoberta & Insight

O mapeamento das jornadas revelou que o problema não era nenhuma etapa em isolado — era a **ausência de um ciclo conectado**. Orçamento era criado em um lugar, verba alocada em outro, distribuição comunicada por e-mail e comprovação feita com evidências soltas sem vinculação ao planejamento original. O resultado: ninguém tinha visibilidade completa de como o investimento de trade marketing havia sido planejado, distribuído e executado.

**A virada:** o Gerenciador de Verbas não precisava ser uma coleção de formulários. Precisava ser um **pipeline** — cada etapa alimentando a próxima, com rastreabilidade de ponta a ponta do orçamento até a comprovação com evidências.

Cruzar os 6 perfis com as 4 metas do produto (configurar a base, planejar e distribuir orçamento, aprovar e controlar o uso das verbas, apurar/comprovar/integrar pagamentos) foi o que revelou quais features cada perfil realmente precisava — e quais combinações perfil × meta simplesmente não existiam:

<figure>
  <img src="/cases/hypera-hypergestor/hypergestor_descoberta-de-features-pt.png" alt="Matriz de descoberta de features — 6 perfis (Administrador, Diretor, Gerente, Supervisor, Planejador BU, Key User) cruzados com 4 metas do produto (Configurar e manter a base do sistema, Planejar e distribuir orçamento, Aprovar e controlar o uso das verbas, Apurar/comprovar/integrar pagamentos), com as features descobertas em cada combinação">
  <figcaption>Descoberta de features — perfis × metas do produto</figcaption>
</figure>

---

## Processo & Decisões

A decisão que mais pesou foi o checkpoint de liberação para o SAP. O produto ficaria mais rápido e menos friccionado sem aquele gate de confirmação. E quanto mais fricção você coloca, maior o risco de resistência na adoção. A dúvida era: que nível de deliberação é design, e que nível é obstáculo?

**1. Modal vs. página dedicada para cadastro de empresa — problema:** o cadastro de empresa (distribuidor, farmácia, etc.) tinha muitos campos — ID, SAP_ID, CRM_ID, CNPJ, status, tipo, endereço; abrir em página nova perdia o contexto da listagem. **Opções:** navegação para página dedicada (mais espaço, perde contexto) vs. modal sobre a listagem (mantém contexto, exige scroll interno). **Escolha:** modal persistente sobre a listagem para criação e edição. **Porquê:** o usuário frequentemente precisava consultar outras empresas da lista enquanto cadastrava uma nova — o modal permitia isso sem navegação adicional.

<figure>
  <img src="/cases/hypera-hypergestor/hypergestor_cadastro.png" alt="Modal de Cadastro de Empresa sobre a listagem — campos ID, SAP_ID, CRM_ID, CNPJ, Status, Tipo Empresa (Farmácia) e endereço, com a tabela de empresas visível ao fundo">
  <figcaption>Cadastro de Empresa — modal sobre a listagem</figcaption>
</figure>

**2. Checkpoint de integração SAP/SEV — problema:** a comprovação de verbas alimentava diretamente o SAP; um dado incorreto ou incompleto nessa etapa tinha impacto financeiro real. **Opções:** integração automática ao salvar (mais ágil, menos controle) vs. gate explícito com confirmação manual antes da liberação. **Escolha:** campo "Pode ser liberada para aprovação da integração?" com padrão "Não" — o usuário precisava marcar "Sim" conscientemente para liberar a verba para o SAP. Campo "Haverá mais comprovação?" permitia indicar que a apuração ainda não estava completa sem bloquear o salvamento parcial. **Porquê:** em sistemas com integração financeira, um erro de liberação podia gerar inconsistência entre o sistema interno e o ERP — o gate de confirmação criava um momento deliberado de revisão antes do ponto de não retorno.

<figure>
  <img src="/cases/hypera-hypergestor/hypergestor_apurar-comprovar.png" alt="Modal Apurar e Comprovar Verbas — Valor Planejado somente leitura ao lado do campo Valor apurado, upload de evidências, e o toggle 'Pode ser liberada para aprovação da integração?' com padrão Não">
  <figcaption>Apurar e Comprovar Verbas — o checkpoint de liberação para o SAP</figcaption>
</figure>

Depois de liberada, a verba entrava numa fila de revisão própria antes de integrar o SAP de fato:

<figure>
  <img src="/cases/hypera-hypergestor/hypergestor_integracao-sap.png" alt="Tela Aprovação de integração com SAP — listagem com Unidade de Negócio, Região, Escritório, Equipe, Cliente, Marca, Produto, Status (Pendente / Pendente de nova aprovação) e ações de aprovar ou rejeitar">
  <figcaption>Aprovação de Integração com o SAP</figcaption>
</figure>

Pipeline de design: benchmarking + mapeamento de jornadas por perfil → arquitetura de informação → wireframes Figma → validações internas → interfaces finais → protótipo navegável → handoff para desenvolvimento (Azure). O mapeamento de jornada por perfil foi a etapa que definiu quais módulos existiam e como se conectavam — sem ele, o risco era construir telas desconexas em vez de um ciclo.

<figure>
  <img src="/cases/hypera-hypergestor/hypergestor_fluxo-usuario.png" alt="Fluxo de usuário em 6 etapas — Home, Dados Mestres, Dashboards, Orçamento, Verba e Distribuição">
  <figcaption>Fluxo de usuário — navegação completa mapeada (parte dela fora do escopo entregue neste ciclo)</figcaption>
</figure>

---

## Solução & Craft

Do ciclo completo mapeado — orçamento, distribuição em cascata, apuração e integração — três módulos chegaram a produção nesse ciclo de 2 meses:

- **Cadastro de Empresa** — CRUD de empresas (Distribuidor, Farmácia, etc.), com campos de identificação (ID, SAP_ID, CRM_ID, CNPJ), status, tipo e endereço.
- **Apuração e Comprovação de Verbas** — registro do valor apurado, upload de evidências (xlsx, txt, pdf, jpeg) e gate de liberação para integração SAP/SEV.
- **Aprovação de Integração com o SAP** — etapa final de aprovação ou rejeição de cada verba antes da integração de fato com o SAP.

- O **breadcrumb** no topo de cada tela orientava o usuário dentro da hierarquia do sistema sem depender da memória de onde ele estava.
- O **ícone de clipe com badge numérico** na coluna de Anexos comunicava a presença de evidências sem precisar abrir o item — decisão de velocidade de scan.
- O **campo "Valor apurado"** na comprovação era separado do "Valor Planejado" exibido em modo somente leitura — o usuário via o planejado enquanto preenchia o apurado, criando a comparação no mesmo contexto.
- O **badge numérico** no ícone de clipe comunicava a presença de evidências via dois canais — ícone + número — sem depender de cor; usuários de leitor de tela ou com daltonismo recebiam a mesma informação (WCAG 1.4.1).

---

## Aprendizados

<div class="dual-cards">
  <div class="dual-card dual-card--teal">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L3 10.5l7.5 3L13.5 21 21 3z"/></svg>
    <span class="dual-card-label">Desafios do Projeto</span>
    <p>O maior desafio foi transformar <strong>planilhas dispersas</strong> por toda a companhia em um <strong>sistema único e coerente</strong>. Cada área tinha sua própria forma de registrar orçamento, verba e comprovação. Unificar isso exigiu entender cada planilha antes de desenhar qualquer tela.</p>
  </div>
  <div class="dual-card dual-card--blue">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    <span class="dual-card-label">Lições Aprendidas</span>
    <p>Trabalhar com um <strong>sistema corporativo integrado ao SAP</strong> me ensinou que <strong>funcional</strong> e <strong>amigável</strong> não competem — precisam coexistir. Cada campo tinha peso financeiro real, e a interface precisava guiar sem parecer burocrática. Equilibrar controle e usabilidade foi a lição mais constante.</p>
  </div>
</div>

Entreguei três módulos do ciclo mapeado — Cadastro de Empresa, Apuração e Comprovação de Verbas e Aprovação de Integração com o SAP — a fatia que efetivamente chegou a produção nesses 2 meses, de um sistema desenhado para cobrir orçamento, distribuição de verbas e aprovações em cascata de ponta a ponta. Mas o projeto terminou antes de eu conseguir medir qualquer coisa pós-lançamento — ciclo de comprovação, erros de integração SAP, satisfação.

O que eu queria ter feito: uma sessão de teste de usabilidade com o fluxo de apuração e comprovação antes do handoff, em especial o campo de liberação para o SAP — é o ponto de maior risco financeiro do sistema. Validei o modelo via mapeamento de jornada e benchmarking — mas não sentei com um gestor real para ver se ele preencheria aquele campo com confiança na primeira vez. Em sistemas financeiros, esse é o momento que importa.

Sistemas financeiros internos têm um trade-off específico entre agilidade e controle: tornar tudo rápido demais remove as salvaguardas que o processo exige; tornar tudo deliberado demais cria resistência de adoção. O gate de liberação para o SAP é o exemplo mais claro desse trade-off no projeto — e a decisão de mantê-lo como confirmação explícita (não automático) foi a certa.

O que fico pensando: o usuário que vai usar esse sistema todos os dias vai sentir esse gate como proteção ou como burocracia? Não sei — e isso não é algo que um teste de usabilidade revela com clareza. Queria ter gravações de sessão quatro meses depois do lançamento, para ver quanto tempo as pessoas pausam naquele campo antes de clicar em Sim.
