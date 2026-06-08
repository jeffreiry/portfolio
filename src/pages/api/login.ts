import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password')?.toString() ?? '';
  const next = formData.get('next')?.toString() ?? '/';

  const correctPassword = import.meta.env.PORTFOLIO_PASSWORD;

  if (!correctPassword) {
    return new Response('PORTFOLIO_PASSWORD not configured', { status: 500 });
  }

  if (password === correctPassword) {
    cookies.set('portfolio_auth', correctPassword, {
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
