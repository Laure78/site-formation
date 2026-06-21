import { buildPromoVideoIframeTitle } from '@/lib/seo-geo-keywords';

/** Présentation animée formations OFC — bundle HTML autonome (ratio 1200×800). */
export const OFC_PROMO_VIDEO = {
  src: '/video-formations-laure-olivie.html',
  aspectRatio: '1200 / 800' as const,
  width: 1200,
  height: 800,
} as const;

export function getOfcPromoVideoTitle(): string {
  return buildPromoVideoIframeTitle();
}
