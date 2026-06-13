/**
 * Fil d'Ariane unifié — chemins relatifs + libellés (layout global).
 */
import { getArticle } from '@/lib/blog';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { getSectionBreadcrumbItems } from '@/lib/section-breadcrumbs';
import { autoBreadcrumbFromPathname } from '@/lib/auto-breadcrumb';

export type BreadcrumbHrefCrumb = { label: string; href: string };

const EXACT: Record<string, string> = {
  '/formations/ia-batiment-travaux-publics':
    "L'IA au service des pros du bâtiment et des travaux publics",
  '/formations/ia-appels-offre-btp': "L'IA appliquée aux appels d'offres BTP",
  '/formations/ia-conduite-travaux-suivi-chantier': "L'IA appliquée à la conduite de travaux",
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

function fromSection(zone: 'formations' | 'blog' | 'etudes-de-cas' | 'ressources', pathname: string): BreadcrumbHrefCrumb[] {
  return getSectionBreadcrumbItems(zone, pathname).map(({ name, url }) => {
    try {
      const u = new URL(url);
      return { label: name, href: u.pathname || '/' };
    } catch {
      return { label: name, href: pathname };
    }
  });
}

function blogTrail(pathNorm: string): BreadcrumbHrefCrumb[] {
  const articleMatch = pathNorm.match(/^\/blog\/([^/]+)$/);
  if (articleMatch && !['page', 'categorie'].includes(articleMatch[1])) {
    const slug = articleMatch[1];
    const title = getArticle(slug)?.title ?? humanizeSegment(slug);
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: title, href: pathNorm },
    ];
  }
  const section = fromSection('blog', pathNorm);
  return section.length ? section : fromAuto(pathNorm);
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
    fromSection('formations', pathNorm).at(-1)?.label ??
    humanizeSegment(pathNorm.replace(/^\/formations\//, ''));

  return [
    { label: 'Accueil', href: '/' },
    { label: 'Formations', href: '/formations' },
    { label: title, href: pathNorm },
  ];
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
    const section = fromSection('etudes-de-cas', pathNorm);
    return section.length ? section : fromAuto(pathNorm);
  }

  if (pathNorm.startsWith('/ressources')) {
    const section = fromSection('ressources', pathNorm);
    return section.length ? section : fromAuto(pathNorm);
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
