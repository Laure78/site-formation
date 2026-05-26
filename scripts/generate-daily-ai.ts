#!/usr/bin/env npx tsx
/**
 * Génération avec enrichissement IA (OpenAI)
 * Usage: npm run media:generate:ai
 *
 * Nécessite OPENAI_API_KEY. Génère des articles plus détaillés.
 */

import OpenAI from 'openai';
import { generateDailyIdeas } from '../lib/media-machine/trends';
import { generateArticle } from '../lib/media-machine/article-generator';
import { generateLinkedInPost } from '../lib/media-machine/linkedin-generator';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'content', 'generated');

async function enrichWithAI(article: ReturnType<typeof generateArticle>): Promise<void> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.warn('OPENAI_API_KEY manquant — article non enrichi');
    return;
  }

  const openai = new OpenAI({ apiKey: key });

  for (let i = 0; i < article.sections.length; i++) {
    const s = article.sections[i];
    if (s.type !== 'paragraph' && s.type !== 'definition') continue;
    const raw = typeof s.content === 'string' ? s.content : (Array.isArray(s.content) && typeof s.content[0] === 'string' ? s.content[0] : null);
    if (!raw || raw.length > 200) continue;
    const content = raw;

    try {
      const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              "Tu enrichis du contenu pour un article de blog formation IA appliquée au bâtiment. Garde le même ton professionnel. Réponds en 2-3 phrases max. Pas d'intro redondante.",
          },
          {
            role: 'user',
            content: `Enrichis ce paragraphe pour un article sur «${article.title}» :\n\n${content}`,
          },
        ],
        temperature: 0.4,
        max_tokens: 150,
      });
      const enriched = res.choices[0]?.message?.content?.trim();
      if (enriched) {
        article.sections[i] = { ...s, content: enriched };
      }
    } catch (e) {
      console.warn(`Enrichissement section ${i} échoué:`, e);
    }
  }
}

async function main() {
  const ideas = generateDailyIdeas(10);
  mkdirSync(OUT_DIR, { recursive: true });

  const linkedinPosts: unknown[] = [];
  const useAI = !!process.env.OPENAI_API_KEY;

  for (let i = 0; i < ideas.length; i++) {
    const idea = ideas[i];
    const article = generateArticle(idea);

    if (useAI) {
      await enrichWithAI(article);
    }

    const artPath = join(OUT_DIR, `article-${article.slug}.json`);
    writeFileSync(artPath, JSON.stringify(article, null, 2), 'utf-8');

    const post = generateLinkedInPost(idea);
    linkedinPosts.push(post);

    console.log(`  ${i + 1}/${ideas.length} ${article.title}`);
  }

  const summary = {
    date: new Date().toISOString().slice(0, 10),
    articles: ideas.map((i) => ({ slug: i.slug, title: i.title })),
    linkedinCount: linkedinPosts.length,
    enrichedWithAI: useAI,
  };

  writeFileSync(join(OUT_DIR, 'daily-summary.json'), JSON.stringify(summary, null, 2), 'utf-8');
  writeFileSync(join(OUT_DIR, 'linkedin-posts.json'), JSON.stringify(linkedinPosts, null, 2), 'utf-8');

  console.log(`✓ ${ideas.length} articles + ${linkedinPosts.length} posts LinkedIn${useAI ? ' (enrichis IA)' : ''}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
