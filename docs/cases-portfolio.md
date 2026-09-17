# Cases · Portfólio de Product Designer Sênior

> **Guia operacional** para transformar projetos (como **Cartela_Cores** e **Painel_Saude**) em cases publicáveis de portfólio Sênior, em PT-BR e EN.
>
> Idioma do guia: PT-BR · Cases redigidos em PT e EN · Output: Markdown limpo para site próprio.

---

## ✅ Revisão de voz concluída (2026-06-11)

Todos os 9 cases (18 arquivos PT+EN) reescritos. Diagnóstico original e detalhes em [docs/roadmap.md](roadmap.md).

**O que foi resolvido:**
- AI tells removidos em todos os cases (Enterprise AI tinha 5 frases literais do guia)
- Dúvida expressa adicionada em todos os 9 cases (rule 2)
- Pelo menos 1 decisão por case em formato narrativo, não P→O→C→W (rule 3)
- Impact sections vazias (`⬜`) substituídas por "O que eu faria diferente" (rule 7)
- Endings pessoais em todos os cases (rule 8)
- Anos e ordem dos cards corrigidos no frontmatter

**Pendências de conteúdo — por criticidade (bench 2026-06-12 · 11 vagas · score médio 60%):**

- 🔴 **Artefatos visíveis** (11/11 vagas) — todos os cases descrevem processo sem expor telas, flows ou wireframes; recrutadores não conseguem avaliar craft sem ver os artefatos
- 🔴 **Métricas de impacto** (`⬜`) (11/11 vagas) — Enterprise AI, Shipping, Arezzo, Hypera; preencher com dados reais ou substituir os campos por "O que eu faria diferente"
- 🟠 **Acessibilidade documentada** (`⬜`) (8/11 vagas) — Enterprise AI e Shipping têm seção Craft vazia; Cartela Cores tem a decisão certa (score multicanal = WCAG 1.4.1), replicar o raciocínio nos enterprise cases
- 🟡 **Mobile como plataforma** (4/11 vagas) — Arezzo tem tag "Mobile" mas sem narrativa de decisões de design mobile na seção Processo
- 🟡 **Mentoria/liderança** (2/11 vagas) — não aparece em nenhum case; se houver histórico (onboarding, revisões de design, apresentações), documentar em pelo menos 1 case
- Stack técnica da plataforma (`⬜`) — Shipping e Enterprise AI, preencher se aplicável

---

## Índice

