export const prerender = false;

import type { APIRoute } from 'astro';
import Groq from 'groq-sdk';
import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

function toSlug(text: string): string {
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

interface ScoreCalc {
  score: number;
  somaObrig: number; maxObrig: number;
  somaPref: number;  maxPref: number;
  totalObt: number;  totalMax: number;
  ok: boolean;
}

function calcScore(md: string): ScoreCalc {
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

function rewriteScoreSection(md: string, c: ScoreCalc): string {
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

function scoreLabel(s: number): string {
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

interface JdExtracted {
  empresa: string;
  produto: string;
  cargo: string;
  nivel: string;
  data: string;
  obrigatorios: string[];
  preferenciais: string[];
}

async function extractWithGroq(jd: string, apiKey: string): Promise<JdExtracted> {
  const groq = new Groq({ apiKey });
  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1500,
    temperature: 0.1,
    messages: [
      { role: 'system', content: GROQ_EXTRACT_PROMPT },
      { role: 'user', content: `Extraia os dados desta vaga:\n\n${jd}` },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? '';
  // Remove possíveis blocos de código do modelo
  const clean = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
  return JSON.parse(clean) as JdExtracted;
}

// ---- Passo 2: Claude analisa os requisitos contra o portfolio ----

const CLAUDE_SYSTEM_PROMPT = `Você é um especialista em análise de aderência de candidaturas para o Product Designer Sênior Jeferson Freiry. Sua tarefa é analisar cada requisito extraído de uma JD e gerar uma análise completa em Markdown com scoring e raciocínio estratégico.

## Portfolio do candidato

**Cases publicados (9 cases — 7 publicados, 2 draft):**
- **Enterprise AI Assistant** (2025, 6 meses) — Evoluiu MVP de assistente de IA em plataforma de conhecimento corporativo. Empresa confidencial (grande multinacional). Foco em rastreabilidade de fontes, transparência e confiança em IA. Discovery com Clarity + entrevistas com usuários. Paradigma conversacional vs. busca. Time cross-funcional com engenharia e dados.
- **Shipping Capacity Platform** (2025, 6 meses) — Substituiu planilhas dispersas por timeline visual para otimização de capacidade de carga marítima. Empresa confidencial. MVP end-to-end com alta complexidade logística e dados. Discovery via workshops recorrentes com especialistas de domínio. Síntese em Mural.
- **Hypera Pharma · Gerenciador de Verbas** (2023, 2 meses) — Sistema de verbas de trade marketing para Hypera Pharma (via ilegra). Pipeline de orçamentos com integração SAP/SEV, gate de aprovação financeira, múltiplos perfis de aprovação. Artefatos reais publicados: matriz de responsabilidades, matriz de descoberta de features, fluxo de usuário.
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
- Artefatos visuais: Arezzo, Hypera, Del Valle Kapo e Del Valle Website (os 4 cases `brand-split`) têm artefatos reais publicados sem senha (screenshots, matrizes, diagramas, canvas de pesquisa, handoff). Enterprise AI e Shipping Platform continuam sem telas publicadas (cliente confidencial)
- Mobile nativo iOS/Android: ausente em todo o portfolio (Power Apps é low-code Microsoft, não app nativo; Arezzo tem narrativa de decisão mobile *responsivo*, não nativo)
- Acessibilidade: Cartela Cores e Hypera/Arezzo têm bullet real de WCAG 1.4.1 (badge cor+texto/ícone); cases enterprise (Enterprise AI, Shipping) têm seção Craft sem menção a acessibilidade
- UX Research estruturado: Arezzo tem board de síntese de pesquisa real (2 entrevistas + 2 painéis, método explícito), Canvas de Proposta de Valor, Jobs to be Done, e um teste de usabilidade real no Maze (perfil Marketing, protótipo pré-handoff) — mas sem protocolo formal documentado (recrutamento, roteiro de tarefas, sessão moderada). Fecha bem pedidos de "artefato de pesquisa publicado"; não fecha pedidos de "teste de usabilidade formal com protocolo"
- Handoff documentado: Arezzo tem documento de handoff real publicado (Job to be Done por fluxo + wireframes anotados + mensagens de erro por campo + modais de sucesso/erro) — único case do portfolio com esse artefato
- Mentoria/liderança de designers: não mencionada em nenhum case
- Domínios ausentes: fintech, saúde, e-commerce consumer, mobile-first

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
**Candidatura:** Não

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
{"empresa":"{empresa}","produto":"{produto}","cargo":"{cargo}","score":0,"data":"{YYYY-MM-DD ou string vazia}","interpretacaoTexto":"{texto do blockquote sem aspas internas}","candidatura":"Não"}`;

async function analyzeWithClaude(
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
    max_tokens: 8000,
    system: CLAUDE_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  });

  if (response.stop_reason === 'max_tokens') {
    console.error('[jobanalysis] Claude response truncated (max_tokens hit) — JD tem muitos requisitos');
  }

  const block = response.content[0];
  if (block.type !== 'text') throw new Error('Resposta inesperada do Claude');
  return block.text;
}

// ---- Handler principal ----

export const POST: APIRoute = async ({ request }) => {
  const _env      = process.env;
  const groqKey   = _env['GROQ_API_KEY']      ?? import.meta.env.GROQ_API_KEY;
  const claudeKey = _env['ANTHROPIC_API_KEY'] ?? import.meta.env.ANTHROPIC_API_KEY;

if (!groqKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY não configurada no .env' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!claudeKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada no .env' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { jd, slug: existingSlug } = await request.json();
    if (!jd?.trim()) {
      return new Response(JSON.stringify({ error: 'Cole a descrição da vaga.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // Passo 1: Groq extrai estrutura da JD
    let extracted: JdExtracted;
    try {
      extracted = await extractWithGroq(jd, groqKey);
    } catch (e) {
      console.error('[jobanalysis] Groq extraction failed:', e);
      throw new Error('Falha na extração da JD. Verifique o formato e tente novamente.');
    }

    if (!extracted.empresa || !extracted.cargo) {
      throw new Error('Não consegui identificar a empresa e/ou o cargo no texto colado. Cole a vaga completa, incluindo o nome da empresa e o título do cargo (não só a lista de requisitos).');
    }

    // Passo 2: Claude analisa os requisitos
    let raw: string;
    try {
      raw = await analyzeWithClaude(extracted, jd, claudeKey);
    } catch (e) {
      console.error('[jobanalysis] Claude analysis failed:', e);
      throw new Error('Falha na análise. Tente novamente.');
    }

    const [mdRaw, metaRaw] = raw.split('---METADATA---');
    if (!mdRaw || !metaRaw) throw new Error('Resposta fora do formato esperado.');

    let meta: Record<string, unknown>;
    try {
      meta = JSON.parse(metaRaw.trim());
    } catch {
      throw new Error('Metadados inválidos na resposta.');
    }

    const today = new Date().toISOString().slice(0, 10);
    const data  = extracted.data || String(meta.data ?? '').trim() || today;

    // Recalcula score deterministicamente — ignora o que o Claude colocou
    const calc  = calcScore(mdRaw);
    const score = calc.ok ? calc.score : 0;

    let finalMd = mdRaw.trim();
    finalMd = finalMd.replace(/\*\*Data da vaga:\*\*[^\n]*/, `**Data da vaga:** ${data}`);
    if (calc.ok) finalMd = rewriteScoreSection(finalMd, calc);

    // Carimbo determinístico (mesmo padrão do score) — alimenta o indicador de
    // "dias parado" no painel. Nunca deixado pro Claude escrever: a data real
    // de quando ESTE arquivo foi gravado é fato do servidor, não julgamento do modelo.
    const hojeISO = new Date().toISOString().slice(0, 10);
    finalMd = finalMd.includes('**Status atualizado em:**')
      ? finalMd.replace(/\*\*Status atualizado em:\*\*[^\n]*/, `**Status atualizado em:** ${hojeISO}`)
      : finalMd.replace(/(\*\*Status:\*\*[^\n]*)/, `$1\n**Status atualizado em:** ${hojeISO}`);

    // Slug e escrita (só funciona localmente — Vercel tem filesystem read-only)
    let slug = existingSlug?.trim() || toSlug(`${extracted.empresa}-${extracted.cargo}`);
    try {
      let filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
      if (!existingSlug && existsSync(filePath)) {
        slug = `${slug}-${Date.now()}`;
        filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
      }
      writeFileSync(filePath, finalMd + '\n', 'utf-8');
    } catch {
      // Silencioso em produção — filesystem read-only na Vercel
    }

    // Parseia gaps para retornar ao card
    const gapsSection = finalMd.split(/## Gaps prioritários/i)[1] ?? '';
    function gapItems(pat: RegExp, strip: RegExp): string[] {
      const m = gapsSection.match(pat);
      const raw = m?.[1]?.trim() ?? '';
      if (!raw || raw.toLowerCase().startsWith('nenhum')) return [];
      return raw.split('\n').map((l) => l.replace(strip, '').trim()).filter(Boolean);
    }
    const bloqueadores = gapItems(/### 🔴 Bloqueadores[^\n]*\n\n([\s\S]*?)(?=\n###|$)/, /^\*\s*/);
    const ausentes     = gapItems(/### 🟡 Diferenciais ausentes[^\n]*\n\n([\s\S]*?)(?=\n###|$)/, /^\d+\.\s*/);
    const boaAderencia = gapItems(/### 🟢 Boa ader[eê]ncia[^\n]*\n\n([\s\S]*?)(?=\n###|$)/, /^[-*]\s*/);

    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        empresa:            extracted.empresa,
        produto:            extracted.produto,
        cargo:              extracted.cargo,
        score,
        interpretacao:      scoreLabel(score),
        interpretacaoTexto: String(meta.interpretacaoTexto ?? ''),
        status:             'A avaliar',
        candidatura:        'Não',
        data,
        tags:               [],
        bloqueadores,
        ausentes,
        boaAderencia,
        obtObrig:  calc.ok ? calc.somaObrig * 2 : 0,
        maxObrigW: calc.ok ? calc.maxObrig  * 2 : 0,
        obtPref:   calc.ok ? calc.somaPref      : 0,
        maxPrefW:  calc.ok ? calc.maxPref       : 0,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('[jobanalysis-analyze]', e);
    const raw = e instanceof Error ? e.message : String(e);
    let msg = 'Erro ao analisar. Tente novamente.';
    if (raw.includes('429') || raw.toLowerCase().includes('quota') || raw.toLowerCase().includes('rate')) {
      msg = 'Limite de requisições atingido. Aguarde 1 minuto e tente novamente.';
    } else if (raw.includes('formato esperado')) {
      msg = 'A IA retornou um formato inesperado. Tente novamente.';
    } else if (raw.includes('ANTHROPIC_API_KEY')) {
      msg = 'ANTHROPIC_API_KEY não configurada.';
    } else if (raw.includes('extração') || raw.includes('identificar a empresa')) {
      msg = raw;
    }
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
