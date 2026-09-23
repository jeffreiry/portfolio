# Changelog · Portfólio Jeferson Freiry

## 2026-09-21 a 23 (Skills do bench, fixes do pipeline Job Analysis, alinhamento currículo/LinkedIn)

### Adicionado
- **Classificação hard/soft skill nas tags de cada card** (`jobanalysis.astro`) — laranja para hard skill, azul para soft skill (classificação automática por palavra-chave), preenchida quando nota ≥2, contornada quando nota ≤1.
- **Nova seção "Skills do bench"** — agrega os requisitos obrigatórios de todas as 57 vagas (recusadas inclusive) em 3 filtros (Todas/Que tenho/Que não tenho), usando uma taxonomia canônica de 38 competências (`canonicalizeSkill`) que reduz ~460 frases quase todas únicas a um vocabulário fixo estilo LinkedIn.
- **`npm run audit:bench`** (`scripts/audit-bench.mjs`) — lista vagas sem JD arquivada ordenadas por score, priorizando as que têm score alto sem prova reconferível (padrão do caso Zuri).
- **Reanálise de 8 vagas ativas do bench** (Verity, Gringo & Zapay, Serasa, Nacar, Arcotech, Méliuz, Certta, South System) após a reconstrução do case Arezzo — ganho médio de +8,4 p.p. Matriz FOFA e Gaps transversais do `_index.md` atualizados.

### Corrigido
- **`JOBANALYSIS_PASSWORD` e demais env vars não chegavam em `process.env` no dev local** — `astro.config.mjs` agora carrega o `.env` via `loadEnv()` do Vite.
- **Colisão de slug em reanálise virava arquivo órfão silencioso** — agora retorna aviso na resposta da API e mostra no card.
- **`max_tokens` do Claude (análise) e do Groq (extração de JD) truncavam JDs longas** sem erro claro — limites subidos (12000 e 3000) e truncamento detectado explicitamente antes do parse.
- **Modelo da Groq descontinuado sem aviso quebrava a extração** — `extractWithGroq` agora tenta uma lista de modelos em ordem.
- **Divisor de seção ("---") vazava pra dentro dos gaps** (bloqueadores/ausentes/boa aderência) — filtrado na extração.
- **Case Hypera Pharma corrigido de "via ilegra" pra "via CWI"** (frontmatter PT+EN + prompt do job-analysis) — o vínculo com a ilegra só começa em 2024, o projeto Hypera é de 2023, no período coberto pela CWI.
- **Currículo e PDFs (`Jeferson_Freiry_{PT,EN}.pdf`) atualizados pra inglês "Fluente"/"Fluent (Full professional proficiency)"** — reescrito direto no PDF via `pdf-lib`, sem arquivo-fonte editável no repo.
- **Perfil do LinkedIn revisado** (fora do repo): headline, seção Sobre e descrições de Braskem/CWI reescritas com métricas reais, ~40 competências por cargo auditadas e reduzidas, 4 competências fixadas trocadas, 17 certificações antigas de Marketing podadas.

---

## 2026-09-18 (redesign completo do case Arezzo&Co + migração pra brand-split)

### Adicionado
- **Case Arezzo&Co migrado pra `template: brand-split`** — `scope`/`duration` no frontmatter, badge "Under Construction" removido (case publicado).
- **6 artefatos de pesquisa reais aplicados** (case não tinha nenhuma prova de research antes): board de síntese de pesquisa, Canvas de Proposta de Valor (Marketing), Jobs to be Done (Marketing), matriz de responsabilidades (Loja/Gestor/Marketing × 11 tarefas), fluxograma da Home do Marketing, blueprint de serviço, documento de handoff real.
- **Teste de usabilidade real via Maze** documentado em Aprendizados — protótipo testado com usuários do perfil Marketing antes do handoff.
- **3 componentes CSS novos:** `.phone-frame` (moldura de celular genérica), `.monitor-svg` (moldura de monitor a partir de SVG vetorial, screenshot posicionada via porcentagens do viewBox), `.device-compare` (monitor + celular lado a lado), `.platform-split` (gráfico de barra empilhada mobile vs. desktop por perfil).

### Corrigido
- **Contexto real do projeto reconciliado via Q&A:** não era redesign do sistema anterior — era um terceiro app white-label construído com uma empresa de tecnologia parceira, substituindo a ferramenta usada antes pelo grupo. "Estado anterior" e Contexto & Problema reescritos.
- **Role trocado** de "UX Researcher · UX Designer · UI Designer" pra "Product Designer, atuando na UX e UI da solução".
- **Métricas corrigidas** — 350 lojas (era um "165" inconsistente no corpo), 3 marcas, 1500 usuários impactados, 3 perfis.
- **Duas imagens de blueprint (PT/EN) editadas via `sharp`** pra cobrir menções ao nome real da empresa parceira gravadas nos pixels.
- **Tempo verbal do corpo convertido de presente pra passado** nos 4 cases `brand-split` (Arezzo, Hypera, Del Valle Website, Kapo) — são projetos de consultoria com handoff, sem garantia de que o sistema segue em uso/inalterado hoje.
- **"IA" nunca mais abrevia "Arquitetura de Informação"** no texto (ambíguo com Inteligência Artificial) — sempre escrito por extenso.
- **"três homes" (PT) trocado por "três fluxos"** — visualmente confundível com "homens" em leitura rápida.
- **GA4 (`gtag.js`) só carrega em build de produção** (`import.meta.env.PROD` no `Base.astro`) — não contamina métricas com acesso local do autor.

---

## 2026-09-16 (redesign do case Hypera Pharma + par de cards de destaque no design system)

### Adicionado
- **Case Hypera Pharma renomeado** de "HYPERGESTOR" para "Gerenciador de Verbas" (PT/EN), em `src/content/cases/{pt,en}/hypera-hypergestor.md` e no prompt do job-analysis (`src/pages/api/jobanalysis-analyze.ts`) — o slug do arquivo não mudou.
- **6 screenshots reais aplicados ao case** (antes só texto, sem prova visual): matriz de responsabilidades (14 ações × 6 perfis), fluxo de usuário (6 telas), matriz de descoberta de features (6 perfis × 4 metas do produto), modal de Cadastro de Empresa, modal Apurar e Comprovar Verbas, tela de Aprovação de Integração com SAP.
- **`titleMax` em `HeroBrandSplit.astro`** — reduz o teto do `clamp()` do H1 de 44px para 34px quando o título passa de 36 caracteres, pra caber em uma linha em telas largas sem afetar os títulos mais curtos dos outros cases.
- **Par de cards de destaque (`.dual-cards`/`.dual-card`) em `global.css`** — componente reutilizável de 2 cards lado a lado (ícone + label + texto), cor fixa de marca com inversão proposital de tema: fundo cha-mate escuro (`#5c2d11`) no tema claro, fundo page-bg claro (`#f5f2ee`) no tema escuro, com texto/ícone invertendo junto (branco↔cha-mate) pra manter contraste. Aplicado em Aprendizados nos 3 cases `brand-split` (Hypera, Kapo, Del Valle Website) com conteúdo real extraído do próprio texto de cada case (não fabricado).

