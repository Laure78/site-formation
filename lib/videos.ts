/** Vidéos statiques servies depuis `/public/videos`. */

export type SiteVideo = {
  src: string;
  title: string;
  width?: number;
  height?: number;
  /** Légende courte sous le lecteur. */
  caption?: string;
};

export const VIDEOS = {
  /** Hero page d'accueil — présentation formation IA BTP (Laure Olivié). */
  accueilHeroLaureOlivie2026: {
    src: '/videos/accueil-hero-laureolivie.mp4',
    title: 'Formation IA pour le BTP — présentiel Île-de-France, Laure Olivié',
  },
  /** Promo — développement web avec l’IA sans savoir coder (format 16:9). */
  devWebIaPromo: {
    src: '/videos/bework-promo.mp4',
    title: 'Promo — Développement web avec l’IA sans savoir coder',
    width: 1920,
    height: 1080,
    caption: 'Apprendre aujourd’hui, créer demain',
  },
  /** Exemple formation création avec l’IA (format 9:16). */
  devWebIaFormationExemple: {
    src: '/videos/bework-formation-exemple-2.mp4',
    title: 'Formation créer avec l’IA — second exemple',
    width: 1080,
    height: 1920,
    caption: 'Créer avec l’IA — sans savoir coder',
  },
  /** Pub formation création avec l’IA (format 9:16). */
  devWebIaVideoPub: {
    src: '/videos/bework-video-pub.mp4',
    title: 'Pub formation créer avec l’IA',
    width: 1080,
    height: 1920,
    caption: 'Apprendre aujourd’hui, créer demain',
  },
} as const satisfies Record<string, SiteVideo>;
