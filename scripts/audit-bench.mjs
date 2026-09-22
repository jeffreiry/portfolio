#!/usr/bin/env node
// Auditoria do bench de vagas (Bench_job_applications/*.md).
//
// Existe pra substituir a detecção manual de "score suspeito sem JD arquivada"
// (identificada no caso Zuri, 2026-09-07) — antes só era pega porque o autor
// lembrava de reler os arquivos. Roda sob demanda: `npm run audit:bench`.
//
// Não modifica nada — só lista o que merece uma segunda olhada.

import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BENCH_DIR = join(__dirname, '..', 'Bench_job_applications');

const files = readdirSync(BENCH_DIR).filter((f) => f.endsWith('.md') && f !== '_index.md');

const semJdArquivada = [];
const semStatusAtualizado = [];

for (const file of files) {
  const content = readFileSync(join(BENCH_DIR, file), 'utf-8');

  const scoreMatch = content.match(/## Score de aderência[^\n]*?(\d+)%/);
  const score = scoreMatch ? Number(scoreMatch[1]) : null;

  const statusMatch = content.match(/\*\*Status:\*\*\s*([^\n]+)/);
  const status = statusMatch ? statusMatch[1].trim() : '(sem campo Status)';

  // Marcador de placeholder deixado quando a JD original não foi colada no arquivo —
  // sem ela, o score não pode ser reconferido, é "confiança cega" no que o Claude gerou.
  if (/⬜ JD não arquivada/.test(content)) {
    semJdArquivada.push({ file, score, status });
  }

  if (!/\*\*Status atualizado em:\*\*/.test(content)) {
    semStatusAtualizado.push({ file, score, status });
  }
}

function printGroup(title, items, { sortByScoreDesc = true } = {}) {
  console.log(`\n${title} (${items.length})`);
  if (items.length === 0) {
    console.log('  — nenhuma.');
    return;
  }
  const sorted = sortByScoreDesc
    ? [...items].sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
    : items;
  for (const { file, score, status } of sorted) {
    const scoreStr = score === null ? '??%' : `${score}%`;
    const flag = score !== null && score >= 65 ? ' ⚠ score alto sem prova' : '';
    console.log(`  ${scoreStr.padStart(4)}  [${status}]  ${file}${flag}`);
  }
}

console.log(`Bench audit — ${files.length} vagas analisadas`);
printGroup('🔎 Sem JD arquivada (score não é reconferível)', semJdArquivada);
printGroup('🕓 Sem "Status atualizado em" (fora da convenção de carimbo determinístico)', semStatusAtualizado, { sortByScoreDesc: false });

console.log(
  '\nDica: vagas marcadas "⚠ score alto sem prova" acima de 65% sem JD arquivada são as' +
  ' mais valiosas de revisar primeiro — um score alto que ninguém pode conferir contra a' +
  ' fonte é exatamente o padrão do caso Zuri (2026-09-07).'
);
