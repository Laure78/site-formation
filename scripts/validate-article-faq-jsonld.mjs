/**
 * Validation JSON-LD FAQPage — articles blog avec section FAQ.
 * Usage : node scripts/validate-article-faq-jsonld.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FAQ_MIN = 3;
const FAQ_MAX = 24;

function faqAnswerPlainTextForSchema(text) {
  if (!text.includes('<')) return text;
  return text
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildFaqPageSchema(pairs) {
  const items = pairs
    .map(({ q, a }) => {
      const question = q.trim();
      const answer = faqAnswerPlainTextForSchema(a.trim()).trim();
      if (!question || !answer) return null;
      return { q: question, a: answer };
    })
    .filter(Boolean)
    .slice(0, FAQ_MAX);

  if (items.length < FAQ_MIN) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainTextForSchema(item.a).trim(),
      },
    })),
  };
}

function assertFaqPageSchema(schema, label) {
  if (schema['@context'] !== 'https://schema.org') {
    throw new Error(`${label}: @context schema.org requis`);
  }
  if (schema['@type'] !== 'FAQPage') {
    throw new Error(`${label}: @type FAQPage attendu`);
  }
  const mainEntity = schema.mainEntity;
  if (!Array.isArray(mainEntity)) {
    throw new Error(`${label}: mainEntity doit être un tableau`);
  }
  if (mainEntity.length < FAQ_MIN) {
    throw new Error(`${label}: minimum ${FAQ_MIN} questions`);
  }
  for (const [i, node] of mainEntity.entries()) {
    if (node['@type'] !== 'Question') throw new Error(`${label}: Q${i + 1} @type Question`);
    if (!node.name?.trim()) throw new Error(`${label}: Q${i + 1} name manquant`);
    const ans = node.acceptedAnswer;
    if (ans?.['@type'] !== 'Answer') throw new Error(`${label}: Q${i + 1} Answer manquant`);
    if (!ans.text?.trim()) throw new Error(`${label}: Q${i + 1} text manquant`);
  }
}

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

function schemaPairsFromArticle(article) {
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
    }
  }
  return pairs;
}

function resolveMdxFaqPairs(slug, mdxDir) {
  const raw = readFileSync(join(mdxDir, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  const fromFm = (data.faq ?? data.faqItems ?? []).map((it) =>
    'q' in it ? { q: it.q.trim(), a: it.a.trim() } : { q: it.question.trim(), a: it.answer.trim() }
  ).filter((x) => x.q && x.a);
  const fromBody = mdxBodyFaq(content);
  if (fromFm.length >= FAQ_MIN) return fromFm;
  if (fromBody.length >= FAQ_MIN) return fromBody;
  return fromFm.length >= fromBody.length ? fromFm : fromBody;
}

function loadTsArticlesFromLib() {
  const files = [
    'lib/blog.ts',
    'lib/blog-claude-btp-2026-articles.ts',
    'lib/blog-lsr-ao-modules-articles.ts',
    'lib/blog-ia-devis-batiment-chiffrage-automatise.ts',
    'lib/blog-formation-ia-cctp-pillar.ts',
  ];
  const articles = [];
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
      const faqSecRe = /type:\s*'faq'[\s\S]*?content:\s*\[([\s\S]*?)\n\s*\],/g;
      let sm;
      while ((sm = faqSecRe.exec(chunks[i]))) {
        const items = [...sm[1].matchAll(/'([^']*(?:\\'[^']*)*)'/g)].map((x) =>
          x[1].replace(/\\'/g, "'")
        );
        sections.push({ type: 'faq', content: items });
      }
      articles.push({ slug, faq, sections });
    }
  }
  return articles;
}

const REDIRECTED = new Set(['ia-devis-gain-temps-pme-btp', 'memoire-technique-btp-ia-gagner-temps-appels-offres']);
const equipped = [];
const mdxDir = join(ROOT, 'content/blog');
const mdxSlugs = existsSync(mdxDir)
  ? readdirSync(mdxDir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
  : [];
const mdxSet = new Set(mdxSlugs);
const seen = new Set();

function tryEquip(slug, pairs) {
  if (REDIRECTED.has(slug) || seen.has(slug)) return;
  const schema = buildFaqPageSchema(pairs);
  if (!schema) return;
  seen.add(slug);
  equipped.push({ slug, path: `/blog/${slug}`, questionCount: schema.mainEntity.length, schema });
}

for (const slug of mdxSlugs) {
  tryEquip(slug, resolveMdxFaqPairs(slug, mdxDir));
}

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
    tryEquip(a.slug, schemaPairsFromArticle(a));
  }
}

for (const a of loadTsArticlesFromLib()) {
  if (mdxSet.has(a.slug)) continue;
  tryEquip(a.slug, schemaPairsFromArticle(a));
}

equipped.sort((a, b) => a.slug.localeCompare(b.slug, 'fr'));

console.log(`\nArticles blog équipés FAQPage JSON-LD : ${equipped.length}\n`);

let ok = true;
for (const { path, questionCount, schema, slug } of equipped) {
  const label = `${path} (${questionCount} Q)`;
  try {
    JSON.stringify(schema);
    assertFaqPageSchema(schema, label);
    console.log(`✓ ${label}`);
  } catch (err) {
    ok = false;
    console.error(`✗ ${label}:`, err.message);
  }
}

console.log('\n--- Liste des articles équipés ---');
for (const { path, questionCount } of equipped) {
  console.log(`  ${path}  (${questionCount} questions)`);
}

if (!ok) process.exit(1);
console.log(`\nValidation FAQPage OK — ${equipped.length} article(s) blog.`);
