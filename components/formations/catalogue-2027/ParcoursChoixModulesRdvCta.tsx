'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { trackClicVisio } from '@/lib/ga4-analytics';
import { buildPrendreRdvHref } from '@/lib/prendre-rdv-href';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const SRC = 'parcours-detail-choix-modules';

type Props = {
  className?: string;
};

/** CTA visio — libellé dédié au choix de modules (`buildPrendreRdvHref`, GA4 `clic_visio`). */
export function ParcoursChoixModulesRdvCta({ className = '' }: Props) {
  const href = buildPrendreRdvHref(SRC);
  return (
    <Link
      href={href}
      data-cta="visio"
      className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold ${className}`.trim()}
      aria-label="Prendre RDV pour choisir mes modules"
      onClick={() => {
        const pagePath =
          typeof window !== 'undefined' ? window.location.pathname : 'parcours-detail';
        trackClicVisio(SRC, pagePath);
      }}
    >
      <Calendar className="h-4 w-4 shrink-0" aria-hidden />
      Prendre RDV pour choisir mes modules
    </Link>
  );
}
