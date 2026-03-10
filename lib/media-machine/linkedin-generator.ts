/**
 * Générateur de posts LinkedIn — Structure virale
 */

import {
  getLinkedInTemplate,
  formatLinkedInPost,
  type LinkedInPostTemplate,
} from './templates';
import type { ContentIdea } from './trends';

export interface LinkedInPost {
  articleSlug: string;
  articleTitle: string;
  content: string;
  template: LinkedInPostTemplate;
  generatedAt: string;
}

/** Génère un post LinkedIn à partir d'un article */
export function generateLinkedInPost(idea: ContentIdea): LinkedInPost {
  const template = getLinkedInTemplate(idea.title);
  return {
    articleSlug: idea.slug,
    articleTitle: idea.title,
    content: formatLinkedInPost(template),
    template,
    generatedAt: new Date().toISOString(),
  };
}
