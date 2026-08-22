'use client';

import { useEffect } from 'react';
import { sendGa4Event } from '@/lib/ga4-analytics';
import { toRdvCalendlyPosition } from '@/lib/calendly-analytics';

/**
 * Événement GA4/GTM `rdv_calendly_click` sur les clics Calendly hors `CalendlyEmbed`
 * (liens nus, widgets Calendly). Les boutons `CalendlyEmbed` ont déjà leur tracking.
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
      const pagePath = window.location.pathname;
      const position = toRdvCalendlyPosition(ctaPosition);

      sendGa4Event('rdv_calendly_click', {
        page_path: pagePath,
        position,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
