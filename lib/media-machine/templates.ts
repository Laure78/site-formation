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
    shortAnswer: `L'IA et ChatGPT permettent aux professionnels du BTP de gagner du temps sur les devis, emails et documents administratifs. Une formation courte de 4h à 7h suffit pour des résultats concrets. Formation éligible à une prise en charge par Constructys ou votre OPCO, selon statut, branche et conditions en vigueur.`,
    definition: `L'intelligence artificielle pour le BTP désigne l'utilisation d'outils comme ChatGPT pour automatiser la rédaction de devis, emails, comptes rendus et documents techniques. Sans remplacer l'expertise métier, l'IA accélère les tâches répétitives. Les professionnels du BTP et les PME du bâtiment peuvent ainsi se recentrer sur le chantier et la relation client, tout en gardant une qualité professionnelle pour leurs documents.`,
    keyTakeaways: [
      'Gain de temps moyen : 3 à 5h par semaine sur devis, emails et CR',
      'Formation 4h à 7h suffisante pour démarrer et être opérationnel',
      'Financement possible via Constructys ou OPCO selon éligibilité',
      'Travail sur vos vrais documents : devis, emails, comptes rendus chantier',
      'Aucune compétence technique requise : méthode 100% pratique',
      'Tarifs et financement : devis personnalisé sous 24h sur demande',
    ],
    practicalExample: `Exemple concret : un plombier qui rédige un devis de rénovation salle de bain complète en 15 min au lieu de 2h. Il donne un brief détaillé à ChatGPT (surface, prestations, options, matériaux), l'IA structure le document avec descriptif technique et conditions, il ajuste les prix selon ses marges et envoie au client. Le gain est immédiat et reproductible sur chaque nouveau chantier. Pour aller plus loin, il peut prendre rendez-vous pour une formation sur-mesure.`,
    stepByStep: [
      'Identifier vos tâches chronophages : devis, emails clients, comptes rendus de chantier',
      'Choisir un outil IA adapté (ChatGPT Team ou Enterprise pour les données sensibles)',
      'Suivre une formation pratique sur vos vrais documents — Prendre RDV pour un diagnostic',
      'Mettre en place des trames et prompts réutilisables par type de document',
      'Mesurer les gains dès la première semaine et ajuster si besoin',
      'Consulter nos tarifs et le financement Constructys pour former toute l\'équipe',
    ],
    faq: [
      { q: 'Faut-il des compétences techniques pour utiliser l\'IA en BTP ?', a: 'Non. Une formation de 4h à 7h suffit. On travaille sur vos vrais documents (devis, emails, CR), sans code ni logiciel complexe. Méthode 100% pratique.' },
      { q: 'La formation IA pour le BTP est-elle finançable ?', a: 'Oui, éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Consultez nos tarifs et prenez rendez-vous pour un devis personnalisé.' },
      { q: 'Combien de temps un professionnel du BTP gagne-t-il avec l\'IA ?', a: 'En moyenne 3 à 5h par semaine sur les devis, emails et comptes rendus. Les gains sont mesurables dès la première semaine.' },
      { q: 'Comment prendre rendez-vous pour une formation ?', a: 'Réservez un créneau de 30 minutes gratuit sur notre page Prendre RDV. Vous recevrez un devis personnalisé sous 24h.' },
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
    problem: 'Les entreprises du BTP perdent un temps fou sur l\'administratif : devis, emails, comptes rendus. Des heures qui pourraient être passées sur le chantier.',
    insight: 'L\'IA change la donne. En 4h de formation, vous apprenez à utiliser ChatGPT pour diviser par 10 le temps de rédaction. Sans compétence technique.',
    example: 'Un plombier que j\'ai formé : devis de rénovation complète en 15 min au lieu de 2h. Il ajuste les prix, envoie. Le client signe. Simple.',
    cta: `Découvrez la formation IA pour les pros du BTP — Financement possible selon éligibilité. Lien en bio.`,
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
    '#IABTP #ChatGPT #PMEBTP #Formation #Constructys',
  ].join('\n');
}
