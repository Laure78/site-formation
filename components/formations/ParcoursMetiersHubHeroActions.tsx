'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { CTA_RECEVOIR_PROGRAMME_LABEL } from '@/lib/cta-programme-label';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';
import { PARCOURS_METIERS_SECTION } from '@/lib/parcours-metiers-page-content';
import { useParcoursHubContact } from './parcours-hub-contact-context';

type Props = {
  className?: string;
};

export function ParcoursMetiersHubHeroActions({ className }: Props) {
  const { openContactForm } = useParcoursHubContact();

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
      <Link
        href={`#${PARCOURS_METIERS_SECTION.id}`}
        className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
      >
        Découvrir les parcours
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </Link>
      <button
        type="button"
        onClick={() => openContactForm('programme')}
        className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
      >
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        {CTA_RECEVOIR_PROGRAMME_LABEL}
      </button>
    </div>
  );
}
