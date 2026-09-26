'use client';

import Image from 'next/image';
import { OfcYouTubeEmbed } from '@/components/ui/OfcYouTubeEmbed';
import { PHOTOS } from '@/lib/photos';
import { VIDEOS } from '@/lib/videos';

const POSTER = PHOTOS.heroAccueilFormationIABtpEchange2026;
const VIDEO = VIDEOS.accueilHeroLaureOlivie2026;

type Props = {
  className?: string;
};

/**
 * Hero accueil — poster local (LCP) ; embed YouTube au clic (youtube-nocookie).
 */
export function AccueilHeroVideo({ className }: Props) {
  const youtubeId = VIDEO.youtubeId;

  if (!youtubeId) {
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

  return (
    <OfcYouTubeEmbed
      youtubeId={youtubeId}
      title={VIDEO.title}
      poster={{
        src: POSTER.src,
        alt: POSTER.alt,
        width: POSTER.width,
        height: POSTER.height,
        title: POSTER.title,
      }}
      priority
      showFrame={false}
      aspectClassName="aspect-[4/3] w-full overflow-hidden rounded-[0.9rem]"
      className={className}
    />
  );
}
