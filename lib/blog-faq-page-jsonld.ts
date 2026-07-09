/**
 * FAQPage JSON-LD — articles blog (frontmatter `faq`, corps MDX, sections legacy).
 * @see lib/article-faq-jsonld.ts — résolution et validation centralisées.
 */

export {
  assertFaqPageSchema,
  buildArticleFaqPageJsonLd,
  buildBlogFaqPageJsonLdFromSlug,
  listBlogArticlesWithFaqPageJsonLd,
  resolveBlogArticleFaqPairs,
  type ArticleFaqPair,
  type BlogArticleFaqJsonLdEntry,
  type BlogFaqPair,
} from '@/lib/article-faq-jsonld';

import { buildArticleFaqPageJsonLd, type BlogFaqPair } from '@/lib/article-faq-jsonld';

/**
 * Construit le schéma FAQPage depuis des paires Q/R explicites.
 * Retourne `null` si le tableau est vide ou ne respecte pas le minimum schema (3 questions).
 */
export function buildBlogFaqPageJsonLd(
  faq: BlogFaqPair[] | undefined | null
): Record<string, unknown> | null {
  return buildArticleFaqPageJsonLd(faq);
}
