/**
 * Navigation du header — source unique des rubriques et sous-menus.
 * Menus compacts (panneaux simples, pas de méga-menu).
 */
import { getAllParcoursComputed, type ParcoursId } from '@/data/catalogue-2027';
import { catalogueFormationNavContainsPath } from '@/lib/catalogue-formations-nav';
import {
  buildFormationsIaNiveauHref,
  buildFormationsThematiqueHref,
} from '@/lib/catalogue-filter-url';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { CATALOGUE_THEMATIQUES } from '@/lib/catalogue-thematiques-btp';
import { LINKS } from '@/lib/internal-links';

export type HeaderNavLink = {
  href: string;
  label: string;
  title?: string;
  description?: string;
  badge?: string;
  children?: readonly HeaderNavLink[];
};

export type HeaderMegaColumn = {
  title: string;
  href?: string;
  links: readonly HeaderNavLink[];
};

export type HeaderNavItem = {
  id: string;
  label: string;
  href: string;
  children?: readonly HeaderNavLink[];
  megaColumns?: readonly HeaderMegaColumn[];
  megaQuickLinks?: readonly HeaderNavLink[];
  megaFooterNote?: string;
  footer?: HeaderNavLink;
  variant?: 'default' | 'catalogue';
  dropdownAlign?: 'start' | 'end';
  isActive?: (pathname: string) => boolean;
};

function pathMatches(pathname: string, href: string): boolean {
  const path = href.split('#')[0] || '/';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function parcoursNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.parcoursMetiers ||
    pathname.startsWith(`${LINKS.formations}/parcours/`)
  );
}

function formationsNavActive(pathname: string): boolean {
  if (parcoursNavActive(pathname)) return false;
  if (pathname === LINKS.formations || pathname.startsWith(`${LINKS.formations}/`)) {
    return true;
  }
  if (pathname === LINKS.formationDeveloppementWebIaSansCoder) return true;
  if (pathname === LINKS.formationIaHub || pathname.startsWith(`${LINKS.formationIaHub}/`)) {
    return true;
  }
  return catalogueFormationNavContainsPath(pathname);
}

function evenementsNavActive(pathname: string): boolean {
  return pathname === LINKS.evenements || pathname.startsWith('/evenements/');
}

function ressourcesNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.ressources ||
    pathname.startsWith(`${LINKS.ressources}/`) ||
    pathname === LINKS.blog ||
    pathname.startsWith(`${LINKS.blog}/`) ||
    pathname === LINKS.claudeAiBtp ||
    pathname === LINKS.skillsClaudeBtp ||
    pathname === LINKS.skillsChatgptBtp ||
    pathname === LINKS.outilsIaBtp ||
    pathname.startsWith(`${LINKS.outilsIaBtp}/`) ||
    pathname === LINKS.casUsageIaMetierBtp ||
    pathname === LINKS.etudesCasHub ||
    pathname.startsWith(`${LINKS.etudesCasHub}/`) ||
    pathname === LINKS.diagnostic ||
    pathname === LINKS.checklist
  );
}

function organismeNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.aPropos ||
    pathname.startsWith(`${LINKS.aPropos}/`) ||
    pathname === LINKS.formateurs ||
    pathname.startsWith(`${LINKS.formateurs}/`) ||
    pathname === LINKS.avisClients ||
    pathname === LINKS.formateurIaBtp ||
    pathname === LINKS.qualiopi ||
    pathname === LINKS.accessibiliteHandicap ||
    pathname === LINKS.indicateursResultats ||
    pathname === LINKS.partenaires ||
    pathname.startsWith(`${LINKS.partenaires}/`) ||
    pathname === LINKS.contact ||
    pathname === LINKS.etudesCas ||
    pathname.startsWith(`${LINKS.etudesCas}/`) ||
    pathname === LINKS.formationsLinkedInLearning
  );
}

function parcoursBadge(id: ParcoursId): string | undefined {
  const p = getAllParcoursComputed().find((x) => x.id === id);
  return p?.disponibilite === 'ouverture-2027' ? '2027' : undefined;
}

function buildFormationsNavChildren(): readonly HeaderNavLink[] {
  const thematiques = CATALOGUE_THEMATIQUES.map((t) => ({
    href: buildFormationsThematiqueHref(t.id),
    label: t.title,
    title: `${t.title} — catalogue formations IA BTP`,
  }));
  const niveaux = FORMATIONS_NIVEAUX_IA.map((n) => ({
    href: buildFormationsIaNiveauHref(n.niveau),
    label: n.labelComplet,
    title: `${n.accrocheNiveau} — ${n.labelComplet}`,
  }));
  return [
    {
      href: LINKS.formations,
      label: 'Toutes les formations',
      title: 'Catalogue formations IA BTP',
    },
    ...thematiques,
    ...niveaux,
  ];
}

function buildParcoursNavChildren(): readonly HeaderNavLink[] {
  return [
    {
      href: LINKS.parcoursDirigeantPmeBtp,
      label: 'Dirigeant de PME BTP',
      title: 'Parcours dirigeant PME BTP',
      badge: parcoursBadge('dirigeant-pme-btp'),
    },
    {
      href: LINKS.parcoursChargeAffairesBtp,
      label: 'Chargé d’affaires',
      title: 'Parcours chargé d’affaires BTP',
      badge: parcoursBadge('charge-affaires-btp'),
    },
    {
      href: LINKS.parcoursConducteurDeTravaux,
      label: 'Conducteur de travaux',
      title: 'Parcours conducteur de travaux',
      badge: parcoursBadge('conducteur-de-travaux'),
    },
    {
      href: LINKS.parcoursChefDeChantier,
      label: 'Chef de chantier et chef d’équipe',
      description: 'Encadrement de chantier — deux parcours complémentaires',
      title: 'Parcours encadrement de chantier',
      badge: parcoursBadge('chef-de-chantier'),
    },
    {
      href: LINKS.parcoursAssistantDeGestionBtp,
      label: 'Fonctions administratives et assistance travaux',
      title: 'Parcours assistant de gestion BTP',
      badge: parcoursBadge('assistant-de-gestion-btp'),
    },
    {
      href: LINKS.parcoursReferentIaBtp,
      label: 'Référent IA BTP',
      title: 'Parcours référent IA BTP',
      badge: parcoursBadge('referent-ia-btp'),
    },
  ];
}

