<script lang="ts">
  let dark = $state(false);

  $effect(() => {
    dark = document.documentElement.getAttribute('data-theme') === 'dark';
  });

  function toggle() {
    dark = !dark;
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<button
  onclick={toggle}
  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={dark ? 'Light mode' : 'Dark mode'}
  class="toggle-btn"
>
  {#if dark}
    <!-- Sun -->
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  {:else}
    <!-- Moon -->
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {/if}
</button>

<style>
  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;
    transition: background 0.15s, color 0.15s, transform 0.1s;
    flex-shrink: 0;
  }

  .toggle-btn:hover {
    background: color-mix(in srgb, var(--color-cha-mate) 10%, transparent);
    color: var(--color-cha-mate);
    transform: rotate(15deg);
  }

  .toggle-btn:active {
    transform: rotate(15deg) scale(0.92);
  }

  .toggle-btn:focus-visible {
    outline: 2px solid var(--color-cha-mate);
    outline-offset: 2px;
  }
</style>
