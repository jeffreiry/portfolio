import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { COOKIE, accessTokenFor, isValidSessionValue, passwordFor, workSlugFromPath } from './auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // /jobanalysis: só local (404 em produção, sem senha em dev)
  if (pathname.startsWith('/jobanalysis')) {
    if (import.meta.env.PROD) return new Response('Not found', { status: 404 });
    return next();
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

  const area = 'cases' as const;
  const password = passwordFor(area);
  const token = accessTokenFor(area);

  // Nem senha nem token configurados: sempre bloqueia, sem exceção pra dev —
  // não depende de detectar corretamente DEV/PROD pra decidir liberar acesso.
  // Pra testar localmente, configure PORTFOLIO_PASSWORD ou
  // PORTFOLIO_ACCESS_TOKEN no .env como qualquer outro ambiente.
  if (!password && !token) {
    return new Response('Not found', { status: 404 });
  }

  const authCookie = context.cookies.get(COOKIE[area]);
  if (isValidSessionValue(area, authCookie?.value)) return next();

  const loginUrl = new URL('/login', context.url);
  loginUrl.searchParams.set('next', pathname);
  return context.redirect(loginUrl.toString());
});
