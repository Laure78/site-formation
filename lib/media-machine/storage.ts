/**
 * Stockage local — Lecture des articles générés
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const GEN_DIR = join(process.cwd(), 'content', 'generated');

export interface StoredArticle {
  slug: string;
  title: string;
  keywords: string[];
  date: string;
  internalLinks?: { path: string; anchor: string }[];
}

export interface StoredSummary {
  date: string;
  articles: { slug: string; title: string }[];
  linkedinCount: number;
}

export function getGeneratedArticles(): StoredArticle[] {
  if (!existsSync(GEN_DIR)) return [];
  try {
    const files = readdirSync(GEN_DIR).filter(
      (f) => f.startsWith('article-') && f.endsWith('.json')
    );
    return files.map((f) => {
      const raw = readFileSync(join(GEN_DIR, f), 'utf-8');
      const a = JSON.parse(raw);
      return { slug: a.slug, title: a.title, keywords: a.keywords ?? [], date: a.date, internalLinks: a.internalLinks };
    });
  } catch {
    return [];
  }
}

export function getDailySummary(): StoredSummary | null {
  const path = join(GEN_DIR, 'daily-summary.json');
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}
