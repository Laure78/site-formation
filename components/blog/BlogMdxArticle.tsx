import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArticleJsonLd } from '@/components/blog/ArticleJsonLd';
import { BlogArticleFaqJsonLd } from '@/components/blog/BlogArticleFaqJsonLd';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { TableOfContents } from '@/components/blog/TableOfContents';
import {
  compileMdxBlogPostCached,
  mdxFrontmatterToBlogArticle,
  resolveMdxCoverUrl,
} from '@/lib/blog-mdx';
import { getRelatedArticlesForDisplay } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';

type Props = { slug: string };

export async function BlogMdxArticle({ slug }: Props) {
  const compiled = await compileMdxBlogPostCached(slug);
  if (!compiled) return null;
  const { content, frontmatter, toc, wordCount } = compiled;
  const article = mdxFrontmatterToBlogArticle(frontmatter);
  const schemaImage = resolveMdxCoverUrl(frontmatter.cover);
  const related = getRelatedArticlesForDisplay(slug, 6, frontmatter.relatedSlugs);

  const coverSrc = frontmatter.cover.startsWith('http')
    ? frontmatter.cover
    : frontmatter.cover.startsWith('/')
      ? frontmatter.cover
      : `/${frontmatter.cover}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <ArticleJsonLd
        id="schema-blog-mdx-article"
        title={frontmatter.title}
        description={frontmatter.description}
        slug={slug}
        datePublished={frontmatter.publishedAt}
        dateModified={frontmatter.updatedAt ?? frontmatter.publishedAt}
        imageUrl={schemaImage}
        keywords={frontmatter.keywords}
        wordCount={wordCount}
      />
      <BlogArticleFaqJsonLd article={article} />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: frontmatter.title },
        ]}
      />

      <article>
        <div className="flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              Publié le{' '}
              <time dateTime={frontmatter.publishedAt}>
                {new Date(frontmatter.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <address className="not-italic">
              Par{' '}
              <Link
                href="/auteur/laure-olivie"
                className="font-medium text-slate-700 hover:text-[var(--accent)] hover:underline"
                rel="author"
              >
                {SITE_CONFIG.name}
              </Link>
            </address>
            {frontmatter.readingTime ? (
              <>
                <span aria-hidden className="hidden sm:inline">
                  ·
                </span>
                <span className="text-xs text-slate-400 sm:text-sm">
                  Temps de lecture : {frontmatter.readingTime}
                </span>
              </>
            ) : null}
          </div>
          <p className="text-xs text-slate-400 sm:text-sm">
            Dernière mise à jour :{' '}
            <time dateTime={frontmatter.updatedAt ?? frontmatter.publishedAt}>
              {new Date(frontmatter.updatedAt ?? frontmatter.publishedAt).toLocaleDateString(
                'fr-FR',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </time>
          </p>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{frontmatter.description}</p>

        <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-xl border border-slate-200">
          <Image
            src={coverSrc}
            alt={frontmatter.coverAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>

        <div className="mt-8">
          <TableOfContents items={toc} />
        </div>

        <div className="article-mdx mt-8 max-w-none">{content}</div>

        <AuthorBio className="mt-12" />

        <RelatedArticles articles={related} className="mt-16" />
      </article>
    </div>
  );
}
