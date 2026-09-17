/**
 * Programmes BeWork — source unique des PDF et infos parcours 7 h / 14 h.
 * Fichiers : `public/bework/programme-bework-parcours-*.pdf` (v1 — septembre 2026).
 * BeWork = marque d'OFC Création d'Entreprise (actions de formation).
 */

export const BEWORK_PROGRAMME_VERSION = 'Version 1 — septembre 2026' as const;

/** Titre court du programme (couverture PDF). */
export const BEWORK_FORMATION_TITRE =
  'Développement web avec l’IA — sans savoir coder' as const;

export type BeworkParcoursId = '7h' | '14h';

export type BeworkParcours = {
  id: BeworkParcoursId;
  title: string;
  intitule: string;
  dureeLabel: string;
  joursLabel: string;
  tarifHt: number;
  tarifLabel: string;
  effectif: string;
  pdfHref: string;
  pdfDownloadName: string;
  highlights: readonly string[];
  outcome: string;
};

export const BEWORK_PARCOURS = {
  '7h': {
    id: '7h',
    title: BEWORK_FORMATION_TITRE,
    intitule:
      'Développement web avec l’IA, sans savoir coder — de l’idée à une première version fonctionnelle',
    dureeLabel: '7 h',
    joursLabel: '1 journée',
    tarifHt: 300,
    tarifLabel: '300 €',
    effectif: '6 à 8 participants',
    pdfHref: '/bework/programme-bework-parcours-7h.pdf',
    pdfDownloadName: 'programme-bework-parcours-7h.pdf',
    highlights: [
      'Cadrer et préparer son projet',
      'Méthode de prompting structurée',
      'Première version fonctionnelle (70 % pratique)',
      'Tester, corriger et sauvegarder',
      'Feuille de route pour continuer après la journée',
    ],
    outcome: 'Vous repartez en sachant comment commencer.',
  },
  '14h': {
    id: '14h',
    title: 'Construire plus loin',
    intitule:
      'Construisez votre projet avec l’IA — parcours 14 heures : de l’idée à la mise en ligne',
    dureeLabel: '14 h',
    joursLabel: '2 journées',
    tarifHt: 600,
    tarifLabel: '600 €',
    effectif: '6 à 8 participants',
    pdfHref: '/bework/programme-bework-parcours-14h.pdf',
    pdfDownloadName: 'programme-bework-parcours-14h.pdf',
    highlights: [
      'Tout le parcours 7 h (Jour 1)',
      'Jour 2 : améliorer, publier, référencer, auditer',
      'Projet plus approfondi et mis en ligne',
      'Fonctionnalités supplémentaires',
      'Tests, corrections et accompagnement renforcé',
    ],
    outcome: 'Vous avez le temps de construire, tester, corriger et aller plus loin.',
  },
} as const satisfies Record<BeworkParcoursId, BeworkParcours>;

export const BEWORK_PARCOURS_LIST = [
  BEWORK_PARCOURS['7h'],
  BEWORK_PARCOURS['14h'],
] as const;
