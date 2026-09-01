'use client';

import dynamic from 'next/dynamic';

const RevealScrollObserver = dynamic(
  () =>
    import('@/components/motion/RevealScrollObserver').then((mod) => ({
      default: mod.RevealScrollObserver,
    })),
  { ssr: false },
);

/** Observer scroll différé — hors bundle/hydratation initial de l’accueil. */
export function DeferredRevealScrollObserver() {
  return <RevealScrollObserver />;
}
