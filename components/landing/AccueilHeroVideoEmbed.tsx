'use client';

import { PHOTOS } from '@/lib/photos';

const HERO_VIDEO_SRC = '/video-formations-laure-olivie.html';

/**
 * Présentation animée hero accueil — bundle HTML autonome (public/video-formations-laure-olivie.html).
 * Même emplacement que l’affiche statique ; ratio 1200×800 du pack source.
 */
export function AccueilHeroVideoEmbed() {
  const hero = PHOTOS.heroAccueilFormationIABtpEchange2026;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-slate-200/90 bg-[#eef3fb] shadow-inner ring-1 ring-slate-900/5"
      style={{ aspectRatio: '1200 / 800' }}
    >
      <iframe
        src={HERO_VIDEO_SRC}
        title={hero.title ?? hero.alt}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
