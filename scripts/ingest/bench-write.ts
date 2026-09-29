import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { scoreLabel } from '../../src/lib/jobanalysis/core.ts';
import { GATE_THRESHOLD } from './gate.ts';

// Mesma resolução de colisão de slug que jobanalysis-analyze.ts já faz na
// escrita manual — sufixo de timestamp em vez de sobrescrever.
export function writeFicha(benchDir: string, slug: string, finalMd: string): string {
  let finalSlug = slug;
  let filePath = join(benchDir, `${finalSlug}.md`);
  if (existsSync(filePath)) {
    finalSlug = `${slug}-${Date.now()}`;
    filePath = join(benchDir, `${finalSlug}.md`);
  }
  writeFileSync(filePath, finalMd, 'utf-8');
  return finalSlug;
}

export interface DigestEntry {
  titulo: string;
  empresa: string;
  score: number;
  data: string;
  url: string;
}

const DIGEST_HEADER =
  `# Digest — vagas abaixo do gate (<${GATE_THRESHOLD}%)\n\n` +
  'Vagas analisadas automaticamente pela ingestão que não bateram o score mínimo ' +
  'pra virar ficha completa (ingest-plan.md § Pipeline, passo 6) — revisão manual ' +
  'rápida, sem o detalhamento de uma ficha. Score já reflete o registro no ledger ' +
  '(`data/ingest-ledger.json`), que evita reanalisar a mesma URL depois.\n\n' +
  '| Vaga | Empresa | Score | Data | Link |\n|---|---|---|---|---|\n';

export function appendDigestEntry(benchDir: string, entry: DigestEntry): void {
  const path = join(benchDir, '_digest.md');
  const row = `| ${entry.titulo} | ${entry.empresa} | ${entry.score}% | ${entry.data} | [link](${entry.url}) |\n`;
  if (!existsSync(path)) {
    writeFileSync(path, DIGEST_HEADER + row, 'utf-8');
  } else {
    writeFileSync(path, readFileSync(path, 'utf-8').replace(/\n*$/, '\n') + row, 'utf-8');
  }
}

export interface NewIndexRow {
  titulo: string;
  slug: string;
  empresa: string;
  produto: string;
  score: number;
  interpretacao: string;
  status: string;
  data: string;
}

// Adiciona linha(s) novas na tabela de "## Vagas" e recalcula a média geral —
// sem tocar em Gaps transversais/Matriz FOFA, que ficam nas seções seguintes
// (mesma fronteira "próximo ## " que corrigiu o bug de parseGapsTransversais
// engolindo a Matriz FOFA, ver CLAUDE.md 2026-09-13).
export function reconcileIndex(indexPath: string, newRows: NewIndexRow[]): { avg: number; label: string; totalVagas: number } {
  const content = readFileSync(indexPath, 'utf-8');

  const headingMatch = content.match(/\n## Vagas\n/);
  if (!headingMatch || headingMatch.index === undefined) {
    throw new Error('_index.md: seção "## Vagas" não encontrada.');
  }
  const sectionStart = headingMatch.index + headingMatch[0].length;

  const rest = content.slice(sectionStart);
  const nextHeadingMatch = rest.match(/\n## /);
  const sectionEnd = nextHeadingMatch && nextHeadingMatch.index !== undefined
    ? sectionStart + nextHeadingMatch.index
    : content.length;

  const before  = content.slice(0, sectionStart);
  const section = content.slice(sectionStart, sectionEnd);
  const after   = content.slice(sectionEnd);

  const mediaMatch = section.match(/\n\*\*Média geral:[^\n]*\n/);
  if (!mediaMatch || mediaMatch.index === undefined) {
    throw new Error('_index.md: linha "**Média geral:" não encontrada dentro de "## Vagas".');
  }
  const tableBlock = section.slice(0, mediaMatch.index);
  const tail       = section.slice(mediaMatch.index + mediaMatch[0].length);

  const tableLines = tableBlock.split('\n').filter((l) => l.trim().startsWith('|'));
  const headerLine = tableLines[0];
  const sepLine    = tableLines[1];
  const dataLines  = tableLines.slice(2);

  const newDataLines = newRows.map((r) =>
    `| [${r.titulo}](${r.slug}.md) | ${r.empresa}${r.produto ? ' · ' + r.produto : ''} | **${r.score}%** | ${r.interpretacao} | ${r.status} | ${r.data} |`
  );
  const allDataLines = [...dataLines, ...newDataLines];

  const scores = allDataLines
    .map((l) => l.match(/\*\*(\d+)%\*\*/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => Number(m[1]));
  const avg   = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const label = scoreLabel(avg);
  const totalVagas = allDataLines.length;

  const newSection =
    `\n${headerLine}\n${sepLine}\n${allDataLines.join('\n')}\n\n` +
    `**Média geral: ${avg}%** · ${label} (${totalVagas} vagas)\n` +
    tail;

  writeFileSync(indexPath, before + newSection + after, 'utf-8');

  return { avg, label, totalVagas };
}
