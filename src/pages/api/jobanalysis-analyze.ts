export const prerender = false;

import type { APIRoute } from 'astro';
import Groq from 'groq-sdk';
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

// ---- Cálculo server-side ----

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

function rewriteDiferenciaisAusentes(md: string): string {
  const afterPref = md.split(/### Diferenciais preferidos/i)[1] ?? '';
  const [prefSection] = afterPref.split(/### C[aá]lculo/i);

  const ausentes: string[] = [];
  const lines = (prefSection ?? '').split('\n').filter((l) => l.trim().startsWith('|'));
  for (const line of lines) {
    if (/Diferencial|Nota|:?---/.test(line)) continue;
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      const nota = parseInt(cells[1]);
      if (nota === 0 || nota === 1) ausentes.push(cells[0]);
    }
  }

  const content = ausentes.length > 0
    ? ausentes.map((d, i) => `${i + 1}. ${d}`).join('\n')
    : 'Nenhum diferencial ausente — todos parcialmente ou plenamente evidenciados.';

  return md.replace(
    /### 🟡 Diferenciais ausentes[\s\S]*?(?=### 🟢|$)/,
    `### 🟡 Diferenciais ausentes\n\n${content}\n\n`,
  );
}

function rewriteBlockers(md: string): string {
  // Extrai requisitos obrigatórios com nota 0
  const afterObrig = md.split(/### Requisitos obrigat[oó]rios/i)[1] ?? '';
  const [obrigSection] = afterObrig.split(/### Diferenciais preferidos|### C[aá]lculo/i);

  const blockers: string[] = [];
  const lines = (obrigSection ?? '').split('\n').filter((l) => l.trim().startsWith('|'));
  for (const line of lines) {
    if (/Requisito|Nota|:?---/.test(line)) continue;
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2 && parseInt(cells[1]) === 0) {
      blockers.push(cells[0]);
    }
  }

  const blockersContent = blockers.length > 0
    ? blockers.map((b) => `* ${b}`).join('\n')
    : 'Nenhum bloqueador crítico identificado.';

  return md.replace(
    /### 🔴 Bloqueadores de candidatura[\s\S]*?(?=###\s|$)/,
    `### 🔴 Bloqueadores de candidatura\n\n${blockersContent}\n\n`,
  );
}

function rewriteScoreSection(md: string, c: ScoreCalc): string {
  let out = md;

  out = out.replace(
    /## Score de ader[eê]ncia[^\n]*/,
    `## Score de aderência · ${c.score}%`,
  );

  // Consome até o fim da linha (incluindo lixo que o modelo colocar após o **)
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

  // [^\n]* no final consome qualquer lixo que o modelo coloque após o Score
  out = out.replace(/### C[aá]lculo[\s\S]*?\*\*Score:[^\n]*/, calcBlock);

  return out;
}

// ---- Prompt ----

const SYSTEM_PROMPT = `Você é um assistente que analisa descrições de vagas de emprego para o Product Designer Sênior Jeferson Freiry e gera análises de aderência em Markdown.

## Portfólio do candidato

**Cases publicados (7):**
- **Enterprise AI Assistant** (2025, 6 meses) — Evoluiu MVP de assistente IA em plataforma de conhecimento corporativo. Empresa confidencial. Foco em rastreabilidade de fontes, transparência e confiança em IA. Time de produto cross-funcional com engenharia e dados.
- **Shipping Capacity Platform** (2025, 6 meses) — Substituiu planilhas dispersas por timeline visual para otimização de capacidade de carga marítima. Empresa confidencial. MVP end-to-end com alta complexidade logística e dados.
- **Hypera HYPERGESTOR** (2023, 2 meses) — Sistema de verbas de trade marketing (Hypera Pharma via ilegra). Pipeline de orçamentos com integração SAP/SEV.
- **Arezzo Ad Management** (2023, 3 meses) — Redesign de plataforma de anúncios em redes sociais para 3 perfis distintos: Marketing, Gestores de Tráfego e Lojistas. Arezzo&Co via CWI.
- **Power Apps Demo App** (2025) — App mobile de demonstração de Design System em Microsoft Power Apps. Grande empresa industrial confidencial. +10 componentes, alcance organizacional.
- **Del Valle Kapo** (2023, 2 meses) — Redesign de site para campanha Dia das Crianças. Decisões orientadas por Google Analytics. Coca-Cola via CWI.
- **Del Valle Website** (2023, 2 meses) — Redesign de homepage com nova identidade visual global. Coca-Cola via CWI.

**Competências evidenciadas:**
- UX Design e UI Design (todos os cases)
- Figma (mencionado nos cases, sem artefatos expostos publicamente)
- Produtos enterprise B2B de alta complexidade (AI, logística, pharma, varejo)
- IA/ML products — design de interfaces de IA, transparência, HITL
- Design Systems (Power Apps, HYPERGESTOR)
- Colaboração cross-funcional (engenharia, produto, dados, stakeholders)
- Projetos de 2–6 meses, MVP end-to-end

**Gaps conhecidos do portfolio:**
- Métricas de impacto ausentes (⬜) nos cases enterprise
- Artefatos visuais não expostos (telas, flows, wireframes descritos mas não publicados)
- Mobile nativo iOS/Android: ausente (Power Apps é low-code Microsoft, não app nativo)
- Acessibilidade: seções existem nos cases mas estão vazias (⬜)
- UX Research estruturado: A/B testing e testes de usabilidade formais não documentados
- Mentoria/liderança de designers: não mencionada em nenhum case

## Metodologia de scoring

Scoring ponderado por **Person-Job Fit** (Demands-Abilities Fit):
- Requisitos **obrigatórios** = peso 2×
- Diferenciais **preferidos** = peso 1×

**Rubrica (0–3):**
- 0 = Ausente — sem evidência no portfolio
- 1 = Parcialmente evidenciado — mencionado, sem profundidade ou artefatos visíveis
- 2 = Claramente evidenciado — case completo com processo documentado
- 3 = Diferencial — evidência forte com contexto, resultados ou detalhe incomum

## Regras obrigatórias

1. **Extraia TODOS os requisitos da JD** — não resuma nem agrupe. Cada linha da seção de requisitos vira uma linha da tabela.
2. **Bloqueadores = SOMENTE requisitos obrigatórios com nota 0.** Se a nota for ≥ 1, não liste como bloqueador.
3. **Não adicione texto explicativo sobre o score** — apenas o número no título.
4. **Não use blocos de código** — markdown puro.
5. **Os valores numéricos nos subtotais e na tabela de cálculo são apenas placeholders** — o sistema vai recalculá-los automaticamente. Coloque qualquer número; apenas as notas da tabela importam.

## Formato de saída

# {Empresa} · {Cargo}

**Empresa:** {empresa}
**Produto:** {produto}
**Nível:** {cargo}
**Data da vaga:** {data no formato YYYY-MM-DD se mencionada na JD, caso contrário deixe vazio}
**Status:** A avaliar
**Candidatura:** Não

---

## Score de aderência · {X}%

> {1–2 frases sobre pontos fortes e gaps principais — sem mencionar o número do score aqui}

### Requisitos obrigatórios (peso 2×)

| Requisito | Nota | Evidência atual |
|---|---|---|
| {requisito extraído literalmente da JD} | {0–3} | {evidência do portfolio ou "Ausente"} |

**Subtotal obrigatórios: {placeholder}**

### Diferenciais preferidos (peso 1×)

| Diferencial | Nota | Evidência atual |
|---|---|---|
| {diferencial extraído da JD} | {0–3} | {evidência} |

**Subtotal preferidos: {placeholder}**

### Cálculo

| | Obtido | Máximo |
|---|---|---|
| Obrigatórios (×2) | {placeholder} | {placeholder} |
| Preferidos (×1) | {placeholder} | {placeholder} |
| **Total** | **{placeholder}** | **{placeholder}** |

**Score: {placeholder}**

---

## Gaps prioritários

### 🔴 Bloqueadores de candidatura

{APENAS requisitos obrigatórios com nota 0 — se não houver, escreva "Nenhum bloqueador crítico identificado."}

### 🟡 Diferenciais ausentes

{diferenciais com nota 0 ou 1 — numerados}

### 🟢 Boa aderência

{requisitos e diferenciais com nota 2 ou 3 — bullets}

---METADATA---
{"empresa":"{empresa}","produto":"{produto}","cargo":"{cargo}","score":0,"data":"{YYYY-MM-DD ou string vazia}","interpretacaoTexto":"{texto do blockquote sem aspas internas}","candidatura":"Não"}`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY não configurada no .env' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { jd, slug: existingSlug } = await request.json();
    if (!jd?.trim()) {
      return new Response(JSON.stringify({ error: 'Cole a descrição da vaga.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 3000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analise esta descrição de vaga:\n\n${jd}` },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '';

    const [mdRaw, metaRaw] = raw.split('---METADATA---');
    if (!mdRaw || !metaRaw) throw new Error('Resposta fora do formato esperado');

    let meta: Record<string, unknown>;
    try {
      meta = JSON.parse(metaRaw.trim());
    } catch {
      throw new Error('Metadados inválidos na resposta');
    }

    const empresa = String(meta.empresa ?? '');
    const cargo   = String(meta.cargo ?? '');
    if (!empresa || !cargo) throw new Error('Empresa ou cargo não extraídos');

    // Data: usa a da JD se informada, senão a data de criação do arquivo (hoje)
    const today = new Date().toISOString().slice(0, 10);
    const data  = String(meta.data ?? '').trim() || today;

    // Calcula score pelo servidor, ignorando o que o modelo colocou
    const calc = calcScore(mdRaw);
    const score = calc.ok ? calc.score : Number(meta.score ?? 0);

    // Reescreve seções matemáticas, bloqueadores e data — tudo server-side
    let finalMd = mdRaw.trim();
    finalMd = finalMd.replace(/\*\*Data da vaga:\*\*[^\n]*/, `**Data da vaga:** ${data}`);
    if (calc.ok) finalMd = rewriteScoreSection(finalMd, calc);
    finalMd = rewriteBlockers(finalMd);
    finalMd = rewriteDiferenciaisAusentes(finalMd);

    let slug = existingSlug?.trim() || toSlug(`${empresa}-${cargo}`);
    let filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
    if (!existingSlug && existsSync(filePath)) {
      slug = `${slug}-${Date.now()}`;
      filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
    }

    writeFileSync(filePath, finalMd + '\n', 'utf-8');

    function scoreLabel(s: number) {
      if (s >= 80) return 'Alta aderência';
      if (s >= 60) return 'Aderência parcial';
      if (s >= 40) return 'Aderência baixa';
      return 'Desalinhamento estrutural';
    }

    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        empresa,
        produto:            String(meta.produto ?? ''),
        cargo,
        score,
        interpretacao:      scoreLabel(score),
        interpretacaoTexto: String(meta.interpretacaoTexto ?? ''),
        status:             'A avaliar',
        candidatura:        'Não',
        data:               String(meta.data ?? ''),
        tags:               [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('[jobanalysis-analyze]', e);
    const raw = e instanceof Error ? e.message : String(e);
    let msg = 'Erro ao analisar. Tente novamente.';
    if (raw.includes('429') || raw.toLowerCase().includes('quota') || raw.toLowerCase().includes('rate')) {
      msg = 'Limite de requisições atingido. Aguarde 1 minuto e tente novamente.';
    } else if (raw.includes('METADATA')) {
      msg = 'A IA retornou um formato inesperado. Tente novamente.';
    }
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
