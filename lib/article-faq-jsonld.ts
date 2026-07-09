/**
 * FAQPage JSON-LD — résolution automatique depuis le contenu des articles blog.
 * Source : frontmatter MDX, corps MDX (section FAQ), `article.faq`, sections `type: 'faq'` / HTML.
 */

import { extractFaqPairsForFaqPageJsonLd, getAllSlugs, getArticle } from '@/lib/blog';
import {
  getAllMdxBlogSlugs,
  hasMdxBlogFile,
  mergeBlogSlugsForStaticParams,
  readMdxBlogRaw,
  resolveMdxBlogFaqPairs,
} from '@/lib/blog-mdx-faq';
import { FAQ_SCHEMA_MIN, getFAQSchema } from '@/lib/seo';

export type ArticleFaqPair = { question: string; answer: string };

/** Alias historique blog. */
export type BlogFaqPair = ArticleFaqPair;

/** Résout les paires Q/R d'un article blog (MDX ou JSON/TS). */
export function resolveBlogArticleFaqPairs(slug: string): ArticleFaqPair[] {
  if (hasMdxBlogFile(slug)) {
    return resolveMdxBlogFaqPairs(slug);
  }
  const article = getArticle(slug);
  if (!article) return [];
  return extractFaqPairsForFaqPageJsonLd(article).map(({ q, a }) => ({
    question: q,
    answer: a,
  }));
}

/**
 * Construit le schéma FAQPage depuis des paires Q/R.
 * Retourne `null` si < 3 paires valides (pas d'injection).
 */
export function buildArticleFaqPageJsonLd(
  faq: ArticleFaqPair[] | undefined | null
): Record<string, unknown> | null {
  if (!faq?.length) return null;
  const schema = getFAQSchema(faq.map(({ question, answer }) => ({ q: question, a: answer })));
  return schema as Record<string, unknown> | null;
}

/** Construit FAQPage JSON-LD pour un slug blog — `null` si pas de FAQ suffisante. */
export function buildBlogFaqPageJsonLdFromSlug(slug: string): Record<string, unknown> | null {
  return buildArticleFaqPageJsonLd(resolveBlogArticleFaqPairs(slug));
}

export type BlogArticleFaqJsonLdEntry = {
  slug: string;
  path: string;
  questionCount: number;
};

/** Liste les articles blog équipés d'un FAQPage JSON-LD valide (≥ 3 Q/R). */
export function listBlogArticlesWithFaqPageJsonLd(): BlogArticleFaqJsonLdEntry[] {
  const slugs = mergeBlogSlugsForStaticParams(getAllSlugs());
  const equipped: BlogArticleFaqJsonLdEntry[] = [];

  for (const slug of slugs.sort((a, b) => a.localeCompare(b, 'fr'))) {
    const schema = buildBlogFaqPageJsonLdFromSlug(slug);
    if (!schema) continue;
    const mainEntity = schema.mainEntity;
    const count = Array.isArray(mainEntity) ? mainEntity.length : 0;
    equipped.push({ slug, path: `/blog/${slug}`, questionCount: count });
  }

  return equipped;
}

/** Assertions partagées — scripts de validation. */
export function assertFaqPageSchema(schema: Record<string, unknown>, label: string): void {
  if (schema['@context'] !== 'https://schema.org') {
    throw new Error(`${label}: @context schema.org requis`);
  }
  if (schema['@type'] !== 'FAQPage') {
    throw new Error(`${label}: @type FAQPage attendu`);
  }
  const mainEntity = schema.mainEntity;
  if (!Array.isArray(mainEntity)) {
    throw new Error(`${label}: mainEntity doit être un tableau`);
  }
  if (mainEntity.length < FAQ_SCHEMA_MIN) {
    throw new Error(`${label}: minimum ${FAQ_SCHEMA_MIN} questions dans mainEntity`);
  }
  for (const [i, node] of mainEntity.entries()) {
    if (!node || typeof node !== 'object') {
      throw new Error(`${label}: Question ${i + 1} invalide`);
    }
    const question = node as Record<string, unknown>;
    if (question['@type'] !== 'Question') {
      throw new Error(`${label}: Question ${i + 1} — @type Question attendu`);
    }
    if (!question.name || typeof question.name !== 'string' || !question.name.trim()) {
      throw new Error(`${label}: Question ${i + 1} — name manquant`);
    }
    const accepted = question.acceptedAnswer;
    if (!accepted || typeof accepted !== 'object') {
      throw new Error(`${label}: Question ${i + 1} — acceptedAnswer manquant`);
    }
    const answer = accepted as Record<string, unknown>;
    if (answer['@type'] !== 'Answer') {
      throw new Error(`${label}: Question ${i + 1} — acceptedAnswer.@type Answer attendu`);
    }
    if (!answer.text || typeof answer.text !== 'string' || !answer.text.trim()) {
      throw new Error(`${label}: Question ${i + 1} — acceptedAnswer.text manquant`);
    }
  }
}
