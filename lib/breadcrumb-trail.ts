/**
 * Fil d'Ariane unifié — chemins relatifs + libellés (layout global, compatible client).
 */
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { FORMATION_CITIES } from '@/lib/formation-cities';
import { autoBreadcrumbFromPathname } from '@/lib/auto-breadcrumb';
import { formationsData } from '@/src/data/formations';
import { TUTOS } from '@/lib/tutos';

export type BreadcrumbHrefCrumb = { label: string; href: string };

const EXACT: Record<string, string> = {
  '/formations/ia-batiment-travaux-publics':
    "L'IA au service des pros du bâtiment et des travaux publics",
  '/formations/ia-appels-offre-btp': "L'IA appliquée aux appels d'offres BTP",
  '/formations/ia-conduite-travaux-suivi-chantier': "L'IA appliquée à la conduite de travaux",
};

const FORMATION_PATH_EXTRA_TITLES: Record<string, string> = {
  '/formations/ia-btp-paris': 'Formation IA appliquée au bâtiment Paris',
  '/formations/formation-ia-cctp-analyse-dce-btp': 'Formation IA CCTP & DCE',
  '/formations/ia-btp-morangis': 'Formation IA pour le BTP à Morangis',
  '/formations/ia-btp-longjumeau': 'Formation IA pour les pro du BTP à Longjumeau',
  '/formations/ia-btp-saint-quentin-en-yvelines':
    'Formation IA appliquée au bâtiment Saint-Quentin-en-Yvelines',
  '/formations/ia-pme-btp': 'IA pour PME du BTP',
};

const ETUDES_TITLES: Record<string, string> = {
  '/etudes-de-cas/ffb-csfe': 'Étude de cas FFB & CSFE — Étanchéité',
};

const RESSOURCES_TITLES: Record<string, string> = {
  '/ressources': 'Ressources',
  '/ressources/tutos': 'Tutos PDF IA BTP',
  '/ressources/ia-btp': 'Hub ressources IA BTP',
  '/ressources/ia-btp/10-cas-usage-concrets': 'IA dans le BTP : 10 cas d’usage concrets (2026)',
  '/ressources/guide-conducteur-de-travaux': 'Guide conducteur de travaux — 6 tutos Claude BTP',
  '/ressources/guide-conducteur-de-travaux/merci': 'Confirmation — guide envoyé',
  ...Object.fromEntries(TUTOS.map((t) => [`/ressources/${t.slug}`, t.shortTitle])),
};

const METIER_TITLES: Record<string, string> = {
  '/formation-ia-electricien-btp': 'Formation IA Électricien BTP',
  '/formation-ia-conducteur-de-travaux-btp': 'Formation IA Conducteur de travaux',
  '/formation-ia-macon-btp': 'Formation IA Maçon BTP',
  '/formation-ia-plombier-btp': 'Formation IA Plombier BTP',
  '/formation-ia-charpentier-btp': 'Formation IA Charpentier BTP',
  '/formation-ia-couvreur-btp': 'Formation IA Couvreur BTP',
  '/formation-ia-peintre-btp': 'Formation IA Peintre BTP',
  '/formation-ia-menuisier-btp': 'Formation IA Menuisier BTP',
  '/formation-ia-plaquiste-btp': 'Formation IA Plaquiste BTP',
  '/formation-ia-carreleur-btp': 'Formation IA Carreleur BTP',
  '/formation-ia-vitrier-btp': 'Formation IA Vitrier BTP',
  '/formation-ia-dirigeant-btp': 'Formation IA Dirigeant BTP',
  '/formation-ia-artisans-btp': 'Formation IA Artisans BTP',
  '/formation-ia-charge-affaires-btp': 'Formation IA Chargé d\'affaires BTP',
  '/formation-ia-btp': 'Formation IA BTP',
};

