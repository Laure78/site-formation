/**
 * Templates SEO/GEO pour articles blog
 * Blocs optimisés pour extraction par moteurs IA
 */

export interface GeoArticleTemplate {
  shortAnswer: string;
  definition: string;
  keyTakeaways: string[];
  practicalExample: string;
  faq: { q: string; a: string }[];
}

/** Structure H1/H2 recommandée par type d'article */
export const ARTICLE_STRUCTURES: Record<string, string[]> = {
  'how-to': [
    'H1: [Action] — Guide complet',
    'H2: En bref (short answer)',
    'H2: Définition',
    'H2: Pourquoi [sujet] ?',
    'H2: Étapes pour [action]',
    'H2: Exemple concret',
    'H2: Questions fréquentes',
  ],
  'definition': [
    'H1: Qu\'est-ce que [sujet] ?',
    'H2: En bref',
    'H2: Définition détaillée',
    'H2: Points clés',
    'H2: Applications dans le BTP',
    'H2: FAQ',
  ],
  'comparison': [
    'H1: [A] vs [B] — Comparatif',
    'H2: En bref',
    'H2: [A] : avantages et limites',
    'H2: [B] : avantages et limites',
    'H2: Quel choix pour le BTP ?',
    'H2: FAQ',
  ],
};
