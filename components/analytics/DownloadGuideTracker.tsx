'use client';

import { useEffect } from 'react';
import { classifyPdfDownload, trackDownloadGuide } from '@/lib/ga4-analytics';

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
 * Événement GA4 `download_guide` — clics sur liens PDF (guide CDT, programmes, checklist, autres guides).
 */
export function DownloadGuideTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null;
      if (!anchor || !isPdfDownloadLink(anchor)) return;

      const href = anchor.getAttribute('href') ?? '';
      const downloadAttr = anchor.getAttribute('download');
      const { guide_type, file_name } = classifyPdfDownload(href, downloadAttr);

      trackDownloadGuide({
        guide_type,
        file_name,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
