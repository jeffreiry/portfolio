export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { DEFAULT_INGEST_FILTERS, type IngestFilters } from '../../../scripts/ingest/filters.ts';

const CONFIG_PATH = join(process.cwd(), 'config', 'ingest-filters.json');

export const GET: APIRoute = async () => {
  try {
    const config: IngestFilters = existsSync(CONFIG_PATH)
      ? { ...DEFAULT_INGEST_FILTERS, ...JSON.parse(readFileSync(CONFIG_PATH, 'utf-8')) }
      : DEFAULT_INGEST_FILTERS;
    return new Response(JSON.stringify(config), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('[ingest-config] GET', e);
    return new Response(JSON.stringify(DEFAULT_INGEST_FILTERS), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};

const VALID_SENIORITIES = ['sr', 'pleno', 'junior', 'null'];
const VALID_ORIGINS = ['br', 'intl'];
const VALID_WORKPLACES = ['remote', 'hybrid', 'onsite', 'null'];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const maxAgeDays = body.maxAgeDays === null || body.maxAgeDays === '' || body.maxAgeDays === undefined
      ? null
      : Number(body.maxAgeDays);
    if (maxAgeDays !== null && (!Number.isFinite(maxAgeDays) || maxAgeDays <= 0)) {
      return new Response(JSON.stringify({ error: 'Idade máxima precisa ser um número positivo, ou vazio para "sem limite".' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const seniorities = Array.isArray(body.seniorities)
      ? body.seniorities.filter((s: unknown) => typeof s === 'string' && VALID_SENIORITIES.includes(s))
      : [];
    const origins = Array.isArray(body.origins)
      ? body.origins.filter((o: unknown) => typeof o === 'string' && VALID_ORIGINS.includes(o))
      : [];
    const workplaces = Array.isArray(body.workplaces)
      ? body.workplaces.filter((w: unknown) => typeof w === 'string' && VALID_WORKPLACES.includes(w))
      : [];

    if (seniorities.length === 0 || origins.length === 0 || workplaces.length === 0) {
      return new Response(JSON.stringify({ error: 'Selecione ao menos uma senioridade, uma origem e uma modalidade.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const config: IngestFilters = {
      maxAgeDays,
      seniorities,
      origins,
      workplaces,
      excludeBancoDeTalentos: Boolean(body.excludeBancoDeTalentos),
      excludeRestrictedRemote: Boolean(body.excludeRestrictedRemote),
    };

    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n', 'utf-8');

    return new Response(JSON.stringify({ ok: true, config }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('[ingest-config] POST', e);
    return new Response(JSON.stringify({ error: 'Erro ao salvar — escrita só funciona localmente (npm run dev).' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
