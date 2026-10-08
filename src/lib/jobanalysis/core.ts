import Groq from 'groq-sdk';
import Anthropic from '@anthropic-ai/sdk';

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---- Cálculo server-side (determinístico) ----

function extractTableNotes(section: string, stopPattern: RegExp): number[] {
  const [relevant] = section.split(stopPattern);
  const notes: number[] = [];
  const lines = (relevant ?? '').split('\n').filter((l) => l.trim().startsWith('|'));
  for (const line of lines) {
    if (/Requisito|Diferencial|Nota|:?---/.test(line)) continue;
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      const nota = parseInt(cells[1]);
      if (!isNaN(nota) && nota >= 0 && nota <= 3) notes.push(nota);
    }
  }
  return notes;
}

export interface ScoreCalc {
  score: number;
  somaObrig: number; maxObrig: number;
  somaPref: number;  maxPref: number;
  totalObt: number;  totalMax: number;
  ok: boolean;
}

export function calcScore(md: string): ScoreCalc {
  const afterObrig = md.split(/### Requisitos obrigat[oó]rios/i)[1] ?? '';
  const afterPref  = md.split(/### Diferenciais preferidos/i)[1] ?? '';

  const notasObrig = extractTableNotes(afterObrig, /### Diferenciais preferidos|### C[aá]lculo/i);
  const notasPref  = extractTableNotes(afterPref,  /### C[aá]lculo/i);

  const somaObrig = notasObrig.reduce((a, b) => a + b, 0);
  const maxObrig  = notasObrig.length * 3;
  const somaPref  = notasPref.reduce((a, b) => a + b, 0);
  const maxPref   = notasPref.length * 3;
  const totalObt  = somaObrig * 2 + somaPref;
  const totalMax  = maxObrig * 2 + maxPref;
  const score     = totalMax > 0 ? Math.round((totalObt / totalMax) * 100) : 0;

  return { score, somaObrig, maxObrig, somaPref, maxPref, totalObt, totalMax, ok: notasObrig.length > 0 };
}

export function rewriteScoreSection(md: string, c: ScoreCalc): string {
  let out = md;

  out = out.replace(
    /## Score de ader[eê]ncia[^\n]*/,
    `## Score de aderência · ${c.score}%`,
  );

  out = out.replace(
    /\*\*Subtotal obrigat[oó]rios:[^\n]*/,
    `**Subtotal obrigatórios: ${c.somaObrig}/${c.maxObrig} × 2 = ${c.somaObrig * 2}/${c.maxObrig * 2}**`,
  );

  out = out.replace(
    /\*\*Subtotal preferidos:[^\n]*/,
    `**Subtotal preferidos: ${c.somaPref}/${c.maxPref}**`,
  );

  const calcBlock =
    `### Cálculo\n\n` +
    `| | Obtido | Máximo |\n|---|---|---|\n` +
    `| Obrigatórios (×2) | ${c.somaObrig * 2} | ${c.maxObrig * 2} |\n` +
    `| Preferidos (×1) | ${c.somaPref} | ${c.maxPref} |\n` +
    `| **Total** | **${c.totalObt}** | **${c.totalMax}** |\n\n` +
    `**Score: ${c.totalObt}/${c.totalMax} = ${c.score}%**`;

  out = out.replace(/### C[aá]lculo[\s\S]*?\*\*Score:[^\n]*/, calcBlock);

  return out;
}

// ---- Taxonomia canônica de skills (estilo "Competências" do LinkedIn) ----
//
// Movida de jobanalysis.astro (2026-10-02) pra ser reaproveitada também pelo
// match ATS (calcAtsMatch, abaixo) — mesmo princípio "um cérebro, dois
// consumidores" do resto deste arquivo. O texto cru de cada requisito de JD é
// único demais pra virar contagem/comparação útil (446 frases distintas em
// 57 vagas, quase todas com 1 ocorrência) — a mesma habilidade aparece como
// "Domínio de Figma", "Proficiência em Figma" e "Figma avançado" em três
// vagas diferentes. Esta tabela reduz isso a um vocabulário fixo de ~40
// competências, cada requisito podendo bater em mais de uma.
export const ELIGIBILITY_PATTERN = /\b(anos? de experi[êe]ncia|gradua[çc][ãa]o|forma[çc][ãa]o (em|acad[êe]mica)|ensino superior|bachelor|degree in)\b/i;

export const SKILL_TAXONOMY: { canon: string; categoria: 'hard' | 'soft'; pattern: RegExp }[] = [
  // Hard — ferramentas e técnicas
  { canon: 'Figma',                              categoria: 'hard', pattern: /figma/i },
  { canon: 'Prototipação',                       categoria: 'hard', pattern: /prototip|protót|prototype/i },
  { canon: 'Wireframes',                         categoria: 'hard', pattern: /wireframe/i },
  { canon: 'UX/UI Design',                       categoria: 'hard', pattern: /\bux\b.{0,3}\bui\b|\bui\b.{0,3}\bux\b|design de intera[çc][ãa]o|interaction design|design visual|visual design|ui design|ui kit|ui art|ui craft|design refined/i },
  { canon: 'Arquitetura da Informação',          categoria: 'hard', pattern: /arquitetura d[ae] informa[çc][ãa]o|information architecture/i },
  { canon: 'Design Systems',                     categoria: 'hard', pattern: /design system/i },
  { canon: 'Pesquisa com Usuários (UX Research)', categoria: 'hard', pattern: /pesquisa|\bresearch\b|entrevista/i },
  { canon: 'Discovery / Design Thinking',        categoria: 'hard', pattern: /discovery|design thinking|valida[çc][ãa]o de hip[óo]tese/i },
  { canon: 'Testes de Usabilidade',              categoria: 'hard', pattern: /usabilidade|usability/i },
  { canon: 'Acessibilidade (WCAG)',              categoria: 'hard', pattern: /acessibilidade|wcag|accessibility/i },
  { canon: 'Métricas de Produto / Dados',        categoria: 'hard', pattern: /m[ée]trica|\bkpi\b|data-inform|data-heavy|indicador|analytics|a\/b test/i },
  { canon: 'Handoff / Documentação Técnica',     categoria: 'hard', pattern: /handoff|handover|especifica[çc][ãa]o t[ée]cnica|documenta[çc][ãa]o/i },
  { canon: 'Design Responsivo / Mobile',         categoria: 'hard', pattern: /\bmobile\b|responsiv|\bios\b|\bandroid\b|app nativo|para celular/i },
  { canon: 'Design de Serviço / Jornadas',       categoria: 'hard', pattern: /jornada|service design|design de servi[çc]o|blueprint/i },
  { canon: 'Metodologias Ágeis',                 categoria: 'hard', pattern: /\b[aá]gil|agile|scrum|sprint/i },
  { canon: 'IA aplicada a Design',               categoria: 'hard', pattern: /\bia\b|\bai\b|intelig[êe]ncia artificial|\bllm\b|prompt/i },
  { canon: 'Front-end (HTML/CSS)',               categoria: 'hard', pattern: /\bhtml\b|\bcss\b|front-?end/i },
  { canon: 'Inglês',                             categoria: 'hard', pattern: /ingl[êe]s|english/i },
  { canon: 'Espanhol',                           categoria: 'hard', pattern: /espanhol|spanish/i },
  { canon: 'Portfólio / Processo de Design',     categoria: 'hard', pattern: /portf[óo]lio|portfolio|\bcraft\b/i },
  { canon: 'Motion Design',                      categoria: 'hard', pattern: /motion/i },
  { canon: 'Facilitação de Workshops',           categoria: 'hard', pattern: /workshop|facilita/i },
  { canon: 'Gestão / Visão de Produto',          categoria: 'hard', pattern: /vis[ãa]o de produto|product thinking|gerenciamento de produto|product management|ciclo de vida do produto/i },
  { canon: 'Growth / Conversão',                 categoria: 'hard', pattern: /growth|convers[ãa]o|reten[çc][ãa]o|funil/i },
  { canon: 'Domínio Fintech / Pagamentos',       categoria: 'hard', pattern: /fintech|pagamento|cr[ée]dito|financeir/i },

  // Soft — comportamento e colaboração
  { canon: 'Comunicação',                        categoria: 'soft', pattern: /comunica[çc][ãa]o|communication/i },
  { canon: 'Colaboração Multifuncional',         categoria: 'soft', pattern: /colabora|multidisciplinar|cross-?funcional|cross[- ]functional/i },
  { canon: 'Gestão de Stakeholders',             categoria: 'soft', pattern: /stakeholder/i },
  { canon: 'Autonomia / Ownership',              categoria: 'soft', pattern: /autonomia|ownership|senso de dono|proativ/i },
  { canon: 'Adaptabilidade / Ambiguidade',       categoria: 'soft', pattern: /ambigu|adapta[çc][ãa]o|flexibilidade|mudan[çc]as? (frequentes|de)/i },
  { canon: 'Pensamento Crítico / Analítico',     categoria: 'soft', pattern: /cr[íi]tico|anal[íi]tic|racioc[íi]nio l[óo]gico/i },
  { canon: 'Liderança / Mentoria',               categoria: 'soft', pattern: /lideran[çc]a|mentoria|mentor|leadership/i },
  { canon: 'Visão Estratégica',                  categoria: 'soft', pattern: /estrat[ée]g|strategic/i },
  { canon: 'Organização / Priorização',          categoria: 'soft', pattern: /organiza[çc][ãa]o|prioriza[çc][ãa]o|gest[ãa]o de tempo/i },
  { canon: 'Empatia / Centrado no Usuário',      categoria: 'soft', pattern: /empatia|centrad[ao] no usu[áa]rio|human-centered/i },
  { canon: 'Argumentação / Apresentação',        categoria: 'soft', pattern: /argumenta|apresenta[çc][ãa]o|storytelling/i },
  { canon: 'Curiosidade / Perfil Investigativo', categoria: 'soft', pattern: /curiosidade|investigativ|curios/i },
  { canon: 'Negociação / Mediação de Conflitos', categoria: 'soft', pattern: /negocia|media[çc][ãa]o|conflito/i },
  { canon: 'Trabalho Remoto / Autogestão',       categoria: 'soft', pattern: /trabalho remoto|remoto|autogest[ãa]o|self-motivated|disciplina/i },
];

/** Retorna os nomes canônicos que o texto do requisito bate — pode ser mais de um, ou nenhum. */
export function canonicalizeSkill(text: string): { canon: string; categoria: 'hard' | 'soft' }[] {
  if (ELIGIBILITY_PATTERN.test(text)) return [];
  return SKILL_TAXONOMY.filter((s) => s.pattern.test(text)).map((s) => ({ canon: s.canon, categoria: s.categoria }));
}

// ---- Match ATS (currículo × requisitos da vaga) ----
//
// Complementa o Score de aderência (que mede se o PORTFOLIO demonstra a
// competência, por julgamento do Claude) com uma checagem mecânica e
// literal: o texto do CURRÍCULO (documento que de fato passa por parsing de
// ATS) contém as palavras do nome canônico da competência? Pensado como "o
// que um parser raso de ATS acharia", não como substituto do score de
// aderência real.
const PT_STOPWORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'com', 'para', 'a', 'o', 'as', 'os', '/']);

function significantWords(canon: string): string[] {
  return canon
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 0 && !PT_STOPWORDS.has(w));
}

// Todas as palavras significativas do nome canônico precisam aparecer (como
// palavra inteira, em qualquer lugar do currículo) pra contar como "match" —
// não precisa ser a frase exata nem estar contígua.
function canonMatchesResume(canon: string, normalizedResumeText: string): boolean {
  const words = significantWords(canon);
  if (words.length === 0) return false;
  return words.every((w) => new RegExp(`\\b${w}\\b`).test(normalizedResumeText));
}

export interface AtsMatchResult {
  pct: number | null; // null = vaga sem requisito mapeável pra nenhuma competência canônica
  matched: string[];
  missing: string[];
}

/**
 * requirementTexts: texto bruto de cada requisito obrigatório da vaga (coluna
 * "Requisito" da tabela já limpa, sem markdown). resumeText: resultado de
 * getResumeText() (resume-text.ts), já normalizado (minúsculo, sem acento).
 */
export function calcAtsMatch(requirementTexts: string[], resumeText: string): AtsMatchResult {
  const canonSet = new Map<string, boolean>(); // canon -> já visto
  for (const text of requirementTexts) {
    for (const { canon } of canonicalizeSkill(text)) {
      if (!canonSet.has(canon)) canonSet.set(canon, canonMatchesResume(canon, resumeText));
    }
  }

  if (canonSet.size === 0) return { pct: null, matched: [], missing: [] };

  const matched: string[] = [];
  const missing: string[] = [];
  for (const [canon, hit] of canonSet) (hit ? matched : missing).push(canon);

  return { pct: Math.round((matched.length / canonSet.size) * 100), matched, missing };
}

// Classificação de senioridade a partir de texto livre (campo "**Nível:**" da
// ficha, ou `nivel` extraído pelo Groq) — mesma família de regex do
// classificador usado na ingestão (scripts/ingest/classify.ts), centralizada
// aqui pra servir tanto a página (/jobanalysis, badge do card) quanto a API de
// análise (resposta usada pra reconstruir o card sem reload). Ordem importa:
// "Especialista Sênior" bate em Sênior primeiro.
const SENIORIDADE_SR_PATTERN     = /s[eê]nior|especialista|staff|lead|principal/i;
const SENIORIDADE_PLENO_PATTERN  = /\bpleno\b|\bmid[- ]?level\b|\bmid\b|intermediate/i;
const SENIORIDADE_JUNIOR_PATTERN = /j[uú]nior|trainee/i;
export function classifySenioridade(nivelRaw: string): string {
  if (SENIORIDADE_SR_PATTERN.test(nivelRaw)) return 'Sênior';
  if (SENIORIDADE_PLENO_PATTERN.test(nivelRaw)) return 'Pleno';
  if (SENIORIDADE_JUNIOR_PATTERN.test(nivelRaw)) return 'Júnior';
  return '';
}

export function scoreLabel(s: number): string {
  if (s >= 80) return 'Alta aderência';
  if (s >= 60) return 'Aderência parcial';
  if (s >= 40) return 'Aderência baixa';
  return 'Desalinhamento estrutural';
}

// ---- Passo 1: Groq extrai estrutura da JD ----

const GROQ_EXTRACT_PROMPT = `Você é um extrator de dados estruturados. Sua única tarefa é extrair informações de uma descrição de vaga de emprego e retornar um JSON válido.

Retorne SOMENTE o JSON, sem nenhum texto antes ou depois. Sem markdown, sem blocos de código.

Estrutura obrigatória:
{
  "empresa": "nome da empresa",
  "produto": "produto, área ou departamento (extraia da JD; use string vazia se não mencionado)",
  "cargo": "título exato da vaga",
  "nivel": "Sênior / Pleno / Júnior / Especialista / etc — extraia do cargo ou contexto; string vazia se não especificado",
  "data": "data da vaga no formato YYYY-MM-DD se mencionada na JD, senão string vazia",
  "obrigatorios": ["cada requisito obrigatório como string separada — extraia UM por linha, sem agrupar"],
  "preferenciais": ["cada diferencial/nice-to-have como string separada — extraia UM por linha, sem agrupar"]
}

Regras:
- Extraia CADA requisito individualmente. Não agrupe, não resuma.
- "obrigatorios" = seção de requisitos obrigatórios / "Esperamos de você" / "O que você precisa"
- "preferenciais" = seção de diferenciais / "Será um diferencial" / "Nice to have" / "Preferencial"
- Se não houver seção de preferenciais, retorne array vazio.`;

export interface JdExtracted {
  empresa: string;
  produto: string;
  cargo: string;
  nivel: string;
  data: string;
  obrigatorios: string[];
  preferenciais: string[];
}

// Modelo principal + um backup ativo — a Groq já descontinuou modelo sem aviso
// uma vez (llama-3.3-70b-versatile), quebrando isso em produção sem sinal
// prévio. Se o principal responder com erro de modelo descontinuado/inválido,
// tenta o backup automaticamente em vez de falhar direto.
export const GROQ_MODELS = ['openai/gpt-oss-120b', 'llama-3.1-8b-instant'];

function isModelUnavailableError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message.toLowerCase() : String(e).toLowerCase();
  return msg.includes('decommission') || msg.includes('model_not_found') || msg.includes('does not exist');
}

export async function extractWithGroq(jd: string, apiKey: string): Promise<JdExtracted> {
  const groq = new Groq({ apiKey });
  let lastError: unknown;

  for (const model of GROQ_MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        max_tokens: 3000,
        temperature: 0.1,
        messages: [
          { role: 'system', content: GROQ_EXTRACT_PROMPT },
          { role: 'user', content: `Extraia os dados desta vaga:\n\n${jd}` },
        ],
      });

      // JDs com bullets longos (parágrafo em vez de frase curta) podem estourar
      // max_tokens e cortar o JSON no meio de uma string — isso vira um
      // "Unterminated string" genérico e confuso no JSON.parse logo abaixo se
      // não for pego aqui primeiro (caso real: vaga Starian, 2026-09).
      if (completion.choices[0]?.finish_reason === 'length') {
        throw new Error('Extração cortada por exceder o limite de tokens (JD com requisitos muito longos/detalhados).');
      }

      const raw = completion.choices[0]?.message?.content ?? '';
      // Remove possíveis blocos de código do modelo
      const clean = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
      return JSON.parse(clean) as JdExtracted;
    } catch (e) {
      lastError = e;
      if (!isModelUnavailableError(e)) throw e; // erro não é sobre disponibilidade do modelo — não adianta trocar
      console.error(`[jobanalysis] Modelo Groq "${model}" indisponível, tentando próximo da lista:`, e);
    }
  }

  throw new Error(
    `Todos os modelos Groq configurados falharam (${GROQ_MODELS.join(', ')}). ` +
    `Provavelmente algum foi descontinuado — verifique https://console.groq.com/docs/deprecations e atualize GROQ_MODELS em core.ts. Último erro: ${lastError instanceof Error ? lastError.message : String(lastError)}`
  );
}

