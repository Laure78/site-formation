'use client';

import Link from 'next/link';
import { CalendlyConsentInline } from '@/components/CalendlyConsentInline';
import { buildCalendlyUrlWithUtm } from '@/lib/calendly';
import {
  PRENDRE_RDV_CALENDLY_URL,
  PRENDRE_RDV_PRIVACY_HREF,
} from '@/lib/prendre-rendez-vous-page-config';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

function bookingUrl(): string {
  return buildCalendlyUrlWithUtm({
    baseUrl: PRENDRE_RDV_CALENDLY_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: 'prendre-rendez-vous-page',
  });
}

/**
 * Agenda Calendly inline — affiché directement sur la page (widget officiel après consentement).
 */
export function PrendreRdvAgenda({
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  campaign = 'prendre-rendez-vous-page',
}: {
  heightPx?: number;
  campaign?: string;
} = {}) {
  const url = bookingUrl();

  return (
    <div className="space-y-3">
      <CalendlyConsentInline campaign={campaign} heightPx={heightPx} />
      <p className="text-center text-sm text-slate-600">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${OFC_LINK} inline-flex min-h-11 items-center font-semibold`}
          data-calendly
          data-cta-position="inline"
        >
          Ouvrir l’agenda dans un nouvel onglet
        </a>
      </p>
      <p className="text-center text-xs text-slate-500">
        Service tiers Calendly — voir la{' '}
        <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
          politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}
