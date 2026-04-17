'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Calendar } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';

/**
 * Bouton flottant bas à droite — ouvre Calendly en popup (charte #377CF3).
 */
export function CalendlyFloatingButton() {
  const pathname = usePathname();

  const openPopup = useCallback(() => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_BOOKING_URL });
    } else {
      window.open(CALENDLY_BOOKING_URL, '_blank', 'noopener,noreferrer');
    }
  }, []);

  if (pathname === '/prendre-rdv') return null;

  /** Au-dessus du bouton chat (bas droite) et du bandeau blog métiers si présent. */
  const positionClass = isStickyBlogMetierRdvPath(pathname)
    ? 'bottom-32 right-6 md:bottom-28'
    : 'bottom-24 right-6';

  return (
    <button
      type="button"
      data-calendly
      onClick={openPopup}
      className={`fixed z-[70] inline-flex max-w-[min(100vw-3rem,20rem)] items-center gap-2 rounded-full bg-[#377CF3] px-4 py-3 text-left text-sm font-semibold text-white shadow-lg transition hover:bg-[#2d6ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${positionClass}`}
      aria-label="Visio découverte gratuite — ouvrir Calendly"
      title="Ouvrir le planning Calendly"
    >
      <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
      <span className="leading-tight">Visio découverte gratuite</span>
    </button>
  );
}
