#!/usr/bin/env npx tsx
/**
 * Publication — Copie les articles générés vers le blog
 * Usage: npm run media:publish
 *
 * Lit content/generated/article-*.json et les fusionne
 * avec les articles existants pour prévisualisation.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const GEN_DIR = join(process.cwd(), 'content', 'generated');

function loadGeneratedArticles(): Record<string, unknown>[] {
  try {
    const files = readdirSync(GEN_DIR).filter((f) => f.startsWith('article-') && f.endsWith('.json'));
    return files.map((f) => {
      const raw = readFileSync(join(GEN_DIR, f), 'utf-8');
      return JSON.parse(raw);
    });
  } catch {
    return [];
  }
}

function main() {
  const articles = loadGeneratedArticles();
  if (articles.length === 0) {
    console.log('Aucun article généré. Lancez d\'abord: npm run media:generate');
    return;
  }

  console.log(`${articles.length} article(s) prêts à publier :`);
  articles.forEach((a) => console.log(`  - ${a.slug} : ${a.title}`));
  console.log('\n→ Les articles sont dans content/generated/');
  console.log('→ Pour les intégrer au blog, fusionnez avec lib/blog.ts');
  console.log('→ Ou utilisez le dashboard admin pour valider et publier.');
}

main();
