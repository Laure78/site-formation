import { JsonLd } from '@/components/JsonLd';
import { buildBlogFaqPageJsonLd, type BlogFaqPair } from '@/lib/blog-faq-page-jsonld';
import { extractFaqPairsForFaqPageJsonLd, type BlogArticle } from '@/lib/blog';

type Props =
  | {
      slug: string;
      faq: BlogFaqPair[];
      article?: never;
    }
  | {
      slug: string;
      article: BlogArticle;
      faq?: never;
    };

/**
 * FAQPage JSON-LD — injecté si ≥ 3 paires Q/R valides.
 * Balise native `<script type="application/ld+json">` via `JsonLd` (SSR).
 */
export function BlogArticleFaqJsonLd({ slug, faq, article }: Props) {
  const pairs: BlogFaqPair[] =
    faq ??
    extractFaqPairsForFaqPageJsonLd(article).map(({ q, a }) => ({
      question: q,
      answer: a,
    }));

  const schema = buildBlogFaqPageJsonLd(pairs);
  if (schema == null) return null;

  return <JsonLd id={`blog-faq-jsonld-${slug}`} schema={schema} />;
}
