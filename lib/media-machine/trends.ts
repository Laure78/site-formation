/**
 * Trend discovery — Idées de contenu basées sur tendances
 * Structure prête pour : Google Trends API, LinkedIn, veille
 */

import { TOPIC_CLUSTERS, METIERS } from './clusters';

export interface ContentIdea {
  id: string;
  title: string;
  slug: string;
  clusterId: string;
  keywords: string[];
  source: 'cluster' | 'trend' | 'linkedin';
  score: number; // 1-10 pertinence
  generatedAt: string;
}

const SEED_TITLES: string[] = [
  'Comment utiliser ChatGPT pour vos devis {metier}',
  'IA et {metier} : 5 gains de temps concrets',
  'Formation IA BTP : ce qu\'il faut savoir en 2026',
  'Financement Constructys : mode d\'emploi',
  'ChatGPT pour artisans : erreurs à éviter',
  'Devis en 15 min : le guide {metier}',
  'L\'IA va-t-elle remplacer les {metier}s ?',
  'Automatiser vos emails clients avec l\'IA',
  'Appels d\'offres BTP : l\'IA comme assistant',
  'Recrutement BTP : l\'IA pour attirer les talents',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Offset basé sur la date pour varier les articles chaque jour */
function getDayOffset(): number {
  const d = new Date();
  return d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
}

export function generateDailyIdeas(count = 10): ContentIdea[] {
  const ideas: ContentIdea[] = [];
  const used = new Set<string>();
  const now = new Date().toISOString();
  const offset = getDayOffset();

  for (let i = 0; i < count; i++) {
    const j = (i + offset) % Math.max(TOPIC_CLUSTERS.length * 3, METIERS.length * 2);
    const cluster = TOPIC_CLUSTERS[(i + offset) % TOPIC_CLUSTERS.length];
    const subTopic = cluster.subTopics[(j + i) % cluster.subTopics.length];
    const metier = METIERS[(i + offset) % METIERS.length];
    const template = SEED_TITLES[(j + offset) % SEED_TITLES.length];
    const title = template.replace(/{metier}/g, metier);
    const slug = slugify(title);

    const uniqueSlug = used.has(slug) ? `${slug}-${offset}-${i}` : slug;
    if (used.has(uniqueSlug)) continue;
    used.add(uniqueSlug);

    ideas.push({
      id: `idea-${Date.now()}-${i}`,
      title,
      slug: uniqueSlug,
      clusterId: cluster.id,
      keywords: [...subTopic.keywords, cluster.pillarKeyword].slice(0, 5),
      source: 'cluster',
      score: 7 + (i % 3),
      generatedAt: now,
    });
  }

  return ideas;
}

/** Structure pour intégration Google Trends (à implémenter) */
export async function fetchGoogleTrends(keyword: string): Promise<number> {
  // Placeholder : retourne score mock
  // En prod : utiliser SerpApi, Google Trends API, etc.
  return Promise.resolve(50 + Math.random() * 50);
}
