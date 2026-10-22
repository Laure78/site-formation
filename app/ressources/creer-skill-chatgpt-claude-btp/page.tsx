import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogMdxArticle } from '@/components/blog/BlogMdxArticle';
import { buildMdxBlogMetadata, hasMdxBlogFile } from '@/lib/blog-mdx';
import { LINKS } from '@/lib/internal-links';

const ARTICLE_SLUG = 'creer-skill-chatgpt-claude-btp';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  if (!hasMdxBlogFile(ARTICLE_SLUG)) {
    return { title: 'Article non trouvé' };
  }
  const meta = buildMdxBlogMetadata(ARTICLE_SLUG, LINKS.ressourcesCreerSkillChatgptClaudeBtp);
  return meta ?? { title: 'Article non trouvé' };
}

export default function CreerSkillChatgptClaudeBtpArticlePage() {
  if (!hasMdxBlogFile(ARTICLE_SLUG)) notFound();
  return <BlogMdxArticle slug={ARTICLE_SLUG} />;
}
