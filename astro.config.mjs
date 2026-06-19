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

  integrations: [
    svelte(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', pt: 'pt-BR' } },
      // /work/* é SSR (prerender=false) → não aparece automaticamente; listar publicados
      customPages: [
        'https://portfolio.jefersonfreiry.com/work/enterprise-ai-assistant',
        'https://portfolio.jefersonfreiry.com/work/shipping-capacity-platform',
        'https://portfolio.jefersonfreiry.com/work/arezzo-ad-management',
        'https://portfolio.jefersonfreiry.com/work/del-valle-website',
        'https://portfolio.jefersonfreiry.com/work/hypera-hypergestor',
        'https://portfolio.jefersonfreiry.com/work/del-valle-kapo',
        'https://portfolio.jefersonfreiry.com/work/power-apps-dummy-app',
        'https://portfolio.jefersonfreiry.com/pt/work/enterprise-ai-assistant',
        'https://portfolio.jefersonfreiry.com/pt/work/shipping-capacity-platform',
        'https://portfolio.jefersonfreiry.com/pt/work/arezzo-ad-management',
        'https://portfolio.jefersonfreiry.com/pt/work/del-valle-website',
        'https://portfolio.jefersonfreiry.com/pt/work/hypera-hypergestor',
        'https://portfolio.jefersonfreiry.com/pt/work/del-valle-kapo',
        'https://portfolio.jefersonfreiry.com/pt/work/power-apps-dummy-app',
      ],
      // /jobanalysis é noindex (análise interna) — fora do sitemap
      // /login não é conteúdo público
      filter: (page) =>
        !page.includes('/jobanalysis') && !page.includes('/login'),
    }),
  ],
});