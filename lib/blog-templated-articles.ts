/**
 * Articles gabarits Media Machine — quasi-dupliqués par métier.
 * noindex + hors sitemap + hors listes blog ; pages conservées (prompt GEO #5).
 */

const TEMPLATED_SLUG_PATTERNS: readonly RegExp[] = [
  /^l-ia-va-t-elle-remplacer-les-/,
  /^ia-et-.+-5-gains-de-temps-concrets$/,
  /^comment-utiliser-chatgpt-pour-vos-devis-/,
  /^chatgpt-pour-artisans-erreurs-a-eviter$/,
];

export function isBlogTemplatedSlug(slug: string): boolean {
  return TEMPLATED_SLUG_PATTERNS.some((re) => re.test(slug));
}

/** Slugs gabarits publiables (hors suffixes Media Machine redirigés). */
export function listBlogTemplatedSlugs(allSlugs: string[]): string[] {
  return allSlugs.filter(isBlogTemplatedSlug).sort();
}
