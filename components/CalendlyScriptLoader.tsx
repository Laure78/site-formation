'use client';

import Script from 'next/script';

const CALENDLY_WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Charge le script Calendly une fois (inline + popup).
 */
export function CalendlyScriptLoader() {
  return (
    <Script id="calendly-widget-js" src={CALENDLY_WIDGET_SRC} strategy="afterInteractive" />
  );
}
