/**
 * Navigation du header — source unique des rubriques et sous-menus.
 * Tous les `href` pointent vers `LINKS` ou des ancres de pages existantes.
 */
import { catalogueFormationNavContainsPath } from '@/lib/catalogue-formations-nav';
import { FORMATIONS, formationHref } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';

export type HeaderNavLink = {
  href: string;
  label: string;
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
};

function pathMatches(pathname: string, href: string): boolean {
  const path = href.split('#')[0] || '/';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function formationsNavActive(pathname: string): boolean {
  if (pathname === LINKS.formations || pathname.startsWith(`${LINKS.formations}/`)) {
    return true;
  }
  if (pathname === LINKS.formationIaHub || pathname.startsWith(`${LINKS.formationIaHub}/`)) {
    return true;
  }
  return catalogueFormationNavContainsPath(pathname);
}

function blogNavActive(pathname: string): boolean {
  return pathname === LINKS.blog || pathname.startsWith(`${LINKS.blog}/`);
}

function ressourcesNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.ressources ||
    pathname.startsWith(`${LINKS.ressources}/`) ||
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
    pathname === LINKS.formateurIaBtp ||
    pathname === LINKS.qualiopi ||
    pathname === LINKS.accessibiliteHandicap ||
    pathname === LINKS.indicateursResultats ||
    pathname === LINKS.contact
  );
}

function financementNavActive(pathname: string): boolean {
  return pathname === LINKS.financement || pathname.startsWith('/financement-constructys');
}

/** Ancres réelles de `app/financement-constructys-formation-ia-btp/page.tsx`. */
const FINANCEMENT_CHILDREN: readonly HeaderNavLink[] = [
  { href: `${LINKS.financement}#quest-ce-que-constructys`, label: 'Constructys' },
  { href: `${LINKS.financement}#trouver-opco`, label: 'Trouver son OPCO' },
  { href: `${LINKS.financement}#mon-cas`, label: 'Prise en charge' },
];

/** Ancres réelles de `app/partenaires/page.tsx` (ids des sections). */
const PARTENAIRES_SECTION_CHILDREN: readonly HeaderNavLink[] = [
  { href: `${LINKS.partenaires}#ffb-grand-paris`, label: 'FFB Grand Paris' },
  { href: `${LINKS.partenaires}#ffb-ile-de-france`, label: 'FFB Île-de-France' },
  { href: `${LINKS.partenaires}#csfe`, label: 'CSFE' },
  { href: `${LINKS.partenaires}#umb-ffb`, label: 'UMB-FFB' },
  { href: `${LINKS.partenaires}#cnam-entreprise`, label: 'CNAM Entreprise' },
  { href: `${LINKS.partenaires}#lefebvre-dalloz`, label: 'Lefebvre Dalloz' },
  { href: `${LINKS.partenaires}#ifrb-77`, label: 'IFRB 77' },
  { href: LINKS.etudesCas, label: 'Étude de cas FFB & CSFE' },
  { href: LINKS.formationsLinkedInLearning, label: 'Formations LinkedIn Learning' },
];

export const HEADER_NAV: readonly HeaderNavItem[] = [
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
      { href: `${LINKS.ressources}#guides-pdf`, label: 'Guides' },
      { href: LINKS.blog, label: 'Articles' },
      { href: LINKS.outilsIaBtp, label: 'Outils' },
      { href: LINKS.ressourcesIaBtp, label: 'Ressources BTP' },
      { href: LINKS.bibliothequeSkills, label: 'Téléchargements' },
      { href: LINKS.ressourcesTutos, label: 'Tutos' },
      { href: LINKS.claudeAiBtp, label: 'Claude AI BTP' },
      { href: LINKS.diagnostic, label: 'Diagnostic IA BTP' },
    ],
    footer: { href: LINKS.ressources, label: 'Toutes les ressources' },
  },
  {
    id: 'blog',
    label: 'Blog',
    href: LINKS.blog,
    isActive: blogNavActive,
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
      { href: LINKS.contact, label: 'Contact' },
    ],
    footer: { href: LINKS.aPropos, label: "L'organisme de formation" },
  },
];

export function headerNavItemIsActive(item: HeaderNavItem, pathname: string): boolean {
  if (item.isActive) return item.isActive(pathname);
  return pathMatches(pathname, item.href);
}

export function headerNavLinkIsActive(href: string, pathname: string): boolean {
  return pathMatches(pathname, href);
}

/** Tous les hrefs du header (pour audit de routes). */
export function collectHeaderNavHrefs(): string[] {
  const hrefs: string[] = [];
  for (const item of HEADER_NAV) {
    hrefs.push(item.href);
    for (const child of item.children ?? []) hrefs.push(child.href);
    if (item.footer) hrefs.push(item.footer.href);
  }
  return hrefs;
}
