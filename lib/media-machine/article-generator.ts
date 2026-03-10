/**
 * Générateur d'articles SEO/GEO — Structure complète
 */

import type { BlogArticle } from '../blog';
import type { ContentIdea } from './trends';
import { getArticleTemplate } from './templates';
import { getInternalLinksForArticle, getRandomCTA } from './internal-links';

export interface GeneratedArticle extends BlogArticle {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  internalLinks: { path: string; anchor: string }[];
}

export function generateArticle(idea: ContentIdea): GeneratedArticle {
  const template = getArticleTemplate(idea);
  const internalLinks = getInternalLinksForArticle(idea.clusterId);

  const sections: BlogArticle['sections'] = [
    {
      type: 'definition',
      title: 'En bref',
      content: template.shortAnswer,
    },
    {
      type: 'paragraph',
      title: 'Définition',
      content: template.definition,
    },
    {
      type: 'list',
      title: 'Points clés à retenir',
      content: template.keyTakeaways,
    },
    {
      type: 'paragraph',
      title: 'Exemple pratique',
      content: template.practicalExample,
    },
    {
      type: 'list',
      title: 'Guide étape par étape',
      content: template.stepByStep,
    },
  ];

  if (template.faq.length > 0) {
    sections.push({
      type: 'faq',
      title: 'Questions fréquentes',
      content: template.faq.map((f) => `${f.q} — ${f.a}`),
    });
  }

  sections.push({
    type: 'cta',
    content: getRandomCTA(),
  });

  const metaDescription =
    `${idea.title}. Découvrez comment l'IA et ChatGPT optimisent le quotidien des artisans et entreprises du BTP. Formation finançable Constructys.`.slice(
      0,
      158
    );

  return {
    slug: idea.slug,
    title: idea.title,
    description: metaDescription,
    date: new Date().toISOString().slice(0, 10),
    keywords: idea.keywords,
    sections,
    relatedSlugs: [],
    seoTitle: idea.title,
    metaDescription,
    internalLinks,
  };
}
