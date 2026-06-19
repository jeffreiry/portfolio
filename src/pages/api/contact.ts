import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name    = (data.get('name')    as string)?.trim();
  const email   = (data.get('email')   as string)?.trim();
  const message = (data.get('message') as string)?.trim();
  const lang    = (data.get('lang')    as string) ?? 'en';

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'missing_fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'server_error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  const subject = lang === 'pt'
    ? `Nova mensagem de ${name} — Portfólio`
    : `New message from ${name} — Portfolio`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px;">
      <h2 style="color: #5c2d11;">${subject}</h2>
      <p><strong>Nome / Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr style="border: none; border-top: 1px solid #d9d2c8; margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'Portfolio <contato@portfolio.jefersonfreiry.com>',
    to: 'jfreiry@gmail.com',
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    console.error('[contact] Resend send failed:', error);
    return new Response(JSON.stringify({ error: 'send_failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
