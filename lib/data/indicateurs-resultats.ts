/**
 * Indicateurs de résultats Qualiopi (RNQ indicateur 2) — source unique.
 * Ne pas dupliquer ces valeurs ailleurs dans le code.
 */

export const indicateursResultats = {
  noteSatisfaction: 4.45,
  noteSatisfactionSur10: 8.9,
  nombreRepondants: 20,
  tauxRecommandation: 92,
  partNotesSuperieures8: 80,
  periodeReference: 'juillet 2025 – juin 2026',
  dateMiseAJour: '2026-08-23',
} as const;

/** Note sur 5 — virgule décimale (FR). Ex. « 4,45/5 » */
export function formatNoteSatisfactionSur5(
  note: number = indicateursResultats.noteSatisfaction,
): string {
  return `${note.toFixed(2).replace('.', ',')}/5`;
}

/** Période lisible avec « à » (ex. juillet 2025 à juin 2026). */
export function formatPeriodeReferenceAffichage(
  periode: string = indicateursResultats.periodeReference,
): string {
  return periode.replace(' – ', ' à ');
}

/** Format opposable Qualiopi : note + base de calcul. */
export function formatNoteSatisfactionAffichageComplet(): string {
  return `${formatNoteSatisfactionSur5()} — ${indicateursResultats.nombreRepondants} répondants, ${formatPeriodeReferenceAffichage()}`;
}

/** Date MAJ ISO → jj/mm/aaaa */
export function formatDateMiseAJourIndicateurs(
  isoDate: string = indicateursResultats.dateMiseAJour,
): string {
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

/** Pourcentage FR (ex. « 92 % »). */
export function formatTauxPourcentFr(valeur: number): string {
  return `${valeur} %`;
}

