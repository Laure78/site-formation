'use client';

import { VIDEOS } from '@/lib/videos';

const VIDEO = VIDEOS.beworkArtisanCreerAvecIa;

type Props = {
  className?: string;
};

/**
 * Vidéo promo BeWork (artisan) — format natif 9:16 (1080×1920), sans recadrage 16:9.
 * Contrôles visibles, lecture au clic.
 */
export function BeworkHeroVideo({ className = '' }: Props) {
  return (
    <figure className={`mx-auto w-full max-w-[min(100%,360px)] ${className}`}>
      <div
        className="overflow-hidden rounded-xl border border-slate-200/90 bg-[#0F172A] shadow-[0_8px_30px_rgba(29,78,216,0.12)]"
        style={{ aspectRatio: `${VIDEO.width} / ${VIDEO.height}` }}
      >
        <video
          className="block h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          width={VIDEO.width}
          height={VIDEO.height}
          aria-label={VIDEO.title}
          title={VIDEO.title}
        >
          <source src={VIDEO.src} type="video/mp4" />
          Votre navigateur ne permet pas la lecture de cette vidéo.
        </video>
      </div>
    </figure>
  );
}
