/**
 * Témoignages clients — source unique pour `components/Temoignages.tsx`.
 *
 * TODO(témoignages réels) : renseigner au moins 3 entrées vérifiables
 * (accord explicite pour prénom / fonction / entreprise, citation fidèle, date).
 * Tant que `TEMOIGNAGES` est vide, le composant ne rend rien — aucune section
 * ne doit annoncer des avis absents.
 */

export type Temoignage = {
  prenom: string;
  fonction: string;
  entreprise: string;
  secteur: string;
  verbatim: string;
  formation: string;
  /** ISO `YYYY-MM-DD` ou libellé court (ex. `mars 2026`). */
  date: string;
};

/** Tableau vide volontairement — ne pas inventer d’avis. */
export const TEMOIGNAGES: Temoignage[] = [
  // TODO(témoignage #1) — { prenom, fonction, entreprise, secteur, verbatim, formation, date }
  // TODO(témoignage #2)
  // TODO(témoignage #3)
];

/** Entrées affichables (champs essentiels non vides). */
export function getTemoignagesRemplis(list: readonly Temoignage[] = TEMOIGNAGES): Temoignage[] {
  return list.filter(
    (t) =>
      t.prenom.trim().length > 0 &&
      t.verbatim.trim().length > 0 &&
      t.fonction.trim().length > 0
  );
}
