/**
 * Parcours métiers affichés publiquement (catalogue 2027 — 6 parcours).
 */
import {
  getAllParcoursComputed,
  METIERS_CATALOGUE_2027,
  type MetierCatalogue,
  type ParcoursComputed,
  type ParcoursId,
} from '@/data/catalogue-2027';

/** Ordre maquette page /parcours-metiers (6 parcours). */
export const PARCOURS_METIERS_PAGE_ORDER: readonly ParcoursId[] = [
  'dirigeant-pme-btp',
  'charge-affaires-btp',
  'conducteur-de-travaux',
  'chef-de-chantier',
  'assistant-de-gestion-btp',
  'referent-ia-btp',
] as const;

/** Ordre grille accueil (6 cartes). */
export const ACCUEIL_PARCOURS_METIERS_PUBLIC_ORDER: readonly ParcoursId[] = [
  'conducteur-de-travaux',
  'charge-affaires-btp',
  'assistant-de-gestion-btp',
  'dirigeant-pme-btp',
  'chef-de-chantier',
  'referent-ia-btp',
] as const;

export function getParcoursMetiersPublicsComputed(): ParcoursComputed[] {
  return getAllParcoursComputed();
}

export function getParcoursMetiersPublicsOrdered(
  order: readonly ParcoursId[] = PARCOURS_METIERS_PAGE_ORDER,
): ParcoursComputed[] {
  const byId = new Map(getParcoursMetiersPublicsComputed().map((p) => [p.id, p]));
  return order.map((id) => byId.get(id)).filter((p): p is ParcoursComputed => p != null);
}

export function getMetiersCataloguePublic(): MetierCatalogue[] {
  return [...METIERS_CATALOGUE_2027];
}
