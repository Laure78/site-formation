/** Vidéos site — fichiers `/public/videos` ou embeds YouTube. */

export type SiteVideo = {
  src: string;
  title: string;
  width?: number;
  height?: number;
  /** Légende courte sous le lecteur (page BeWork). */
  caption?: string;
  /** ID YouTube si la source est un embed (hero accueil, etc.). */
  youtubeId?: string;
};

export const VIDEOS = {
  /** Hero page d'accueil — présentation formation IA BTP (Laure Olivié). */
  accueilHeroLaureOlivie2026: {
    src: 'https://youtu.be/TfSNa-4Sc5E',
    youtubeId: 'TfSNa-4Sc5E',
    title: 'Formation IA pour le BTP — présentiel Île-de-France, Laure Olivié',
  },
  /** Page formation NIV-10 — présentation Développement web avec l’IA. */
  formationDevWebIaSansCoder2026: {
    src: 'https://youtu.be/rJyZjZPLFpE',
    youtubeId: 'rJyZjZPLFpE',
    title: 'Développement web avec l’IA — sans savoir coder — présentation formation',
    caption: 'Une idée, une journée, une première version fonctionnelle.',
  },
  /** Page BeWork — deuxième exemple formation (format 9:16). */
  beworkFormationExemple2: {
    src: '/videos/bework-formation-exemple-2.mp4',
    title: 'BeWork — formation créer avec l’IA, second exemple',
    width: 1080,
    height: 1920,
    caption: 'Créer avec l’IA — sans savoir coder',
  },
  /** Page BeWork — pub formation (format 9:16). */
  beworkVideoPub: {
    src: '/videos/bework-video-pub.mp4',
    title: 'BeWork — pub formation créer avec l’IA',
    width: 1080,
    height: 1920,
    caption: 'Pub BeWork — apprendre aujourd’hui, créer demain',
  },
  /** Page BeWork — promo paysage (format 16:9). */
  beworkPromo: {
    src: '/videos/bework-promo.mp4',
    title: 'BeWork — promo Développement web avec l’IA sans savoir coder',
    width: 1920,
    height: 1080,
    caption: 'Promo BeWork — apprendre aujourd’hui, créer demain',
  },
} as const satisfies Record<string, SiteVideo>;

export type BeworkVideoKey =
  | 'beworkFormationExemple2'
  | 'beworkVideoPub'
  | 'beworkPromo';

/** Vidéos additionnelles affichées sous les démos (hors hero). */
export const BEWORK_PAGE_GALLERY_VIDEOS: readonly BeworkVideoKey[] = [
  'beworkFormationExemple2',
  'beworkVideoPub',
] as const;
