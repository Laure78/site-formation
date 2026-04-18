/**
 * Fils d’Ariane par section (chemins + libellés) — utilisé par les layouts + JSON-LD (serveur uniquement).
 */
import { getArticle } from '@/lib/blog';
import { FORMATION_CITIES } from '@/lib/formation-cities';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { SITE_CONFIG, type BreadcrumbListItem } from '@/lib/seo';
import { formationsData } from '@/src/data/formations';

export type SectionBreadcrumbZone = 'formations' | 'blog' | 'etudes-de-cas' | 'ressources';

const BASE = SITE_CONFIG.url.replace(/\/$/, '');

/** Libellés manuels pour URLs formation non présentes dans le catalogue typé. */
const FORMATION_PATH_EXTRA_TITLES: Record<string, string> = {
  '/formations/ia-btp-paris': 'Formation IA BTP Paris',
  '/formations/formation-ia-cctp-analyse-dce-btp': 'Formation IA CCTP & DCE',
  '/formations/ia-btp-bordeaux': 'Formation IA BTP à Bordeaux',
  '/formations/ia-btp-lyon': 'Formation IA BTP à Lyon',
  '/formations/ia-btp-lille': 'Formation IA BTP à Lille',
  '/formations/ia-btp-morangis': 'Formation IA BTP à Morangis',
  '/formations/ia-btp-longjumeau': 'Formation IA BTP à Longjumeau',
  '/formations/ia-btp-yvelines-78': 'Formation IA BTP Versailles & Yvelines (78)',
  '/formations/ia-btp-saint-quentin-en-yvelines': 'Formation IA BTP Saint-Quentin-en-Yvelines',
  '/formations/ia-pme-btp': 'IA pour PME du BTP',
};

const ETUDES_TITLES: Record<string, string> = {
  '/etudes-de-cas/ffb-csfe': 'Étude de cas FFB & CSFE — Étanchéité',
};

const RESSOURCES_TITLES: Record<string, string> = {
  '/ressources/ia-btp': 'Ressources IA BTP',
  '/ressources/ia-btp/10-cas-usage-concrets': 'IA dans le BTP : 10 cas d’usage concrets (2026)',
  '/ressources/skill-ia-conducteur-travaux': 'Guide : 1er Skill IA — conducteurs de travaux',
  '/ressources/skill-ia-conducteur-travaux/merci': 'Confirmation — guide envoyé',
};

function home(): BreadcrumbListItem {
  return { name: 'Accueil', url: BASE };
}

function titleFromSlugSegments(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
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
      return `Formation IA BTP à ${city.ville}`;
    }
  }

  return titleFromSlugSegments(slug);
}

function blogArticleTitle(slug: string): string {
  const a = getArticle(slug);
  return a?.title ?? titleFromSlugSegments(slug);
}

/**
 * Items `{ name, url }` avec URLs absolues pour JSON-LD BreadcrumbList.
 */
export function getSectionBreadcrumbItems(zone: SectionBreadcrumbZone, pathname: string): BreadcrumbListItem[] {
  const pathNorm = (pathname || '/').replace(/\/$/, '') || '/';

  switch (zone) {
    case 'formations': {
      const root: BreadcrumbListItem = { name: 'Formations', url: `${BASE}/formations` };
      if (pathNorm === '/formations') {
        return [home(), root];
      }
      return [home(), root, { name: formationLeafTitle(pathNorm), url: `${BASE}${pathNorm}` }];
    }
    case 'blog': {
      const root: BreadcrumbListItem = { name: 'Blog', url: `${BASE}/blog` };
      if (pathNorm === '/blog') {
        return [home(), root];
      }
      const m = pathNorm.match(/^\/blog\/([^/]+)$/);
      if (!m) {
        return [home(), root];
      }
      return [home(), root, { name: blogArticleTitle(m[1]), url: `${BASE}${pathNorm}` }];
    }
    case 'etudes-de-cas': {
      const title = ETUDES_TITLES[pathNorm] ?? titleFromSlugSegments(pathNorm.split('/').pop() ?? '');
      return [home(), { name: title, url: `${BASE}${pathNorm}` }];
    }
    case 'ressources': {
      const hub: BreadcrumbListItem = { name: 'Ressources IA BTP', url: `${BASE}/ressources/ia-btp` };
      if (pathNorm === '/ressources/ia-btp') {
        return [home(), hub];
      }
      if (pathNorm === '/ressources/skill-ia-conducteur-travaux/merci') {
        const guide: BreadcrumbListItem = {
          name: RESSOURCES_TITLES['/ressources/skill-ia-conducteur-travaux'],
          url: `${BASE}/ressources/skill-ia-conducteur-travaux`,
        };
        return [
          home(),
          hub,
          guide,
          { name: RESSOURCES_TITLES[pathNorm], url: `${BASE}${pathNorm}` },
        ];
      }
      const title =
        RESSOURCES_TITLES[pathNorm] ??
        titleFromSlugSegments(pathNorm.replace(/^\/ressources\//, '').replace(/\//g, ' '));
      return [home(), hub, { name: title, url: `${BASE}${pathNorm}` }];
    }
    default:
      return [];
  }
}
