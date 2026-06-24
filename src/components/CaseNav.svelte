<script lang="ts">
  import { onMount } from 'svelte';

  interface Section {
    id: string;
    label: string;
    el: HTMLElement;
  }

  let sections = $state<Section[]>([]);
  let activeId = $state('');
  let visible = $state(false);

  onMount(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('.case-content h2:not(:first-of-type)')
    );

    sections = headings.map((el) => ({
      id: el.id,
      label: el.textContent?.trim() ?? '',
      el,
    }));

    if (sections.length < 2) return;

    const heroSection = document.querySelector<HTMLElement>('main > section:first-child');
    let heroObs: IntersectionObserver | null = null;
    if (heroSection) {
      heroObs = new IntersectionObserver(
        ([entry]) => { visible = !entry.isIntersecting; },
        { threshold: 0 }
      );
      heroObs.observe(heroSection);
    }

    const sectionObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) activeId = (e.target as HTMLElement).id;
        }
      },
      { rootMargin: '-10% 0px -78% 0px' }
    );
    sections.forEach(({ el }) => sectionObs.observe(el));

    return () => {
      heroObs?.disconnect();
      sectionObs.disconnect();
    };
  });

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

{#if sections.length >= 2}
  <nav
    class="case-process-nav"
    aria-label="Case sections"
    style:opacity={visible ? '1' : '0'}
    style:transform={visible ? 'translateY(0)' : 'translateY(-6px)'}
    style:pointer-events={visible ? 'auto' : 'none'}
  >
    <ol>
      {#each sections as section, i}
        <li>
          <button
            onclick={() => scrollTo(section.id)}
            title={section.label}
            aria-current={activeId === section.id ? 'location' : undefined}
            class:active={activeId === section.id}
          >
            <span class="num">{i + 1}</span>
            <span class="label">{section.label}</span>
          </button>
        </li>
      {/each}
    </ol>
  </nav>
{/if}

<style>
  .case-process-nav {
    position: fixed;
    top: 78px;
    left: 0;
    right: 0;
    z-index: 35;
    display: flex;
    justify-content: center;
    padding: 0 1.5rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  ol {
    display: flex;
    gap: 3px;
    list-style: none;
    margin: 0;
    padding: 5px;
    background: color-mix(in srgb, var(--bg-page) 88%, transparent);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 0.5px solid var(--border-default);
    border-radius: 999px;
    overflow-x: auto;
    scrollbar-width: none;
    max-width: 100%;
  }

  ol::-webkit-scrollbar { display: none; }

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border: none;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    font-family: var(--font-body);
    color: var(--text-secondary);
    transition: background 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }

  button:hover:not(.active) {
    background: color-mix(in srgb, var(--text-heading) 16%, transparent);
    color: var(--text-heading);
  }

  button:focus-visible {
    outline: 2px solid var(--accent-text);
    outline-offset: 2px;
  }

  button.active {
    background: var(--text-heading);
    color: var(--bg-page);
  }

  .num {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.02em;
    min-width: 14px;
    text-align: center;
  }

  /* Label visível só no item ativo, só em desktop */
  .label {
    display: none;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    button.active .label,
    button:hover:not(.active) .label {
      display: inline;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .case-process-nav { transition: none; }
  }
</style>
