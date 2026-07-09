/**
 * FAQ MDX — lecture fichier + extraction Q/R (sans compilateur MDX).
 * Utilisé par JSON-LD FAQPage et scripts de validation.
 */
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { FAQ_SCHEMA_MIN } from '@/lib/seo';

export const BLOG_MDX_DIR = join(process.cwd(), 'content', 'blog');

export type BlogMdxFaqItem = { q: string; a: string } | { question: string; answer: string };

export type BlogFaqFrontmatterPair = { question: string; answer: string };

export type BlogMdxFrontmatterFaq = {
  faq?: BlogFaqFrontmatterPair[];
  faqItems?: BlogMdxFaqItem[];
};

export function hasMdxBlogFile(slug: string): boolean {
  return existsSync(join(BLOG_MDX_DIR, `${slug}.mdx`));
}

export function readMdxBlogRaw(slug: string): string | null {
  const file = join(BLOG_MDX_DIR, `${slug}.mdx`);
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8');
}

export function getAllMdxBlogSlugs(): string[] {
  if (!existsSync(BLOG_MDX_DIR)) return [];
  return readdirSync(BLOG_MDX_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

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
export function getMdxBlogFaqFromFrontmatter(fm: BlogMdxFrontmatterFaq): BlogFaqFrontmatterPair[] {
  return normalizeFaqItems(fm.faq ?? fm.faqItems);
}

function isMdxFaqSectionHeading(title: string): boolean {
  const t = title.toLowerCase().trim();
  return /\bfaq\b/.test(t) || t.includes('questions fréquentes');
}

/**
 * Extrait les paires Q/R d'une section `## FAQ` / `## Questions fréquentes` du corps MDX.
 */
export function extractFaqPairsFromMdxMarkdownBody(body: string): BlogFaqFrontmatterPair[] {
  const pairs: BlogFaqFrontmatterPair[] = [];
  const lines = body.split('\n');
  let inFaq = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      inFaq = isMdxFaqSectionHeading(h2[1]);
      continue;
    }
    if (!inFaq) continue;

    const h3 = /^###\s+(.+)$/.exec(line);
    if (h3) {
      const question = h3[1].trim();
      const answerLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j].trim();
        if (/^#{1,3}\s+/.test(next)) break;
        if (next) answerLines.push(next);
      }
      const answer = answerLines.join(' ').trim();
      if (question && answer) pairs.push({ question, answer });
      continue;
    }

    const boldQ = /^\*\*(.+?)\*\*$/.exec(line);
    if (boldQ) {
      const question = boldQ[1].trim();
      const answerLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j].trim();
        if (/^#{1,3}\s+/.test(next) || /^\*\*.+\*\*$/.test(next)) break;
        if (next) answerLines.push(next);
      }
      const answer = answerLines.join(' ').trim();
      if (question && answer) pairs.push({ question, answer });
    }
  }

  return pairs;
}

/** Paires FAQ pour JSON-LD — frontmatter prioritaire si ≥ 3 Q/R, sinon corps MDX. */
export function resolveMdxBlogFaqPairs(slug: string): BlogFaqFrontmatterPair[] {
  const raw = readMdxBlogRaw(slug);
  if (!raw) return [];
  const { data, content } = matter(raw);
  const fm = data as BlogMdxFrontmatterFaq;
  const isValid = ({ question, answer }: BlogFaqFrontmatterPair) =>
    question.trim().length > 0 && answer.trim().length > 0;

  const fromFrontmatter = getMdxBlogFaqFromFrontmatter(fm).filter(isValid);
  const fromBody = extractFaqPairsFromMdxMarkdownBody(content).filter(isValid);

  if (fromFrontmatter.length >= FAQ_SCHEMA_MIN) return fromFrontmatter;
  if (fromBody.length >= FAQ_SCHEMA_MIN) return fromBody;
  return fromFrontmatter.length >= fromBody.length ? fromFrontmatter : fromBody;
}

export function mergeBlogSlugsForStaticParams(jsonSlugs: string[]): string[] {
  const mdxSlugs = getAllMdxBlogSlugs();
  return [...new Set([...mdxSlugs, ...jsonSlugs])];
}
