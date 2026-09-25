'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useState } from 'react';
import { X } from 'lucide-react';

export type PhotoThumbnailLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Légende courte sous la miniature */
  caption?: string;
  /** Info complémentaire dans la lightbox (souvent description SEO) */
  detail?: string;
  title?: string;
  priority?: boolean;
  className?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
};

const DEFAULT_THUMB_W = 96;
const DEFAULT_THUMB_H = 72;

/**
 * Miniature compacte (~96×72) — ouverture en lightbox (qualité source conservée).
 */
export function PhotoThumbnailLightbox({
  src,
  alt,
  width,
  height,
  caption,
  detail,
  title,
  priority,
  className = '',
  thumbnailWidth = DEFAULT_THUMB_W,
  thumbnailHeight = DEFAULT_THUMB_H,
}: PhotoThumbnailLightboxProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <figure className={`inline-block max-w-full ${className}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block rounded-lg border border-slate-200/90 bg-white p-0.5 shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          style={{ width: thumbnailWidth, height: thumbnailHeight }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={caption ? `Agrandir : ${caption}` : `Agrandir l’illustration — ${alt}`}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-md">
            <Image
              src={src}
              alt={alt}
              title={title}
              fill
              className="object-cover transition group-hover:scale-[1.02]"
              sizes={`${thumbnailWidth}px`}
              priority={priority}
              quality={82}
            />
          </span>
        </button>
        {caption ? (
          <figcaption className="mt-2 max-w-[min(100%,280px)] text-xs leading-snug text-ofc-ink-muted">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"
            aria-label="Fermer l’aperçu agrandi"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={caption || title ? titleId : undefined}
            aria-describedby={detail ? descId : undefined}
            className="relative z-[101] flex max-h-[min(92vh,100%)] max-w-[min(96vw,1100px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/40 p-3 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- lightbox : fichier source pleine résolution */}
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="max-h-[min(75vh,900px)] w-auto max-w-full object-contain"
              />
            </div>
            {(caption || title || detail) ? (
              <div className="max-h-[28vh] overflow-y-auto border-t border-white/10 px-4 py-3 text-left sm:px-6 sm:py-4">
                {(caption || title) ? (
                  <p id={titleId} className="text-sm font-semibold text-white">
                    {caption ?? title}
                  </p>
                ) : null}
                {detail ? (
                  <p id={descId} className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {detail}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export type PhotoThumbnailGalleryItem = Pick<
  PhotoThumbnailLightboxProps,
  'src' | 'alt' | 'width' | 'height' | 'caption' | 'detail' | 'title'
>;

type PhotoThumbnailGalleryProps = {
  items: readonly PhotoThumbnailGalleryItem[];
  className?: string;
  /** Libellé accessibilité de la liste */
  ariaLabel?: string;
};

/** Grille responsive de miniatures homogènes. */
export function PhotoThumbnailGallery({
  items,
  className = '',
  ariaLabel = 'Galerie photos',
}: PhotoThumbnailGalleryProps) {
  return (
    <ul
      className={`flex flex-wrap gap-3 sm:gap-4 ${className}`}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <li key={item.src}>
          <PhotoThumbnailLightbox {...item} />
        </li>
      ))}
    </ul>
  );
}
