'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';
import { CTACalendly } from '@/components/CTACalendly';

const SESSION_KEY = 'cta-dismissed';

/** Bandeau CTA fixe en bas d’écran — mobile uniquement (md et plus : masqué). */
export function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDismissed(true);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  if (isStickyBlogMetierRdvPath(pathname)) return null;
  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-[var(--accent)] px-4 py-3 text-white shadow-lg md:hidden"
      role="region"
      aria-label="Offre formation IA BTP"
    >
      <div className="min-w-0 pr-2">
        <p className="text-sm font-semibold">
          📅 Formation IA BTP — 30 min offertes
        </p>
        <p className="text-xs opacity-90">Financement possible selon éligibilité</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <CTACalendly
          page={pathname}
          ctaPosition="footer"
          ctaId="sticky-mobile"
          utmSource="site"
          utmMedium="sticky"
          utmCampaign="sticky-mobile"
          className="whitespace-nowrap rounded-lg bg-white px-6 py-4 text-base font-bold text-[#377CF3]"
        >
          Prendre rendez-vous (30 min, gratuit)
        </CTACalendly>
        <button
          type="button"
          onClick={dismiss}
          className="text-lg leading-none text-white opacity-80 hover:opacity-100"
          aria-label="Fermer cette annonce"
        >
          ×
        </button>
      </div>
    </div>
  );
}
