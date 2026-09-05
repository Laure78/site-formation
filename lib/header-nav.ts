/**
 * Navigation du header — source unique des rubriques et sous-menus.
 * Tous les `href` pointent vers `LINKS` ou des ancres de pages existantes.
 */
import { catalogueFormationNavContainsPath } from '@/lib/catalogue-formations-nav';
import { FORMATIONS, formationHref } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';

export type HeaderNavLink = {
  href: string;
  label: string;
  /** Attribut HTML `title` (tooltip), optionnel. */
  title?: string;
  /** Sous-liens indentés (ex. niveaux d'un parcours). */
  children?: readonly HeaderNavLink[];
};

export type HeaderNavItem = {
  id: string;
  label: string;
  href: string;
  /** Sous-pages du menu déroulant (absentes = lien simple). */
  children?: readonly HeaderNavLink[];
  /** Lien de pied de dropdown (souvent le hub de la rubrique). */
  footer?: HeaderNavLink;
  /** Aligne le panneau à droite pour éviter le débordement en bout de barre. */
  dropdownAlign?: 'start' | 'end';
  isActive?: (pathname: string) => boolean;
};

/** Libellés courts du catalogue — une entrée par code NIV. */
const FORMATION_NAV_LABELS: Record<string, string> = {
  'NIV-01': "Les bases de l'IA",
  'NIV-02': "IA et appels d'offres",
  'NIV-03': 'IA et conduite de travaux',
  'NIV-04': 'Maîtriser Claude AI',
  'NIV-05': "IA et maîtrise d'œuvre",
  'NIV-06': 'Application métier — niveau 1',
  'NIV-07': 'Application métier — niveau 2',
  'NIV-08': 'Application métier — niveau 3',
};

const APPLICATION_METIER_CODES = new Set(['NIV-06', 'NIV-07', 'NIV-08']);

function formationNavLink(formation: (typeof FORMATIONS)[number]): HeaderNavLink {
  return {
    href: formationHref(formation),
    label: FORMATION_NAV_LABELS[formation.code] ?? formation.titre,
  };
}

function buildFormationsNavChildren(at: Date): HeaderNavLink[] {
  const published = getPublishedFormations(at);
  const applicationMetier = published.filter((f) => APPLICATION_METIER_CODES.has(f.code));
  const catalogueCore = published.filter((f) => !APPLICATION_METIER_CODES.has(f.code));

  const parcoursItem: HeaderNavLink = {
    href: LINKS.parcoursApplicationsMetierBtp,
    label: 'Parcours applications métier BTP',
    title: 'Créer ses applications métier BTP avec l’IA — parcours 21 h',
    children: applicationMetier.map(formationNavLink),
  };

  return [
    ...catalogueCore.map(formationNavLink),
    parcoursItem,
  ];
}

function pathMatches(pathname: string, href: string): boolean {
  const path = href.split('#')[0] || '/';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function formationsNavActive(pathname: string): boolean {
  if (pathname === LINKS.formations || pathname.startsWith(`${LINKS.formations}/`)) {
    return true;
  }
  if (pathname === LINKS.parcoursApplicationsMetierBtp || pathname.startsWith(`${LINKS.parcoursApplicationsMetierBtp}/`)) {
    return true;
  }
  if (pathname === LINKS.formationIaHub || pathname.startsWith(`${LINKS.formationIaHub}/`)) {
    return true;
  }
  return catalogueFormationNavContainsPath(pathname);
}

function ressourcesNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.ressources ||
    pathname.startsWith(`${LINKS.ressources}/`) ||
    pathname === LINKS.blog ||
    pathname.startsWith(`${LINKS.blog}/`) ||
    pathname === LINKS.claudeAiBtp ||
    pathname === LINKS.outilsIaBtp ||
    pathname.startsWith(`${LINKS.outilsIaBtp}/`) ||
    pathname === LINKS.casUsageIaMetierBtp ||
    pathname === LINKS.diagnostic ||
    pathname === LINKS.checklist
  );
}

function partenairesNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.partenaires ||
    pathname.startsWith(`${LINKS.partenaires}/`) ||
    pathname === LINKS.etudesCas ||
    pathname.startsWith(`${LINKS.etudesCas}/`) ||
    pathname === LINKS.formationsLinkedInLearning
  );
}

function aProposNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.aPropos ||
    pathname.startsWith(`${LINKS.aPropos}/`) ||
    pathname === LINKS.avisClients ||
    pathname === LINKS.formateurIaBtp ||
    pathname === LINKS.qualiopi ||
    pathname === LINKS.accessibiliteHandicap ||
    pathname === LINKS.indicateursResultats
  );
}

function financementNavActive(pathname: string): boolean {
  return pathname === LINKS.financement || pathname.startsWith('/financement-constructys');
}

