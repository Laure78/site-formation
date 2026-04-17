import Script from 'next/script';
import { extractFaqPairsForFaqPageJsonLd, type BlogArticle } from '@/lib/blog';
import { getFAQSchema } from '@/lib/seo';

type Props = {
  article: BlogArticle;
};

/**
 * FAQPage JSON-LD — uniquement si l’article contient une FAQ détectée
 * (champ `faq`, section `type: 'faq'`, ou section HTML avec titre FAQ + H3/p).
 */
const FAQ_JSONLD_MAX = 10;

export function BlogArticleFaqJsonLd({ article }: Props) {
  const faqPairs = extractFaqPairsForFaqPageJsonLd(article).slice(0, FAQ_JSONLD_MAX);
  const schema = getFAQSchema(faqPairs);
  if (schema == null) return null;

  return (
    <Script
      id={`blog-faq-jsonld-${article.slug}`}
      strategy="lazyOnload"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
