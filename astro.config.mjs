// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel({ webAnalytics: { enabled: true } }),

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false, // EN at root (/), PT at /pt
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
});