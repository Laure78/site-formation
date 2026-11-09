'use client';

import { Download } from 'lucide-react';
import { CTA_RECEVOIR_PROGRAMME_LABEL } from '@/lib/cta-programme-label';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { getParcoursProgrammePdfHref } from '@/lib/catalogue-2027/parcours-programme-cta';
import type { ParcoursFormIntent } from '@/lib/catalogue-2027/parcours-form-intent';
import type { ParcoursId } from '@/data/catalogue-2027';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';
import { useParcoursModuleSelection } from './parcours-module-selection-context';

type Props = {
  variant?: 'hero' | 'band' | 'sticky';
  className?: string;
};

const VARIANT_CLASS: Record<NonNullable<Props['variant']>, string> = {
  hero: 'mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap',
  band: 'mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center',
  sticky: 'mx-auto flex max-w-[80rem] gap-2',
};

const BTN_CLASS: Record<NonNullable<Props['variant']>, { programme: string; devis: string }> = {
  hero: {
    programme: 'inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto',
    devis: 'inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto',
  },
  band: {
    programme: 'inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto',
    devis: 'inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto',
  },
  sticky: {
    programme: 'inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm',
    devis: 'inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm',
  },
};

function ProgrammeCta({
  intentScroll,
  parcoursId,
  className,
  shortLabel,
}: {
  intentScroll: (intent: ParcoursFormIntent) => void;
  parcoursId: ParcoursId;
  className: string;
  shortLabel?: boolean;
}) {
  const pdfHref = getParcoursProgrammePdfHref(parcoursId);
  const label = shortLabel ? 'Programme' : CTA_RECEVOIR_PROGRAMME_LABEL;

  if (pdfHref) {
    return (
      <a href={pdfHref} download className={`${OFC_CTA_SECONDARY} ${className}`}>
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => intentScroll('programme')}
      className={`${OFC_CTA_SECONDARY} ${className}`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      <span>{label}</span>
    </button>
  );
}

/** Deux CTA canoniques — « Recevoir le programme » puis « Demander un devis ». */
export function ParcoursMetierPrimaryCtas({ variant = 'hero', className }: Props) {
  const { parcours, openContactForm } = useParcoursModuleSelection();
  const btn = BTN_CLASS[variant];
  const isSticky = variant === 'sticky';

  return (
    <div className={cn(VARIANT_CLASS[variant], className)}>
      <ProgrammeCta
        intentScroll={openContactForm}
        parcoursId={parcours.id}
        className={btn.programme}
        shortLabel={isSticky}
      />
      <button
        type="button"
        onClick={() => openContactForm('devis')}
        className={`${OFC_CTA_PRIMARY} ${btn.devis}`}
      >
        {CTA_DEVIS_LABEL}
      </button>
    </div>
  );
}
