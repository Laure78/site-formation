'use client';

import { Download } from 'lucide-react';
import { CTA_RECEVOIR_PROGRAMME_LABEL } from '@/lib/cta-programme-label';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';
import { useParcoursHubContact } from './parcours-hub-contact-context';

type Props = {
  className?: string;
  buttonClass?: string;
};

/** CTA hub — pas de PDF parcours consolidé : programme via formulaire. */
export function ParcoursMetiersHubPrimaryCtas({ className, buttonClass }: Props) {
  const { openContactForm } = useParcoursHubContact();

  const btn =
    buttonClass ??
    'inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto';

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
      <button
        type="button"
        onClick={() => openContactForm('programme')}
        className={`${OFC_CTA_SECONDARY} ${btn}`}
      >
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        {CTA_RECEVOIR_PROGRAMME_LABEL}
      </button>
      <button
        type="button"
        onClick={() => openContactForm('devis')}
        className={`${OFC_CTA_PRIMARY} ${btn}`}
      >
        {CTA_DEVIS_LABEL}
      </button>
    </div>
  );
}
