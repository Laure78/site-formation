'use client';

import { useEffect } from 'react';
import { toRdvCalendlyPosition } from '@/lib/calendly-analytics';
import {
  classifyPdfDownload,
  sendGa4Event,
  trackDownloadGuide,
  trackEventbriteClick,
} from '@/lib/ga4-analytics';

function isPdfDownloadLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute('href') ?? '';
  if (!href || href.startsWith('#')) return false;
  if (anchor.hasAttribute('download')) return true;
  try {
    const path = new URL(href, window.location.origin).pathname.toLowerCase();
    return path.endsWith('.pdf');
  } catch {
    return href.toLowerCase().includes('.pdf');
  }
}

function isEventbriteLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute('href') ?? '';
  if (!href) return false;
  try {
    return new URL(href, window.location.origin).hostname.includes('eventbrite.');
  } catch {
    return href.toLowerCase().includes('eventbrite.');
  }
}

/**
 * Écouteurs GA4 unifiés (Calendly + PDF + Eventbrite) — un seul composant client.
 * `eventbrite_click` mesure l’intention (clic) ; l’inscription confirmée reste côté Eventbrite.
 */
export function InteractionTrackers() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest) return;

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (anchor && isPdfDownloadLink(anchor)) {
        const href = anchor.getAttribute('href') ?? '';
        const downloadAttr = anchor.getAttribute('download');
        const { guide_type, file_name } = classifyPdfDownload(href, downloadAttr);
        trackDownloadGuide({
          guide_type,
          file_name,
          page_path: window.location.pathname,
        });
        return;
      }

      if (anchor && isEventbriteLink(anchor)) {
        // Évite le double comptage si le CTA dédié a déjà émis l’événement.
        if (anchor.dataset?.eventbriteOrigin) return;
        trackEventbriteClick('outbound-link', 'unknown');
        return;
      }

      const calendlyHit =
        target.closest('[data-calendly]') ||
        target.closest('.calendly-inline-widget') ||
        target.closest('.calendly-popup-content') ||
        target.closest('a[href*="calendly.com"]');
      if (!calendlyHit) return;
      if ((calendlyHit as HTMLElement).dataset?.calendlyTracked === 'component') return;

      const ctaPosition = (calendlyHit as HTMLElement).dataset?.ctaPosition ?? 'unknown';
      sendGa4Event('rdv_calendly_click', {
        page_path: window.location.pathname,
        position: toRdvCalendlyPosition(ctaPosition),
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
