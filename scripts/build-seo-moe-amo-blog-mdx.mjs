/**
 * Génère les MDX blog 04–09 depuis docs/seo-moe-amo/*.md (one-shot local).
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd());
const SRC_DIR = path.join(ROOT, 'docs/seo-moe-amo');
const OUT_DIR = path.join(ROOT, 'content/blog');
const PUBLISH = '2026-11-11';
const COVER = '/images/og-default-formation-ia-btp.jpg';

const FILES = [
  { src: '04-article-ia-maitrise-oeuvre-usages.md', slug: 'ia-maitrise-oeuvre-usages', readingTime: '9 min' },
  { src: '05-article-ia-amo.md', slug: 'ia-amo-assistant-maitrise-ouvrage', readingTime: '7 min' },
  { src: '06-tuto-controle-situation-travaux-ia.md', slug: 'tuto-controle-situation-travaux-ia', readingTime: '6 min' },
  { src: '07-tuto-avenant-ordre-de-service-ia.md', slug: 'tuto-avenant-ordre-de-service-ia', readingTime: '6 min' },
  { src: '08-tuto-depouillement-offres-ia.md', slug: 'tuto-depouillement-offres-ia', readingTime: '7 min' },
  { src: '09-tuto-skill-claude-maitrise-oeuvre.md', slug: 'tuto-skill-claude-maitrise-oeuvre', readingTime: '6 min' },
];

function parseMeta(lines) {
  let seoTitle = '';
  let description = '';
  let keywords = [];
  for (const line of lines) {
    const mt = /^Meta Title\s*:\s*(.+?)\s*(?:\*\([^)]*\)\*)?$/.exec(line.trim());
    if (mt) seoTitle = mt[1].trim();
    const md = /^Meta Description\s*:\s*(.+?)\s*(?:\*\([^)]*\)\*)?$/.exec(line.trim());
    if (md) description = md[1].trim();
    const mk = /^Mot-clé principal\s*:\s*(.+?)(?:\s*·\s*Secondaires\s*:\s*(.+))?$/.exec(line.trim());
    if (mk) {
      keywords = [mk[1].trim()];
      if (mk[2]) {
        keywords.push(
          ...mk[2]
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        );
      }
    }
  }
  return { seoTitle, description, keywords };
}

function extractH1(lines) {
  for (const line of lines) {
    const m = /^#\s+(.+)$/.exec(line.trim());
    if (m) return m[1].trim();
  }
  return '';
}

function extractEnBref(lines) {
  for (const line of lines) {
    const m = /^\*\*En bref\*\*\s*:\s*(.+)$/.exec(line.trim());
    if (m) return m[1].trim();
  }
  return '';
}

function extractFaq(lines) {
  const faq = [];
  let inFaq = false;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (/^##\s+FAQ\s*$/.test(t)) {
      inFaq = true;
      continue;
    }
    if (inFaq && /^##\s+/.test(t) && !/^##\s+FAQ/.test(t)) break;
    if (inFaq && t.startsWith('**') && t.endsWith('**') && !t.includes('En bref')) {
      const q = t.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      if (!q.endsWith('?')) continue;
      const aLines = [];
      for (let j = i + 1; j < lines.length; j++) {
        const n = lines[j].trim();
        if (!n) continue;
        if (n.startsWith('**') && n.endsWith('**')) break;
        if (n.startsWith('## ') || n.startsWith('---')) break;
        aLines.push(n);
      }
      const a = aLines.join(' ').trim();
      if (q && a) faq.push({ question: q, answer: a });
    }
  }
  return faq;
}

function cleanBody(lines) {
  const out = [];
  let skipUntilContent = true;
  for (const line of lines) {
    const t = line.trim();
    if (skipUntilContent) {
      if (t.startsWith('Meta ') || t.startsWith('URL :') || t.startsWith('Mot-clé') || t.startsWith('Schema :'))
        continue;
      if (/^\*Temps de lecture/.test(t)) continue;
      if (t.startsWith('# ')) continue;
      if (/^\*\*En bref\*\*/.test(t)) continue;
      if (t === '---') {
        skipUntilContent = false;
        continue;
      }
      if (!t && out.length === 0) continue;
      if (t && !skipUntilContent) out.push(line);
      if (t === '---' && out.length > 0) break;
      continue;
    }
    if (t === '---' && out.length > 0) break;
    if (/^##\s+FAQ\s*$/.test(t)) break;
    if (/^\*\*À propos de l'auteure\*\*/.test(t)) break;
    if (/^👉\s*\[/.test(t)) continue;
    out.push(line);
  }
  return transformCtas(out.join('\n').trim());
}

function transformCtas(body) {
  return body
    .replace(
      /^>\s*\*\*([^*]+)\*\*\s*\[([^\]]+)\]\(\/prendre-rdv\?src=([^)]+)\)\s*$/gm,
      (_, label, _linkLabel, src) =>
        `<BlogCtaVisio src="${src}" label="${label.trim()}" />`,
    )
    .replace(
      /^>\s*\*\*([^*]+)\?\*\*\s*\[([^\]]+)\]\(\/prendre-rdv\?src=([^)]+)\)\s*$/gm,
      (_, label, _linkLabel, src) =>
        `<BlogCtaVisio src="${src}" label="${label.trim()}" />`,
    )
    .replace(
      /^>\s*\*\*([^*]+)\*\*\s*\[Réservez[^\]]*\]\(\/prendre-rdv\?src=([^)]+)\)\s*$/gm,
      (_, label, src) => `<BlogCtaVisio src="${src}" label="${label.trim()}" />`,
    );
}

