---
title: "Job Analysis"
slug: jobanalysis-case-study
role: "Product Designer, projeto solo, em andamento desde jun/2026"
summary: "Uma ferramenta de agentes de IA que audita a aderência do meu próprio portfólio contra vagas reais — e que, neste mês, precisou passar pela mesma auditoria."
thesis: "Eu desenho produtos de IA que precisam conquistar a confiança de estranhos. A versão mais difícil desse problema era conquistar a minha própria."
company: "Projeto pessoal"
year: 2026
accent: "#eef2ff"
template: enterprise
tags: ["AI & Automation", "Projetos Pessoais"]
metrics:
  - label: "Vagas analisadas"
    value: "55"
  - label: "Score médio de aderência"
    value: "57%"
  - label: "Bug estrutural de sincronia eliminado"
    value: "1 (repetido 2×)"
featured: false
draft: true
protected: false
---

## A ferramenta que avalia meu portfólio também precisou ser avaliada

**Resumo** — Projeto solo, em andamento desde junho de 2026. Um pipeline de dois agentes que pontua a aderência do meu portfólio contra vagas reais usando uma rubrica ponderada de Person-Job Fit, em vez de eu julgar cada uma no olho. Construído pra tirar o achismo da minha própria busca de emprego — e que, no processo de escrever este case, revelou um gap de governança na própria ferramenta que eu já tinha deixado passar duas vezes.

---

## Contexto & Problema

Em agosto de 2026 a planilha parou de funcionar. O que começou com 11 vagas em junho virou dezenas em setembro — 55 até eu escrever este case — e revisar cada uma manualmente significava reler os próprios cases toda vez, tentando lembrar se o discovery do Enterprise AI realmente cobria "teste de usabilidade estruturado" ou só passava perto disso.

Eu desenho produtos de IA para os fluxos de contratação e suporte de outras empresas — o Enterprise AI Assistant é um case inteiro sobre tornar o raciocínio de uma IA legível o suficiente pra ser confiável. Eu não tinha aplicado essa mesma disciplina no meu próprio funil de contratação. Então construí um pipeline: cola a vaga, recebe um score ponderado contra uma rubrica fixa, recebe os gaps específicos que estão custando pontos, recebe um motivo provável se depois eu for recusado. Não é uma checagem de vibe. É repetível.

**Estado anterior:** uma planilha de vagas e um feeling de aderência que não sobreviveu ao contato com a quinta JD confidencial de enterprise seguida.

---

## Orquestração de Agentes

O sistema não é uma IA fazendo tudo — são dois modelos com papéis deliberadamente estreitos, mais uma camada que não é IA nenhuma. É o mesmo padrão de governança que eu já tinha construído nos quatro agentes de treino do Painel Saúde: cada um propõe dentro de um limite fixo, nenhum deles tem autoridade unilateral.

| Agente | Papel | O que NÃO pode fazer |
|---|---|---|
| **Groq** (`gpt-oss-120b`) | Extrai a JD colada em JSON estruturado — empresa, requisitos, diferenciais | Nunca pontua nada. Não sabe o que "boa aderência" significa. |
| **Claude** (`claude-sonnet-4-6`) | Lê os requisitos estruturados contra todo o histórico dos meus cases, raciocina sobre evidência, escreve a análise qualitativa | Não faz aritmética. Os subtotais que ele escreve são placeholders — o servidor os ignora |
| **Servidor** (determinístico) | Recalcula todo score e subtotal direto das tabelas da rubrica, vira a única fonte de verdade | Nunca julga qualidade — não sabe distinguir um case forte de um fraco, só soma número certo |

Não desenhei assim de primeira. No início, deixava o Claude escrever a porcentagem final direto. Funcionava até uma vaga com catorze requisitos gerar um subtotal que não batia com a tabela logo acima dele — um erro de arredondamento, não uma alucinação, mas o suficiente pra eu desconfiar de todo score que a ferramenta já tinha produzido. Se a única coisa que essa ferramenta precisa ser é objetiva, eu não podia deixar um modelo de linguagem dono da matemática.

![Diagrama de orquestração de três agentes: Groq extrai o JSON, Claude raciocina sobre aderência, o servidor recalcula a matemática de forma determinística — cada bloco lista seu papel e o que ele explicitamente não pode fazer](/cases/jobanalysis-case-study/agent-orchestration.svg)

---

## Opportunity Solution Tree

**Outcome:** conseguir uma entrevista numa empresa onde os gaps reais do meu portfólio não seriam surpresa pra nenhum dos dois lados.

**Oportunidades:**
- Saber *antes* de me candidatar se um gap é corrigível num fim de semana ou é estrutural — em vez de descobrir pelo silêncio três semanas depois
- Parar de reler os 9 cases de memória toda vez que uma JD nova parece com uma que eu já perdi

