'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, X } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

/** CTA sticky au scroll — accès rapide à la prise de RDV / formulaire contact */
export function StickyRDVCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      setVisible(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (!visible) return null;

  // Ne pas afficher sur la page RDV (déjà sur place)
  if (pathname === '/prendre-rdv') return null;

  const isContactPage = pathname === '/contact';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      role="banner"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-700">
          {isContactPage
            ? 'Prêt à échanger sur votre projet de formation ?'
            : 'RDV gratuit de 30 min — Devis personnalisé sous 24h'}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          {isContactPage && (
            <Link
              href="#formulaire"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              Formulaire de contact
            </Link>
          )}
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Calendar size={18} strokeWidth={1.5} />
            Prendre RDV gratuit
          </a>
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
