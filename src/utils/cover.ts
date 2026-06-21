import { existsSync } from 'fs';
import { join } from 'path';

const EXTS = ['png', 'jpg', 'jpeg', 'webp'];

function detectFile(slug: string, names: string[]): string | undefined {
  for (const name of names) {
    for (const ext of EXTS) {
      if (existsSync(join(process.cwd(), 'public', 'cases', slug, `${name}.${ext}`))) {
        return `/cases/${slug}/${name}.${ext}`;
      }
    }
  }
  return undefined;
}

// hero.* → visao-geral.* fallback
export function detectHero(slug: string): string | undefined {
  return detectFile(slug, ['hero', 'visao-geral', 'visao_geral']);
}

// card-home.* → visao-geral.* fallback
export function detectCardImage(slug: string): string | undefined {
  return detectFile(slug, ['card-home', 'visao-geral', 'visao_geral']);
}

// kept for backwards-compat
export function detectCover(slug: string): string | undefined {
  return detectFile(slug, ['visao-geral', 'visao_geral']);
}
