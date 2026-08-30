/**
 * Avis Google — source locale structurée pour `/avis-clients`.
 *
 * Renseigner uniquement des avis réels et vérifiables (citation fidèle, accord explicite).
 * Tant que le tableau est vide, la page s’appuie sur l’API Google Places si configurée
 * (`GOOGLE_PLACE_ID` + `GOOGLE_PLACES_API_KEY`), sinon affiche un message invitant
 * à consulter la fiche Google — sans inventer d’avis.
 *
 * @example
 * ```ts
 * {
 *   id: 'google-2026-03-15-martin-d',
 *   author: 'Marc Dupont',
 *   initials: 'MD',
 *   rating: 5,
 *   date: '15 mars 2026',
 *   text: 'Citation exacte de l’avis Google…',
 *   source: 'google',
 *   optionalCompany: 'Entreprise XYZ',
 *   optionalRole: 'Conducteur de travaux',
 * }
 * ```
 */

export type GoogleReviewSource = 'google';

export type GoogleReviewEntry = {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  source: GoogleReviewSource;
  optionalCompany?: string;
  optionalRole?: string;
};

/** Avis Google saisis manuellement — ne pas inventer d’entrées. */
export const GOOGLE_REVIEWS: GoogleReviewEntry[] = [
  // TODO(avis Google #1) — copier la citation fidèle depuis la fiche Google
  // TODO(avis Google #2)
  // TODO(avis Google #3)
];

/** Entrées affichables (champs essentiels non vides, note 1–5). */
export function getFilledGoogleReviews(
  list: readonly GoogleReviewEntry[] = GOOGLE_REVIEWS,
): GoogleReviewEntry[] {
  return list.filter(
    (r) =>
      r.id.trim().length > 0 &&
      r.author.trim().length > 0 &&
      r.initials.trim().length > 0 &&
      r.text.trim().length > 0 &&
      r.date.trim().length > 0 &&
      r.rating >= 1 &&
      r.rating <= 5,
  );
}
