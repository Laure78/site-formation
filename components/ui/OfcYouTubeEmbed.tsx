'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

type OfcYouTubeEmbedProps = {
  youtubeId: string;
  title: string;
  /** Affiche une vignette locale avant le clic (meilleur LCP que l’iframe). */
  poster?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    title?: string;
  };
  caption?: string;
  className?: string;
  /** Autoplay muet en boucle (hero ambient). Sinon : lecture au clic. */
  autoplay?: boolean;
  priority?: boolean;
};

/**
 * Embed YouTube OFC — cadre discret 16:9, youtube-nocookie.
 * Par défaut : poster + lecture au clic (contrôles visibles).
 */
export function OfcYouTubeEmbed({
  youtubeId,
  title,
  poster,
  caption,
  className,
  autoplay = false,
  priority = false,
}: OfcYouTubeEmbedProps) {
  const [playing, setPlaying] = useState(autoplay);

  const embedSrc = new URL(`https://www.youtube-nocookie.com/embed/${youtubeId}`);
  embedSrc.searchParams.set('rel', '0');
  embedSrc.searchParams.set('playsinline', '1');
  embedSrc.searchParams.set('modestbranding', '1');
  if (autoplay) {
    embedSrc.searchParams.set('autoplay', '1');
    embedSrc.searchParams.set('mute', '1');
    embedSrc.searchParams.set('loop', '1');
    embedSrc.searchParams.set('playlist', youtubeId);
  } else if (playing) {
    embedSrc.searchParams.set('autoplay', '1');
  }

  return (
    <figure className={cn('w-full', className)}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-ofc-canvas ring-1 ring-ofc-border/70">
        {playing ? (
          <iframe
            src={embedSrc.toString()}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block h-full w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={`Lire la vidéo : ${title}`}
          >
            {poster ? (
              <Image
                src={poster.src}
                alt={poster.alt}
                title={poster.title}
                width={poster.width}
                height={poster.height}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 92vw, 420px"
                priority={priority}
                quality={priority ? 75 : 70}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- vignette YouTube distante
              <img
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
            <span
              className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
              aria-hidden
            />
            <span
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#377CF3] text-white shadow-[0_8px_24px_rgba(55,124,243,0.35)] transition group-hover:scale-105"
              aria-hidden
            >
              <Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={0} />
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-xs leading-relaxed text-ofc-ink-subtle md:text-[0.8125rem]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
