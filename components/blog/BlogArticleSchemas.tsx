import { ArticleJsonLd, type ArticleJsonLdProps } from '@/components/blog/ArticleJsonLd';
import { BlogArticleFaqJsonLd } from '@/components/blog/BlogArticleFaqJsonLd';
import { JsonLd } from '@/components/JsonLd';
import type { BlogArticle } from '@/lib/blog';
import { getBreadcrumbSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';

type Props = {
  slug: string;
  article: ArticleJsonLdProps;
  /** Chemin canonique (fil d’Ariane + BlogPosting). */
  canonicalPath?: string;
  /** Article JSON/TS — évite un second chargement pour la FAQ. */
  legacyArticle?: BlogArticle;
  /** Schéma HowTo optionnel (sections procédure). */
  howToSchema?: Record<string, unknown> | null;
};

/**
 * JSON-LD article blog — point d'injection unique (pas de doublon Article / FAQPage / BreadcrumbList).
 * - `Article` : auteur Person, publisher OFC, dates
 * - `BreadcrumbList` : Accueil → Blog → titre de l’article
 * - `FAQPage` : uniquement si ≥ 3 paires Q/R dans l'article
 * - `HowTo` : optionnel, une seule fois
 */
export function BlogArticleSchemas({
  slug,
  article,
  canonicalPath,
  legacyArticle,
  howToSchema,
}: Props) {
  const articlePath = canonicalPath ?? `${LINKS.blog}/${slug}`;
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: 'Accueil', path: LINKS.home },
    { name: 'Blog', path: LINKS.blog },
    { name: article.title, path: articlePath },
  ]);

  return (
    <>
      <ArticleJsonLd {...article} path={canonicalPath} />
      {breadcrumbJsonLd ? (
        <JsonLd id={`schema-blog-breadcrumb-${slug}`} schema={breadcrumbJsonLd} />
      ) : null}
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
