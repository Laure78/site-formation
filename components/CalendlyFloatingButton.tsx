'use client';

import { usePathname } from 'next/navigation';
import { CTA_RDV_LABEL, CtaRdv } from '@/components/CtaRdv';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';

/** Bouton flottant bas à droite — prise de RDV via `/prendre-rendez-vous`. */
export function CalendlyFloatingButton() {
  const pathname = usePathname();

  if (pathname === '/prendre-rdv' || pathname === '/prendre-rendez-vous') return null;

  const positionClass = isStickyBlogMetierRdvPath(pathname)
    ? 'bottom-32 right-6 md:bottom-28'
    : 'bottom-24 right-6';

  return (
    <CtaRdv
      origin="footer-floating-button"
      variant="primary"
      className={`fixed z-[70] inline-flex max-w-[min(100vw-3rem,20rem)] items-center gap-2 px-4 py-3 text-left text-sm shadow-lg ${positionClass}`}
      aria-label={CTA_RDV_LABEL}
      title={CTA_RDV_LABEL}
    />
  );
}
