import { BlogIndexLandingView } from '@/components/blog/BlogIndexLandingView';
import { computeBlogListing } from '@/lib/blog-index-query';
import { getBlogIndexMetadata } from '@/lib/blog-metadata';

export const revalidate = 3600;

export const metadata = getBlogIndexMetadata('/blog', 1);

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { items, totalPages, currentPage } = computeBlogListing({
    page: 1,
    categoryId: null,
    q,
    excludeFeatured: !q,
  });

  return (
    <BlogIndexLandingView
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={q}
      canonicalPath="/blog"
    />
  );
}
