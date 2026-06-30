/**
 * Audit FAQ visible vs FAQPage schema (min 3 Q/R).
 * Usage : node scripts/audit-blog-faq-schema.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FAQ_MIN = 3;

function isFaqTitle(t) {
  if (!t) return false;
  const x = t.toLowerCase();
  return /\bfaq\b/.test(x) || x.includes('questions fréquentes');
}

function htmlPairs(html) {
  const pairs = [];
  const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = html.split(/<h3\b[^>]*>/i);
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const end = chunk.search(/<\/h3>/i);
    if (end < 0) continue;
    const q = strip(chunk.slice(0, end));
    const after = chunk.slice(end + 5);
    const m = /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(after);
    const a = m ? strip(m[1]) : '';
    if (q && a) pairs.push({ q, a });
  }
  return pairs;
}

function visibleFromSections(sections) {
  let n = 0;
  for (const s of sections || []) {
    if (s.type === 'faq' && Array.isArray(s.content)) {
      n += s.content.filter((x) => typeof x === 'string' && x.trim()).length;
    }
    if (s.type === 'html' && typeof s.content === 'string' && isFaqTitle(s.title)) {
      n += htmlPairs(s.content).length;
    }
  }
  return n;
}

function schemaPairs(article) {
  const pairs = [];
  if (article.faq?.length) {
    for (const { question, answer } of article.faq) {
      const q = (question || '').trim();
      const a = (answer || '').trim();
      if (q && a) pairs.push({ q, a });
    }
    if (pairs.length) return pairs;
  }
  for (const s of article.sections || []) {
    if (s.type === 'faq' && Array.isArray(s.content)) {
      for (const item of s.content) {
        if (typeof item !== 'string') continue;
        const sep = item.indexOf(' — ');
        const q = sep >= 0 ? item.slice(0, sep).trim() : item.trim();
        const a = sep >= 0 ? item.slice(sep + 3).trim() : '';
        if (q && a) pairs.push({ q, a });
      }
    }
    if (s.type === 'html' && typeof s.content === 'string' && isFaqTitle(s.title)) {
      pairs.push(...htmlPairs(s.content));
    }
  }
  return pairs;
}

function mdxBodyFaq(body) {
  const pairs = [];
  const lines = body.split('\n');
  let inFaq = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      const t = h2[1].toLowerCase();
      inFaq = /\bfaq\b/.test(t) || t.includes('questions fréquentes');
      continue;
    }
    if (!inFaq) continue;
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h3) {
      const q = h3[1].trim();
      const ans = [];
      for (let j = i + 1; j < lines.length; j++) {
        const n = lines[j].trim();
        if (/^#{1,3}\s+/.test(n)) break;
        if (n) ans.push(n);
      }
      const a = ans.join(' ').trim();
      if (q && a) pairs.push({ q, a });
      continue;
    }
    const bq = /^\*\*(.+?)\*\*$/.exec(line);
    if (bq) {
      const q = bq[1].trim();
      const ans = [];
      for (let j = i + 1; j < lines.length; j++) {
        const n = lines[j].trim();
        if (/^#{1,3}\s+/.test(n) || /^\*\*.+\*\*$/.test(n)) break;
        if (n) ans.push(n);
      }
      const a = ans.join(' ').trim();
      if (q && a) pairs.push({ q, a });
    }
  }
  return pairs;
}

/** Parse TS blog article arrays from lib/*.ts (slug + sections + faq). */
function loadTsArticlesFromLib() {
  const files = [
    'lib/blog.ts',
    'lib/blog-claude-btp-2026-articles.ts',
    'lib/blog-lsr-ao-modules-articles.ts',
    'lib/blog-ia-devis-batiment-chiffrage-automatise.ts',
    'lib/blog-formation-ia-cctp-pillar.ts',
  ];
  const articles = [];
  const slugRe = /slug:\s*['"]([^'"]+)['"]/g;
  for (const rel of files) {
    const src = readFileSync(join(ROOT, rel), 'utf8');
    const chunks = src.split(/\n\s*slug:\s*['"]/);
    for (let i = 1; i < chunks.length; i++) {
      const slug = chunks[i].match(/^([^'"]+)['"]/)?.[1];
      if (!slug) continue;
      let faq = [];
      const faqBlock = chunks[i].match(/\n\s*faq:\s*\[([\s\S]*?)\n\s*\],/);
      if (faqBlock) {
        const qRe = /question:\s*['"]([^'"]+)['"][\s\S]*?answer:\s*(?:'([^']*)'|`([^`]*)`)/g;
        let m;
        while ((m = qRe.exec(faqBlock[1]))) {
          faq.push({ question: m[1], answer: (m[2] ?? m[3] ?? '').trim() });
        }
      }
      const sections = [];
      const faqSecRe =
        /type:\s*'faq'[\s\S]*?content:\s*\[([\s\S]*?)\n\s*\],/g;
      let sm;
      while ((sm = faqSecRe.exec(chunks[i]))) {
        const items = [...sm[1].matchAll(/'([^']*(?:\\'[^']*)*)'/g)].map((x) =>
          x[1].replace(/\\'/g, "'")
        );
        sections.push({ type: 'faq', title: 'FAQ', content: items });
      }
      const htmlFaqRe =
        /type:\s*'html'[\s\S]*?title:\s*['"]([^'"]*(?:FAQ|Questions fréquentes)[^'"]*)['"][\s\S]*?content:\s*`([\s\S]*?)`/g;
      let hm;
      while ((hm = htmlFaqRe.exec(chunks[i]))) {
        sections.push({ type: 'html', title: hm[1], content: hm[2] });
      }
      articles.push({ slug, faq, sections });
    }
  }
  return articles;
}

const gaps = [];
const mdxDir = join(ROOT, 'content/blog');
const mdxSlugs = existsSync(mdxDir)
  ? readdirSync(mdxDir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
  : new Set();

const mdxSet = new Set(mdxSlugs);

// Generated JSON
const genDir = join(ROOT, 'content/generated');
if (existsSync(genDir)) {
  for (const f of readdirSync(genDir).filter((x) => x.startsWith('article-') && x.endsWith('.json'))) {
    let a;
    try {
      a = JSON.parse(readFileSync(join(genDir, f), 'utf8'));
    } catch {
      continue;
    }
    if (mdxSet.has(a.slug)) continue;
    const vis = visibleFromSections(a.sections);
    if (!vis) continue;
    const sp = schemaPairs(a);
    if (sp.length < FAQ_MIN) gaps.push({ slug: a.slug, vis, schema: sp.length, src: 'generated' });
  }
}

// TS lib articles (parsed)
for (const a of loadTsArticlesFromLib()) {
  if (mdxSet.has(a.slug)) continue;
  const vis = visibleFromSections(a.sections);
  if (!vis) continue;
  const sp = schemaPairs(a);
  if (sp.length < FAQ_MIN) gaps.push({ slug: a.slug, vis, schema: sp.length, src: 'ts' });
}

// MDX
for (const slug of mdxSlugs) {
  const raw = readFileSync(join(mdxDir, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  const fm = (data.faq ?? data.faqItems ?? []).map((it) =>
    'q' in it ? { question: it.q, answer: it.a } : it
  );
  const body = mdxBodyFaq(content);
  if (!body.length) continue;
  if (fm.filter((x) => x.question?.trim() && x.answer?.trim()).length < FAQ_MIN) {
    gaps.push({
      slug,
      vis: body.length,
      schema: fm.length,
      src: 'mdx',
    });
  }
}

console.log(`FAQ_SCHEMA_MIN = ${FAQ_MIN}\n`);
if (!gaps.length) {
  console.log('Aucun article avec FAQ visible sans FAQPage schema.');
} else {
  const uniq = [...new Map(gaps.map((g) => [g.slug, g])).values()];
  console.log(`${uniq.length} article(s) avec FAQ visible SANS FAQPage schema :\n`);
  for (const g of uniq.sort((a, b) => a.slug.localeCompare(b.slug))) {
    console.log(`- /blog/${g.slug} [${g.src}] — FAQ visible: ${g.vis}, paires schema: ${g.schema}`);
  }
}
