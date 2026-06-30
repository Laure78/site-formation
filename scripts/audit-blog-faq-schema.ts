/**
 * Audit : articles blog avec FAQ visible mais sans JSON-LD FAQPage (min 3 Q/R).
 * Usage : npx tsx scripts/audit-blog-faq-schema.ts
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import {
  extractFaqPairsForFaqPageJsonLd,
  getAllArticles,
  isFaqSectionHeading,
  extractFaqPairsFromHtmlSection,
  type BlogArticle,
} from '../lib/blog';
import { buildBlogFaqPageJsonLd } from '../lib/blog-faq-page-jsonld';
import { getMdxBlogFaqFromFrontmatter, getAllMdxBlogSlugs } from '../lib/blog-mdx';
import { FAQ_SCHEMA_MIN } from '../lib/seo';

function countVisibleFaqInSections(article: BlogArticle): number {
  let count = 0;
  for (const section of article.sections) {
    if (section.type === 'faq' && Array.isArray(section.content)) {
      count += section.content.filter(
        (item) => typeof item === 'string' && item.trim().length > 0
      ).length;
    }
    if (
      section.type === 'html' &&
      typeof section.content === 'string' &&
      isFaqSectionHeading(section.title)
    ) {
      count += extractFaqPairsFromHtmlSection(section.content).length;
    }
  }
  return count;
}

function extractMdxBodyFaqPairs(body: string): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];
  const lines = body.split('\n');
  let inFaq = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      const title = h2[1].toLowerCase();
      inFaq = /\bfaq\b/.test(title) || title.includes('questions fréquentes');
      continue;
    }
    if (!inFaq) continue;
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h3) {
      const q = h3[1].trim();
      const answerLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j].trim();
        if (/^#{1,3}\s+/.test(next)) break;
        if (next) answerLines.push(next);
      }
      const a = answerLines.join(' ').trim();
      if (q && a) pairs.push({ q, a });
      continue;
    }
    const boldQ = /^\*\*(.+?)\*\*$/.exec(line);
    if (boldQ && inFaq) {
      const q = boldQ[1].trim();
      const answerLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j].trim();
        if (/^#{1,3}\s+/.test(next) || /^\*\*.+\*\*$/.test(next)) break;
        if (next) answerLines.push(next);
      }
      const a = answerLines.join(' ').trim();
      if (q && a) pairs.push({ q, a });
    }
  }
  return pairs;
}

type Gap = {
  slug: string;
  visibleCount: number;
  schemaCount: number;
  source: 'ts' | 'mdx';
};

const gaps: Gap[] = [];

for (const article of getAllArticles()) {
  if (hasMdxBlogFileLocal(article.slug)) continue;
  const visible = countVisibleFaqInSections(article);
  if (visible === 0) continue;
  const pairs = extractFaqPairsForFaqPageJsonLd(article);
  const schema = buildBlogFaqPageJsonLd(
    pairs.map(({ q, a }) => ({ question: q, answer: a }))
  );
  if (schema == null) {
    gaps.push({
      slug: article.slug,
      visibleCount: visible,
      schemaCount: pairs.length,
      source: 'ts',
    });
  }
}

const mdxDir = join(process.cwd(), 'content', 'blog');
for (const slug of getAllMdxBlogSlugs()) {
  const raw = readFileSync(join(mdxDir, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  const fmFaq = getMdxBlogFaqFromFrontmatter(data as Parameters<typeof getMdxBlogFaqFromFrontmatter>[0]);
  const bodyFaq = extractMdxBodyFaqPairs(content);
  const visible = bodyFaq.length > 0 ? bodyFaq.length : 0;
  if (visible === 0) continue;
  const schema = buildBlogFaqPageJsonLd(
    fmFaq.map(({ question, answer }) => ({ question, answer }))
  );
  if (schema == null) {
    gaps.push({
      slug,
      visibleCount: visible,
      schemaCount: fmFaq.length,
      source: 'mdx',
    });
  }
}

function hasMdxBlogFileLocal(slug: string): boolean {
  return existsSync(join(mdxDir, `${slug}.mdx`));
}

console.log(`FAQ_SCHEMA_MIN = ${FAQ_SCHEMA_MIN}\n`);
if (gaps.length === 0) {
  console.log('Aucun article avec FAQ visible sans FAQPage schema.');
} else {
  console.log('Articles avec FAQ visible SANS FAQPage schema :\n');
  for (const g of gaps) {
    console.log(
      `- /blog/${g.slug} (${g.source}) — visible: ${g.visibleCount}, schema pairs: ${g.schemaCount}`
    );
  }
}
