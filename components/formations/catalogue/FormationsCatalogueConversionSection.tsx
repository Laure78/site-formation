import Link from 'next/link';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';

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
        Décrivez votre équipe, vos métiers et vos usages.
        Je vous aide à identifier le parcours adapté.
      </p>
      <div className="mt-6">
        <Link
          href={`${LINKS.prendreRdv}?src=${encodeURIComponent('catalogue-conversion')}`}
          data-cta="rdv"
          className="ofc-cta-on-accent inline-flex min-h-11 items-center justify-center rounded-[8px] px-6 py-3"
        >
          {CTA_RDV_LABEL}
        </Link>
      </div>
    </section>
  );
}
