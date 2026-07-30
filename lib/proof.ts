/**
 * Preuves sociales OFC — source unique (formés, note, répondants, période).
 * Ne pas dupliquer ces valeurs ailleurs : importer `PROOF`.
 */
export const PROOF = {
  formes: 1592,
  note: '4,85/5',
  repondants: 412,
  periode: '01/01/2024 – 31/12/2025',
  majLe: '03/06/2026',
  mentionSource:
    "Note calculée sur la base des questionnaires de satisfaction recueillis à l'issue des sessions du 01/01/2024 au 31/12/2025 — 412 répondants. Dernière mise à jour : 03/06/2026.",
} as const;

/** Affichage FR des formés (ex. « 1 592 »). */
export function formatProofFormes(value: number = PROOF.formes): string {
  return value.toLocaleString('fr-FR');
}

/** Affichage FR des répondants (ex. « 412 »). */
export function formatProofRepondants(value: number = PROOF.repondants): string {
  return value.toLocaleString('fr-FR');
}

/** Début / fin de période extraits de `PROOF.periode` (tiret cadratin). */
export const PROOF_PERIODE = {
  debut: '01/01/2024',
  fin: '31/12/2025',
} as const;
