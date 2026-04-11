import Script from 'next/script';
import { getBlogArticleFaqPairs, type BlogArticle } from '@/lib/blog';
import { getDefaultBlogFaqSchema } from '@/lib/blog-default-faq-schema';
import { getFAQSchema } from '@/lib/seo';

type Props = {
  article: BlogArticle;
};

/**
 * FAQPage JSON-LD : champ `article.faq` (équivalent frontmatter MDX) si défini,
 * sinon paires extraites des sections `type: 'faq'` (lignes « Question — Réponse »),
 * sinon FAQ générique BTP.
 */
export function BlogArticleFaqJsonLd({ article }: Props) {
  const faqPairs = getBlogArticleFaqPairs(article);
  const schema =
    faqPairs.length > 0 ? getFAQSchema(faqPairs) : getDefaultBlogFaqSchema();

  return (
    <Script
      id="schema-faq"
      strategy="afterInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