/** Ancres réelles de `app/financement-constructys-formation-ia-btp/page.tsx`. */
const FINANCEMENT_CHILDREN: readonly HeaderNavLink[] = [
  { href: `${LINKS.financement}#essentiel-title`, label: 'L’essentiel Constructys' },
  { href: `${LINKS.financement}#etapes-financement`, label: 'Demander la prise en charge' },
  { href: `${LINKS.financement}#qui-fait-quoi-title`, label: 'Qui fait quoi' },
];

/** Ancres réelles de `app/partenaires/page.tsx`. */
const PARTENAIRES_SECTION_CHILDREN: readonly HeaderNavLink[] = [
  { href: `${LINKS.partenaires}#references-btp`, label: 'Réseaux BTP' },
  { href: `${LINKS.partenaires}#autres-organismes`, label: 'Autres organismes' },
  { href: `${LINKS.partenaires}#deroulement`, label: 'Déroulement' },
  { href: LINKS.etudesCasFfbCsfe, label: 'Étude de cas FFB & CSFE' },
  { href: LINKS.formationsLinkedInLearning, label: 'Formations LinkedIn Learning' },
];

export function getHeaderNav(at: Date = new Date()): readonly HeaderNavItem[] {
  return BASE_HEADER_NAV.map((item) => {
    if (item.id !== 'formations' || !item.children) return item;
    return {
      ...item,
      children: buildFormationsNavChildren(at),
    };
  });
}

const BASE_HEADER_NAV: readonly HeaderNavItem[] = [
  {
    id: 'accueil',
    label: 'Accueil',
    href: LINKS.home,
    isActive: (pathname) => pathname === LINKS.home,
  },
  {
    id: 'formations',
    label: 'Formations',
    href: LINKS.formations,
    isActive: formationsNavActive,
    children: [
      ...FORMATIONS.map((formation) => ({
        href: formationHref(formation),
        label: FORMATION_NAV_LABELS[formation.code] ?? formation.titre,
      })),
      { href: LINKS.formationPlateforme, label: 'Espace apprenant' },
    ],
    footer: { href: LINKS.formations, label: 'Toutes les formations' },
  },
  {
    id: 'financement',
    label: 'Financement',
    href: LINKS.financement,
    isActive: financementNavActive,
    children: FINANCEMENT_CHILDREN,
    footer: { href: LINKS.financement, label: 'Financement des formations' },
  },
  {
    id: 'ressources',
    label: 'Ressources',
    href: LINKS.ressources,
    isActive: ressourcesNavActive,
    children: [
      {
        href: LINKS.ressourcesTutos,
        label: 'Tutos',
        title: 'Tutos PDF Claude & IA pour le BTP',
      },
      {
        href: `${LINKS.ressources}#guides-pdf`,
        label: 'Guides',
        title: 'Guides PDF gratuits par métier — conducteur, dirigeant, AO…',
      },
      {
        href: LINKS.blog,
        label: 'Blog',
        title: 'Articles IA BTP — devis, chantier, appels d’offres',
      },
    ],
    footer: { href: LINKS.ressources, label: 'Toutes les ressources' },
  },
  {
    id: 'partenaires',
    label: 'Partenaires',
    href: LINKS.partenaires,
    dropdownAlign: 'end',
    isActive: partenairesNavActive,
    children: PARTENAIRES_SECTION_CHILDREN,
    footer: { href: LINKS.partenaires, label: 'Tous les partenaires' },
  },
  {
    id: 'a-propos',
    label: 'À propos',
    href: LINKS.aPropos,
    dropdownAlign: 'end',
    isActive: aProposNavActive,
    children: [
      { href: `${LINKS.aPropos}#expertise`, label: 'Laure Olivié' },
      { href: LINKS.formateurIaBtp, label: 'Formatrice IA BTP' },
      { href: LINKS.qualiopi, label: 'Qualiopi' },
      { href: LINKS.accessibiliteHandicap, label: 'Référente handicap' },
      { href: LINKS.indicateursResultats, label: 'Indicateurs de résultats' },
      { href: LINKS.avisClients, label: 'Avis clients' },
    ],
    footer: { href: LINKS.aPropos, label: "L'organisme de formation" },
  },
  {
    id: 'contact',
    label: 'Contact',
    href: LINKS.contact,
    isActive: (pathname) => pathname === LINKS.contact,
  },
];

/** Navigation header — filtre les parcours non publiés (date de lancement). */
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

function collectHeaderNavLinkHrefs(links: readonly HeaderNavLink[], hrefs: string[]): void {
  for (const link of links) {
    hrefs.push(link.href);
    if (link.children?.length) collectHeaderNavLinkHrefs(link.children, hrefs);
  }
}

/** Tous les hrefs du header (pour audit de routes). */
export function collectHeaderNavHrefs(): string[] {
  const hrefs: string[] = [];
  for (const item of HEADER_NAV) {
    hrefs.push(item.href);
    if (item.children?.length) collectHeaderNavLinkHrefs(item.children, hrefs);
    if (item.footer) hrefs.push(item.footer.href);
  }
  return hrefs;
}
