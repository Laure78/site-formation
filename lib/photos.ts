export const PHOTOS = {
  // Photo profil rond fond bleu
  profileBlue: {
    src: '/images/laure-olivie-circle.png',
    alt: 'Laure Olivié formatrice en intelligence artificielle pour les entreprises du bâtiment et des travaux publics',
    width: 547,
    height: 456,
  },
  
  // Photo profil LinkedIn In Graz
  linkedinGraz: {
    src: '/images/laure-linkedin-graz.png',
    alt: 'Laure Olivié au LinkedIn In Graz pour partager son expertise en formation IA BTP avec la communauté',
    width: 1024,
    height: 770,
  },
  
  // Photo avec panneau LinkedIn (portrait)
  linkedinPanel: {
    src: '/images/laure-linkedin-panel.png',
    alt: 'Laure Olivié instructrice LinkedIn Learning pour les formations IA appliquées au BTP',
    width: 770,
    height: 1024,
  },
  
  // Photo LinkedIn Learning portrait
  linkedinPortrait: {
    src: '/images/laure-linkedin-portrait.png',
    alt: 'Laure Olivié formatrice spécialisée en intelligence artificielle pour entreprises du bâtiment',
    width: 770,
    height: 1024,
  },
  
  // Photo studio fond clair (portrait)
  studioLight: {
    src: '/images/laure-studio-light.png',
    alt: 'Formation IA BTP animée par Laure Olivié pour automatiser les tâches administratives du bâtiment',
    width: 912,
    height: 1024,
  },
  
  // Photo studio fond sombre
  studioDark: {
    src: '/images/laure-studio-dark.png',
    alt: 'Laure Olivié instructrice LinkedIn Learning pour formations ChatGPT et IA appliquées aux entreprises',
    width: 1024,
    height: 682,
  },
  
  // Photo formation en entreprise
  formationEntreprise: {
    src: '/images/formation-ia-btp-entreprise.png',
    alt: 'Atelier pratique formation IA BTP avec Laure Olivié pour optimiser la gestion des appels d\'offre',
    width: 1024,
    height: 571,
  },
  
  // Bannière LinkedIn Learning - Recrutement
  bannerRecrutement: {
    src: '/images/linkedin-learning-recrutement-btp.png',
    alt: 'Formation IA RH pour PME du BTP avec Laure Olivié sur LinkedIn Learning',
    width: 1024,
    height: 747,
  },
  
  // Bannière LinkedIn Learning - Difficulté recrutement
  bannerRecrutementDifficile: {
    src: '/images/linkedin-learning-recrutement-difficile.png',
    alt: 'Formation IA BTP : recruter efficacement avec l\'intelligence artificielle par Laure Olivié',
    width: 1024,
    height: 682,
  },
  
  // Bannière LinkedIn Learning - Solutions concrètes
  bannerSolutionsConcretres: {
    src: '/images/linkedin-learning-solutions-concretes.png',
    alt: 'Formation intelligence artificielle pour le BTP avec cas pratiques et solutions concrètes pour chantiers',
    width: 1024,
    height: 682,
  },
  
  // Ouvrier avec plan
  ouvrierPlan: {
    src: '/images/ouvrier-plan-chantier.png',
    alt: 'Professionnel du BTP consultant des plans de chantier lors d\'une formation IA pour optimiser son travail',
    width: 1024,
    height: 682,
  },
  
  // Architecte concentration (portrait)
  architecteConcentration: {
    src: '/images/architecte-concentration.png',
    alt: 'Architecte BTP analysant des plans techniques avec méthodes optimisées par intelligence artificielle',
    width: 764,
    height: 1024,
  },
  
  // Ouvrier chantier confiant (carré)
  ouvrierConfiant: {
    src: '/images/ouvrier-chantier-confiant.png',
    alt: 'Ouvrier qualifié du bâtiment ayant suivi une formation IA BTP pour améliorer sa productivité',
    width: 1024,
    height: 1024,
  },

  /** Intervention — carte experte IA & BTP (studio) */
  interventionClaude: {
    src: '/images/laure-intervention-claude-experte-ia-btp.png',
    alt: 'Laure Olivié, formatrice experte en intelligence artificielle appliquée au BTP et aux travaux publics',
    width: 552,
    height: 614,
  },

  /** Portrait pro avec bandeau « Formatrice IA spécialisée BTP » */
  formatriceLowerThird: {
    src: '/images/laure-formatrice-ia-btp-lower-third.png',
    alt: 'Laure Olivié, formatrice IA spécialisée BTP, en intervention pédagogique',
    width: 1024,
    height: 790,
  },

  /** Cours LinkedIn Learning — extrait vidéo (recrutement artisans & TPE) */
  coursRecrutementVideo1: {
    src: '/images/laure-cours-ia-artisans-tpe-video-1.png',
    alt: 'Extrait du cours LinkedIn Learning « L’IA pour les artisans et TPE : recruter sa main-d’œuvre efficacement », animé par Laure Olivié',
    width: 1024,
    height: 670,
  },

  coursRecrutementVideo2: {
    src: '/images/laure-cours-ia-artisans-tpe-video-2.png',
    alt: 'Laure Olivié présente des cas d’usage IA pour le recrutement dans le BTP — cours en ligne LinkedIn Learning',
    width: 1024,
    height: 593,
  },

  /** Lecteur vidéo — cours recrutement BTP */
  linkedinPlayerRecrutement: {
    src: '/images/laure-linkedin-learning-recrutement-player.png',
    alt: 'Cours LinkedIn Learning IA et recrutement BTP — lecteur vidéo avec Laure Olivié formatrice',
    width: 1024,
    height: 714,
  },

  /** Interface cours — sommaire des leçons */
  linkedinSommaireCours: {
    src: '/images/laure-linkedin-learning-sommaire-cours.png',
    alt: 'Sommaire du cours LinkedIn Learning IA pour artisans et TPE du BTP — leçons vidéo par Laure Olivié',
    width: 1024,
    height: 621,
  },

  /** Leçon « Fidéliser dès le premier jour » */
  linkedinLeconFideliser: {
    src: '/images/laure-linkedin-learning-lecon-fideliser.png',
    alt: 'Leçon « Fidéliser dès le premier jour » — formation IA RH BTP sur LinkedIn Learning',
    width: 1024,
    height: 718,
  },
};

export type PhotoKey = keyof typeof PHOTOS;

/** Galerie cohérente (parcours visuel formation en ligne + formatrice) */
export const GALERIE_LINKEDIN_FORMATION: PhotoKey[] = [
  'interventionClaude',
  'formatriceLowerThird',
  'coursRecrutementVideo1',
  'linkedinPlayerRecrutement',
  'linkedinSommaireCours',
  'linkedinLeconFideliser',
  'coursRecrutementVideo2',
];
