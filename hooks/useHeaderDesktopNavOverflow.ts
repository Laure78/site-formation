'use client';

import { useEffect, useState, type RefObject } from 'react';

const LG_PX = 1024;
const OVERFLOW_TOLERANCE_PX = 2;

function isLgViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(min-width: ${LG_PX}px)`).matches;
}

/**
 * Détecte si la rangée de navigation dépasse la largeur disponible (≥ lg).
 * Mesure hors écran avec styles inline pour rester fiable même quand la nav est masquée (`hidden`).
 */
export function useHeaderDesktopNavOverflow(
  navRef: RefObject<HTMLElement | null>,
  layoutWidthRef: RefObject<HTMLElement | null>,
): boolean {
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    const layout = layoutWidthRef.current;
    if (!nav || !layout) return;

    const measure = () => {
      if (!isLgViewport()) {
        setOverflow(false);
        return;
      }

      const w = Math.floor(layout.getBoundingClientRect().width);
      if (w <= 0) return;

      const prev = nav.style.cssText;

      // Override `hidden` / flux pour mesurer la largeur intrinsèque des rubriques.
      nav.style.cssText = [
        'display:flex',
        'visibility:hidden',
        'position:absolute',
        'left:-9999px',
        'top:0',
        `width:${w}px`,
        'max-width:none',
        'flex-wrap:nowrap',
        'pointer-events:none',
      ].join(';');

      const needs =
        nav.scrollWidth > nav.clientWidth + OVERFLOW_TOLERANCE_PX;

      nav.style.cssText = prev;

      setOverflow(needs);
    };

    const schedule = () => {
      requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(layout);
    ro.observe(nav);

    const mq = window.matchMedia(`(min-width: ${LG_PX}px)`);
    mq.addEventListener('change', schedule);
    window.addEventListener('orientationchange', schedule);

    return () => {
      ro.disconnect();
      mq.removeEventListener('change', schedule);
      window.removeEventListener('orientationchange', schedule);
    };
  }, [navRef, layoutWidthRef]);

  return overflow;
}
