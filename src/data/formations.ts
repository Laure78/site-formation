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
    name: "L'IA appliquée aux appels d'offres BTP",
    ref: 'NIV-02',
    level: 'Avancé',
    duration: 'PT4H',
    price: TARIF_SESSION_AVANCE_HT,
    description:
      'Formation niveau 2 : créer ses assistants IA pour DCE et mémoire technique avec Claude AI Pro, Cowork & Skills — méthode opérationnelle pour le BTP.',
  },
  'ia-conduite-travaux-suivi-chantier': {
    name: "L'IA appliquée à la conduite de travaux",
    ref: 'NIV-03',
    level: 'Avancé',
    duration: 'PT4H',
    price: TARIF_SESSION_AVANCE_HT,
    description:
      'Formation NIV-03 : conduite de travaux et suivi chantier avec skills Claude — CCTP, DPGF, PPSPS, CR, réception. Prix de lancement.',
  },
  'maitriser-claude-ai-btp': {
    name: 'Maîtriser Claude AI pour le BTP',
    ref: 'NIV-04',
    level: 'Avancé',
    duration: 'PT4H',
    price: TARIF_SESSION_AVANCE_HT,
    description:
      'Formation NIV-04 : industrialiser Claude (Projets, Skills, Cowork, connecteurs, Claude Code) dans votre entreprise BTP. Matin 9h–13h. Prix de lancement.',
  },
} as const;

export type FormationSlug = keyof typeof formationsData;
