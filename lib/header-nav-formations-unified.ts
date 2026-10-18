/**
 * Méga-menu « Formations » — formations catalogue + parcours métiers (deux colonnes).
 */
import { formationHref, type Formation } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { buildParcoursNavChildren } from '@/lib/header-nav-parcours';
import type { HeaderMegaColumn, HeaderNavLink } from '@/lib/header-nav';
import { LINKS } from '@/lib/internal-links';

function formationToNavLink(formation: Formation): HeaderNavLink {
  const label = formation.titre.trim();
  const secondary = [formation.niveauLabel?.trim(), formation.duree?.trim()]
    .filter(Boolean)
    .join(' · ');
  return {
    href: formationHref(formation),
    label,
    title: secondary ? `${label} — ${secondary}` : label,
    description: secondary || undefined,
  };
}

function buildPublishedFormationLinks(at: Date): HeaderNavLink[] {
  const seen = new Set<string>();
  const links: HeaderNavLink[] = [];
  for (const formation of getPublishedFormations(at)) {
    const href = formationHref(formation);
    if (seen.has(href)) continue;
    seen.add(href);
    links.push(formationToNavLink(formation));
  }
  return links;
}

/** Desktop — deux colonnes équilibrées. */
export function buildUnifiedFormationsNavMegaColumns(
  at: Date = new Date(),
): readonly HeaderMegaColumn[] {
  return [
    {
      title: 'Formations IA BTP',
      intro: 'Par niveau ou par métier — devis, DCE, chantier…',
      links: buildPublishedFormationLinks(at),
      footer: {
        href: LINKS.formations,
        label: 'Toutes les formations IA BTP',
        title: 'Catalogue des formations IA BTP — présentiel Île-de-France',
      },
    },
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

/** Mobile — deux groupes dépliables (enfants imbriqués). */
export function buildUnifiedFormationsMobileNavGroups(
  at: Date = new Date(),
): readonly HeaderNavLink[] {
  const formationsLinks = buildPublishedFormationLinks(at);
  const parcoursLinks = buildParcoursNavChildren();
  return [
    {
      href: LINKS.formations,
      label: 'Formations IA BTP',
      description: 'Par niveau ou par métier — devis, DCE, chantier…',
      children: [
        ...formationsLinks,
        {
          href: LINKS.formations,
          label: 'Toutes les formations IA BTP',
          title: 'Catalogue des formations IA BTP',
        },
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