// ---- Passo 2: Claude analisa os requisitos contra o portfolio ----

// Extraído como constante própria porque o gerador de carta de apresentação
// (generateCoverLetter) precisa dos mesmos fatos do portfolio sem duplicar o
// bloco e arriscar as duas versões divergirem com o tempo.
const PORTFOLIO_CONTEXT = `**Cases publicados (9 cases — 7 publicados, 2 draft):**
- **Enterprise AI Assistant** (2025, 6 meses) — Evoluiu MVP de assistente de IA em plataforma de conhecimento corporativo. Empresa confidencial (grande multinacional). Foco em rastreabilidade de fontes, transparência e confiança em IA. Discovery com Clarity + entrevistas com usuários. Paradigma conversacional vs. busca. Time cross-funcional com engenharia e dados.
- **Shipping Capacity Platform** (2025, 6 meses) — Substituiu planilhas dispersas por timeline visual para otimização de capacidade de carga marítima. Empresa confidencial. MVP end-to-end com alta complexidade logística e dados. Discovery via workshops recorrentes com especialistas de domínio. Síntese em Mural.
- **Hypera Pharma · Gerenciador de Verbas** (2023, 2 meses) — Sistema de verbas de trade marketing para Hypera Pharma (via CWI). Pipeline de orçamentos com integração SAP/SEV, gate de aprovação financeira, múltiplos perfis de aprovação. Artefatos reais publicados: matriz de responsabilidades, matriz de descoberta de features, fluxo de usuário.
- **Arezzo Ad Management** (2023, 3 meses) — App white-label de gerenciamento de anúncios pra Arezzo&Co (via empresa de tecnologia parceira), 3 perfis com navegações independentes (Marketing, Gestor de Tráfego, Lojista). Artefatos reais publicados: board de síntese de pesquisa (entrevistas + análise de painéis), Canvas de Proposta de Valor, Jobs to be Done, matriz de responsabilidades, fluxograma de decisão, service blueprint, documento de handoff real (specs + wireframes anotados), teste de usabilidade real no Maze com usuários do perfil Marketing.
- **Power Apps Dummy App** (2025) — App mobile de demonstração de Design System em Microsoft Power Apps. Grande empresa industrial confidencial. +10 componentes documentados, alcance organizacional, biblioteca para adoção por times.
- **Cartela Cores** — Sistema de cores com 18 cores âncora, score ponderado multicanal (cor + ícone + texto), alinhado com WCAG 1.4.1. Tokens de cor com regras de decisão.
- **Del Valle Kapo** (2022, 3 meses) — Redesign de site para campanha Dia das Crianças. Coca-Cola via CWI. Personas reais, benchmark competitivo ilustrativo, sitemap real.
- **Del Valle Website** (2023, 1 mês) — Redesign de homepage com nova identidade visual global. Coca-Cola via CWI. Wireframes responsivos reais, sitemap real.

**Portfolio:** Site bilíngue PT+EN publicado em portfolio.jefersonfreiry.com com todos os cases em dois idiomas — inglês avançado evidenciado diretamente.

**Competências evidenciadas:**
- UX Design e UI Design (processo completo documentado em múltiplos cases)
- Figma (ferramenta central — mencionado em todos os cases enterprise; sem artefatos expostos publicamente)
- Produtos enterprise B2B de alta complexidade (AI, logística, pharma, varejo)
- IA/ML products — design conversacional, transparência, rastreabilidade, confiança
- Design Systems (Power Apps Dummy App, Cartela Cores, Gerenciador de Verbas)
- Arquitetura de informação (Arezzo: 3 perfis; Enterprise AI: paradigma conversacional vs. busca)
- Colaboração cross-funcional (engenharia, produto, dados, stakeholders, especialistas de domínio)
- Discovery end-to-end: de ambiguidade → síntese → MVP em 6 meses
- Trade-offs de design com alternativas descartadas documentadas

**Gaps conhecidos:**
- Métricas de impacto ausentes (⬜) em todos os cases — Arezzo e Hypera são explícitos sobre isso em Aprendizados ("não medimos nada depois do lançamento" / "projeto terminou antes de eu medir")
- Artefatos visuais: Arezzo, Hypera, Del Valle Kapo e Del Valle Website (os 4 cases 'brand-split') têm artefatos reais publicados sem senha (screenshots, matrizes, diagramas, canvas de pesquisa, handoff). Enterprise AI e Shipping Platform continuam sem telas publicadas (cliente confidencial)
- Mobile nativo iOS/Android: ausente em todo o portfolio (Power Apps é low-code Microsoft, não app nativo; Arezzo tem narrativa de decisão mobile *responsivo*, não nativo)
- Acessibilidade: Cartela Cores e Hypera/Arezzo têm bullet real de WCAG 1.4.1 (badge cor+texto/ícone); cases enterprise (Enterprise AI, Shipping) têm seção Craft sem menção a acessibilidade
- UX Research estruturado: Arezzo tem board de síntese de pesquisa real (2 entrevistas + 2 painéis, método explícito), Canvas de Proposta de Valor, Jobs to be Done, e um teste de usabilidade real no Maze (perfil Marketing, protótipo pré-handoff) — mas sem protocolo formal documentado (recrutamento, roteiro de tarefas, sessão moderada). Fecha bem pedidos de "artefato de pesquisa publicado"; não fecha pedidos de "teste de usabilidade formal com protocolo"
- Handoff documentado: Arezzo tem documento de handoff real publicado (Job to be Done por fluxo + wireframes anotados + mensagens de erro por campo + modais de sucesso/erro) — único case do portfolio com esse artefato
- Mentoria/liderança de designers: não mencionada em nenhum case
- Domínios ausentes: fintech, saúde, e-commerce consumer, mobile-first`;

