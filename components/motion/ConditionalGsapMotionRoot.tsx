'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const GsapMotionRoot = dynamic(
  () =>
    import('@/components/motion/GsapMotionRoot').then((mod) => ({
      default: mod.GsapMotionRoot,
    })),
  { ssr: false },
);

/**
 * GSAP + Lenis uniquement si la page expose des `[data-anim]` (hors accueil maquette).
 * Évite ~50+ Kio de JS parsé sur `/` et les pages marketing sans animations premium.
 */
export function ConditionalGsapMotionRoot() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (document.querySelector('[data-anim]')) {
      setEnabled(true);
      return;
    }
    setEnabled(false);

    const enable = () => {
      if (document.querySelector('[data-anim]')) setEnabled(true);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(enable, 600);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!enabled) return null;
  return <GsapMotionRoot />;
}
