/**
 * Correspondance ancienne offre → module / parcours 2027 → URL → action.
 * Les offres absentes du catalogue 2027 sont conservées hors périmètre jusqu’à décision éditoriale.
 */

export type LegacyMappingAction =
  | 'renommer-et-mettre-a-jour'
  | 'conserver-hors-perimetre'
  | 'rediriger-vers-module'
  | 'rediriger-301'
  | 'demander-programme';

export type LegacyOfferMapping = {
  legacyCode: string;
  legacySlug: string;
  legacyTitre: string;
  nouveauCode: string | null;
  nouveauParcours?: string;
  urlRetenue: string;
  action: LegacyMappingAction;
  notes: string;
};

export const MAPPING_LEGACY_VERS_2027: readonly LegacyOfferMapping[] = [
  {
    legacyCode: 'NIV-01',
    legacySlug: 'ia-batiment-travaux-publics',
    legacyTitre: 'Formation IA BTP : devis, emails et productivité',
    nouveauCode: 'NUM-01',
    urlRetenue: '/formations/ia-batiment-travaux-publics',
    action: 'renommer-et-mettre-a-jour',
    notes: '4 h — 120 € HT conservés. Titre commercial aligné « Les bases de l’IA ».',
  },
  {
    legacyCode: 'NIV-02',
    legacySlug: 'ia-appels-offre-btp',
    legacyTitre: 'Formation IA appels d’offres BTP',
    nouveauCode: 'NUM-02',
    urlRetenue: '/formations/ia-appels-offre-btp',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-02 · niveau 2 — 4 h / 170 € HT (grille parcours). Fiche catalogue alignée ; PDF à régénérer si écart.',
  },
  {
    legacyCode: 'NIV-03',
    legacySlug: 'ia-conduite-travaux-suivi-chantier',
    legacyTitre: 'Formation IA conducteur de travaux',
    nouveauCode: 'NUM-07',
    urlRetenue: '/formations/ia-conduite-travaux-suivi-chantier',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-07 · niveau 2 — 4 h / 170 €. Distinct de TRA-05 (réception). PDF à régénérer si écart.',
  },
  {
    legacyCode: 'NIV-04',
    legacySlug: 'maitriser-claude-ai-btp',
    legacyTitre: 'Maîtriser Claude pour le BTP',
    nouveauCode: 'NUM-03',
    urlRetenue: '/formations/maitriser-claude-ai-btp',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-03 · niveau 2 — 4 h / 170 € HT. PDF à régénérer si écart.',
  },
  {
    legacyCode: 'NIV-05',
    legacySlug: 'ia-maitrise-oeuvre',
    legacyTitre: 'Formation IA maîtrise d’œuvre',
    nouveauCode: 'NUM-08',
    urlRetenue: '/formations/ia-maitrise-oeuvre',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-08 · niveau 2 — 4 h / 170 € HT. PDF à régénérer si écart.',
  },
  {
    legacyCode: 'NIV-10',
    legacySlug: 'developpement-web-ia-sans-coder',
    legacyTitre: 'Créer des applications métier BTP avec l’IA',
    nouveauCode: 'NUM-04',
    urlRetenue: '/formations/developpement-web-ia-sans-coder',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-04 · seul niveau 3 du référentiel — 14 h / 620 € HT. Effectif 6–12.',
  },
  {
    legacyCode: 'NIV-06',
    legacySlug: 'application-metier-btp-niveau-1',
    legacyTitre: 'Créer sa première application métier BTP',
    nouveauCode: null,
    urlRetenue: '/formations/developpement-web-ia-sans-coder',
    action: 'rediriger-301',
    notes: 'Fiche legacy 301 → NIV-10 (NUM-04).',
  },
  {
    legacyCode: 'NIV-07',
    legacySlug: 'application-metier-btp-niveau-2',
    legacyTitre: 'Application métier BTP connectée',
    nouveauCode: null,
    urlRetenue: '/formations/developpement-web-ia-sans-coder',
    action: 'rediriger-301',
    notes: 'Fiche legacy 301 → NIV-10.',
  },
  {
    legacyCode: 'NIV-08',
    legacySlug: 'application-metier-btp-niveau-3',
    legacyTitre: 'Application métier BTP avancée avec l’IA',
    nouveauCode: null,
    urlRetenue: '/formations/developpement-web-ia-sans-coder',
    action: 'rediriger-301',
    notes: 'Fiche legacy 301 → NIV-10.',
  },
  {
    legacyCode: 'NIV-09',
    legacySlug: 'assistants-ia-personnalises-btp',
    legacyTitre: 'Créer ses assistants IA pour son entreprise du bâtiment',
    nouveauCode: 'NUM-09',
    nouveauParcours: 'maitre-oeuvre',
    urlRetenue: '/formations/assistants-ia-personnalises-btp',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-09 · niveau 2 — 4 h / 170 € HT (grille parcours). PDF à harmoniser 4 h si écart.',
  },
  {
    legacyCode: 'NIV-11',
    legacySlug: 'ia-assistance-maitrise-ouvrage',
    legacyTitre: 'Formation IA assistance à maîtrise d’ouvrage',
    nouveauCode: 'NUM-10',
    nouveauParcours: 'amo-btp',
    urlRetenue: '/formations/ia-assistance-maitrise-ouvrage',
    action: 'renommer-et-mettre-a-jour',
    notes: 'NUM-10 · niveau 2 — 4 h / 170 € HT. Parcours AMO : NUM-01 + NUM-10 + NUM-02.',
  },
] as const;
