/**
 * Templates SEO/GEO pour articles et LinkedIn
 */

import { MEDIA_CONFIG } from './config';

export interface ArticleTemplate {
  shortAnswer: string;
  definition: string;
  keyTakeaways: string[];
  practicalExample: string;
  stepByStep: string[];
  faq: { q: string; a: string }[];
}

export function getArticleTemplate(idea: {
  title: string;
  keywords: string[];
  clusterId: string;
}): ArticleTemplate {
  return {
    shortAnswer: `L'IA et ChatGPT permettent aux professionnels du BTP de gagner du temps sur les devis, emails et documents administratifs. Une formation courte suffit pour des résultats concrets.`,
    definition: `L'intelligence artificielle pour le BTP désigne l'utilisation d'outils comme ChatGPT pour automatiser la rédaction de devis, emails, comptes rendus et documents techniques. Sans remplacer l'expertise métier, l'IA accélère les tâches répétitives.`,
    keyTakeaways: [
      'Gain de temps moyen : 3 à 5h par semaine',
      'Formation 4h à 7h suffisante pour démarrer',
      '100% finançable par l\'OPCO Constructys',
      'Travail sur vos vrais documents',
      'Aucune compétence technique requise',
    ],
    practicalExample: `Exemple : un plombier qui rédige un devis de rénovation salle de bain en 15 min au lieu de 2h. Il donne un brief à ChatGPT (surface, prestations, options), l'IA structure le document, il ajuste les prix et envoie.`,
    stepByStep: [
      'Identifier vos tâches chronophages (devis, emails, CR)',
      'Choisir un outil IA adapté (ChatGPT Team pour les données sensibles)',
      'Suivre une formation pratique sur vos vrais documents',
      'Mettre en place des trames et prompts réutilisables',
      'Mesurer les gains dès la première semaine',
    ],
    faq: [
      { q: 'Faut-il des compétences techniques ?', a: 'Non. Une formation de 4h suffit. On travaille sur vos vrais documents, sans code.' },
      { q: 'La formation est-elle finançable ?', a: 'Oui, 100% par l\'OPCO Constructys pour les entreprises du BTP de moins de 50 salariés.' },
      { q: 'Combien de temps je gagne ?', a: 'En moyenne 3 à 5h par semaine sur les devis, emails et comptes rendus.' },
    ],
  };
}

export interface LinkedInPostTemplate {
  hook: string;
  problem: string;
  insight: string;
  example: string;
  cta: string;
}

export function getLinkedInTemplate(articleTitle: string): LinkedInPostTemplate {
  return {
    hook: 'Vous passez encore 2h à rédiger un devis ?',
    problem: 'Les artisans du BTP perdent un temps fou sur l\'administratif : devis, emails, comptes rendus. Des heures qui pourraient être passées sur le chantier.',
    insight: 'L\'IA change la donne. En 4h de formation, vous apprenez à utiliser ChatGPT pour diviser par 10 le temps de rédaction. Sans compétence technique.',
    example: 'Un plombier que j\'ai formé : devis de rénovation complète en 15 min au lieu de 2h. Il ajuste les prix, envoie. Le client signe. Simple.',
    cta: `Découvrez la formation IA BTP — 100% finançable Constructys. Lien en bio.`,
  };
}

export function formatLinkedInPost(template: LinkedInPostTemplate): string {
  return [
    template.hook,
    '',
    template.problem,
    '',
    template.insight,
    '',
    template.example,
    '',
    '➡️ ' + template.cta,
    '',
    '#IABTP #ChatGPT #Artisans #Formation #Constructys',
  ].join('\n');
}
