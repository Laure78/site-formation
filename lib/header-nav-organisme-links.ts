/**
 * Sous-menu « Notre organisme » — menu principal du header.
 */
import type { HeaderNavLink } from '@/lib/header-nav';
import { LINKS } from '@/lib/internal-links';
import { NAV_ITEM_NOUS_REJOINDRE } from '@/lib/nav';

function navItemToHeaderLink(item: { href: string; label: string; title?: string }): HeaderNavLink {
  return { href: item.href, label: item.label, title: item.title };
}

export const UTILITY_ORGANISME_NAV_LINKS: readonly HeaderNavLink[] = [
  {
    href: LINKS.aPropos,
    label: 'À propos',
    title: 'Laure Olivié — formatrice IA BTP',
  },
  {
    href: LINKS.formateurs,
    label: 'Nos formateurs',
    title: 'Équipe de formateurs IA BTP',
  },
  {
    href: LINKS.qualiopi,
    label: 'Qualité et certification Qualiopi',
    title: 'Certification Qualiopi OFC',
  },
  {
    href: LINKS.partenaires,
    label: 'Nos partenaires',
    title: 'Partenaires et références OFC',
  },
  {
    href: LINKS.avisClients,
    label: 'Avis clients',
    title: 'Avis clients et témoignages',
  },
  navItemToHeaderLink(NAV_ITEM_NOUS_REJOINDRE),
];

export function utilityOrganismeNavActive(pathname: string): boolean {
  return UTILITY_ORGANISME_NAV_LINKS.some((link) => {
    const path = link.href.split('#')[0] || '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}
