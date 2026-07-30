import { notFound } from 'next/navigation';
import { BlogIndexView } from '@/components/blog/BlogIndexView';
import { computeBlogListing } from '@/lib/blog-index-query';
import { getBlogCategoryMetadata } from '@/lib/blog-metadata';
import { blogCategoryIdFromPathSlug, BLOG_CATEGORY_PATH_SLUGS } from '@/lib/blog-index-urls';
import { BLOG_CATEGORIES } from '@/lib/blog';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.values(BLOG_CATEGORY_PATH_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const id = blogCategoryIdFromPathSlug(slug);
  if (!id) {
    return { title: 'Blog' };
  }
  return getBlogCategoryMetadata(`/blog/categorie/${slug}`, 1, BLOG_CATEGORIES[id], id);
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const id = blogCategoryIdFromPathSlug(slug);
  if (!id) notFound();

  const { items, totalPages, currentPage } = computeBlogListing({
    page: 1,
    categoryId: id,
    q: null,
    excludeFeatured: false,
  });

  return (
    <BlogIndexView
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      mode="category"
      categoryId={id}
      categoryPathSlug={slug}
      canonicalPath={`/blog/categorie/${slug}`}
    />
  );
}
