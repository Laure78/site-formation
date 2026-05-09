/**
 * Fils d’Ariane par section (chemins + libellés) — utilisé par les layouts + JSON-LD (serveur uniquement).
 */
import { getArticle } from '@/lib/blog';
import { FORMATION_CITIES } from '@/lib/formation-cities';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { SITE_CONFIG, type BreadcrumbListItem } from '@/lib/seo';
import { formationsData } from '@/src/data/formations';
import { TUTOS } from '@/lib/tutos';

export type SectionBreadcrumbZone = 'formations' | 'blog' | 'etudes-de-cas' | 'ressources';

const BASE = SITE_CONFIG.url.replace(/\/$/, '');

/** Libellés manuels pour URLs formation non présentes dans le catalogue typé. */
const FORMATION_PATH_EXTRA_TITLES: Record<string, string> = {
  '/formations/ia-btp-paris': 'Formation IA BTP Paris',
  '/formations/formation-ia-cctp-analyse-dce-btp': 'Formation IA CCTP & DCE',
  '/formations/ia-btp-morangis': 'Formation IA BTP à Morangis',
  '/formations/ia-btp-longjumeau': 'Formation IA BTP à Longjumeau',
  '/formations/ia-btp-saint-quentin-en-yvelines': 'Formation IA BTP Saint-Quentin-en-Yvelines',
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
  '/ressources/guide-conducteur-de-travaux': 'Pack conducteur de travaux — 6 tutos Claude BTP',
  '/ressources/guide-conducteur-de-travaux/merci': 'Confirmation — guide envoyé',
  ...Object.fromEntries(TUTOS.map((t) => [`/ressources/${t.slug}`, t.shortTitle])),
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
      const hub: BreadcrumbListItem = { name: 'Ressources', url: `${BASE}/ressources` };
      if (pathNorm === '/ressources') {
        return [home(), hub];
      }
      if (pathNorm === '/ressources/guide-conducteur-de-travaux/merci') {
        const guide: BreadcrumbListItem = {
          name: RESSOURCES_TITLES['/ressources/guide-conducteur-de-travaux'],
          url: `${BASE}/ressources/guide-conducteur-de-travaux`,
        };
        return [
          home(),
          hub,
          guide,
          { name: RESSOURCES_TITLES[pathNorm], url: `${BASE}${pathNorm}` },
        ];
      }
      if (pathNorm === '/ressources/ia-btp/10-cas-usage-concrets') {
        const cluster: BreadcrumbListItem = {
          name: RESSOURCES_TITLES['/ressources/ia-btp'],
          url: `${BASE}/ressources/ia-btp`,
        };
        return [
          home(),
          hub,
          cluster,
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