**Soluções cogitadas:**
- *Manter a planilha, só organizar melhor* — descartada. Uma planilha não consegue raciocinar se "discovery com Clarity" conta como evidência pra "teste de usabilidade estruturado". Isso é julgamento, não busca.
- *Pedir pra um designer amigo revisar cada JD* — descartada. Não escala além de duas ou três vagas por semana, e é exatamente o tipo de cruzamento repetitivo de evidência que um modelo foi feito pra fazer.
- *Pipeline de dois agentes com camada de score determinística* — a que construí.

**Premissa mais arriscada a testar:** que um modelo de linguagem conseguiria aplicar a mesma rubrica 0–3 de forma consistente em dezenas de vagas sem relação entre si, sem derivar silenciosamente pra scores mais lisonjeiros com o tempo.

---

## Pipeline & Modos de Falha

O caminho feliz é curto: cola a JD → Groq extrai estrutura → Claude pontua e escreve a análise → servidor recalcula a matemática → um arquivo Markdown é gravado em `Bench_job_applications/` → o índice atualiza.

![Flowchart do pipeline: caminho feliz de 6 passos, da JD colada até o índice atualizar, com 3 ramos de erro documentados pendurados nos passos onde de fato foram pegos — entrada incompleta, resposta truncada e colisão de slug](/cases/jobanalysis-case-study/pipeline-flowchart.svg)

- **Entrada incompleta, saída confiante.** Em setembro uma JD não colou direito. O Groq mesmo assim produziu um JSON plausível a partir do fragmento que recebeu. O Claude pontuou 95% — o maior de todo o bench — contra requisitos que eram genéricos porque a fonte era genérica. Nada no pipeline sinalizou que estava errado; parecia minha vaga de melhor aderência até então. Só percebi porque o nome da empresa batia com uma vaga que eu já tinha analisado direito, com 56%. O conserto não foi uma mudança de código — é uma regra permanente agora: um score suspeitosamente alto sem JD arquivada é tratado como dado corrompido, não como boa notícia.
- **Duas versões, uma verdade.** Reanalisar uma vaga que eu já tinha pontuado não sobrescreve o arquivo — salva um segundo com sufixo de timestamp, pra um status "Candidatura enviada" atualizado manualmente nunca ser apagado silenciosamente por uma reanálise. Eu reconcilio isso à mão, mantendo o conteúdo mais recente sob o nome de arquivo limpo.
- **Truncado antes da linha de chegada.** Uma vaga com uma lista de requisitos incomumente longa uma vez gerou uma resposta do Claude cortada no meio do JSON, antes do metadado que o servidor precisava pra parsear o resultado. O erro que o usuário via era um genérico "formato inesperado" — nada útil pra descobrir o motivo. Aumentei o teto de tokens e adicionei uma linha de log específica pra essa falha, pra a próxima ser diagnosticável em segundos, não minutos de chute.

---

## Service Blueprint

| | Front-stage (o que eu vejo) | Back-stage (o que faz funcionar) |
|---|---|---|
| **Revisando um score** | Um card com score, gaps e uma pill de status | A página lê todo arquivo `.md` da pasta na hora, a cada requisição — sem banco de dados, sem cache |
| **Marcando uma recusa** | Um card com borda vermelha e um callout "Motivo provável" | Esse campo nunca é escrito automaticamente — eu preciso pedir a análise explicitamente antes de considerar completo |
| **Editando status de candidatura** | Um modal, um dropdown, um botão de salvar | Só funciona quando estou rodando o app na minha própria máquina — o filesystem da plataforma de hospedagem é somente-leitura, então em produção o mesmo botão silenciosamente não faz nada |
| **Confiar no score, no fim das contas** | Uma única porcentagem | Depende de uma variável de ambiente ser lida de um jeito que não pode congelar no valor errado em tempo de build — exatamente a classe de bug que uma vez deixou duas páginas de case confidenciais no ar sem checar senha |

---

## Decision Log

| Decisão | Alternativa cogitada | Por que não |
|---|---|---|
| Servidor recalcula todo score a partir das tabelas da rubrica; o modelo só raciocina | Deixar o Claude escrever a porcentagem final | Um desvio de arredondamento numa JD de 14 requisitos comprometeu a confiança em todo score que a ferramenta já tinha produzido |
| "Motivo da recusa" só é escrito quando eu peço | Gerar o motivo automaticamente no momento em que o status vira Recusado | Quero que a leitura causal seja autoral de propósito — um modelo não estava na sala na hora da recusa de verdade, eu estava |
| Reanálise que colide com arquivo existente mantém o conteúdo mais novo, descarta a duplicata com timestamp | Sobrescrever o arquivo antigo na hora | Apagaria silenciosamente um status "Candidatura enviada" que eu já tinha atualizado à mão |
| A tabela "Gaps transversais" é lida ao vivo do arquivo de índice, não duplicada no código da página | Manter uma segunda cópia na página e lembrar de atualizar as duas | Eu já tinha esquecido de atualizar as duas vezes — uma delas faltando uma linha inteira, sem ninguém notar por semanas |

---

## Mapa de Risco & Premissas

