# Plano de implementação — Camada de ingestão de vagas

## Objetivo
Construir uma camada que, diariamente, busca vagas novas em várias fontes, filtra por perfil e senioridade, e alimenta o **motor de análise que já existe** (`jobanalysis`) e o bench (`Bench_job_applications/`). **Não reimplementar a análise nem o scoring** — reaproveitar o que já está no repo.

---

## PASSO 0 — Ler antes de escrever qualquer código
Antes de propor solução, leia e me confirme (em resumo) o que encontrou:
- `src/pages/api/jobanalysis-analyze.ts`, `jobanalysis-create.ts`, `jobanalysis-update.ts` — identifique as funções reaproveitáveis: extração da JD (Groq), geração da ficha (Claude), `calcScore`, `scoreLabel`, geração de slug, e qualquer função que reescreve o bloco de score. **Anote as assinaturas reais** (os nomes abaixo são suposições minhas — corrija com o que estiver no código).
- `Bench_job_applications/_index.md` — colunas do dashboard, como a média geral é calculada, vocabulário de Status/Candidatura.
- Uma ficha de exemplo (ex.: `Bench_job_applications/sap-concur-tripit.md`) — é o template exato a reproduzir.
- `CLAUDE.md` (raiz) — convenções de nome de arquivo, regras de reconciliação e os gaps transversais.

Depois disso, **proponha um plano curto e espere meu OK** antes de implementar.

---

## Arquitetura
Princípio central: **um cérebro, dois consumidores.** A lógica de análise não pode ser duplicada.

- `src/lib/jobanalysis/core.ts` — extrair as funções puras de `jobanalysis-analyze.ts` (extração, geração de ficha, `calcScore`, slug, classificação). Refatorar a rota web pra **importar** dessas funções, sem mudar o comportamento do site.
- `scripts/ingest/sources/*.ts` — um *adapter* por fonte REST, cada um retornando `RawJob[]`.
- `scripts/ingest/orchestrate.ts` — o runner diário.
- `config/target-companies.json` — lista `{ name, ats, slug, origin }` das empresas-alvo (para os adapters de ATS).
- `.github/workflows/ingest.yml` — cron diário chamando `node orchestrate.ts` com os segredos das fontes REST (Greenhouse/Remotive/Adzuna). **Não inclui Gupy** (ver decisão abaixo).
- `data/ingest-ledger.json` — registro de URLs já avaliadas (inclusive as reprovadas), para não reanalisar.

> **Decisão (2026-09-28): Gupy roda manual/local, não em CI.** O MCP do Gupy (`Gupy MCP - Candidato`) está registrado como *connector* da conta claude.ai do autor, sem URL/comando portável — não existe um `.mcp.json` válido pra isso, e o GitHub Actions não tem acesso à sessão/OAuth do claude.ai pra autenticar um `claude -p` lá. Ao invés de bloquear o resto do pipeline nisso, o Gupy é buscado à parte: o autor roda a busca (`search_jobs` com as variações de termo) aqui no Claude Code, que já tem o connector, salva o resultado bruto em JSON e roda `orchestrate.ts --gupy-json <arquivo>` pra normalizar e seguir o pipeline. As fontes REST (Greenhouse, Remotive, Adzuna) seguem 100% automáticas no cron diário. Reavaliar se/quando existir um jeito portátil de autenticar o MCP do Gupy fora da sessão do autor.

---

## Schema comum (o que cola tudo)
```ts
type RawJob = {
  source: 'gupy' | 'greenhouse' | 'lever' | 'ashby' | 'remotive' | 'remoteok' | 'adzuna';
  externalId: string;      // id da vaga na fonte
  title: string;
  company: string;
  description: string;     // JD COMPLETA -> alimenta o analisador direto, sem novo fetch
  url: string;
  location?: string;
  workplace?: 'remote' | 'hybrid' | 'onsite';
  publishedAt: string;     // ISO -> usado no diff diário ("só o novo desde ontem")
  origin: 'br' | 'intl';   // decide a cota de senioridade
};
```

