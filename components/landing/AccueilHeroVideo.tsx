'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PHOTOS } from '@/lib/photos';
import { VIDEOS } from '@/lib/videos';

const POSTER = PHOTOS.heroAccueilFormationIABtpEchange2026;
const VIDEO = VIDEOS.accueilHeroLaureOlivie2026;

type Props = {
  className?: string;
};

/**
 * Hero accueil — poster prioritaire (LCP mobile) ; vidéo uniquement desktop lg+, après idle.
 * Évite le téléchargement du MP4 (~4 Mo) sur mobile / 4G lente (PageSpeed).
 */
export function AccueilHeroVideo({ className }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!desktop.matches || !motionOk.matches) return;

    const enable = () => setShowVideo(true);

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(enable, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    void videoRef.current.play().catch(() => {
      /* autoplay bloqué — le poster reste visible */
    });
  }, [showVideo]);

  if (showVideo) {
    return (
      <video
        ref={videoRef}
        className={className}
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER.src}
        aria-label={VIDEO.title}
        title={VIDEO.title}
      >
        <source src={VIDEO.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={POSTER.src}
      alt={POSTER.alt}
      title={POSTER.title}
      width={POSTER.width}
      height={POSTER.height}
      priority
      fetchPriority="high"
      className={className}
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, (max-width: 1280px) 46vw, 520px"
      quality={75}
    />
  );
}
