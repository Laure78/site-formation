'use client';

import Script from 'next/script';
import { CALENDLY_SCRIPT_READY_EVENT } from '@/lib/calendly';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CALENDLY_WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';

function notifyCalendlyReady() {
  if (typeof window === 'undefined') return;
  (window as Window & { __calendlyReady?: boolean }).__calendlyReady = true;
  window.dispatchEvent(new CustomEvent(CALENDLY_SCRIPT_READY_EVENT));
}

/**
 * Charge widget.js Calendly uniquement après acceptation du bandeau cookies,
 * en `lazyOnload` (jamais avant le consentement).
 */
export function CalendlyScriptLoader() {
  const consent = useCookieConsent();
  if (consent !== 'accepted') return null;

  return (
    <Script
      id="calendly-widget-js"
      src={CALENDLY_WIDGET_SRC}
      strategy="lazyOnload"
      onLoad={notifyCalendlyReady}
      onReady={notifyCalendlyReady}
    />
  );
}
