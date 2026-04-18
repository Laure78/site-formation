import { BlogIndexView } from '@/components/blog/BlogIndexView';
import { computeBlogListing } from '@/lib/blog-index-query';
import { getBlogIndexMetadata } from '@/lib/blog-metadata';

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
    <BlogIndexView
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      mode="all"
      searchQuery={q}
      canonicalPath="/blog"
    />
  );
}
