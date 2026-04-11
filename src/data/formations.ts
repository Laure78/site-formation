export const formationsData = {
  'ia-au-service-du-batiment': {
    name: "L'IA au service du bâtiment",
    ref: 'BTP-01',
    level: 'Débutant',
    duration: 'PT4H',
    price: 100,
    description:
      'Formation pratique pour automatiser devis, emails et comptes rendus de chantier avec ChatGPT et Claude AI. Sessions en présentiel Île-de-France.',
  },
  'ia-appels-offre-btp': {
    name: "Répondre aux appels d'offre avec l'IA",
    ref: 'BTP-02',
    level: 'Avancé',
    duration: 'PT4H',
    price: 175,
    description:
      'Analyser un DCE, rédiger un mémoire technique et créer un assistant IA DCE avec ChatGPT. Méthode et prompts par métier BTP.',
  },
  'ia-rh-btp': {
    name: 'Formation IA pour la Fonction RH dans le BTP',
    ref: 'BTP-03',
    level: 'Avancé',
    duration: 'PT4H',
    price: 175,
    description:
      "Automatiser le recrutement, la GEPP et les tableaux de bord RH dans les entreprises du BTP avec l'intelligence artificielle.",
  },
  'ia-travaux-publics': {
    name: "L'IA au service des Travaux Publics",
    ref: 'BTP-04',
    level: 'Débutant',
    duration: 'PT4H',
    price: 100,
    description:
      "Analyser DCE, rédiger rapports et réponses aux appels d'offres TP. Créer votre assistant IA métier travaux publics.",
  },
  'sensibilisation-ia-assistants-personnalises': {
    name: "Sensibilisation à l'IA & Assistants IA personnalisés",
    ref: 'BTP-05',
    level: 'Débutant',
    duration: 'PT4H',
    price: 100,
    description:
      "Découvrir l'IA générative, créer une banque de prompts par métier et concevoir des assistants IA personnalisés pour votre entreprise BTP.",
  },
  'ia-architecture-claude-dpgf': {
    name: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    ref: 'BTP-06',
    level: 'Avancé',
    duration: 'PT4H',
    price: 175,
    description:
      'DPGF, métrés, planning GANTT avec Claude AI. CR de chantier, situations de travaux, PV de réception via Google Drive.',
  },
} as const;

export type FormationSlug = keyof typeof formationsData;
