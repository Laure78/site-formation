/** Slugs servis par une route `app/blog/<slug>/page.tsx` dédiée (hors `app/blog/[slug]`). */
export const BLOG_CUSTOM_PAGE_SLUGS = new Set<string>(['claude-ia-maitrise-oeuvre']);

export function isBlogCustomPageSlug(slug: string): boolean {
  return BLOG_CUSTOM_PAGE_SLUGS.has(slug);
}
