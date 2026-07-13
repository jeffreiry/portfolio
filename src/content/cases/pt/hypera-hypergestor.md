---
title: "Hypera Pharma · HYPERGESTOR"
slug: hypera-hypergestor
role: "UX Designer · UI Designer"
summary: "Uma ferramenta de gestão de verbas de trade que substitui planilhas por um pipeline com rastreabilidade de aprovações."
company: "Hypera Pharma (via ilegra)"
year: 2023
cover: /cases/hypera-hypergestor/visao-geral.jpg
bgImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#f3e5f5"
tags: ["Enterprise", "Design System"]
featured: false
draft: false
order: 6
---

## Do orçamento à comprovação: como transformei o ciclo de verbas de trade marketing da Hypera Pharma em um pipeline rastreável

**TL;DR** — UX e UI Designer, 2 meses. Criação do HYPERGESTOR, sistema interno de gerenciamento de orçamentos e verbas para ações de trade marketing da Hypera Pharma — centralizando em um único pipeline o fluxo que ia de planilhas e e-mails até a comprovação com integração SAP/SEV.

**Tags:** Enterprise · Trade marketing · Finops · Design de sistema · B2B · Figma

---

## Contexto & Problema

A Hypera Pharma gerencia investimentos em trade marketing em larga escala — verbas que partem de orçamentos corporativos, são distribuídas por hierarquia de vendas (região → escritório → equipe → supervisor → vendedor) e precisam ser comprovadas com evidências para integrarem o SAP. Sem um sistema centralizado, cada etapa desse ciclo acontecia de forma isolada: a criação de orçamentos era manual, a distribuição de verbas dependia de e-mails entre as áreas, e a comprovação de investimentos era feita por fora, sem rastreabilidade.

Entrei como UX e UI Designer responsável pelo design completo do HYPERGESTOR — mapeando as jornadas de cada perfil de usuário envolvido no ciclo, definindo a arquitetura de informação, projetando todas as interfaces e protótipos em Figma e trabalhando em colaboração com a equipe de desenvolvimento no Azure ao longo de 2 meses. O design precisava respeitar as diretrizes de marca da Hypera Pharma.

Três restrições moldaram o trabalho: a hierarquia de verbas em cascata (orçamentos primários → secundários → múltiplos níveis da hierarquia de vendas) precisava ser representada sem criar confusão; a integração SAP/SEV exigia um gate explícito antes de liberar dados para o SAP, para evitar erros com impacto financeiro real; e 2 meses de prazo cobriram mapear, projetar e prototipar um sistema com múltiplos módulos e perfis.

**Estado anterior:** ciclo de trade marketing sem visibilidade de ponta a ponta — a governança existia no papel, mas não no sistema.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Pipeline unificado</strong>
  <span>Orçamento → Verba → Distribuição → Apuração com comprovação e gate SAP/SEV</span>
</div>

---

## Descoberta & Insight

O mapeamento das jornadas revelou que o problema não era nenhuma etapa em isolado — era a **ausência de um ciclo conectado**. Orçamento era criado em um lugar, verba alocada em outro, distribuição comunicada por e-mail e comprovação feita com evidências soltas sem vinculação ao planejamento original. O resultado: ninguém tinha visibilidade completa de como o investimento de trade marketing havia sido planejado, distribuído e executado.

**A virada:** o HYPERGESTOR não precisava ser uma coleção de formulários. Precisava ser um **pipeline** — cada etapa alimentando a próxima, com rastreabilidade de ponta a ponta do orçamento até a comprovação com evidências.

---

## Processo & Decisões

A decisão que mais pesou foi o checkpoint de liberação para o SAP. O produto ficaria mais rápido e menos friccionado sem aquele gate de confirmação. E quanto mais fricção você coloca, maior o risco de resistência na adoção. A dúvida era: que nível de deliberação é design, e que nível é obstáculo?

**1. Modal vs. página dedicada para criação — problema:** os fluxos de cadastro (orçamento, verba, distribuição) tinham muitos campos e sub-objetos; abrir em página nova perdia o contexto da listagem. **Opções:** navegação para página dedicada (mais espaço, perde contexto) vs. modal sobre a listagem (mantém contexto, exige scroll interno). **Escolha:** modal persistente sobre a listagem para todas as operações de criação e edição. **Porquê:** o usuário frequentemente precisa consultar outras verbas da lista enquanto cria uma nova — o modal permite isso sem navegação adicional.

**2. Hierarquia de distribuição dentro do mesmo modal — problema:** um orçamento pode ter múltiplos sub-orçamentos, cada um com sua própria hierarquia de vendas. Exibir isso em etapas separadas fragmentaria o fluxo. **Opções:** wizard multi-etapa (uma tela por nível) vs. accordion inline dentro do mesmo modal. **Escolha:** accordion expansível dentro do modal de cadastro — cada distribuição pode ser expandida para mostrar sua hierarquia completa (Região → Escritório → Equipe → Supervisor), com ações de "Editar" e "Copiar Distribuição" sem sair do contexto. **Porquê:** o usuário precisa ver e comparar distribuições simultâneas; o accordion mantém tudo acessível sem forçar navegação entre telas.

