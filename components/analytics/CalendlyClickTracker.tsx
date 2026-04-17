'use client';

import { useEffect } from 'react';

/**
 * Événement GA4 `click_calendly` sur les clics Calendly (équivalent snippet WP functions.php).
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

      const w = window as Window & { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag !== 'function') return;

      w.gtag('event', 'click_calendly', {
        event_category: 'conversion',
        event_label: window.location.pathname,
        value: 1,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
