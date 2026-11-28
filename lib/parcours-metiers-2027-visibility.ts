/**
 * Visibilité publique des parcours métiers catalogue 2027.
 *
 * Publication progressive : seuls les IDs listés dans `PARCOURS_METIERS_PUBLISHED_IDS`
 * sont accessibles (hub `/parcours-metiers`, fiches `/formations/parcours/*`, nav, sitemap).
 * Les autres parcours restent en base ; leurs URLs redirigent vers `/formations`.
 *
 * Tout publier : compléter la liste avec les 7 parcours ou étendre la logique.
 * Puis `npm run llms:sync` et vérifier nav + catalogue.
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import { getParcoursBySlug } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';

/** Parcours en ligne (édition progressive — nov. 2026). */
export const PARCOURS_METIERS_PUBLISHED_IDS: readonly ParcoursId[] = [
  'conducteur-de-travaux',
  /** Assistance / admin chantier — libellé marketing « assistante travaux » */
  'assistant-de-gestion-btp',
] as const;

export function isParcoursMetierPublished(id: ParcoursId | string): boolean {
  return (PARCOURS_METIERS_PUBLISHED_IDS as readonly string[]).includes(id);
}

export function isParcoursMetiers2027Visible(): boolean {
  return PARCOURS_METIERS_PUBLISHED_IDS.length > 0;
}

/** Slug URL `/formations/parcours/[slug]`. */
export function isParcoursMetierSlugPublished(slug: string): boolean {
  const parcours = getParcoursBySlug(slug);
  if (!parcours) return false;
  return isParcoursMetierPublished(parcours.id);
}

/** Hub `/parcours-metiers` et fiches parcours publiées uniquement. */
export function isParcoursMetiersPublicHref(href: string): boolean {
  const path = href.replace(/\/$/, '').split('#')[0] || '/';
  if (path === LINKS.parcoursMetiers) return isParcoursMetiers2027Visible();
  const prefix = `${LINKS.formations}/parcours/`;
  if (!path.startsWith(prefix)) return false;
  const slug = path.slice(prefix.length);
  if (!slug || slug.includes('/')) return false;
  return isParcoursMetierSlugPublished(slug);
}

/** Filtre les cartes / liens internes quand le parcours ou le hub est masqué. */
export function filterLinksWhenParcoursMetiersHidden<T extends { href: string }>(
  links: readonly T[],
): T[] {
  return links.filter((l) => isParcoursMetiersPublicHref(l.href));
}