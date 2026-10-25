/**
 * Sous-menu « Parcours métiers » — dérivé du catalogue 2027 (7 parcours).
 */
import { getAllParcoursComputed, METIERS_CATALOGUE_2027 } from '@/data/catalogue-2027';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import type { HeaderNavLink } from '@/lib/header-nav';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

export function buildParcoursNavChildren(): readonly HeaderNavLink[] {
  if (!isParcoursMetiers2027Visible()) return [];
  return getAllParcoursComputed().map((parcours) => {
    const metier = METIERS_CATALOGUE_2027.find((m) => m.parcoursId === parcours.id);
    return {
      href: parcoursHref(parcours.id),
      label: metier?.label ?? parcours.titre,
      title: `Parcours ${parcours.titre}`,
      badge: parcours.disponibilite === 'ouverture-2027' ? '2027' : undefined,
    };
  });
}