---

## Pipeline do run diário (`orchestrate.ts`)
1. **Coleta** — cada adapter busca só o que é novo desde a última execução e normaliza pra `RawJob`.
2. **Classifica senioridade** pelo título: `sr` (Sênior/Especialista/Staff/Lead/Principal) · `pleno` (Pleno/Mid/Intermediate) · `junior` (Júnior/Junior/Trainee).
3. **Aplica cota como PRIORIDADE, não corte duro**: origem `br` mira ~80% Sr / 20% Pleno; origem `intl` ~50/50. Vaga fora do alvo não é descartada — só entra com prioridade menor.
4. **Dedup** contra (a) o bench, por `url` e por slug `empresa-cargo`, e (b) o `ingest-ledger.json` de URLs já avaliadas-e-reprovadas — para não requeimar token numa vaga de score baixo todo dia.
5. **Analisa** os sobreviventes com o **motor existente** (Groq extrai → Claude gera ficha → `calcScore` determinístico). Nada de reescrever o scoring.
6. **Gate por score**: `>= 40` vira ficha completa no bench + linha no `_index.md` (recalcular a média); `< 40` cai num digest leve (`Bench_job_applications/_digest.md`). *(Ajustado de 60 para 40 em 2026-09-28, a pedido do autor, após os primeiros testes manuais — só o pior nível de aderência, "Desalinhamento estrutural", fica de fora da ficha completa.)*
7. **Reconcilia** o `_index.md` **preservando** Status/Candidatura das linhas existentes, e faz commit. Idempotente: rodar 2× no mesmo dia não duplica nada.

---

## Fontes
**v1 (implementar agora):**
- **Gupy** — via MCP (`mcp__Gupy_MCP_-_Candidato__search_jobs`). Rodar variações de termo: `product designer`, `designer de produto`, `ux designer`, `designer de experiência`. Filtros úteis: `workplaceTypes`, `state`, `sortBy: publishedDate`. A resposta **já traz a descrição completa** (alimenta o analisador direto). Sem filtro nativo de senioridade → classificar pelo título. Salário quase sempre `not_disclosed`. Ignorar `isConfidentialCareerPage` para resolução de empresa.
- **Greenhouse** — `https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true` (sem chave). Roda sobre `config/target-companies.json`.
- **Remotive** — `https://remotive.com/api/remote-jobs?search=designer` (sem chave; bucket internacional).
- **Adzuna** — `https://api.adzuna.com/v1/api/jobs/{pais}/search/1?app_id=...&app_key=...&what=product+designer` (chave grátis). País `br` + mercados de fora.

**Depois:** Lever, Ashby, RemoteOK, Jobicy, Himalayas.

> Observação: Gupy + Remotive + Adzuna já entregam valor **sem** a lista de empresas-alvo pronta. O adapter de Greenhouse pode começar com poucas empresas (ex.: iFood — verificar o slug canônico do board) e crescer conforme a lista de alvos for montada.

---

## Restrições
- **NÃO** reimplementar o scoring — usar `calcScore`.
- **NÃO** tocar nas páginas de case existentes, na auth, nem no `og-default.png`.
- Manter o mapa empresa→slug em `config/target-companies.json`, não hardcoded no adapter.
- Respeitar exigência de atribuição de Remotive/RemoteOK se algo for exposto publicamente.

---

## Segredos e execução
- **Local (.env):** `GROQ_API_KEY`, `ANTHROPIC_API_KEY`, `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`.
- **CI (GitHub Secrets):** os mesmos + `CLAUDE_CODE_OAUTH_TOKEN` (gerado com `claude setup-token`, conta na assinatura) para a orquestração + MCP do Gupy. A análise usa `GROQ_API_KEY`/`ANTHROPIC_API_KEY` (pay-per-token, barato pro volume).
- As gravações acontecem no runner do CI, que faz o commit de volta — a produção da Vercel é read-only.

