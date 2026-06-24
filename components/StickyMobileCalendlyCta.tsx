'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { CALENDLY_DEFAULT_BUTTON_TEXT } from '@/lib/calendly-embed-config';
import { isBlogPath } from '@/lib/is-blog-path';

const SESSION_DISMISS_KEY = 'ofc-sticky-mobile-calendly-dismissed';
/** Apparition après le premier scroll significatif (mobile). */
const SCROLL_SHOW_PX = 32;

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
    /* private mode */
  }
}

/**
 * Bandeau CTA Calendly — mobile uniquement (`md:hidden`).
 * Fixed overlay : zéro CLS, masqué près du footer, fermeture session.
 */
export function StickyMobileCalendlyCta() {
  const pathname = usePathname();
  const onBlog = useMemo(() => isBlogPath(pathname), [pathname]);

  const [dismissed, setDismissed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDismissed(isDismissedInSession());
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_SHOW_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const footer = document.querySelector('footer');
    if (!footer) {
      return () => window.removeEventListener('scroll', onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0, rootMargin: '0px 0px -1px 0px' }
    );
    io.observe(footer);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissedInSession();
    setDismissed(true);
  }, []);

  const show = mounted && !onBlog && !dismissed && scrolled && !footerVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-[#D4E3FC] bg-white/95 px-3 pt-3 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-sm motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none md:hidden ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      role="region"
      aria-label="Réserver une visio découverte gratuite"
      aria-hidden={!show}
    >
      <div className="mx-auto flex w-full max-w-lg items-center gap-2">
        <CalendlyEmbed
          type="link"
          variant="primary"
          url={CALENDLY_BOOKING_URL}
          buttonText={CALENDLY_DEFAULT_BUTTON_TEXT}
          ctaPosition="floating"
          ctaId="sticky-mobile-calendly"
          utmSource="site"
          utmMedium="sticky-mobile"
          campaign="sticky-mobile-global"
          className="min-h-[48px] w-full flex-1 rounded-xl px-3 py-3.5 text-center text-[0.8125rem] font-semibold leading-snug sm:text-[0.9375rem]"
        />
        <button
          type="button"
          onClick={handleDismiss}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          aria-label="Masquer le bandeau de réservation"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