function yamlEscape(s) {
  return JSON.stringify(s);
}

for (const { src, slug, readingTime } of FILES) {
  const raw = fs.readFileSync(path.join(SRC_DIR, src), 'utf8');
  const lines = raw.split('\n');
  const title = extractH1(lines);
  const { seoTitle, description, keywords } = parseMeta(lines);
  const enBref = extractEnBref(lines);
  const faq = extractFaq(lines);
  const body = cleanBody(lines);

  const related =
    slug === 'ia-maitrise-oeuvre-usages'
      ? ['tuto-depouillement-offres-ia', 'tuto-controle-situation-travaux-ia', 'formation-ia-btp-guide-complet-2026']
      : slug === 'ia-amo-assistant-maitrise-ouvrage'
        ? ['tuto-depouillement-offres-ia', 'ia-maitrise-oeuvre-usages']
        : slug.includes('tuto')
          ? ['ia-maitrise-oeuvre-usages', 'ia-amo-assistant-maitrise-ouvrage']
          : [];

  let fm = `---
title: ${yamlEscape(title)}
seoTitle: ${yamlEscape(seoTitle)}
description: ${yamlEscape(description)}
slug: ${slug}
publishedAt: "${PUBLISH}"
updatedAt: "${PUBLISH}"
cover: ${COVER}
coverAlt: ${yamlEscape(title.slice(0, 120))}
keywords:
${keywords.map((k) => `  - ${yamlEscape(k).slice(1, -1)}`).join('\n')}
readingTime: "${readingTime}"
hideEndCta: true
`;

  if (enBref) {
    fm += `enBref: ${yamlEscape(enBref)}\n`;
  }
  if (related.length) {
    fm += `relatedSlugs:\n${related.map((s) => `  - ${s}`).join('\n')}\n`;
  }
  if (faq.length) {
    fm += `faq:\n`;
    for (const { question, answer } of faq) {
      fm += `  - question: ${yamlEscape(question)}\n    answer: ${yamlEscape(answer)}\n`;
    }
  }
  fm += `---\n\n`;

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.mdx`), fm + body + '\n', 'utf8');
  console.log('Wrote', slug);
}
