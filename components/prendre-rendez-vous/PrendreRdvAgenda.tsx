'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import {
  buildCalendlyInlineIframeUrl,
  buildCalendlyUrlWithUtm,
} from '@/lib/calendly';
import {
  PRENDRE_RDV_CALENDLY_URL,
  PRENDRE_RDV_CONTACT_HREF,
  PRENDRE_RDV_PRIVACY_HREF,
} from '@/lib/prendre-rendez-vous-page-config';
import { getPagePath, sendGa4Event } from '@/lib/ga4-analytics';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

type AgendaPhase = 'loading' | 'ready' | 'blocked';

const LOAD_TIMEOUT_MS = 15_000;

function bookingUrl(): string {
  return buildCalendlyUrlWithUtm({
    baseUrl: PRENDRE_RDV_CALENDLY_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: 'prendre-rendez-vous-page',
  });
}

/**
 * Agenda Calendly inline — affiché dès l’arrivée sur la page.
 * Repli si le service tiers est bloqué.
 */
export function PrendreRdvAgenda() {
  const [phase, setPhase] = useState<AgendaPhase>('loading');
  const statusId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = bookingUrl();
  const iframeSrc = buildCalendlyInlineIframeUrl(url);

  useEffect(() => {
    sendGa4Event('rdv_agenda_auto_load', { page_path: getPagePath() });
    timeoutRef.current = setTimeout(() => {
      setPhase((current) => (current === 'loading' ? 'blocked' : current));
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onIframeLoad = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase('ready');
  }, []);

  const trackExternalCalendly = useCallback(() => {
    sendGa4Event('rdv_calendly_external_click', { page_path: getPagePath() });
  }, []);

  const trackContact = useCallback(() => {
    sendGa4Event('rdv_contact_fallback_click', { page_path: getPagePath() });
  }, []);

  if (phase === 'blocked') {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center" role="alert">
        <p className="text-sm font-medium text-slate-800 md:text-base">
          L’agenda ne peut pas être chargé ici. Ouvrez Calendly dans un nouvel onglet ou utilisez la
          page Contact.
        </p>
        <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackExternalCalendly}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            data-calendly
            data-cta-position="inline"
          >
            Ouvrir Calendly
          </a>
          <Link
            href={PRENDRE_RDV_CONTACT_HREF}
            onClick={trackContact}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Page Contact
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p id={statusId} className="sr-only" aria-live="polite">
        {phase === 'loading' ? 'Chargement de l’agenda Calendly' : 'Agenda Calendly prêt'}
      </p>
      {phase === 'loading' ? (
        <p className="text-center text-sm text-slate-600" aria-live="polite">
          Chargement de l’agenda…
        </p>
      ) : null}
      <div
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{ height: CALENDLY_INLINE_DEFAULT_HEIGHT_PX }}
        data-calendly
        data-cta-position="inline"
      >
        <iframe
          src={iframeSrc}
          title="Réserver un créneau Calendly — formation IA BTP"
          className="h-full w-full border-0"
          onLoad={onIframeLoad}
          referrerPolicy="no-referrer-when-downgrade"
          allow="payment"
        />
      </div>
      <p className="text-center text-sm text-slate-600">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackExternalCalendly}
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
