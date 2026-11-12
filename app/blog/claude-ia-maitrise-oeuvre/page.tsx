import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { BlogArticleMoeSidebar } from '@/components/blog/BlogArticleMoeSidebar';
import { ClaudeMoeArticleBody } from '@/components/blog/ClaudeMoeArticleBody';
import { blogArticleClaudeIaMaitriseOeuvre } from '@/lib/blog-claude-ia-maitrise-oeuvre-article';
import {
  BLOG_CLAUDE_MOE_ARTICLE_JSON_LD,
  BLOG_CLAUDE_MOE_FAQ_JSON_LD,
} from '@/lib/blog-claude-ia-maitrise-oeuvre-schema';
import { CLAUDE_MOE_TOC } from '@/lib/blog-claude-ia-maitrise-oeuvre-data';
import { ARTICLE_SECTION_GEO, createPageMetadata, SITE_CONFIG, siteAbsoluteUrl } from '@/lib/seo';
import { buildBlogArticleOgImageAlt } from '@/lib/image-alt';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { SITE } from '@/lib/site-config';

const META_TITLE = "Claude pour la maîtrise d'œuvre : 12 usages | Laure Olivié";
const PATH = LINKS.blogClaudeIaMaitriseOeuvre;

export const metadata = createPageMetadata({
  title: "Claude pour la maîtrise d'œuvre : 12 usages",
  titleAbsolute: META_TITLE,
  description: blogArticleClaudeIaMaitriseOeuvre.description,
  descriptionFinal: true,
  path: PATH,
  keywords: blogArticleClaudeIaMaitriseOeuvre.keywords,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: blogArticleClaudeIaMaitriseOeuvre.description,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-11-12',
    modifiedTime: '2026-11-12',
    author: SITE_CONFIG.name,
    section: ARTICLE_SECTION_GEO,
  },
  image: {
    url: `${SITE_CONFIG.url}/images/blog/ia-maitrise-oeuvre.webp`,
    width: 1200,
    height: 630,
    alt: buildBlogArticleOgImageAlt(blogArticleClaudeIaMaitriseOeuvre.seoTitle ?? ''),
  },
});

export default function BlogClaudeIaMaitriseOeuvrePage() {
  const breadcrumbItems = [
    { name: 'Accueil', url: siteAbsoluteUrl(LINKS.home) },
    { name: 'Blog', url: siteAbsoluteUrl(LINKS.blog) },
    { name: "IA et maîtrise d'œuvre", url: siteAbsoluteUrl(PATH) },
  ];

  return (
    <>
      <JsonLd id="schema-claude-moe-article" schema={BLOG_CLAUDE_MOE_ARTICLE_JSON_LD} />
      <JsonLd id="schema-claude-moe-faq" schema={BLOG_CLAUDE_MOE_FAQ_JSON_LD} />
      <BreadcrumbJsonLd id="schema-claude-moe-breadcrumb" items={breadcrumbItems} />

      <header className="bg-[#F2F2F2]">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8 md:py-10">
          <nav aria-label="Fil d'Ariane" className="text-sm text-[#555F6D]">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={LINKS.home} className={OFC_LINK}>
                  Accueil
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href={LINKS.blog} className={OFC_LINK}>
                  Blog
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-[#1A1A1A]">IA et maîtrise d&apos;œuvre</li>
            </ol>
          </nav>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex min-h-8 items-center rounded-full bg-[#377CF3] px-4 text-xs font-bold uppercase tracking-wide text-white">
              Maîtrise d&apos;œuvre
            </span>
            <span className="inline-flex min-h-8 items-center rounded-full border-2 border-[#377CF3] bg-transparent px-4 text-xs font-bold uppercase tracking-wide text-[#377CF3]">
              Claude
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[2rem] font-extrabold leading-tight tracking-tight text-[#1A1A1A] md:text-[3rem]">
            IA et maîtrise d&apos;œuvre : 12 usages concrets de{' '}
            <span className="text-[#377CF3]">Claude</span>, de la conception à la réception
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#555F6D]">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
              aria-hidden
            >
              LO
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium text-[#1A1A1A]">{SITE.marque}</span>
              <span aria-hidden>·</span>
              <time dateTime="2026-11-12">Mis à jour le 12 novembre 2026</time>
              <span aria-hidden>·</span>
              <span>Temps de lecture : 9 min</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <BlogArticleMoeSidebar toc={CLAUDE_MOE_TOC} />
          <article className="min-w-0 max-w-[780px] flex-1">
            <ClaudeMoeArticleBody />
          </article>
        </div>
      </div>
    </>
  );
}