### Corrigido
- **Escopo real do Hypera reconciliado** — o case listava 4 módulos (Cadastro de Orçamentos, Cadastro de Verbas, Distribuição de Verbas, Apuração e Comprovação), dos quais só 3 nomes diferentes correspondem ao que foi de fato construído: Cadastro de Empresa, Apuração e Comprovação de Verbas, Aprovação de Integração com o SAP. Removidas as decisões #2 e #3 de Processo & Decisões (accordion de hierarquia de distribuição; "Distribuição Sugerida com Copiar") — descreviam um módulo de Distribuição de Verbas que nunca chegou a ser construído nem desenhado por completo. Solução & Craft e Aprendizados reescritos pra deixar explícito que os 3 módulos reais são uma fatia do sistema mapeado (6 perfis × 4 metas), não o sistema completo.
- **"Estado anterior" do Hypera corrigido** de "governança existia no papel" para "planilhas distribuídas pela companhia" — mais preciso sobre a situação real pré-projeto.
- **Badge "Em construção" removido do Hypera** — `underConstruction: true` removido do frontmatter (PT/EN), mesmo tratamento já aplicado ao Kapo e Del Valle Website; case publicado.
- **Linha "Tags:" removida do corpo do case Hypera** (PT/EN) — mesma convenção já aplicada aos outros cases `brand-split`.

---

## 2026-09-14 (continuação — redesign do case Del Valle Website + correções sitewide)

### Adicionado
- **Del Valle Website migrado pro template `brand-split`** (mesma base do Kapo), com hero em duas zonas, coluna de 1160px e assets reais novos: sitemap, wireframes responsivos (Web/Tablet/Mobile), antes/depois real da Home, screenshot da página "Fruta toda hora" e os 4 cards do carrossel de frutas (Laranja, Uva, Caju, Manga) — Laranja adicionada depois pra completar o conjunto.
- **Campo de schema `bodyManifesto` (default `true`)** — controla se o primeiro H2 do corpo recebe o estilo de citação-manifesto (`h2:first-of-type`) ou o estilo de eyebrow normal. Necessário porque o Kapo não tem mais tese duplicada no corpo (tese só no hero), mas o Del Valle Website mantém tese do hero e tese do corpo como textos distintos — a mesma classe `case-content--no-manifesto` não podia mais estar amarrada automaticamente a `template === 'brand-split'`.
- **Classe `.contrast-box`** — caixa com fundo creme (`--color-surface`) e padding, pra grupos de imagem com metade branca (como os cards do carrossel) não ficarem "branco sobre branco" na zona de conteúdo dos templates `brand-split`.
- **Mockup de 3 celulares mostrando a rolagem da Home** (`mobile-scroll-3phones.png`), montado com `sharp` a partir de uma captura real de tela cheia — mesma técnica de composição usada na capa do LinkedIn e nos diagramas. Recortes calibrados pra nunca cortar uma foto no meio (círculo da pessoa bebendo suco inteiro no 1º celular, foto da família inteira no 2º).
- **Convenção sitewide: `**Resumo**` em vez de `**TL;DR**`** em todos os cases PT (8 arquivos corrigidos) — EN mantém `**TL;DR**`.

### Corrigido
- **Role do Del Valle Website corrigido** de "UX · UI · Visual Designer" para "UX · UI Designer" — o autor não atuou como visual designer nesse projeto (identidade vinda de outra equipe/agência). Removidas menções a "criar ilustrações e elementos gráficos" e ferramentas de design visual (Illustrator/Photoshop) do texto; `scope` e `duration` corrigidos pra refletir a realidade (Wireframes + Interfaces web/mobile, 1 mês — não 2).
- **Seção Processo & Decisões do Del Valle Website reescrita do zero** — as 4 decisões antigas (formas orgânicas, sistema de cor, hero lifestyle, carrossel) eram fabricadas de uma sessão anterior a esses dados reais. Mantida só a única decisão confirmada como real pelo autor (grade alternada com carrossel de 4 dimensões), com honestidade explícita sobre o que **não** foi decisão do autor (arquitetura de conteúdo das 3 páginas e escolha de hero por página vieram prontas do cliente/agência) — mais uma reflexão sobre como um designer sênior usa um projeto de rebranding (aparentemente "só reskin") pra aplicar diretrizes de usabilidade em pontos pequenos e reais (ex: o link da Loja, externo, desenhado como botão com contorno + ícone de carrinho, para sinalizar saída do site antes do clique).
- **Inversão de conteúdo entre páginas corrigida**: o que o texto chamava de "Home" e "Fruta toda hora (produtos)" estava trocado em relação aos screenshots reais — Home tem o hero de lineup de produtos + seção-teaser "Fruta toda hora"; a página Fruta toda hora (separada) tem o hero de lifestyle + carrossel de frutas. "Duas páginas" corrigido para as 3 reais (Home, Fruta toda hora, Nossos Produtos).
- **Aprendizados reescrito em 2 parágrafos**, com o aprendizado real do projeto (diretrizes claras aceleram a conversão de briefing em produto) e uma reflexão sobre o peso de trabalhar numa marca de alcance nacional (77 anos, 100+ mercados).
- **Badge "Under Construction" removido** do Kapo e do Del Valle Website (ambos considerados prontos); Arezzo e HYPERGESTOR continuam marcados.

---

## 2026-09-14 (redesign do case Del Valle Kapo + template `brand-split`)

### Adicionado
- **Novo template `template: brand-split`** (`HeroBrandSplit.astro`) — hero em duas zonas: título/tese/tags sobre o fundo creme da página, depois faixa branca (equivalente no dark mode: `surface-2`, não preto — escurecer mais que o page-bg já quase-preto não gera separação) com a imagem de capa (16:9) subindo por `margin-top` negativo pra sobrepor a costura entre as duas zonas. `display: flow-root` na faixa branca evita que a margem negativa colapse com o pai e arraste a caixa toda junto (bug capturado e corrigido durante a calibração). Aplicado só no case Del Valle Kapo — Arezzo e Del Valle Website continuam em `template: brand`.
- **Campos de schema `scope: string[]` e `duration: string`** — quando presentes, o hero do `brand-split` troca a linha Atuação/Empresa/Ano por Atuação/Escopo (lista)/Duração.
- **Lightbox genérico em todos os cases** — qualquer imagem dentro de `.case-content` agora é clicável, abre em overlay fullscreen, fecha com clique ou Esc.
- **Mecanismo de comparação lado a lado reaproveitado** (`.before-after`, já existente) para os dois seletores estilo videogame (produtos vs. atividades) — mesmo componente, legendas diferentes de "Antes/Depois".
- Coluna do artigo do Kapo alargada pra 1160px; imagens comuns do corpo contidas em 900px centralizadas via `.case-content--narrow-images` (as de `.before-after` continuam full-width).
- Assets reais novos: 2 personas com fichas demográficas (`del-valle-kapo-personas-{pt,en}.png`), sitemap real da IA, benchmark competitivo **ilustrativo** (rotulado como tal no texto e na própria imagem), 3 pares antes/depois reais (site principal, microsite "Sempre Criança Challenge", categoria "Ritmo de Brincadeira"), 2 seletores lado a lado (produtos + atividades).
- 4 métricas reais de campanha no frontmatter (117 dias de campanha, 400 mil PDV, 60 brincadeiras mapeadas, 12 ilustrações redesenhadas), substituindo as 3 anteriores.

### Removido
- **Toda menção a Google Analytics/"dados" no case** — a alegação original de arquitetura de informação "data-driven" não era sustentável (o autor não teve acesso ao número real de tráfego). Reescrito em cima de personas + benchmark + comportamento observado, sem citar nenhuma fonte de analytics.
- 3 imagens de lifestyle/mockup (`01-smatphone.png`, `02-brincadeiras.png`, `03-brincadeiras-mobile.png`) — mostravam as mesmas telas dos novos screenshots reais, só que em fotos de contexto (celular na mão, crianças ao fundo) em vez de screen puro. Arquivos continuam em disco, sem referência no case.

### Pendente
- Mobile não está documentado nem ilustrado no case, apesar de constar como tag do card — a ser trazido numa sessão futura.

---

## 2026-09-13 (continuação — cards de métricas: posição variável + centralização + 4 cases novos)

