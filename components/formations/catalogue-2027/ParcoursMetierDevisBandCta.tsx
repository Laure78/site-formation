'use client';

import { Calendar } from 'lucide-react';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { PARCOURS_CONTACT_SECTION_ID } from '@/lib/catalogue-2027/parcours-contact-copy';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { CtaVisio } from '@/components/CtaVisio';

type Props = {
  visioSrc: string;
};

export function ParcoursMetierDevisBandCta({ visioSrc }: Props) {
  return (
    <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={() => scrollToAnchor(PARCOURS_CONTACT_SECTION_ID)}
        className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
      >
        {CTA_DEVIS_LABEL}
      </button>
      <CtaVisio
        src={visioSrc}
        className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
        leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
      />
    </div>
  );
}
