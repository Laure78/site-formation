'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';
import { PHOTOS } from '@/lib/photos';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';

const PROFILE = PHOTOS.portraitPro2026;

type Props = {
  /** Surcharge alt (ex. accueil vs page À propos) */
  alt?: string;
  /** Complément au survol — ne pas dupliquer l’alt */
  title?: string;
  /** LCP — activer sur le hero « À propos » ; laisser false sur l’accueil (hero prioritaire). */
  priority?: boolean;
};

export function ProfilePhoto({ alt, title, priority = false }: Props) {
  const [error, setError] = useState(false);
  const altText = alt ?? PROFILE.alt;

  if (error) {
    return (
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
        <User size={80} strokeWidth={1} className="text-slate-400" />
      </div>
    );
  }

  return (
    <PortraitLinkedInLink className="block overflow-hidden rounded-2xl bg-white shadow-lg transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
      <Image
        src={PROFILE.src}
        alt={altText}
        title={title ?? PROFILE.title}
        width={PROFILE.width}
        height={PROFILE.height}
        className="h-auto w-full object-contain"
        sizes="(max-width: 768px) 100vw, 384px"
        priority={priority}
        quality={priority ? 75 : 70}
        loading={priority ? undefined : 'lazy'}
        onError={() => setError(true)}
      />
    </PortraitLinkedInLink>
  );
}
