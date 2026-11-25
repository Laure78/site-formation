'use client';

import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';

export function AProposCtaSection() {
  return (
    <section
      id="contact-cta"
      className="scroll-mt-24 bg-[#377CF3] py-10 md:py-12"
      aria-labelledby="a-propos-cta-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="a-propos-cta-title"
          className="font-display text-2xl font-bold text-white md:text-3xl"
        >
          Formons vos équipes à l&apos;intelligence artificielle appliquée à leur métier
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95">
          Notre équipe vous accompagne dans le choix des formations adaptées aux objectifs, aux
          métiers et au niveau de vos collaborateurs.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <CtaDevis className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#377CF3] hover:bg-slate-50" />
          <CtaVisio
            src="a-propos-cta-final"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
          />
        </div>
      </div>
    </section>
  );
}