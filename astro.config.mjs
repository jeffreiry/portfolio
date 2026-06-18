// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio.jefersonfreiry.com',
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
    server: {
      watch: {
        ignored: ['**/.vercel/**'],
      },
    },
  },

  integrations: [svelte(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-US', pt: 'pt-BR' } } })],
});