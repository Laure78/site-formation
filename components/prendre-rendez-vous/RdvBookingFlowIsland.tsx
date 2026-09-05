'use client';

import dynamic from 'next/dynamic';

const RdvBookingFlowLazy = dynamic(
  () =>
    import('@/components/booking/RdvBookingFlow').then((m) => ({
      default: m.RdvBookingFlow,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        aria-busy="true"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-slate-700">Chargement du formulaire…</p>
        <div className="mt-4 h-40 animate-pulse rounded-xl bg-slate-100" />
      </div>
    ),
  },
);

/** Îlot client — formulaire RDV chargé après le HTML serveur (code-split). */
export function RdvBookingFlowIsland() {
  return <RdvBookingFlowLazy />;
}