const ORGANISME_NAV_CHILDREN: readonly HeaderNavLink[] = [
  {
    href: LINKS.aPropos,
    label: 'Laure Olivié',
    title: 'Laure Olivié — formatrice IA BTP',
  },
  {
    href: LINKS.formateurs,
    label: 'Nos formateurs',
    title: 'Formateurs OFC',
  },
  {
    href: LINKS.qualiopi,
    label: 'Certification Qualiopi',
    title: 'Certification Qualiopi OFC',
  },
  {
    href: LINKS.avisClients,
    label: 'Avis clients et résultats',
    title: 'Avis clients et indicateurs Qualiopi',
  },
  {
    href: LINKS.partenaires,
    label: 'Partenaires',
    title: 'Partenaires OFC',
  },
  {
    href: LINKS.accessibiliteHandicap,
    label: 'Accessibilité et handicap',
    title: 'Accessibilité OFC',
  },
];

const RESSOURCES_NAV_CHILDREN: readonly HeaderNavLink[] = [
  {
    href: LINKS.ressourcesTutos,
    label: 'Tutoriels',
    title: 'Tutoriels IA BTP',
  },
  {
    href: `${LINKS.ressources}#guides-pdf`,
    label: 'Guides pratiques',
    title: 'Guides PDF IA BTP',
  },
  {
    href: LINKS.etudesCasHub,
    label: 'Cas clients',
    title: 'Études de cas clients BTP',
  },
  {
    href: LINKS.blog,
    label: 'Blog IA BTP',
    title: 'Articles IA BTP',
  },
];

function buildHeaderNavItems(): readonly HeaderNavItem[] {
  return [
    {
      id: 'formations',
      label: 'Formations IA BTP',
      href: LINKS.formations,
      variant: 'catalogue',
      isActive: formationsNavActive,
      children: buildFormationsNavChildren(),
    },
    {
      id: 'parcours-metiers',
      label: 'Parcours métiers',
      href: LINKS.parcoursMetiers,
      isActive: parcoursNavActive,
      children: buildParcoursNavChildren(),
      footer: {
        href: LINKS.parcoursMetiers,
        label: 'Tous les parcours',
        title: 'Hub parcours métiers BTP',
      },
    },
    {
      id: 'entreprise',
      label: 'Intra-entreprise',
      href: LINKS.formationIaIntraEntrepriseBtp,
      isActive: (pathname) => pathname === LINKS.formationIaIntraEntrepriseBtp,
    },
    {
      id: 'organisme',
      label: 'Notre organisme',
      href: LINKS.aPropos,
      dropdownAlign: 'end',
      isActive: organismeNavActive,
      children: ORGANISME_NAV_CHILDREN,
    },
    {
      id: 'evenements',
      label: 'Événements',
      href: LINKS.evenements,
      isActive: evenementsNavActive,
    },
    {
      id: 'ressources',
      label: 'Ressources',
      href: LINKS.ressources,
      isActive: ressourcesNavActive,
      children: RESSOURCES_NAV_CHILDREN,
    },
  ];
}

export function getHeaderNav(_at: Date = new Date()): readonly HeaderNavItem[] {
  return buildHeaderNavItems();
}

export const HEADER_NAV: readonly HeaderNavItem[] = getHeaderNav();

export function headerNavItemIsActive(item: HeaderNavItem, pathname: string): boolean {
  if (item.isActive) return item.isActive(pathname);
  return pathMatches(pathname, item.href);
}

export function headerNavLinkIsActive(href: string, pathname: string): boolean {
  return pathMatches(pathname, href);
}

export function headerNavLinkTreeIsActive(link: HeaderNavLink, pathname: string): boolean {
  if (headerNavLinkIsActive(link.href, pathname)) return true;
  return link.children?.some((child) => headerNavLinkTreeIsActive(child, pathname)) ?? false;
}

export function headerNavItemHasPanel(item: HeaderNavItem): boolean {
  return Boolean(
    (item.megaColumns && item.megaColumns.length > 0) ||
      (item.children && item.children.length > 0),
  );
}

function collectHeaderNavLinkHrefs(links: readonly HeaderNavLink[], hrefs: string[]): void {
  for (const link of links) {
    hrefs.push(link.href);
    if (link.children?.length) collectHeaderNavLinkHrefs(link.children, hrefs);
  }
}

export function collectHeaderNavHrefs(): string[] {
  const hrefs: string[] = [];
  for (const item of HEADER_NAV) {
    hrefs.push(item.href);
    if (item.children?.length) collectHeaderNavLinkHrefs(item.children, hrefs);
    if (item.megaColumns) {
      for (const col of item.megaColumns) {
        collectHeaderNavLinkHrefs(col.links, hrefs);
      }
    }
    if (item.megaQuickLinks?.length) collectHeaderNavLinkHrefs(item.megaQuickLinks, hrefs);
    if (item.footer) hrefs.push(item.footer.href);
  }
  return hrefs;
}
