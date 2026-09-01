'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4 — optionnel via NEXT_PUBLIC_GA_MEASUREMENT_ID (ex. G-XXXXXXXXXX).
 * Chargé en `lazyOnload` après consentement cookies (RGPD + perf).
 *
 * Conversions à marquer dans GA4 Admin : cta_rdv_click, download_guide, blog_read_complete.
 */
export function GoogleAnalytics() {
  const consent = useCookieConsent();
  if (!GA_ID || consent !== 'accepted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-config" strategy="lazyOnload">
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
