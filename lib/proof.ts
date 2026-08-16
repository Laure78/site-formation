/**
 * Preuves sociales OFC — réexport depuis `lib/constants.ts` (source unique `PREUVES`).
 * @deprecated Préférer `PREUVES` et les helpers de `@/lib/constants`.
 */
import {
  PREUVES,
  PREUVES_MENTION_SOURCE,
  PREUVES_PERIODE,
  formatPersonnesFormeesCount,
  formatPreuvesMajLe,
} from '@/lib/constants';

export const PROOF = {
  formes: PREUVES.prosFormes,
  note: PREUVES.satisfaction,
  repondants: PREUVES.repondants,
  periode: PREUVES.periode,
  majLe: formatPreuvesMajLe(),
  mentionSource: PREUVES_MENTION_SOURCE,
} as const;

export const PROOF_PERIODE = PREUVES_PERIODE;

/** @deprecated Utiliser `formatPersonnesFormeesCount`. */
export function formatProofFormes(value: number = PREUVES.prosFormes): string {
  return formatPersonnesFormeesCount(value);
}

/** Affichage FR des répondants (ex. « 412 »). */
export function formatProofRepondants(value: number = PREUVES.repondants): string {
  return value.toLocaleString('fr-FR');
}
