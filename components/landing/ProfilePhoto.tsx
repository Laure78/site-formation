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
    <div className="overflow-hidden rounded-2xl shadow-lg">
      <Image
        src="/images/laure-olivie.png"
        alt="Laure Olivié formatrice en intelligence artificielle spécialisée dans les formations pour entreprises du BTP"
        width={912}
        height={1024}
        className="w-full h-auto"
        sizes="(max-width: 768px) 100vw, 384px"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}
