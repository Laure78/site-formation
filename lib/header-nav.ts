/**
 * Navigation du header — source unique des rubriques et sous-menus.
 * Menus compacts (panneaux simples, pas de méga-menu).
 */
import { catalogueFormationNavContainsPath } from '@/lib/catalogue-formations-nav';
import {
  buildUnifiedFormationsMobileNavGroups,
  buildUnifiedFormationsNavMegaColumns,
} from '@/lib/header-nav-formations-unified';
import {
  UTILITY_ORGANISME_NAV_LINKS,
  utilityOrganismeNavActive,
} from '@/lib/header-nav-organisme-links';
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
  /** Texte d’introduction sous le titre de colonne (méga-menu Formations). */
  intro?: string;
  href?: string;
  links: readonly HeaderNavLink[];
  footer?: HeaderNavLink;
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
  /** Panneau sans titre de rubrique (ex. Ressources). */
  hideDropdownHeading?: boolean;
  /** Liste formations catalogue — libellés multilignes, groupés par niveau. */
  dropdownPanelFormations?: boolean;
  /** Méga-menu Formations — grille deux colonnes (formations + parcours). */
  dropdownPanelFormationsDual?: boolean;
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
  if (parcoursNavActive(pathname)) return true;
  if (pathname === LINKS.formations || pathname.startsWith(`${LINKS.formations}/`)) {
    return true;
  }
  if (pathname === LINKS.formationDeveloppementWebIaSansCoder) return true;
  if (pathname === LINKS.formationIaHub || pathname.startsWith(`${LINKS.formationIaHub}/`)) {
    return true;
  }
  return catalogueFormationNavContainsPath(pathname);
}

function ressourcesNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.ressources ||
    pathname.startsWith(`${LINKS.ressources}/`) ||
    pathname === LINKS.ressourcesTutos ||
    pathname.startsWith(`${LINKS.ressourcesTutos}/`) ||
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

function formateursNavActive(pathname: string): boolean {
  return pathname === LINKS.formateurs || pathname.startsWith(`${LINKS.formateurs}/`);
}

function financementNavActive(pathname: string): boolean {
  return pathname === LINKS.financement || pathname.startsWith(`${LINKS.financement}/`);
}

/** État actif rubrique « Notre organisme » (menu principal). */
export function headerUtilityOrganismeIsActive(pathname: string): boolean {
  return utilityOrganismeNavActive(pathname);
}

const RESSOURCES_NAV_CHILDREN: readonly HeaderNavLink[] = [
  {
    href: LINKS.blog,
    label: 'Articles et conseils',
    title: 'Articles et conseils IA BTP',
  },
  {
    href: LINKS.ressourcesTutos,
    label: 'Tutoriels IA BTP',
    title: 'Tutoriels IA BTP',
  },
  {
    href: `${LINKS.ressources}#guides-pdf`,
    label: 'Guides et modèles',
    title: 'Guides PDF et modèles IA BTP',
  },
];

function buildHeaderNavItems(at: Date = new Date()): readonly HeaderNavItem[] {
  return [
    {
      id: 'formations',
      label: 'Formations',
      href: LINKS.formations,
      isActive: formationsNavActive,
      megaColumns: buildUnifiedFormationsNavMegaColumns(at),
      children: buildUnifiedFormationsMobileNavGroups(at),
      hideDropdownHeading: true,
      dropdownPanelFormations: true,
      dropdownPanelFormationsDual: true,
    },
    {
      id: 'formateurs',
      label: 'Nos formateurs',
      href: LINKS.formateurs,
      isActive: formateursNavActive,
    },
    {
      id: 'financement',
      label: 'Financement',
      href: LINKS.financement,
      isActive: financementNavActive,
    },
    {
      id: 'ressources',
      label: 'Ressources',
      href: LINKS.ressources,
      isActive: ressourcesNavActive,
      children: RESSOURCES_NAV_CHILDREN,
      dropdownAlign: 'end',
      hideDropdownHeading: true,
    },
    {
      id: 'organisme',
      label: 'Notre organisme',
      href: LINKS.aPropos,
      isActive: utilityOrganismeNavActive,
      children: UTILITY_ORGANISME_NAV_LINKS,
      dropdownAlign: 'end',
      hideDropdownHeading: true,
    },
  ];
}

export function getHeaderNav(at: Date = new Date()): readonly HeaderNavItem[] {
  return buildHeaderNavItems(at);
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
    if (item.megaColumns) {
      for (const col of item.megaColumns) {
        if (col.footer) hrefs.push(col.footer.href);
      }
    }
  }
  return hrefs;
}
