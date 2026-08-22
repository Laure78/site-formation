'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4 — optionnel via NEXT_PUBLIC_GA_MEASUREMENT_ID (ex. G-XXXXXXXXXX).
 * Script chargé en `afterInteractive` (next/script).
 *
 * Conversions à marquer dans GA4 Admin : cta_rdv_click, download_guide, blog_read_complete.
 * Voir `lib/ga4-analytics.ts` pour les paramètres d’événements.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
