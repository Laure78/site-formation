'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  getOfcPromoVideoTitle,
  OFC_PROMO_VIDEO,
  OFC_PROMO_VIDEO_SEO,
} from '@/lib/ofc-promo-video';
import { LINKS } from '@/lib/internal-links';

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

const DEFAULT_THUMBNAIL_ALT =
  "Affiche formation IA pour le BTP : portrait Laure Olivié, devis et appels d'offres";

type OfcPromoVideoEmbedProps = {
  variant?: OfcPromoVideoVariant;
  className?: string;
  /** Titre iframe — défaut : libellé court accessibilité. */
  title?: string;
  /** Lien « page vidéo » sous le lecteur (défaut : true). */
  showWatchPageLink?: boolean;
  /** Alt du poster next/image (≤ 125 car.) — défaut : accroche accueil. */
  alt?: string;
};

/**
 * Vidéo promo formations Laure Olivié — iframe HTML autonome, ratio 1200×800.
 * Fallback object : lien descriptif vers la page watch (jamais l’URL technique du bundle).
 */
export function OfcPromoVideoEmbed({
  variant = 'default',
  className = '',
  title,
  showWatchPageLink = true,
  alt = DEFAULT_THUMBNAIL_ALT,
}: OfcPromoVideoEmbedProps) {
  const iframeTitle = title ?? getOfcPromoVideoTitle();
  const innerClass = INNER[variant] ?? INNER.default ?? 'relative w-full';

  return (
    <div className={className}>
      <div className={`${WRAPPER[variant]}`.trim()}>
        <div
          className={innerClass}
          style={{ aspectRatio: OFC_PROMO_VIDEO.aspectRatio }}
        >
          <Image
            src={OFC_PROMO_VIDEO_SEO.thumbnailPath}
            alt={alt}
            aria-hidden
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <object
            data={OFC_PROMO_VIDEO.src}
            type="text/html"
            title={iframeTitle}
            className="absolute inset-0 h-full w-full border-0"
            aria-label={iframeTitle}
          >
            <p className="flex h-full items-center justify-center bg-[#eef3fb] p-4 text-center text-sm text-slate-600">
              <Link
                href={LINKS.videoFormationsIaBtp}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Voir la présentation vidéo des formations IA BTP
              </Link>
            </p>
          </object>
        </div>
      </div>
      {showWatchPageLink ? (
        <p className="mt-2 text-center text-xs leading-relaxed text-slate-500 sm:text-left">
          <Link
            href={LINKS.videoFormationsIaBtp}
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            Voir la présentation vidéo des formations IA BTP
          </Link>
        </p>
      ) : null}
    </div>
  );
}
