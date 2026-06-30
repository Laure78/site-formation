'use client';

import { getOfcPromoVideoTitle, OFC_PROMO_VIDEO } from '@/lib/ofc-promo-video';

export type OfcPromoVideoVariant =
  | 'default'
  | 'onAccent'
  | 'heroColumn'
  | 'pillarMuted'
  | 'pillarBrand';

const WRAPPER: Record<OfcPromoVideoVariant, string> = {
  default:
    'relative w-full overflow-hidden rounded-xl border border-slate-200/90 bg-[#eef3fb] shadow-inner ring-1 ring-slate-900/5',
  onAccent:
    'overflow-hidden rounded-2xl bg-white/95 p-1 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] ring-1 ring-white/30',
  heroColumn:
    'overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm',
  pillarMuted:
    'relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_48px_-16px_rgba(15,23,42,0.14)] ring-4 ring-white',
  pillarBrand:
    'overflow-hidden rounded-xl border border-white/25 bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/15',
};

const INNER: Partial<Record<OfcPromoVideoVariant, string>> = {
  onAccent: 'overflow-hidden rounded-[0.85rem]',
  heroColumn: 'relative w-full bg-[#eef3fb]',
  pillarMuted: 'relative w-full bg-[#eef3fb]',
  pillarBrand: 'relative w-full bg-[#eef3fb]',
  default: 'relative w-full',
};

type OfcPromoVideoEmbedProps = {
  variant?: OfcPromoVideoVariant;
  className?: string;
  /** Titre iframe — défaut : libellé hero accueil (PHOTOS). */
  title?: string;
};

/**
 * Vidéo promo formations Laure Olivié — iframe HTML autonome, ratio 1200×800.
 */
export function OfcPromoVideoEmbed({
  variant = 'default',
  className = '',
  title,
}: OfcPromoVideoEmbedProps) {
  const iframeTitle = title ?? getOfcPromoVideoTitle();
  const innerClass = INNER[variant] ?? INNER.default ?? 'relative w-full';

  return (
    <div className={`${WRAPPER[variant]} ${className}`.trim()}>
      <div
        className={innerClass}
        style={{ aspectRatio: OFC_PROMO_VIDEO.aspectRatio }}
      >
        <iframe
          src={OFC_PROMO_VIDEO.src}
          title={iframeTitle}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
