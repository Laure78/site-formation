import { TARIF_SESSION_AVANCE_HT, TARIF_SESSION_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export const formationsData = {
  'ia-batiment-travaux-publics': {
    name: "L'IA au service des pros du bâtiment et des travaux publics",
    ref: 'NIV-01',
    level: 'Débutant',
    duration: 'PT4H',
    price: TARIF_SESSION_DEBUTANT_HT,
    description:
      'Formation niveau 1 : IA générative pour professionnels du bâtiment et des travaux publics — devis, chantier, administratif, documents. Sessions en présentiel.',
  },
  'ia-appels-offre-btp': {
    name: "L'IA au service des appels d'offre BTP",
    ref: 'NIV-02',
    level: 'Avancé',
    duration: 'PT4H',
    price: TARIF_SESSION_AVANCE_HT,
    description:
      'Formation niveau 2 : analyse DCE avec NotebookLM, décision Go / No Go, mémoire technique et contrôle de chiffrage avec Claude AI — méthode et prompts pour le BTP.',
  },
} as const;

export type FormationSlug = keyof typeof formationsData;
