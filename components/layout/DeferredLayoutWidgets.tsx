'use client';

import dynamic from 'next/dynamic';

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

/** Widgets globaux non critiques — chargés après le JS initial (code splitting). */
export function DeferredLayoutWidgets() {
  return (
    <>
      <CookieConsentBanner />
      <ScrollToTopButton />
      <StickyMobileCalendlyCta />
      <StickyBlogMetierRdvBar />
      <InteractionTrackers />
    </>
  );
}
