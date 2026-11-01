'use client';

import { CtaVisio } from '@/components/CtaVisio';

/** Bloc conversion — « Vous ne savez pas quelle formation choisir ? » */
export function FormationsCatalogueConversionSection() {
  return (
    <section
      className="mt-16 rounded-2xl bg-[#377CF3] p-6 text-center text-white md:p-10"
      aria-labelledby="catalogue-conversion-cta"
    >
      <h2
        id="catalogue-conversion-cta"
        className="font-display text-xl font-bold md:text-2xl"
      >
        Vous ne savez pas quelle formation choisir ?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
        Décrivez métier et usages — nous vous orientons vers la bonne session.
      </p>
      <div className="mt-6">
        <CtaVisio
          src="catalogue-conversion"
          data-cta="rdv"
          className="ofc-cta-on-accent inline-flex min-h-11 items-center justify-center rounded-[8px] px-6 py-3"
        />
      </div>
    </section>
  );
}
