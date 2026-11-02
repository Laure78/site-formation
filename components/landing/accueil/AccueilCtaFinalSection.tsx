'use client';

import { CtaVisio } from '@/components/CtaVisio';
import { CONTACT } from '@/lib/constants';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

/** CTA final — bandeau bleu marine pleine largeur. */
export function AccueilCtaFinalSection() {
  return (
    <section className="bg-[#101936] py-12 md:py-14 lg:py-16" aria-labelledby="accueil-cta-final">
      <div className={`${OFC_SECTION_INNER} text-center`}>
        <h2
          id="accueil-cta-final"
          className="font-display text-xl font-extrabold tracking-tight text-white text-balance md:text-2xl lg:text-[1.75rem]"
        >
          Trouvons la formation adaptée à votre métier
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Un échange pour définir vos besoins, vos objectifs et le format le plus adapté.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <CtaVisio
            src="accueil-cta-final"
            data-cta="rdv"
            className="inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-6 py-3 text-[#101936] shadow-none hover:bg-white/95 sm:w-auto"
          />
          <a
            href={`mailto:${CONTACT.email}`}
            className={`${OFC_LINK} text-sm font-semibold !text-white underline decoration-white/40 underline-offset-2 hover:!text-white hover:decoration-white`}
          >
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
