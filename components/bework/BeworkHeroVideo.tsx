'use client';

import { VIDEOS } from '@/lib/videos';

const VIDEO = VIDEOS.beworkArtisanCreerAvecIa;

type Props = {
  className?: string;
};

/**
 * Vidéo promo BeWork (artisan) — contrôles visibles, lecture au clic.
 * Uniquement sur /bework (pas sur l’accueil).
 */
export function BeworkHeroVideo({ className = '' }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200/90 bg-[#0F172A] shadow-[0_8px_30px_rgba(29,78,216,0.12)] ${className}`}
    >
      <video
        className="aspect-video h-auto w-full object-cover"
        controls
        playsInline
        preload="metadata"
        aria-label={VIDEO.title}
        title={VIDEO.title}
      >
        <source src={VIDEO.src} type="video/mp4" />
        Votre navigateur ne permet pas la lecture de cette vidéo.
      </video>
    </div>
  );
}
