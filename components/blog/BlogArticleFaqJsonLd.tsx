import { JsonLd } from '@/components/JsonLd';
import {
  buildArticleFaqPageJsonLd,
  resolveBlogArticleFaqPairs,
  type BlogFaqPair,
} from '@/lib/article-faq-jsonld';
import { extractFaqPairsForFaqPageJsonLd, type BlogArticle } from '@/lib/blog';

type Props = {
  slug: string;
  /** Paires explicites — sinon résolution automatique depuis le slug ou l'article. */
  faq?: BlogFaqPair[];
  /** Article JSON/TS — évite un second chargement si déjà disponible côté page. */
  article?: BlogArticle;
};

/**
 * FAQPage JSON-LD — injecté automatiquement si ≥ 3 paires Q/R valides.
 * Sources : frontmatter MDX, section FAQ du corps MDX, `article.faq`, sections `faq` / HTML.
 */
export function BlogArticleFaqJsonLd({ slug, faq, article }: Props) {
  const pairs: BlogFaqPair[] =
    faq ??
    (article
      ? extractFaqPairsForFaqPageJsonLd(article).map(({ q, a }) => ({
          question: q,
          answer: a,
        }))
      : resolveBlogArticleFaqPairs(slug));

  const schema = buildArticleFaqPageJsonLd(pairs);
  if (schema == null) return null;

  return <JsonLd id={`blog-faq-jsonld-${slug}`} schema={schema} />;
}
