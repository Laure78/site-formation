'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';
import { PHOTOS } from '@/lib/photos';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';

const PROFILE = PHOTOS.portraitPro2026;

export function ProfilePhoto() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
        <User size={80} strokeWidth={1} className="text-slate-400" />
      </div>
    );
  }

  return (
    <PortraitLinkedInLink className="block overflow-hidden rounded-2xl shadow-lg transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
      <Image
        src={PROFILE.src}
        alt={PROFILE.alt}
        width={PROFILE.width}
        height={PROFILE.height}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 384px"
        priority
        onError={() => setError(true)}
      />
    </PortraitLinkedInLink>
  );
}
