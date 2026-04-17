'use client';

import { usePathname } from 'next/navigation';
import { isFormationCalendlyInlinePath } from '@/lib/formation-calendly-path';
import { CalendlyInlineWidget } from '@/components/CalendlyInlineWidget';

/**
 * Section widget inline avant le footer — uniquement sur les pages formation.
 */
export function FormationCalendlyInlineGate() {
  const pathname = usePathname();
  if (!isFormationCalendlyInlinePath(pathname)) return null;

  return (
    <section
      className="border-t border-slate-200 bg-[#F2F2F2] py-12 md:py-16"
      aria-labelledby="formation-calendly-heading"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2
          id="formation-calendly-heading"
          className="font-display text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Réservez votre visio découverte gratuite
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 md:text-lg">
          Choisissez un créneau de 30 minutes pour cadrer votre besoin (formation IA BTP, financement
          Constructys, format intra ou inter).
        </p>
        <div className="mt-8">
          <CalendlyInlineWidget />
        </div>
      </div>
    </section>
  );
}
