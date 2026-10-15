'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CalendlyConsentInline } from '@/components/CalendlyConsentInline';
import { buildCalendlyUrlWithUtm } from '@/lib/calendly';
import {
  PRENDRE_RDV_CALENDLY_URL,
  PRENDRE_RDV_PRIVACY_HREF,
} from '@/lib/prendre-rendez-vous-page-config';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

const calendlyViewportHeight: CSSProperties = {
  height: `min(${CALENDLY_INLINE_DEFAULT_HEIGHT_PX}px, calc(100dvh - var(--site-header-height, 4rem) - 8.5rem))`,
  minHeight: 400,
};

/**
 * Agenda Calendly inline — affiché directement sur la page (widget officiel après consentement).
 */
export function PrendreRdvAgenda({
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  campaign = 'prendre-rdv-page',
  compactFooter = false,
}: {
  heightPx?: number;
  campaign?: string;
  /** Pied de widget réduit — page hero calendrier. */
  compactFooter?: boolean;
} = {}) {
  const searchParams = useSearchParams();
  const src = searchParams.get('src')?.trim() || undefined;
  const url = buildCalendlyUrlWithUtm({
    baseUrl: PRENDRE_RDV_CALENDLY_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: campaign,
    utmContent: src,
  });

  return (
    <div className={compactFooter ? 'space-y-1.5' : 'space-y-3'}>
      <CalendlyConsentInline
        campaign={campaign}
        utmContent={src}
        heightPx={heightPx}
        containerStyle={calendlyViewportHeight}
      />
      <p
        className={`text-center text-slate-600 ${compactFooter ? 'text-xs leading-snug' : 'text-sm'}`}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${OFC_LINK} font-semibold ${compactFooter ? '' : 'inline-flex min-h-11 items-center'}`}
          data-calendly
          data-cta-position="inline"
        >
          Ouvrir l’agenda dans un nouvel onglet
        </a>
        {compactFooter ? (
          <>
            {' · '}
            <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
              Confidentialité
            </Link>
          </>
        ) : null}
      </p>
      {!compactFooter ? (
        <p className="text-center text-xs text-slate-500">
          Service tiers Calendly — voir la{' '}
          <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
            politique de confidentialité
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
