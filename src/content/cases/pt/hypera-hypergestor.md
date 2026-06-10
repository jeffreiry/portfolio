---
title: "Hypera Pharma · HYPERGESTOR"
slug: hypera-hypergestor
role: "UX Designer · UI Designer"
summary: "Criação do HYPERGESTOR, sistema interno de gerenciamento de verbas de trade marketing da Hypera Pharma — centralizando em um pipeline rastreável o fluxo que ia de planilhas e e-mails até a comprovação com integração SAP."
company: "Hypera Pharma (via ilegra)"
year: 2024
cover: /cases/hypera-hypergestor/visao-geral.jpg
bgImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?fm=jpg&w=1400&q=80&auto=format&fit=crop"
accent: "#f3e5f5"
tags: ["Enterprise", "Trade marketing", "Finops", "Design de sistema", "B2B"]
featured: false
draft: false
order: 7
---

## Do orçamento à comprovação: como transformei o ciclo de verbas de trade marketing da Hypera Pharma em um pipeline rastreável

**TL;DR** — UX e UI Designer, 2 meses. Criação do HYPERGESTOR, sistema interno de gerenciamento de orçamentos e verbas para ações de trade marketing da Hypera Pharma — centralizando em um único pipeline o fluxo que ia de planilhas e e-mails até a comprovação com integração SAP/SEV.

**Tags:** Enterprise · Trade marketing · Finops · Design de sistema · B2B · Figma

---

## Contexto & Problema

A Hypera Pharma gerencia investimentos em trade marketing em larga escala — verbas que partem de orçamentos corporativos, são distribuídas por hierarquia de vendas (região → escritório → equipe → supervisor → vendedor) e precisam ser comprovadas com evidências para integrarem o SAP. Sem um sistema centralizado, cada etapa desse ciclo acontecia de forma isolada: a criação de orçamentos era manual, a distribuição de verbas dependia de e-mails entre as áreas, e a comprovação de investimentos era feita por fora, sem rastreabilidade.

**Estado anterior:** ciclo de trade marketing sem visibilidade de ponta a ponta — a governança existia no papel, mas não no sistema.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Pipeline unificado</strong>
  <span>Orçamento → Verba → Distribuição → Apuração com comprovação e gate SAP/SEV</span>
</div>

---

## Meu papel

UX e UI Designer responsável pelo design completo do HYPERGESTOR: mapeei as jornadas de cada perfil de usuário envolvido no ciclo, defini a arquitetura de informação, projetei todas as interfaces e protótipos em Figma, e trabalhei em colaboração com a equipe de desenvolvimento no Azure. O design precisava respeitar as diretrizes de marca da Hypera Pharma.

---

## Restrições

- **Complexidade de hierarquia** — verbas fluem de orçamentos primários para secundários, depois para distribuições por múltiplos níveis da hierarquia de vendas. O design precisava representar essa cascata sem criar confusão.
- **Integração SAP/SEV** — a comprovação de verbas precisava de um gate explícito antes de liberar dados para o SAP, para evitar erros de integração com impacto financeiro real.
- **2 meses** para mapear, projetar e prototipar um sistema com múltiplos módulos e perfis.

---

## Descoberta & Insight

O mapeamento das jornadas revelou que o problema não era nenhuma etapa em isolado — era a **ausência de um ciclo conectado**. Orçamento era criado em um lugar, verba alocada em outro, distribuição comunicada por e-mail e comprovação feita com evidências soltas sem vinculação ao planejamento original. O resultado: ninguém tinha visibilidade completa de como o investimento de trade marketing havia sido planejado, distribuído e executado.

**A virada:** o HYPERGESTOR não precisava ser uma coleção de formulários. Precisava ser um **pipeline** — cada etapa alimentando a próxima, com rastreabilidade de ponta a ponta do orçamento até a comprovação com evidências.

---

## Processo & Decisões

**1. Modal vs. página dedicada para criação — problema:** os fluxos de cadastro (orçamento, verba, distribuição) tinham muitos campos e sub-objetos; abrir em página nova perdia o contexto da listagem. **Opções:** navegação para página dedicada (mais espaço, perde contexto) vs. modal sobre a listagem (mantém contexto, exige scroll interno). **Escolha:** modal persistente sobre a listagem para todas as operações de criação e edição. **Porquê:** o usuário frequentemente precisa consultar outras verbas da lista enquanto cria uma nova — o modal permite isso sem navegação adicional.

**2. Hierarquia de distribuição dentro do mesmo modal — problema:** um orçamento pode ter múltiplos sub-orçamentos, cada um com sua própria hierarquia de vendas. Exibir isso em etapas separadas fragmentaria o fluxo. **Opções:** wizard multi-etapa (uma tela por nível) vs. accordion inline dentro do mesmo modal. **Escolha:** accordion expansível dentro do modal de cadastro — cada distribuição pode ser expandida para mostrar sua hierarquia completa (Região → Escritório → Equipe → Supervisor), com ações de "Editar" e "Copiar Distribuição" sem sair do contexto. **Porquê:** o usuário precisa ver e comparar distribuições simultâneas; o accordion mantém tudo acessível sem forçar navegação entre telas.

