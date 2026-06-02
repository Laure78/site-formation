/**
 * Landing « formation IA dirigeant BTP » — ton stratégique, décideurs PME bâtiment.
 */
import type { Metadata } from 'next';
import type { FAQItem } from '@/lib/faq';
import { createPageMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';

export const FORMATION_IA_DIRIGEANT_BTP_PATH = '/formation-ia-dirigeant-btp';

export function formationIaDirigeantBtpMetadata(): Metadata {
  return createPageMetadata({
    title: 'Formation IA dirigeant BTP — ROI, équipes, Qualiopi',
    description:
      'Formation IA pour dirigeants de PME du bâtiment : ROI, productivité des équipes, projet IA 10–50 salariés. Qualiopi, Constructys. RDV gratuit.',
    path: FORMATION_IA_DIRIGEANT_BTP_PATH,
    keywords: [
      'formation IA dirigeant BTP',
      'IA PME bâtiment',
      'ROI formation IA',
      'productivité équipe BTP',
      'transformation IA entreprise BTP',
      'Qualiopi dirigeant',
      'Constructys formation',
    ],
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: '2026-04-19',
      modifiedTime: '2026-04-19',
      author: SITE_CONFIG.name,
      section: 'Formation IA pour les pro du BTP — dirigeants',
    },
    image: {
      url: '/images/formation-ia-btp-entreprise.png',
      width: 1024,
      height: 571,
      alt: 'Formation IA appliquée au bâtiment pour dirigeants — Laure Olivié, OFC Qualiopi',
    },
  });
}

export const FORMATION_IA_DIRIGEANT_BTP_COURSE = {
  name: 'Formation IA pour dirigeants du BTP — stratégie, ROI et déploiement équipes',
  description: `${SITE_CONFIG.legalName} : accompagner les décideurs de PME bâtiment sur l’IA générative — vision, gains de productivité, cadre Qualiopi, financement possible selon éligibilité. Île-de-France et France.`,
  teaches: [
    'Pilotage stratégique de l’IA en entreprise BTP',
    'ROI et productivité par fonction (encadrement, support)',
    'Déploiement formation équipes et garde-fous',
    'Budget et phasing projet IA PME 10–50 salariés',
    'Qualiopi — financement Constructys',
  ],
};

/** Ordres de grandeur indicatifs (ateliers et retours de formation), non contractuels */
export const FORMATION_IA_DIRIGEANT_BTP_GAINS_TABLE: {
  fonction: string;
  gainHeuresSemaine: string;
  commentaire: string;
}[] = [
  {
    fonction: 'Conducteur·rice de travaux',
    gainHeuresSemaine: '3 à 5 h',
    commentaire: 'CR chantier, synthèses, coordination écrite — dès les premières semaines après formation.',
  },
  {
    fonction: 'Chargé·e d’affaires',
    gainHeuresSemaine: '3 à 6 h',
    commentaire: 'Relances, propositions, structuration de réponses et suivi dossiers.',
  },
  {
    fonction: 'Assistant·e administratif·ve',
    gainHeuresSemaine: '4 à 7 h',
    commentaire: 'Courriers, tableaux, modèles, classement — fort impact sur le quotidien bureau.',
  },
  {
    fonction: 'Chef·fe de chantier',
    gainHeuresSemaine: '2 à 4 h',
    commentaire: 'Notes de réunion, mails courts, remontées QSE — variable selon taille de équipe.',
  },
];

export const FORMATION_IA_DIRIGEANT_BTP_FAQ: FAQItem[] = [
  {
    q: 'Quel ROI pour une PME BTP qui forme ses équipes à l’IA ?',
    a: 'Le ROI se lit d’abord en heures récupérées sur l’administratif et la rédaction (souvent plusieurs heures par personne et par semaine une fois les usages cadrés), puis en qualité de réponse (appels d’offres, clients). Les montants financiers dépendent de votre organisation : la formation vise des gains mesurables, pas une promesse chiffrée unique.',
  },
  {
    q: 'Pourquoi ne pas se former soi-même uniquement, sans les équipes ?',
    a: 'Un dirigeant seul peut gagner du temps ; sans montée en compétence collective, les goulots d’étranglement restent sur les fonctions support et terrain. Former plusieurs profils aligne vocabulaire, outils et rèles de confidentialité — condition d’une transformation durable.',
  },
  {
    q: 'Comment financer une formation IA pour mon entreprise du BTP ?',
    a: `OFC Création d'Entreprise est certifié Qualiopi ; les parcours sont éligibles aux dispositifs de formation professionnelle, notamment via l'OPCO Constructys selon barèmes et éligibilité en vigueur. Détail : <a href="/financement-constructys-formation-ia-btp">guide financement Constructys formation IA pour les pro du BTP</a>.`,
  },
  {
    q: 'L’IA va-t-elle remplacer des postes dans mon entreprise ?',
    a: 'Non dans l’approche proposée : l’IA accélère brouillons, classement et reformulation ; le jugement métier, la signature des devis et la relation client restent humains. L’enjeu est la productivité, pas la suppression de postes.',
  },
  {
    q: 'En combien de temps peut-on lancer un projet IA dans une PME de 10 à 50 salariés ?',
    a: 'Un premier pilote (un lot de tâches, un service pilote) peut se cadrer en quelques semaines ; un déploiement raisonné avec formation et règles internes s’étale souvent sur plusieurs mois selon disponibilités et priorité business.',
  },
  {
    q: 'Quel budget prévoir pour une transformation IA « réaliste » ?',
    a: 'Le budget combine formation certifiée (forfaits par session selon catalogue), temps interne de cadrage et éventuellement outils (licences pro). Évitez les fourchettes marketing : le point de départ est un échange pour dimensionner le périmètre — créneau Calendly « audit IA » gratuit.',
  },
];
