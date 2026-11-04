/**
 * Parcours métiers affichés publiquement (catalogue 2027).
 * Le parcours « Chef d’équipe » reste en source de données pour les modules transversaux.
 */
import {
  getAllParcoursComputed,
  METIERS_CATALOGUE_2027,
  type MetierCatalogue,
  type ParcoursComputed,
  type ParcoursId,
} from '@/data/catalogue-2027';

/** Retiré du catalogue public (cartes, nav, accueil) — modules MAN-* conservés. */
export const PARCOURS_METIER_RETIRE_PUBLIC: ParcoursId = 'chef-dequipe';

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

export function isParcoursMetierPublic(id: ParcoursId | string): boolean {
  return id !== PARCOURS_METIER_RETIRE_PUBLIC;
}

export function getParcoursMetiersPublicsComputed(): ParcoursComputed[] {
  return getAllParcoursComputed().filter((p) => isParcoursMetierPublic(p.id));
}

export function getParcoursMetiersPublicsOrdered(
  order: readonly ParcoursId[] = PARCOURS_METIERS_PAGE_ORDER,
): ParcoursComputed[] {
  const byId = new Map(getParcoursMetiersPublicsComputed().map((p) => [p.id, p]));
  return order.map((id) => byId.get(id)).filter((p): p is ParcoursComputed => p != null);
}

export function getMetiersCataloguePublic(): MetierCatalogue[] {
  return METIERS_CATALOGUE_2027.filter((m) => isParcoursMetierPublic(m.parcoursId));
}
