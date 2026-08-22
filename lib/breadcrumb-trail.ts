/**
 * Fil d'Ariane unifié — chemins relatifs + libellés (layout global, compatible client).
 */
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { FORMATION_CITIES } from '@/lib/formation-cities';
import { autoBreadcrumbFromPathname } from '@/lib/auto-breadcrumb';
import { formationsData } from '@/src/data/formations';
import { TUTOS } from '@/lib/tutos';
import { DEPARTEMENT_PAGES } from '@/lib/departement-pages';
import { getFormationIaEntry } from '@/lib/seo-formation-ia-hub-data';

export type BreadcrumbHrefCrumb = { label: string; href: string };

const EXACT: Record<string, string> = {
  '/formations/ia-batiment-travaux-publics':
    "L'IA au service des pros du bâtiment et des travaux publics",
  '/formations/ia-appels-offre-btp': "L'IA appliquée aux appels d'offres BTP",
  '/formations/ia-conduite-travaux-suivi-chantier': "L'IA appliquée à la conduite de travaux",
};

const FORMATION_PATH_EXTRA_TITLES: Record<string, string> = {
  '/formations/ia-btp-morangis': 'Formation IA pour le BTP à Morangis',
  '/formations/ia-btp-longjumeau': 'Formation IA pour les pros du BTP à Longjumeau',
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
  '/ressources/guide-maitrise-oeuvre-ia': "Guide Maître d'Œuvre × IA",
  '/ressources/guide-assistants-travaux-ofc': 'Guide des Assistants Travaux — 12 missions IA',
  '/ressources/bibliotheque-prompts-btp-par-metier': 'Bibliothèque prompts IA BTP par métier',
  '/ressources/guide-claude-btp-ofc': 'Guide Claude BTP — Projets, Skills, MCP',
  '/ressources/guide-dirigeant-btp-ofc': 'Guide du dirigeant BTP — 6 leviers IA',
  '/ressources/guide-chef-de-chantier-ofc': 'Guide du chef de chantier — 6 skills Claude',
  '/ressources/guide-rh-btp-ia-ofc': 'Guide RH du BTP × IA — 18 cas d’usage',
  '/ressources/guide-charge-affaires-ofc': 'Guide chargé d’affaires BTP × IA — 12 cas Claude',
  '/ressources/guide-repondre-ao-btp-ofc-2026':
    'Répondre AO BTP — méthode en 5 étapes (éd. 2026)',
  ...Object.fromEntries(TUTOS.map((t) => [`/ressources/${t.slug}`, t.shortTitle])),
};

const GEO_BTP_REGIONAL_TITLES: Record<string, string> = {
  '/formation-ia-btp-ile-de-france': 'Formation IA BTP Île-de-France',
};

/** Pages hors catalogues / géo / métier — libellés pour le fil global. */
const STATIC_PAGE_TITLES: Record<string, string> = {
  '/formation-ia-btp-paris': 'Formation IA BTP Paris',
  '/formation-ia-paris': 'Formation IA à Paris',
  '/formateur-ia-btp': 'Formateur IA BTP',
  '/partenaires': 'Partenaires',
  '/claude-ai-btp': 'Claude AI BTP',
  '/formations-linkedin-learning': 'Formations LinkedIn Learning',
  '/checklist-ia-btp': 'Checklist IA BTP',
  '/outils-ia-btp': 'Outils IA BTP',
  '/outils/cas-usage-ia-btp': "Cas d'usage IA par métier",
  '/outils/verification-dtu-bework': 'Prototype DTU BeWork',
  '/ia-analyse-dce-btp': "Analyse DCE avec l'IA",
  '/ia-memoire-technique-btp': "Mémoire technique avec l'IA",
  '/ia-compte-rendu-chantier': 'Compte rendu de chantier avec l\'IA',
  '/diagnostic-ia-btp': 'Diagnostic IA BTP',
  '/prendre-rendez-vous': 'Prendre RDV',
  '/contact': 'Contact',
  '/a-propos': 'À propos',
  '/financement-constructys-formation-ia-btp': 'Financement Constructys',
  '/qualiopi': 'Certification Qualiopi',
  '/mentions-legales': 'Mentions légales',
  '/politique-confidentialite': 'Confidentialité',
  '/reglement-interieur': 'Règlement intérieur',
  '/livret-accueil-stagiaire': "Livret d'accueil du stagiaire",
  '/informations-reglementaires': 'Informations réglementaires',
  '/cgv': 'CGV',
  '/reclamations': 'Réclamations',
  '/accessibilite-handicap': 'Accessibilité & handicap',
  '/annuaire-handicap': 'Annuaire handicap',
  '/indicateurs-resultats': 'Indicateurs de résultats',
};

function buildGeoBtpDeptLabels(): Record<string, string> {
  const labels: Record<string, string> = {};
  for (const d of DEPARTEMENT_PAGES) {
    labels[d.path] = `${d.nom} (${d.code})`;
  }
  return labels;
}

const GEO_BTP_DEPT_LABELS = buildGeoBtpDeptLabels();

