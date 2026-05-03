'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';
import { QualiopiLogoInline } from '@/components/QualiopiLogo';
import { CTACalendly } from '@/components/CTACalendly';

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
    if (visible) {
      document.body.style.paddingBottom = '60px';
    } else {
      document.body.style.paddingBottom = '';
    }
    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [visible]);

  if (!eligible) return null;

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] flex h-[60px] items-stretch border-t border-[#D4E3FC] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      role="region"
      aria-label="Formation IA BTP — prise de rendez-vous"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4">
        <p className="hidden min-w-0 flex-1 items-center gap-2 truncate text-sm font-medium text-slate-800 sm:flex">
          <span className="inline-flex shrink-0 items-center rounded border border-slate-200 bg-white px-1 py-0.5">
            <QualiopiLogoInline heightPx={16} />
          </span>
          <span className="truncate">Formation IA BTP — Qualiopi · Constructys</span>
        </p>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none sm:justify-end">
          <CTACalendly
            page={pathname}
            ctaPosition="footer"
            ctaId="sticky-blog-metier"
            utmSource="blog"
            utmMedium="sticky"
            utmCampaign="blog-metier"
            className="inline-flex h-10 max-w-full flex-1 items-center justify-center rounded-lg bg-[#377CF3] px-8 text-base font-bold text-white transition-colors hover:bg-[#2d6ab8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:h-10 sm:flex-none sm:px-5 sm:text-sm"
          >
            Réservez votre visio découverte gratuite
          </CTACalendly>
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
