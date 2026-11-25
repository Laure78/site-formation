'use client';

import { useEffect } from 'react';
import { initAiTrafficAttribution } from '@/lib/ga4-analytics';

/** Détecte referrer IA — attribution stockée en session (pas de `generate_lead` ici : voir `PrendreRdvLeadTracker`). */
export function AiTrafficAttribution() {
  useEffect(() => {
    initAiTrafficAttribution();
  }, []);

  return null;
}
