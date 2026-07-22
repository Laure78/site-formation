/**
 * JSON-LD @graph — index blog : CollectionPage, ItemList, Blog (BlogPosting enrichis), SearchAction.
 */

import type { BlogArticle } from '@/lib/blog';
import {
  BLOG_CATEGORIES,
  estimateWordCountFromArticle,
  getArticleCategory,
  getAllArticles,
} from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';

const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const ORG_ID = `${BASE}/#organization`;
const PERSON_ID = `${BASE}/a-propos#person`;

function resolveImageUrl(article: BlogArticle): string {
  if (article.coverImage?.startsWith('http')) return article.coverImage;
  if (article.coverImage?.startsWith('/')) return `${BASE}${article.coverImage}`;
  return `${BASE}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`;
}

function blogPostingFromArticle(a: BlogArticle): Record<string, unknown> {
  const wordCount = estimateWordCountFromArticle(a);
  const dateModified = a.dateModified ?? a.date;
  const section = BLOG_CATEGORIES[getArticleCategory(a.slug)];
  return {
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    url: `${BASE}/blog/${a.slug}`,
    datePublished: a.date,
    dateModified,
    image: resolveImageUrl(a),
    inLanguage: 'fr-FR',
    wordCount,
    articleSection: section,
    keywords: a.keywords?.length ? a.keywords : undefined,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  };
}

export type BlogIndexSchemaOptions = {
  /** URL canonique de la page liste (ex. /blog ou /blog/page/2). */
  canonicalPath: string;
  /** Dernière modification connue (ex. article le plus récent). */
  dateModifiedIso: string;
};

export function buildBlogListingJsonLd(
  options: BlogIndexSchemaOptions
): Record<string, unknown> {
  const articles = getAllArticles();
  const canonicalUrl = `${BASE}${options.canonicalPath.replace(/\/$/, '') || '/'}`;
  const pagePath = options.canonicalPath.replace(/\/$/, '') || '/blog';
  const webpageId = `${canonicalUrl}#webpage`;
  const itemListId = `${canonicalUrl}#itemlist`;
  const blogId = `${BASE}/blog#blog`;

  const itemListElements = articles.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: a.title,
    url: `${BASE}/blog/${a.slug}`,
  }));

  const enrichedPosts = articles.map(blogPostingFromArticle);

  const collectionPage: Record<string, unknown> = {
    '@type': 'CollectionPage',
    '@id': webpageId,
    url: canonicalUrl,
    name: 'Blog Formation IA pour le BTP — guides, prompts & cas d’usage',
    description: `${articles.length} articles et guides sur l’IA dans le BTP (devis, appels d’offres, ChatGPT, Constructys).`,
    isPartOf: { '@id': `${BASE}/#website` },
    inLanguage: 'fr-FR',
    dateModified: options.dateModifiedIso,
    mainEntity: { '@id': itemListId },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const itemList: Record<string, unknown> = {
    '@type': 'ItemList',
    '@id': itemListId,
    numberOfItems: articles.length,
    itemListElement: itemListElements,
  };

  const blog: Record<string, unknown> = {
    '@type': 'Blog',
    '@id': blogId,
    name: 'Blog Formation IA pour les pros du BTP',
    url: `${BASE}/blog`,
    publisher: { '@id': ORG_ID },
    blogPost: enrichedPosts,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, itemList, blog],
  };
}

/** Date ISO du fichier le plus récent (publication ou mise à jour). */
export function getBlogIndexLastModifiedIso(): string {
  const articles = getAllArticles();
  let max = 0;
  for (const a of articles) {
    const pub = new Date(`${a.date}T12:00:00+01:00`).getTime();
    const mod = new Date(`${(a.dateModified ?? a.date)}T12:00:00+01:00`).getTime();
    max = Math.max(max, pub, mod);
  }
  return new Date(max).toISOString();
}
