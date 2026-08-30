/**
 * Chiffres publics OFC — affichage, compteurs, JSON-LD.
 * Source unique des preuves sociales (indicateur 2 Qualiopi) : `lib/data/indicateurs-resultats.ts`.
 * L’effectif cumulé formé n’est pas publié sur le site (audit Qualiopi).
 */

import {
  formatDateMiseAJourIndicateurs,
  formatNoteSatisfactionSur5,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';

/** Contact public du site (email, téléphone, adresse) — source unique UI / contenus. */
export const CONTACT = {
  email: 'laureolivie@yahoo.fr',
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
  satisfaction: formatNoteSatisfactionSur5(),
  repondants: indicateursResultats.nombreRepondants,
  periode: indicateursResultats.periodeReference,
  majAt: indicateursResultats.dateMiseAJour,
} as const;

/** Valeur numérique de la note (compteurs animés, JSON-LD). */
export const PREUVES_SATISFACTION_VALEUR = indicateursResultats.noteSatisfaction;

/** Période de référence indicateurs (texte public). */
export const PREUVES_PERIODE = {
  label: indicateursResultats.periodeReference,
} as const;

/** Affichage FR de `PREUVES.majAt` (ISO → jj/mm/aaaa). */
export function formatPreuvesMajLe(isoDate: string = PREUVES.majAt): string {
  return formatDateMiseAJourIndicateurs(isoDate);
}

/** Mention sourcing satisfaction (footer stats, hero). */
export const PREUVES_MENTION_SOURCE =
  `Note calculée sur la base des questionnaires de satisfaction recueillis à l'issue des sessions — ${indicateursResultats.nombreRepondants} répondants, période ${indicateursResultats.periodeReference}. Dernière mise à jour : ${formatPreuvesMajLe()}.` as const;

/** Bloc « Fédérations & OPCO » — accueil, pour qui (sans effectif formé publié). */
export const PREUVES_FEDERATIONS_OPCO =
  'Sessions animées avec FFB Grand Paris, CSFE et UMB-FFB.' as const;

export const siteStats = {
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
  AVERAGE_RATING: siteStats.noteMoyenneAffichee,
  AVERAGE_RATING_VALUE: siteStats.noteMoyenneValeur,
} as const;
