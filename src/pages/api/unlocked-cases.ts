import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COOKIE, isValidSessionValue } from '../../auth';
import { detectCardImage } from '../../utils/cover';

export const prerender = false;

// Chamado client-side pela home pra revelar, na grade de Cases, os cases
// `protected: true` quando o visitante já está autenticado (via /login ou
// via link mágico ?access=). Sem sessão válida, sempre devolve lista vazia —
// os dados desses cases nunca aparecem no HTML servido a quem não tem acesso.
export const GET: APIRoute = async ({ url, cookies }) => {
  const lang = url.searchParams.get('lang') === 'pt' ? 'pt' : 'en';
  const area = 'cases' as const;
  const authCookie = cookies.get(COOKIE[area]);

  if (!isValidSessionValue(area, authCookie?.value)) {
    return new Response(JSON.stringify({ unlocked: false, cases: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
    });
  }

  const collection = lang === 'pt' ? 'casesPt' : 'casesEn';
  const entries = await getCollection(collection, ({ data }) => !data.draft && data.protected === true);
  const cases = entries
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
    .map((c) => ({
      slug: c.data.slug,
      title: c.data.title,
      summary: c.data.summary,
      year: c.data.year,
      tags: c.data.tags,
      cover: detectCardImage(c.data.slug) ?? c.data.cover ?? c.data.bgImage ?? null,
    }));

  return new Response(JSON.stringify({ unlocked: true, cases }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
  });
};
