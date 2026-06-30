'use client';

import { useEffect, useRef, useState } from 'react';

type DeferredIframeProps = {
  title: string;
  src: string;
  className?: string;
  rootMargin?: string;
  placeholderLabel?: string;
};

/**
 * N’injecte l’attribut `src` (souvent très long pour LinkedIn Learning) qu’au scroll.
 * `loading="lazy"` en complément pour le chargement réseau navigateur.
 */
export function DeferredIframe({
  title,
  src,
  className = 'h-full w-full',
  rootMargin = '240px 0px',
  placeholderLabel = 'Aperçu vidéo LinkedIn Learning',
}: DeferredIframeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || activeSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activeSrc, rootMargin, src]);

  return (
    <div ref={hostRef} className="h-full w-full">
      {activeSrc ? (
        <iframe
          title={title}
          src={activeSrc}
          className={className}
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-[#0F172A] px-4 text-center text-sm text-white/75"
          aria-hidden
        >
          {placeholderLabel}
        </div>
      )}
    </div>
  );
}
