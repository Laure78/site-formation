'use client';

import { useSyncExternalStore } from 'react';
import {
  CALENDLY_BOOKING_URL,
  buildCalendlyInlineIframeUrl,
  buildCalendlyUrlWithUtm,
} from '@/lib/calendly';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { writeCookieConsent } from '@/lib/cookie-consent';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

/**
 * Agenda Calendly inline (iframe) — après consentement cookies.
 * L’iframe est plus fiable que widget.js (pas de course au chargement du script).
 */
export function CalendlyConsentInline({
  campaign = 'prendre-rendez-vous-page',
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
}: {
  campaign?: string;
  heightPx?: number;
}) {
  const consent = useCookieConsent();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const bookingUrl = buildCalendlyUrlWithUtm({
    baseUrl: CALENDLY_BOOKING_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: campaign,
  });
  const iframeSrc = buildCalendlyInlineIframeUrl(bookingUrl);

  if (!isClient) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500"
        style={{ minHeight: heightPx }}
        aria-busy="true"
      >
        Chargement de l’agenda…
      </div>
    );
  }

  if (consent !== 'accepted') {
    return (
      <div
        className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
        style={{ minHeight: heightPx }}
      >
        <p className="text-slate-700">
          Pour afficher l’agenda Calendly, acceptez les cookies et services tiers.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => writeCookieConsent('accepted')}
            className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Accepter et afficher l’agenda
          </button>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
            data-calendly
            data-cta-position="inline"
          >
            Ouvrir Calendly dans un nouvel onglet
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      style={{ minWidth: 320, height: heightPx }}
      data-calendly
      data-cta-position="inline"
    >
      <iframe
        src={iframeSrc}
        title="Réserver un créneau Calendly — formation IA BTP"
        className="h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allow="payment"
      />
    </div>
  );
}
