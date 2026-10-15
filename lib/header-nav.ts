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

/**
 * Colonnes méga-menu — catalogue 2027.
 * Une URL unique par entrée (pas de doublon dans le panneau).
 * Fiches IA existantes conservées pour le SEO.
 */
const FORMATIONS_MEGA_COLUMNS: readonly HeaderMegaColumn[] = [
  {
    title: 'Parcours métiers',
    links: [
      {
        href: LINKS.parcoursDirigeantPmeBtp,
        label: 'Dirigeant de PME BTP',
        description: 'Prix, marges, trésorerie et équipes',
        title: 'Parcours Dirigeant de PME BTP',
      },
      {
        href: LINKS.parcoursChargeAffairesBtp,
        label: 'Chargé d’affaires BTP',
        description: 'Chiffrage, AO et suivi d’affaire',
        title: 'Parcours Chargé d’affaires BTP',
      },
      {
        href: LINKS.parcoursConducteurDeTravaux,
        label: 'Conducteur de travaux',
        description: 'De la passation à la réception',
        title: 'Parcours Conducteur de travaux',
      },
      {
        href: LINKS.parcoursChefDeChantier,
        label: 'Chef de chantier',
        description: 'Terrain, équipe et information fiable',
        title: 'Parcours Chef de chantier',
      },
      {
        href: LINKS.parcoursChefDequipe,
        label: 'Chef d’équipe',
        description: 'Consignes, intégration et prévention',
        title: 'Parcours Chef d’équipe',
      },
      {
        href: LINKS.parcoursAssistantDeGestionBtp,
        label: 'Assistant de gestion BTP',
        description: 'Administratif, facturation et outils',
        title: 'Parcours Assistant de gestion BTP',
      },
      {
        href: LINKS.parcoursReferentIaBtp,
        label: 'Référent IA BTP',
        description: 'Usages IA, outil et déploiement',
        title: 'Parcours Référent IA BTP',
      },
    ],
  },
  {
    title: 'Formations IA disponibles',
    links: [
      {
        href: LINKS.formationIaBtpNiveau1BatimentTp,
        label: 'Les bases de l’IA',
        description: 'Documents BTP — devis, emails, CR',
        badge: '4 h',
        title: 'Les bases de l’IA pour les pros du BTP',
      },
      {
        href: LINKS.formationAO,
        label: 'IA et appels d’offres',
        description: 'DCE, checklist et mémoire technique',
        title: 'Formation IA appels d’offres BTP',
      },
      {
        href: LINKS.formationConduiteTravauxSuiviChantier,
        label: 'IA et conduite de travaux',
        description: 'Suivi documentaire de chantier',
        title: 'Formation IA conducteur de travaux',
      },
      {
        href: LINKS.formationMaitriserClaudeAiBtp,
        label: 'Maîtriser Claude AI',
        description: 'Projects, Cowork et Skills',
        title: 'Maîtriser Claude AI pour le BTP',
      },
      {
        href: LINKS.formationIaMaitriseOeuvre,
        label: 'IA et maîtrise d’œuvre',
        description: 'CR, OS et suivi des réserves',
        title: 'Formation IA maîtrise d’œuvre',
      },
      {
        href: LINKS.formationDeveloppementWebIaSansCoder,
        label: 'Créer des applications métier',
        description: 'Prototype testé — 7 h ou 14 h',
        title: 'Créer des applications métier BTP avec l’IA',
      },
    ],
  },
  {
    title: 'Aller plus loin',
    links: [
      {
        href: LINKS.formationsTrouverParcours,
        label: 'Trouver mon parcours',
        description: 'Sélection par métier sur le catalogue',
        title: 'Catalogue — trouver mon parcours métier',
      },
      {
        href: LINKS.formationsIaDisponibles,
        label: 'Voir les formations IA ouvertes',
        description: 'Six modules disponibles dès maintenant',
        title: 'Formations IA disponibles — catalogue',
      },
      {
        href: LINKS.formationsCatalogueModules,
        label: 'Catalogue par domaine',
        description: '35 modules — recherche et filtres',
        title: 'Catalogue des modules de formation',
      },
      {
        href: LINKS.formationIaEtudesPrixChiffrageBtp,
        label: 'Devis et chiffrage',
        description: 'Études de prix assistées par l’IA',
        title: 'Formation IA études de prix et chiffrage BTP',
      },
      {
        href: LINKS.skillsClaudeBtp,
        label: 'Skills Claude gratuits',
        description: 'Modèles métiers BTP à télécharger',
        title: 'Skills Claude gratuits pour le BTP',
      },
    ],
  },
];

/**
 * Accès rapides du méga-menu.
 * Pas de doublon avec les colonnes (URLs déjà listées ci-dessus exclues).
 */
const FORMATIONS_MEGA_QUICK_LINKS: readonly HeaderNavLink[] = [
  {
    href: LINKS.formations,
    label: 'Voir tout le catalogue',
    title: 'Catalogue des formations et parcours métiers BTP',
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
