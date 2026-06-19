import type { APIRoute } from 'astro';
import { COOKIE } from '../../auth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  for (const name of Object.values(COOKIE)) {
    cookies.delete(name, { path: '/' });
  }
  return redirect('/');
};
