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
      className="fixed bottom-28 right-4 z-[55] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0b1220] text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition hover:bg-[#152238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none md:bottom-8 md:right-6 lg:bottom-10"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
