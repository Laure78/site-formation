/**
 * Sous-menu « Notre organisme » — menu principal du header.
 */
import { LINKS } from '@/lib/internal-links';
import type { HeaderNavLink } from '@/lib/header-nav';

export const UTILITY_ORGANISME_NAV_LINKS: readonly HeaderNavLink[] = [
  {
    href: LINKS.aPropos,
    label: 'À propos',
    title: 'Laure Olivié — formatrice IA BTP',
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
  {
    href: LINKS.emplois,
    label: 'Nous rejoindre',
    title: 'Emplois et candidatures — Laure Olivié',
  },
];

export function utilityOrganismeNavActive(pathname: string): boolean {
  return UTILITY_ORGANISME_NAV_LINKS.some((link) => {
    const path = link.href.split('#')[0] || '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}