**3. Distribuição Sugerida com "Copiar" — problema:** gestores de trade marketing frequentemente replicam distribuições de períodos anteriores com ajustes mínimos. Criar cada distribuição do zero seria lento e propenso a erro. **Opções:** criação manual completa vs. sugestão automática de distribuição baseada no histórico com opção de copiar e ajustar. **Escolha:** seção "Distribuição Sugerida" no modal de distribuição de verba, mostrando a última distribuição relevante com todos os parâmetros (valor, supervisor, hierarquia de vendas) e um botão "Copiar Distribuição" que pré-preenche o formulário. **Porquê:** a maior parte das distribuições segue o mesmo padrão — o design deve acelerar o caso comum e não tratar todo fluxo como se fosse novo.

**4. Checkpoint de integração SAP/SEV — problema:** a comprovação de verbas alimenta diretamente o SAP; um dado incorreto ou incompleto nessa etapa tem impacto financeiro real. **Opções:** integração automática ao salvar (mais ágil, menos controle) vs. gate explícito com confirmação manual antes da liberação. **Escolha:** campo "Pode ser liberada para aprovação da integração?" com padrão "Não" — o usuário precisa marcar "Sim" conscientemente para liberar a verba para o SAP. Campo "Haverá mais comprovação?" permite indicar que a apuração ainda não está completa sem bloquear o salvamento parcial. **Porquê:** em sistemas com integração financeira, um erro de liberação pode gerar inconsistência entre o sistema interno e o ERP — o gate de confirmação cria um momento deliberado de revisão antes do ponto de não retorno.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Modal de distribuição</strong>
  <span>Accordion com hierarquia de vendas + "Distribuição Sugerida" + gate de liberação SAP</span>
</div>

---

## Solução

O HYPERGESTOR centraliza o ciclo completo de trade marketing em quatro módulos conectados:

- **Cadastro de Orçamentos** — criação de orçamentos primários e secundários com hierarquia organizacional, datas de vigência e flag de redistribuição. Sub-distribuições configuráveis por hierarquia de vendas.
- **Cadastro de Verbas** — alocação de verbas a partir de orçamentos existentes, com distribuição por vendedor, classificação de verba e hierarquia de produtos opcional.
- **Distribuição de Verbas** — refinamento da distribuição por nível de hierarquia de vendas (Região → Escritório → Equipe → Supervisor), com sugestão automática e ação de copiar.
- **Apuração e Comprovação** — registro do valor apurado, upload de evidências (xlsx, txt, pdf, jpeg), controle de comprovações parciais e gate de liberação para integração SAP/SEV.

---

## Craft & Acessibilidade

- O **breadcrumb** (Início / Gestão / Orçamentos; Início / Cadastro / Empresas) no topo de cada tela orienta o usuário dentro da hierarquia do sistema sem depender da memória de onde ele está.
- O **ícone de clipe com badge numérico** na coluna de Anexos da listagem de apuração comunica a presença de evidências sem precisar abrir o item — decisão de velocidade de scan.
- O **campo "Valor apurado"** na comprovação é separado do "Valor Planejado" exibido em modo somente leitura — o usuário vê o planejado enquanto preenche o apurado, criando a comparação no mesmo contexto.
- O campo **"Permite distribuir"** no cadastro de orçamento é um checkbox inline ao lado do valor — decisão que reduz um campo separado e conecta visualmente a permissão ao valor ao qual se aplica.
- ⬜ Decisões de acessibilidade (contraste, navegação por teclado) — preencher.

---

## Colaboração técnica

Pipeline de design: `benchmarking + mapeamento de jornadas por perfil → arquitetura de informação → wireframes Figma → validações internas → interfaces finais → protótipo navegável → handoff para desenvolvimento (Azure)`. O mapeamento de jornada por perfil foi a etapa que definiu quais módulos existiam e como se conectavam — sem ele, o risco era construir telas desconexas em vez de um ciclo.

---

## Impacto

- **Entrega:** sistema completo com módulos de Orçamentos, Verbas, Distribuição e Apuração, com interfaces para cada perfil.
- ⬜ Redução do tempo de ciclo de comprovação de verbas — preencher.
- ⬜ Redução de erros de integração SAP/SEV após implementação do gate de confirmação — preencher.
- ⬜ Satisfação dos usuários com o novo sistema vs. processo anterior — preencher.

---

## Aprendizados

Sistemas financeiros internos têm um trade-off específico entre agilidade e controle: tornar tudo rápido demais remove as salvaguardas que o processo exige; tornar tudo deliberado demais cria resistência de adoção. O gate de liberação para o SAP é o exemplo mais claro desse trade-off no projeto — e a decisão de mantê-lo como confirmação explícita (não automático) foi a certa. **Lição:** em sistemas com integração financeira, o design de fluxo precisa saber onde colocar atrito de propósito — não todo clique deve ser rápido.
