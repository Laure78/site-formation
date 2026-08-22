'use client';

import { usePathname } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { CtaButton } from '@/components/CtaButton';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';

/** Bouton flottant bas à droite — prise de RDV via `/prendre-rendez-vous`. */
export function CalendlyFloatingButton() {
  const pathname = usePathname();

  if (pathname === '/prendre-rdv' || pathname === '/prendre-rendez-vous') return null;

  const positionClass = isStickyBlogMetierRdvPath(pathname)
    ? 'bottom-32 right-6 md:bottom-28'
    : 'bottom-24 right-6';

  return (
    <CtaButton
      origin="footer-floating-button"
      variant="unstyled"
      className={`fixed z-[70] inline-flex max-w-[min(100vw-3rem,20rem)] items-center gap-2 rounded-lg bg-[#377CF3] px-4 py-3 text-left text-sm font-semibold text-white shadow-lg transition hover:bg-[#2d6ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${positionClass}`}
      aria-label="Réservez votre visio découverte gratuite"
      title="Prendre rendez-vous"
    >
      <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
      <span className="leading-tight">Visio découverte gratuite</span>
    </CtaButton>
  );
}
