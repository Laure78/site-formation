'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPagePath, sendGa4Event } from '@/lib/ga4-analytics';

/** Conversion GA4 — réservation confirmée dans l’iframe Calendly (`calendly.event_scheduled`). */
export function RdvBookingTracker() {
  const searchParams = useSearchParams();
  const src = searchParams.get('src') ?? 'direct';

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.endsWith('calendly.com')) return;
      const payload = event.data as { event?: string } | null;
      if (payload?.event === 'calendly.event_scheduled') {
        sendGa4Event('rdv_reserve', { src, page_path: getPagePath() });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [src]);

  return null;
}
