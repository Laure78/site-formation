/**
 * Articles blog en MDX — `content/blog/*.mdx`, frontmatter YAML.
 */
import { cache } from 'react';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import GithubSlugger from 'github-slugger';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { rehypeAutoLink } from '@/lib/autoLink';
import matter from 'gray-matter';
import { ARTICLE_SECTION_GEO, createPageMetadata, estimateWordCountFromPlainText, SITE_CONFIG } from '@/lib/seo';
import { getBlogMdxComponents } from '@/components/blog/blog-mdx-components';
import type { BlogArticle } from '@/lib/blog';
import type { TocEntry } from '@/components/blog/TableOfContents';
import type { ReactNode } from 'react';

export const BLOG_MDX_DIR = join(process.cwd(), 'content', 'blog');

export type BlogMdxFaqItem = { q: string; a: string } | { question: string; answer: string };

export type BlogFaqFrontmatterPair = { question: string; answer: string };

export type BlogMdxFrontmatter = {
  title: string;
  /** Titre HTML / Open Graph — si absent, `title` */
  seoTitle?: string;
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
};

function normalizeFaqItems(
  items?: BlogMdxFaqItem[] | BlogFaqFrontmatterPair[]
): BlogFaqFrontmatterPair[] {
  if (!items?.length) return [];
  return items.map((item) => {
    if ('q' in item && 'a' in item) return { question: item.q.trim(), answer: item.a.trim() };
    return { question: item.question.trim(), answer: item.answer.trim() };
  });
}

/** Paires FAQ depuis le frontmatter MDX (`faq` ou legacy `faqItems`). */
export function getMdxBlogFaqFromFrontmatter(fm: BlogMdxFrontmatter): BlogFaqFrontmatterPair[] {
  return normalizeFaqItems(fm.faq ?? fm.faqItems);
}

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

export function hasMdxBlogFile(slug: string): boolean {
  const f = join(BLOG_MDX_DIR, `${slug}.mdx`);
  return existsSync(f);
}

export function getAllMdxBlogSlugs(): string[] {
  if (!existsSync(BLOG_MDX_DIR)) return [];
  return readdirSync(BLOG_MDX_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function readMdxBlogRaw(slug: string): string | null {
  const f = join(BLOG_MDX_DIR, `${slug}.mdx`);
  if (!existsSync(f)) return null;
  return readFileSync(f, 'utf8');
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
  return createPageMetadata({
    title: metaTitle,
    description: fm.description,
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
      alt: fm.coverAlt,
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
  };
}

export function resolveMdxCoverUrl(cover: string): string {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  if (cover.startsWith('http')) return cover;
  const path = cover.startsWith('/') ? cover : `/${cover}`;
  return `${base}${path}`;
}

export function mergeBlogSlugsForStaticParams(jsonSlugs: string[]): string[] {
  const mdxSlugs = getAllMdxBlogSlugs();
  return [...new Set([...mdxSlugs, ...jsonSlugs])];
}
