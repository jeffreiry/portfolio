import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Extrai o texto puro do currículo PT (public/Jeferson_Freiry_PT.pdf) pra
// checagem de match literal de keywords (ATS) contra os requisitos das vagas
// — ver calcAtsMatch em core.ts. Cacheado em memória do processo: o PDF não
// muda durante a vida do servidor, e refazer o parse a cada card/requisição
// seria desperdício (a extração em si é rápida, mas soma rápido com 130+
// vagas × 1 req por load da página).
let cached: string | null = null;

export async function getResumeText(): Promise<string> {
  if (cached !== null) return cached;

  try {
    const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const path = join(process.cwd(), 'public', 'Jeferson_Freiry_PT.pdf');
    const data = new Uint8Array(await readFile(path));
    const doc = await getDocument({ data, useSystemFonts: true }).promise;

    let full = '';
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const content = await page.getTextContent();
      full += content.items.map((it) => ('str' in it ? it.str : '')).join(' ') + ' ';
    }

    cached = normalizeForMatch(full);
  } catch (e) {
    console.error('[jobanalysis] Falha ao extrair texto do currículo pra match ATS:', e);
    cached = ''; // string vazia -> calcAtsMatch trata como "nada encontrado", nunca quebra a página
  }

  return cached;
}

// Minúsculas + sem acento — mesmo princípio de toSlug, mas mantendo espaços
// (aqui precisamos comparar PALAVRAS, não gerar um identificador).
export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
