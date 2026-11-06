import { ArrowRight } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

export function FormationsCatalogueBottomCta() {
  return (
    <section
      aria-labelledby="formations-catalogue-cta-fin"
      className="relative overflow-hidden bg-[#101936] py-12 sm:py-14"
    >
      <div className="mx-auto flex max-w-[80rem] flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-white/80">
            Formez vos équipes à l’IA
          </p>
          <h2
            id="formations-catalogue-cta-fin"
            className="mt-2 font-display text-xl font-bold leading-snug text-white text-balance sm:text-2xl md:text-[1.65rem]"
          >
            Passez à l’action avec des formations sur mesure pour votre entreprise
          </h2>
        </div>
        <CtaVisio
          src="formations-catalogue-bandeau-fin"
          leadingAdornment={<ArrowRight className="h-4 w-4 shrink-0" aria-hidden />}
          className={`${OFC_CTA_PRIMARY} inline-flex shrink-0 flex-row-reverse items-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold md:text-base`}
        />
      </div>
    </section>
  );
}
