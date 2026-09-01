'use client';

import { useEffect } from 'react';
import { toRdvCalendlyPosition } from '@/lib/calendly-analytics';
import { classifyPdfDownload, sendGa4Event, trackDownloadGuide } from '@/lib/ga4-analytics';

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

/**
 * Écouteurs GA4 unifiés (Calendly + PDF) — un seul composant client au lieu de deux.
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
