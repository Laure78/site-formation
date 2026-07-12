import { ArticleJsonLd, type ArticleJsonLdProps } from '@/components/blog/ArticleJsonLd';
import { BlogArticleFaqJsonLd } from '@/components/blog/BlogArticleFaqJsonLd';
import type { BlogArticle } from '@/lib/blog';

type Props = {
  slug: string;
  article: ArticleJsonLdProps;
  /** Article JSON/TS — évite un second chargement pour la FAQ. */
  legacyArticle?: BlogArticle;
  /** Schéma HowTo optionnel (sections procédure). */
  howToSchema?: Record<string, unknown> | null;
};

/**
 * JSON-LD article blog — point d'injection unique (pas de doublon Article / FAQPage).
 * - `Article` : auteur Person, publisher OFC, dates
 * - `FAQPage` : uniquement si ≥ 3 paires Q/R dans l'article
 * - `HowTo` : optionnel, une seule fois
 */
export function BlogArticleSchemas({ slug, article, legacyArticle, howToSchema }: Props) {
  return (
    <>
      <ArticleJsonLd {...article} />
      <BlogArticleFaqJsonLd slug={slug} article={legacyArticle} />
      {howToSchema ? (
        <script
          id={`blog-howto-jsonld-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
    </>
  );
}
