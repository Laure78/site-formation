'use client';

import { usePathname } from 'next/navigation';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { isFormationCalendlyInlinePath } from '@/lib/formation-calendly-path';

/**
 * Section widget inline avant le footer — pages formation & landings métier.
 */
export function FormationCalendlyInlineGate() {
  const pathname = usePathname();
  if (!isFormationCalendlyInlinePath(pathname)) return null;

  const isCatalogue = pathname === '/formations' || pathname === '/formations/';

  return (
    <section
      className="border-t border-slate-200 bg-[#F2F2F2] py-12 md:py-16"
      aria-labelledby="formation-calendly-heading"
    >
      <div className="mx-auto max-w-5xl px-4">
        <CalendlyEmbed
          type="inline"
          campaign={isCatalogue ? 'formations-reserver-session' : 'formation-inline-footer'}
          ctaPosition="footer"
          sectionTitle={
            isCatalogue ? 'Réserver ma session' : 'Réservez votre visio découverte gratuite'
          }
          sectionSubtitle="Choisissez un créneau de 30 minutes pour cadrer votre besoin (formation IA appliquée au bâtiment, financement Constructys, format intra ou inter)."
        />
      </div>
    </section>
  );
}
