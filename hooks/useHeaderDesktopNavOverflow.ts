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
  /** Recalcule quand l’état actif des liens change (poids police, libellés). */
  remeasureKey?: string,
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

      // Override `hidden` / `display:none !important` (mode burger desktop) pour mesurer
      // la largeur intrinsèque — sans `!important`, la feuille de style gagne et la mesure
      // devient fausse → bascule overflow / affichage en boucle (« tremblement »).
      nav.style.cssText = '';
      nav.style.setProperty('display', 'flex', 'important');
      nav.style.setProperty('flex-direction', 'row', 'important');
      nav.style.setProperty('flex-wrap', 'nowrap', 'important');
      nav.style.visibility = 'hidden';
      nav.style.position = 'absolute';
      nav.style.left = '-9999px';
      nav.style.top = '0';
      nav.style.width = `${w}px`;
      nav.style.maxWidth = 'none';
      nav.style.pointerEvents = 'none';

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
  }, [navRef, layoutWidthRef, remeasureKey]);

  return overflow;
}
