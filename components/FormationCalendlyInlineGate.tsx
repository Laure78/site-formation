'use client';

import { usePathname } from 'next/navigation';
import { CtaRdv } from '@/components/CtaRdv';
import { isFormationCalendlyInlinePath } from '@/lib/formation-calendly-path';

/**
 * Bandeau conversion avant le footer — pages formation & landings métier.
 * Redirige vers `/prendre-rendez-vous` (Calendly réservé à cette page).
 */
export function FormationCalendlyInlineGate() {
  const pathname = usePathname();
  if (!isFormationCalendlyInlinePath(pathname)) return null;

  const isCatalogue = pathname === '/formations' || pathname === '/formations/';
  const origin = isCatalogue ? 'formations-reserver-session' : 'formation-inline-footer';

  return (
    <section
      className="border-t border-slate-200 bg-[#F2F2F2] py-12 md:py-16"
      aria-labelledby="formation-calendly-heading"
    >
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2
          id="formation-calendly-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Échanger sur votre projet de formation
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 md:text-lg">
          Rendez-vous découverte de 30 minutes, en visioconférence si vous le souhaitez, pour cadrer
          votre besoin. Les formations restent en présentiel en Île-de-France (financement Constructys
          selon éligibilité, format intra ou interentreprises selon le programme).
        </p>
        <div className="mt-8 flex justify-center">
          <CtaRdv origin={origin} />
        </div>
      </div>
    </section>
  );
}
