/**
 * Méga-menu « Formations » — formations catalogue par niveau + parcours métiers.
 */
import {
  buildFormationsMobileNavGroupsByNiveau,
  buildFormationsNavMegaColumns,
} from '@/lib/header-nav-formations-catalogue';
import { buildParcoursNavChildren } from '@/lib/header-nav-parcours';
import type { HeaderMegaColumn, HeaderNavLink } from '@/lib/header-nav';
import { LINKS } from '@/lib/internal-links';

const FORMATIONS_CATALOGUE_FOOTER: HeaderNavLink = {
  href: LINKS.formations,
  label: 'Toutes les formations IA BTP',
  title: 'Catalogue des formations IA BTP — présentiel Île-de-France',
};

/** Desktop — trois colonnes niveau + parcours métiers. */
export function buildUnifiedFormationsNavMegaColumns(
  at: Date = new Date(),
): readonly HeaderMegaColumn[] {
  const niveauColumns = buildFormationsNavMegaColumns(at);
  const lastNiveauIndex = niveauColumns.length - 1;

  return [
    ...niveauColumns.map((col, index) =>
      index === lastNiveauIndex ? { ...col, footer: FORMATIONS_CATALOGUE_FOOTER } : col,
    ),
    {
      title: 'Parcours métiers BTP',
      intro: 'Dirigeant, conducteur, chargé d’affaires, admin…',
      links: buildParcoursNavChildren(),
      footer: {
        href: LINKS.parcoursMetiers,
        label: 'Tous les parcours métiers BTP',
        title: 'Hub parcours métiers BTP',
      },
    },
  ];
}

/** Mobile — deux groupes dépliables (formations par niveau + parcours). */
export function buildUnifiedFormationsMobileNavGroups(
  at: Date = new Date(),
): readonly HeaderNavLink[] {
  const parcoursLinks = buildParcoursNavChildren();
  return [
    {
      href: LINKS.formations,
      label: 'Formations IA BTP',
      description: 'Par niveau — devis, DCE, chantier, applications métier…',
      children: [
        ...buildFormationsMobileNavGroupsByNiveau(at),
        FORMATIONS_CATALOGUE_FOOTER,
      ],
    },
    {
      href: LINKS.parcoursMetiers,
      label: 'Parcours métiers BTP',
      description: 'Dirigeant, conducteur, chargé d’affaires, admin…',
      children: [
        ...parcoursLinks,
        {
          href: LINKS.parcoursMetiers,
          label: 'Tous les parcours métiers BTP',
          title: 'Hub parcours métiers BTP',
        },
      ],
    },
  ];
}
