/**
 * Filtres catalogue blog — listing, suggestions, RSS, recherche.
 * Exclut les doublons Media Machine (suffixe date-index) et les slugs redirigés (non-200).
 */

import { BLOG_CONSOLIDATION_REDIRECTED_SLUGS, BLOG_GEO_HORS_IDF_REDIRECTED_SLUGS } from '@/lib/gsc-redirects-2026';

/**
 * Anciennes fusions juin 2026.
 * Les slugs B2 (suffixes cron + sémantiques) sont dans BLOG_CONSOLIDATION_REDIRECTED_SLUGS
 * (lib/gsc-redirects-2026.ts) et fusionnés ci-dessous dans BLOG_LISTING_EXCLUDED_SLUGS.
 */
export const BLOG_CONSOLIDATED_REDIRECTED_SLUGS = new Set<string>([
  'ia-devis-gain-temps-pme-btp', // → ia-devis-batiment-chiffrage-automatise (aussi B2)
  'memoire-technique-btp-ia-gagner-temps-appels-offres', // → ia-memoire-technique-appel-offres-guide-2026
]);

/**
 * Motif Media Machine : suffixe `{offset calendaire 6 chiffres}-{index lot}`.
 * Ex. `appels-d-offres-btp-l-ia-comme-assistant-741614-8`
 */
export const BLOG_MEDIA_MACHINE_SUFFIX_PATTERN = /-\d{6}-\d$/;

const BLOG_LISTING_EXCLUDED_SLUGS = new Set<string>([
  ...BLOG_CONSOLIDATED_REDIRECTED_SLUGS,
  ...BLOG_CONSOLIDATION_REDIRECTED_SLUGS,
  ...BLOG_GEO_HORS_IDF_REDIRECTED_SLUGS,
]);

/** Slug exclu du listing (suffixe cron ou liste de consolidation / redirection). */
export function isBlogListingExcludedSlug(slug: string): boolean {
  return BLOG_MEDIA_MACHINE_SUFFIX_PATTERN.test(slug) || BLOG_LISTING_EXCLUDED_SLUGS.has(slug);
}

/**
 * Retourne le slug « propre » sans suffixe Media Machine, pour déduplication.
 * `foo-741614-8` → `foo` ; `foo` → `foo`.
 */
export function blogSlugWithoutMediaMachineSuffix(slug: string): string {
  return slug.replace(BLOG_MEDIA_MACHINE_SUFFIX_PATTERN, '');
}

/**
 * Filtre et déduplique le catalogue publiable :
 * 1. exclut suffixes `-\d{6}-\d` et slugs de la liste d'exclusion ;
 * 2. déduplique par slug canonique (suffixe retiré) — garde la première occurrence
 *    (priorité déjà assurée en amont : statique > généré > MDX).
 */
export function filterPublishableBlogArticles<T extends { slug: string; date: string }>(
  articles: T[]
): T[] {
  const byCanonical = new Map<string, T>();

  for (const article of articles) {
    if (isBlogListingExcludedSlug(article.slug)) continue;

    const canonical = blogSlugWithoutMediaMachineSuffix(article.slug);
    if (isBlogListingExcludedSlug(canonical)) continue;

    if (!byCanonical.has(canonical)) {
      byCanonical.set(canonical, article);
    }
  }

  return [...byCanonical.values()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
