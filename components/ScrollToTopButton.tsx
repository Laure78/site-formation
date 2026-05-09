'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';
import { usePathname } from 'next/navigation';

const SHOW_AFTER_PX = 400;

/**
 * Bouton fixe retour en haut — visible après scroll, charte #377CF3.
 * Position bas-gauche pour ne pas chevaucher Calendly / chat (bas-droite).
 */
export function ScrollToTopButton() {
  const pathname = usePathname();
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

  /** Remonter au-dessus du bandeau blog métiers (padding body) si présent. */
  const bottomClass = isStickyBlogMetierRdvPath(pathname)
    ? 'bottom-28 left-6 md:bottom-24'
    : 'bottom-24 left-6';

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
      className={`fixed z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#377CF3] shadow-lg transition hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${bottomClass}`}
      aria-label="Retour en haut de la page"
      title="Retour en haut"
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2} aria-hidden />
    </button>
  );
}