const CLAUDE_SYSTEM_PROMPT = `Você é um especialista em análise de aderência de candidaturas para o Product Designer Sênior Jeferson Freiry. Sua tarefa é analisar cada requisito extraído de uma JD e gerar uma análise completa em Markdown com scoring e raciocínio estratégico.

## Portfolio do candidato

${PORTFOLIO_CONTEXT}

## Metodologia de scoring

Scoring ponderado por Person-Job Fit (Demands-Abilities Fit):
- Requisitos **obrigatórios** = peso 2×
- Diferenciais **preferidos** = peso 1×

**Rubrica (0–3):**
- 0 = Ausente — sem evidência no portfolio
- 1 = Parcialmente evidenciado — mencionado, sem profundidade ou artefatos visíveis
- 2 = Claramente evidenciado — case completo com processo documentado
- 3 = Diferencial — evidência forte com contexto, resultados ou detalhe incomum

## Regras de evidência (coluna "Evidência atual")

- SEMPRE cite o case pelo nome: "Enterprise AI", "Shipping Platform", "Gerenciador de Verbas", "Arezzo", "Power Apps Dummy App", "Cartela Cores", "Del Valle Kapo/Website"
- NUNCA escreva "Parcialmente evidenciado", "Cases publicados" ou "Mencionado" sem especificar qual case e o que exatamente
- Se ausente: "Ausente — [motivo específico ou o que o portfolio tem em vez disso]"
- Se parcialmente evidenciado: "[Case]: [o que tem] — sem [o que falta]"
- Para inglês/idiomas: o portfolio é bilíngue PT+EN = evidência de inglês avançado (nota 3 ou 2 dependendo do nível exigido)

## Regras dos Gaps prioritários

**🔴 Bloqueadores:** Requisitos obrigatórios com nota 0, OU nota 1 em requisito CENTRAL para o negócio da empresa. Para cada bloqueador escreva: (1) por que é bloqueador neste contexto específico, (2) o que exatamente está faltando, (3) como mitigar se possível. Use parágrafos com argumento completo, não só bullet.

**🟡 Diferenciais ausentes:** Diferenciais com nota 0 ou 1. Numerados. Para cada um: contexto de por que importa para esta empresa/vaga + sugestão de ação concreta.

**🟢 Boa aderência:** Bullets concretos. Para cases não diretamente do mesmo domínio, faça o argumento de transferência ("Enterprise AI tem a mesma tensão de confiança que produtos financeiros...").

## Regras gerais

1. Extraia e avalie TODOS os requisitos recebidos — não agrupe nem resuma.
2. Os valores numéricos nos subtotais e tabela de cálculo são placeholders — o servidor recalcula. Coloque 0/0 nos placeholders.
3. Não use blocos de código — markdown puro.
4. O blockquote de interpretação deve ser estratégico: mencione o ponto mais forte E o gap mais crítico, sem revelar o número do score.

## Formato de saída

# {Empresa} · {Cargo}

**Empresa:** {empresa}
**Produto:** {produto}
**Nível:** {nivel}
**Data da vaga:** {data}
**Status:** A avaliar

---

## Score de aderência · {X}%

> {1–2 frases estratégicas sobre o fit — ponto forte + gap crítico, sem mencionar o número}

### Requisitos obrigatórios (peso 2×)

| Requisito | Nota | Evidência atual |
|---|---|---|
| {requisito} | {0–3} | {evidência específica com nome do case} |

**Subtotal obrigatórios: 0/0 × 2 = 0/0**

### Diferenciais preferidos (peso 1×)

| Diferencial | Nota | Evidência atual |
|---|---|---|
| {diferencial} | {0–3} | {evidência específica} |

**Subtotal preferidos: 0/0**

### Cálculo

| | Obtido | Máximo |
|---|---|---|
| Obrigatórios (×2) | 0 | 0 |
| Preferidos (×1) | 0 | 0 |
| **Total** | **0** | **0** |

**Score: 0/0 = 0%**

---

## Job description original

⬜ JD não arquivada — adicionar o texto original aqui.

---

## Gaps prioritários

### 🔴 Bloqueadores de candidatura

{análise estratégica completa de cada bloqueador com argumento e ação}

### 🟡 Diferenciais ausentes

{lista numerada com contexto e ação para cada ausente}

### 🟢 Boa aderência

{bullets com transfer arguments onde necessário}

---METADATA---
{"empresa":"{empresa}","produto":"{produto}","cargo":"{cargo}","score":0,"data":"{YYYY-MM-DD ou string vazia}","interpretacaoTexto":"{texto do blockquote sem aspas internas}"}`;

