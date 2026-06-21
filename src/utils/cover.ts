import { existsSync } from 'fs';
import { join } from 'path';

const NAMES = ['visao-geral', 'visao_geral'];
const EXTS = ['png', 'jpg', 'jpeg', 'webp'];

export function detectCover(slug: string): string | undefined {
  for (const name of NAMES) {
    for (const ext of EXTS) {
      if (existsSync(join(process.cwd(), 'public', 'cases', slug, `${name}.${ext}`))) {
        return `/cases/${slug}/${name}.${ext}`;
      }
    }
  }
  return undefined;
}
