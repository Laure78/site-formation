import { existsSync } from 'fs';
import { join } from 'path';
import type { BlogArticle } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';

/** URL absolue ou chemin `/...` pour Next/Image et JSON-LD. */
export function getBlogCardCoverSrc(article: { slug: string; coverImage?: string }): string {
  if (article.coverImage) {
    return article.coverImage.startsWith('http')
      ? article.coverImage
      : article.coverImage.startsWith('/')
        ? article.coverImage
        : `/${article.coverImage}`;
  }
  const localPath = join(process.cwd(), 'content', 'blog', article.slug, 'cover.png');
  if (existsSync(localPath)) {
    return `/content/blog/${article.slug}/cover.png`;
  }
  return '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp';
}

export function getBlogCardCoverAbsoluteUrl(article: { slug: string; coverImage?: string }): string {
  const src = getBlogCardCoverSrc(article);
  if (src.startsWith('http')) return src;
  return `${SITE_CONFIG.url.replace(/\/$/, '')}${src.startsWith('/') ? src : `/${src}`}`;
}