---

## Ordem de implementação (incremental — plano → código → diff → confirmar em cada etapa)
1. ✅ Extrair `core.ts` e refatorar a rota web pra usá-lo; garantir que o site ainda buila.
2. ✅ `RawJob` + adapter de **Greenhouse** (com filtro de cargo — o endpoint devolve o board inteiro, sem filtro trazia 2557 vagas irrelevantes de 12 empresas).
3. ✅ Adapter do **Gupy** via MCP — manual/local (sem `.mcp.json`, ver decisão acima).
4. ✅ `orchestrate.ts` com classificação/cota/dedup/gate/reconciliação.
5. ✅ Analisador real + escrita de fichas + reconciliação do `_index.md` — testado com ~100 vagas reais (Gupy + Greenhouse).
6. ✅ Adapters de **Adzuna** e **Remotive** — ambos com bugs reais corrigidos após teste (Remotive: parâmetro `search` da API grátis não filtra nada, filtro movido pro cliente; Adzuna: parâmetro `content_type` quebrava com 400).
7. ✅ Workflow `.github/workflows/ingest.yml` — cron diário 08:00 BRT + `workflow_dispatch` manual. GitHub Secrets configurados (`GROQ_API_KEY`, `ANTHROPIC_API_KEY`, `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`) — cron rodando em produção desde 2026-09-30.

