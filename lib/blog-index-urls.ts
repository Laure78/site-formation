import type { BlogCategoryId } from '@/lib/blog';
import { BLOG_CATEGORIES } from '@/lib/blog';

/** Segments URL publics pour les catégories (SEO) — distincts des ids internes quand utile. */
export const BLOG_CATEGORY_PATH_SLUGS: Record<BlogCategoryId, string> = {
  devis: 'devis-chiffrage',
  'appels-offres': 'appels-offres',
  financement: 'financement-opco',
  chatgpt: 'chatgpt-bonnes-pratiques',
  metiers: 'ia-par-metier',
  rh: 'rh-recrutement',
  productivite: 'productivite-emails',
};

const PATH_TO_ID = Object.fromEntries(
  (Object.keys(BLOG_CATEGORY_PATH_SLUGS) as BlogCategoryId[]).map((id) => [
    BLOG_CATEGORY_PATH_SLUGS[id],
    id,
  ])
) as Record<string, BlogCategoryId>;

export function blogCategoryPathFromId(id: BlogCategoryId): string {
  return BLOG_CATEGORY_PATH_SLUGS[id];
}

export function blogCategoryIdFromPathSlug(pathSlug: string): BlogCategoryId | null {
  return PATH_TO_ID[pathSlug] ?? null;
}

export function blogCategoryListingHref(id: BlogCategoryId, page = 1): string {
  const base = `/blog/categorie/${BLOG_CATEGORY_PATH_SLUGS[id]}`;
  return page <= 1 ? base : `${base}/${page}`;
}

/** Titres pour fil d’Ariane / H1 */
export function blogCategoryLabel(id: BlogCategoryId): string {
  return BLOG_CATEGORIES[id];
}
