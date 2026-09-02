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
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { writeCookieConsent } from '@/lib/cookie-consent';
import { getPagePath, sendGa4Event } from '@/lib/ga4-analytics';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

type AgendaPhase = 'idle' | 'needs-consent' | 'loading' | 'ready' | 'blocked';

const LOAD_TIMEOUT_MS = 12_000;

function bookingUrl(): string {
  return buildCalendlyUrlWithUtm({
    baseUrl: PRENDRE_RDV_CALENDLY_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: 'prendre-rendez-vous-page',
  });
}

/**
 * Agenda Calendly — chargement après interaction + consentement cookies.
 * Repli accessible si le service tiers est bloqué.
 */
export function PrendreRdvAgenda() {
  const consent = useCookieConsent();
  const [phase, setPhase] = useState<AgendaPhase>('idle');
  const statusId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = bookingUrl();
  const iframeSrc = buildCalendlyInlineIframeUrl(url);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startLoad = useCallback(() => {
    setPhase('loading');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPhase((current) => (current === 'loading' ? 'blocked' : current));
    }, LOAD_TIMEOUT_MS);
  }, []);

  const requestAgenda = useCallback(() => {
    sendGa4Event('rdv_agenda_load_click', { page_path: getPagePath() });
    if (consent !== 'accepted') {
      setPhase('needs-consent');
      return;
    }
    startLoad();
  }, [consent, startLoad]);

  const acceptAndLoad = useCallback(() => {
    writeCookieConsent('accepted');
    sendGa4Event('rdv_agenda_load_click', {
      page_path: getPagePath(),
      via: 'consent',
    });
    startLoad();
  }, [startLoad]);

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

  const externalLink = (
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
  );

  const blockedMessage = (
    <div
      className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center"
      role="alert"
    >
      <p className="text-sm font-medium text-slate-800 md:text-base">
        L’agenda ne peut pas être chargé. Ouvrez Calendly dans un nouvel onglet ou utilisez la page
        Contact.
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

  return (
    <div className="space-y-4">
      <p id={statusId} className="sr-only" aria-live="polite">
        {phase === 'loading'
          ? 'Chargement de l’agenda Calendly'
          : phase === 'blocked'
            ? 'Agenda indisponible'
            : phase === 'needs-consent'
              ? 'Consentement requis pour afficher l’agenda'
              : ''}
      </p>

      {phase === 'idle' ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center md:p-8">
          <p className="text-sm text-slate-600 md:text-base">
            L’agenda Calendly est un service tiers. Il se charge uniquement après votre action.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={requestAgenda}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
              aria-describedby={statusId}
            >
              Choisir un créneau
            </button>
            {externalLink}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            En ouvrant l’agenda, des données techniques peuvent être traitées par Calendly — voir la{' '}
            <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      ) : null}

      {phase === 'needs-consent' ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center md:p-8">
          <p className="text-sm text-slate-700 md:text-base">
            Pour afficher l’agenda sur cette page, acceptez les cookies et services tiers. Vous pouvez
            aussi ouvrir Calendly dans un nouvel onglet sans accepter.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={acceptAndLoad}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Accepter et afficher l’agenda
            </button>
            {externalLink}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
              Politique de confidentialité
            </Link>
          </p>
        </div>
      ) : null}

      {phase === 'loading' || phase === 'ready' ? (
        <div className="space-y-3">
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
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-center text-sm text-slate-600">{externalLink}</p>
        </div>
      ) : null}

      {phase === 'blocked' ? blockedMessage : null}
    </div>
  );
}
