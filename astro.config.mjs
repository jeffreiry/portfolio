// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// `astro dev` não injeta o .env em `process.env` (só em `import.meta.env`,
// via bundling do Vite) — código de servidor que lê `process.env` direto
// (src/auth.ts, jobanalysis-analyze.ts) ficava sem JOBANALYSIS_PASSWORD/etc
// localmente, mesmo com o .env correto. Na Vercel isso não acontecia porque
// lá as env vars já chegam prontas em `process.env` pela plataforma. Carrega
// aqui, sem sobrescrever o que já estiver setado (produção continua intocada).
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
for (const [key, value] of Object.entries(env)) {
  if (!(key in process.env)) process.env[key] = value;
}

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
        'https://portfolio.jefersonfreiry.com/work/arezzo-ad-management',
        'https://portfolio.jefersonfreiry.com/work/del-valle-website',
        'https://portfolio.jefersonfreiry.com/work/hypera-hypergestor',
        'https://portfolio.jefersonfreiry.com/work/del-valle-kapo',
        'https://portfolio.jefersonfreiry.com/pt/work/arezzo-ad-management',
        'https://portfolio.jefersonfreiry.com/pt/work/del-valle-website',
        'https://portfolio.jefersonfreiry.com/pt/work/hypera-hypergestor',
        'https://portfolio.jefersonfreiry.com/pt/work/del-valle-kapo',
      ],
      // /jobanalysis é noindex (análise interna) — fora do sitemap
      // /login não é conteúdo público
      filter: (page) =>
        !page.includes('/jobanalysis') && !page.includes('/login'),
    }),
  ],
});