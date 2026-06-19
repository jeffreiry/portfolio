import { defineMiddleware } from 'astro:middleware';

const PROTECTED_PREFIXES = ['/work/', '/pt/work/', '/jobanalysis'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return next();

  const password = import.meta.env.PORTFOLIO_PASSWORD;
  const authCookie = context.cookies.get('portfolio_auth');

  if (password && authCookie?.value === password) return next();

  const loginUrl = new URL('/login', context.url);
  loginUrl.searchParams.set('next', pathname);
  return context.redirect(loginUrl.toString());
});
