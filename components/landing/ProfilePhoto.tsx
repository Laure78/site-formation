'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

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
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
      <Image
        src="/images/laure-olivie.png"
        alt="Laure Olivié - Formatrice IA pour les entreprises du BTP"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 384px"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}