**3. Distribuição Sugerida com "Copiar"** — o fluxo de criação de distribuição era longo. Campos de hierarquia em cascata, valores por nível, supervisor responsável. Quando entrei em campo com os gestores de trade, a primeira coisa que todos disseram foi variações da mesma frase: "eu copio do mês passado e ajusto."

Isso não era preguiça — era o padrão real de trabalho. Coloquei uma seção "Distribuição Sugerida" no modal mostrando a última distribuição relevante e um botão "Copiar Distribuição" que pré-preenchia o formulário inteiro. O fluxo de criação ficou da metade para o caso comum. O fluxo do caso excepcional ficou exatamente igual.

**4. Checkpoint de integração SAP/SEV — problema:** a comprovação de verbas alimenta diretamente o SAP; um dado incorreto ou incompleto nessa etapa tem impacto financeiro real. **Opções:** integração automática ao salvar (mais ágil, menos controle) vs. gate explícito com confirmação manual antes da liberação. **Escolha:** campo "Pode ser liberada para aprovação da integração?" com padrão "Não" — o usuário precisa marcar "Sim" conscientemente para liberar a verba para o SAP. Campo "Haverá mais comprovação?" permite indicar que a apuração ainda não está completa sem bloquear o salvamento parcial. **Porquê:** em sistemas com integração financeira, um erro de liberação pode gerar inconsistência entre o sistema interno e o ERP — o gate de confirmação cria um momento deliberado de revisão antes do ponto de não retorno.

Pipeline de design: benchmarking + mapeamento de jornadas por perfil → arquitetura de informação → wireframes Figma → validações internas → interfaces finais → protótipo navegável → handoff para desenvolvimento (Azure). O mapeamento de jornada por perfil foi a etapa que definiu quais módulos existiam e como se conectavam — sem ele, o risco era construir telas desconexas em vez de um ciclo.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Modal de distribuição</strong>
  <span>Accordion com hierarquia de vendas + "Distribuição Sugerida" + gate de liberação SAP</span>
</div>

---

## Solução & Craft

O HYPERGESTOR centraliza o ciclo completo de trade marketing em quatro módulos conectados:

- **Cadastro de Orçamentos** — criação de orçamentos primários e secundários com hierarquia organizacional, datas de vigência e flag de redistribuição. Sub-distribuições configuráveis por hierarquia de vendas.
- **Cadastro de Verbas** — alocação de verbas a partir de orçamentos existentes, com distribuição por vendedor, classificação de verba e hierarquia de produtos opcional.
- **Distribuição de Verbas** — refinamento da distribuição por nível de hierarquia de vendas (Região → Escritório → Equipe → Supervisor), com sugestão automática e ação de copiar.
- **Apuração e Comprovação** — registro do valor apurado, upload de evidências (xlsx, txt, pdf, jpeg), controle de comprovações parciais e gate de liberação para integração SAP/SEV.

- O **breadcrumb** no topo de cada tela orienta o usuário dentro da hierarquia do sistema sem depender da memória de onde ele está.
- O **ícone de clipe com badge numérico** na coluna de Anexos comunica a presença de evidências sem precisar abrir o item — decisão de velocidade de scan.
- O **campo "Valor apurado"** na comprovação é separado do "Valor Planejado" exibido em modo somente leitura — o usuário vê o planejado enquanto preenche o apurado, criando a comparação no mesmo contexto.
- O campo **"Permite distribuir"** no cadastro de orçamento é um checkbox inline ao lado do valor — conecta visualmente a permissão ao valor ao qual se aplica.
- O **badge numérico** no ícone de clipe comunica a presença de evidências via dois canais — ícone + número — sem depender de cor; usuários de leitor de tela ou com daltonismo recebem a mesma informação (WCAG 1.4.1).

---

## Aprendizados

Entreguei o sistema completo com os quatro módulos e interfaces para cada perfil. Mas o projeto terminou antes de eu conseguir medir qualquer coisa pós-lançamento — ciclo de comprovação, erros de integração SAP, satisfação.

O que eu queria ter feito: uma sessão de teste de usabilidade com o fluxo de distribuição antes do handoff. Os accordions aninhados e a hierarquia de vendas em cascata são a parte mais densa do sistema. Validei o modelo via mapeamento de jornada e benchmarking — mas não sentei com um gestor real para ver se ele conseguia criar uma distribuição pela primeira vez sem ajuda. Em sistemas financeiros, esse é o momento que importa.

Sistemas financeiros internos têm um trade-off específico entre agilidade e controle: tornar tudo rápido demais remove as salvaguardas que o processo exige; tornar tudo deliberado demais cria resistência de adoção. O gate de liberação para o SAP é o exemplo mais claro desse trade-off no projeto — e a decisão de mantê-lo como confirmação explícita (não automático) foi a certa.

O que fico pensando: o usuário que vai usar esse sistema todos os dias vai sentir esse gate como proteção ou como burocracia? Não sei a resposta. Mas é a pergunta certa, e é o tipo de coisa que só se descobre depois que o produto está nas mãos de quem realmente precisa dele.
