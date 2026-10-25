'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAiTrafficAttribution, trackGenerateLead } from '@/lib/ga4-analytics';
import { LINKS } from '@/lib/internal-links';

/** Détecte referrer IA + envoie `generate_lead` à l’arrivée sur /prendre-rdv. */
export function AiTrafficAttribution() {
  const pathname = usePathname();

  useEffect(() => {
    initAiTrafficAttribution();
  }, []);

  useEffect(() => {
    if (pathname === LINKS.prendreRdv) {
      trackGenerateLead('prendre_rdv_page_view');
    }
  }, [pathname]);

  return null;
}
