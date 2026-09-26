'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { CalendlyConsentInline } from '@/components/CalendlyConsentInline';
import {
  CONTACT_CALENDLY_INLINE_HINT,
  CONTACT_CALENDLY_INLINE_TITLE,
  CONTACT_CALENDLY_TEXT,
} from '@/lib/contact-page-config';
import { buildCalendlyUrlWithUtm, CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const CONTACT_CALENDLY_CAMPAIGN = 'contact-page-calendly';

const calendlyViewportHeight: CSSProperties = {
  height: `min(${CALENDLY_INLINE_DEFAULT_HEIGHT_PX}px, calc(100dvh - var(--site-header-height, 4rem) - 7.5rem))`,
  minHeight: 420,
};

function bookingUrl(): string {
  return buildCalendlyUrlWithUtm({
    baseUrl: CALENDLY_BOOKING_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: CONTACT_CALENDLY_CAMPAIGN,
  });
}

/**
 * Agenda Calendly visible au premier écran — colonne droite desktop, sous l’intro en mobile.
 */
export function ContactPageCalendlyPanel() {
  const url = bookingUrl();

  return (
    <section
      id="contact-rdv"
      aria-labelledby="contact-rdv-title"
      className="scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)] min-w-0"
    >
      <div className="mb-3 flex items-start gap-2.5">
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3]/10 text-[#377CF3]"
          aria-hidden
        >
          <Calendar className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2
            id="contact-rdv-title"
            className="font-display text-lg font-bold leading-snug text-ofc-ink sm:text-xl"
          >
            {CONTACT_CALENDLY_INLINE_TITLE}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ofc-ink-muted">{CONTACT_CALENDLY_TEXT}</p>
          <p className="mt-1 text-xs font-medium text-ofc-ink-subtle">{CONTACT_CALENDLY_INLINE_HINT}</p>
        </div>
      </div>

      <CalendlyConsentInline
        campaign={CONTACT_CALENDLY_CAMPAIGN}
        heightPx={CALENDLY_INLINE_DEFAULT_HEIGHT_PX}
        containerStyle={calendlyViewportHeight}
      />

      <p className="mt-2 text-center text-xs text-ofc-ink-subtle">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${OFC_LINK} font-semibold`}
          data-calendly
          data-cta-position="inline"
        >
          Ouvrir l’agenda dans un nouvel onglet
        </a>
        {' · '}
        <Link href={LINKS.politiqueConfidentialite} className={OFC_LINK}>
          Confidentialité
        </Link>
      </p>
    </section>
  );
}