### Adicionado
- **`MetricsGrid.astro`** — componente reutilizável pro grid de métricas (antes duplicado inline em `work/[slug].astro` e `pt/work/[slug].astro`). Sempre centralizado como grupo (`flex flex-wrap justify-center`, não mais `grid-cols-4` que deixava grupos de 2-3 cards colados à esquerda quando sobrava coluna vazia).
- **Posicionamento variável via marcador `<!--metrics-here-->`** no corpo do `.md` — usa `entry.rendered.html` (API de content layer do Astro) pra dividir o HTML já compilado no ponto exato do marcador, sem reprocessar markdown. Cada case tem o grid num lugar diferente da leitura (após Discovery, após Context, antes de Outcome, etc.) em vez de sempre logo após o hero. Sem marcador, cai no comportamento antigo — nada quebra pra quem não tiver.
- **Métricas novas em 4 cases que não tinham nenhuma** (Arezzo, HYPERGESTOR, Del Valle Website, Del Valle Kapo) — todos os números já estavam citados no próprio texto do case (3 perfis, 4 módulos, 130+ atividades/5 categorias, 2 páginas), nenhum inventado.
- Grid de métricas deixou de ser exclusivo do `template: 'enterprise'` — agora aparece em qualquer template.

### Verificado
- 7 dos 9 cases confirmados ao vivo (posição correta, sem duplicar com o fallback do topo); os outros 2 (`cartela-cores`, `painel-saude`) já têm o marcador certo no arquivo, mas ficam inertes até saírem de `draft: true`.

---

## 2026-09-13 (continuação — description longa demais para SEO/social)

### Corrigido
- **`description`/`og:description` com 208 (EN) e 219 (PT) caracteres** — passava do recomendado (~125 pra preview social, ~150–160 pra não truncar no Google), achado por um validador de OpenGraph de terceiros ao investigar o problema do preview do LinkedIn. Encurtado em `Base.astro` (default), `index.astro` e `pt/index.astro` para 146 e 151 caracteres respectivamente, preservando o essencial (Senior Product Designer, sistemas enterprise, produtos de dados/IA, acesso a conhecimento e decisão).

---

## 2026-09-13 (continuação — OG image ausente em todo o site)

### Corrigido
- **`public/og-default.png` não existia** — `Base.astro` sempre teve esse caminho como fallback de `og:image`/`twitter:image` (1200×630), mas nenhuma página do site (home EN/PT, os 9 cases, contato, login) jamais passou um `ogImage` próprio. Isso significa que **todo compartilhamento do portfólio em redes sociais mostrava preview quebrado ou sem imagem**, provavelmente desde o lançamento do site — ninguém tinha notado porque o link nunca "quebra" visualmente pra quem clica, só pra quem vê o preview antes de clicar. Corrigido adicionando o arquivo (logotipo "JEFFERSON" em bracket).

### Adicionado
- **Documentado o fluxo `curriculo-pt-draft.md` → PDF** no `CLAUDE.md`: arquivo de trabalho na raiz (não versionado, não é doc do projeto) onde o autor edita conteúdo do currículo em Markdown; aplicado de volta no PDF via `pdf-lib` preservando layout/fonte atuais.

---

## 2026-09-13 (continuação — data de envio de candidatura, imutável)

### Corrigido
- **Faltava uma data de envio de candidatura que sobrevivesse ao avanço do status.** O campo `Status atualizado em`, adicionado horas antes nesta mesma sessão, é sobrescrito toda vez que status/candidatura mudam — então assim que uma vaga saísse de "Candidatura enviada" pra "Entrevista agendada", a data real de envio se perderia, e não haveria como calcular "quanto tempo a empresa levou pra responder".

### Adicionado
- **Campo `**Candidatura enviada em:**`, imutável** — carimbado uma única vez em `jobanalysis-update.ts`, na primeira vez que o status vira "Candidatura enviada"; nunca mais reescrito depois disso.
- **Badge "respondeu em N dias"** (verde) nos cards — aparece quando a vaga já saiu de "Candidatura enviada" pra Entrevista/Em processo/Proposta/Recusado, calculado como `Status atualizado em` (do estágio atual) menos `Candidatura enviada em`. Ausente enquanto a vaga ainda está em "Candidatura enviada" (não houve resposta ainda) ou pra vagas de antes desta convenção.

---

## 2026-09-13 (continuação — gestão de pipeline: prioridade, funil, board, prazos)

Levantamento de melhorias pensando no `/jobanalysis` como ferramenta de **gestão de candidaturas**, não só motor de análise. De 8 ideias levantadas, 6 implementadas nesta sessão; 1 (superfície automática da convenção de double-check recorrente) deliberadamente deixada de fora — exigiria matching semântico entre texto de gap e categoria frágil demais pra confiar sem validação melhor.

### Adicionado
- **Campo `**Status atualizado em:**`** — carimbado deterministicamente pelo servidor (nunca pelo autor nem pelo Claude) em `jobanalysis-analyze.ts` (criação/reanálise) e `jobanalysis-update.ts` (edição de candidatura/status). Substitui a ideia inicial de usar `mtime` do arquivo, descartada por ser frágil — uma edição em lote de conteúdo (como a que acabamos de fazer nos 7 arquivos de Score anterior) resetaria o contador sem a vaga ter sido realmente tocada.
- **Indicador "dias parado"** nos cards — badge laranja quando uma vaga em estágio ativo está ≥21 dias sem `Status atualizado em`. Ausente (não zerado) para vagas de antes desta convenção, até serem tocadas de novo.
- **Campo opcional `**Prazo de candidatura:**`** — badge vermelho quando faltam ≤3 dias ou o prazo já passou. Mecanismo pronto, nenhuma vaga tem o campo preenchido ainda (nenhuma JD do bench tinha prazo explícito até agora).
- **Seção "Prioridade agora"** — top 5 vagas em estágio ativo, ordenadas por score desc e tempo parado desc, respondendo direto "o que eu ataco hoje".
- **Seção "Funil de candidaturas"** — contagem por estágio ativo (A avaliar → Proposta recebida) como barras horizontais; Recusado/Arquivado contados à parte como estados terminais.
- **Seção "Board por status"** — kanban leve e só-leitura, uma coluna por estágio ativo com cards compactos (score + empresa), pra visão do pipeline inteiro num olhar só.
- **Checklist de preparo pré-entrevista** — quando `Status = Entrevista agendada`, os 🔴 Bloqueadores da vaga viram checklist marcável (client-side, não persiste ao recarregar — é auxílio de leitura, não dado).
- **Aviso de empresa duplicada** — ao criar uma vaga nova (não reanálise), se já existir outra vaga da mesma empresa no bench, um callout aparece no card novo.

Todos os campos/lógicas duplicados nos dois lugares onde os cards são montados (SSR + `buildCardHTML` client-side), seguindo a mesma disciplina de fonte única já aplicada ao `gaps[]` e à Matriz FOFA.

---

## 2026-09-13 (continuação — varredura de todas as vagas não-recusadas)

A pedido do autor, todas as 49 vagas com status ≠ Recusado foram checadas contra o histórico git em busca de mudança de score não documentada. Metodologia: comparar o score no primeiro commit de cada arquivo vs. o valor atual; onde o histórico git ainda tinha a versão "antes" (mesmo com o arquivo em disco já sobrescrito), extrair o diff real das tabelas de requisito em vez de supor motivo.

### Adicionado
**6 vagas além do ADP** ganharam `**Score anterior:**` + `**Motivo da mudança de score:**`, cada uma com causa raiz diferente e verificada via diff real:

