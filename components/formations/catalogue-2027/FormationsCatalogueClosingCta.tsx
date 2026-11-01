'use client';

import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { CONTACT } from '@/lib/constants';

export function FormationsCatalogueClosingCta() {
  return (
    <section
      id="catalogue-conversion-finale"
      className="scroll-mt-28 rounded-2xl bg-[#101936] px-6 py-10 text-center text-white sm:px-10 md:py-12"
      aria-labelledby="catalogue-closing-title"
    >
      <h2 id="catalogue-closing-title" className="font-display text-xl font-bold md:text-2xl">
        Trouvons la formation adaptée à votre entreprise
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-300">
        Échangeons sur vos besoins, vos métiers et les compétences à développer dans votre équipe.
      </p>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <CtaVisio
          src="catalogue-closing"
          className="inline-flex min-h-11 items-center justify-center rounded-[8px] px-6 py-3 text-sm font-semibold"
        />
        <CtaDevis
          href="#contact-catalogue"
          variant="secondary"
          className="inline-flex min-h-11 items-center justify-center rounded-[8px] border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
        />
      </div>
      <p className="mt-6 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:justify-center sm:gap-6">
        <a href={`mailto:${CONTACT.email}`} className="font-medium text-white/90 hover:underline">
          {CONTACT.email}
        </a>
        <a href={`tel:${CONTACT.phone}`} className="font-medium text-white/90 hover:underline">
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </section>
  );
}
