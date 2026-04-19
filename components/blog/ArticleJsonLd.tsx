import { JsonLd } from '@/components/JsonLd';
import { buildBlogPostingJsonLd } from '@/lib/seo';

export type ArticleJsonLdProps = {
  /** Titre affiché (H1) */
  title: string;
  /** Titre SEO (balise title / headline JSON-LD) — sinon `title` */
  headline?: string;
  /** Meta description de l’article */
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  /** URL absolue de l’image principale (cover ou défaut OG) */
  imageUrl: string;
  keywords?: string[];
  wordCount?: number;
  id?: string;
};

/**
 * JSON-LD Schema.org `BlogPosting` pour `/blog/[slug]`.
 * Les articles sont définis dans `lib/blog.ts` (données statiques TypeScript + générés).
 */
export function ArticleJsonLd({
  title,
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  imageUrl,
  keywords,
  wordCount,
  id = 'schema-blog-article',
}: ArticleJsonLdProps) {
  const schema = buildBlogPostingJsonLd({
    headline: headline ?? title,
    description,
    slug,
    datePublished,
    dateModified,
    imageUrl,
    keywords,
    wordCount,
  });
  return <JsonLd id={id} schema={schema} />;
}
