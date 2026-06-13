'use client';

import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

type Props = {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
  /** Décalage vertical de l’animation (px) */
  revealDistance?: number;
};

/** Section EEAT avec apparition au scroll — page /a-propos. */
export function AProposSection({ id, title, children, className = '', revealDistance = 14 }: Props) {
  return (
    <Reveal as="section" id={id} distance={revealDistance} className={`scroll-mt-24 ${className}`.trim()}>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">{title}</h2>
        {children}
      </div>
    </Reveal>
  );
}
