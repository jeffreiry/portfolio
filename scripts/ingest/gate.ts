// Gate por score (ingest-plan.md § Pipeline, passo 6, ajustado em 2026-09-28
// a pedido do autor): >=40 vira ficha completa no bench; <40 cai num digest
// leve. 40 é a mesma fronteira de "Desalinhamento estrutural" em scoreLabel()
// (core.ts) — só o pior nível de aderência fica de fora da ficha completa.
export const GATE_THRESHOLD = 40;

export function shouldPromoteToFicha(score: number): boolean {
  return score >= GATE_THRESHOLD;
}
