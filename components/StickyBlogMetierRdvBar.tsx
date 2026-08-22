'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

const SESSION_DISMISS_KEY = 'ofc-sticky-formation-rdv-banner-dismissed';
const SCROLL_SHOW_PX = 300;

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

export function StickyBlogMetierRdvBar() {
  const pathname = usePathname();
  const eligible = useMemo(() => isStickyBlogMetierRdvPath(pathname), [pathname]);

  const [dismissed, setDismissed] = useState(false);
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [pastLastCta, setPastLastCta] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setDismissed(isDismissedInSession());
  }, []);

  useEffect(() => {
    if (!eligible) {
      setScrolledEnough(false);
      setPastLastCta(false);
      return;
    }

    setPastLastCta(false);

    const onScroll = () => {
      setScrolledEnough(window.scrollY > SCROLL_SHOW_PX);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const footer = document.querySelector('footer');
    if (!footer) {
      return () => window.removeEventListener('scroll', onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) setPastLastCta(true);
      },
      { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0.05 }
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

  const visible = eligible && !dismissed && scrolledEnough && !pastLastCta;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!visible) {
      document.body.style.paddingBottom = '';
      return;
    }

    const mq = window.matchMedia('(min-width: 768px)');
    const syncPadding = () => {
      document.body.style.paddingBottom = mq.matches ? '60px' : '';
    };
    syncPadding();
    mq.addEventListener('change', syncPadding);

    return () => {
      document.body.style.paddingBottom = '';
      mq.removeEventListener('change', syncPadding);
    };
  }, [visible]);

  if (!eligible) return null;

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] hidden h-[60px] items-stretch border-t border-[#D4E3FC] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:flex"
      role="region"
      aria-label="Formation IA pour les pros du BTP — prise de rendez-vous"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4">
        <p className="hidden min-w-0 flex-1 truncate text-sm font-medium text-slate-800 sm:block">
          Formation IA appliquée au bâtiment — organisme certifié Qualiopi · Constructys
        </p>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none sm:justify-end">
          <CalendlyEmbed
            type="link"
            variant="primary"
            ctaPosition="footer"
            ctaId="sticky-blog-metier"
            utmSource="blog"
            utmMedium="sticky"
            campaign="blog-metier"
            className="h-10 max-w-full flex-1 rounded-xl px-8 text-base font-bold sm:flex-none sm:px-5 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          aria-label="Fermer le bandeau"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
