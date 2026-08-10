/**
 * Priorités sitemap — source unique pour `app/sitemap.ts`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
import { LINKS } from '@/lib/internal-links';
import { GSC_EXCLUDED_SITEMAP_PATHS } from '@/lib/gsc-redirects-2026';

export const SITEMAP_PRIORITY = {
  /** Accueil + pages tier-1 (catalogue, financement, à propos, blog index, contact). */
  tier1Static: 1.0,
  formationCatalog: 0.95,
  /** Piliers géo / métier (ex. `/formation-ia-paris`). */
  metier: 0.9,
  /** Satellites géo départementales. */
  geoSatellite: 0.8,
  /** Articles de blog. */
  blogArticle: 0.6,
} as const;

/** Pages statiques principales — priorité 1.0 */
export const SITEMAP_TIER1_STATIC_PATHS = [
  LINKS.home,
  LINKS.formations,
  LINKS.financement,
  LINKS.aPropos,
  LINKS.blog,
  LINKS.contact,
] as const;

/** Fiches catalogue prioritaires — priorité 0.95 */
export const SITEMAP_FORMATION_CATALOG_PATHS = [
  LINKS.formationIaBtpNiveau1BatimentTp,
  LINKS.formationAO,
  LINKS.formationConduiteTravauxSuiviChantier,
  LINKS.formationMaitriserClaudeAiBtp,
  LINKS.formationIaMaitriseOeuvre,
  LINKS.formationClaudeIaBtpFiche,
] as const;

const TIER1_SET = new Set<string>(SITEMAP_TIER1_STATIC_PATHS);
const FORMATION_CATALOG_SET = new Set<string>(SITEMAP_FORMATION_CATALOG_PATHS);

export function normSitemapPath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path.replace(/\/$/, '') || '/' : `/${path}`.replace(/\/$/, '');
}

/** `/formation-ia-*` métier (hors landings géo `/formation-ia-btp-*` et chemins exclus GSC). */
export function isFormationMetierPath(path: string): boolean {
  const p = normSitemapPath(path);
  if (!p.startsWith('/formation-ia-')) return false;
  if (p.startsWith('/formation-ia-btp')) return false;
  if (GSC_EXCLUDED_SITEMAP_PATHS.has(p)) return false;
  return true;
}

/** Article de blog canonique `/blog/[slug]` (hors pagination et catégories). */
export function isBlogArticlePath(path: string): boolean {
  const p = normSitemapPath(path);
  if (!p.startsWith('/blog/')) return false;
  if (p.startsWith('/blog/categorie/')) return false;
  if (p.startsWith('/blog/page/')) return false;
  return p.split('/').length === 3;
}

export type SitemapPriorityRule = {
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

export function resolveSitemapPriority(path: string): SitemapPriorityRule | null {
  const p = normSitemapPath(path);

  if (TIER1_SET.has(p)) {
    return { priority: SITEMAP_PRIORITY.tier1Static, changeFrequency: 'weekly' };
  }

  if (FORMATION_CATALOG_SET.has(p)) {
    return { priority: SITEMAP_PRIORITY.formationCatalog, changeFrequency: 'monthly' };
  }

  if (isFormationMetierPath(p)) {
    return { priority: SITEMAP_PRIORITY.metier, changeFrequency: 'monthly' };
  }

  if (isBlogArticlePath(p)) {
    return { priority: SITEMAP_PRIORITY.blogArticle, changeFrequency: 'weekly' };
  }

  if (p.includes('financement-constructys')) {
    return { priority: SITEMAP_PRIORITY.tier1Static, changeFrequency: 'monthly' };
  }

  return null;
}
