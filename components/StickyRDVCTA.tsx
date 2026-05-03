'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, X } from 'lucide-react';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';
import { CTACalendly } from '@/components/CTACalendly';

/** CTA sticky au scroll — accès rapide au catalogue et à la prise de RDV */
export function StickyRDVCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isStickyBlogMetierRdvPath(pathname)) {
      setVisible(false);
      return;
    }
    if (dismissed) return;
    const onScroll = () => {
      setVisible(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed, pathname]);

  if (isStickyBlogMetierRdvPath(pathname)) return null;
  if (!visible) return null;

  // Ne pas afficher sur la page RDV (déjà sur place)
  if (pathname === '/prendre-rdv') return null;

  const isContactPage = pathname === '/contact';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:block"
      role="banner"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm font-medium text-slate-700">
          {isContactPage
            ? 'Prêt à échanger sur votre projet de formation ?'
            : 'RDV gratuit de 30 min — Devis personnalisé sous 24h'}
        </p>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
          >
            Catalogue formations
          </Link>
          {isContactPage && (
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              Coordonnées
            </Link>
          )}
          <CTACalendly
            page={pathname}
            ctaPosition="footer"
            ctaId="sticky-rdv-desktop"
            utmSource="site"
            utmMedium="sticky"
            utmCampaign="sticky-rdv-desktop"
            className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#2d6ab8]"
          >
            <Calendar size={18} strokeWidth={1.5} />
            Prendre rendez-vous (30 min, gratuit)
          </CTACalendly>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fermer"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
