/**
 * Visibilité publique des parcours métiers catalogue 2027.
 *
 * `PARCOURS_METIERS_2027_VISIBLE = false` (état actuel) :
 * - redirection `/parcours-metiers` et `/formations/parcours/*` → `/formations`
 * - colonne footer, entrée header, méga-menu, sitemap hub parcours masqués
 * - sections accueil « parcours métiers », modules formateurs « ouverture 2027 »
 * - liens internes filtrés via `filterLinksWhenParcoursMetiersHidden` / maillage cluster
 *
 * Réactivation : passer à `true`, puis `npm run llms:sync` et vérifier nav + catalogue.
 * Données (`data/catalogue-2027`, pages hub, composants) conservées telles quelles.
 */
import { LINKS } from '@/lib/internal-links';

export const PARCOURS_METIERS_2027_VISIBLE = false;

export function isParcoursMetiers2027Visible(): boolean {
  return PARCOURS_METIERS_2027_VISIBLE;
}

/** Hub `/parcours-metiers` et fiches `/formations/parcours/*`. */
export function isParcoursMetiersPublicHref(href: string): boolean {
  const path = href.replace(/\/$/, '').split('#')[0] || '/';
  if (path === LINKS.parcoursMetiers) return true;
  return path.startsWith(`${LINKS.formations}/parcours/`);
}

/** Filtre les cartes / liens internes quand les parcours sont masqués. */
export function filterLinksWhenParcoursMetiersHidden<T extends { href: string }>(
  links: readonly T[],
): T[] {
  if (isParcoursMetiers2027Visible()) return [...links];
  return links.filter((l) => !isParcoursMetiersPublicHref(l.href));
}
