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
