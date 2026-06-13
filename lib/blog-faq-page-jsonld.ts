/**
 * FAQPage JSON-LD — articles blog (frontmatter `faq` ou extraction legacy).
 */

import { getFAQSchema } from '@/lib/seo';

export type BlogFaqPair = { question: string; answer: string };

/**
 * Construit le schéma FAQPage depuis des paires Q/R.
 * Retourne `null` si le tableau est vide ou ne respecte pas le minimum schema (3 questions).
 */
export function buildBlogFaqPageJsonLd(
  faq: BlogFaqPair[] | undefined | null
): Record<string, unknown> | null {
  if (!faq?.length) return null;
  const schema = getFAQSchema(faq.map(({ question, answer }) => ({ q: question, a: answer })));
  return schema as Record<string, unknown> | null;
}
