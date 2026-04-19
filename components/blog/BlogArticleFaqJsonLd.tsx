import { JsonLd } from '@/components/JsonLd';
import { extractFaqPairsForFaqPageJsonLd, type BlogArticle } from '@/lib/blog';
import { getFAQSchema } from '@/lib/seo';

type Props = {
  article: BlogArticle;
};

/**
 * FAQPage JSON-LD — uniquement si l’article contient une FAQ détectée
 * (champ `faq`, section `type: 'faq'`, ou section HTML avec titre FAQ + H3/p).
 * Balise native `<script type="application/ld+json">` via `JsonLd`.
 */
const FAQ_JSONLD_MAX = 10;

export function BlogArticleFaqJsonLd({ article }: Props) {
  const faqPairs = extractFaqPairsForFaqPageJsonLd(article).slice(0, FAQ_JSONLD_MAX);
  const schema = getFAQSchema(faqPairs);
  if (schema == null) return null;

  return <JsonLd id={`blog-faq-jsonld-${article.slug}`} schema={schema} />;
}
