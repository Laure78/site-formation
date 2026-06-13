'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const SHOW_AFTER_PX = 400;

/** Bouton fixe retour en haut — haut droite, charte #377CF3. */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    setVisible(window.scrollY > SHOW_AFTER_PX);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollTop}
      className="fixed right-4 top-[calc(var(--site-header-height)+0.75rem)] z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#377CF3] text-white shadow-[0_4px_16px_rgba(55,124,243,0.35)] transition hover:bg-[#2d6ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] motion-reduce:transition-none md:right-6"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
