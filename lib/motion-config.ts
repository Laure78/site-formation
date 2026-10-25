/** Paramètres d’animation centralisés — accueil & reveals scroll. */

export const MOTION_REVEAL = {
  distance: 10,
  /** Écart entre cartes d’une même rangée. */
  staggerMs: 75,
  /** En-têtes de section vs contenu. */
  contentDelayMs: 90,
} as const;

export const MOTION_HERO = {
  wordStaggerMs: 60,
  wordBaseDelayMs: 100,
  wordDurationMs: 600,
} as const;
