/**
 * Topic clusters — Architecture sémantique pour 250–500 articles
 */

export interface TopicCluster {
  id: string;
  name: string;
  pillarKeyword: string;
  subTopics: SubTopic[];
  targetCount: number;
}

export interface SubTopic {
  id: string;
  name: string;
  keywords: string[];
  articleTemplates: string[]; // Titres types
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: 'ia-artisans',
    name: 'IA pour entreprises BTP',
    pillarKeyword: 'ChatGPT entreprises BTP',
    targetCount: 80,
    subTopics: [
      {
        id: 'artisans-devis',
        name: 'Devis et chiffrages',
        keywords: ['devis plombier IA', 'devis électricien ChatGPT', 'chiffrage BTP IA'],
        articleTemplates: [
          'Comment rédiger un devis {metier} avec ChatGPT',
          'Devis {metier} : gain de temps avec l\'IA',
          '{metier} et ChatGPT : 5 étapes pour un devis pro',
        ],
      },
      {
        id: 'artisans-emails',
        name: 'Emails et relation client',
        keywords: ['emails professionnels BTP', 'relance client IA', 'email professionnel ChatGPT'],
        articleTemplates: [
          'Emails clients : automatiser avec ChatGPT',
          'Relances et prospection : l\'IA pour les PME BTP',
        ],
      },
      {
        id: 'artisans-metier',
        name: 'Par métier',
        keywords: ['plombier IA', 'électricien ChatGPT', 'maçon IA', 'carreleur intelligence artificielle'],
        articleTemplates: [
          'ChatGPT pour les {metier}s : guide pratique',
          'L\'IA au quotidien du {metier}',
          '{metier} et intelligence artificielle : par où commencer',
        ],
      },
    ],
  },
  {
    id: 'ia-construction',
    name: 'IA entreprises construction',
    pillarKeyword: 'IA BTP',
    targetCount: 80,
    subTopics: [
      {
        id: 'appels-offres',
        name: 'Appels d\'offres',
        keywords: ['IA appels offres BTP', 'DCE ChatGPT', 'mémoire technique IA'],
        articleTemplates: [
          'Répondre à un appel d\'offre avec l\'IA',
          'Analyser un DCE sans partir de zéro',
          'Mémoire technique et ChatGPT',
        ],
      },
      {
        id: 'gestion-chantier',
        name: 'Gestion chantier',
        keywords: ['IA conducteur travaux', 'CR chantier automatique', 'planning IA'],
        articleTemplates: [
          'Comptes rendus chantier avec l\'IA',
          'L\'IA pour les conducteurs de travaux',
          'Planifier et suivre un chantier avec ChatGPT',
        ],
      },
      {
        id: 'pme-btp',
        name: 'PME BTP',
        keywords: ['IA PME bâtiment', 'productivité BTP', 'automatisation TPE'],
        articleTemplates: [
          'IA pour les PME du BTP : par où commencer',
          'Productivité sans embaucher : l\'IA en PME',
        ],
      },
    ],
  },
  {
    id: 'ia-productivite',
    name: 'IA productivité',
    pillarKeyword: 'productivité IA',
    targetCount: 60,
    subTopics: [
      {
        id: 'gain-temps',
        name: 'Gain de temps',
        keywords: ['gain temps devis', 'automatisation administrative', 'IA bureau'],
        articleTemplates: [
          'Gagner du temps bureau avec l\'IA',
          'Automatiser l\'administratif BTP',
          'Devis structuré : mode d\'emploi',
        ],
      },
      {
        id: 'outils',
        name: 'Outils',
        keywords: ['ChatGPT entreprise', 'outils IA BTP', 'logiciels IA'],
        articleTemplates: [
          'ChatGPT vs alternatives : quel outil pour le BTP ?',
          'Les outils IA indispensables aux entreprises du BTP',
        ],
      },
    ],
  },
  {
    id: 'ia-marketing',
    name: 'IA marketing',
    pillarKeyword: 'IA marketing BTP',
    targetCount: 50,
    subTopics: [
      {
        id: 'prospection',
        name: 'Prospection',
        keywords: ['prospection BTP IA', 'emails commerciaux ChatGPT', 'relance client IA'],
        articleTemplates: [
          'Prospection commerciale BTP avec l\'IA',
          'Emails de relance qui convertissent',
        ],
      },
      {
        id: 'reseau',
        name: 'Réseaux sociaux',
        keywords: ['LinkedIn BTP', 'post IA', 'contenu réseaux BTP'],
        articleTemplates: [
          'LinkedIn pour les entreprises du BTP',
          'Créer des posts avec ChatGPT',
        ],
      },
    ],
  },
  {
    id: 'ia-recrutement',
    name: 'IA recrutement',
    pillarKeyword: 'IA recrutement BTP',
    targetCount: 50,
    subTopics: [
      {
        id: 'offres-emploi',
        name: 'Offres d\'emploi',
        keywords: ['offre emploi IA', 'recruter BTP', 'annonce BTP ChatGPT'],
        articleTemplates: [
          'Rédiger des offres d\'emploi attractives avec l\'IA',
          'Recruter dans le BTP : l\'IA au service du RH',
        ],
      },
      {
        id: 'gepp',
        name: 'GEPP et RH',
        keywords: ['GEPP IA', 'RH BTP', 'gestion prévisionnelle IA'],
        articleTemplates: [
          'La GEPP et l\'intelligence artificielle',
          'RH BTP : automatiser avec l\'IA',
        ],
      },
    ],
  },
];

/** Liste des métiers pour varier les templates */
export const METIERS = [
  'plombier',
  'électricien',
  'maçon',
  'carreleur',
  'peintre',
  'charpentier',
  'couvreur',
  'menuisier',
  'chauffagiste',
];
