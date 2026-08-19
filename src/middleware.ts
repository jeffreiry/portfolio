import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { COOKIE, passwordFor, workSlugFromPath } from './auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // /jobanalysis: só local (404 em produção, sem senha em dev)
  if (pathname.startsWith('/jobanalysis')) {
    if (import.meta.env.PROD) return new Response('Not found', { status: 404 });
    return next();
  }

  const slug = workSlugFromPath(pathname);
  if (!slug) return next();

  // Só exige senha se o case específico tiver `protected: true` no frontmatter
  // — o resto de /work/* é público.
  const [entry] = await getCollection('casesEn', ({ data }) => data.slug === slug);
  if (!entry?.data.protected) return next();

  const area = 'cases' as const;
  const password = passwordFor(area);

  // Sem senha configurada: libera em dev, bloqueia em prod
  if (!password) {
    if (import.meta.env.DEV) return next();
    return new Response('Not found', { status: 404 });
  }

  const authCookie = context.cookies.get(COOKIE[area]);
  if (authCookie?.value === password) return next();

  const loginUrl = new URL('/login', context.url);
  loginUrl.searchParams.set('next', pathname);
  return context.redirect(loginUrl.toString());
});