const METIER_TITLES: Record<string, string> = {
  '/formation-ia-electricien-btp': 'Formation IA Électricien BTP',
  '/formation-ia-conducteur-de-travaux-btp': 'Formation IA Conducteur de travaux',
  '/formation-ia-metreur-economiste-construction': 'Formation IA métreur & économiste',
  '/formation-ia-macon-btp': 'Formation IA Maçon & Maçonnerie',
  '/formation-ia-gros-oeuvre-btp': 'Formation IA Gros œuvre BTP',
  '/formation-ia-plombier-btp': 'Formation IA Plombier BTP',
  '/formation-ia-charpentier-btp': 'Formation IA Charpentier BTP',
  '/formation-ia-charpentier-menuisier-btp': 'Formation IA Charpentier & Menuisier bois',
  '/formation-ia-couvreur-btp': 'Formation IA couvreur-zingueur',
  '/formation-ia-peintre-btp': 'Formation IA Peintre BTP',
  '/formation-ia-menuisier-btp': 'Formation IA Menuisier BTP',
  '/formation-ia-plaquiste-btp': 'Formation IA Plaquiste BTP',
  '/formation-ia-carreleur-btp': 'Formation IA Carreleur BTP',
  '/formation-ia-vitrier-btp': 'Formation IA Vitrier BTP',
  '/formation-ia-dirigeant-btp': 'Formation IA Dirigeant BTP',
  '/formation-ia-artisans-btp': 'Formation IA TPE & PME BTP',
  '/formation-ia-charge-affaires-btp': 'Formation IA chargé d\'affaires',
  '/formation-ia-assistante-gestion-btp': 'Formation IA assistante de gestion BTP',
  '/formation-ia-assistante-travaux': 'Formation IA assistante travaux',
  '/formation-ia-responsable-administratif-btp': 'Formation IA responsable administratif BTP',
  '/formation-ia-travaux-publics': 'Formation IA travaux publics',
  '/formation-ia-etancheur': 'Formation IA pour Étancheur',
  '/formation-ia-marche-public-travaux': 'Formation IA marché public de travaux',
  '/formation-ia-marche-public-etancheite': 'Formation IA marché public étanchéité',
};

function humanizeSegment(seg: string): string {
  const SMALL = new Set(['de', 'du', 'des', 'la', 'le', 'les', 'et', 'ou', 'à', 'en', 'un', 'une', 'd', 'l']);
  const words = seg.split('-').filter(Boolean);
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (i > 0 && SMALL.has(lower)) return lower;
      if (lower === 'ia' || lower === 'btp' || lower === 'tp' || lower === 'ao' || lower === 'dce' || lower === 'cctp') {
        return lower.toUpperCase();
      }
      if (lower === 'idf') return 'IDF';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
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

function formationIaHubTrail(pathNorm: string): BreadcrumbHrefCrumb[] | null {
  if (pathNorm === '/formation-ia') {
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Formation IA appliquée au bâtiment (hub)', href: pathNorm },
    ];
  }

  const hubMatch = pathNorm.match(/^\/formation-ia\/([^/]+)$/);
  if (!hubMatch) return null;

  const entry = getFormationIaEntry(hubMatch[1]);
  if (!entry) return null;

  const leafLabel =
    entry.kind === 'metier' && entry.metier
      ? entry.metier.label
      : entry.kind === 'ville' && entry.ville
        ? entry.ville.label
        : humanizeSegment(hubMatch[1]);

  return [
    { label: 'Accueil', href: '/' },
    { label: 'Formation IA pour le BTP (hub)', href: '/formation-ia' },
    { label: leafLabel, href: pathNorm },
  ];
}

function geoBtpRegionalTrail(pathNorm: string): BreadcrumbHrefCrumb[] | null {
  const title = GEO_BTP_REGIONAL_TITLES[pathNorm];
  if (!title) return null;

  return [
    { label: 'Accueil', href: '/' },
    { label: title, href: pathNorm },
  ];
}

function geoBtpDeptTrail(pathNorm: string): BreadcrumbHrefCrumb[] | null {
  const deptLabel = GEO_BTP_DEPT_LABELS[pathNorm];
  if (!deptLabel) return null;

  // Paris : libellé plus explicite que « Paris (75) »
  const leaf =
    pathNorm === '/formation-ia-btp-paris'
      ? 'Formation IA BTP Paris'
      : deptLabel;

  return [
    { label: 'Accueil', href: '/' },
    { label: 'Formations', href: '/formations' },
    { label: leaf, href: pathNorm },
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

  const geoRegional = geoBtpRegionalTrail(pathNorm);
  if (geoRegional) return geoRegional;

  const geoDept = geoBtpDeptTrail(pathNorm);
  if (geoDept) return geoDept;

  const formationIaHub = formationIaHubTrail(pathNorm);
  if (formationIaHub) return formationIaHub;

  if (isFormationMetierLanding(pathNorm)) {
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Formations', href: '/formations' },
      { label: formationMetierTitle(pathNorm), href: pathNorm },
    ];
  }

  if (STATIC_PAGE_TITLES[pathNorm]) {
    // Pages outils imbriquées : Accueil › Outils IA BTP › …
    if (pathNorm.startsWith('/outils/') && pathNorm !== '/outils-ia-btp') {
      return [
        { label: 'Accueil', href: '/' },
        { label: 'Outils IA BTP', href: '/outils-ia-btp' },
        { label: STATIC_PAGE_TITLES[pathNorm], href: pathNorm },
      ];
    }
    return [
      { label: 'Accueil', href: '/' },
      { label: STATIC_PAGE_TITLES[pathNorm], href: pathNorm },
    ];
  }

  return fromAuto(pathNorm);
}
