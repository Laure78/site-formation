/**
 * Chiffres publics OFC — affichage, compteurs, JSON-LD.
 * Source unique des preuves sociales (indicateur 2 Qualiopi).
 */

/** Contact public du site (email, téléphone, adresse) — source unique UI / contenus. */
export const CONTACT = {
  email: 'contact@laureolivie.fr',
  phone: '+33695661818',
  phoneDisplay: '06 95 66 18 18',
  address: '6 rue Henri Dunant, 78280 Guyancourt',
} as const;

/**
 * Départements Île-de-France — source unique (ne plus écrire la liste en dur).
 * Ordre : Paris puis petite/grande couronne.
 */
export const IDF_DEPARTEMENTS = [75, 77, 78, 91, 92, 93, 94, 95] as const;

/** Liste affichable : « 75, 77, 78, 91, 92, 93, 94, 95 » */
export const IDF_DEPARTEMENTS_LISTE = IDF_DEPARTEMENTS.join(', ');

/**
 * Formulation unique couverture géo OFC (présentiel).
 * « Paris et toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95) »
 */
export const IDF_ZONE_INTERVENTION =
  `Paris et toute l'Île-de-France (${IDF_DEPARTEMENTS_LISTE})` as const;

/**
 * Preuves sociales consolidées — ne pas dupliquer ces valeurs ailleurs.
 * Période et mise à jour : voir `/indicateurs-resultats`.
 */
export const PREUVES = {
  prosFormes: 1592,
  satisfaction: '4,85/5',
  repondants: 412,
  periode: '01/01/2024 – 31/12/2025',
  majAt: '2026-06-03',
} as const;

/** Valeur numérique de la note (compteurs animés, JSON-LD). */
export const PREUVES_SATISFACTION_VALEUR = 4.85 as const;

/** Début / fin extraits de `PREUVES.periode`. */
export const PREUVES_PERIODE = {
  debut: '01/01/2024',
  fin: '31/12/2025',
} as const;

/** Affichage FR de `PREUVES.majAt` (ISO → jj/mm/aaaa). */
export function formatPreuvesMajLe(isoDate: string = PREUVES.majAt): string {
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

/** Mention sourcing satisfaction (footer stats, hero). */
export const PREUVES_MENTION_SOURCE =
  `Note calculée sur la base des questionnaires de satisfaction recueillis à l'issue des sessions du ${PREUVES_PERIODE.debut} au ${PREUVES_PERIODE.fin} — ${PREUVES.repondants.toLocaleString('fr-FR')} répondants. Dernière mise à jour : ${formatPreuvesMajLe()}.` as const;

/** Bloc « Fédérations & OPCO » — accueil, pour qui. */
export const PREUVES_FEDERATIONS_OPCO =
  `Toutes actions confondues : ${PREUVES.prosFormes.toLocaleString('fr-FR')} professionnels formés, ${PREUVES.satisfaction} de satisfaction — dont des sessions animées avec FFB Grand Paris, CSFE et UMB-FFB.` as const;

export const siteStats = {
  personnesFormees: PREUVES.prosFormes,
  noteMoyenneAffichee: PREUVES.satisfaction,
  noteMoyenneValeur: PREUVES_SATISFACTION_VALEUR,
} as const;

/** Mention de fraîcheur sous les compteurs (sans date au jour près). */
export function getStatsFreshnessLabel(referenceYear?: number): string {
  const year = referenceYear ?? new Date().getFullYear();
  return `chiffres à jour ${year}`;
}

/** @deprecated Préférer `siteStats` — conservé pour compatibilité imports existants. */
export const SOCIAL_PROOF = {
  PROFESSIONALS_TRAINED: siteStats.personnesFormees,
  AVERAGE_RATING: siteStats.noteMoyenneAffichee,
  AVERAGE_RATING_VALUE: siteStats.noteMoyenneValeur,
} as const;

export function formatPersonnesFormeesCount(value: number = siteStats.personnesFormees): string {
  return value.toLocaleString('fr-FR');
}

/** @deprecated Alias — utiliser `formatPersonnesFormeesCount`. */
export function formatProfessionalsTrainedCount(value: number = siteStats.personnesFormees): string {
  return formatPersonnesFormeesCount(value);
}
