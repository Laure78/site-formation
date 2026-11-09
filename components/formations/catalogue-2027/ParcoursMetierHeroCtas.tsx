'use client';

import { ArrowRight } from 'lucide-react';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import {
  PARCOURS_CONTACT_SECTION_ID,
  PARCOURS_MODULES_SECTION_ID,
} from '@/lib/catalogue-2027/parcours-contact-copy';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ParcoursScrollLink } from './ParcoursScrollLink';

export function ParcoursMetierHeroCtas() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <ParcoursScrollLink
        anchorId={PARCOURS_MODULES_SECTION_ID}
        className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
      >
        Choisir mes modules
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </ParcoursScrollLink>
      <button
        type="button"
        onClick={() => scrollToAnchor(PARCOURS_CONTACT_SECTION_ID)}
        className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
      >
        {CTA_DEVIS_LABEL}
      </button>
    </div>
  );
}
