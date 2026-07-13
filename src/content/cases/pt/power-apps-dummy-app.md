---
title: "Power Apps · Aplicativo de Demonstração"
slug: power-apps-dummy-app
role: "UX Designer · Design Systems, 2025"
summary: "Um app mobile de referência que demonstra o Design System da empresa em funcionamento real."
company: "Grande empresa industrial (confidencial)"
year: 2025
bgImage: "https://images.unsplash.com/photo-1570101945621-945409a6370f?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#e8f0fe"
tags: ["Enterprise", "Design System", "Mobile"]
metrics:
  - label: "Plataforma"
    value: "Power Apps"
  - label: "Escopo"
    value: "+10 componentes"
  - label: "Alcance"
    value: "Toda a organização"
featured: false
draft: false
order: 5
---

## Do componente ao produto: tornando o Design System real no Power Apps

**TL;DR** — UX Designer no Design Chapter, 2025. Projetei e construí um aplicativo de referência funcional dentro do Microsoft Power Apps para apresentar os componentes mobile do Design System da empresa. O app foi publicado como template, adotado em toda a organização e utilizado como base para pelo menos um produto em produção.

---

## Contexto & Problema

O Design Chapter da empresa havia criado uma biblioteca de componentes para aplicativos mobile desenvolvidos no Microsoft Power Apps — plataforma usada em toda a organização para ferramentas internas em low-code. O problema: os componentes existiam de forma isolada. Designers e desenvolvedores não tinham uma referência prática de como eles se comportavam em conjunto, como se compunham em fluxos reais ou como deveriam ser aplicados em um produto completo.

O resultado era uma **adoção inconsistente**: equipes não sabiam que os componentes existiam, recriavam padrões de forma independente ou os aplicavam de forma equivocada por falta de contexto.

**Estado anterior:** uma biblioteca de componentes sem referência viva — bem intencionada, mas desconectada da implementação real.

---

## Processo & Decisões

O primeiro passo foi entender quais componentes estavam sendo ativamente utilizados nos produtos Power Apps da organização — revisando aplicativos existentes, identificando padrões de UI recorrentes e priorizando os componentes com maior potencial de reuso. O objetivo não era documentar tudo; era encontrar os **20% de componentes que cobriam 80% dos cenários reais de produto**.

A decisão que mais me preocupou foi o escopo. Um app de demonstração que cobre demais deixa de ser referência e vira sobrecarga. Mas se ele for simples demais, não responde as perguntas reais dos desenvolvedores. O equilíbrio foi encontrado ancorando cada decisão de design em um cenário real de produto — se uma interação não podia ser justificada por um caso de uso realista, era cortada.

Com o inventário de componentes em mãos, a próxima questão foi: que tipo de aplicativo daria o contexto mais significativo a esses componentes? A resposta foi um **produto mobile enterprise padrão** — o tipo que a organização constrói com mais frequência. O Aplicativo de Demonstração foi definido para cobrir o ciclo completo de um fluxo típico de gestão de dados: Onboarding → Home (ponto de entrada estilo dashboard) → Listagem e Detalhes → Criação e Edição → Modais → Páginas complementares (FAQ, informações).

![Tela de CSAT — coleta de satisfação integrada ao app de demonstração](/cases/power-apps-dummy-app/03-csat.png)

Antes de construir, cada componente foi revisado e atualizado para atender às diretrizes do Design System — cobrindo tokens visuais (cor, tipografia, espaçamento), estados de interação e considerações de acessibilidade.

O aplicativo foi construído diretamente no ambiente do Power Apps, não como protótipo no Figma. Essa foi uma escolha deliberada: a referência precisava funcionar dentro das restrições e capacidades da plataforma real. Projetar no Power Apps é fundamentalmente diferente de projetar no Figma — o comportamento dos componentes é orientado por fórmulas, o gerenciamento de estados é explícito e a fronteira entre design e desenvolvimento se torna difusa. Isso criou uma curva de aprendizado, mas também produziu resultados melhores: cada interação no Aplicativo de Demonstração é algo que um desenvolvedor Power Apps real consegue replicar.

![Telas de ações e modais do Power Apps Dummy App](/cases/power-apps-dummy-app/02-actions.png)

Ao longo do desenvolvimento, o aplicativo foi continuamente validado com a equipe de Low-code Platforms — o grupo interno responsável pelo ecossistema Power Apps — para garantir que as interações mais complexas (gerenciamento de estados, comportamentos orientados por fórmulas) fossem tecnicamente sólidas e replicáveis por outras equipes.

Após a validação, o Aplicativo de Demonstração foi documentado com materiais de apoio no SharePoint do Centro de Excelência da organização e publicado como **template no Brand Center**, tornando-o acessível para que qualquer equipe possa copiar e construir em cima.

![Tela de FAQ — conteúdo de suporte contextualizado no app](/cases/power-apps-dummy-app/03-faq.png)

---

## Resultado

O Aplicativo de Demonstração foi publicado como template para toda a organização, acessível a todos os colaboradores que trabalham com Power Apps. Ele serviu como **referência direta para pelo menos um produto em produção**: um aplicativo desenvolvido para uma feira do setor, que utilizou o Dummy App como base de design e componentes.

Além da entrega específica, o projeto estabeleceu um padrão de como o Design Chapter poderia apoiar o desenvolvimento low-code — não apenas criando componentes, mas demonstrando-os em contextos de produto completos e funcionais.

| | |
|---|---|
| Componentes apresentados | +10 |
| Publicado como template org-wide | ✅ |
| Produtos em produção construídos sobre ele | ≥ 1 |
| Colaboradores cross-funcionais | Design Chapter + Low-code Platforms |

---

## Aprendizados

Saber que outra equipe usou o Dummy App como base para um produto em produção foi o momento em que o projeto fez sentido de verdade. O que validou não foi a contagem de componentes nem a documentação do template — foi o fato de alguém ter copiado o app inteiro e entregado um produto real a partir dele. Esse é o teste que uma referência de design system passa ou não passa.

O que faria diferente: teria instrumentado melhor o app de demonstração para entender quais componentes eram copiados com mais frequência. Essa informação teria alimentado a prioridade de evolução da biblioteca melhor do que qualquer reunião de planejamento.
