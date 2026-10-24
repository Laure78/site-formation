'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

/** Barre CTA fixe mobile — formateurs (Appeler + Échanger). */
export function FormateursMobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.formateurs-hub-hero');
    const footer = document.querySelector('footer');
    let footerVisible = false;

    const onScroll = () => {
      const pastHero = hero
        ? hero.getBoundingClientRect().bottom < 0
        : window.scrollY > 280;
      setVisible(pastHero && !footerVisible);
    };

    let footerIo: IntersectionObserver | undefined;
    if (footer) {
      footerIo = new IntersectionObserver(
        (entries) => {
          footerVisible = entries.some((e) => e.isIntersecting);
          onScroll();
        },
        { threshold: 0, rootMargin: '0px 0px -1px 0px' },
      );
      footerIo.observe(footer);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      footerIo?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-[#D4E3FC] bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.1)] backdrop-blur-sm motion-safe:transition-[transform,opacity] motion-reduce:transition-none md:hidden ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      role="region"
      aria-label="Actions rapides formateurs"
    >
      <div className="flex gap-2 px-3 py-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${CONTACT.phone}`}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-[#377CF3] bg-white px-3 text-sm font-semibold text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Appeler
        </a>
        <Link
          href={LINKS.contact}
          className="inline-flex min-h-11 flex-[1.2] items-center justify-center rounded-lg bg-[#377CF3] px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Échanger
        </Link>
      </div>
    </div>
  );
}
