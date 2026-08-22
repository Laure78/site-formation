/**
 * Articles blog en MDX — `content/blog/*.mdx`, frontmatter YAML.
 */
import { cache } from 'react';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import GithubSlugger from 'github-slugger';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { rehypeAutoLink } from '@/lib/autoLink';
import matter from 'gray-matter';
import { buildBlogArticleOgImageAlt } from '@/lib/image-alt';
import { ARTICLE_SECTION_GEO, createPageMetadata, estimateWordCountFromPlainText, SITE_CONFIG } from '@/lib/seo';
import { getBlogMdxComponents } from '@/components/blog/blog-mdx-components';
import type { BlogArticle } from '@/lib/blog';
import type { TocEntry } from '@/components/blog/TableOfContents';
import type { ReactNode } from 'react';

import {
  BLOG_MDX_DIR,
  extractFaqPairsFromMdxMarkdownBody,
  getAllMdxBlogSlugs,
  getMdxBlogFaqFromFrontmatter,
  hasMdxBlogFile,
  mergeBlogSlugsForStaticParams,
  readMdxBlogRaw,
  resolveMdxBlogFaqPairs,
  type BlogFaqFrontmatterPair,
  type BlogMdxFaqItem,
} from '@/lib/blog-mdx-faq';

export type BlogMdxFrontmatter = {
  title: string;
  /** Titre HTML / Open Graph — si absent, `title` */
  seoTitle?: string;
  /** Meta description manuelle (HTML, og:description, twitter:description) — phrase complète, jamais tronquée. */
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  cover: string;
  coverAlt: string;
  keywords: string[];
  readingTime?: string;
  /** FAQ structurée — source JSON-LD FAQPage */
  faq?: BlogFaqFrontmatterPair[];
  /** @deprecated Préférer `faq` ({ question, answer }) */
  faqItems?: BlogMdxFaqItem[];
  /** Slugs d’articles JSON existants pour RelatedArticles */
  relatedSlugs?: string[];
  /** Synthèse factuelle sous le H1 (2–3 phrases) — absent = bloc masqué */
  enBref?: string | string[];
};

export type { BlogFaqFrontmatterPair, BlogMdxFaqItem };
export {
  BLOG_MDX_DIR,
  extractFaqPairsFromMdxMarkdownBody,
  getAllMdxBlogSlugs,
  getMdxBlogFaqFromFrontmatter,
  hasMdxBlogFile,
  mergeBlogSlugsForStaticParams,
  readMdxBlogRaw,
  resolveMdxBlogFaqPairs,
};

/** Sommaire — ids alignés sur `rehype-slug` / GitHub Slugger */
export function extractTocFromMarkdown(markdownBody: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  for (const line of markdownBody.split('\n')) {
    const trimmed = line.trim();
    const m = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!m) continue;
    const depth = (m[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = m[2].replace(/\s+#+\s*$/, '').trim();
    const id = slugger.slug(text);
    entries.push({ id, depth, text });
  }
  return entries;
}

function stripMdForWordCount(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]+>/g, ' ');
}

export type CompiledMdxBlog = {
  content: ReactNode;
  frontmatter: BlogMdxFrontmatter;
  toc: TocEntry[];
  wordCount: number;
};

export function getMdxFrontmatter(slug: string): BlogMdxFrontmatter | null {
  const raw = readMdxBlogRaw(slug);
  if (!raw) return null;
  const { data } = matter(raw);
  return data as BlogMdxFrontmatter;
}

export function buildMdxBlogMetadata(slug: string): Metadata | null {
  const fm = getMdxFrontmatter(slug);
  if (!fm) return null;
  const path = `/blog/${slug}`;
  const coverUrl = resolveMdxCoverUrl(fm.cover);
  const metaTitle = fm.seoTitle ?? fm.title;
  const ogImageAlt = buildBlogArticleOgImageAlt(metaTitle);
  return createPageMetadata({
    title: metaTitle,
    description: fm.description,
    descriptionFinal: true,
    path,
    keywords: fm.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt ?? fm.publishedAt,
      author: SITE_CONFIG.name,
      section: ARTICLE_SECTION_GEO,
    },
    image: {
      url: coverUrl,
      width: 1200,
      height: 630,
      alt: ogImageAlt,
    },
    openGraphTitle: metaTitle,
    openGraphDescription: fm.description,
  });
}

export async function compileMdxBlogPost(slug: string): Promise<CompiledMdxBlog | null> {
  const raw = readMdxBlogRaw(slug);
  if (!raw) return null;
  const { data, content: body } = matter(raw);
  const fm = data as Partial<BlogMdxFrontmatter>;
  if (!fm.title || !fm.description || !fm.slug || !fm.publishedAt || !fm.cover || !fm.coverAlt || !fm.keywords) {
    throw new Error(`[blog-mdx] Frontmatter incomplet pour ${slug}.mdx`);
  }
  if (fm.slug !== slug) {
    throw new Error(`[blog-mdx] Frontmatter slug "${fm.slug}" !== fichier "${slug}.mdx"`);
  }

  const frontmatter = fm as BlogMdxFrontmatter;
  const toc = extractTocFromMarkdown(body);
  const wordCount = estimateWordCountFromPlainText(stripMdForWordCount(body));

  const { content } = await compileMDX({
    source: body,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutoLink],
      },
    },
    components: getBlogMdxComponents(),
  });

  return { content, frontmatter, toc, wordCount };
}

/** Cache React — évite une double compilation MDX (metadata + page). */
export const compileMdxBlogPostCached = cache(compileMdxBlogPost);

/** BlogArticle minimal pour FAQ JSON-LD + extractFaqPairs */
export function mdxFrontmatterToBlogArticle(fm: BlogMdxFrontmatter): BlogArticle {
  const faq = getMdxBlogFaqFromFrontmatter(fm).map((x) => ({
    question: x.question,
    answer: x.answer,
  }));
  return {
    slug: fm.slug,
    title: fm.title,
    description: fm.description,
    date: fm.publishedAt,
    dateModified: fm.updatedAt ?? fm.publishedAt,
    keywords: fm.keywords,
    sections: [],
    faq: faq.length ? faq : undefined,
    coverImage: fm.cover,
    relatedSlugs: fm.relatedSlugs,
    readingTime: fm.readingTime,
    enBref: fm.enBref,
  };
}

export function resolveMdxCoverUrl(cover: string): string {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  if (cover.startsWith('http')) return cover;
  const path = cover.startsWith('/') ? cover : `/${cover}`;
  return `${base}${path}`;
}
