/**
 * Indicateurs de résultats Qualiopi (indicateur 2) — source unique pour le site public.
 * Satisfaction uniquement ; réalisation et assiduité en consolidation.
 */
export const indicateursResultats = {
  noteSatisfaction: 4.45,
  nombreRepondants: 20,
  periodeReference: 'juillet 2025 – juin 2026',
  dateMiseAJour: '2026-08-23',
} as const;

/** Note sur 5 avec virgule décimale (ex. « 4,45/5 »). */
export function formatNoteSatisfactionSur5(): string {
  const note = indicateursResultats.noteSatisfaction.toFixed(2).replace('.', ',');
  return `${note}/5`;
}

/** Note complète pour preuves sociales (ex. « 4,45/5 — 20 répondants »). */
export function formatNoteSatisfactionAffichageComplet(): string {
  return `${formatNoteSatisfactionSur5()} — ${indicateursResultats.nombreRepondants} répondants`;
}

/** Période de référence telle qu'affichée sur la page indicateurs. */
export function formatPeriodeReferenceAffichage(): string {
  return indicateursResultats.periodeReference;
}

/** Date de dernière mise à jour (JJ/MM/AAAA). */
export function formatDateMiseAJourIndicateurs(
  isoDate: string = indicateursResultats.dateMiseAJour,
): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/** Libellé principal — indicateur satisfaction à chaud. */
export function formatIndicateurSatisfactionLibelle(): string {
  return `Note moyenne de satisfaction (évaluation à chaud) : ${formatNoteSatisfactionSur5()}`;
}

/** Sous-texte descriptif sous l'indicateur satisfaction. */
export function formatIndicateurSatisfactionSousTexte(): string {
  return `Note calculée sur les questionnaires de satisfaction renseignés par les participants en fin de session — ${indicateursResultats.nombreRepondants} répondants, ${formatPeriodeReferenceAffichage()}. Dernière mise à jour : ${formatDateMiseAJourIndicateurs()}.`;
}

/** Paragraphe « Méthode de calcul » — satisfaction uniquement. */
export function getMethodeCalculSatisfactionParagraph(): string {
  return `Satisfaction (évaluation à chaud) : moyenne arithmétique des notes sur 5 déclarées par les participants via le questionnaire de satisfaction en fin de session, sur la période ${formatPeriodeReferenceAffichage()} (${indicateursResultats.nombreRepondants} répondants).`;
}

/** Mention transitoire — réalisation et assiduité non encore consolidées. */
export const INDICATEURS_REALISATION_ASSIDUITE_A_VENIR =
  "Les indicateurs de réalisation et d'assiduité seront publiés à l'issue de la consolidation de l'exercice en cours." as const;
