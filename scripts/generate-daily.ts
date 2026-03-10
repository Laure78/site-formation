#!/usr/bin/env npx tsx
/**
 * Pipeline quotidien — Trends → Articles → LinkedIn
 * Usage: npm run media:generate
 */

import { generateDailyIdeas } from '../lib/media-machine/trends';
import { generateArticle } from '../lib/media-machine/article-generator';
import { generateLinkedInPost } from '../lib/media-machine/linkedin-generator';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'content', 'generated');

function main() {
  const ideas = generateDailyIdeas(10);
  mkdirSync(OUT_DIR, { recursive: true });

  const articles: Record<string, unknown>[] = [];
  const linkedinPosts: unknown[] = [];

  for (const idea of ideas) {
    const article = generateArticle(idea);
    const post = generateLinkedInPost(idea);

    articles.push({
      ...article,
      internalLinks: article.internalLinks,
    });
    linkedinPosts.push(post);

    const artPath = join(OUT_DIR, `article-${article.slug}.json`);
    writeFileSync(artPath, JSON.stringify(article, null, 2), 'utf-8');
  }

  const summary = {
    date: new Date().toISOString().slice(0, 10),
    articles: articles.map((a) => ({ slug: a.slug, title: a.title })),
    linkedinCount: linkedinPosts.length,
  };

  writeFileSync(
    join(OUT_DIR, 'daily-summary.json'),
    JSON.stringify(summary, null, 2),
    'utf-8'
  );
  writeFileSync(
    join(OUT_DIR, 'linkedin-posts.json'),
    JSON.stringify(linkedinPosts, null, 2),
    'utf-8'
  );

  console.log(`✓ ${articles.length} articles + ${linkedinPosts.length} posts LinkedIn`);
  console.log(`  → content/generated/`);
}

main();
