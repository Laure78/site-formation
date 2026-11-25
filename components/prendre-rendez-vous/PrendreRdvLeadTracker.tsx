'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { deduceRdvMetierFromSrc } from '@/lib/rdv-src-metier';
import { getPagePath, trackPrendreRdvPageLead } from '@/lib/ga4-analytics';

/** `generate_lead` à l’arrivée sur `/prendre-rdv` — uniquement après consentement analytics. */
export function PrendreRdvLeadTracker() {
  const searchParams = useSearchParams();
  const consent = useCookieConsent();
  const firedRef = useRef(false);

  useEffect(() => {
    if (consent !== 'accepted' || firedRef.current) return;
    const src = searchParams.get('src')?.trim() ?? 'direct';
    const metier = deduceRdvMetierFromSrc(src);
    trackPrendreRdvPageLead(src, metier, getPagePath());
    firedRef.current = true;
  }, [consent, searchParams]);

  return null;
}