function humanizeSegment(seg: string): string {
  return seg
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formationMetierTitle(pathNorm: string): string {
  if (METIER_TITLES[pathNorm]) return METIER_TITLES[pathNorm];
  const slug = pathNorm.replace(/^\/formation-ia-/, '');
  if (slug.endsWith('-btp')) {
    const metier = humanizeSegment(slug.replace(/-btp$/, ''));
    return `Formation IA ${metier} BTP`;
  }
  if (slug.endsWith('-tp')) {
    const metier = humanizeSegment(slug.replace(/-tp$/, ''));
    return `Formation IA ${metier} TP`;
  }
  return `Formation IA ${humanizeSegment(slug)}`;
}

function isFormationMetierLanding(pathNorm: string): boolean {
  if (!pathNorm.startsWith('/formation-ia-')) return false;
  if (pathNorm.startsWith('/formation-ia-btp')) return false;
  if (pathNorm.startsWith('/formation-ia/')) return false;
  return true;
}

function fromAuto(pathname: string): BreadcrumbHrefCrumb[] {
  return autoBreadcrumbFromPathname(pathname).map(({ name, path }) => ({
    label: name,
    href: path,
  }));
}

function formationLeafTitle(pathNorm: string): string {
  if (FORMATION_PATH_EXTRA_TITLES[pathNorm]) return FORMATION_PATH_EXTRA_TITLES[pathNorm];
  const fromCatalog = FORMATIONS_CATALOG_SCHEMA.find((e) => e.path === pathNorm);
  if (fromCatalog) return fromCatalog.name;
  const slug = pathNorm.replace(/^\/formations\//, '');
  const fromData = formationsData[slug as keyof typeof formationsData];
  if (fromData) return fromData.name;
  for (const city of Object.values(FORMATION_CITIES)) {
    if (city.path === pathNorm) {
      return `Formation IA pour le BTP à ${city.ville}`;
    }
  }
  return humanizeSegment(slug);
}

function blogTrail(pathNorm: string): BreadcrumbHrefCrumb[] {
  if (pathNorm === '/blog') {
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Blog', href: '/blog' },
    ];
  }
  const articleMatch = pathNorm.match(/^\/blog\/([^/]+)$/);
  if (articleMatch && !['page', 'categorie'].includes(articleMatch[1])) {
    const slug = articleMatch[1];
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: humanizeSegment(slug), href: pathNorm },
    ];
  }
  return fromAuto(pathNorm);
}

function formationsTrail(pathNorm: string): BreadcrumbHrefCrumb[] {
  if (pathNorm === '/formations') {
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Formations', href: '/formations' },
    ];
  }
  const title =
    EXACT[pathNorm] ??
    FORMATIONS_CATALOG_SCHEMA.find((e) => e.path === pathNorm)?.name ??
    formationLeafTitle(pathNorm);

  return [
    { label: 'Accueil', href: '/' },
    { label: 'Formations', href: '/formations' },
    { label: title, href: pathNorm },
  ];
}

function etudesTrail(pathNorm: string): BreadcrumbHrefCrumb[] {
  const title = ETUDES_TITLES[pathNorm] ?? humanizeSegment(pathNorm.split('/').pop() ?? '');
  return [
    { label: 'Accueil', href: '/' },
    { label: title, href: pathNorm },
  ];
}

function ressourcesTrail(pathNorm: string): BreadcrumbHrefCrumb[] {
  const hub = { label: 'Ressources', href: '/ressources' };
  if (pathNorm === '/ressources') {
    return [{ label: 'Accueil', href: '/' }, hub];
  }
  if (pathNorm === '/ressources/guide-conducteur-de-travaux/merci') {
    return [
      { label: 'Accueil', href: '/' },
      hub,
      {
        label: RESSOURCES_TITLES['/ressources/guide-conducteur-de-travaux'],
        href: '/ressources/guide-conducteur-de-travaux',
      },
      { label: RESSOURCES_TITLES[pathNorm], href: pathNorm },
    ];
  }
  if (pathNorm === '/ressources/ia-btp/10-cas-usage-concrets') {
    return [
      { label: 'Accueil', href: '/' },
      hub,
      { label: RESSOURCES_TITLES['/ressources/ia-btp'], href: '/ressources/ia-btp' },
      { label: RESSOURCES_TITLES[pathNorm], href: pathNorm },
    ];
  }
  const title =
    RESSOURCES_TITLES[pathNorm] ??
    humanizeSegment(pathNorm.replace(/^\/ressources\//, '').replace(/\//g, ' '));
  return [{ label: 'Accueil', href: '/' }, hub, { label: title, href: pathNorm }];
}

/**
 * Construit le fil d'Ariane pour une URL interne (sans trailing slash).
 * Retourne [] sur l'accueil ou les zones admin.
 */
export function buildBreadcrumbTrail(pathname: string): BreadcrumbHrefCrumb[] {
  const pathNorm = (pathname || '/').replace(/\/$/, '') || '/';
  if (pathNorm === '/') return [];
  if (pathNorm.startsWith('/admin')) return [];

  if (pathNorm.startsWith('/formations')) {
    return formationsTrail(pathNorm);
  }

  if (pathNorm.startsWith('/blog')) {
    return blogTrail(pathNorm);
  }

  if (pathNorm.startsWith('/etudes-de-cas')) {
    return etudesTrail(pathNorm);
  }

  if (pathNorm.startsWith('/ressources')) {
    return ressourcesTrail(pathNorm);
  }

  if (isFormationMetierLanding(pathNorm) || pathNorm === '/formation-ia-btp') {
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Formations', href: '/formations' },
      { label: formationMetierTitle(pathNorm), href: pathNorm },
    ];
  }

  return fromAuto(pathNorm);
}
