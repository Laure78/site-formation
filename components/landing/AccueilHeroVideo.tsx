'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PHOTOS } from '@/lib/photos';
import { VIDEOS } from '@/lib/videos';

const POSTER = PHOTOS.heroAccueilFormationIABtpEchange2026;
const VIDEO = VIDEOS.accueilHeroLaureOlivie2026;

type Props = {
  className?: string;
};

/**
 * Hero accueil — poster prioritaire (LCP) ; embed YouTube après idle.
 * Respecte prefers-reduced-motion (poster seul).
 */
export function AccueilHeroVideo({ className }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const youtubeId = VIDEO.youtubeId;

  useEffect(() => {
    if (!youtubeId) return;

    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!motionOk.matches) return;

    const enable = () => setShowVideo(true);

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(enable, 2000);
    return () => clearTimeout(timer);
  }, [youtubeId]);

  if (showVideo && youtubeId) {
    const embedSrc = new URL(`https://www.youtube-nocookie.com/embed/${youtubeId}`);
    embedSrc.searchParams.set('autoplay', '1');
    embedSrc.searchParams.set('mute', '1');
    embedSrc.searchParams.set('loop', '1');
    embedSrc.searchParams.set('playlist', youtubeId);
    embedSrc.searchParams.set('rel', '0');
    embedSrc.searchParams.set('playsinline', '1');
    embedSrc.searchParams.set('modestbranding', '1');

    return (
      <div className={`relative overflow-hidden bg-black ${className ?? ''}`}>
        <iframe
          src={embedSrc.toString()}
          title={VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
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
