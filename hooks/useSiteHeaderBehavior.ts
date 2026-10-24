'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

const COMPACT_ON_PX = 80;
const COMPACT_OFF_PX = 24;
const HIDE_MIN_SCROLL_PX = 160;
const SCROLL_DELTA_PX = 8;

export type SiteHeaderBehavior = {
  compact: boolean;
  scrollHidden: boolean;
};

/**
 * Mesure la hauteur réelle du header sticky et met à jour `--site-header-height` / `--header-h`.
 * Rétracte le header au scroll vers le bas, le réaffiche au scroll vers le haut.
 */
export function useSiteHeaderBehavior(
  headerRef: RefObject<HTMLElement | null>,
): SiteHeaderBehavior {
  const [compact, setCompact] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeight = () => {
      const height = Math.ceil(el.getBoundingClientRect().height);
      if (height <= 0) return;
      const px = `${height}px`;
      document.documentElement.style.setProperty('--site-header-height', px);
      document.documentElement.style.setProperty('--header-h', px);
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);

    return () => ro.disconnect();
  }, [headerRef]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact((prev) => {
        if (!prev && y > COMPACT_ON_PX) return true;
        if (prev && y < COMPACT_OFF_PX) return false;
        return prev;
      });

      const delta = y - lastScrollY.current;
      if (y < HIDE_MIN_SCROLL_PX) {
        setScrollHidden(false);
      } else if (delta > SCROLL_DELTA_PX) {
        setScrollHidden(true);
      } else if (delta < -SCROLL_DELTA_PX) {
        setScrollHidden(false);
      }
      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { compact, scrollHidden };
}
