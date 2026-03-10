#!/usr/bin/env npx tsx
/**
 * Script Trend Discovery — Génère 10 idées de contenu par jour
 * Usage: npm run media:trends
 */

import { generateDailyIdeas } from '../lib/media-machine/trends';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'content', 'generated');

function main() {
  const ideas = generateDailyIdeas(10);
  mkdirSync(OUT_DIR, { recursive: true });

  const output = {
    generatedAt: new Date().toISOString(),
    count: ideas.length,
    ideas,
  };

  const path = join(OUT_DIR, `trends-${new Date().toISOString().slice(0, 10)}.json`);
  writeFileSync(path, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`✓ ${ideas.length} idées générées : ${path}`);
  ideas.forEach((i, idx) => console.log(`  ${idx + 1}. ${i.title}`));
}

main();
