'use client';

import { usePathname } from 'next/navigation';
import { CtaButton } from '@/components/CtaButton';
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
          {isCatalogue ? 'Réserver ma session' : 'Réservez votre visio découverte gratuite'}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 md:text-lg">
          Choisissez un créneau de 30 minutes pour cadrer votre besoin (formation IA appliquée au
          bâtiment, financement Constructys, format intra ou inter).
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton origin={origin} />
        </div>
      </div>
    </section>
  );
}
