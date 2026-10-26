'use client';

import { useEffect } from 'react';
import { scrollToInPageHash } from '@/components/navigation/InPageAnchor';

/** Au chargement ou changement de hash, scroll vers l’élément cible (navigation client Next.js). */
export function ScrollToHashOnLoad() {
  useEffect(() => {
    const run = () => {
      const hash = window.location.hash;
      if (!hash) return;
      requestAnimationFrame(() => {
        scrollToInPageHash(hash);
      });
    };

    run();
    window.addEventListener('hashchange', run);
    return () => window.removeEventListener('hashchange', run);
  }, []);

  return null;
}