export async function analyzeWithClaude(
  extracted: JdExtracted,
  jdOriginal: string,
  apiKey: string,
): Promise<string> {
  const anthropic = new Anthropic({ apiKey });

  const userMessage =
    `Analise os requisitos desta vaga para o portfolio de Jeferson Freiry:\n\n` +
    `**Empresa:** ${extracted.empresa}\n` +
    `**Produto/Área:** ${extracted.produto || 'Não especificado'}\n` +
    `**Cargo:** ${extracted.cargo}\n` +
    `**Nível:** ${extracted.nivel || 'Não especificado'}\n` +
    `**Data:** ${extracted.data || 'Não informada'}\n\n` +
    `### REQUISITOS OBRIGATÓRIOS\n` +
    extracted.obrigatorios.map((r) => `- ${r}`).join('\n') +
    `\n\n### DIFERENCIAIS PREFERIDOS\n` +
    (extracted.preferenciais.length > 0
      ? extracted.preferenciais.map((r) => `- ${r}`).join('\n')
      : '_(nenhum diferencial listado na JD)_') +
    `\n\n### JD COMPLETA (para contexto adicional)\n\n${jdOriginal}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 12000,
    system: CLAUDE_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  });

  if (response.stop_reason === 'max_tokens') {
    console.error('[jobanalysis] Claude response truncated (max_tokens hit) — JD tem muitos requisitos');
    // Falha alto e visível em vez de deixar o arquivo ser gravado truncado/quebrado —
    // um bench file cortado no meio passa despercebido até alguém abrir o arquivo.
    throw new Error('A análise foi cortada por exceder o limite de tokens (JD com muitos requisitos). Tente reduzir a JD ou dividir a análise em partes.');
  }

  const block = response.content[0];
  if (block.type !== 'text') throw new Error('Resposta inesperada do Claude');
  return block.text;
}

// ---- Carta de apresentação (sob demanda, não persistida em arquivo) ----
//
// Automatiza o que o autor vinha pedindo manualmente vaga por vaga: resposta
// à pergunta-padrão de formulário de candidatura "Fale sobre você e sua
// trajetória profissional, contando como pode ajudar a empresa no desafio
// descrito na vaga", em até 1500 caracteres. Gerada na hora, sem escrever no
// arquivo — funciona local e em produção (filesystem read-only da Vercel não
// é um problema aqui, diferente da análise/reanálise de vaga).

const COVER_LETTER_SYSTEM_PROMPT = `Você escreve, em primeira pessoa, a resposta de candidatura de Jeferson Freiry (Product Designer Sênior) para um formulário de vaga.

## Portfolio do candidato

${PORTFOLIO_CONTEXT}

## Tarefa

Responda à pergunta "Fale sobre você e sua trajetória profissional, contando como pode ajudar a empresa no desafio descrito na vaga", em até 1500 caracteres (incluindo espaços — limite rígido de campo de formulário).

## Regras

- Primeira pessoa, tom profissional e direto. Sem clichês genéricos ("apaixonado por", "equipe dos sonhos", "fazer a diferença").
- Baseie-se SOMENTE nos fatos do portfolio acima — nunca invente métrica, ferramenta, empresa ou experiência que não esteja listada.
- Conecte 1–2 cases específicos do portfolio (pelo nome) ao desafio descrito na vaga — não liste cases genericamente, argumente a transferência.
- Mencione a empresa e o cargo da vaga pelo nome.
- Não exceda 1500 caracteres. Se o rascunho passar disso, corte, não abrevie palavras.
- Sem saudação ("Prezados", "Olá") nem despedida ("Atenciosamente") — só o corpo do texto corrido, pronto pra colar no campo do formulário.
- Retorne SOMENTE o texto da carta — sem markdown, sem aspas envolvendo o texto, sem comentários antes/depois.`;

export interface CoverLetterJob {
  empresa: string;
  cargo: string;
  produto: string;
  jdOriginal: string;
}

export async function generateCoverLetter(job: CoverLetterJob, apiKey: string): Promise<string> {
  const anthropic = new Anthropic({ apiKey });

  const userMessage =
    `Empresa: ${job.empresa}\n` +
    `Cargo: ${job.cargo}\n` +
    `Produto/Área: ${job.produto || 'Não especificado'}\n\n` +
    `Descrição da vaga (desafio a resolver):\n${job.jdOriginal}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1200,
    system: COVER_LETTER_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  });

  const block = response.content[0];
  if (block.type !== 'text') throw new Error('Resposta inesperada do Claude');
  return block.text.trim();
}
