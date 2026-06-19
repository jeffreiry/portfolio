import type { APIRoute } from 'astro';
import { areaForPath, COOKIE, passwordFor } from '../../auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password')?.toString() ?? '';
  const next = formData.get('next')?.toString() ?? '/';

  // A senha exigida depende da área de destino (cases vs. bench).
  const area = areaForPath(next) ?? 'cases';
  const correctPassword = passwordFor(area);

  if (!correctPassword) {
    return new Response('Password not configured for this area', { status: 500 });
  }

  if (password === correctPassword) {
    cookies.set(COOKIE[area], correctPassword, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return redirect(next);
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', next);
  loginUrl.searchParams.set('error', '1');
  return redirect(loginUrl.toString());
};
