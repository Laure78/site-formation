/**
 * Libellés Indicateur 1 Qualiopi — alignés sur la grille d'audit (information du public).
 * Source unique pour InfosPratiques et InformationsReglementaires.
 */
export const QUALIOPI_INDICATEUR1_LABELS = {
  prerequis: 'Prérequis',
  objectifs: 'Objectifs',
  contenu: 'Contenu de la formation',
  duree: 'Durée',
  modalitePedagogique: 'Modalité pédagogique',
  modalitesAcces: "Modalités d'accès",
  delaisAcces: "Délais d'accès",
  tarif: 'Tarif',
  contact: 'Coordonnées de contact',
  methodes: 'Méthodes pédagogiques mobilisées',
  evaluation: "Modalités d'évaluation",
  handicap: 'Accessibilité aux personnes en situation de handicap',
} as const;

/** Ordre de présentation sur les fiches formation (11 points audit + modalité pédagogique). */
export const QUALIOPI_INDICATEUR1_SECTION_ORDER = [
  'prerequis',
  'objectifs',
  'contenu',
  'duree',
  'modalitePedagogique',
  'modalitesAcces',
  'delaisAcces',
  'tarif',
  'contact',
  'methodes',
  'evaluation',
  'handicap',
] as const;
