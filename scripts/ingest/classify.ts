export type Seniority = 'sr' | 'pleno' | 'junior' | null;

const SR_PATTERN     = /s[eê]nior|especialista|staff|lead|principal/i;
const PLENO_PATTERN  = /\bpleno\b|\bmid[- ]?level\b|\bmid\b|intermediate/i;
const JUNIOR_PATTERN = /j[uú]nior|trainee/i;

// Ordem importa: um título como "Especialista Sênior" bate em SR primeiro,
// não em nenhum outro nível — checa do mais específico/sênior pro mais júnior.
export function classifySeniority(title: string): Seniority {
  if (SR_PATTERN.test(title)) return 'sr';
  if (PLENO_PATTERN.test(title)) return 'pleno';
  if (JUNIOR_PATTERN.test(title)) return 'junior';
  return null;
}
