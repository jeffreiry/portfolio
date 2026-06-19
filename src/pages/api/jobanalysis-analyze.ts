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

**Interpretação:**
- 80–100% = Alta aderência — submeter
- 60–79% = Aderência parcial — gaps endereçáveis
- 40–59% = Aderência baixa — gaps significativos
- < 40% = Desalinhamento estrutural

## Formato de saída

Gere EXATAMENTE neste formato (markdown puro, sem blocos de código):

# {Empresa} · {Cargo}

**Empresa:** {empresa}
**Produto:** {produto}
**Nível:** {cargo}
**Data da vaga:** {data no formato YYYY-MM-DD se mencionada na JD, caso contrário deixe vazio}
**Status:** A avaliar
**Candidatura:** Não

---

## Score de aderência · {X}%

> {1–2 frases resumindo: pontos fortes e gaps principais}

### Requisitos obrigatórios (peso 2×)

| Requisito | Nota | Evidência atual |
|---|---|---|
| {requisito extraído da JD} | {0–3} | {evidência do portfolio ou "Ausente"} |

**Subtotal obrigatórios: {obtido}/{máx} × 2 = {obtido×2}/{máx×2}**

### Diferenciais preferidos (peso 1×)

| Diferencial | Nota | Evidência atual |
|---|---|---|
| {diferencial extraído da JD} | {0–3} | {evidência} |

**Subtotal preferidos: {obtido}/{máx}**

### Cálculo

| | Obtido | Máximo |
|---|---|---|
| Obrigatórios (×2) | {n} | {n} |
| Preferidos (×1) | {n} | {n} |
| **Total** | **{n}** | **{n}** |

**Score: {n}/{n} = {X}%**

---

## Gaps prioritários

### 🔴 Bloqueadores de candidatura

{gaps com nota 0 em requisitos obrigatórios — numerados}

### 🟡 Diferenciais ausentes

{gaps em preferidos — numerados}

### 🟢 Boa aderência

{o que está bem evidenciado — bullets}

---METADATA---
{"empresa":"{empresa}","produto":"{produto}","cargo":"{cargo}","score":{número inteiro},"data":"{YYYY-MM-DD ou string vazia}","interpretacaoTexto":"{texto do blockquote, sem aspas internas}","candidatura":"Não"}`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY não configurada no .env' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { jd } = await request.json();
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

    // Separa conteúdo .md do bloco de metadados
    const [mdContent, metaRaw] = raw.split('---METADATA---');
    if (!mdContent || !metaRaw) {
      throw new Error('Resposta fora do formato esperado');
    }

    let meta: Record<string, unknown>;
    try {
      meta = JSON.parse(metaRaw.trim());
    } catch {
      throw new Error('Metadados inválidos na resposta');
    }

    const empresa = String(meta.empresa ?? '');
    const cargo   = String(meta.cargo ?? '');

    if (!empresa || !cargo) throw new Error('Empresa ou cargo não extraídos');

    let slug = toSlug(`${empresa}-${cargo}`);
    let filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
    if (existsSync(filePath)) {
      slug = `${slug}-${Date.now()}`;
      filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
    }

    writeFileSync(filePath, mdContent.trim() + '\n', 'utf-8');

    const score = Number(meta.score ?? 0);
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
        produto:          String(meta.produto ?? ''),
        cargo,
        score,
        interpretacao:    scoreLabel(score),
        interpretacaoTexto: String(meta.interpretacaoTexto ?? ''),
        status:           'A avaliar',
        candidatura:      'Não',
        data:             String(meta.data ?? ''),
        tags:             [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
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
