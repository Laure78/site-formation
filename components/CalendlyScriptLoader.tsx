'use client';

import Script from 'next/script';
import { CALENDLY_SCRIPT_READY_EVENT } from '@/lib/calendly';

const CALENDLY_WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';

function notifyCalendlyReady() {
  if (typeof window === 'undefined') return;
  (window as Window & { __calendlyReady?: boolean }).__calendlyReady = true;
  window.dispatchEvent(new CustomEvent(CALENDLY_SCRIPT_READY_EVENT));
}

/**
 * Charge le script Calendly une fois (embed inline).
 */
export function CalendlyScriptLoader() {
  return (
    <Script
      id="calendly-widget-js"
      src={CALENDLY_WIDGET_SRC}
      strategy="afterInteractive"
      onLoad={notifyCalendlyReady}
      onReady={notifyCalendlyReady}
    />
  );
}
