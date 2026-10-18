import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogMdxArticle } from '@/components/blog/BlogMdxArticle';
import { buildMdxBlogMetadata, hasMdxBlogFile } from '@/lib/blog-mdx';
import { LINKS } from '@/lib/internal-links';

const ARTICLE_SLUG = 'formation-ia-intra-entreprise-btp';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  if (!hasMdxBlogFile(ARTICLE_SLUG)) {
    return { title: 'Article non trouvé' };
  }
  const meta = buildMdxBlogMetadata(ARTICLE_SLUG, LINKS.formationIaIntraEntrepriseBtp);
  return meta ?? { title: 'Article non trouvé' };
}

export default function FormationIaIntraEntrepriseBtpArticlePage() {
  if (!hasMdxBlogFile(ARTICLE_SLUG)) notFound();
  return <BlogMdxArticle slug={ARTICLE_SLUG} />;
}
