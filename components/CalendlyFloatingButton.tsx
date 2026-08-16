'use client';

import { usePathname } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';

/**
 * Bouton flottant bas à droite — lien Calendly (charte #377CF3).
 * Ouvre Calendly dans un nouvel onglet (pas de dépendance au widget JS Calendly :
 * la CSS du popup n'est pas chargée côté site, donc on évite `initPopupWidget`).
 * Tracking GA4/GTM assuré globalement via `CalendlyClickTracker` (data-calendly).
 */
export function CalendlyFloatingButton() {
  const pathname = usePathname();

  if (pathname === '/prendre-rdv' || pathname === '/prendre-rendez-vous') return null;

  /** Au-dessus du bouton chat (bas droite) et du bandeau blog métiers si présent. */
  const positionClass = isStickyBlogMetierRdvPath(pathname)
    ? 'bottom-32 right-6 md:bottom-28'
    : 'bottom-24 right-6';

  const href = buildSiteCalendlyCtaUrl('footer-floating-button');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-calendly
      data-cta-position="floating"
      data-cta-id="calendly-floating-button"
      className={`fixed z-[70] inline-flex max-w-[min(100vw-3rem,20rem)] items-center gap-2 rounded-full bg-[#377CF3] px-4 py-3 text-left text-sm font-semibold text-white shadow-lg transition hover:bg-[#2d6ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${positionClass}`}
      aria-label="Visio découverte gratuite — ouvrir Calendly dans un nouvel onglet"
      title="Ouvrir le planning Calendly"
    >
      <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
      <span className="leading-tight">Visio découverte gratuite</span>
    </a>
  );
}