**Extras implementados fora da ordem original, a pedido do autor:**
- Gate ajustado de 60% pra 40% (2026-09-28).
- Campo `**Origem:**` nas fichas da ingestão + badge "🤖 Automático" e stat card clicável (filtro) na `/jobanalysis`.
- Modal "Config. Ingestão" (`config/ingest-filters.json`) — idade máxima, senioridade, origem, modalidade (remoto/híbrido/presencial), exclusão de "banco de talentos".
- Bug crítico corrigido: nenhuma ficha da ingestão arquivava a JD original de verdade (Claude resumia/truncava) — `analyze-job.ts` agora sobrescreve a seção com o texto real do adapter.
- Captura de **Salário** (quando a fonte expõe) e **Localização**/**Modalidade** nas fichas automáticas — a partir de 2026-09-30, não retroativo.
- Filtro `excludeRestrictedRemote` (`scripts/ingest/filters.ts`) — descarta antes da análise vagas remotas cujo texto de localização indica país fora do BR/LATAM (ex: "Remote - USA"), que o autor não pode de fato candidatar. Heurística por regex (`REMOTE_ALLOWED_PATTERN`/`REMOTE_COUNTRY_PATTERN`), não garantida — pode deixar passar ou bloquear casos de borda.
- `/jobanalysis` reestruturada como página "independente": menu próprio construído a partir das seções (não usa mais `Header.astro` do portfólio), expander/collapse em todas as seções, filtros e estado das seções persistidos em `localStorage` entre recarregamentos.
- Dedup em lote (`dedupByUrl`) ganhou chave por conteúdo (fonte+empresa+cargo+início da descrição) — a Adzuna publica o mesmo anúncio uma vez por cidade/escritório, com URLs diferentes; sem isso a mesma vaga era analisada várias vezes na mesma rodada.
- Filtro `isInactiveGupyListing` (`scripts/ingest/filters.ts`) — o próprio Gupy marca no subdomínio quando a página de carreira da empresa foi desativada (ex.: `mesainc&59344&inactive.gupy.io`); link não abre. Achado real (2026-10-01): vaga de 2022 reaparecendo na busca via MCP (índice/cache desatualizado do Gupy) chegou a ser promovida (79%, `mobthink-designer-de-ux.md`) antes do filtro existir — removida do bench. Diferente do filtro de remoto restrito, este é um sinal literal da fonte (não heurística de texto), então roda sempre, sem toggle no modal.
- **Ledger com chave estável (2026-10-02):** a URL que a Adzuna devolve (`redirect_url`) muda a cada chamada da API, mesmo pro mesmo anúncio (token de sessão `se=` diferente em buscas distintas), então o ledger keyed por URL deixava vagas já vistas reaparecerem. Agora o ledger usa `source:externalId` (`ledgerKey()` em `scripts/ingest/dedup.ts`) — `externalId` é estável em todas as fontes. Ledger existente migrado (133 → 132 entradas, 1 colisão real resolvida: duas URLs diferentes do mesmo anúncio). **Limitação que sobrou:** dedup contra o bench (`loadBenchKeys`) ainda compara por "Link da vaga" gravado na ficha — pra fichas vindas da Adzuna, essa URL é a volátil. Corrigir exige gravar o ID externo em cada ficha (campo novo), o que é uma migração de conteúdo maior — não feito ainda.
- **Job Analysis (2026-10-03):** a fila "Prioridade agora" só mostra vagas não candidatadas, e clicar num item abre o card completo num modal. Controle de ordenação por score ou data na seção Vagas. Matriz FOFA recalculada a partir das fichas. Campo `**Candidatura:**` removido (derivado do Status).
- **Análise manual via Claude Code, sem gastar a Anthropic API (2026-10-02):** com o saldo da conta Anthropic zerado (ver incidente 2026-09-30), 3 vagas do Adzuna falharam na análise automática e ficaram pendentes: Ademicon, Tensec, TOTVS. Como falha não grava nada no ledger nem em arquivo (não-destrutivo por design), elas não ficam "na fila" em lugar nenhum — só reaparecem se a mesma busca da Adzuna ainda as trouxer na janela atual de resultados. Rodando o dry-run de novo em 2026-10-02: **só a Tensec ainda estava disponível** (Ademicon e TOTVS saíram da janela de resultados da API, que não pagina pra buscar um anúncio específico antigo — ficaram irrecuperáveis). Pra Tensec, a descrição da API da Adzuna também estava truncada (limitação conhecida) — JD completa recuperada direto da página pública da Adzuna via fetch de URL. Análise feita manualmente pelo Claude Code (mesma sessão interativa), seguindo a mesma rubrica/prompt do pipeline (`CLAUDE_SYSTEM_PROMPT` em `core.ts`), com o score recalculado pela mesma função determinística (`calcScore`) e a ficha/ledger/índice escritos reaproveitando as funções reais do pipeline (`writeFicha`, `reconcileIndex`) — não um processo paralelo inventado. **Padrão pra repetir:** quando a API falhar e a vaga ainda estiver disponível na fonte, Claude Code pode analisar direto na sessão (sem custo de API) desde que sempre recalcule o score com `calcScore`, nunca aceite a própria conta de cabeça.
- Mitigação de duplicata cross-fonte (2026-10-01): `loadBenchKeys`/`dedupJobs` (`scripts/ingest/dedup.ts`) agora também comparam o **slug canônico** — palavras do slug ordenadas alfabeticamente (`canonicalizeSlug`) — contra todo o bench, além da URL e do slug exato. Pega o caso real que motivou isso: `contabilizei-senior-product-designer` (Adzuna) vs. `contabilizei-product-designer-senior` (LinkedIn), mesmas 4 palavras em ordem diferente. Verificado contra as 132 vagas do bench atual: zero colisões falsas (nenhuma vaga genuinamente distinta da mesma empresa compartilha o mesmo conjunto de palavras). **Ainda não coberto:** título reescrito de verdade (ex. "UX Designer" vs "UX/UI Designer") não gera o mesmo conjunto de palavras — nesse caso só uma comparação de conteúdo da JD pegaria, e não foi implementada (risco de falso positivo mais alto, ex. FCamara/Brex postam vagas genuinamente diferentes com título quase idêntico).
