import type { APIRoute } from 'astro';
import { COOKIE, accessTokenFor } from '../../auth';

export const prerender = false;

// Chamado pelo script client-side em Base.astro quando a home (estática) é
// visitada com ?access=TOKEN — o middleware não roda em páginas prerendered,
// então esse endpoint é o que efetivamente seta o cookie de sessão nesse caso.
export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === 'string' ? body.token : '';

  const area = 'cases' as const;
  const correctToken = accessTokenFor(area);

  if (!correctToken || token !== correctToken) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  cookies.set(COOKIE[area], correctToken, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
