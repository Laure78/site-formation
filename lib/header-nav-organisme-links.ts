/**
 * Sous-menu « Notre organisme » — bandeau utilitaire du header.
 */
import { LINKS } from '@/lib/internal-links';
import type { HeaderNavLink } from '@/lib/header-nav';

export const UTILITY_ORGANISME_NAV_LINKS: readonly HeaderNavLink[] = [
  {
    href: LINKS.aPropos,
    label: 'À propos',
    title: 'OFC Création d’Entreprise — Laure Olivié',
  },
  {
    href: LINKS.qualiopi,
    label: 'Qualité et certification Qualiopi',
    title: 'Certification Qualiopi OFC',
  },
  {
    href: LINKS.partenaires,
    label: 'Partenaires',
    title: 'Partenaires OFC',
  },
  {
    href: LINKS.avisClients,
    label: 'Avis clients',
    title: 'Avis clients et témoignages',
  },
];

export function utilityOrganismeNavActive(pathname: string): boolean {
  return UTILITY_ORGANISME_NAV_LINKS.some((link) => {
    const path = link.href.split('#')[0] || '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}
