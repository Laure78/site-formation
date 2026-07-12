import { notFound } from 'next/navigation';
import { BlogIndexView } from '@/components/blog/BlogIndexView';
import { computeBlogListing } from '@/lib/blog-index-query';
import { getBlogIndexMetadata } from '@/lib/blog-metadata';

export const revalidate = 3600;

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  const { totalPages } = computeBlogListing({
    page: 1,
    categoryId: null,
    q: null,
    excludeFeatured: true,
  });
  if (totalPages <= 1) return [];
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { page: p } = await params;
  const n = parseInt(p, 10);
  if (!Number.isFinite(n) || n < 2) {
    return getBlogIndexMetadata('/blog', 1);
  }
  return getBlogIndexMetadata(`/blog/page/${n}`, n);
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page: p } = await params;
  const n = parseInt(p, 10);
  if (!Number.isFinite(n) || n < 2) notFound();

  const { items, totalPages, currentPage } = computeBlogListing({
    page: n,
    categoryId: null,
    q: null,
    excludeFeatured: true,
  });

  if (n > totalPages) notFound();

  return (
    <BlogIndexView
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      mode="all"
      canonicalPath={`/blog/page/${n}`}
    />
  );
}
