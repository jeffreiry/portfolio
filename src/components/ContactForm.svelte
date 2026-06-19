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
    errName:     isEn ? 'Please enter your name.'           : 'Informe seu nome.',
    errEmail:    isEn ? 'Please enter a valid email.'       : 'Informe um e-mail válido.',
    errMessage:  isEn ? 'Please enter a message.'           : 'Escreva uma mensagem.',
  };

  type Status = 'idle' | 'loading' | 'success' | 'error';
  let status = $state<Status>('idle');

  // Erros de validação por campo (string vazia = sem erro)
  let errors = $state<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });

  // Refs para foco gerenciado
  let nameEl = $state<HTMLInputElement>();
  let emailEl = $state<HTMLInputElement>();
  let messageEl = $state<HTMLTextAreaElement>();
  let feedbackEl = $state<HTMLDivElement>();

  // Move o foco para o alerta de sucesso/erro quando ele aparece
  $effect(() => {
    if ((status === 'success' || status === 'error') && feedbackEl) {
      feedbackEl.focus();
    }
  });

  function validate(data: FormData): boolean {
    const name = (data.get('name') as string ?? '').trim();
    const email = (data.get('email') as string ?? '').trim();
    const message = (data.get('message') as string ?? '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    errors = {
      name:    name ? '' : labels.errName,
      email:   emailOk ? '' : labels.errEmail,
      message: message ? '' : labels.errMessage,
    };

    // Move o foco para o primeiro campo inválido
    if (errors.name)         { nameEl?.focus(); return false; }
    if (errors.email)        { emailEl?.focus(); return false; }
    if (errors.message)      { messageEl?.focus(); return false; }
    return true;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const body = new FormData(form);
    if (!validate(body)) return;

    status = 'loading';
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
    <div class="feedback feedback--success" role="alert" tabindex="-1" bind:this={feedbackEl}>
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
    <div class="feedback feedback--error" role="alert" tabindex="-1" bind:this={feedbackEl}>
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
          aria-required="true"
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
          placeholder={isEn ? 'Your name' : 'Seu nome'}
          disabled={status === 'loading'}
          bind:this={nameEl}
        />
        {#if errors.name}
          <p id="cf-name-error" class="field-error">{errors.name}</p>
        {/if}
      </div>

      <div class="field">
        <label for="cf-email">{labels.email}</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          aria-required="true"
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
          placeholder={isEn ? 'your@email.com' : 'seu@email.com'}
          disabled={status === 'loading'}
          bind:this={emailEl}
        />
        {#if errors.email}
          <p id="cf-email-error" class="field-error">{errors.email}</p>
        {/if}
      </div>

      <div class="field">
        <label for="cf-message">{labels.message}</label>
        <textarea
          id="cf-message"
          name="message"
          rows="5"
          required
          aria-required="true"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          placeholder={isEn ? 'Tell me about your project or opportunity…' : 'Conte sobre seu projeto ou oportunidade…'}
          disabled={status === 'loading'}
          bind:this={messageEl}
        ></textarea>
        {#if errors.message}
          <p id="cf-message-error" class="field-error">{errors.message}</p>
        {/if}
      </div>

      <button type="submit" class="btn-submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
        {status === 'loading' ? labels.sending : labels.submit}
      </button>
    </form>
  {/if}

  <!-- Anúncio de estado para leitores de tela -->
  <p class="sr-only" role="status" aria-live="polite">
    {status === 'loading' ? labels.sending : ''}
  </p>
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
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--text-heading);
    font-family: var(--font-body);
    letter-spacing: 0.01em;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--border-default);
    border-radius: var(--radius-input);
    font-size: var(--text-sm);
    font-family: var(--font-body);
    color: var(--text-primary);
    background: var(--bg-surface);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: 2px solid transparent;
    outline-offset: 2px;
    resize: vertical;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--text-subtle);
  }

  input:focus-visible,
  textarea:focus-visible {
    border-color: var(--accent-deco);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-deco) 15%, transparent);
    outline-color: var(--accent-deco);
  }

  input:disabled,
  textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input[aria-invalid="true"],
  textarea[aria-invalid="true"] {
    border-color: var(--accent-text);
  }

  .field-error {
    font-size: 12.5px;
    font-family: var(--font-body);
    color: var(--accent-text);
    margin: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .btn-submit {
    padding: 13px 24px;
    border-radius: var(--radius-pill);
    background: var(--accent-btn);
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

  .btn-submit:focus-visible {
    outline: 2px solid var(--accent-deco);
    outline-offset: 3px;
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
    background: color-mix(in srgb, var(--accent-deco) 10%, transparent);
    color: var(--accent-text);
  }

  .feedback svg {
    flex-shrink: 0;
    margin-top: 1px;
  }

  .feedback__head {
    font-size: var(--text-sm);
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
    border-radius: var(--radius-pill);
    border: 1.5px solid var(--border-default);
    background: transparent;
    font-size: var(--text-xs);
    font-family: var(--font-body);
    color: var(--text-secondary);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .btn-retry:hover {
    border-color: var(--text-heading);
    color: var(--text-heading);
  }

  .btn-retry:focus-visible {
    outline: 2px solid var(--text-heading);
    outline-offset: 3px;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
