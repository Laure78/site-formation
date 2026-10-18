/**
 * URL publique canonique d’un article blog (listing, cartes, sitemap, JSON-LD).
 */
import type { BlogArticle } from '@/lib/blog';
import type { BlogMdxFrontmatter } from '@/lib/blog-mdx';

type WithSlug = Pick<BlogArticle, 'slug'> & { canonicalPath?: string };

export function getBlogArticleCanonicalPath(article: WithSlug): string {
  const path = article.canonicalPath?.trim();
  if (path && path.startsWith('/')) return path.replace(/\/$/, '') || '/';
  return `/blog/${article.slug}`;
}

export function getBlogArticleCanonicalPathFromMdx(fm: BlogMdxFrontmatter): string {
  return getBlogArticleCanonicalPath({
    slug: fm.slug,
    canonicalPath: fm.canonicalPath,
  });
}

/** Slug dont l’article est servi hors `/blog/[slug]` — rediriger la route blog vers le canonique. */
export function mdxBlogSlugRequiresExternalCanonical(fm: BlogMdxFrontmatter): boolean {
  return getBlogArticleCanonicalPathFromMdx(fm) !== `/blog/${fm.slug}`;
}
