'use client';

import { CalendlyEmbed } from '@/components/CalendlyEmbed';

/** Widget Calendly inline — bas de page accueil, hors bundle initial. */
export function HomeFooterCalendly() {
  return (
    <CalendlyEmbed
      type="inline"
      campaign="accueil-rdv-inline"
      ctaPosition="inline"
      heightPx={620}
    />
  );
}
