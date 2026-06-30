import Link from 'next/link';
import { ArticleJsonLd } from '@/components/blog/ArticleJsonLd';
import { ArticleAuthorBio } from '@/components/blog/ArticleAuthorBio';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { SommaireAncre } from '@/components/readability/SommaireAncre';
import { shouldShowSommaireAncre } from '@/lib/sommaire-ancre';
import {
  compileMdxBlogPostCached,
  resolveMdxCoverUrl,
} from '@/lib/blog-mdx';
import { getRelatedArticlesForDisplay } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { shouldShowSkillLeadMagnetCta } from '@/lib/lead-magnet-skill-ia';
import { BlogCTA } from '@/components/BlogCTA';
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = { slug: string };

export async function BlogMdxArticle({ slug }: Props) {
  const compiled = await compileMdxBlogPostCached(slug);
  if (!compiled) return null;
  const { content, frontmatter, toc, wordCount } = compiled;
  const schemaImage = resolveMdxCoverUrl(frontmatter.cover);
  const related = getRelatedArticlesForDisplay(slug, 6, frontmatter.relatedSlugs);
  const sommaireItems = toc
    .filter((entry) => entry.depth === 2)
    .map((entry) => ({ label: entry.text, anchor: entry.id }));
  const showSommaire = shouldShowSommaireAncre(sommaireItems);

  return (
    <div className={`mx-auto px-4 py-16 ${showSommaire ? 'max-w-6xl' : 'max-w-3xl'}`}>
      <ArticleJsonLd
        id="schema-blog-mdx-article"
        title={frontmatter.title}
        headline={frontmatter.seoTitle ?? frontmatter.title}
        description={frontmatter.description}
        slug={slug}
        datePublished={frontmatter.publishedAt}
        dateModified={frontmatter.updatedAt ?? frontmatter.publishedAt}
        imageUrl={schemaImage}
        keywords={frontmatter.keywords}
        wordCount={wordCount}
      />
      <div
        className={
          showSommaire
            ? 'lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:gap-10'
            : undefined
        }
      >
        {showSommaire ? (
          <div className="mb-8 lg:mb-0">
            <SommaireAncre
              items={sommaireItems}
              instanceId={`blog-${slug}`}
              heading="Dans cet article"
            />
          </div>
        ) : null}

        <article className={showSommaire ? 'min-w-0 max-w-3xl' : undefined}>
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
                href="/a-propos"
                className={`${OFC_LINK} text-slate-700`}
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

        <div className="article-mdx mt-8 max-w-none">{content}</div>

        <BlogCTA articleSlug={slug} idSuffix="end" className="mt-12" />

        {shouldShowSkillLeadMagnetCta(slug) ? (
          <LeadMagnetCTA href={LINKS.skillIaConducteurTravaux} />
        ) : null}

        <ArticleAuthorBio />

        <RelatedArticles articles={related} className="mt-16" />
        </article>
      </div>
    </div>
  );
}
