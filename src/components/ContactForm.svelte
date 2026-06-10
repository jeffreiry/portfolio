<script lang="ts">
  interface Props {
    lang?: 'en' | 'pt';
    whatsappHref: string;
  }

  let { lang = 'en', whatsappHref }: Props = $props();

  const isEn = lang === 'en';

  const labels = {
    name:        isEn ? 'Name'    : 'Nome',
    email:       isEn ? 'Email'   : 'E-mail',
    message:     isEn ? 'Message' : 'Mensagem',
    submit:      isEn ? 'Send message'   : 'Enviar mensagem',
    sending:     isEn ? 'Sending…'       : 'Enviando…',
    successHead: isEn ? 'Message sent!'  : 'Mensagem enviada!',
    successBody: isEn
      ? "Thanks for reaching out. I'll get back to you soon."
      : 'Obrigado pelo contato. Retornarei em breve.',
    errorHead:   isEn ? 'Something went wrong'    : 'Algo deu errado',
    errorBody:   isEn
      ? 'Could not send your message. Try again or reach me on WhatsApp.'
      : 'Não foi possível enviar sua mensagem. Tente novamente ou fale pelo WhatsApp.',
    whatsapp:    isEn ? 'Chat on WhatsApp' : 'Falar pelo WhatsApp',
    orDivider:   isEn ? 'or' : 'ou',
  };

  type Status = 'idle' | 'loading' | 'success' | 'error';
  let status = $state<Status>('idle');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    status = 'loading';

    const form = e.currentTarget as HTMLFormElement;
    const body = new FormData(form);
    body.set('lang', lang);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body });
      status = res.ok ? 'success' : 'error';
    } catch {
      status = 'error';
    }
  }
</script>

<div class="contact-wrap">
  {#if status === 'success'}
    <div class="feedback feedback--success" role="alert">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7.5 12.5l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <p class="feedback__head">{labels.successHead}</p>
        <p class="feedback__body">{labels.successBody}</p>
      </div>
    </div>

  {:else if status === 'error'}
    <div class="feedback feedback--error" role="alert">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12 7v6M12 16.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <div>
        <p class="feedback__head">{labels.errorHead}</p>
        <p class="feedback__body">{labels.errorBody}</p>
      </div>
    </div>
    <button class="btn-retry" onclick={() => status = 'idle'}>
      {isEn ? 'Try again' : 'Tentar novamente'}
    </button>

  {:else}
    <form onsubmit={handleSubmit} novalidate>
      <div class="field">
        <label for="cf-name">{labels.name}</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autocomplete="name"
          required
          placeholder={isEn ? 'Your name' : 'Seu nome'}
          disabled={status === 'loading'}
        />
      </div>

      <div class="field">
        <label for="cf-email">{labels.email}</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder={isEn ? 'your@email.com' : 'seu@email.com'}
          disabled={status === 'loading'}
        />
      </div>

      <div class="field">
        <label for="cf-message">{labels.message}</label>
        <textarea
          id="cf-message"
          name="message"
          rows="5"
          required
          placeholder={isEn ? 'Tell me about your project or opportunity…' : 'Conte sobre seu projeto ou oportunidade…'}
          disabled={status === 'loading'}
        ></textarea>
      </div>

      <button type="submit" class="btn-submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
        {status === 'loading' ? labels.sending : labels.submit}
      </button>
    </form>

    <div class="divider" aria-hidden="true">
      <span>{labels.orDivider}</span>
    </div>

    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {labels.whatsapp}
    </a>
  {/if}
</div>

<style>
  .contact-wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-cha-mate);
    font-family: var(--font-body);
    letter-spacing: 0.01em;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    font-size: 15px;
    font-family: var(--font-body);
    color: var(--color-ink);
    background: #fff;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
    resize: vertical;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--color-faint, #b0a8a0);
  }

  input:focus,
  textarea:focus {
    border-color: var(--color-jambu);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-jambu) 15%, transparent);
  }

  input:disabled,
  textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-submit {
    padding: 13px 24px;
    border-radius: 999px;
    background: var(--color-jambu);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-body);
    letter-spacing: 0.02em;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
    align-self: flex-start;
  }

  .btn-submit:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .btn-submit:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-faint, #b0a8a0);
    font-size: 12px;
    font-family: var(--font-body);
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 24px;
    border-radius: 999px;
    border: 1.5px solid #25D366;
    color: #25D366;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-body);
    letter-spacing: 0.02em;
    text-decoration: none;
    transition: background 0.15s, color 0.15s, transform 0.1s;
    align-self: flex-start;
  }

  .btn-whatsapp:hover {
    background: #25D366;
    color: #fff;
    transform: translateY(-1px);
  }

  .btn-whatsapp:active {
    transform: translateY(0);
  }

  /* Feedback states */
  .feedback {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 14px;
    animation: fade-in 0.3s ease;
  }

  .feedback--success {
    background: color-mix(in srgb, #16a34a 10%, transparent);
    color: #16a34a;
  }

  .feedback--error {
    background: color-mix(in srgb, var(--color-jambu) 10%, transparent);
    color: var(--color-jambu);
  }

  .feedback svg {
    flex-shrink: 0;
    margin-top: 1px;
  }

  .feedback__head {
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-body);
    margin: 0 0 4px;
  }

  .feedback__body {
    font-size: 14px;
    font-family: var(--font-body);
    margin: 0;
    opacity: 0.85;
  }

  .btn-retry {
    align-self: flex-start;
    padding: 10px 20px;
    border-radius: 999px;
    border: 1.5px solid var(--color-border);
    background: transparent;
    font-size: 13px;
    font-family: var(--font-body);
    color: var(--color-muted);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .btn-retry:hover {
    border-color: var(--color-cha-mate);
    color: var(--color-cha-mate);
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
