/**
 * Preuves sociales OFC — réexport depuis `lib/constants.ts` (source unique `PREUVES`).
 * @deprecated Préférer `PREUVES` et les helpers de `@/lib/constants`.
 */
import {
  PREUVES,
  PREUVES_MENTION_SOURCE,
  PREUVES_PERIODE,
  formatPreuvesMajLe,
} from '@/lib/constants';

export const PROOF = {
  note: PREUVES.satisfaction,
  repondants: PREUVES.repondants,
  periode: PREUVES.periode,
  majLe: formatPreuvesMajLe(),
  mentionSource: PREUVES_MENTION_SOURCE,
} as const;

export const PROOF_PERIODE = PREUVES_PERIODE;

/** Affichage FR des répondants (ex. « 20 »). */
export function formatProofRepondants(value: number = PREUVES.repondants): string {
  return value.toLocaleString('fr-FR');
}
