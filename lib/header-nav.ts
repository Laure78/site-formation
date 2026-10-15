/**
 * Navigation du header — source unique des rubriques et sous-menus.
 * Tous les `href` pointent vers `LINKS` ou des ancres de pages existantes.
 * Aucune nouvelle page créée pour la refonte du menu.
 */
import { catalogueFormationNavContainsPath } from '@/lib/catalogue-formations-nav';
import { LINKS } from '@/lib/internal-links';

export type HeaderNavLink = {
  href: string;
  label: string;
  /** Attribut HTML `title` (tooltip), optionnel. */
  title?: string;
  /** Description d’une ligne (méga-menu / parcours). */
  description?: string;
  /** Badge à droite (ex. « 4 h » — réservé niveau 1). */
  badge?: string;
  /** Sous-liens indentés. */
  children?: readonly HeaderNavLink[];
};

export type HeaderMegaColumn = {
  title: string;
  links: readonly HeaderNavLink[];
};

export type HeaderNavItem = {
  id: string;
  label: string;
  href: string;
  /** Sous-pages du menu déroulant (absentes = lien simple). */
  children?: readonly HeaderNavLink[];
  /** Méga-menu multi-colonnes (ex. Toutes les formations). */
  megaColumns?: readonly HeaderMegaColumn[];
  /** Accès rapides du méga-menu. */
  megaQuickLinks?: readonly HeaderNavLink[];
  /** Note de pied du méga-menu. */
  megaFooterNote?: string;
  /** Lien de pied de dropdown (souvent le hub de la rubrique). */
  footer?: HeaderNavLink;
  /** Mise en évidence type catalogue (fond primaire + chevron). */
  variant?: 'default' | 'catalogue';
  /** Aligne le panneau à droite pour éviter le débordement. */
  dropdownAlign?: 'start' | 'end';
  isActive?: (pathname: string) => boolean;
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
  if (pathname === LINKS.formationDeveloppementWebIaSansCoder) {
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
    pathname === LINKS.skillsClaudeBtp ||
    pathname === LINKS.skillsChatgptBtp ||
    pathname === LINKS.outilsIaBtp ||
    pathname.startsWith(`${LINKS.outilsIaBtp}/`) ||
    pathname === LINKS.casUsageIaMetierBtp ||
    pathname === LINKS.diagnostic ||
    pathname === LINKS.checklist
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

function partenairesNavActive(pathname: string): boolean {
  return (
    pathname === LINKS.partenaires ||
    pathname.startsWith(`${LINKS.partenaires}/`) ||
    pathname === LINKS.etudesCas ||
    pathname.startsWith(`${LINKS.etudesCas}/`) ||
    pathname === LINKS.formationsLinkedInLearning
  );
}

function financementNavActive(pathname: string): boolean {
  return pathname === LINKS.financement || pathname.startsWith('/financement-constructys');
}

/** Colonnes méga-menu — destinations publiées uniquement. */
const FORMATIONS_MEGA_COLUMNS: readonly HeaderMegaColumn[] = [
  {
    title: 'Découvrir et maîtriser l’IA',
    links: [
      {
        href: LINKS.formationIaBtpNiveau1BatimentTp,
        label: 'Les bases de l’IA pour le BTP',
        description: 'Fondamentaux sur vos documents métier',
        badge: '4 h',
        title: 'Formation IA BTP niveau 1 — devis, emails et productivité',
      },
      {
        href: LINKS.formationMaitriserClaudeAiBtp,
        label: 'Maîtriser Claude pour le BTP',
        description: 'Projects, Cowork et Skills',
        title: 'Maîtriser Claude pour le BTP : Projects, Cowork et Skills',
      },
      {
        href: `${LINKS.formations}#skills-metiers-btp`,
        label: 'Créer des assistants IA et des Skills',
        description: 'Bibliothèque et exemples métiers BTP',
        title: 'Créer des Skills métiers BTP — section catalogue',
      },
    ],
  },
  {
    title: 'Études et chantier',
    links: [
      {
        href: LINKS.formationAO,
        label: 'IA et appels d’offres',
        description: 'DCE, checklist et mémoire technique',
        title: 'Formation IA appels d’offres BTP',
      },
      {
        href: LINKS.formationIaEtudesPrixChiffrageBtp,
        label: 'Devis et chiffrage',
        description: 'Études de prix assistées par l’IA',
        title: 'Formation IA études de prix et chiffrage BTP',
      },
      {
        href: LINKS.formationConduiteTravauxSuiviChantier,
        label: 'IA et conduite de travaux',
        description: 'CR, DOE et suivi chantier',
        title: 'Formation IA conducteur de travaux',
      },
      {
        href: LINKS.formationIaMaitriseOeuvre,
        label: 'IA et maîtrise d’œuvre',
        description: 'CR, OS et réception chantier',
        title: 'Formation IA maîtrise d’œuvre',
      },
    ],
  },
  {
    title: 'Créer ses outils',
    links: [
      {
        href: LINKS.formationDeveloppementWebIaSansCoder,
        label: 'Créer des applications métier BTP',
        description: 'Développer un outil de gestion sur mesure',
        title: 'Créer des applications métier BTP avec l’IA',
      },
      {
        href: `${LINKS.formations}#catalogue-niveau-3`,
        label: 'Découvrir le parcours applications métier',
        description: 'Niveau 3 — création et déploiement',
        title: 'Parcours applications métier — catalogue niveau 3',
      },
    ],
  },
];

/**
 * Accès rapides — « Débuter » pointe l’ancre niveau 1 (pas la fiche NIV-01,
 * déjà dans la colonne). « Former mon équipe » = /prendre-rdv : même destination
 * que « En entreprise » dans la barre ; conservé ici comme CTA contextuel du panneau
 * (un seul sous-menu ouvert à la fois).
 */
const FORMATIONS_MEGA_QUICK_LINKS: readonly HeaderNavLink[] = [
  {
    href: LINKS.formations,
    label: 'Voir tout le catalogue',
    title: 'Catalogue des formations IA pour le BTP',
  },
  {
    href: `${LINKS.formations}#catalogue-niveau-1`,
    label: 'Débuter avec l’IA',
    title: 'Parcours niveau 1 — débuter avec l’IA pour le BTP',
  },
  {
    href: `${LINKS.formations}#catalogue-niveaux`,
    label: 'Choisir mon parcours',
    title: 'Parcours par niveau — catalogue formations',
  },
  {
    href: LINKS.prendreRdv,
    label: 'Former mon équipe',
    title: 'Échanger sur un projet de formation en entreprise',
  },
];

/**
 * Menu principal — Accueil retiré (logo).
 * Ordre type Lefebvre : catalogue mis en avant, puis Intra, Financement,
 * Ressources, À propos, Partenaires, Contact.
 */
const BASE_HEADER_NAV: readonly HeaderNavItem[] = [
  {
    id: 'formations',
    label: 'Toutes les formations',
    href: LINKS.formations,
    variant: 'catalogue',
    isActive: formationsNavActive,
    megaColumns: FORMATIONS_MEGA_COLUMNS,
    megaQuickLinks: FORMATIONS_MEGA_QUICK_LINKS,
    megaFooterNote: 'Formations en présentiel en Île-de-France.',
  },
  {
    id: 'entreprise',
    label: 'Intra / Sur-mesure',
    href: LINKS.prendreRdv,
    isActive: (pathname) => pathname === LINKS.prendreRdv,
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
    children: [
      {
        href: LINKS.ressources,
        label: 'Voir toutes les ressources',
        title: 'Hub ressources IA pour le BTP',
      },
      {
        href: `${LINKS.ressources}#guides-pdf`,
        label: 'Guides pratiques IA BTP',
        title: 'Guides PDF gratuits par métier',
      },
      {
        href: LINKS.ressourcesTutos,
        label: 'Tutoriels Claude et ChatGPT',
        title: 'Tutos PDF Claude & IA pour le BTP',
      },
      {
        href: LINKS.skillsClaudeBtp,
        label: 'Skills métiers BTP',
        description: 'Pack Claude — modèles ChatGPT disponibles',
        title: 'Skills Claude gratuits pour le BTP',
      },
      {
        href: LINKS.blog,
        label: 'Articles et cas pratiques',
        title: 'Articles IA BTP — devis, chantier, appels d’offres',
      },
    ],
  },
  {
    id: 'a-propos',
    label: 'À propos',
    href: LINKS.aPropos,
    dropdownAlign: 'end',
    isActive: aProposNavActive,
    children: [
      {
        href: LINKS.aPropos,
        label: 'Présentation de Laure Olivié',
        title: 'À propos — formatrice IA pour le BTP',
      },
      {
        href: LINKS.avisClients,
        label: 'Avis clients',
        title: 'Avis et témoignages formations IA BTP',
      },
    ],
  },
  {
    id: 'partenaires',
    label: 'Partenaires',
    href: LINKS.partenaires,
    isActive: partenairesNavActive,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: LINKS.contact,
    isActive: (pathname) => pathname === LINKS.contact,
  },
];

/**
 * Navigation header principale.
 * `@param at` conservé pour compatibilité d’appel (visibilité catalogue).
 */
export function getHeaderNav(at: Date = new Date()): readonly HeaderNavItem[] {
  void at;
  return BASE_HEADER_NAV;
}

/** Navigation header — snapshot au chargement du module. */
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

/** Tous les hrefs du header (pour audit de routes). */
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
