export const prerender = false;

import type { APIRoute } from 'astro';
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

function scoreLabel(score: number): string {
  if (score >= 80) return 'Alta aderência';
  if (score >= 60) return 'Aderência parcial';
  if (score >= 40) return 'Aderência baixa';
  return 'Desalinhamento estrutural';
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { empresa, produto, cargo, score, data, interpretacao, candidatura } = await request.json();

    if (!empresa || !cargo || score === undefined) {
      return new Response(JSON.stringify({ error: 'empresa, cargo e score são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let slug = toSlug(`${empresa}-${cargo}`);
    let filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
    if (existsSync(filePath)) {
      slug = `${slug}-${Date.now()}`;
      filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);
    }

    const scoreNum = Number(score);
    const today = new Date().toISOString().split('T')[0];
    const vagaData = data || today;
    const vagaCandidatura = candidatura || 'Não';
    const vagaInterpretacao = interpretacao || '⬜ Análise pendente.';

    const content = `# ${empresa} · ${cargo}

**Empresa:** ${empresa}
**Produto:** ${produto || '⬜'}
**Nível:** ${cargo}
**Data da vaga:** ${vagaData}
**Status:** A avaliar
**Candidatura:** ${vagaCandidatura}

---

## Score de aderência · ${scoreNum}%

> ${vagaInterpretacao}

### Requisitos obrigatórios (peso 2×)

| Requisito | Nota | Evidência atual |
|---|---|---|
| ⬜ | 0 | ⬜ |

### Diferenciais preferidos (peso 1×)

| Diferencial | Nota | Evidência atual |
|---|---|---|
| ⬜ | 0 | ⬜ |

---

## Gaps prioritários

### 🔴 Bloqueadores de candidatura

⬜

### 🟢 Boa aderência

⬜
`;

    writeFileSync(filePath, content, 'utf-8');

    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        empresa,
        produto: produto || '',
        cargo,
        score: scoreNum,
        interpretacao: scoreLabel(scoreNum),
        interpretacaoTexto: vagaInterpretacao,
        status: 'A avaliar',
        candidatura: vagaCandidatura,
        data: vagaData,
        tags: [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    console.error('[jobanalysis-create]', e);
    return new Response(JSON.stringify({ error: 'Erro interno — escrita só funciona localmente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
