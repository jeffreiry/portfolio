export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { slug, candidatura, status } = await request.json();

    if (!slug || !candidatura) {
      return new Response(JSON.stringify({ error: 'slug e candidatura são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const filePath = join(process.cwd(), 'Bench_job_applications', `${slug}.md`);

    if (!existsSync(filePath)) {
      return new Response(JSON.stringify({ error: 'Arquivo não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let content = readFileSync(filePath, 'utf-8');

    if (content.includes('**Candidatura:**')) {
      content = content.replace(/\*\*Candidatura:\*\* .+/, `**Candidatura:** ${candidatura}`);
    } else {
      content = content.replace(/(\*\*Status:\*\* .+)/, `$1\n**Candidatura:** ${candidatura}`);
    }

    // "Status atualizado em" alimenta o indicador de "dias parado" no painel — sem
    // isso, a única data disponível é a de mudança de status, que não temos como
    // registrar sem esse campo. Carimbado sempre que este endpoint grava, não só
    // quando o status muda de verdade (candidatura sozinha também conta como
    // "toquei nessa vaga hoje", que é o dado que queremos).
    const hoje = new Date().toISOString().slice(0, 10);
    if (content.includes('**Status atualizado em:**')) {
      content = content.replace(/\*\*Status atualizado em:\*\* .+/, `**Status atualizado em:** ${hoje}`);
    } else {
      content = content.replace(/(\*\*Status:\*\* .+)/, `$1\n**Status atualizado em:** ${hoje}`);
    }

    if (status) {
      content = content.replace(/\*\*Status:\*\* .+/, `**Status:** ${status}`);
    }

    // "Candidatura enviada em" é imutável — carimbado só na primeira vez que o
    // status vira "Candidatura enviada" e nunca mais tocado depois, mesmo que a
    // vaga avance (Entrevista, Recusado, etc). Diferente de "Status atualizado
    // em" (que é sobrescrito a cada mudança), este é o único jeito de calcular
    // "quanto tempo até a resposta" mais tarde — sem ele, a data de envio se
    // perde assim que o status avança de novo.
    if (status === 'Candidatura enviada' && !content.includes('**Candidatura enviada em:**')) {
      content = content.replace(/(\*\*Status:\*\* .+)/, `$1\n**Candidatura enviada em:** ${hoje}`);
    }

    writeFileSync(filePath, content, 'utf-8');

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[jobanalysis-update]', e);
    return new Response(JSON.stringify({ error: 'Erro interno — escrita só funciona localmente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
