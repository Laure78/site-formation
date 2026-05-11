export const formationsData = {
  'ia-batiment-travaux-publics': {
    name: "L'IA au service des pros du bâtiment et des travaux publics",
    ref: 'NIV-01',
    level: 'Débutant',
    duration: 'PT4H',
    price: 100,
    description:
      'Formation niveau 1 : IA générative pour professionnels du bâtiment et des travaux publics — devis, chantier, administratif, documents. Sessions en présentiel.',
  },
  'ia-appels-offre-btp': {
    name: "L'IA au service des appels d'offre BTP",
    ref: 'NIV-02',
    level: 'Avancé',
    duration: 'PT4H',
    price: 175,
    description:
      'Formation niveau 2 : analyser les DCE, rédiger mémoires techniques et chiffrages avec une méthode et des assistants IA adaptés au BTP.',
  },
} as const;

export type FormationSlug = keyof typeof formationsData;
