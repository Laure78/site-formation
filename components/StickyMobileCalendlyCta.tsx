'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { CtaVisio } from '@/components/CtaVisio';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { shouldShowStickyMobileCalendlyBar } from '@/lib/sticky-mobile-calendly-path';

/** Bandeau fixe mobile — Appeler + visio découverte (après le hero). */
export function StickyMobileCalendlyCta() {
  const pathname = usePathname();
  const eligible = useMemo(() => shouldShowStickyMobileCalendlyBar(pathname), [pathname]);
  const isHome = pathname === '/';
  const isFormateurs = pathname === LINKS.formateurs;
  const visioSrc = isFormateurs ? 'formateurs-sticky-mobile' : 'sticky-mobile-bar';

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

    const hero = isHome
      ? document.getElementById('accueil-hero')
      : isFormateurs
        ? document.querySelector('.formateurs-page-hero')
        : null;
    let heroObserver: IntersectionObserver | undefined;

    let onScrollFallback: (() => void) | undefined;

    if (hero) {
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
  }, [eligible, isFormateurs, isHome]);

  const show = mounted && eligible && pastHero && !footerVisible;

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
        <CtaVisio
          src={visioSrc}
          data-cta="sticky-mobile-rdv"
          className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-center text-xs font-semibold leading-snug sm:text-sm"
        />
      </div>
    </div>
  );
}
