'use client';

import dynamic from 'next/dynamic';

const HomeFooterCalendly = dynamic(
  () =>
    import('@/components/landing/HomeFooterCalendly').then((mod) => ({
      default: mod.HomeFooterCalendly,
    })),
  { ssr: false },
);

/** Calendly inline bas de page accueil — hors hydratation initiale. */
export function DeferredHomeFooterCalendly() {
  return <HomeFooterCalendly />;
}
