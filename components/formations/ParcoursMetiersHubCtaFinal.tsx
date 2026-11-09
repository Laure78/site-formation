'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { PARCOURS_CONTACT_SECTION_ID } from '@/lib/catalogue-2027/parcours-contact-copy';
import { PARCOURS_MODALITE_GEO } from '@/lib/catalogue-2027/parcours-commercial-copy';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ParcoursScrollLink } from '@/components/formations/catalogue-2027/ParcoursScrollLink';
import { PARCOURS_METIERS_SECTION } from '@/lib/parcours-metiers-page-content';
import { PHOTOS } from '@/lib/photos';

export function ParcoursMetiersHubCtaFinal() {
  const ctaChantier = PHOTOS.accueilCtaFinalChantier;

  return (
    <section className="overflow-hidden border-t border-slate-100" aria-labelledby="parcours-cta-final-title">
      <div className="mx-auto grid max-w-[80rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
        <div className="flex flex-col justify-center bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
          <h2 id="parcours-cta-final-title" className="ofc-type-h2 max-w-md text-balance text-[#101936]">
            Construisons le parcours adapté à vos équipes
          </h2>
          <p className="mt-3 text-sm text-slate-600">{PARCOURS_MODALITE_GEO}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ParcoursScrollLink
              anchorId={PARCOURS_METIERS_SECTION.id}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
            >
              Choisir mes modules
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </ParcoursScrollLink>
            <button
              type="button"
              onClick={() => scrollToAnchor(PARCOURS_CONTACT_SECTION_ID)}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              {CTA_DEVIS_LABEL}
            </button>
          </div>
        </div>
        <div className="relative min-h-[12rem] sm:min-h-[14rem] lg:min-h-[16rem]">
          <Image
            src={ctaChantier.src}
            alt={ctaChantier.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
