'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import {
  CALENDLY_BOOKING_URL,
  CALENDLY_SCRIPT_READY_EVENT,
  buildCalendlyUrlWithUtm,
} from '@/lib/calendly';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { writeCookieConsent } from '@/lib/cookie-consent';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

const CALENDLY_WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';

function subscribeCalendlyReady(onStoreChange: () => void) {
  window.addEventListener(CALENDLY_SCRIPT_READY_EVENT, onStoreChange);
  return () => window.removeEventListener(CALENDLY_SCRIPT_READY_EVENT, onStoreChange);
}

function getCalendlyReadySnapshot() {
  return Boolean(
    (typeof window !== 'undefined' && window.__calendlyReady) ||
      window.Calendly?.initInlineWidget,
  );
}

function getCalendlyReadyServerSnapshot() {
  return false;
}

function ensureCalendlyScript(): void {
  if (typeof window === 'undefined') return;
  if (window.Calendly?.initInlineWidget) {
    (window as Window & { __calendlyReady?: boolean }).__calendlyReady = true;
    window.dispatchEvent(new CustomEvent(CALENDLY_SCRIPT_READY_EVENT));
    return;
  }
  const existing = document.getElementById('calendly-widget-js');
  if (existing) return;

  const script = document.createElement('script');
  script.id = 'calendly-widget-js';
  script.src = CALENDLY_WIDGET_SRC;
  script.async = true;
  script.onload = () => {
    (window as Window & { __calendlyReady?: boolean }).__calendlyReady = true;
    window.dispatchEvent(new CustomEvent(CALENDLY_SCRIPT_READY_EVENT));
  };
  document.body.appendChild(script);
}

/**
 * Widget Calendly inline via widget.js — uniquement après consentement cookies.
 * Charge le script si besoin (page `/prendre-rendez-vous`).
 */
export function CalendlyConsentInline({
  campaign = 'prendre-rendez-vous-page',
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
}: {
  campaign?: string;
  heightPx?: number;
}) {
  const consent = useCookieConsent();
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const ready = useSyncExternalStore(
    subscribeCalendlyReady,
    getCalendlyReadySnapshot,
    getCalendlyReadyServerSnapshot,
  );

  useEffect(() => {
    if (consent !== 'accepted') return;
    ensureCalendlyScript();
  }, [consent]);

  useEffect(() => {
    if (consent !== 'accepted' || !ready || !containerRef.current) return;
    if (!window.Calendly?.initInlineWidget) return;
    if (initializedRef.current) return;

    const el = containerRef.current;
    el.innerHTML = '';
    const url = buildCalendlyUrlWithUtm({
      baseUrl: CALENDLY_BOOKING_URL,
      utmSource: 'site',
      utmMedium: 'cta',
      utmCampaign: campaign,
    });
    window.Calendly.initInlineWidget({
      url,
      parentElement: el,
    });
    initializedRef.current = true;
  }, [consent, ready, campaign]);

  if (!isClient || consent === null) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500"
        style={{ minHeight: heightPx }}
      >
        Chargement de l’agenda…
      </div>
    );
  }

  if (consent !== 'accepted') {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-slate-700">
          Pour afficher l’agenda Calendly, acceptez les cookies et services tiers via le bandeau en bas
          de page.
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
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Ouvrir Calendly dans un nouvel onglet
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      style={{ minWidth: 320, height: heightPx }}
      data-calendly
      data-cta-position="inline"
    />
  );
}
