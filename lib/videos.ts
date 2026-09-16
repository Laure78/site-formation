/** Vidéos statiques servies depuis `/public/videos`. */
export const VIDEOS = {
  /** Hero page d'accueil — présentation formation IA BTP (Laure Olivié). */
  accueilHeroLaureOlivie2026: {
    src: '/videos/accueil-hero-laureolivie.mp4',
    title: 'Formation IA pour le BTP — présentiel Île-de-France, Laure Olivié',
  },
  /** Page BeWork — pub artisan, créer avec l’IA sans savoir coder (format 9:16 / 1080×1920). */
  beworkArtisanCreerAvecIa: {
    src: '/videos/bework-artisan-creer-avec-ia.mp4',
    title: 'BeWork — créer avec l’IA sans savoir coder, exemple artisan',
    width: 1080,
    height: 1920,
  },
} as const;
