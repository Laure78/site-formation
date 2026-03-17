export const PHOTOS = {
  // Photo profil rond fond bleu
  profileBlue: {
    src: '/images/laure-olivie-circle.png',
    alt: 'Laure Olivié - Formatrice IA BTP',
    width: 547,
    height: 456,
  },
  
  // Photo profil LinkedIn In Graz
  linkedinGraz: {
    src: '/images/laure-linkedin-graz.png',
    alt: 'Laure Olivié au LinkedIn In Graz',
    width: 1024,
    height: 770,
  },
  
  // Photo avec panneau LinkedIn (portrait)
  linkedinPanel: {
    src: '/images/laure-linkedin-panel.png',
    alt: 'Laure Olivié avec panneau LinkedIn',
    width: 770,
    height: 1024,
  },
  
  // Photo LinkedIn Learning portrait
  linkedinPortrait: {
    src: '/images/laure-linkedin-portrait.png',
    alt: 'Laure Olivié - Formatrice IA spécialisée BTP',
    width: 770,
    height: 1024,
  },
  
  // Photo studio fond clair (portrait)
  studioLight: {
    src: '/images/laure-studio-light.png',
    alt: 'Laure Olivié - Formation IA BTP',
    width: 912,
    height: 1024,
  },
  
  // Photo studio fond sombre
  studioDark: {
    src: '/images/laure-studio-dark.png',
    alt: 'Laure Olivié en studio - LinkedIn Learning',
    width: 1024,
    height: 682,
  },
  
  // Photo formation en entreprise
  formationEntreprise: {
    src: '/images/formation-ia-btp-entreprise.png',
    alt: 'Formation IA au service du BTP en entreprise',
    width: 1024,
    height: 571,
  },
  
  // Bannière LinkedIn Learning - Recrutement
  bannerRecrutement: {
    src: '/images/linkedin-learning-recrutement-btp.png',
    alt: 'Formation LinkedIn Learning - Recrutement BTP avec IA',
    width: 1024,
    height: 747,
  },
  
  // Bannière LinkedIn Learning - Difficulté recrutement
  bannerRecrutementDifficile: {
    src: '/images/linkedin-learning-recrutement-difficile.png',
    alt: 'Artisans et dirigeants BTP - Vous ne trouvez plus d\'ouvriers qualifiés ? L\'IA peut vous aider',
    width: 1024,
    height: 682,
  },
  
  // Bannière LinkedIn Learning - Solutions concrètes
  bannerSolutionsConcretres: {
    src: '/images/linkedin-learning-solutions-concretes.png',
    alt: 'L\'IA pour le BTP - Des solutions concrètes pour vos chantiers',
    width: 1024,
    height: 682,
  },
  
  // Ouvrier avec plan
  ouvrierPlan: {
    src: '/images/ouvrier-plan-chantier.png',
    alt: 'Ouvrier BTP consultant un plan de chantier',
    width: 1024,
    height: 682,
  },
  
  // Architecte concentration (portrait)
  architecteConcentration: {
    src: '/images/architecte-concentration.png',
    alt: 'Architecte en concentration sur plans',
    width: 764,
    height: 1024,
  },
  
  // Ouvrier chantier confiant (carré)
  ouvrierConfiant: {
    src: '/images/ouvrier-chantier-confiant.png',
    alt: 'Ouvrier de chantier confiant',
    width: 1024,
    height: 1024,
  },
};

export type PhotoKey = keyof typeof PHOTOS;
