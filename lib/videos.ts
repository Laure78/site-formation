/** Vidéos statiques servies depuis `/public/videos`. */

export type SiteVideo = {
  src: string;
  title: string;
  width?: number;
  height?: number;
  /** Légende courte sous le lecteur (page BeWork). */
  caption?: string;
};

export const VIDEOS = {
  /** Hero page d'accueil — présentation formation IA BTP (Laure Olivié). */
  accueilHeroLaureOlivie2026: {
    src: '/videos/accueil-hero-laureolivie.mp4',
    title: 'Formation IA pour le BTP — présentiel Île-de-France, Laure Olivié',
  },
  /** Page BeWork — pub artisan (format 9:16 / 1080×1920). */
  beworkArtisanCreerAvecIa: {
    src: '/videos/bework-artisan-creer-avec-ia.mp4',
    title: 'BeWork — créer avec l’IA sans savoir coder, exemple artisan',
    width: 1080,
    height: 1920,
    caption: 'Exemple artisan — de l’idée au projet',
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
} as const satisfies Record<string, SiteVideo>;

export type BeworkVideoKey =
  | 'beworkArtisanCreerAvecIa'
  | 'beworkFormationExemple2'
  | 'beworkVideoPub';

/** Vidéos additionnelles affichées sous les démos (hors hero). */
export const BEWORK_PAGE_GALLERY_VIDEOS: readonly BeworkVideoKey[] = [
  'beworkFormationExemple2',
  'beworkVideoPub',
] as const;
