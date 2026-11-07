import Link from 'next/link';
import { Calendar, GraduationCap } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function RessourcesFinalCta() {
  return (
    <section
      id="formation-cta"
      aria-labelledby="ressources-final-cta-heading"
      className="ressources-hub-final-cta scroll-mt-28 border-t border-slate-200 bg-white py-12 md:py-14"
    >
      <div className="mx-auto max-w-[80rem] px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="ressources-final-cta-heading"
          className="font-display text-2xl font-bold text-balance text-[#101936] md:text-3xl"
        >
          Besoin d&apos;aller plus loin ?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Travaillez sur vos propres DCE, devis, comptes rendus et documents de chantier pendant une formation IA BTP
          opérationnelle.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={LINKS.formations}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
          >
            <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
            Découvrir les formations
          </Link>
          <CtaVisio
            src="cmp-ressources-RessourcesFinalCta"
            variant="secondary"
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
            leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
          />
        </div>
        <p className="mt-6 text-sm text-slate-600">
          <Link href={LINKS.diagnostic} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
            Diagnostic IA BTP gratuit
          </Link>
        </p>
      </div>
    </section>
  );
}
