import { buildPromoVideoIframeTitle, buildPromoVideoSectionHeading } from '@/lib/seo-geo-keywords';

/** Présentation animée formations OFC — bundle HTML autonome (ratio 1200×800). */
export const OFC_PROMO_VIDEO = {
  src: '/video-formations-laure-olivie.html',
  aspectRatio: '1200 / 800' as const,
  width: 1200,
  height: 800,
} as const;

/** Page canonique « watch » pour l’indexation vidéo Google. */
export const OFC_PROMO_VIDEO_WATCH_PATH = '/video/formations-ia-btp' as const;

/** Métadonnées VideoObject / sitemap vidéo (alignées sur le hero accueil). */
export const OFC_PROMO_VIDEO_SEO = {
  name: 'Formation IA pour le BTP — présentation Laure Olivié (OFC Qualiopi)',
  description:
    'Vidéo de présentation des formations IA pour le bâtiment et les travaux publics : devis, appels d\'offres, comptes rendus de chantier et administratif BTP. Laure Olivié, formatrice certifiée Qualiopi, Île-de-France.',
  thumbnailPath: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
  thumbnailWidth: 1024,
  thumbnailHeight: 1024,
  /** Date de mise en ligne du bundle vidéo (git). */
  uploadDate: '2026-06-21',
  /** Durée estimée de la présentation animée. */
  duration: 'PT2M',
} as const;

export function getOfcPromoVideoTitle(): string {
  return buildPromoVideoIframeTitle();
}

/** Titre visible H1/H2 des blocs vidéo promo (accueil, page watch). */
export function getOfcPromoVideoSectionHeading(): string {
  return buildPromoVideoSectionHeading();
}

export function getOfcPromoVideoPlayerUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}${OFC_PROMO_VIDEO.src}`;
}

export function getOfcPromoVideoWatchUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}${OFC_PROMO_VIDEO_WATCH_PATH}`;
}
