import {
  BLOG_FEATURED_SLUGS,
  getAllArticles,
  getArticleCategory,
  type BlogArticle,
  type BlogCategoryId,
} from '@/lib/blog';

export const BLOG_PAGE_SIZE = 10;

export function computeBlogListing(params: {
  page: number;
  categoryId?: BlogCategoryId | null;
  q?: string | null;
  /** Exclure les articles « À la une » de la liste paginée (vue /blog tous). */
  excludeFeatured: boolean;
}): {
  items: BlogArticle[];
  totalPages: number;
  currentPage: number;
} {
  const featured = new Set(BLOG_FEATURED_SLUGS);
  let list = [...getAllArticles()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (params.categoryId) {
    list = list.filter((a) => getArticleCategory(a.slug) === params.categoryId);
  }

  const q = params.q?.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }

  if (params.excludeFeatured) {
    list = list.filter((a) => !featured.has(a.slug));
  }

  const totalFiltered = list.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / BLOG_PAGE_SIZE) || 1);
  const safePage = Math.min(Math.max(1, params.page), totalPages);
  const items = list.slice((safePage - 1) * BLOG_PAGE_SIZE, safePage * BLOG_PAGE_SIZE);

  return { items, totalPages, currentPage: safePage };
}
