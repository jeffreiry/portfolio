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

    if (status) {
      content = content.replace(/\*\*Status:\*\* .+/, `**Status:** ${status}`);
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
