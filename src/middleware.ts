import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import type { AreaId } from './auth';
import { COOKIE, accessTokenFor, isValidSessionValue, passwordFor, workSlugFromPath } from './auth';

// Exige login pra uma área — bloqueia sempre (404) se não houver senha nem
// token configurado, sem exceção pra dev. Não depende de detectar
// corretamente DEV/PROD pra decidir liberar acesso: pra testar localmente,
// configure a senha/token no .env como em qualquer outro ambiente.
function requireAuth(context: Parameters<Parameters<typeof defineMiddleware>[0]>[0], area: AreaId) {
  const password = passwordFor(area);
  const token = accessTokenFor(area);
  if (!password && !token) {
    return new Response('Not found', { status: 404 });
  }

  const authCookie = context.cookies.get(COOKIE[area]);
  if (isValidSessionValue(area, authCookie?.value)) return null;

  const loginUrl = new URL('/login', context.url);
  loginUrl.searchParams.set('next', context.url.pathname);
  return context.redirect(loginUrl.toString());
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith('/jobanalysis')) {
    const blocked = requireAuth(context, 'jobanalysis');
    return blocked ?? next();
  }

  // Link mágico: ?access=TOKEN em qualquer página seta o cookie de sessão
  // dos cases sem passar pelo /login. Funciona em qualquer path (home ou
  // direto num case) — sempre redireciona pra URL limpa, sem o parâmetro.
  const accessParam = context.url.searchParams.get('access');
  if (accessParam !== null) {
    const token = accessTokenFor('cases');
    if (token && accessParam === token) {
      context.cookies.set(COOKIE.cases, token, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }
    const cleanUrl = new URL(context.url);
    cleanUrl.searchParams.delete('access');
    return context.redirect(cleanUrl.toString());
  }

  const slug = workSlugFromPath(pathname);
  if (!slug) return next();

  // Só exige senha se o case específico tiver `protected: true` no frontmatter
  // — o resto de /work/* é público.
  const [entry] = await getCollection('casesEn', ({ data }) => data.slug === slug);
  if (!entry?.data.protected) return next();

  const blocked = requireAuth(context, 'cases');
  return blocked ?? next();
});