**Premissa mais arriscada:** um LLM consegue manter uma rubrica fixa de 0–3 estável em dezenas de vagas sem relação entre si, sem derivar.
*Mitigação:* o modelo nunca toca na aritmética — desvio de julgamento não vira desvio de número. E toda análise nova passa por uma leitura manual contra a JD original antes de eu considerar válida, que foi exatamente como o caso do 95%-sem-JD foi pego.

**Segunda premissa mais arriscada:** que um designer avaliando o próprio trabalho com a própria ferramenta não afrouxaria a rubrica até ela ficar lisonjeira.
*Mitigação:* a matemática do score vive inteiramente no servidor, intocada por qualquer julgamento de conteúdo. Se eu quisesse inflar um score, teria que mudar código, não só um sentimento — o que é uma coisa bem mais difícil de fazer silenciosamente.

---

## Solução & Craft

*⬜ Screenshots a capturar: a grade de cards com tags de score/status/gap, o expander "Ver análise" com o breakdown de duas barras (obrigatórios ×2, preferidos ×1), o card de recusa com o callout vermelho "Motivo provável", os filtros pill de status e faixa de aderência.*

A interface é propositalmente simples — isso nunca foi pra ser mostrado a ninguém além de mim, o que virou um teste útil de saber se um bom design de informação se sustenta sem uma audiência pra performar. As faixas de score usam cor só como segundo sinal, nunca como o único: o texto sempre diz "Aderência parcial", a cor é decoração.

---

## De um arquivo único a um índice vivo

A ferramenta passou por três estágios estruturais reais, documentados no próprio changelog do projeto em vez de reconstruídos de memória:

**Estágio 1 — um arquivo único.** `BENCHMARK.md` guardava a análise de toda vaga como um documento longo só. Funcionou até eu precisar ordenar por score ou filtrar por status, e reescrever o arquivo inteiro à mão pra uma atualização parou de ser sustentável.

**Estágio 2 — um arquivo por vaga, um índice.** `Bench_job_applications/_index.md` virou a tabela ranqueada; cada vaga ganhou seu próprio `.md` com a análise completa. Isso escalou — até o próprio código da página manter uma segunda versão, copiada à mão, da tabela "Gaps transversais" pra sua UI, e as duas silenciosamente divergirem duas vezes.

**Estágio 3 — uma fonte só, lida ao vivo.**

```diff
- const gaps = [
-   { gap: 'Métricas de impacto', impacto: 'Alto', vagas: 'Todas', acao: '...' },
-   { gap: 'Artefatos visíveis',  impacto: 'Alto', vagas: 'Todas', acao: '...' },
-   { gap: 'Acessibilidade',      impacto: 'Médio–alto', vagas: 'SAP, BTG, Boticário', acao: '...' },
-   { gap: 'UX Research estruturado', impacto: 'Médio', vagas: 'C&A, SAP, ADP, Itaú', acao: '...' },
- ];
+ const gaps = parseGapsTransversais(benchDir);
```

A segunda versão não é melhor por ser mais curta. É melhor porque estruturalmente só sobrou um lugar pra estar errado.

---

## Resultados

- **55 vagas pontuadas** contra a mesma rubrica fixa — subindo de 11 em junho, um ritmo que eu não sustentaria à mão.
- **3 análises completas estavam órfãs** do índice ranqueado antes desta revisão pegar isso — invisíveis pra ferramenta que existe pra tornar gaps visíveis.
- **O gap de "UX Research" estava subcontado em 4 vagas quando eram 22** — a auditoria que corrigiu o bug de sincronia também corrigiu o número em si, que estava silenciosamente errado por mais tempo do que o próprio bug de sincronia existia.
- Uma classe de bug — dado copiado à mão ficando desatualizado — agora é estruturalmente impossível pra essa tabela específica, porque só sobrou uma cópia dela.

Não estou contando "consegui uma entrevista" aqui. Ainda não tenho esse número, e prefiro deixar de fora a arredondar pra cima.

---

## O que eu ainda gostaria de saber

A ferramenta inteira depende do segundo passo — o raciocínio do Claude — se manter consistente em 55 vagas sem relação entre si, e eu não tenho um jeito sistemático de checar isso além de ler cada arquivo eu mesmo. Isso não está resolvido. É um gap conhecido que estou escolhendo conviver, porque a alternativa — confiar cegamente — é pior.

Também não sei se ver um "Motivo provável" no momento em que uma recusa chega realmente muda o que eu faço depois, ou se é só um número que eu gosto de olhar. Não medi isso.

A parte que eu não esperava: escrever este case me obrigou a ler minha própria arquitetura do jeito que leio a de um cliente, e o que eu encontrei não foi uma feature faltando. Foi o mesmo erro, duas vezes — uma segunda cópia da verdade que só eu era responsável por lembrar de atualizar. Eu apontaria isso na hora no produto de outra pessoa. Levou construir a ferramenta de auditoria, e depois escrever sobre ela, pra eu apontar no meu.
