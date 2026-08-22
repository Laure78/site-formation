'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CtaButton } from '@/components/CtaButton';
import { shouldShowStickyMobileCalendlyBar } from '@/lib/sticky-mobile-calendly-path';

const SESSION_DISMISS_KEY = 'ofc-sticky-mobile-calendly-dismissed';
const SCROLL_SHOW_PX = 24;

function isDismissedInSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function setDismissedInSession(): void {
  try {
    sessionStorage.setItem(SESSION_DISMISS_KEY, '1');
  } catch {
    /* mode privé */
  }
}

/** Bandeau CTA RDV fixe en bas — mobile uniquement. */
export function StickyMobileCalendlyCta() {
  const pathname = usePathname();
  const eligible = useMemo(() => shouldShowStickyMobileCalendlyBar(pathname), [pathname]);

  const [dismissed, setDismissed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDismissed(isDismissedInSession());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!eligible) {
      setScrolled(false);
      setFooterVisible(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > SCROLL_SHOW_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const footer = document.querySelector('footer');
    if (!footer) {
      return () => window.removeEventListener('scroll', onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0, rootMargin: '0px 0px -1px 0px' },
    );
    io.observe(footer);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [eligible]);

  const handleDismiss = useCallback(() => {
    setDismissedInSession();
    setDismissed(true);
  }, []);

  const show = mounted && eligible && !dismissed && scrolled && !footerVisible;

  if (!eligible) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-[#D4E3FC] bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.1)] backdrop-blur-sm motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none md:hidden ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      role="region"
      aria-label="Réserver une visio découverte gratuite"
      aria-hidden={!show}
    >
      <div className="relative px-3 pt-3">
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-4 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm ring-1 ring-slate-200/80 transition-colors hover:bg-slate-50 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          aria-label="Masquer le bandeau de réservation"
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
        <CtaButton
          origin="sticky-mobile-bar"
          className="block w-full min-h-12 rounded-lg px-4 py-3.5 pr-12 text-center text-[0.8125rem] font-semibold leading-snug"
        />
      </div>
    </div>
  );
}
