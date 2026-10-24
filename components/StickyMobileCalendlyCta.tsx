'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { CONTACT } from '@/lib/constants';
import { HEADER_PRIMARY_CTA_HREF, HEADER_PRIMARY_CTA_LABEL } from '@/lib/header-cta';
import { shouldShowStickyMobileCalendlyBar } from '@/lib/sticky-mobile-calendly-path';

/** Bandeau fixe mobile — Appeler + Échanger (après le hero sur l’accueil). */
export function StickyMobileCalendlyCta() {
  const pathname = usePathname();
  const eligible = useMemo(() => shouldShowStickyMobileCalendlyBar(pathname), [pathname]);
  const isHome = pathname === '/';

  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!eligible) {
      setPastHero(false);
      setFooterVisible(false);
      return;
    }

    const hero = document.getElementById('accueil-hero');
    let heroObserver: IntersectionObserver | undefined;

    let onScrollFallback: (() => void) | undefined;

    if (isHome && hero) {
      heroObserver = new IntersectionObserver(
        (entries) => setPastHero(!entries[0]?.isIntersecting),
        { threshold: 0, rootMargin: '0px' },
      );
      heroObserver.observe(hero);
    } else {
      onScrollFallback = () => setPastHero(window.scrollY > 280);
      onScrollFallback();
      window.addEventListener('scroll', onScrollFallback, { passive: true });
    }

    const footer = document.querySelector('footer');
    let footerIo: IntersectionObserver | undefined;
    if (footer) {
      footerIo = new IntersectionObserver(
        (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
        { threshold: 0, rootMargin: '0px 0px -1px 0px' },
      );
      footerIo.observe(footer);
    }

    return () => {
      heroObserver?.disconnect();
      if (onScrollFallback) {
        window.removeEventListener('scroll', onScrollFallback);
      }
      footerIo?.disconnect();
    };
  }, [eligible, isHome]);

  const show = mounted && eligible && pastHero && !footerVisible;

  const rdvHref = `${HEADER_PRIMARY_CTA_HREF}?src=${encodeURIComponent('sticky-mobile-bar')}`;

  if (!eligible) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-[#D4E3FC] bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.1)] backdrop-blur-sm motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-reduce:transition-none md:hidden ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{
        paddingBottom: 'max(0px, env(safe-area-inset-bottom, 0px))',
        minHeight: '3.5rem',
      }}
      role="region"
      aria-label="Contact rapide"
      aria-hidden={!show}
    >
      <div className="grid h-14 grid-cols-2 gap-2 px-3 py-2">
        <a
          href={`tel:${CONTACT.phone}`}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ofc-border bg-white px-3 text-sm font-semibold text-ofc-ink transition-colors hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Appeler
        </a>
        <Link
          href={rdvHref}
          data-cta="sticky-mobile-rdv"
          aria-label={HEADER_PRIMARY_CTA_LABEL}
          onClick={() => {
            if (typeof window !== 'undefined') {
              trackCtaRdvClick('sticky-mobile-bar', window.location.pathname);
            }
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#377CF3] px-3 text-center text-xs font-semibold leading-snug text-white transition-colors hover:bg-[#2a63d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:text-sm"
        >
          {HEADER_PRIMARY_CTA_LABEL}
        </Link>
      </div>
    </div>
  );
}
