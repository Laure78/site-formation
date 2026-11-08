'use client';

import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import {
  PARCOURS_CONTACT_SECTION_ID,
  PARCOURS_MODULES_SECTION_ID,
} from '@/lib/catalogue-2027/parcours-contact-copy';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import { ParcoursScrollLink } from './ParcoursScrollLink';

export function ParcoursMetierStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[80rem] gap-2">
        <ParcoursScrollLink
          anchorId={PARCOURS_MODULES_SECTION_ID}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
        >
          Choisir mes modules
        </ParcoursScrollLink>
        <button
          type="button"
          onClick={() => scrollToAnchor(PARCOURS_CONTACT_SECTION_ID)}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
        >
          {CTA_DEVIS_LABEL}
        </button>
      </div>
    </div>
  );
}
