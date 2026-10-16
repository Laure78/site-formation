/**
 * Cycle de travail fiable enseigné dans les exercices IA OFC.
 * Cadrer → sources → analyser → produire → évaluer → corriger → valider.
 */

export const FORMATION_IA_METHOD_CYCLE = [
  {
    step: 'Cadrer',
    detail: 'Objectif métier, format de sortie, critères de qualité et périmètre de décision.',
  },
  {
    step: 'Fournir les sources',
    detail: 'Documents anonymisés pertinents uniquement — hors données personnelles ou confidentielles non autorisées.',
  },
  {
    step: 'Analyser',
    detail: 'Extraire, croiser, repérer omissions et contradictions avec références aux pièces.',
  },
  {
    step: 'Produire',
    detail: 'Générer une première version structurée (tableau, note, courrier, checklist).',
  },
  {
    step: 'Évaluer',
    detail: 'Contrôler faits / hypothèses / recommandations ; vérifier calculs et affirmations dans les sources.',
  },
  {
    step: 'Corriger',
    detail: 'Itérer selon une grille ; une seconde IA ne remplace pas le retour aux documents d’origine.',
  },
  {
    step: 'Valider',
    detail: 'Décision et signature restent au professionnel compétent avant envoi, partage ou modification externe.',
  },
] as const;

export const FORMATION_IA_METHOD_INTRO =
  'Chaque exercice suit le même cycle. Les audits et diagnostics assistés par IA restent des aides documentaires ou organisationnelles — pas une expertise technique, un diagnostic réglementaire ni une validation autonome de conformité.';

export const FORMATION_IA_CONFIDENTIALITE_NOTE =
  'Cas fictifs ou documents anonymisés. Paramètres de confidentialité, droits d’accès et autorisations des connecteurs sont vérifiés avant dépôt. Aucune donnée n’est « automatiquement confidentielle » du seul fait de l’outil.';
