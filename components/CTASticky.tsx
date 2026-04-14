'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { isStickyBlogMetierRdvPath } from '@/lib/sticky-blog-metier-rdv-path';

/**
 * Barre CTA fixe en bas après ~30 % de scroll — visio découverte Calendly (charte OFC).
 */
export function CTASticky() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const onScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const depth = window.scrollY / maxScroll;
    setVisible(depth >= 0.3);
  }, []);

  useEffect(() => {
    if (isStickyBlogMetierRdvPath(pathname)) {
      setVisible(false);
      return;
    }
    if (dismissed) return;
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed, onScroll, pathname]);

  if (pathname === '/prendre-rdv') return null;
  if (isStickyBlogMetierRdvPath(pathname)) return null;
  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[45] border-t border-white/10 bg-[#377CF3] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      role="region"
      aria-label="Visio découverte gratuite"
    >
      <div className="relative mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:py-3.5">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 rounded-full p-1.5 text-white/90 hover:bg-white/10 md:right-3 md:top-1/2 md:-translate-y-1/2"
          aria-label="Fermer cette annonce"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <p className="hidden pr-10 text-sm font-medium text-white md:block md:pr-12 md:text-base">
          🎯 Visio découverte gratuite — 30 min pour voir si l&apos;IA vous fait gagner du temps
        </p>
        <p className="text-center text-sm font-semibold text-white md:hidden">Visio découverte gratuite</p>
        <div className="flex shrink-0 justify-center md:justify-end">
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#377CF3] shadow-sm hover:bg-blue-50 md:px-6 md:text-base"
          >
            <span className="hidden md:inline">→ Je réserve ma visio</span>
            <span className="md:hidden">Réserver</span>
          </a>
        </div>
      </div>
    </div>
  );
}
