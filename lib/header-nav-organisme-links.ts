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
    href: `${LINKS.formations}#plan-formation-entreprise`,
    label: 'Former mon équipe',
    title: 'Formation IA en intra-entreprise — plan pour votre équipe',
  },
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
  if (
    pathname === LINKS.formationIaIntraEntrepriseBtp ||
    pathname.startsWith(`${LINKS.formationIaIntraEntrepriseBtp}/`)
  ) {
    return true;
  }
  return UTILITY_ORGANISME_NAV_LINKS.some((link) => {
    const path = link.href.split('#')[0] || '/';
    // Ancre sur le catalogue — sans hash côté serveur : ne pas activer tout `/formations/*`
    if (link.href.includes('plan-formation-entreprise')) {
      return false;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}
