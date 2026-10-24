'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/** Bouton retour en haut — visible après ~2 écrans, au-dessus de la barre CTA mobile. */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const threshold = Math.max(400, window.innerHeight * 2);
    setVisible(window.scrollY > threshold);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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
      className="fixed right-4 z-[55] inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#377CF3] shadow-md transition hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] motion-reduce:transition-none max-md:bottom-[calc(3.75rem+max(0px,env(safe-area-inset-bottom,0px))+0.5rem)] md:bottom-8 md:right-6 lg:bottom-10"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