- **Afya (74%→42%):** a 1ª análise tinha erro de cálculo genuíno — texto dizia "18/28 = 64%" mas o cabeçalho exibia 74%, com o próprio texto tentando justificar a discrepância. Confirma por que a arquitetura atual nunca deixa o Claude escrever a % final.
- **Asaas (55%→43%):** mesmos 12 requisitos — 5 itens marcados "Ausente" tinham nota 1 na 1ª análise (rubrica diz que Ausente = nota 0). Correção de aplicação de rubrica, não reavaliação de portfólio.
- **Certta (56%→61%):** extração da JD consolidou 9 requisitos em 7 na 2ª passada (2 itens da 1ª viraram sub-casos de itens já existentes) — mesma família de inconsistência de segmentação do ADP, só que reduzindo o denominador em vez de aumentar.
- **Revolut (45%→58%):** mesmos 27+15 requisitos — a 1ª análise usava evidência genérica ("não mencionado", "cases publicados") sem citar case nenhum pelo nome; a 2ª aplicou a regra de citar caso específico e achou evidência mais forte pros mesmos requisitos (5 notas subiram, nenhuma caiu).
- **Serasa (49%→56%):** os 21 obrigatórios não mudaram; só "Inglês avançado" foi de nota 0 ("não há evidência") pra nota 3 (portfolio bilíngue PT+EN, fato verificável que a 1ª análise simplesmente não considerou).
- **South System (33%→38%):** combina os três padrões acima ao mesmo tempo — evidência mais específica, correção de rubrica num item, e a mesma omissão do inglês bilíngue da Serasa (mesmo lote de análise, 2026-06-27).

**Padrão transversal identificado:** pelo menos 3 causas-raiz distintas e recorrentes de mudança de score que não têm nada a ver com o portfólio ter mudado — (1) inconsistência de granularidade na extração da JD pelo Groq, (2) violação da própria rubrica (nota 1 em vez de 0 para "Ausente"), (3) evidência genérica em vez de case citado nominalmente. As três já eram hipotéticas na seção "Risco & Premissas" do case `jobanalysis-case-study` — agora têm exemplo real e documentado cada uma.

### Não encontrado
Nenhuma das outras ~42 vagas não-recusadas teve o score alterado entre o primeiro commit e o atual — mudanças nesses arquivos foram só de `Status`/`Candidatura` (fluxo normal de acompanhamento de candidatura, não reanálise).

---

## 2026-09-13 (continuação — indicador de score mudado + double-check recorrente)

### Adicionado
- **Convenção: double-check recorrente disparado por mudança no portfólio, não por calendário.** O double-check original só cobre a vaga no momento da criação. Agora, toda vez que um case mexer num dos Gaps transversais (métrica preenchida, artefato publicado, mobile coberto), a pergunta é "quais vagas do bench perderam ponto justamente nesse gap?" — reavaliar só essas, nunca reler o bench inteiro por rotina.
- **Indicador visual de "score mudado"** nos cards de `/jobanalysis`: dois campos opcionais no arquivo da vaga (`**Score anterior:**` + `**Motivo da mudança de score:**`), renderizados como badge (↑/↓, verde/vermelho) com explicação do que mudou logo abaixo. Implementado nos dois lugares onde os cards são montados (SSR + template client-side), evitando o mesmo erro de fonte dupla de duas vezes atrás.
- **Exemplo real: ADP (89%→76%, reanálise de 2026-08-20).** Comparando as duas versões do arquivo via `git show` (o histórico git preservava o "antes", mesmo com o arquivo em disco já sobrescrito), descoberto que os pontos obtidos não mudaram (32/32) — o que mudou foi a granularidade da extração da JD: "Leadership" (mentoria de designers juniores) virou requisito próprio com nota 1 na 2ª análise, em vez de ficar absorvido dentro de um requisito genérico com nota 3 na 1ª, aumentando o denominador de 18 para 21. É um achado real de inconsistência de extração entre duas passadas da mesma JD — evidência concreta da "premissa mais arriscada" já documentada no case `jobanalysis-case-study`.

---

## 2026-09-13 (Matriz FOFA + faixa "Alta aderência" que nunca existia)

### Adicionado
- **Seção "Matriz FOFA"** no bench (`## Matriz FOFA` em `_index.md`, 4 quadrantes: 🟩 Forças, 🟥 Fraquezas, 🟦 Oportunidades, ⬛ Ameaças), sintetizando padrões que só aparecem lendo o conjunto das 55 vagas — não vaga a vaga. Forças fundamentadas em contagem real (trade-offs documentados: 41/55, portfolio bilíngue: 35/55). Renderizada dinamicamente em `/jobanalysis` via `parseFOFA()`, seguindo o mesmo princípio de fonte única dos Gaps transversais — mas com cadência própria: **só é recalculada quando pedida explicitamente**, nunca a cada vaga nova (convenção registrada no `CLAUDE.md`, mesmo espírito do "Motivo da recusa").
- **Pill de filtro "Alta aderência"** na página `/jobanalysis`.

### Corrigido
- **`parseGapsTransversais()` sem limite superior** — lia da linha "## Gaps transversais" até o fim do arquivo. Ao adicionar a Matriz FOFA logo em seguida no `_index.md`, suas tabelas (que também começam com `|`) seriam engolidas pra dentro dos Gaps transversais. Corrigido antes de virar bug real: seção agora limitada ao próximo `## `. Validado com teste isolado do parser (5 gaps, sem contaminação da FOFA).
- **Faixa "Alta aderência" (≥80%) nunca tinha sido implementada na lógica de banda/filtro/cor** — só existia na legenda "Interpretação do score". A função `banda()` (duplicada no script do servidor e no `<script>` client-side) só reconhecia 3 faixas (parcial/baixa/muito-baixa), então uma vaga de 95% e uma de 61% recebiam a mesma cor de badge e caíam no mesmo filtro. Corrigido nos dois lugares; tipo `Banda` agora tem 4 valores, com cor própria (`--color-tag-research`) pra não reciclar a cor de "parcial".

---

## 2026-09-12 (3 vagas órfãs reconciliadas + gaps transversais recalculados + fim do array hardcoded)

### Corrigido
- **3 análises estavam órfãs do `_index.md`:** iFood (57%, Staff Product Designer II), Gringo & Zapay (69%) e Nacar (79%) foram analisadas e salvas em `Bench_job_applications/`, mas nunca entraram na tabela do ranking — mesmo padrão de falha das reconciliações de 2026-09-07. Adicionadas com score/status/data extraídos de cada arquivo.
- **`fetch-senior-product-designer.md` sem `Motivo da recusa`** — única entre as 6 vagas com `Status: Recusado` sem o campo preenchido. Adicionado: gap de growth/retenção (nota 0, requisito obrigatório) + ausência de mobile nativo publicado, coerentes com o menor score do bench (27%).
- **Gap "UX Research estruturado" estava subestimado:** linha de gaps transversais listava só 4 vagas (C&A, SAP, ADP, Itaú) com impacto "Médio" — auditoria completa das 55 análises encontrou o requisito pontuando ≤2 em **22 vagas**, reclassificado para impacto "Alto".
- **Gap "Mobile nativo": 13 → 14 vagas** — iFood (app dos entregadores) adicionado à lista após a reconciliação acima.
- **`CLAUDE.md` e `portfolio-readme.md` com contagem desatualizada** ("52 vagas, média 57%") — corrigido para 55 vagas (média segue 57%, a entrada de maior score — Nacar — compensou a de menor score entre as três novas).

