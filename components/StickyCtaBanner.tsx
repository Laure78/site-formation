'use client';

import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildCalendlyUrlWithUtm } from '@/lib/calendly';
import { isBlogPath } from '@/lib/is-blog-path';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const SESSION_DISMISS_KEY = 'ofc-sticky-cta-banner-dismissed';
const SCROLL_THRESHOLD = 0.3;

const STICKY_BANNER_CALENDLY_URL = buildCalendlyUrlWithUtm({
  utmSource: 'site',
  utmMedium: 'sticky-banner',
  utmCampaign: 'blog',
});

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

function getScrollRatio(): number {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return window.scrollY / docHeight;
}

/**
 * Bandeau CTA Calendly fixe en bas — pages blog uniquement.
 * Apparition après 30 % de scroll, masqué près du footer, fermeture session.
 */
export function StickyCtaBanner() {
  const pathname = usePathname();
  const eligible = useMemo(() => isBlogPath(pathname), [pathname]);

  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    setDismissed(isDismissedInSession());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!eligible) {
      setScrolledEnough(false);
      setFooterVisible(false);
      return;
    }

    const onScroll = () => {
      setScrolledEnough(getScrollRatio() >= SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const footer = document.querySelector('footer');
    if (!footer) {
      return () => window.removeEventListener('scroll', onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0.05 }
    );
    io.observe(footer);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [eligible, pathname]);

  const handleDismiss = useCallback(() => {
    setDismissedInSession();
    setDismissed(true);
  }, []);

  const show = mounted && eligible && !dismissed && scrolledEnough && !footerVisible;

  if (!eligible) return null;

  return (
    <div
      role="banner"
      aria-label="Prise de rendez-vous"
      aria-hidden={!show}
      className={`${poppins.className} fixed inset-x-0 bottom-0 z-[61] bg-[#377CF3] text-white shadow-[0_-4px_20px_rgba(15,23,42,0.18)] motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-3 md:h-14 md:px-4">
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <a
            href={STICKY_BANNER_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] max-w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-6 md:text-[0.9375rem]"
          >
            <span className="truncate md:hidden">RDV gratuit 30 min →</span>
            <span className="hidden truncate md:inline">Réservez votre visio gratuite →</span>
          </a>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Fermer le bandeau"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>
      </div>
    </div>
  );
}
