import { notFound } from 'next/navigation';
import { BlogIndexView } from '@/components/blog/BlogIndexView';
import { computeBlogListing } from '@/lib/blog-index-query';
import { getBlogCategoryMetadata } from '@/lib/blog-metadata';
import { blogCategoryIdFromPathSlug, BLOG_CATEGORY_PATH_SLUGS } from '@/lib/blog-index-urls';
import { BLOG_CATEGORIES } from '@/lib/blog';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string; page: string }> };

export function generateStaticParams() {
  const out: { slug: string; page: string }[] = [];
  for (const slug of Object.values(BLOG_CATEGORY_PATH_SLUGS)) {
    const id = blogCategoryIdFromPathSlug(slug);
    if (!id) continue;
    const { totalPages } = computeBlogListing({
      page: 1,
      categoryId: id,
      q: null,
      excludeFeatured: false,
    });
    if (totalPages <= 1) continue;
    for (let p = 2; p <= totalPages; p++) {
      out.push({ slug, page: String(p) });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props) {
  const { slug, page } = await params;
  const id = blogCategoryIdFromPathSlug(slug);
  const n = parseInt(page, 10);
  if (!id || !Number.isFinite(n) || n < 2) {
    return { title: 'Blog' };
  }
  return getBlogCategoryMetadata(`/blog/categorie/${slug}/${n}`, n, BLOG_CATEGORIES[id], id);
}

export default async function BlogCategoryPaginatedPage({ params }: Props) {
  const { slug, page } = await params;
  const id = blogCategoryIdFromPathSlug(slug);
  const n = parseInt(page, 10);
  if (!id || !Number.isFinite(n) || n < 2) notFound();

  const { items, totalPages, currentPage } = computeBlogListing({
    page: n,
    categoryId: id,
    q: null,
    excludeFeatured: false,
  });

  if (n > totalPages) notFound();

  return (
    <BlogIndexView
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      mode="category"
      categoryId={id}
      categoryPathSlug={slug}
      canonicalPath={`/blog/categorie/${slug}/${n}`}
    />
  );
}