### Alterado
- **Array `gaps[]` de `src/pages/jobanalysis.astro` deixou de ser hardcoded.** Era a segunda vez que ele ficava desatualizado em relação ao `_index.md` (faltava a linha inteira de "Mobile nativo" e a de "UX Research" tinha os números antigos) porque a sincronia dependia de lembrança manual a cada edição do índice. Substituído por `parseGapsTransversais()`, que lê a tabela "## Gaps transversais" direto do `_index.md` — mesmo arquivo já usado como fonte das vagas — eliminando a fonte dupla. Validado com teste isolado do parser contra o `_index.md` real (5 linhas, markdown `**`/`` ` `` removido corretamente) e `npm run build` limpo.

**Bench atual: 55 vagas, média 57%** (era 52 vagas, média 57%).

---

## 2026-09-08/09 (currículos reescritos + card de Recusado no bench)

### Adicionado
- **Currículos PT e EN (`public/Jeferson_Freiry_{PT,EN}.pdf`) reescritos por completo:** título neutro (sem "Sênior/Senior", pra não travar filtro automático de vagas Pleno), LinkedIn adicionado ao cabeçalho (2 linhas de contato com e-mail/portfolio/LinkedIn clicáveis), Resumo Profissional/Professional Summary convertido em bullets com métricas reais (3 plantas/time completo nos EUA; Design Chapter de ~10 designers), menção a mobile removida (não sustentada por nenhum case do portfolio), espaçamento entre seções aumentado, e as 7 entradas de Experiência reformatadas para `**Empresa** (Local) – Datas` / `*Cargo*` em vez de duas linhas com colunas.
- **Nota técnica para qualquer edição futura do currículo:** os PDFs não têm arquivo-fonte (Word/Canva) — são a única versão. O documento original usa fonte Liberation Sans (clone livre da Arial) embutida com encoding customizado nos textos existentes; edições feitas nesta sessão usam Arial real do Windows (`C:/Windows/Fonts/arial.ttf` + itálica + bold) via `pdf-lib`+`@pdf-lib/fontkit`, visualmente equivalente. Texto substituído é removido de verdade do content stream (não só coberto com retângulo branco) para não vazar em cópia de texto ou parsing de ATS. Scripts de edição ficaram no scratchpad da sessão, não versionados no repo.
- **`/jobanalysis`: card de vaga com `Status: Recusado` ganha borda e tag vermelhas (`#b91c1c`)** — automático via seletor CSS `data-status="Recusado"`, nenhum código novo necessário por vaga. Corrigido bug de especificidade CSS onde a regra base (`section .rounded-2xl.border`) vencia o override por ter um seletor a mais — resolvido prefixando a regra nova com `section` também.
- **Novo campo opcional `**Motivo da recusa:**`** nos arquivos de `Bench_job_applications/`, exibido como callout vermelho no card quando presente. Não é gerado automaticamente por IA na troca de status (decisão do autor) — preenchido a pedido, ver convenção no `CLAUDE.md`. Preenchido em 5 vagas até agora: Localiza&Co, SAP Concur, Avenue, TRACTIAN, Amcom.

---

## 2026-09-07 (continuação — duplicata Zuri removida)

### Corrigido
- **`zuri-product-designer-senior.md` removido do bench** — era uma análise inválida (95%, sem JD arquivada, produto "Não especificado"), gerada 18 minutos antes de `zuri-product-designer-senior-experiencia-em-investimentos.md` (56%, JD completa, candidatura real enviada). Diagnóstico: a JD não foi colada corretamente na primeira tentativa, o pipeline extraiu uma lista de requisitos genérica e artificialmente perfeita; o autor percebeu, recolou a JD completa e gerou a análise válida — mas o arquivo da tentativa falha nunca foi apagado.
- **Bench atual: 52 vagas, média 57%** (era 53 vagas, média 58%). Nova convenção registrada no `CLAUDE.md` para reconhecer esse padrão (score suspeito + JD não arquivada) em futuras reconciliações.

---

## 2026-09-07 (reconciliação do bench — 20 vagas órfãs)

### Corrigido
- **20 análises de vaga estavam órfãs do `_index.md`** (feitas entre 2026-08-20 e 2026-09-01, nunca reconciliadas): alt.bank, Amcom, Avenue, Blacksmith Agency, DBC Company, Deel, Epic Games, FCamara, Fetch, Jobgether, Nu (Staff IC7), Payfy, Segware, South, SulAmérica, Sympla, TRACTIAN, Zallpy, Zuri (2 vagas). Adicionadas ao ranking com score/status/data extraídos de cada arquivo.
- **Bench atual: 53 vagas, média 58%** (era 33 vagas, média 55%). `CLAUDE.md` e `portfolio-readme.md` sincronizados.
- **Novo gap transversal identificado:** mobile nativo (iOS/Android) aparece como bloqueador explícito em 13 análises (Fetch, alt.bank, Deel, Tractian, Revolut, SAP Concur, Segware, Vivo, Zuri, DuckDuckGo, Asaas, Méliuz, CloudWalk) — adicionado à tabela de gaps transversais.
- **Ponto de atenção para o autor (não corrigido automaticamente):** `zuri-product-designer-senior.md` tem score 95% (o mais alto do bench) mas `Status: A avaliar` e `Candidatura: Não` — parece uma vaga de altíssima aderência que ainda não foi submetida. Vale conferir se isso reflete a realidade ou se é um status desatualizado.

---

## 2026-08-20 (continuação — double-check do bench, fix de max_tokens)

### Corrigido
- **`max_tokens` do passo 2 (Claude) subiu de 4000 para 8000** — a vaga da Renner (JD com 9 obrigatórios + 7 diferenciais + 6 competências comportamentais, bem acima da média) estourou o limite antigo: a resposta era cortada antes do marcador `---METADATA---`, quebrando o parse e surgindo pro usuário como "A IA retornou um formato inesperado." Adicionado log de `stop_reason === 'max_tokens'` em `analyzeWithClaude()` pra diagnosticar mais rápido se voltar a acontecer.

### Double-check do bench (convenção aplicada)
- **Reanálises reconciliadas:** ADP (89%→76%) e Revolut (45%→58%) foram reanalisadas e colidiram com o slug existente, gerando arquivo com sufixo de timestamp em vez de sobrescrever. Consolidado: conteúdo mais recente sob o slug limpo, arquivo com timestamp removido.
- **Duplicata resolvida:** Arcotech tinha dois arquivos da mesma vaga (submissão duplicada, ambos 57%) — consolidado em um, mantendo o status "Candidatura enviada" que só existia na versão mais recente.
- **Convenção nova:** em reanálise/duplicata com colisão de slug, sempre manter a versão mais recente (preservando `Status`/`Candidatura` se já tiver sido atualizado manualmente) — registrada em `CLAUDE.md` e na memória cross-sessão.
- **6 vagas novas reconciliadas no `_index.md`** (todas passaram no double-check — matemática conferida, gaps ancorados em cases reais): Vivo (61%), Microsoft (69%, candidatura enviada), Stone (65%), CloudWalk (51%), Provectus Middle (57%), Renner (56%).
- **Bench atual: 33 vagas, média 55%** (era 26 vagas, média 54%).

---

## 2026-08-20

### Adicionado
- **Google Analytics 4** (`G-P3Y01ZJ3RT`) — `gtag.js` inline no `Base.astro`, cobre todas as páginas do site. ID hardcoded (não é segredo). `preconnect` pra `googletagmanager.com` adicionado junto. Testado num navegador real (não só `curl`): `window.gtag` carregado e `dataLayer` com as chamadas `js`/`config` processadas, confirmando que o hit é enviado de verdade.
- **Vercel Web Analytics documentado** — já estava ativo (`webAnalytics: true` no adapter) desde antes desta sessão, mas nunca tinha sido registrado em nenhum doc. Convivem os dois: Vercel (nativo, sem cookies) + GA4 (mais granular).
- `JOBANALYSIS_PASSWORD` adicionada ao `.env` local (só existia na Vercel) — necessária pra login funcionar rodando `npm run dev`.

---

## 2026-08-19 (continuação — CTA, currículo, link mágico, incidente de segurança, jobanalysis, Groq)

### Adicionado
- **Card CTA "cases protegidos por senha"** na grade da home (EN+PT) — estilo outline igual ao "Full history"/"Histórico completo" da Carreira, texto alinhado à esquerda em duas linhas, preenchendo o slot vazio da última linha.
- **Placeholders de imagem pendentes removidos** do case Hypera Pharma (PT+EN) — os dois blocos tracejados ("Pipeline unificado", "Modal de distribuição") saíram até as imagens reais chegarem.
- **Fix do currículo** (PT+EN): cidade da Braskem corrigida de São Leopoldo pra Porto Alegre. Editado no nível do content stream do PDF (não só cobrindo visualmente) — o texto antigo foi removido de verdade da camada de texto, importante pra ATS/copiar-colar.
- **Link mágico** (`?access=TOKEN` em qualquer URL) — libera os cases protegidos sem passar pelo `/login`, pensado pra mandar num link só pra recrutadores específicos. Token separado da senha (`PORTFOLIO_ACCESS_TOKEN`). Funciona nativamente em páginas SSR via middleware; a home (estática) usa `/api/magic-link` + script client-side, coordenado por evento (`magic-link:checked`) pra evitar corrida entre os dois fetches assíncronos.
- **Grade de Cases revela os protegidos quando desbloqueado** — `/api/unlocked-cases` só devolve dados se a sessão for válida (nunca vaza no HTML de quem não tem acesso); script client-side injeta os cards e remove o CTA quando autenticado.
- **`/jobanalysis` reativado com senha própria** (`JOBANALYSIS_PASSWORD`) — nova `AreaId` em `src/auth.ts`, `requireAuth()` compartilhado no middleware. Descoberta no processo: a página nunca tinha funcionado de verdade em produção (bloqueio incondicional 404, sem checar senha nenhuma), apesar da doc antiga dizer o contrário.
- **`/jobanalysis` vira só-visualização em produção** — Nova Vaga, Editar (reanalisar) e o toggle de Candidatura dependem de escrita em `Bench_job_applications/*.md`, que só funciona local (Vercel tem filesystem read-only). Antes falhavam silenciosamente ou com erro sem persistir nada; agora só aparecem rodando `npm run dev` (`import.meta.env.DEV`). Candidatura continua visível como texto, só sem poder editar.
- **Convenções novas registradas no `CLAUDE.md`:** toda vaga nova analisada passa por double-check do Claude antes de validar (rodar local, ler o `.md` gerado); todo deploy passa por build+teste real+conferência em produção, não só "buildou sem erro".

### Corrigido
- **🔴 Incidente de segurança — bypass de autenticação nos cases NDA.** Causa raiz: `passwordFor()`/`accessTokenFor()` liam `import.meta.env.PORTFOLIO_PASSWORD`/`PORTFOLIO_ACCESS_TOKEN` diretamente — o Vite congela esse tipo de leitura em constante fixa no build (mesmo problema já documentado em `jobanalysis-analyze.ts`). Se a env var não estivesse disponível no instante exato daquele build, o valor ficava errado permanentemente até o próximo build. Confirmado via inspeção direta do bundle compilado (`.vercel/output`), não só teoria. **Fix:** leitura via `process.env['VAR']` através de variável indireta (`_env`), que o Vite não consegue congelar — confirmado no bundle que agora é leitura dinâmica de verdade. **Endurecimento:** removida a exceção "libera acesso em dev sem senha configurada" — agora bloqueia sempre (404), sem depender de detectar corretamente DEV/PROD pra decisão de segurança. Os 3 cases NDA ficaram em `draft: true` (bloqueio total) durante a investigação e só voltaram depois do fix confirmado — testado em preview deployment isolado antes de ir pra produção.
- **Modelo Groq descontinuado** — `llama-3.3-70b-versatile` sumiu do catálogo da Groq (`model_not_found`), quebrando o passo 1 do pipeline de análise de vaga. Trocado para `openai/gpt-oss-120b`, testado direto na API da Groq com o prompt real antes de aplicar.
- **`GROQ_API_KEY` nunca tinha sido configurada na Vercel** — só existia no `.env` local. Adicionada em produção.
- **Deploy automático falhou em disparar 2x nesta sessão** (push não gerou build na Vercel, sem status/deployment associado ao commit no GitHub) — resolvido rodando `vercel --prod --yes` manualmente. Sem causa raiz identificada ainda; documentado no `portfolio-readme.md` como algo a observar.

---

## 2026-08-19

### Adicionado
- **Campo `thesis` preenchido nos 9 cases (PT+EN)** — primeira leva da "Fase 1" de [Bench_designers/_insights-melhorias.md](Bench_designers/_insights-melhorias.md#cruzamento-com-o-bench-de-vagas): a hero de cada case (H1 + subtítulo itálico) agora carrega a frase-manifesto que antes só aparecia depois do scroll, no primeiro H2 do corpo (`.case-content h2:first-of-type`, já estilizado desde antes como tese). Frases extraídas/condensadas do parágrafo "A virada" de cada case, não inventadas.

### Descoberto (infraestrutura da Fase 1 já existia)
- Pull-quote estilizado (`.case-content blockquote`), eyebrow labels de seção (`.case-content h2:not(:first-of-type)`), campo `metrics[].source` (schema + render) e count-up animado nas métricas já estavam implementados antes desta sessão — só não tinham conteúdo usando-os. Nenhum código novo necessário para esses itens.

### Não feito — motivo registrado
- **Fase 2 (métricas inline, count-up com dado real)**: bloqueada por dado, não por código. Das métricas hoje preenchidas, só Enterprise AI tem um número de impacto real (~8.000 usuários); o resto é escopo/prazo. Fazer "métricas distribuídas pela narrativa" agora seria construir em cima de `⬜` do `docs/gaps-para-responder.md`.
- **Fase 3 — captions de decisão**: cheguei a prototipar um plugin rehype para promover o `alt` das imagens a legenda visível, mas parei — `docs/cases-portfolio.md §4.2` documenta que o alt text é **deliberadamente** escopado a "o que está na tela", com a decisão de design vivendo no parágrafo imediatamente anterior à imagem (regra 1 da mesma seção). Promover o alt como está duplicaria "o que é mostrado", não entregaria "a decisão" que o insight pede — precisa de legendas novas, escritas propositalmente, não geradas do alt existente. Fica como tarefa separada.
- **Embeds** (Fase 3): depende de artefato vivo (Figma/Storybook) publicável — não avaliado ainda.

## 2026-08-18

### Adicionado
- **Proteção por senha por case individual** — novo campo `protected: boolean` no schema de `content.config.ts` (default `false`), independente de `draft`. Antes, `PORTFOLIO_PASSWORD` protegia `/work/*` inteiro como um bloco único; agora `src/middleware.ts` consulta a collection pelo slug (`workSlugFromPath` em `src/auth.ts`) e só exige login se aquele case específico tiver `protected: true` — o resto de `/work/*` fica público sem senha. `enterprise-ai-assistant`, `shipping-capacity-platform` e `power-apps-dummy-app` (PT+EN) marcados como `protected: true` (os dois primeiros saíram de `draft: true`, que os deixava inacessíveis mesmo com senha). Excluídos da home (EN+PT) e do carrossel "próximo case" em `[slug].astro`/`pt/[slug].astro` — só acessíveis via link direto + login. Removidos do `customPages` do sitemap em `astro.config.mjs`. Testado localmente (build + dev server): case protegido redireciona para `/login`, case público carrega direto, cookie de sessão após login libera todos os protegidos da área.

### Alterado
- **`Bench_job_applications/_index.md`** — reconciliadas 3 vagas analisadas em julho/2026 que nunca tinham entrado na tabela: Itaú Especialista Core Experience PF (72%, 2026-07-09), ADP Senior UX Designer (**89% — alta aderência, categoria "submeter"**, 2026-07-10) e Meta Product Designer (40%, 2026-07-11). Média geral atualizada de 52% (23 vagas) para 54% (26 vagas). Gap "UX Research estruturado" na tabela de gaps transversais passou a listar ADP e Itaú entre as vagas afetadas — ambas citam ausência de usability testing/A/B testing formal como bloqueador ou diferencial ausente.
- **`src/pages/jobanalysis.astro`** — array `gaps[]` (hardcoded, espelha a seção "Gaps transversais" do `_index.md`) sincronizado com a mudança acima.
- **Contagem de cases publicados**: 7 → 4 públicos sem senha (arezzo, del-valle-website, hypera-hypergestor, del-valle-kapo) + 3 protegidos por senha (`CLAUDE.md` atualizado).
- **Seção "[Não lançado]" deste changelog** — estava presa ao bench de 2026-06-12 (11 vagas) e misturava pendências já resolvidas (Lighthouse, responsividade, sitemap, imagens) com as ainda abertas. Reescrita para espelhar a tabela "Gaps transversais" atual do `_index.md` e separar o que já foi concluído.

---

## 2026-06-20

### Adicionado
- **Imagens dos cases** — screenshots em `public/cases/{slug}/`: `card-home.*` (card na home) + `hero.*` (hero do case) + `01-*.png / 02-*.png / 03-*.png` (inline) para arezzo-ad-management, del-valle-kapo, del-valle-website, enterprise-ai-assistant, shipping-capacity-platform e power-apps-dummy-app
- **`src/utils/cover.ts`** — `detectHero(slug)` detecta `hero.*` → fallback `visao-geral.*`; `detectCardImage(slug)` detecta `card-home.*` → fallback `visao-geral.*`; ambas via `fs.existsSync`, sem necessidade de `cover:` no frontmatter

### Alterado
- **Home (EN+PT)** — CaseCard recebe `cover={detectCardImage(slug) ?? c.data.cover}` — usa `card-home.*` se existir
- **`work/[slug].astro` (EN+PT)** — hero background resolvido via `detectHero(slug!) ?? entry.data.cover ?? bgImage` — usa `hero.*` se existir
- **`src/middleware.ts`** — senha vazia em dev libera acesso sem redirecionar ao login; em prod retorna 404
- **Cases content (EN+PT)** — placeholders `<div class="image-placeholder">` substituídos por `![alt](path)` em arezzo, del-valle-kapo e del-valle-website; 3ª imagem adicionada ao fim da seção Solução em cada um
- **Frontmatters** — extensão `.jpg` → `.png` em arezzo-ad-management, del-valle-kapo, del-valle-website e power-apps-dummy-app

---

## 2026-06-18

### Adicionado
- **Página `/jobanalysis`** (PT, só rota raiz) — apresenta os resultados do bench de candidaturas (`Bench_job_applications/_index.md`): resumo (11 vagas, média 60%), ranking de aderência com barra de score por vaga, gaps transversais e metodologia (rubrica + interpretação). Reusa tokens do design system. **Protegida por senha** (`PORTFOLIO_PASSWORD`) — `prerender = false` + prefixo `/jobanalysis` no `middleware.ts`. Defesa em profundidade: também `noindex, nofollow` (prop nova em `Base.astro`) e fora do sitemap (filtro em `astro.config.mjs`).

### Alterado
- **Auth por área** — `src/auth.ts` centraliza o mapa path → cookie + senha. `/jobanalysis` agora tem senha própria (`JOBANALYSIS_PASSWORD`, fallback p/ `PORTFOLIO_PASSWORD`) e cookie `jobanalysis_auth`, isolado dos cases. `middleware.ts`, `api/login.ts` e `api/logout.ts` (limpa os dois cookies) atualizados. Copy do `login.astro` neutralizado ("This page is protected").
- **Hero video** — substituído `hero.mp4` por `Gh011011.mp4` (vídeo de autoria própria) em EN e PT
- **RunWidget + WorkoutWidget** — bottom row alterado de `flex-row space-between` para `flex-column`, evitando quebra do "Syncing with" ao lado da contagem no mobile

### Corrigido
- **Vite watcher** — adicionado `**/.vercel/**` ao `server.watch.ignored` no `astro.config.mjs` para evitar `ELOOP: too many symbolic links` na pasta `.vercel/output/` ao rodar `dev` localmente

---

## [Não lançado]

### Pendente — por criticidade (bench 2026-09-12 · 55 vagas · score médio 57%)

A seção "Gaps transversais" de [`Bench_job_applications/_index.md`](Bench_job_applications/_index.md) agora é a única fonte — desde 2026-09-12, `src/pages/jobanalysis.astro` lê essa tabela dinamicamente (`parseGapsTransversais()`) em vez de manter um array `gaps[]` hardcoded. Esta lista aqui embaixo ainda é mantida manualmente (é prosa de changelog, não código), então ao fechar ou reabrir um gap no `_index.md`, atualizar também aqui.

- 🔴 **Métricas de impacto** (`⬜`) (todas as vagas) — Enterprise AI, Shipping, Arezzo, Hypera
- 🔴 **Artefatos visíveis** (todas as vagas) — expor telas, flows ou wireframes; imagens já adicionadas em 6 cases (2026-06-20/07-12) mas o gap segue aberto no bench — vagas analisadas depois da adição ainda cobram mais artefatos
- 🔴 **Mobile nativo (iOS/Android)** (14 vagas) — Fetch, alt.bank, Deel, Tractian, Revolut, SAP Concur, Segware, Vivo, Zuri, DuckDuckGo, Asaas, Méliuz, CloudWalk, iFood; Power Apps é low-code, não conta como equivalente
- 🔴 **UX Research estruturado** (22 vagas) — nenhum case documenta protocolo, roteiro ou síntese formal de research/testes de usabilidade, só discovery informal (Clarity, workshops, entrevistas)
- 🟠 **Acessibilidade documentada** (SAP, BTG, Boticário) — enterprise cases com `⬜`; Cartela Cores é a referência WCAG 1.4.1
- Página About dedicada (`/about` + `/pt/about`)

### Concluído desde a última auditoria (não relançado formalmente)
- Lighthouse mobile 95+ atingido (2026-06-19: FCP 1.0s/100, LCP 2.0s/97, Speed Index 1.0s/100)
- Responsividade fina nos 3 breakpoints (2026-06-23)
- Sitemap.xml (2026-06-19)
- Imagens reais dos cases via `card-home.*`/`hero.*` (2026-06-20), substituindo o plano original de `cover.webp`

---

## 2026-06-12

### Adicionado
- **Bench_job_applications/** — nova pasta substituindo `BENCHMARK.md`; estrutura com arquivo por vaga + `_index.md` global com metodologia de score e gaps transversais
- **11 vagas analisadas** com score de aderência (Person-Job Fit ponderado 0–3, obrigatórios ×2, preferidos ×1):
  - Grupo Boticário · **76%** · Aderência parcial
  - BTG Pactual · **73%** · Aderência parcial
  - TOTVS ERP Moda · **67%** · Aderência parcial
  - MJV · Alelo RangoDS · **65%** · Aderência parcial
  - Méliuz · **59%** · Aderência baixa
  - Banco PAN · **58%** · Aderência baixa
  - Grupo Decolar Growth · **54%** · Aderência baixa
  - SAP Concur / TripIt · **52%** · Aderência baixa (migrado do BENCHMARK.md)
  - Bridger · **50%** · Aderência baixa
  - C&A · **46%** · Aderência baixa
  - Madeira Madeira Fintech & Credit · **41%** · Aderência baixa
- **Média geral: 60%** · Gaps transversais: artefatos visíveis (11/11), métricas (11/11), acessibilidade enterprise (8/11), UX Research estruturado (4/11)

### Conteúdo
- **Acessibilidade — 8 cases enterprise atualizados** (PT + EN): Enterprise AI, Shipping, Hypera, Arezzo — `⬜` substituídos por decisões WCAG reais derivadas do que já estava no case:
  - Enterprise AI: painel de fontes persistente acessível por teclado/leitor de tela (WCAG 2.1.1)
  - Shipping: timeline por cor + densidade (WCAG 1.4.1)
  - Hypera: badge numérico ícone + número, não só cor (WCAG 1.4.1)
  - Arezzo: badges de status com rótulo textual + cor (WCAG 1.4.1)

### Performance
- **Self-hosting de fontes** — DM Serif Display e Barlow migradas de Google Fonts para `public/fonts/` (5 arquivos woff2, subset latin); eliminado round-trip para fonts.googleapis.com no mobile
- **Preload hints** adicionados em `Base.astro` para Barlow 500 e DM Serif Display (LCP critical path)
- **Contraste footer dark mode** — `--color-faint` corrigido de `#6a5a52` (2.82:1, reprovado) para `#8a7a70` (~4.8:1, WCAG AA) no dark mode

### Documentação
- **Roadmap** — subitens da revisão de voz (`🟠 Alto` e `🟡 Médio`) marcados como concluídos com data; itens riscados para preservar histórico; nova seção "Melhorias críticas de conteúdo" com tabela de prioridades derivada do bench (11 vagas)
- **cases-portfolio.md** — seção "⚠️ Revisão de voz pendente" convertida em "✅ Revisão de voz concluída"; pendências de conteúdo reordenadas por criticidade com contexto de vagas afetadas
- **CLAUDE.md** — Estado atual atualizado: bench context + próximas ações ordenadas por criticidade
- **portfolio-readme.md** — seção Pendente reordenada por criticidade com contexto de vagas afetadas
- **CHANGELOG.md** — seção Pendente reordenada por criticidade
- **BENCHMARK.md** — deprecado; conteúdo migrado para `Bench_job_applications/sap-concur-tripit.md`

---

## 2026-06-11 (2)

### Alterado
- **Header** — toggle de tema e switcher de idioma separados em dois pills independentes (era um único `controls-pill`)
- **Language switcher** — redesenhado como switch segmentado: idioma ativo com pill interno preenchido (`--color-cha-mate` bg + `--color-page-bg` text), idioma inativo como link discreto com hover; ambos os idiomas são links quando não selecionados
- **ThemeToggle** — borda circular própria removida; pill do header é o container visual; tamanho ajustado de 30 → 28px
- **Career logos** — dark mode: `filter: brightness(0) invert(1)` + `opacity: 0.85` (coloridos no light, brancos no dark); bounding box `22×94px` (era `28×50px`); logos atualizados: `cwi.avif` → `cwi.png`, `intelipost.avif` → `Intelipost.png` (fundo transparente)

---

## 2026-06-11

### Adicionado
- **Case #9: Microsoft Power Apps · Dummy App** (`power-apps-dummy-app`) — PT + EN, `draft: false`

### Concluído
- **Revisão de voz dos cases** — 9 cases (18 arquivos PT+EN) reescritos com base no case-writing-guide: AI tells removidos, dúvida expressa adicionada, Impact sections vazias substituídas por "O que eu faria diferente", endings pessoais, anos e ordem dos cards corrigidos no frontmatter

### Auditado
- **Lighthouse** em produção (`portfolio.jefersonfreiry.com`):
  - Desktop: Performance **99** · Acessibilidade **95** · Best Practices **100** · SEO **100** ✅
  - Mobile: Performance **73** · Acessibilidade **95** · Best Practices **100** · SEO **100** ⚠️
  - Causas da performance mobile baixa: Google Fonts render-blocking 2.270ms, LCP element (background-image Unsplash) sem `fetchpriority`, Speed Index 10.0s, FCP 3.1s, LCP 4.0s
  - A11y pendente: `color-contrast` footer/seletor de idioma, `label-content-name-mismatch` link PT, 2 logos sem dimensões explícitas

---

## 2026-06-07 (2)

### Adicionado
- **Proteção por senha nos cases** via middleware SSR + cookie httpOnly:
  - `src/middleware.ts` — intercepta `/work/*` e `/pt/work/*`, verifica cookie `portfolio_auth`
  - `src/pages/api/login.ts` — POST que valida senha e define cookie de 30 dias
  - `src/pages/api/logout.ts` — POST que apaga o cookie e redireciona para `/`
  - `src/pages/login.astro` — tela de login com tratamento de erro
- **`astro.config.mjs`** — output `static` → `hybrid` para suportar SSR no middleware

### Alterado
- `src/pages/work/[slug].astro` — convertido para SSR: removido `getStaticPaths()`, adicionado `export const prerender = false`, carrega entry dinamicamente via `Astro.params.slug`
- `src/pages/pt/work/[slug].astro` — mesma conversão para SSR

### Próximo passo obrigatório
- Adicionar variável `PORTFOLIO_PASSWORD` no painel Vercel (Settings → Environment Variables → Production) para ativar a proteção

---

## 2026-06-07

### Adicionado
- **6 cases novos** em PT + EN (12 arquivos `.md`):
  - `painel-saude` — Dashboard pessoal Strava + Hevy
  - `shipping-capacity-platform` — Plataforma de logística marítima
  - `arezzo-ad-management` — Sistema de anúncios multi-perfil Arezzo&Co
  - `del-valle-website` — Redesign site Del Valle "Cheio de vida"
  - `hypera-hypergestor` — Sistema de verbas de trade marketing Hypera Pharma
  - `del-valle-kapo` — Redesign site Del Valle Kapo "Sempre Criança 2.0"

### Alterado
- **Home EN + PT** migradas de array hardcoded para `getCollection` — cases lidos da content collection, ordenados por `order`, filtrados por `draft: false`
- **Roadmap** atualizado: Fase 3 e Fase 4 marcadas como concluídas

---

## 2026-06-06

### Adicionado
- Seção **Education/Formação** na home (EN + PT): Feevale + Uniritter em grid 2 colunas
- Seção **Career/Carreira** na home (EN + PT): 5 cards em grid responsivo (eSales → Intelipost → CWI → ilegra → Braskem) com link para LinkedIn
- Seção **About/Sobre** na home (EN + PT): 2 parágrafos com foco em enterprise e sistemas complexos

### Alterado
- **Hero** atualizado com nome completo, tagline e parágrafo descritivo alinhados ao site Framer

---

## 2026-06-05 · Fase 2 — Componentes e layout

### Adicionado
- Componentes: `Header.astro`, `Hero.astro`, `CaseCard.astro`, `Footer.astro`
- Home page EN (`/`) e PT (`/pt`) com Hero + grid de cases (4 cards hardcoded)
- View Transitions API (Astro 6) entre páginas
- CSS tokens do design system em `global.css` via Tailwind v4 `@theme`
- Documentação: `docs/design-system.md`, `docs/cases-portfolio.md`, `docs/roadmap.md`

---

## 2026-06-05 · Fase 1 — Fundação

### Adicionado
- Setup inicial: Astro 5 + TypeScript strict + Tailwind CSS v4 + Svelte 5
- i18n routing (EN padrão `/`, PT em `/pt`)
- Adapter Vercel com Web Analytics
- Fontes Manrope + Inter via Google Fonts
- Domínio `portfolio.jefersonfreiry.com` configurado (Cloudflare + Vercel)
