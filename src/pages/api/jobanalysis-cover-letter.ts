export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { generateCoverLetter } from '../../lib/jobanalysis/core';

export const POST: APIRoute = async ({ request }) => {
  try {
    // process.env via variável local — Vite faz inlining estático de
    // process.env['VAR'] direto em build time, substituindo por undefined
    // (mesma observação documentada em jobanalysis-analyze.ts).
    const _env = process.env;
    const claudeKey = _env['ANTHROPIC_API_KEY'] ?? import.meta.env.ANTHROPIC_API_KEY;

    if (!claudeKey) {
      return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada no .env' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { slug } = await request.json();
    if (!slug) {
      return new Response(JSON.stringify({ error: 'slug é obrigatório' }), {
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

    const content = readFileSync(filePath, 'utf-8');

    const empresa = content.match(/\*\*Empresa:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const produtoRaw = content.match(/\*\*Produto:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const produto = produtoRaw.replace(/\s*\([^)]*\).*/, '').trim();
    // Cargo de verdade vem do título (H1), não do campo "Nível" (que é só
    // Sênior/Pleno/etc — a página usa esse campo pra outra coisa no card).
    const cargo = content.match(/^# .+? · (.+)$/m)?.[1]?.trim() ?? '';

    const jdOriginal = content.split(/## Job description original/i)[1]?.split(/\n---\n/)[0]?.trim() ?? '';
    if (!jdOriginal || jdOriginal.includes('⬜')) {
      return new Response(JSON.stringify({ error: 'Esta ficha não tem a JD original arquivada — não dá pra gerar carta sem o texto real da vaga.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const text = await generateCoverLetter({ empresa, cargo, produto, jdOriginal }, claudeKey);

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[jobanalysis-cover-letter]', e);
    const msg = e instanceof Error ? e.message : 'Erro ao gerar carta.';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
