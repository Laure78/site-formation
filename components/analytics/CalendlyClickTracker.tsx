'use client';

import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Événement GA4/GTM `calendly_click` sur tous les clics Calendly.
 */
export function CalendlyClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      const hit =
        target.closest('[data-calendly]') ||
        target.closest('.calendly-inline-widget') ||
        target.closest('.calendly-popup-content') ||
        target.closest('a[href*="calendly.com"]');
      if (!hit) return;
      if ((hit as HTMLElement).dataset?.calendlyTracked === 'component') return;

      const ctaPosition = (hit as HTMLElement).dataset?.ctaPosition ?? 'unknown';
      const location = window.location.pathname;

      sendGTMEvent({
        event: 'calendly_click',
        location,
        cta_position: ctaPosition,
      });

      const w = window as Window & { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag !== 'function') return;

      w.gtag('event', 'calendly_click', {
        location,
        cta_position: ctaPosition,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
