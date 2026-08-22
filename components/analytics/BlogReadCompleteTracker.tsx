'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackBlogReadComplete } from '@/lib/ga4-analytics';

const SCROLL_THRESHOLD = 0.9;

/**
 * Événement GA4 `blog_read_complete` — déclenché une fois par article à 90 % de scroll.
 */
export function BlogReadCompleteTracker() {
  const pathname = usePathname();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!pathname?.startsWith('/blog/')) return;

    const slug = pathname.slice('/blog/'.length).split('/')[0]?.trim();
    if (!slug) return;

    firedRef.current = false;

    const checkScroll = () => {
      if (firedRef.current) return;

      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) return;

      const ratio = window.scrollY / scrollHeight;
      if (ratio >= SCROLL_THRESHOLD) {
        firedRef.current = true;
        trackBlogReadComplete(slug, pathname);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, [pathname]);

  return null;
}
