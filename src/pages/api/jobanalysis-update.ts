export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { slug, status, link } = await request.json();

    if (!slug) {
      return new Response(JSON.stringify({ error: 'slug é obrigatório' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Link da vaga é opcional: string vazia remove o campo, ausente (undefined) não mexe.
    const linkLimpo = typeof link === 'string' ? link.trim() : undefined;
    if (linkLimpo && !/^https?:\/\/\S+$/i.test(linkLimpo)) {
      return new Response(JSON.stringify({ error: 'Link inválido — use uma URL começando com http:// ou https://' }), {
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
    const POS_CANDIDATURA = ['Candidatura enviada', 'Entrevista agendada', 'Em processo', 'Proposta recebida', 'Recusado'];
    if (POS_CANDIDATURA.includes(status) && !content.includes('**Candidatura enviada em:**')) {
      content = content.replace(/(\*\*Status:\*\* .+)/, `$1\n**Candidatura enviada em:** ${hoje}`);
    }

    if (linkLimpo !== undefined) {
      if (linkLimpo === '') {
        content = content.replace(/\n\*\*Link da vaga:\*\*[^\n]*/, '');
      } else if (content.includes('**Link da vaga:**')) {
        content = content.replace(/\*\*Link da vaga:\*\*[^\n]*/, () => `**Link da vaga:** ${linkLimpo}`);
      } else {
        content = content.replace(/(\*\*Data da vaga:\*\*[^\n]*)/, (m) => `${m}\n**Link da vaga:** ${linkLimpo}`);
      }
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
