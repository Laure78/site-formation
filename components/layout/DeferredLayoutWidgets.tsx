'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ScrollToTopButton = dynamic(
  () =>
    import('@/components/ScrollToTopButton').then((mod) => ({
      default: mod.ScrollToTopButton,
    })),
  { ssr: false },
);

const StickyMobileCalendlyCta = dynamic(
  () =>
    import('@/components/StickyMobileCalendlyCta').then((mod) => ({
      default: mod.StickyMobileCalendlyCta,
    })),
  { ssr: false },
);

const StickyBlogMetierRdvBar = dynamic(
  () =>
    import('@/components/StickyBlogMetierRdvBar').then((mod) => ({
      default: mod.StickyBlogMetierRdvBar,
    })),
  { ssr: false },
);

const InteractionTrackers = dynamic(
  () =>
    import('@/components/analytics/InteractionTrackers').then((mod) => ({
      default: mod.InteractionTrackers,
    })),
  { ssr: false },
);

const CookieConsentBanner = dynamic(
  () =>
    import('@/components/CookieConsentBanner').then((mod) => ({
      default: mod.CookieConsentBanner,
    })),
  { ssr: false },
);

const GoogleAnalytics = dynamic(
  () =>
    import('@/components/analytics/GoogleAnalytics').then((mod) => ({
      default: mod.GoogleAnalytics,
    })),
  { ssr: false },
);

const CalendlyScriptLoader = dynamic(
  () =>
    import('@/components/CalendlyScriptLoader').then((mod) => ({
      default: mod.CalendlyScriptLoader,
    })),
  { ssr: false },
);

/** Widgets globaux non critiques — chargés après le JS initial (code splitting). */
export function DeferredLayoutWidgets() {
  const [deferredReady, setDeferredReady] = useState(false);

  useEffect(() => {
    const enable = () => setDeferredReady(true);

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(enable, { timeout: 3500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(enable, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CookieConsentBanner />
      {deferredReady ? (
        <>
          <GoogleAnalytics />
          <CalendlyScriptLoader />
          <ScrollToTopButton />
          <StickyMobileCalendlyCta />
          <StickyBlogMetierRdvBar />
          <InteractionTrackers />
        </>
      ) : null}
    </>
  );
}
