'use client';

import { Download } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { PARCOURS_METIERS_CONTACT_BAND } from '@/lib/parcours-metiers-page-content';
import { useParcoursHubContact } from './parcours-hub-contact-context';

export function ParcoursMetiersHubContactBand() {
  const { openContactForm } = useParcoursHubContact();

  return (
    <section
      className="border-t border-slate-100 bg-white py-12 sm:py-14"
      aria-labelledby="parcours-hub-contact-band-title"
    >
      <div className="mx-auto max-w-[48rem] px-4 text-center sm:px-6 lg:px-8">
        <h2 id="parcours-hub-contact-band-title" className="ofc-type-h2 text-balance text-[#101936]">
          {PARCOURS_METIERS_CONTACT_BAND.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          {PARCOURS_METIERS_CONTACT_BAND.lead}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <CtaVisio
            src="parcours-metiers-hub-contact"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
          />
          <button
            type="button"
            onClick={() => openContactForm('programme')}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            Demander le programme
          </button>
        </div>
      </div>
    </section>
  );
}