1. [Como usar este guia](#1-como-usar-este-guia)
2. [A régua de um case Sênior](#2-a-régua-de-um-case-sênior)
3. [Template-mestre do case](#3-template-mestre-do-case)
4. [Princípios de narrativa](#4-princípios-de-narrativa)
   - 4.1 [Voz humana — como evitar escrita que parece IA](#41-voz-humana--como-evitar-escrita-que-parece-ia)
   - 4.2 [Imagens e texto — consistência visual-narrativa](#42-imagens-e-texto--consistência-visual-narrativa)
5. [Checklist de assets](#5-checklist-de-assets)
6. [Fluxo de atualização](#6-fluxo-de-atualização)
7. [Checklist de publicação](#7-checklist-de-publicação)
8. [Implementação no site (Astro)](#8-implementação-no-site-astro)
9. [Case — Cartela_Cores (PT)](#9-case--cartela_cores-pt)
10. [Case — Cartela_Cores (EN)](#10-case--cartela_cores-en)
11. [Case — Painel Saúde (PT)](#11-case--painel-saúde-pt)
12. [Case — Painel Saúde (EN)](#12-case--painel-saúde-en)
13. [Case — Enterprise AI Knowledge Assistant (PT)](#13-case--enterprise-ai-knowledge-assistant-pt)
14. [Case — Enterprise AI Knowledge Assistant (EN)](#14-case--enterprise-ai-knowledge-assistant-en)
15. [Case — Shipping Capacity Optimization Platform (PT)](#15-case--shipping-capacity-optimization-platform-pt)
16. [Case — Shipping Capacity Optimization Platform (EN)](#16-case--shipping-capacity-optimization-platform-en)
17. [Case — Arezzo&Co · Sistema de Anúncios em Redes Sociais (PT)](#17-case--arezzoco--sistema-de-anúncios-em-redes-sociais-pt)
18. [Case — Arezzo&Co · Social Media Ad Management System (EN)](#18-case--arezzoco--social-media-ad-management-system-en)
19. [Case — Del Valle · Redesign de Site (PT)](#19-case--del-valle--redesign-de-site-pt)
20. [Case — Del Valle · Website Redesign (EN)](#20-case--del-valle--website-redesign-en)
21. [Case — Hypera Pharma · Gerenciador de Verbas (PT)](#21-case--hypera-pharma--gerenciador-de-verbas-pt)
22. [Case — Hypera Pharma · Gerenciador de Verbas (EN)](#22-case--hypera-pharma--gerenciador-de-verbas-en)
23. [Case — Del Valle Kapo · Redesign de Site (PT)](#23-case--del-valle-kapo--redesign-de-site-pt)
24. [Case — Del Valle Kapo · Website Redesign (EN)](#24-case--del-valle-kapo--website-redesign-en)

---

## 1. Como usar este guia

**Objetivo:** levar um projeto do estado "bruto" (código + docs internos) até um case que comunica maturidade de Product Designer Sênior.

**Fluxo:**

```
Projeto bruto (código, CHANGELOG, decisões)
   → mapear no Template-mestre (seção 3)
   → preencher lacunas marcadas com ⬜
   → revisar contra a Régua Sênior (seção 2)
   → adicionar assets (seção 5)
   → checklist de publicação (seção 7)
   → colar no site (PT e/ou EN)
```

**Convenções deste arquivo:**

- `⬜` = lacuna a preencher (métrica, screenshot, depoimento). Funciona como TODO rastreável.
- Cada case existe em duas versões espelhadas: **(PT)** e **(EN)**. Edite as duas juntas.
- O texto dos cases é Markdown puro — copie a seção inteira para o site sem retrabalho.

---

## 2. A régua de um case Sênior

O que diferencia um case **Sênior** de um Pleno não é a quantidade de telas, é a evidência de julgamento. Avaliadores procuram:

| Critério | Pergunta que o case precisa responder | Sinal de senioridade |
|---|---|---|
| **Pensamento estratégico** | Por que este problema importava? Para quem? | Conecta a decisão ao impacto, não só à estética |
| **Ownership** | O que **você** fez, especificamente? | Usa "eu decidi", não "nós fizemos" genérico |
| **Trade-offs** | Quais alternativas você considerou e **descartou**? | Mostra o caminho não tomado e o porquê |
| **System thinking** | A solução é um sistema (regras, componentes) ou telas soltas? | Define regras, tokens, critérios explícitos |
| **Colaboração técnica** | Você entende a viabilidade do que desenha? | Discute arquitetura, limites de API, performance |
| **Impacto** | O que mudou depois? | Métrica honesta > adjetivo vago |
| **Maturidade** | O que falhou? O que faria diferente? | Reconhece limites do próprio trabalho |

> **Regra de ouro:** para cada decisão importante, mostre o **problema → as opções → a escolha → o porquê**. Decisão sem alternativa visível parece sorte; decisão com trade-off explícito parece julgamento.

**Adaptação por vaga:** antes de aplicar, ajuste a ênfase do case.
- Vaga de **Design System** → destaque tokens, componentes, critérios reutilizáveis (ex: regra "coringa", paleta âncora).
- Vaga de **Data/Analytics product** → destaque arquitetura de dados e projeção (ex: Riegel, sync automático).
- Vaga de **0→1 / generalista** → destaque o end-to-end (pesquisa → produção).

---

## 3. Template-mestre do case

**6 seções.** Estrutura única para qualquer projeto. Rótulos em PT (EN). Preencha cada bloco; corte os que não se aplicam.

> **Por que 6 e não 11?** Cases com My Role, Constraints, Technical Collaboration e What I'd Do Differently como seções separadas fragmentam o que é o mesmo assunto. Recrutadores leem em 2–5 min — cada salto de título é atrito. A estrutura abaixo preserva todo o conteúdo relevante dentro de seções que têm coesão real.

### Cabeçalho / Header
- **H2 de tese** — uma frase que nomeia a tensão central ou o resultado inesperado do projeto
- **TL;DR** — papel, período, desafio central em 1–2 frases

### Contexto & Problema / Context & Problem
- Espaço do problema: para quem, por que importa agora
- Estado anterior (a dor concreta)
- **Seu papel integrado:** quem você era neste projeto, o que liderou, com quem colaborou, por quanto tempo
- **Restrições integradas:** as que moldaram as decisões (técnicas, de tempo, de público) — não como lista separada, mas como parte da narrativa do problema

### Descoberta & Insight / Discovery & Insight
- O insight central que destrava a solução (a "virada")
- O que você viu ou ouviu que mudou o entendimento do problema

### Processo & Decisões / Process & Decisions
- 3 a 5 decisões-chave — veja seção 4.1 para como escrever sem soar como IA
- Inclua o que foi descartado e por quê
- **Pipeline técnico integrado ao final:** ferramentas, sequência do processo, como o engineering validation funcionou — em 2–3 frases, não como seção separada

### Solução & Craft / Solution & Craft
- Os fluxos/áreas principais e como funcionam
- Detalhes de interação, edge cases, decisões de acessibilidade — integrados à descrição da solução, não em bullets separados

### Aprendizados / Learnings
- O que você **não conseguiu medir ou provar** — a incerteza honesta do projeto
- O que faria diferente
- A lição que é específica a este projeto (não uma máxima genérica)

---

## 4. Princípios de narrativa

1. **Arco, não inventário.** Conte uma história (tensão → virada → resolução), não uma lista de features.
2. **Mostre, não conte.** "Reduzi a fricção" é fraco. "Transformei um julgamento subjetivo em um score com 4.8% de erro vs. avaliação manual" é forte.
3. **Métrica honesta em projeto pessoal.** Sem usuários? Use métricas do próprio sistema (precisão do algoritmo, cobertura, autonomia operacional) e seja transparente sobre o que é pessoal.
4. **Uma ideia por bloco.** Cada parágrafo/imagem carrega uma ideia.
5. **Hierarquia de visuais:** capa (1) → antes/depois (1) → fluxo principal (1-2) → diagrama de sistema (1) → detalhes de craft (2-3).
6. **Primeira pessoa com ownership.** "Eu decidi", "Eu descartei X porque...".

---

## 4.1 Voz humana — como evitar escrita que parece IA

Textos de case gerados ou revisados por IA tendem a ter os mesmos marcadores. Reconheça e quebre cada um:

### Marcadores de IA e como quebrá-los

**1. Fórmula uniforme em cada decisão**
> Sinal: Problema → Opções → Escolha → Porquê × N, com o mesmo peso e extensão para cada decisão.

Quebre atribuindo peso proporcional à dificuldade real. A decisão mais difícil merece mais espaço e mais honestidade. A mais óbvia pode ser uma frase. Misture formatos: uma decisão como narrativa, outra como constatação direta, outra como tensão não resolvida.

**2. Incerteza performada no mesmo lugar estrutural**
> Sinal: "De todas as decisões deste projeto, a que eu estava menos certo foi X" — a frase de abertura da seção, sempre no mesmo tom, sempre resolvida ao final do parágrafo.

A incerteza real não tem timing certo. Pode aparecer no meio de uma seção, pode não se resolver. "O que ainda não sei" no meio de um parágrafo soa mais verdadeiro do que como abertura ritualizada.

**3. Conclusões filosóficas que cabem em qualquer projeto**
> Sinal: "Às vezes o trabalho do designer é menos sobre inventar e mais sobre fazer o existente aparecer." Poderia encerrar qualquer case de qualquer área.

Finais fortes são específicos ao projeto. Se a frase funciona em outro case sem edição, ela não pertence a este.

**4. Detalhes sem textura**
> Sinal: "as gravações foram o ponto de virada" sem dizer *o quê* nas gravações, ou "buscas mais comuns eram previsíveis" sem um exemplo concreto.

Adicione pelo menos um detalhe que só quem esteve no projeto saberia: o que exatamente apareceu no Clarity, o nome do tipo de documento que causou confusão, o momento em que o usuário saiu da plataforma.

**5. Prosa limpa demais**
> Sinal: sem nenhuma frase que revele que foi uma escolha entre opções ruins, que algo não funcionou, que houve pressão externa.

Permita o enquadramento "opção menos ruim": "Fui com o painel lateral — não porque era a resposta óbvia, mas porque as outras duas resolviam a versão errada do problema." Isso soa como alguém que pensou de verdade, não alguém que sabia a resposta desde o início.

**6. "Não é X, é Y" — framing contrastivo empilhado**
> Sinal: "o problema não era a interface — era a arquitetura da informação." "o produto não precisava de mais funcionalidade — precisava de mais confiança." Cada insight em Discovery formulado como inversão.

Uma inversão contrastiva é forte. Duas na mesma seção revelam o molde. Se o insight real foi uma virada de enquadramento, use uma vez e deixe a segunda frase desdobrar a consequência, não repetir a forma.

**7. Triplet framing — três elementos paralelos como prova por enumeração**
> Sinal: "O Store Owner não precisa de X; precisa de Y. O Traffic Manager não precisa de Z; precisa de W. O Marketing precisa de V." Três frases com gramática idêntica enumerando personas ou situações.

IA usa o padrão de três porque cria ilusão de completude sistemática. Humanos raramente escrevem assim. Um exemplo concreto seguido de uma consequência é mais natural e mais específico do que três slots paralelos preenchidos com o mesmo molde.

**8. Repetição com sinônimos — mesma ideia reembalada**
> Sinal: "visão consolidada", "métricas consolidadas", "painel consolidado", "dados consolidados" — o mesmo adjetivo quatro vezes no mesmo texto, como se não tivesse aparecido antes.

Escolha o termo mais preciso e use-o. Se precisar variar, use pronome ou elipse. Repetição de sinônimos dá a impressão de que cada parágrafo foi escrito sem memória do anterior.

**9. Travessão como ênfase injetada**
> Sinal: em-dash usado para criar drama onde a frase já carrega o peso. "o feedback foi educado demais — educado demais para ser honesto." Presente em toda cláusula que quer parecer importante.

Travessão é pontuação, não intensificador. Reserve para quando a pausa física muda a leitura — não para sublinhar o que o vocabulário já diz. Mais de três em um parágrafo é quase sempre excesso.

### Checklist rápido antes de publicar uma seção de Processo & Decisões

- [ ] As decisões têm pesos diferentes (extensões diferentes)?
- [ ] Pelo menos uma decisão admite "opção menos ruim" ou incerteza não resolvida?
- [ ] Há pelo menos um detalhe específico que não poderia estar em outro case?
- [ ] O encerramento da seção é específico a este projeto?
- [ ] Nenhuma decisão usa exatamente o mesmo padrão de frase que a anterior?
- [ ] A seção Discovery não usa "não era X — era Y" mais de uma vez?
- [ ] Nenhum bloco tem três frases com gramática idêntica enumerando personas ou situações?
- [ ] A mesma palavra-chave não aparece mais de duas vezes sem variação?

---

## 4.2 Imagens e texto — consistência visual-narrativa

Cada imagem confirma ou contradiz o texto ao redor. Três regras que evitam ambiguidade:

**1. A imagem vem depois do texto que a descreve, nunca antes**
O parágrafo que explica a decisão ou feature aparece antes da imagem que a ilustra. Uma imagem de solução posicionada dentro de uma seção de problema faz o leitor interpretar o novo design como sendo o estado anterior.

**2. O alt text descreve o que está literalmente na tela**
"Lojista no mobile — valor disponível, anúncio ativo e resultados inline" é correto.
"Admin — gestão de orçamento e performance consolidada" para uma tela que mostra a fila de aprovação do Gestor é incorreto — descreve o que o autor esperava ver, não o que a imagem mostra.
O alt text precisa funcionar sem o texto ao redor: quem vê apenas a imagem + legenda deve entender exatamente o que está sendo mostrado e a qual perfil/seção pertence.

**3. Seção de Contexto & Problema não usa imagem de solução**
Se não existe screenshot do estado anterior, a seção fica sem imagem. Inserir uma tela do redesign no Contexto cria ambiguidade sobre o que é "antes" e "depois" — e o leitor que escaneia vai sempre associar a imagem ao texto imediatamente acima dela.

### Checklist antes de publicar as imagens

- [ ] Cada imagem aparece após o texto que a descreve?
- [ ] O alt text descreve elementos visíveis na tela (perfil, dados, componentes mostrados)?
- [ ] Nenhuma imagem de solução aparece em seção de Contexto ou Problema?
- [ ] O leitor que ver apenas o parágrafo acima + a imagem vai entender o que está sendo mostrado?

---

## 5. Checklist de assets

Por case, reúna:

- ⬜ **Capa** — hero com o nome e 1 frase de impacto
- ⬜ **Antes/depois** — o estado da dor vs. a solução
- ⬜ **Fluxo principal** — screenshot da tela/feature central
- ⬜ **Diagrama de sistema** — arquitetura, pipeline ou regras (pode ser ASCII/diagrama simples)
- ⬜ **Detalhe de craft** — close de interação, acessibilidade, estados
- ⬜ **GIF/vídeo curto** — a interação-chave em movimento (opcional, alto valor)

---

## 6. Fluxo de atualização

Como manter este arquivo vivo:

- **Gatilho por marco:** a cada entrada relevante no CHANGELOG de um projeto, adicione uma linha ao case correspondente (em PT **e** EN).
- **Lacunas como TODO:** tudo que falta vira `⬜` e fica rastreável aqui dentro.
- **Revisão por vaga:** antes de aplicar a uma vaga, duplique o case e ajuste a ênfase (seção 2) — não edite o master.
- **Sincronia PT/EN:** nunca atualize um idioma sem o outro; eles devem dizer a mesma coisa.

---

## 7. Checklist de publicação

Antes de subir um case ao site:

- ⬜ TL;DR responde "o quê / pra quem / resultado" em 3 linhas
- ⬜ Pelo menos 3 decisões com trade-off explícito
- ⬜ Toda afirmação de impacto tem número **ou** está marcada como qualitativa
- ⬜ Seção de aprendizados reconhece um limite real
- ⬜ Versões PT e EN dizem a mesma coisa
- ⬜ Todos os `⬜` de asset resolvidos (ou removidos conscientemente)
- ⬜ Sem jargão interno não explicado (ΔE, Riegel etc. têm 1 frase de contexto)
- ⬜ Cada imagem aparece após o texto que a descreve; alt text descreve o que está na tela, não o contexto narrativo

---

## 8. Implementação no site (Astro)

Como o conteúdo redigido neste guia vira páginas no site em código. A stack
completa e o racional estão no [roadmap](roadmap.md); aqui fica o **modelo de
conteúdo**: onde os arquivos moram, como o frontmatter é tipado e como o texto
dos cases acima desce para o build.

### Organização dos arquivos

Cada case vira um par de arquivos Markdown — um por idioma — com o **mesmo
`slug`**. O texto redigido nas seções 9–12 é a fonte; ele é recortado para estes
arquivos quando o build começar.

```
src/content/cases/
├── pt/
│   ├── cartela-cores.md                    ← seção 9 deste guia
│   ├── painel-saude.md                     ← seção 11 deste guia
│   ├── enterprise-ai-assistant.md          ← seção 13 deste guia
│   ├── shipping-capacity-platform.md       ← seção 15 deste guia
│   ├── arezzo-ad-management.md             ← seção 17 deste guia
│   ├── del-valle-website.md                ← seção 19 deste guia
│   ├── hypera-hypergestor.md               ← seção 21 deste guia
│   └── del-valle-kapo.md                   ← seção 23 deste guia
└── en/
    ├── cartela-cores.md                    ← seção 10 deste guia
    ├── painel-saude.md                     ← seção 12 deste guia
    ├── enterprise-ai-assistant.md          ← seção 14 deste guia
    ├── shipping-capacity-platform.md       ← seção 16 deste guia
    ├── arezzo-ad-management.md             ← seção 18 deste guia
    ├── del-valle-website.md                ← seção 20 deste guia
    ├── hypera-hypergestor.md               ← seção 22 deste guia
    └── del-valle-kapo.md                   ← seção 24 deste guia
```

As strings de interface (menu, botões, rótulos) ficam separadas do conteúdo, em
`src/i18n/` (ex.: `pt.json` / `en.json`).

### Frontmatter do case (schema)

Definido em `src/content/config.ts` com Zod (tipado). Campos:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `title` | string | ✅ | Nome do projeto |
| `slug` | string | ✅ | Idêntico nos pares PT/EN |
| `role` | string | ✅ | Papel do autor (ex.: "Product Designer, solo, end-to-end") |
| `summary` | string | ✅ | O TL;DR em uma frase (card + meta description) |
| `company` | string | ✅ | Empresa / cliente / "Projeto pessoal" |
| `year` | number | ✅ | Ano do projeto |
| `cover` | string | ✅ | Caminho da imagem de capa |
| `accent` | string | ✅ | Pastel do card (ver [design-system.md](design-system.md)) |
| `tags` | string[] | ✅ | Ex.: `["Design System", "Algoritmo de cor", "Web app"]` |
| `template` | enum | — | `enterprise` (padrão) \| `brand` \| `brand-split` \| `editorial` |
| `url` | string | — | Link público do projeto (ex.: Painel Saúde) |
| `metrics` | objeto[] | — | Pares `{ label, value }` de impacto |
| `scope` | string[] | — | Lista de entregas, só usada no hero do template `brand-split` (substitui Empresa/Ano por Atuação/Escopo/Duração) |
| `duration` | string | — | Ex.: `"3 meses"` — usada junto de `scope` no hero `brand-split` |
| `bodyManifesto` | boolean | — | Default `true`. `false` remove o estilo de citação-manifesto do primeiro H2 do corpo (`.case-content--no-manifesto`) — usar quando a tese do hero e a do corpo seriam duplicadas (caso do Kapo) |

**`template: brand-split`** (novo, introduzido no redesign do case Del Valle Kapo): hero em duas zonas — título/tese/tags sobre o fundo creme da página, depois uma faixa branca (`surface-2` no dark mode) com a imagem de capa contida (16:9, com `box-shadow`, subindo por cima da costura entre as duas zonas via `margin-top` negativo) e a linha de metadados. Coluna do `<article>` em 1160px (mais larga que os outros templates), mas imagens comuns do corpo ficam contidas em 720px centralizadas — só imagens dentro de `.before-after` preenchem a largura toda. Ver `src/components/HeroBrandSplit.astro` e as classes `.case-content--narrow-images` / `.case-content--no-manifesto` / `.case-content--white-bg` em `global.css`.
| `featured` | boolean | — | Destaca na home |
| `draft` | boolean | — | Esconde do build se `true` |
| `order` | number | — | Ordem manual na listagem |

### Template do arquivo `.md`

> Copiar para `src/content/cases/pt/<slug>.md` e traduzir para `en/<slug>.md`.
> Os cabeçalhos do corpo seguem o **Template-mestre** (seção 3) e os cases reais
> (seções 9–12). Preencher tudo que estiver com `⬜`.

```markdown
---
title: ⬜
slug: ⬜
role: ⬜
summary: ⬜
company: ⬜
year: ⬜
cover: /cases/⬜/cover.webp
accent: "#ecf0f3"
tags: ["⬜"]
url: ⬜
metrics:
  - label: ⬜
    value: ⬜
featured: false
draft: true
---

## Contexto & Problema
## Seu papel
## Restrições
## Descoberta & Insight
## Processo & Decisões
## Solução
## Craft & Acessibilidade
## Colaboração técnica
## Impacto
## Aprendizados
```

### Imagens

- Vivem em `public/cases/<slug>/`.
- Exportar em formato moderno (`webp`/`avif`) com fallback.
- Nomear de forma descritiva (`fluxo-combinador.webp`, não `img1.png`).
- Sempre com `alt` descritivo e **bilíngue** (acessibilidade + SEO).
- Reúna os assets pela [Checklist de assets](#5-checklist-de-assets) (seção 5).

### Origem dos cases / migração do Framer

Os cases já redigidos aqui vêm de projetos reais (`Cartela_Cores`,
`Painel_Saude`). Os cases atualmente no Framer (`jefersonfreiry.framer.website`)
ainda precisam ser tratados:

1. ⬜ Listar os cases hoje publicados no Framer.
2. ⬜ Para cada um, extrair texto e imagens.
3. ⬜ Reescrever no Template-mestre (seção 3), em PT e EN.
4. ⬜ Revisar contra a Régua Sênior (seção 2) antes de publicar.

---

## 9. Case — Cartela_Cores (PT)

### Do PDF morto ao guarda-roupa que se combina sozinho

**TL;DR** — Product Designer solo, end-to-end (pesquisa → produção). App web que traduz uma consultoria de coloração pessoal — normalmente entregue como um PDF estático — em um sistema vivo que pontua, em tempo real, se cada peça do guarda-roupa combina com a cartela do usuário e ajuda a montar looks harmônicos.

**Tags:** Web app · Moda/coloração pessoal · Algoritmo de cor · Design system · Acessibilidade

#### Contexto & Problema

Uma consultoria de coloração pessoal termina num veredito ("você é *Outono Quente*, use estas cores") entregue como documento estático. O problema aparece **depois**: na frente do armário. A pessoa não consegue aplicar o conhecimento — não sabe se a camisa que já tem entra na cartela, nem como combinar o que tem em looks que funcionam. O valor da consultoria fica preso num PDF que ninguém reabre.

**Estado anterior:** conhecimento correto, mas inerte. Decisão de vestir-se permanecia no "achismo".

#### Seu papel

Solo, end-to-end: pesquisa do domínio (teoria de coloração), definição de produto, design de interação, design system e implementação (HTML/CSS/JS + Firebase). Um case de Product Designer que prototipa em alta fidelidade até produção.

#### Restrições

- **Solo e sem orçamento** — nenhuma infra paga, decisões enviesadas para custo zero.
- **Dados sensíveis** — fotos do guarda-roupa do usuário, exigindo isolamento por conta.
- **Multiusuário depois de pronto** — a arquitetura inicial single-user precisou evoluir sem reescrita.

#### Descoberta & Insight

A virada foi reformular a pergunta. "Essa cor combina?" parece subjetiva, mas pode virar **medida**: a *distância perceptual de cor* (ΔE no espaço CIE L\*a\*b\*) modela exatamente "quão longe essa peça está da minha cartela". Se o computador mede a distância, o palpite vira score.

#### Processo & Decisões

**1. Espaço de cor — problema:** RGB e HSL não são perceptualmente uniformes (a mesma diferença numérica significa diferenças visuais distintas conforme a região do espectro). **Opções:** ficar no RGB (simples) vs. converter para CIE L\*a\*b\* (complexo). **Escolha:** L\*a\*b\* + ΔE. **Porquê:** é o único espaço onde "distância" corresponde à percepção humana. Validei o score contra avaliações manuais: **erro médio de 4.8%**, com 22 de 28 cores dentro de ±10%.

**2. O que é uma peça "coringa" — problema:** "versátil" é vago. **Escolha:** transformei em regra explícita — score ≥ 85% **e** cor neutra da cartela **e** lisa/estampa discreta **e** funciona em ≥ 3 ocasiões. **Porquê:** uma peça de cor de acento (laranja queimado, vinho) é bonita mas limita combinações — então é "versátil", não "coringa". Isso é design de um sistema de regras, não só de telas.

**3. Arquitetura multiusuário — problema:** ao adicionar login, dados de um usuário vazavam para outro durante a troca de sessão. **Causa raiz:** o app renderizava antes do Firestore responder e `loadData()` disparava um `saveData()` que sobrescrevia a conta errada. **Escolha:** catálogo de roupas compartilhado no localStorage (igual para todos) vs. looks isolados por usuário no Firestore; render movido para dentro do `.then()` do Firestore; flag `_authReady` bloqueando saves durante o carregamento. **Porquê:** separar o que é comum do que é privado e nunca renderizar/gravar antes de confirmar de quem são os dados.

**4. Acessibilidade do score — problema:** comunicar qualidade só por cor exclui daltônicos. **Escolha:** todo score traz **cor + ícone + rótulo textual** (✓ Excelente / ↑ Ótimo / – Regular / ↓ Revisar); fontes mínimas elevadas para 0.65rem; bloqueios de regra explicados inline ("🚫 Já existe um Calçado no look"), não só em toast efêmero. **Porquê:** a informação não pode depender de um único canal sensorial.

**5. Navegação — problema:** sidebar consumia espaço e escondia abas. **Escolha:** substituí por topbar horizontal permanente (e bottom nav no mobile). **Porquê:** todas as 7 áreas acessíveis em um toque, sem menu oculto.

#### Solução

Sete áreas: Início (hub com stats e último look), Catálogo (com multisseleção e "aposentar" peças), **Combinador inteligente**, Sugestões, Looks, Compras e Cartela (a referência de cor).

O coração é o **Combinador**: mostra as zonas do corpo (Topo, Camiseta, Acessórios, Inferior, Calçado) sempre visíveis; cada slot vazio sugere a melhor peça (dimmed) com "+ Adicionar"; um botão "↺" abre um picker de alternativas **ordenado por harmonia**; cada slot exibe um badge de score ("✓ 87%") e um card flutuante explica **qual peça ancora ou derruba** a harmonia do look.

#### Craft & Acessibilidade

- `object-fit: contain` + fundo branco nos cards para mostrar a peça inteira sem corte nem moldura vazia.
- `aspect-ratio` consistente entre catálogo (3/4) e slots do combinador para ritmo visual.
- Score sempre multicanal (cor + ícone + texto); confirmação antes de excluir looks.

#### Colaboração técnica

Pipeline de cor implementado por mim: `HEX → RGB linear → XYZ (D65) → CIE L*a*b* → ΔE mínimo → Score`. Paleta âncora de 18 cores com score próprio; o score final herda uma fração do âncora mais próximo (`final = anchorScore/100 × base`). Backend em Firebase Auth (e-mail + Google) e Firestore com regras por `uid`.

#### Impacto

- **Precisão:** algoritmo de score com **4.8% de erro médio** vs. avaliação manual.
- **Qualitativo:** uma consultoria estática virou ferramenta de decisão diária — "essa peça combina?" passou de achismo a número explicável.
- ⬜ Métricas de uso (looks criados, frequência) — preencher.
- ⬜ Depoimento de usuário — preencher.

#### Aprendizados

O modelo tem um limite honesto: ΔE não captura **temperatura perceptual**, então cores frias (branco puro, rosa frio, amarelo neon) são superestimadas em ~15–23% vs. o julgamento manual. Já mapeei a correção — uma penalidade para *hue* > 150° — e a próxima evolução: extrair a cor dominante da foto automaticamente (ColorThief) em vez de seleção manual. **Lição:** reconhecer onde o modelo erra e ter o plano de correção vale mais do que fingir precisão total.

---

## 10. Case — Cartela_Cores (EN)

### From a dead PDF to a wardrobe that matches itself

**TL;DR** — Solo Product Designer, end-to-end (research → production). A web app that turns a personal color-analysis consultation — usually delivered as a static PDF — into a living system that scores, in real time, whether each item in your wardrobe matches your palette, and helps you build harmonious outfits.

**Tags:** Web app · Fashion/color analysis · Color algorithm · Design system · Accessibility

#### Context & Problem

A personal color-analysis session ends with a verdict ("you're a *Warm Autumn*, wear these colors") handed over as a static document. The real problem starts **afterwards**, in front of the closet: people can't apply the knowledge — they don't know whether a shirt they already own fits the palette, or how to combine what they have into outfits that work. The value of the consultation gets locked inside a PDF nobody reopens.

**Prior state:** correct knowledge, but inert. Getting dressed stayed a guessing game.

#### Your role

Solo, end-to-end: domain research (color theory), product definition, interaction design, design system, and implementation (HTML/CSS/JS + Firebase). A Product Designer who prototypes at high fidelity all the way to production.

#### Constraints

- **Solo, no budget** — no paid infra; decisions biased toward zero cost.
- **Sensitive data** — photos of the user's wardrobe, requiring per-account isolation.
- **Multi-user after launch** — the initial single-user architecture had to evolve without a rewrite.

#### Discovery & Insight

The turning point was reframing the question. "Does this color match?" sounds subjective, but it can become a **measurement**: *perceptual color distance* (ΔE in the CIE L\*a\*b\* space) models exactly "how far this item is from my palette". Once the computer measures distance, the guess becomes a score.

#### Process & Decisions

**1. Color space — problem:** RGB and HSL aren't perceptually uniform (the same numeric difference means different visual differences across the spectrum). **Options:** stay in RGB (simple) vs. convert to CIE L\*a\*b\* (complex). **Choice:** L\*a\*b\* + ΔE. **Why:** it's the only space where "distance" maps to human perception. I validated the score against manual ratings: **4.8% average error**, with 22 of 28 colors within ±10%.

**2. What makes an item a "wildcard" — problem:** "versatile" is vague. **Choice:** I turned it into an explicit rule — score ≥ 85% **and** a neutral palette color **and** plain/subtle pattern **and** works in ≥ 3 occasions. **Why:** an accent-color piece (burnt orange, wine) is beautiful but limits combinations — so it's "versatile", not a "wildcard". This is designing a rule system, not just screens.

**3. Multi-user architecture — problem:** after adding login, one user's data leaked into another's during session switching. **Root cause:** the app rendered before Firestore responded, and `loadData()` triggered a `saveData()` that overwrote the wrong account. **Choice:** clothing catalog shared in localStorage (same for everyone) vs. outfits isolated per user in Firestore; rendering moved inside Firestore's `.then()`; an `_authReady` flag blocking saves during loading. **Why:** separate shared from private data, and never render/save before confirming whose data it is.

**4. Score accessibility — problem:** communicating quality by color alone excludes color-blind users. **Choice:** every score carries **color + icon + text label** (✓ Excellent / ↑ Great / – Fair / ↓ Review); minimum font sizes raised to 0.65rem; rule blocks explained inline ("🚫 There's already a Shoe in this outfit"), not just in an ephemeral toast. **Why:** information must never depend on a single sensory channel.

**5. Navigation — problem:** the sidebar ate space and hid tabs. **Choice:** I replaced it with a permanent horizontal topbar (and a bottom nav on mobile). **Why:** all 7 areas reachable in one tap, no hidden menu.

#### Solution

Seven areas: Home (hub with stats and last outfit), Catalog (with multi-select and "retire" items), the **smart Combiner**, Suggestions, Outfits, Shopping, and Palette (the color reference).

The heart is the **Combiner**: it always shows the body zones (Top, Shirt, Accessories, Bottom, Footwear); each empty slot suggests the best item (dimmed) with "+ Add"; a "↺" button opens an alternatives picker **sorted by harmony**; each slot shows a score badge ("✓ 87%"), and a floating card explains **which item anchors or drags down** the outfit's harmony.

#### Craft & Accessibility

- `object-fit: contain` + white background on cards to show the full item with no cropping or empty frame.
- Consistent `aspect-ratio` across catalog (3/4) and combiner slots for visual rhythm.
- Score always multi-channel (color + icon + text); confirmation before deleting outfits.

#### Technical collaboration

Color pipeline I implemented: `HEX → linear RGB → XYZ (D65) → CIE L*a*b* → minimum ΔE → Score`. An 18-color anchor palette, each with its own score; the final score inherits a fraction of the nearest anchor (`final = anchorScore/100 × base`). Backend on Firebase Auth (email + Google) and Firestore with per-`uid` rules.

#### Impact

- **Accuracy:** scoring algorithm with **4.8% average error** vs. manual rating.
- **Qualitative:** a static consultation became a daily decision tool — "does this match?" went from a guess to an explainable number.
- ⬜ Usage metrics (outfits created, frequency) — to fill.
- ⬜ User testimonial — to fill.

#### Learnings

The model has an honest limit: ΔE doesn't capture **perceptual temperature**, so cool colors (pure white, cool pink, neon yellow) are overestimated by ~15–23% vs. manual judgment. I've already mapped the fix — a penalty for *hue* > 150° — and the next step: extracting the dominant color from the photo automatically (ColorThief) instead of manual selection. **Lesson:** acknowledging where the model fails and having the correction planned is worth more than pretending total accuracy.

---

## 11. Case — Painel Saúde (PT)

### Um único painel para uma jornada de 3 anos rumo à maratona

**TL;DR** — Product Designer solo, end-to-end (design de informação → implementação → ops). Dashboard pessoal que unifica corrida (Strava) e força (Hevy) em uma narrativa única de progresso rumo a uma maratona em 2028, com dados que se atualizam sozinhos todo dia.

**Tags:** Dashboard · Design de informação · Integração de APIs · SvelteKit · DataViz

**URL:** https://painel-saude-zeta.vercel.app · **Período de dados:** Mar/2025 → presente

#### Contexto & Problema

Quem treina sério vive com os dados fragmentados: corrida mora no Strava, força mora no Hevy, cada app com sua própria lente. Não existe uma visão integrada que responda à pergunta que importa — **"estou progredindo rumo à minha meta?"** — nem que cruze sinais entre as modalidades (força × corrida, clima × pace).

**Estado anterior:** dois apps, duas histórias soltas, nenhuma resposta sobre a trajetória de longo prazo.

#### Seu papel

Solo, end-to-end: design de informação, arquitetura de dados, implementação (SvelteKit + Chart.js) e operação (deploy e sync automático).

#### Restrições

- **Single-user, zero infra paga** — a arquitetura precisava custar nada.
- **APIs de terceiros** com limites de requisição e tokens que expiram.
- **Frescor sem manutenção** — os dados precisavam se manter atualizados sem trabalho manual diário.

#### Descoberta & Insight

O valor não estava em **mais um gráfico**, e sim em **integração + projeção**. Cruzar fontes responde perguntas que nenhum app isolado responde: projetar tempos de prova (fórmula de Riegel ancorada no recorde real), alertar desequilíbrios entre força e corrida, e contextualizar o pace pelo clima.

#### Processo & Decisões

**1. Arquitetura de dados — problema:** dashboards "de verdade" pedem banco e API server, o que custa dinheiro e manutenção. **Opções:** banco + backend (tempo real, caro) vs. JSON estático versionado no Git (não-tempo-real, grátis). **Escolha:** JSON estático como fonte única de verdade, atualizado por um sync diário. **Porquê:** o painel é leitura, single-user; dados versionados no Git são auditáveis, custam zero e rodam em qualquer CDN. Trade-off consciente: abro mão de tempo real por simplicidade e custo zero.

**2. Sync automático — problema:** dados estáticos envelhecem. **Escolha:** GitHub Actions roda todo dia às 06h (BRT), puxa Strava + Hevy, commita só os JSONs que mudaram, e o push dispara um novo deploy na Vercel. **Porquê:** frescor diário sem servidor e sem eu tocar em nada.

**3. SvelteKit sem SSR — problema:** Chart.js precisa do DOM e os dados já são estáticos no build. **Escolha:** sem SSR, mas com `adapter-vercel` (não `adapter-static`). **Porquê:** SSR não agregaria valor aqui, mas o adapter-vercel deixa a porta aberta para uma rota de API futura (ex: webhook do Strava para sync em tempo real) sem migração.

**4. Design de informação — problema:** dado demais vira ruído. **Escolha:** cada aba responde **uma** pergunta. *Semana:* estou cumprindo o plano? *Meta:* estou no caminho da maratona de 2028? *Atenção:* força e corrida estão equilibradas? *Clima:* o calor explica meu pace? *Provas:* como evoluí entre corridas? **Porquê:** a estrutura segue as perguntas do usuário, não as fontes de dados.

**5. Confiabilidade do dado — problema:** a mesma corrida pode vir de fontes diferentes. **Escolha:** prioridade explícita nos realizados — **manual > Strava > Hevy > nulo**. **Porquê:** a fonte mais confiável vence; o registro manual sempre tem a palavra final.

#### Solução

Dashboard público com 8 abas (Semana, Força, Treinos, Provas, Meta, Atenção, Clima, Histórico). Destaques: projeção de tempos por Riegel ancorada no recorde real de 10K (atualiza sozinha após cada sync); calendário com filtros e *streak* de semanas consecutivas; comparador de duas provas com splits de pace e FC por km.

#### Craft & DataViz

- Estimativas de prova (`t2 = t1 × (d2/d1)^1.06`) recalculadas a cada sync a partir do PR real — nunca um número chumbado.
- Mapeamento de nomes Hevy→gráfico mantido sincronizado em dois lugares (script de sync + componente), documentado para não divergir.
- KPIs no topo de cada aba para resposta imediata antes do detalhe.

#### Colaboração técnica

Pipeline: `Strava/Hevy API → scripts de sync → JSON → build do SvelteKit → Vercel`. Segredos em GitHub Secrets + Vercel Env Vars; `.env` no `.gitignore`. Fluxo de re-auth do Strava documentado para quando o refresh token expira.

#### Impacto

- **Autonomia operacional:** atualização **100% automática**, diária, sem intervenção manual.
- **Cobertura:** histórico contínuo de **Mar/2025 até o presente**, integrando duas modalidades em uma narrativa.
- **Projeção:** estimativas de prova sempre ancoradas no recorde real e atualizadas sozinhas.
- ⬜ Métricas de acesso/uso — preencher.

#### Aprendizados

Tratar dados como **fonte única de verdade versionada** transformou simplicidade em feature: auditável, reproduzível e barata. **Lição:** a decisão arquitetural mais "chata" (JSON no Git) foi a mais acertada — escolher a complexidade que o problema realmente exige, e não a que impressiona.

---

## 12. Case — Painel Saúde (EN)

### One dashboard for a 3-year journey toward a marathon

**TL;DR** — Solo Product Designer, end-to-end (information design → implementation → ops). A personal dashboard that unifies running (Strava) and strength (Hevy) into a single progress narrative toward a 2028 marathon, with data that refreshes itself every day.

**Tags:** Dashboard · Information design · API integration · SvelteKit · DataViz

**URL:** https://painel-saude-zeta.vercel.app · **Data range:** Mar 2025 → present

#### Context & Problem

Serious training lives in fragmented data: running sits in Strava, strength sits in Hevy, each app with its own lens. There's no integrated view that answers the question that matters — **"am I progressing toward my goal?"** — nor one that cross-references signals between disciplines (strength × running, weather × pace).

**Prior state:** two apps, two disconnected stories, no answer about the long-term trajectory.

#### Your role

Solo, end-to-end: information design, data architecture, implementation (SvelteKit + Chart.js), and operations (deploy and automated sync).

#### Constraints

- **Single-user, zero paid infra** — the architecture had to cost nothing.
- **Third-party APIs** with rate limits and expiring tokens.
- **Freshness without maintenance** — data had to stay current with no daily manual work.

#### Discovery & Insight

The value wasn't in **one more chart**, but in **integration + projection**. Cross-referencing sources answers questions no single app can: projecting race times (Riegel formula anchored on the real PR), flagging imbalances between strength and running, and contextualizing pace by weather.

#### Process & Decisions

**1. Data architecture — problem:** "real" dashboards call for a database and an API server, which cost money and maintenance. **Options:** database + backend (real-time, expensive) vs. static JSON versioned in Git (non-real-time, free). **Choice:** static JSON as the single source of truth, updated by a daily sync. **Why:** the panel is read-only, single-user; Git-versioned data is auditable, costs nothing, and runs on any CDN. A conscious trade-off: I give up real-time for simplicity and zero cost.

**2. Automated sync — problem:** static data goes stale. **Choice:** GitHub Actions runs daily at 6am (BRT), pulls Strava + Hevy, commits only the JSONs that changed, and the push triggers a fresh Vercel deploy. **Why:** daily freshness with no server and no manual touch.

**3. SvelteKit without SSR — problem:** Chart.js needs the DOM, and the data is already static at build time. **Choice:** no SSR, but `adapter-vercel` (not `adapter-static`). **Why:** SSR adds no value here, but adapter-vercel keeps the door open for a future API route (e.g., a Strava webhook for real-time sync) with no migration.

**4. Information design — problem:** too much data becomes noise. **Choice:** each tab answers **one** question. *Week:* am I on plan? *Goal:* am I on track for the 2028 marathon? *Attention:* are strength and running balanced? *Weather:* does the heat explain my pace? *Races:* how have I evolved between runs? **Why:** the structure follows the user's questions, not the data sources.

**5. Data reliability — problem:** the same run can arrive from different sources. **Choice:** explicit priority on completed entries — **manual > Strava > Hevy > null**. **Why:** the most reliable source wins; the manual record always has the final say.

#### Solution

A public dashboard with 8 tabs (Week, Strength, Training, Races, Goal, Attention, Weather, History). Highlights: Riegel time projection anchored on the real 10K PR (auto-updates after every sync); a calendar with filters and a consecutive-week streak; a two-race comparator with per-km pace and HR splits.

#### Craft & DataViz

- Race estimates (`t2 = t1 × (d2/d1)^1.06`) recomputed on every sync from the real PR — never a hardcoded number.
- Hevy→chart name mapping kept in sync across two places (sync script + component), documented to prevent drift.
- KPIs at the top of each tab for an immediate answer before the detail.

#### Technical collaboration

Pipeline: `Strava/Hevy API → sync scripts → JSON → SvelteKit build → Vercel`. Secrets in GitHub Secrets + Vercel Env Vars; `.env` in `.gitignore`. Strava re-auth flow documented for when the refresh token expires.

#### Impact

- **Operational autonomy:** **100% automated**, daily updates, no manual intervention.
- **Coverage:** a continuous history from **Mar 2025 to present**, integrating two disciplines into one narrative.
- **Projection:** race estimates always anchored on the real PR and self-updating.
- ⬜ Access/usage metrics — to fill.

#### Learnings

Treating data as a **versioned single source of truth** turned simplicity into a feature: auditable, reproducible, and cheap. **Lesson:** the most "boring" architectural decision (JSON in Git) was the most correct — pick the complexity the problem actually demands, not the one that impresses.

---

## 13. Case — Enterprise AI Knowledge Assistant (PT)

### Dez repositórios, uma conversa: como a rastreabilidade de fontes se tornou o produto

**TL;DR** — Product Designer em time de produto, 6 meses. Scale-up de um MVP de assistente com IA para uma plataforma de acesso ao conhecimento interno de uma grande organização. O desafio central não era a qualidade das respostas — era que os usuários não agiam sobre elas sem saber de onde vinham.

**Tags:** Enterprise · IA conversacional · Design de informação · Transparência · Figma · Clarity

#### Contexto & Problema

Grandes organizações acumulam documentação técnica e regulatória distribuída por múltiplos sistemas — intranets, repositórios de arquivos, bases por área. O funcionário que precisa de uma informação enfrenta um **problema de localização antes de um problema de conteúdo**: não sabe onde procurar, busca em vários lugares, encontra versões desatualizadas ou desiste. Um MVP de assistente com IA havia sido lançado para atacar esse problema, mas o uso real revelou uma segunda camada: mesmo quando a resposta era correta, os usuários saíam para confirmá-la em outro sistema antes de agir.

**Estado anterior:** conhecimento corporativo correto, mas inacessível — e um MVP que respondia mas não era confiado.

#### Meu papel

Product Designer responsável pelo scale-up: conduzi as atividades de discovery (entrevistas com usuários do MVP + análise de comportamento via Clarity), sintetizei as oportunidades em Mural, defini as funcionalidades da versão escalada e desenvolvi todo o design em Figma. Atuei em colaboração com time de produto e engenharia, 6 meses, do discovery ao handoff.

#### Restrições

- **Produto existente com base de usuários ativa** — as decisões de design precisavam evoluir o MVP sem quebrar os fluxos que já funcionavam.
- **Confiança não é opcional em enterprise** — uma resposta errada de IA tem custo real: decisão incorreta, risco de conformidade. A experiência precisava tornar a origem da informação inegociável.
- **Escopo fechado de 6 meses** — priorizar entre o que seria escalado agora e o que ficaria para iterações seguintes.

#### Descoberta & Insight

A discovery revelou dois problemas encadeados, não um. O primeiro: a interface de busca do MVP pedia que os usuários *navegassem* pela documentação quando o que eles queriam era *perguntar* — a busca é uma tarefa intermediária que as pessoas executam só porque não têm alternativa. O segundo: mesmo quando a IA respondia bem, os usuários não acionavam a resposta porque não sabiam de onde ela vinha. Sem rastreabilidade, a resposta certa e a resposta errada têm a mesma aparência — e em contexto de compliance, isso é suficiente para paralisar a adoção.

**A virada:** o produto não precisava melhorar a busca. Precisava eliminar a necessidade de buscar — e precisava fazer a fonte da resposta tão visível quanto a própria resposta.

#### Processo & Decisões

**1. Paradigma de interface — problema:** melhorar a busca existente (filtros mais precisos, ranking melhor) era a saída de menor risco. **Opções:** otimizar a busca (esforço menor, impacto incremental) vs. substituir a busca por uma interface conversacional (maior mudança, potencial de eliminar a fricção na raiz). **Escolha:** interface conversacional inspirada em LLMs modernos, com input em linguagem natural e prompts sugeridos como ponto de entrada para novos usuários. **Porquê:** otimizar a busca resolve um problema que o usuário não quer ter — ele quer a resposta, não um buscador melhor.

**2. Visibilidade das fontes — problema:** respostas sem origem não eram acionadas. Os usuários abriam outro sistema para confirmar, anulando o ganho de produtividade do assistente. **Opções:** ocultar fontes (interface mais limpa, confiança menor) vs. citações inline no texto (fragmentado, dificulta leitura) vs. painel dedicado sempre acessível (mais informação disponível, contexto preservado). **Escolha:** painel lateral de fontes, acessível diretamente a partir de cada resposta, com os documentos originais e a possibilidade de explorar relacionados. **Porquê:** separar a resposta da sua rastreabilidade mantém a leitura fluida e deixa a verificação disponível para quem precisa dela — sem forçar quem já confia.

**3. Redução de barreira — problema:** usuários novos não sabiam o que perguntar a um assistente que integra bases técnica, regulatória e operacional ao mesmo tempo. **Opções:** onboarding textual (tutorial, tooltips) vs. prompts sugeridos contextuais na tela inicial (ação imediata, sem leitura prévia). **Escolha:** prompts sugeridos derivados dos padrões reais de busca identificados nas sessões do Clarity — não genéricos, mas calibrados às perguntas mais frequentes da organização. **Porquê:** o usuário aprende o que o assistente pode fazer ao ver um exemplo concreto, não ao ler uma descrição.

**4. Modelo de integração — problema:** o conhecimento corporativo não vivia em uma base única — eram sistemas distintos, com autoridade sobre áreas distintas. **Opções:** assistente respondendo de uma base consolidada (mais simples, menos fiel à origem) vs. consulta distribuída com citação por fonte de cada trecho (mais complexo, rastreabilidade preservada). **Escolha:** integração distribuída com citação de origem por trecho. **Porquê:** esconder a pluralidade das fontes numa base consolidada reduziria a confiança — o usuário precisa saber se aquela resposta vem da política de TI ou do manual de compliance.

#### Solução

Uma plataforma centralizada de acesso ao conhecimento corporativo. O usuário abre uma interface única e pode:

- **Perguntar em linguagem natural** — sem precisar saber em qual sistema a informação mora.
- **Receber respostas estruturadas** geradas a partir dos documentos internos reais.
- **Verificar as fontes** — painel lateral mostra quais documentos embasaram cada resposta e permite acessá-los diretamente.
- **Explorar documentos relacionados** — contexto adicional sem sair da interface.
- **Retomar conversas anteriores** — histórico de chat para continuidade entre sessões.

#### Craft & Acessibilidade

- O **estado inicial vazio** da interface exibe os prompts sugeridos como chips clicáveis — reduz a ansiedade da tela em branco e demonstra o escopo do assistente em vez de descrevê-lo.
- O **painel de fontes** é uma coluna lateral persistente, não um modal ou tooltip: permanece disponível sem interromper a leitura da resposta. O badge com o número de fontes em cada mensagem sinaliza rastreabilidade antes mesmo de abrir o painel.
- A **estrutura da resposta** separa visualmente a síntese do AI do acesso às fontes — hierarquia clara entre "o que o assistente concluiu" e "de onde isso vem".
- ⬜ Decisões de acessibilidade (contraste mínimo, foco por teclado, comportamento com leitor de tela) — preencher.

#### Colaboração técnica

Pipeline de discovery e design: `gravações Clarity + heatmaps → entrevistas com usuários do MVP → síntese em Mural → oportunidades priorizadas → wireframes Figma → protótipo navegável → validação com engenharia → handoff`. As gravações do Clarity foram determinantes: mostraram os pontos exatos de abandono no MVP — onde os usuários paravam, saíam para confirmar ou repetiam a mesma busca de forma diferente. ⬜ Arquitetura técnica da plataforma (stack de IA, indexação de documentos) — preencher se aplicável.

#### Impacto

- **Lançamento:** a plataforma foi lançada como parte do ecossistema digital interno da organização.
- **Feedback inicial:** coletado via CSAT e mecanismos de feedback integrados ao produto.
- ⬜ Variação do CSAT entre MVP e versão escalada — preencher.
- ⬜ Redução do tempo médio de localização de informação — preencher.
- ⬜ Taxa de adoção / usuários ativos no primeiro ciclo pós-lançamento — preencher.

#### Aprendizados

Este é um case de scale-up, não de 0→1 — e isso muda o tipo de julgamento exigido. Algumas decisões de arquitetura já estavam tomadas pelo MVP; o trabalho foi identificar o que estava errado *na camada de experiência*, não na tecnologia. O que descobri: o assistente tinha a resposta certa, mas a experiência errada. **Lição:** em produtos de IA corporativa, a confiança não emerge da precisão do modelo — ela é um problema de design. Rastreabilidade visível não é um detalhe de UX; é a condição para que a resposta certa seja usada.

---

## 14. Case — Enterprise AI Knowledge Assistant (EN)

### Ten repositories, one conversation: how source traceability became the product

**TL;DR** — Product Designer on a product team, 6 months. Scaled an AI assistant MVP into a full internal knowledge platform for a large organization. The core challenge wasn't the quality of the answers — it was that users wouldn't act on them without knowing where they came from.

**Tags:** Enterprise · Conversational AI · Information design · Transparency · Figma · Clarity

#### Context & Problem

Large organizations accumulate extensive technical and regulatory documentation distributed across multiple systems — intranets, file repositories, area-specific knowledge bases. An employee who needs information faces a **location problem before a content problem**: they don't know where to look, search in multiple places, find outdated versions, or give up. An AI assistant MVP had been launched to address this, but real usage revealed a second layer: even when the answer was correct, users would leave the interface to confirm it elsewhere before acting.

**Prior state:** accurate corporate knowledge, but inaccessible — and an MVP that answered questions but wasn't trusted.

#### My role

Product Designer responsible for the scale-up: I led the discovery activities (interviews with MVP users + behavioral analysis via Clarity), synthesized opportunities in Mural, defined the feature set for the scaled version, and developed all design in Figma. I worked in collaboration with the product and engineering team over 6 months, from discovery to handoff.

#### Constraints

- **Existing product with an active user base** — design decisions had to evolve the MVP without breaking flows that were already working.
- **Trust is non-negotiable in enterprise** — a wrong AI answer has real cost: incorrect decision, compliance risk. The experience had to make the source of information non-optional.
- **Fixed 6-month scope** — prioritizing between what would be scaled now and what would wait for future iterations.

#### Discovery & Insight

Discovery revealed two linked problems, not one. The first: the MVP's search interface asked users to *navigate* documentation when what they wanted was to *ask* — search is an intermediate task people perform only because they have no alternative. The second: even when the AI answered correctly, users didn't act on the response because they didn't know where it came from. Without traceability, a right answer and a wrong answer look identical — and in a compliance context, that's enough to stall adoption.

**The turning point:** the product didn't need better search. It needed to eliminate the need to search — and it needed to make the source of each answer as visible as the answer itself.

#### Process & Decisions

**1. Interface paradigm — problem:** improving the existing search (more precise filters, better ranking) was the lower-risk path. **Options:** optimize search (less effort, incremental impact) vs. replace search with a conversational interface (bigger change, potential to eliminate friction at the root). **Choice:** conversational interface inspired by modern LLMs, with natural language input and suggested prompts as the entry point for new users. **Why:** optimizing search solves a problem the user doesn't want to have — they want the answer, not a better search engine.

**2. Source visibility — problem:** answers without origin weren't acted upon. Users opened another system to confirm before proceeding, eliminating the assistant's productivity gain. **Options:** hide sources (cleaner interface, less trust) vs. inline citations within the text (fragmented, disrupts reading) vs. a dedicated panel always accessible (more information available, context preserved). **Choice:** a persistent lateral source panel, accessible directly from each response, showing the original documents and allowing exploration of related ones. **Why:** separating the answer from its traceability keeps reading fluid and keeps verification available for those who need it — without forcing it on those who already trust the response.

**3. Reducing the barrier to entry — problem:** new users didn't know what to ask an assistant integrating technical, regulatory, and operational knowledge bases simultaneously. **Options:** text-based onboarding (tutorial, tooltips) vs. contextual suggested prompts on the start screen (immediate action, no prior reading required). **Choice:** suggested prompts derived from the actual search patterns identified in Clarity sessions — not generic, but calibrated to the organization's most frequent questions. **Why:** users learn what the assistant can do by seeing a concrete example, not by reading a description of its capabilities.

**4. Integration model — problem:** corporate knowledge didn't live in a single base — separate systems, each with authority over distinct areas. **Options:** assistant responding from a consolidated base (simpler, less faithful to origin) vs. distributed query with per-source citation for each excerpt (more complex, traceability preserved). **Choice:** distributed integration with source citation per excerpt. **Why:** hiding the plurality of sources in a consolidated base would reduce trust — the user needs to know whether an answer comes from the IT policy or the compliance manual.

#### Solution

A centralized platform for accessing corporate knowledge. Users open a single interface and can:

- **Ask in natural language** — without needing to know which system holds the information.
- **Receive structured answers** generated from actual internal documents.
- **Verify the sources** — a side panel shows which documents grounded each answer and allows direct access to them.
- **Explore related documents** — additional context without leaving the interface.
- **Resume previous conversations** — chat history for continuity between sessions.

#### Craft & Accessibility

- The **empty initial state** displays suggested prompts as clickable chips — reduces blank-screen anxiety and demonstrates the assistant's scope instead of describing it.
- The **source panel** is a persistent lateral column, not a modal or tooltip: it stays available without interrupting the reading of the response. A badge with the source count on each message signals traceability before the panel is even opened.
- The **response structure** visually separates the AI synthesis from access to sources — clear hierarchy between "what the assistant concluded" and "where that comes from."
- ⬜ Accessibility decisions (minimum contrast, keyboard focus, screen reader behavior) — to fill with project details.

#### Technical collaboration

Discovery and design pipeline: `Clarity recordings + heatmaps → interviews with MVP users → synthesis in Mural → prioritized opportunities → Figma wireframes → navigable prototype → engineering validation → handoff`. The Clarity recordings were decisive: they showed the exact drop-off points in the MVP — where users stopped, left to confirm, or repeated the same search differently. ⬜ Platform technical architecture (AI stack, document indexing) — to fill if applicable.

#### Impact

- **Launch:** the platform was launched as part of the organization's internal digital ecosystem.
- **Initial feedback:** collected via CSAT and in-product feedback mechanisms.
- ⬜ CSAT change between MVP and scaled version — to fill.
- ⬜ Reduction in average time to locate information — to fill.
- ⬜ Adoption rate / active users in the first post-launch cycle — to fill.

#### Learnings

This is a scale-up case, not a 0→1 — and that changes the type of judgment required. Some architectural decisions were already made by the MVP; the work was identifying what was wrong at the *experience layer*, not in the technology. What I found: the assistant had the right answer, but the wrong experience. **Lesson:** in enterprise AI products, trust doesn't emerge from the model's accuracy — it's a design problem. Visible traceability isn't a UX detail; it's the condition for a correct answer to actually be used.

---

## 15. Case — Shipping Capacity Optimization Platform (PT)

### O navio parte com espaço vazio: como um timeline visual transformou dados operacionais em oportunidades comerciais

**TL;DR** — Product Designer em time de produto, 6 meses. MVP de plataforma de otimização de capacidade de carga para operações de logística marítima — substituindo planilhas dispersas e e-mails por um ambiente centralizado de monitoramento de rotas, simulação de alocação e gestão de oportunidades comerciais.

**Tags:** Enterprise · Logística marítima · DataViz · Simulação operacional · Figma · Mural

#### Contexto & Problema

Em logística marítima, navios frequentemente partem com capacidade de carga disponível que poderia ser comercializada. O problema não é a falta de oportunidade — é a falta de visibilidade sobre ela. As informações de rota, disponibilidade de espaço e restrições operacionais estavam distribuídas em planilhas, e-mails e documentos internos sem nenhuma superfície unificada. Para identificar se um navio tinha espaço em uma determinada janela de tempo, um operador precisava cruzar múltiplas fontes manualmente, dependendo de experiência individual e comunicação informal com diferentes áreas.

**Estado anterior:** oportunidades comerciais existiam na operação, mas eram invisíveis sem análise manual — e o processo de gerenciar pedidos de parceiros era conduzido por e-mail, sem rastreabilidade.

#### Meu papel

Product Designer responsável pelo design do MVP do início ao fim: conduzi as atividades de discovery (reviews de workflow com especialistas em logística e sessões recorrentes de validação com stakeholders internos), sintetizei os padrões operacionais em Mural, e desenvolvi todo o design da plataforma em Figma. Atuei em colaboração com time de produto e engenharia, 6 meses, do discovery ao handoff.

#### Restrições

- **Domínio de alta complexidade** — logística marítima tem restrições operacionais específicas (janelas portuárias, tempo de trânsito, compatibilidade de carga, regulações). O design precisava ser validado continuamente com especialistas do domínio, não apenas com usuários.
- **MVP para audiência dupla** — a plataforma seria apresentada tanto às equipes internas de logística quanto a parceiros comerciais externos selecionados. A clareza da interface não era apenas uma meta de UX — era um requisito de negócio.
- **Escopo fechado de 6 meses** — um sistema de monitoramento + simulação + gestão de pedidos precisava ser priorizado sem comprometer a coerência da experiência.

#### Descoberta & Insight

Os especialistas em logística sabiam onde estavam as oportunidades — mas esse conhecimento vivia na cabeça de cada operador, distribuído e não transferível. O bottleneck não era analítico, era de superfície: sem uma visão consolidada e escanável da capacidade dos navios ao longo do tempo, cada avaliação de oportunidade exigia um trabalho manual que poucos conseguiam fazer com velocidade.

**A virada:** a oportunidade de carga não estava escondida nos dados — estava invisível pela ausência de um timeline. Quando você consegue *ver* o espaço disponível numa rota em vez de calculá-lo em planilha, a identificação de oportunidades deixa de ser uma análise e passa a ser uma leitura visual. O design da plataforma inteira partiu dessa premissa.

#### Processo & Decisões

**1. Representação temporal das rotas — problema:** tabelas e listas de rotas obrigam o operador a reconstruir mentalmente a sequência de eventos ao longo do tempo. A análise de disponibilidade numa tabela é uma operação cognitiva; num timeline, é uma leitura. **Opções:** lista de rotas com filtros (familiar, sem curva de aprendizado) vs. timeline visual por navio e período (mais complexo de construir, muito mais rápido de interpretar). **Escolha:** timeline visual representando movimentos entre portos, janelas de capacidade disponível e restrições operacionais. **Porquê:** o principal ganho da plataforma era transformar análise em percepção — e isso só é possível com uma representação temporal.

**2. Módulo de simulação — problema:** avaliar o impacto de uma nova alocação de carga exigia considerar múltiplas variáveis simultaneamente (capacidade residual, tempo de trânsito, compatibilidade de porto). Fazer isso manualmente em planilha demorava e produzia erros. **Opções:** plataforma só de leitura (monitoramento sem experimentação) vs. simulação integrada com visualização do impacto em tempo real. **Escolha:** módulo de simulação que permite ao usuário testar alocações hipotéticas e visualizar o impacto na capacidade e no cronograma antes de confirmar qualquer decisão. **Porquê:** a resistência a adotar novas oportunidades comerciais vinha do risco percebido de "e se der errado operacionalmente" — a simulação torna o experimento seguro e o julgamento mais rápido.

**3. Workflow de pedidos de parceiros — problema:** solicitações de espaço de carga chegavam por e-mail, sem estrutura, sem histórico centralizado e sem visibilidade sobre o estágio de cada negociação. **Opções:** integrar e-mail (menor mudança de comportamento, não resolve rastreabilidade) vs. workflow estruturado dentro da plataforma com etapas explícitas (mudança maior, resolve o problema na raiz). **Escolha:** workflow centralizado com etapas de recebimento, avaliação, aprovação e acompanhamento, substituindo o e-mail como canal principal de gestão. **Porquê:** o problema não era o volume de pedidos — era a invisibilidade do status de cada um. Um canal estruturado torna o pipeline comercial gerenciável sem depender de memória individual.

**4. Vista de oportunidades — problema:** o timeline completo mostra tudo — incluindo navios já no limite da capacidade. Para identificar oportunidades comerciais rapidamente, o operador não quer analisar o todo; quer ver só o que tem espaço. **Opções:** filtros no timeline principal (flexível, mas exige interação) vs. vista dedicada de "capacidade disponível" (menos flexível, mais imediata para o caso de uso principal). **Escolha:** vista dedicada de oportunidades que agrega os períodos com capacidade disponível por rota e navio, separada do monitoramento geral. **Porquê:** o fluxo de identificação de oportunidades é diferente do fluxo de monitoramento operacional — misturá-los num único painel sacrifica a velocidade de ambos.

#### Solução

Uma plataforma unificada para equipes de logística monitorarem a operação e avaliarem novas oportunidades de carga. Os usuários podem:

- **Visualizar rotas e cronogramas** via timeline por navio e porto, com restrições operacionais representadas visualmente.
- **Identificar capacidade disponível** em vistas dedicadas que destacam janelas de oportunidade sem exigir análise manual.
- **Simular alocações de carga** antes de confirmar decisões, avaliando o impacto na capacidade e no cronograma.
- **Acompanhar pedidos de parceiros** por um workflow estruturado com etapas explícitas de negociação e aprovação.
- **Avaliar impacto operacional** antes de confirmar qualquer oportunidade comercial.

#### Craft & Acessibilidade

- O **timeline** usa diferenciação por cor e densidade para comunicar utilização de capacidade de forma escanável — alta utilização vs. janela disponível são distinguíveis sem leitura de número.
- O **módulo de simulação** mantém o estado atual e o cenário simulado em comparação lado a lado, para que o operador veja o delta, não apenas o resultado final.
- O **workflow de pedidos** estrutura cada solicitação com histórico de etapas e responsável por ação — o operador sabe o que está pendente *dele*, não apenas o status geral.
- ⬜ Decisões de acessibilidade (contraste, foco por teclado, comportamento com daltonismo no uso de cor para capacidade) — preencher.

#### Colaboração técnica

Pipeline de discovery e design: `reviews de workflow com especialistas em logística → sessões recorrentes de validação com stakeholders → síntese em Mural → wireframes Figma → protótipo navegável → validação com engenharia → handoff MVP`. As sessões recorrentes de validação foram estruturais: o domínio de logística marítima tem restrições operacionais que não emergem em entrevistas únicas — precisaram de múltiplos ciclos de refinamento com especialistas para que o timeline e o módulo de simulação representassem a realidade operacional corretamente. ⬜ Stack técnica da plataforma — preencher se aplicável.

#### Impacto

- **Lançamento:** o MVP foi disponibilizado para equipes internas de logística e stakeholders externos selecionados.
- **Feedback inicial:** reações positivas à consolidação das informações operacionais em um único ambiente e à possibilidade de explorar oportunidades de forma mais eficiente.
- ⬜ Redução do tempo de avaliação de oportunidades de carga — preencher.
- ⬜ Volume de pedidos gerenciados pelo workflow vs. e-mail — preencher.
- ⬜ Número de usuários externos onboardados na fase inicial — preencher.

#### Aprendizados

Ferramentas operacionais para domínios complexos têm um desafio duplo: o designer precisa entender o suficiente do domínio para não simplificar o que não pode ser simplificado — e precisa simplificar o suficiente para que o sistema seja utilizável sem treinamento extenso. A validação recorrente com especialistas não foi uma formalidade metodológica; foi o que garantiu que o timeline e a simulação representassem restrições reais, não aproximações. **Lição:** em produtos operacionais de alta complexidade, a fidelidade ao domínio não é um detalhe de conteúdo — é o que determina se a ferramenta será confiada ou contornada.

---

## 16. Case — Shipping Capacity Optimization Platform (EN)

### The ship leaves half-empty: how a visual timeline turned operational data into commercial opportunities

**TL;DR** — Product Designer on a product team, 6 months. MVP of a cargo capacity optimization platform for maritime logistics operations — replacing scattered spreadsheets and email threads with a centralized environment for route monitoring, allocation simulation, and commercial opportunity management.

**Tags:** Enterprise · Maritime logistics · DataViz · Operational simulation · Figma · Mural

#### Context & Problem

In maritime logistics, ships frequently depart with available cargo space that could be commercialized. The problem isn't a lack of opportunity — it's a lack of visibility into it. Route information, space availability, and operational constraints were distributed across spreadsheets, email threads, and internal documents with no unified surface. To assess whether a vessel had available space within a given time window, an operator had to manually cross-reference multiple sources, relying on individual experience and informal coordination across different teams.

**Prior state:** commercial opportunities existed within the operation, but were invisible without manual analysis — and the process for managing partner requests ran through email, with no structured traceability.

#### My role

Product Designer responsible for the MVP design end-to-end: I led the discovery activities (workflow reviews with logistics specialists and recurring validation sessions with internal stakeholders), synthesized operational patterns in Mural, and developed all platform design in Figma. I worked in collaboration with the product and engineering team over 6 months, from discovery to handoff.

#### Constraints

- **High-complexity domain** — maritime logistics has specific operational constraints (port windows, transit time, cargo compatibility, regulations). Design decisions had to be continuously validated with domain specialists, not just users.
- **MVP for a dual audience** — the platform would be presented to both internal logistics teams and selected external commercial partners. Interface clarity wasn't just a UX goal — it was a business requirement.
- **Fixed 6-month scope** — a system covering monitoring + simulation + request management had to be scoped without compromising the coherence of the overall experience.

#### Discovery & Insight

The logistics specialists knew where the opportunities were — but that knowledge lived in individual operators' heads, distributed and non-transferable. The bottleneck wasn't analytical; it was about surface area: without a consolidated, scannable view of vessel capacity over time, every opportunity assessment required manual work that few could perform at speed.

**The turning point:** cargo opportunities weren't hidden in the data — they were invisible because there was no timeline to surface them. When you can *see* available space on a route instead of calculating it in a spreadsheet, opportunity identification stops being analysis and becomes visual reading. The entire platform design was built from that premise.

#### Process & Decisions

**1. Temporal representation of routes — problem:** tables and lists force the operator to mentally reconstruct the sequence of events over time. Assessing availability in a table is a cognitive operation; on a timeline, it's a visual scan. **Options:** filtered route list (familiar, no learning curve) vs. visual timeline per vessel and period (more complex to build, far faster to interpret). **Choice:** visual timeline representing port-to-port movements, available capacity windows, and operational constraints. **Why:** the platform's core value was turning analysis into perception — and that's only possible with a temporal representation.

**2. Simulation module — problem:** assessing the impact of a new cargo allocation required considering multiple variables simultaneously (residual capacity, transit time, port compatibility). Doing this manually in a spreadsheet was slow and error-prone. **Options:** read-only platform (monitoring without experimentation) vs. integrated simulation with real-time impact visualization. **Choice:** a simulation module allowing users to test hypothetical allocations and visualize the impact on capacity and scheduling before committing to any decision. **Why:** resistance to acting on new commercial opportunities came from the perceived risk of "what if this breaks operations" — simulation makes the experiment safe and judgment faster.

**3. Partner request workflow — problem:** cargo space requests arrived by email, unstructured, with no centralized history and no visibility into the status of each negotiation. **Options:** email integration (lower behavior change, doesn't solve traceability) vs. structured workflow inside the platform with explicit stages (bigger change, solves the problem at the root). **Choice:** a centralized workflow with reception, evaluation, approval, and tracking stages, replacing email as the primary management channel. **Why:** the problem wasn't request volume — it was the invisibility of each request's status. A structured channel makes the commercial pipeline manageable without depending on individual memory.

**4. Opportunity view — problem:** the full timeline shows everything — including vessels already at capacity. To identify commercial opportunities quickly, operators don't want to analyze the whole picture; they want to see only what has space. **Options:** filters on the main timeline (flexible, but requires interaction) vs. a dedicated "available capacity" view (less flexible, more immediate for the primary use case). **Choice:** a dedicated opportunity view aggregating available-capacity windows by route and vessel, separate from general monitoring. **Why:** the opportunity identification flow is different from the operational monitoring flow — merging them into a single panel sacrifices the speed of both.

#### Solution

A unified platform for logistics teams to monitor operations and evaluate new cargo opportunities. Users can:

- **Visualize routes and schedules** via vessel-and-port timeline, with operational constraints represented visually.
- **Identify available capacity** in dedicated views that surface opportunity windows without requiring manual analysis.
- **Simulate cargo allocations** before committing, assessing the impact on capacity and scheduling.
- **Track partner requests** through a structured workflow with explicit negotiation and approval stages.
- **Evaluate operational impact** before confirming any commercial opportunity.

#### Craft & Accessibility

- The **timeline** uses color differentiation and density to communicate capacity utilization at a glance — high utilization vs. available window are distinguishable without reading a number.
- The **simulation module** keeps the current state and simulated scenario in side-by-side comparison, so the operator sees the delta, not just the final result.
- The **request workflow** structures each solicitation with a step history and action owner — the operator knows what is pending *from them*, not just the general status.
- ⬜ Accessibility decisions (contrast, keyboard focus, color-blindness-safe capacity encoding) — to fill.

#### Technical collaboration

Discovery and design pipeline: `workflow reviews with logistics specialists → recurring validation sessions with stakeholders → synthesis in Mural → Figma wireframes → navigable prototype → engineering validation → MVP handoff`. The recurring validation sessions were structural: maritime logistics has operational constraints that don't emerge from single interviews — multiple refinement cycles with specialists were needed to ensure the timeline and simulation module represented real operational logic correctly. ⬜ Platform technical stack — to fill if applicable.

#### Impact

- **Launch:** the MVP was made available to internal logistics teams and selected external stakeholders.
- **Initial feedback:** positive reactions to having a consolidated view of operational information and a more efficient way to explore cargo opportunities.
- ⬜ Reduction in time to assess cargo opportunities — to fill.
- ⬜ Volume of requests managed through the workflow vs. email — to fill.
- ⬜ Number of external users onboarded in the initial phase — to fill.

#### Learnings

Operational tools for complex domains carry a double challenge: the designer needs to understand enough of the domain to avoid simplifying what cannot be simplified — and needs to simplify enough for the system to be usable without extensive training. Recurring validation with specialists wasn't a methodological formality; it was what ensured the timeline and simulation reflected real constraints, not approximations. **Lesson:** in high-complexity operational products, domain fidelity isn't a content detail — it's what determines whether the tool will be trusted or worked around.

---

## 17. Case — Arezzo&Co · Sistema de Anúncios em Redes Sociais (PT)

### Um sistema, três jornadas: como a arquitetura por papel desbloqueou o gerenciamento de anúncios do grupo Arezzo&Co

**TL;DR** — UX Researcher, UX Designer e UI Designer, 3 meses. Redesenho do sistema de gerenciamento de anúncios em redes sociais do grupo Arezzo&Co, servindo três perfis com necessidades radicalmente diferentes — Marketing, Gestores de Tráfego e Lojistas — em uma única plataforma com arquitetura de informação adaptada por papel.

**Tags:** Retail · Multi-perfil · Design de sistema · Dashboard · Mobile · Figma

#### Contexto & Problema

O grupo Arezzo&Co opera múltiplas marcas (Arezzo, Schutz e outras) com centenas de lojas físicas, cada uma com autonomia para criar e submeter anúncios em redes sociais. A cadeia envolve três atores com objetivos distintos: o **Lojista** que cria e acompanha seus próprios anúncios, o **Gestor de Tráfego** que supervisiona um conjunto de lojas e aprova as peças, e o time de **Marketing** que monitora a performance consolidada de toda a marca e gerencia o orçamento. O sistema existente não refletia essa estrutura — todos os perfis acessavam as mesmas telas, independentemente do que precisavam fazer.

**Estado anterior:** um sistema único sem diferenciação de papel, onde o Lojista se perdia em métricas corporativas e o Marketing não conseguia visão consolidada sem navegar por lojas individualmente.

#### Meu papel

UX Researcher, UX Designer e UI Designer responsável pelo projeto completo: conduzi entrevistas com cada perfil de usuário, mapeei as jornadas e a arquitetura de informação por papel, e desenvolvi todas as interfaces — web e mobile — em Figma. O projeto foi feito em parceria com uma empresa de tecnologia que fornecia a plataforma para o grupo.

#### Restrições

- **Três perfis, um sistema** — a solução não podia ser três produtos separados; precisava ser uma plataforma coerente com rotas e telas diferenciadas por papel sem que o custo de manutenção explodisse.
- **Multi-marca** — o mesmo sistema atendia Arezzo, Schutz e outras marcas do grupo, exigindo consistência visual sem perder a identidade de cada marca nos contextos relevantes.
- **3 meses de prazo** — escopo apertado para pesquisa, arquitetura, design e prototipação de web + mobile para todos os perfis.

#### Descoberta & Insight

As entrevistas revelaram que o problema não era de funcionalidade ausente — era de **audiência errada**. O sistema tinha as informações certas, mas as apresentava para quem não precisava delas. Um Lojista não quer saber o ROAS consolidado de todas as 165 lojas da marca; quer saber se seu anúncio foi aprovado e quanto do orçamento dele ainda está disponível. Um Gestor de Tráfego não quer ver o fluxo de submissão do Lojista; quer ver a fila de aprovações pendentes e a performance das lojas sob sua responsabilidade. O Marketing quer o funil completo — de impressões a vendas — para a marca inteira.

**A virada:** o redesenho não era uma questão de interface. Era uma questão de arquitetura de informação: cada perfil precisava de um produto diferente dentro da mesma plataforma.

#### Processo & Decisões

**1. Arquitetura de informação por papel — problema:** uma única IA para três perfis obrigava cada usuário a ignorar a maior parte do sistema. **Opções:** personalização por preferência (usuário escolhe o que ver — mais flexível, mais complexo de manter) vs. arquitetura fixa por papel (rotas e telas definidas no login — mais simples, mais adequada ao contexto corporativo). **Escolha:** arquitetura de informação diferenciada por papel, com navegação lateral distinta para cada perfil — Marketing (Home, Aprovações, Painel, Métricas, Orçamento, Cadastro, Notificações), Gestores de Tráfego (Home, Relatórios, Feed, Novo, Envios, Notificações) e Lojistas (Home, Novo, Meus Envios, Feed, Notificações). **Porquê:** o contexto de cada perfil é mutuamente exclusivo — misturá-los numa tela única prejudica todos.

**2. Home como painel de controle contextual — problema:** a home precisava responder perguntas diferentes para cada perfil sem virar uma tela genérica inútil. **Opções:** home única com filtros por papel (complexo, confuso) vs. três homes distintas otimizadas para a tarefa primária de cada papel. **Escolha:** homes diferenciadas — Marketing vê orçamento consolidado, distribuição de investimento (Investido/Provisionado/Restante), métricas de performance das lojas ativas e Receita Impactada; Gestores de Tráfego veem as lojas sob sua responsabilidade com foco em decisões táticas; Lojistas veem seu valor disponível, seus anúncios ativos com resultados inline e um banner de alerta quando há orçamento não utilizado. **Porquê:** a home é a primeira tela de cada sessão — ela precisa responder imediatamente à pergunta mais frequente de cada papel, sem exigir navegação.

**3. Fluxo de aprovação com filtros compostos — problema:** o Gestor de Tráfego recebe anúncios de múltiplas lojas simultaneamente; sem filtragem eficiente, a fila de aprovações vira ruído. **Opções:** lista linear com busca simples vs. grid visual com filtros compostos (Loja, Status, Orçamento, Posicionamento, Arquivo) e chips de acesso rápido. **Escolha:** grid de anúncios com filtros em cascata — ao selecionar "Status", os sub-status aparecem com contagem (Novo: 5, Aprovado: 10, Reprovado: 2); chips de data, status ativo e ordenação sempre visíveis no topo. **Porquê:** o Gestor precisa priorizar a fila, não apenas percorrê-la — ver a contagem por status antes de filtrar permite uma decisão de onde começar.

**4. Métricas em funil para o Marketing — problema:** a visão consolidada de performance precisava comunicar não apenas volume, mas a conversão entre etapas — de impressão a venda. **Opções:** cards de KPIs isolados (cada métrica em sua caixa, sem relação visual entre elas) vs. visualização em funil com as etapas da jornada do consumidor. **Escolha:** funil visual (Impressões → Engajamento → Cliques → Conversas → Vendas) com os números de cada estágio abaixo das barras, complementado por cards de Receita Impactada, Ticket Médio e ROAS. **Porquê:** o Marketing precisa ver onde a cadeia perde eficiência — um card isolado de "Conversas: 20" não diz nada; "Impressões 3.538 → Conversas 20" diz tudo.

#### Solução

Uma plataforma multi-perfil de gerenciamento de anúncios com três experiências distintas dentro do mesmo sistema:

- **Lojistas** criam e acompanham seus próprios anúncios, visualizam seus resultados (engajamento, cliques, receita gerada, ROAS) e são alertados quando têm orçamento disponível não utilizado.
- **Gestores de Tráfego** aprovam ou reprovam anúncios via fila filtrada, monitoram as lojas sob sua responsabilidade e acompanham relatórios táticos de performance.
- **Marketing** acessa o painel consolidado com funil de conversão, gerencia o orçamento mensal por loja com edição inline, e monitora a saúde do portfólio de anúncios de toda a marca.

Todas as telas foram entregues em versão **web e mobile**, com a navegação mobile adaptada ao padrão de uso de cada perfil.

#### Craft & Acessibilidade

- O **banner de alerta de orçamento disponível** no Lojista usa cor âmbar (não vermelho — não é urgência, é oportunidade) e oferece ação imediata "Saiba mais" sem forçar interação.
- Os **cards de anúncio na aprovação** exibem status com badge colorido (laranja "Novo", verde "Ativo") + data de veiculação + orçamento no topo, permitindo leitura do contexto antes de abrir o anúncio.
- O **orçamento editável** na tela de Orçamento usa edição inline ativada por ícone de lápis — o campo abre com o valor atual pré-preenchido e um botão "Confirmar" sem saída da tabela.
- A **navegação mobile** foi redesenhada por perfil: Lojistas têm "Novo" com destaque central na bottom nav (sua ação primária); Gestores têm "Relatórios" como primeiro item.
- ⬜ Decisões de acessibilidade (contraste, foco por teclado) — preencher.

#### Colaboração técnica

Pipeline de pesquisa e design: `entrevistas por perfil → mapeamento de jornadas + benchmarking → arquitetura de informação por papel → wireframes Figma → validações internas → interfaces web + mobile → prototipação → handoff para empresa parceira de tecnologia`. A etapa de arquitetura de informação por papel foi feita antes de qualquer tela — definir quais rotas e módulos existiam para cada perfil foi o que tornou possível desenvolver as interfaces sem retrabalho.

#### Impacto

- **Entrega:** interfaces web e mobile para os três perfis, cobrindo todas as jornadas mapeadas na pesquisa.
- ⬜ Variação de satisfação dos usuários após o redesenho (pesquisa de satisfação pós-lançamento) — preencher.
- ⬜ Redução do tempo médio de aprovação de anúncios — preencher.
- ⬜ Aumento na taxa de uso do orçamento disponível pelos Lojistas — preencher.

#### Aprendizados

O maior risco em projetos multi-perfil é cair na armadilha do "o sistema serve todo mundo" — que na prática significa que não serve ninguém bem. A decisão de definir a arquitetura de informação por papel antes de desenhar qualquer tela foi o que determinou o resultado: cada usuário entrava num produto desenhado para o que ele realmente precisava fazer. **Lição:** quando o produto serve perfis com objetivos radicalmente diferentes, a arquitetura de informação não é um artefato de processo — é a decisão de design mais importante do projeto.

---

## 18. Case — Arezzo&Co · Social Media Ad Management System (EN)

### One system, three journeys: how role-based information architecture unlocked ad management at Arezzo&Co Group

**TL;DR** — UX Researcher, UX Designer, and UI Designer, 3 months. Redesign of the social media ad management system for the Arezzo&Co group, serving three profiles with radically different needs — Marketing, Traffic Managers, and Store Owners — within a single platform with role-adapted information architecture.

**Tags:** Retail · Multi-role · System design · Dashboard · Mobile · Figma

#### Context & Problem

The Arezzo&Co group operates multiple brands (Arezzo, Schutz, and others) with hundreds of physical stores, each with autonomy to create and submit social media ads. The chain involves three actors with distinct goals: the **Store Owner** who creates and tracks their own ads, the **Traffic Manager** who supervises a set of stores and approves the creatives, and the **Marketing** team who monitors consolidated brand performance and manages budgets. The existing system didn't reflect this structure — all profiles accessed the same screens, regardless of what they needed to do.

**Prior state:** a single system with no role differentiation, where Store Owners got lost in corporate metrics and Marketing had no consolidated view without navigating store by store.

#### My role

UX Researcher, UX Designer, and UI Designer responsible for the full project: I conducted interviews with each user profile, mapped the journeys and role-based information architecture, and designed all interfaces — web and mobile — in Figma. The project was built in partnership with a technology company that provided the platform for the group.

#### Constraints

- **Three roles, one system** — the solution couldn't be three separate products; it had to be a coherent platform with differentiated routes and screens per role without exploding maintenance cost.
- **Multi-brand** — the same system served Arezzo, Schutz, and other group brands, requiring visual consistency without losing each brand's identity in relevant contexts.
- **3-month timeline** — tight scope covering research, architecture, design, and prototyping of web + mobile for all profiles.

#### Discovery & Insight

The interviews revealed that the problem wasn't missing functionality — it was **wrong audience**. The system had the right information, but presented it to whoever didn't need it. A Store Owner doesn't need to see the consolidated ROAS of all 165 brand stores; they need to know if their ad was approved and how much of their budget remains. A Traffic Manager doesn't need the Store Owner's submission flow; they need the pending approval queue and performance of the stores they're responsible for. Marketing needs the complete funnel — impressions to sales — for the entire brand.

**The turning point:** the redesign wasn't an interface question. It was an information architecture question: each profile needed a different product within the same platform.

#### Process & Decisions

**1. Role-based information architecture — problem:** a single IA for three profiles forced every user to ignore most of the system. **Options:** preference-based personalization (user chooses what to see — more flexible, more complex to maintain) vs. fixed role-based architecture (routes and screens defined at login — simpler, more appropriate for a corporate context). **Choice:** differentiated information architecture per role, with distinct lateral navigation for each — Marketing (Home, Approvals, Panel, Metrics, Budget, Register, Notifications), Traffic Managers (Home, Reports, Feed, New, Submissions, Notifications), and Store Owners (Home, New, My Submissions, Feed, Notifications). **Why:** each profile's context is mutually exclusive — mixing them on a single screen harms all three.

**2. Home as a contextual control panel — problem:** the home needed to answer different questions for each profile without becoming a generic, useless screen. **Options:** single home with role filters (complex, confusing) vs. three distinct homes optimized for each role's primary task. **Choice:** differentiated homes — Marketing sees consolidated budget, investment distribution (Invested/Provisioned/Remaining), active store performance metrics, and Revenue Impacted; Traffic Managers see the stores they're responsible for, focused on tactical decisions; Store Owners see their available balance, their active ads with inline results, and an alert banner when budget is unused. **Why:** the home is the first screen of every session — it needs to immediately answer each profile's most frequent question without requiring navigation.

**3. Approval workflow with compound filters — problem:** Traffic Managers receive ads from multiple stores simultaneously; without efficient filtering, the approval queue becomes noise. **Options:** linear list with simple search vs. visual grid with compound filters (Store, Status, Budget, Positioning, Archive) and quick-access chips. **Choice:** ad grid with cascading filters — selecting "Status" reveals sub-statuses with counts (New: 5, Approved: 10, Rejected: 2); date, active status, and ordering chips always visible at the top. **Why:** the Traffic Manager needs to prioritize the queue, not just scroll through it — seeing counts by status before filtering allows a decision about where to start.

**4. Funnel metrics for Marketing — problem:** the consolidated performance view needed to communicate not just volume, but conversion between steps — from impression to sale. **Options:** isolated KPI cards (each metric in its own box, no visual relationship between them) vs. funnel visualization with consumer journey stages. **Choice:** visual funnel (Impressions → Engagement → Clicks → Conversations → Sales) with stage numbers below the bars, complemented by Revenue Impacted, Average Ticket, and ROAS cards. **Why:** Marketing needs to see where the chain loses efficiency — an isolated "Conversations: 20" card says nothing; "Impressions 3,538 → Conversations 20" says everything.

#### Solution

A multi-role ad management platform with three distinct experiences within the same system:

- **Store Owners** create and track their own ads, view their results (engagement, clicks, generated revenue, ROAS), and are alerted when they have unused budget available.
- **Traffic Managers** approve or reject ads via a filtered queue, monitor stores under their responsibility, and track tactical performance reports.
- **Marketing** accesses the consolidated panel with a conversion funnel, manages monthly budget per store with inline editing, and monitors the health of the entire brand's ad portfolio.

All screens were delivered in **web and mobile** versions, with mobile navigation adapted to each profile's usage pattern.

#### Craft & Accessibility

- The **available budget alert banner** on the Store Owner view uses amber (not red — it's not urgency, it's opportunity) and offers an immediate "Learn more" action without forcing interaction.
- **Ad cards in the approval queue** display status with a colored badge (orange "New", green "Active") + run dates + budget at the top, allowing context reading before opening the ad.
- The **editable budget** on the Budget screen uses inline editing triggered by a pencil icon — the field opens with the current value pre-filled and a "Confirm" button without leaving the table.
- **Mobile navigation** was redesigned per profile: Store Owners have "New" prominently centered in the bottom nav (their primary action); Traffic Managers have "Reports" as the first item.
- ⬜ Accessibility decisions (contrast, keyboard focus) — to fill.

#### Technical collaboration

Research and design pipeline: `per-profile interviews → journey mapping + benchmarking → role-based information architecture → Figma wireframes → internal validations → web + mobile interfaces → prototyping → handoff to partner technology company`. The role-based information architecture phase was completed before any screen was designed — defining which routes and modules existed per role was what made it possible to develop the interfaces without rework.

#### Impact

- **Delivery:** web and mobile interfaces for all three profiles, covering all journeys mapped in research.
- ⬜ User satisfaction change after the redesign (post-launch satisfaction survey) — to fill.
- ⬜ Reduction in average ad approval time — to fill.
- ⬜ Increase in budget utilization rate among Store Owners — to fill.

#### Learnings

The greatest risk in multi-role projects is falling into the trap of "the system serves everyone" — which in practice means it serves no one well. The decision to define role-based information architecture before drawing any screen was what determined the outcome: each user entered a product designed for what they actually needed to do. **Lesson:** when a product serves profiles with radically different goals, information architecture isn't a process artifact — it's the most important design decision in the project.

---

## 19. Case — Del Valle · Redesign de Site (PT)

> **Nota:** este case usa o template `brand-split` (mesma base do Kapo) e o campo `bodyManifesto: true` (default) — diferente do Kapo, aqui a tese do hero e a tese do corpo são textos distintos (convenção normal do site), então o corpo mantém o H2 de manifesto. Fonte viva: `src/content/cases/pt/del-valle-website.md`.

**Resumo** — UX e UI Designer, 1 mês. Redesign de três páginas do site Del Valle (Coca-Cola) — Home, Fruta toda hora e Nossos Produtos — traduzindo uma nova identidade visual global (definida por outra equipe) em wireframes e interfaces web e mobile.

#### Contexto & Problema

A Del Valle lançou uma nova identidade visual global com nova paleta, sistema tipográfico e linguagem gráfica. O site existente usava a identidade anterior e precisava ser atualizado para refletir a nova campanha "Cheio de vida" — que reposicionava a marca com ênfase na origem brasileira das frutas e na conexão emocional entre produto e família. O desafio não era criar uma identidade do zero: era traduzir fielmente uma campanha rica em personalidade para um site funcional.

O autor entrou como UX e UI Designer responsável pela tradução dessa identidade em produto — único designer dentro de um time de desenvolvedores — estudando o manual de identidade e as referências da campanha, definindo a arquitetura de informação, e desenvolvendo wireframes e interfaces (web e mobile) em Figma ao longo de 1 mês. Três páginas de conteúdo entregues: Home, "Fruta toda hora" e "Nossos Produtos" (esta última linkando pra Loja externa).

**Estado anterior:** site com a identidade anterior, desconectado visualmente da nova campanha.

#### Descoberta & Insight

O manual de identidade trazia formas orgânicas, paleta de cores associada a cada fruta e um posicionamento centrado na origem brasileira. A campanha queria comunicar sensorialidade — cheiro, frescor, sabor — por um meio que não oferece nenhuma dessas experiências diretamente. A resposta estava nas próprias frutas: usá-las como protagonistas visuais em escala real, deixando as formas orgânicas irregulares refletirem a imperfeição natural do produto.

#### Processo & Decisões

O sitemap ficou simples de propósito — só três páginas de conteúdo, com a Loja tratada como destino externo. Dali pro wireframe foi direto, com web/tablet/mobile nascendo juntos, não em sequência.

A parte mais difícil do mês não foi nenhuma decisão de tela — foi o ritmo: criação, validação técnica com devs e validação com stakeholders da marca precisavam acontecer quase em paralelo pra caber no prazo. Vale registrar o que **não** foi decisão do autor: a divisão de conteúdo entre as três páginas já vinha definida, e a escolha de qual hero mostra produto e qual mostra lifestyle veio do cliente.

De fora, um rebranding costuma ser visto como reskin. Mas é exatamente esse tipo de projeto que abre uma brecha pra um designer sênior mexer em atrito que ninguém está olhando — aqui isso apareceu de um jeito pequeno e concreto: a Loja (link externo) foi desenhada como botão com contorno e ícone de carrinho, diferente dos outros itens de menu, sinalizando a saída do site antes do clique.

**Grade alternada com carrossel de 4 dimensões — problema:** cada fruta tem múltiplas dimensões de informação (origem, produtores, safra, curiosidade). **Escolha:** grade alternada — cada fruta com uma célula de foto em tela cheia e uma célula de card branco que gira por 4 dimensões, com ícone ilustrado e pontos de navegação. **Porquê:** o carrossel convida à exploração sem forçar leitura.

#### Solução & Craft

Três páginas com sistema visual unificado: **Home** (hero com lineup de embalagens + seção-teaser "Fruta toda hora" + seção "Da nossa família"), **Fruta toda hora** (hero de lifestyle + seção institucional + grade de exploração de frutas), **Nossos Produtos** (catálogo com link pra Loja externa). Manchas orgânicas sempre parcialmente cortadas pela borda da tela; frutas reais recortadas sobre manchas de cor correspondente; CTAs seguem lógica de contraste por seção.

#### Aprendizados

O maior aprendizado do mês foi entender que diretrizes claras aceleram, não travam — com o manual de identidade já definido, o trabalho vira estruturar hierarquia e fluxo em cima de uma base já validada, não debater cor. A outra coisa que ficou foi o peso da escala: Del Valle é uma marca com 77 anos em mais de 100 mercados, e cada decisão de wireframe rodaria dentro dessa identidade em nível nacional.

---

## 20. Case — Del Valle · Website Redesign (EN)

> **Note:** mirrors section 19 — see that note for the `brand-split` / `bodyManifesto: true` detail. Live source: `src/content/cases/en/del-valle-website.md`.

---

## 21. Case — Hypera Pharma · Gerenciador de Verbas (PT)

> **Nota:** este case usa o template `brand-split` (hero em duas zonas + coluna de conteúdo) em vez do template-mestre de 6 seções com rótulos padrão — ver seção 8 para o schema atual (`scope`/`duration`). Fonte viva: `src/content/cases/pt/hypera-hypergestor.md`.

### Do orçamento à comprovação: como transformei o ciclo de verbas de trade marketing da Hypera Pharma em um pipeline rastreável

**Resumo** — UX e UI Designer, 2 meses. Criação do Gerenciador de Verbas, sistema interno de gerenciamento de orçamentos e verbas para ações de trade marketing da Hypera Pharma — centralizando em um único pipeline o fluxo que ia de planilhas distribuídas pela companhia até a comprovação com integração SAP/SEV.

#### Contexto & Problema

A Hypera Pharma gerencia investimentos em trade marketing em larga escala — verbas que partem de orçamentos corporativos, são distribuídas por hierarquia de vendas (região → escritório → equipe → supervisor → vendedor) e precisam ser comprovadas com evidências para integrarem o SAP. Sem um sistema centralizado, cada etapa desse ciclo acontecia de forma isolada.

**Estado anterior:** planilhas distribuídas pela companhia, sem visibilidade de ponta a ponta do ciclo de trade marketing.

Do escopo mapeado nesses 2 meses, três módulos chegaram a ser de fato construídos nesse ciclo — Cadastro de Empresa, Apuração e Comprovação de Verbas e Aprovação de Integração com o SAP. Parametrização, login/SSO e relatórios ficaram mapeados, mas fora do build inicial.

#### Meu papel

UX e UI Designer responsável pelo design do Gerenciador de Verbas: mapeei as jornadas de cada perfil de usuário envolvido no ciclo (Administrador, Diretor, Gerente, Supervisor, Planejador BU, Key User), defini a arquitetura de informação, projetei interfaces e protótipos em Figma, e trabalhei em colaboração com a equipe de desenvolvimento no Azure.

#### Descoberta & Insight

O mapeamento das jornadas revelou que o problema não era nenhuma etapa em isolado — era a **ausência de um ciclo conectado**. Uma matriz de responsabilidades (14 ações × 6 perfis) e uma matriz de descoberta de features (6 perfis × 4 metas do produto) revelaram quais combinações perfil × meta realmente existiam — e representam o "todo" do produto mapeado, do qual só uma fatia foi construída.

**A virada:** o Gerenciador de Verbas não precisava ser uma coleção de formulários. Precisava ser um **pipeline** — cada etapa alimentando a próxima, com rastreabilidade de ponta a ponta.

#### Processo & Decisões

**1. Modal vs. página dedicada para cadastro de empresa — problema:** o cadastro de empresa (distribuidor, farmácia, etc.) tinha muitos campos — ID, SAP_ID, CRM_ID, CNPJ, status, tipo, endereço; abrir em página nova perdia o contexto da listagem. **Escolha:** modal persistente sobre a listagem para criação e edição. **Porquê:** o usuário frequentemente precisa consultar outras empresas da lista enquanto cadastra uma nova.

**2. Checkpoint de integração SAP/SEV — problema:** a comprovação de verbas alimenta diretamente o SAP; um dado incorreto ou incompleto nessa etapa tem impacto financeiro real. **Escolha:** campo "Pode ser liberada para aprovação da integração?" com padrão "Não" — o usuário precisa marcar "Sim" conscientemente para liberar a verba para o SAP. Depois de liberada, a verba passa por uma etapa final de aprovação/rejeição antes de integrar o SAP de fato. **Porquê:** o gate de confirmação cria um momento deliberado de revisão antes do ponto de não retorno.

#### Solução

Do ciclo completo mapeado, três módulos chegaram a produção nesse ciclo de 2 meses:

- **Cadastro de Empresa** — CRUD de empresas (Distribuidor, Farmácia, etc.), com campos de identificação, status, tipo e endereço.
- **Apuração e Comprovação de Verbas** — registro do valor apurado, upload de evidências (xlsx, txt, pdf, jpeg) e gate de liberação para integração SAP/SEV.
- **Aprovação de Integração com o SAP** — etapa final de aprovação ou rejeição de cada verba antes da integração de fato com o SAP.

#### Craft & Acessibilidade

- O **breadcrumb** no topo de cada tela orienta o usuário dentro da hierarquia do sistema sem depender da memória de onde ele está.
- O **ícone de clipe com badge numérico** na coluna de Anexos comunica a presença de evidências sem precisar abrir o item — decisão de velocidade de scan, e o badge numérico comunica isso via dois canais (ícone + número) sem depender de cor (WCAG 1.4.1).
- O **campo "Valor apurado"** é separado do "Valor Planejado" exibido em modo somente leitura — o usuário vê o planejado enquanto preenche o apurado, criando a comparação no mesmo contexto.

#### Colaboração técnica

Pipeline de design: `benchmarking + mapeamento de jornadas por perfil → arquitetura de informação → wireframes Figma → validações internas → interfaces finais → protótipo navegável → handoff para desenvolvimento (Azure)`.

#### Aprendizados

Entreguei três módulos do ciclo mapeado — a fatia que efetivamente chegou a produção nesses 2 meses, de um sistema desenhado para cobrir orçamento, distribuição de verbas e aprovações em cascata de ponta a ponta. O maior desafio foi transformar planilhas dispersas por toda a companhia em um sistema único e coerente. Trabalhar com um sistema corporativo integrado ao SAP ensinou que funcional e amigável precisam coexistir — cada campo tem peso financeiro real, então a interface precisa guiar sem parecer burocrática. **Lição:** em sistemas com integração financeira, o design de fluxo precisa saber onde colocar atrito de propósito — não todo clique deve ser rápido.

---

## 22. Case — Hypera Pharma · Gerenciador de Verbas (EN)

> **Note:** mirrors section 21 — see that note for the `brand-split` detail. Live source: `src/content/cases/en/hypera-hypergestor.md`.

---

## 23. Case — Del Valle Kapo · Redesign de Site (PT)

> **Nota:** este case usa o template `brand-split` (hero em duas zonas + coluna de conteúdo em 1160px) em vez do template-mestre de 6 seções com rótulos padrão — ver seção 8 para o schema atual (`scope`/`duration`). Fonte viva: `src/content/cases/pt/del-valle-kapo.md`.

**Resumo**: para o terceiro trimestre de 2022 a Kapo, marca líder de sucos infantis da Coca-Cola, buscava seguir em seu esforço de construção de posicionamento focado em ser a companha perfeita para as pausas das crianças com seus pais e avós a partir do conceito "Toda Brincadeira gera Frutos" e buscou a CWI, por meio do seu núcleo de desenvolvimento responsável por Coca-Cola, para a reformulação do principal site da marca, além de um site especial para a campanha "Sempre Criança Challenge", responsável por estimular o registro de brincadeiras lúdicas por meio de premiações especiais.

#### CONTEXTO

O Del Valle Kapo é um produto voltado para crianças e famílias, com um posicionamento de marca que vai além do suco: a campanha "Sempre Criança" posiciona a marca como promotora de brincadeiras e da infância. O site kapo.com.br precisava ser redesenhado para a nova campanha de Dia das Crianças 2022 — mas o escopo ia além de atualizar cores e imagens. Era necessário decidir quais páginas o site deveria ter após o redesign, em alinhamento com a nova campanha e a promoção que estava por vir.

Como parte da CWI, o autor participou do projeto como UX, UI e Visual Designer responsável pelo projeto completo — único designer dentro de um time de desenvolvedores — utilizando materiais base das campanhas "Sempre Criança 2.0" e "Sempre Criança Challenge" para orientar decisões de arquitetura de informação, referenciando as nuances da nova identidade visual da campanha, criando ilustrações e elementos gráficos, e desenvolvendo todas as interfaces (web e mobile) em Figma, Photoshop e Illustrator ao longo de 3 meses.

A campanha "Sempre Criança 2.0", apesar de vir com assets, paleta e tom de voz pré-definidos, tinha liberdade criativa para uma tradução digital para além da criação da identidade, pois o site precisava servir tanto crianças que navegam em busca de brincadeiras quanto pais e avós que compram o produto e participam de promoções, o que exigia que a hierarquia de conteúdo servisse às duas jornadas ao mesmo tempo.

O segundo site do projeto é o microsite da campanha "Sempre Criança Challenge": mecânica de 3 passos (gravar um vídeo brincando em família, postar no Instagram com a hashtag, concorrer a R$ 500 por semana), com prêmios, regulamento e lista de ganhadores por semana.

#### Descoberta & Insight

O comportamento das personas revelou algo que a campanha original não previa: a seção "Hora de Brincar" — o repositório de brincadeiras do site — não era conteúdo de apoio, era o que as famílias realmente vinham buscar. Fernanda decide em segundos, Theo reconhece cor e forma antes de saber ler, Sônia quer participar sem se perder no caminho — nenhuma das três chega ao site pensando primeiro em comprar suco.

**A virada:** o Kapo já tinha construído, sem perceber, um produto digital real dentro do site institucional. O redesign precisava reconhecer isso e elevar a "Hora de Brincar" à sua posição real de destaque.

#### Processo & Decisões

**1. Arquitetura de informação orientada pelo uso real — problema:** o site anterior tinha múltiplas páginas, e a decisão de o que manter ou descartar no redesign era subjetiva. **Opções:** manter tudo por segurança (sem custo de decisão, site mais complexo) vs. cortar com base em como as pessoas realmente usavam o site. **Escolha:** priorizar as seções com maior engajamento observado, eliminando as sem relevância real e elevando "Hora de Brincar" na hierarquia de navegação. A estrutura resultante: Home → Promoção (Sempre Criança Challenge) → Sempre Criança (Vídeo) → Hora de Brincar (repositório de atividades, com as 5 categorias temáticas) → Nossos Produtos → Compre Agora. **Porquê:** arquitetura de informação baseada em comportamento real é mais honesta — e mais eficiente — do que intuição sobre o que "deve" estar no site.

**2. Hora de Brincar como sistema de conteúdo estruturado — problema:** o repositório de brincadeiras tinha dezenas de atividades de tipos muito diferentes. Sem organização, era uma lista indiferenciada. **Opções:** listagem simples com busca textual vs. sistema de categorias por perfil de brincadeira com filtros por idade e número de participantes. **Escolha:** 5 categorias temáticas com identidade visual própria (Imaginação Divertida, Saindo do Sofá, Aprender Brincando, Ritmo de Brincadeira, Hora do Jogo), cada uma com filtros de Idade (a partir de 3, 4, 5, 6, 7, 8 anos) e Participantes (duplas até 4 ou mais). **Porquê:** uma brincadeira para 2 pessoas de 4 anos é completamente diferente de uma para grupos de 8 anos — sem filtros, a biblioteca é inutilizável para quem tem uma necessidade específica. Um benchmark ilustrativo (não pesquisa de mercado formal) comparando o Kapo a sites similares reforçou essa escolha: estrutura por categorias e seletor personalizado apareciam como diferenciais reais.

**3. Página de brincadeira no formato de ficha — problema:** cada atividade tinha materiais necessários e instruções de como fazer — o mesmo problema de qualquer receita. **Opções:** texto corrido vs. ficha estruturada com metadados no topo (participantes, faixa etária, duração) + seções fixas (Material necessário / Como brincar). **Escolha:** ficha de atividade com os metadados no topo em destaque, seções tipografadas com cores da categoria, ícones de Compartilhar / Imprimir / Download no topo e produto Kapo contextualizado ao final. **Porquê:** o pai ou a mãe que abre a página quer ver rapidamente se aquela atividade funciona pros filhos (participantes, idade) antes de ler qualquer instrução.

**4. Dois seletores, uma mesma linguagem de seleção de personagem — problema:** a versão inicial do seletor de produto era uma grade simples de 5 sabores em círculos, todos visíveis — genérica demais para um produto que se posiciona como "mais plataforma de brincadeiras do que site de produto". **Escolha:** carrossel centrado no estilo de seleção de personagem de videogame — sabor ativo no centro, colorido e maior; os outros dessaturados e menores nos lados. O mesmo padrão reaparece no microsite, na seção "Inspirações Incríveis": escolher um sabor ali sugere uma brincadeira em família, em vez de levar direto pra compra — a mesma interação reaproveitada pra um objetivo diferente. **Porquê:** a metáfora de videogame é familiar ao público infantil e ao adulto que a reconhece como padrão de seletor de avatar.

#### Solução & Craft

Site redesenhado com 6 seções principais e uma plataforma de brincadeiras estruturada:

- **Home:** hero com campanha "Com Kapo, toda brincadeira gera frutos" + transições em forma de recorte de papel para as seções seguintes.
- **Promoção (Sempre Criança Challenge):** hub de entrada da promoção, com prêmios semanais e regulamento, conectando ao microsite dedicado.
- **Sempre Criança (Vídeo):** seção de campanha com vídeo YouTube incorporado, quiz de "perfil criança" e CTA de engajamento.
- **Hora de Brincar:** repositório de 60 brincadeiras mapeadas em 5 categorias temáticas, cada uma com cor e identidade própria.
- **Nossos Produtos:** seletor de sabor no estilo videogame com link para e-commerces parceiros.
- Versão mobile completa para todas as páginas.

A transição entre seções usa bordas onduladas em forma de papel recortado, evocando diretamente a brincadeira de recorte do início ao fim da página. Os títulos de seção usam tratamento pintado à mão com splash de tinta, coerente com a linguagem manuscrita da identidade Kapo. Cada categoria da Hora de Brincar tem cor de background, ícone ilustrado e tratamento tipográfico próprios. No seletor de produto, a dessaturação dos sabores não-ativos comunica "disponível mas não selecionado" sem texto; o ícone de tesoura decorativo na hero ancora a metáfora de recorte desde o primeiro segundo.

#### Aprendizados

O autor entrou no projeto com a identidade já fechada — paleta, mascotes, tom de voz e o conceito "Toda Brincadeira gera Frutos" vinham prontos da campanha antes do desenho da primeira tela. Isso muda o tipo de decisão que cabe ao designer: não é criar uma identidade, é traduzir uma identidade pensada pra embalagem e pra vídeo pra dentro da gramática de um site, sem virar uma colagem de assets soltos. O recorte de papel foi a saída encontrada: em vez de inventar uma metáfora nova pra transição entre seções, reaproveitar um elemento que já existia na campanha e transformá-lo em sistema.

Sendo o único designer dentro de um time de desenvolvedores, boa parte do trabalho não era desenhar telas isoladas — era deixar a especificação (cor por categoria, comportamento do carrossel, estados do filtro) clara o suficiente pra ser implementada sem o designer do lado do dev o tempo todo. **Lição:** traduzir marca em produto digital é um exercício diferente de criar uma identidade do zero — o julgamento está em saber o que manter literal (paleta, mascote, voz) e o que precisa ganhar uma camada de interação pra funcionar como site, e não como um anúncio mais longo.

---

## 24. Case — Del Valle Kapo · Website Redesign (EN)

> **Note:** this case uses the `brand-split` template (two-zone hero + 1160px content column) instead of the 6-section master template with standard labels — see section 8 for the current schema (`scope`/`duration`). Live source: `src/content/cases/en/del-valle-kapo.md`.

**Summary**: for Q3 2022, Kapo — Coca-Cola's leading kids' juice brand — was continuing to build a brand position around being the perfect companion for kids' downtime with their parents and grandparents, under the concept "Toda Brincadeira gera Frutos" (Every Playtime Bears Fruit). The brand brought in CWI, through its Coca-Cola development unit, to redesign the brand's main site, plus a dedicated site for the "Sempre Criança Challenge" campaign, built to drive user-generated play videos through weekly prizes.

#### CONTEXT

Del Valle Kapo is a product aimed at children and families, with a brand positioning that goes beyond juice: the "Sempre Criança" (Always a Child) campaign positions the brand as a promoter of play and childhood. The kapo.com.br site needed to be redesigned for the new Children's Day 2022 campaign — but the scope went beyond updating colors and images. It required deciding which pages the site should have after the redesign, in line with the new campaign and the upcoming promotion.

As part of CWI, the author joined the project as UX, UI, and Visual Designer responsible for the full project — the only designer inside a team of developers — using the "Sempre Criança 2.0" and "Sempre Criança Challenge" campaign materials to guide information architecture decisions, referencing the nuances of the new campaign visual identity, creating illustrations and graphic elements, and developing all interfaces (web and mobile) in Figma, Photoshop, and Illustrator over 3 months.

The "Sempre Criança 2.0" campaign came with pre-defined assets, palette, and tone of voice, but had creative freedom for the digital translation itself, since the site had to serve both children browsing for activities and parents and grandparents buying the product and joining promotions.

The project's second site is the "Sempre Criança Challenge" campaign microsite: a 3-step mechanic (record a video playing as a family, post it on Instagram with the hashtag, compete for R$500 every week), with prizes, rules, and a weekly winners list.

#### Discovery & Insight

The personas' behavior revealed something the original campaign hadn't anticipated: the "Hora de Brincar" (Playtime) section — the site's activity repository — wasn't supporting content, it was what families actually came looking for. Fernanda decides in seconds, Theo recognizes color and shape before he can read, Sônia wants to join in without getting lost — none of the three land on the site thinking about buying juice first.

**The turning point:** Kapo had unknowingly built a real digital product inside its institutional site. The redesign needed to recognize this and elevate "Hora de Brincar" to its actual position of prominence.

#### Process & Decisions

**1. Information architecture driven by real usage — problem:** the previous site had multiple pages, and the decision of what to keep or cut was subjective. **Choice:** prioritize the sections with the highest observed engagement, dropping those with no real relevance. Resulting structure: Home → Promoção (Sempre Criança Challenge) → Sempre Criança (Video) → Hora de Brincar (with its 5 thematic categories) → Nossos Produtos → Compre Agora. **Why:** information architecture based on real behavior is more honest — and more effective — than intuition about what "should" be on the site.

**2. Hora de Brincar as a structured content system — problem:** dozens of very different activities with no organization. **Choice:** 5 thematic categories with distinct visual identity, each with Age and Participant filters. **Why:** an activity for 2 people aged 4 is completely different from one for groups of 8-year-olds. An illustrative benchmark (not formal market research) against similar sites reinforced this: category structure and the personalized selector showed up as real differentiators.

**3. Activity page as a structured card — problem:** each activity had materials and step-by-step instructions — the same problem as any recipe. **Choice:** activity card with metadata prominently at the top, typographically styled sections in category colors. **Why:** the parent opening the page wants to quickly see if that activity works for their kids before reading any instruction.

**4. Two selectors, one character-selection language — problem:** the first product selector version was a simple grid — too generic for a product positioning as "more play platform than product site." **Choice:** a centered carousel in the style of a video game character selector. The same pattern reappears on the campaign microsite, in "Inspirações Incríveis": picking a flavor there suggests a family activity instead of leading straight to purchase — the same interaction reused for a different goal. **Why:** the video game metaphor is familiar to kids and reads to adults as an avatar-selector pattern.

#### Solution & Craft

Redesigned site with 6 main sections: Home, Promoção (Sempre Criança Challenge), Sempre Criança (Video), Hora de Brincar (60 mapped activities across 5 thematic categories), Nossos Produtos, and a complete mobile version. Section transitions use wavy cut-paper edges throughout; section titles use a hand-painted treatment with a brush-stroke background; each Hora de Brincar category has its own color, icon, and typographic treatment; the product selector's desaturation communicates "available but not selected" without text; a decorative scissors icon in the hero anchors the cut-paper metaphor from the first second.

#### Learnings

The author came into this project with the identity already locked — palette, mascots, tone of voice, and the "Toda Brincadeira gera Frutos" concept were ready from the campaign before the first screen was drawn. That changes the kind of decision that falls to the designer: not creating an identity, but translating one built for packaging and video into the grammar of a website. The cut-paper motif was the way out: reusing an element that already existed in the campaign instead of inventing a new metaphor.

Being the only designer inside a team of developers, a good part of the work was making the spec (color per category, carousel behavior, filter states) clear enough to implement without being next to the dev the whole time. **Lesson:** translating a brand into a digital product is a different exercise from creating an identity from scratch — the judgment call is in knowing what to keep literal and what needs a layer of interaction to work as a site, rather than as a longer ad.
