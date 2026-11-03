'use client';

import Image from 'next/image';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const VISIO_SRC = 'accueil-cta-final';

/** CTA final accueil — bandeau bleu avec photo chantier (maquette). */
export function AccueilCtaFinalSection() {
  const photo = PHOTOS.accueilCtaFinalChantier;

  return (
    <section className="bg-white py-8 md:py-10" aria-labelledby="accueil-cta-final">
      <div className={`${OFC_SECTION_INNER} accueil-maquette__inner px-4 sm:px-6 lg:px-8`}>
        <div className="accueil-maquette-cta-final relative overflow-hidden rounded-2xl bg-[#071B42]">
          <div className="relative flex min-h-[12rem] items-center p-5 md:min-h-[14rem] md:p-8">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1024px) 0px, 22rem"
              className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[min(46%,20rem)] object-cover object-center lg:block"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(50%,22rem)] bg-gradient-to-l from-[#071B42]/10 via-[#071B42]/75 to-[#071B42] lg:block"
              aria-hidden
            />
            <div className="relative z-10 min-w-0 max-w-xl">
              <h2
                id="accueil-cta-final"
                className="font-display text-xl font-extrabold leading-tight text-white md:text-2xl"
              >
                Formons vos équipes sur vos propres documents
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90 md:text-[0.9375rem]">
                Devis, DCE, comptes rendus, mémoires techniques… des formations concrètes et
                opérationnelles pour vos équipes.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <CtaDevis className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0755E8] hover:bg-white/95 sm:w-auto" />
                <CtaVisio
                  src={VISIO_SRC}
                  data-cta="visio"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/70 bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
