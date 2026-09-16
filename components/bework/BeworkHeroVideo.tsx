'use client';

import { VIDEOS, type BeworkVideoKey } from '@/lib/videos';

type Props = {
  videoKey?: BeworkVideoKey;
  className?: string;
  /** Affiche la légende sous la vidéo (défaut : oui). */
  showCaption?: boolean;
};

/**
 * Lecteur vidéo BeWork — format natif 9:16 (1080×1920), sans recadrage 16:9.
 * Contrôles visibles, lecture au clic.
 */
export function BeworkHeroVideo({
  videoKey = 'beworkArtisanCreerAvecIa',
  className = '',
  showCaption = false,
}: Props) {
  const video = VIDEOS[videoKey];
  const width = video.width ?? 1080;
  const height = video.height ?? 1920;

  return (
    <figure className={`mx-auto w-full max-w-[min(100%,360px)] ${className}`}>
      <div
        className="overflow-hidden rounded-xl border border-slate-200/90 bg-[#0F172A] shadow-[0_8px_30px_rgba(29,78,216,0.12)]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <video
          className="block h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          width={width}
          height={height}
          aria-label={video.title}
          title={video.title}
        >
          <source src={video.src} type="video/mp4" />
          Votre navigateur ne permet pas la lecture de cette vidéo.
        </video>
      </div>
      {showCaption && 'caption' in video && video.caption ? (
        <figcaption className="mt-3 text-center text-xs leading-snug text-[#64748B]">
          {video.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
