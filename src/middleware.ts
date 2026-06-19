import { defineMiddleware } from 'astro:middleware';
import { areaForPath, COOKIE, passwordFor } from './auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // /jobanalysis: só local (404 em produção, sem senha em dev)
  if (pathname.startsWith('/jobanalysis')) {
    if (import.meta.env.PROD) return new Response('Not found', { status: 404 });
    return next();
  }

  const area = areaForPath(pathname);
  if (!area) return next();

  const password = passwordFor(area);
  const authCookie = context.cookies.get(COOKIE[area]);

  if (password && authCookie?.value === password) return next();

  const loginUrl = new URL('/login', context.url);
  loginUrl.searchParams.set('next', pathname);
  return context.redirect(loginUrl.toString());
});
