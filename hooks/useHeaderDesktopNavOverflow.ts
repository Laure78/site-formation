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
 * Mesure avec la nav positionnée dans le slot (`layout` en `relative`) pour que `scrollWidth`
 * reflète la vraie largeur utile — évite les faux négatifs si la nav était mesurée hors flux
 * (`left: -9999px`), qui masquaient le débordement et provoquaient chevauchements logo / liens / CTA.
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

      const slotWidth = Math.floor(layout.getBoundingClientRect().width);
      if (slotWidth <= 0) return;

      const prev = nav.style.cssText;
      const computed = getComputedStyle(nav);
      const wasDisplayNone = computed.display === 'none';

      nav.style.cssText = '';
      if (wasDisplayNone) {
        nav.style.setProperty('display', 'flex', 'important');
      }
      nav.style.setProperty('flex-direction', 'row', 'important');
      nav.style.setProperty('flex-wrap', 'nowrap', 'important');
      nav.style.visibility = 'hidden';
      nav.style.pointerEvents = 'none';
      nav.style.position = 'absolute';
      nav.style.left = '0';
      nav.style.top = '0';
      nav.style.width = '100%';
      nav.style.maxWidth = 'none';
      nav.style.boxSizing = 'border-box';

      const needs = nav.scrollWidth > nav.clientWidth + OVERFLOW_TOLERANCE_PX;

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
