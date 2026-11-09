'use client';

import Image from 'next/image';
import { PARCOURS_MODALITE_GEO } from '@/lib/catalogue-2027/parcours-commercial-copy';
import { ParcoursMetiersHubPrimaryCtas } from './ParcoursMetiersHubPrimaryCtas';
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
          <ParcoursMetiersHubPrimaryCtas className="mt-6" buttonClass="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3" />
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
