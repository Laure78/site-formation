import Link from 'next/link';
import { ArrowRight, FileText, Tag } from 'lucide-react';
import {
  DEV_WEB_IA_TARIF_GROUPE_BADGE,
  DEV_WEB_IA_TARIF_GROUPE_CTA,
  DEV_WEB_IA_TARIF_GROUPE_DESCRIPTION,
  DEV_WEB_IA_TARIF_GROUPE_LIBELLE,
  DEV_WEB_IA_TARIF_GROUPE_TITLE,
  devWebIaProjectFormHref,
} from '@/lib/formation-developpement-web-ia-content';
import { MENTIONS_TVA_INTRA_COURTE } from '@/lib/tarifs-sessions';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  showCta?: boolean;
  /** CTA principal (section tarifs) ou secondaire (carte hero). */
  ctaVariant?: 'primary' | 'secondary';
  headingLevel?: 'h3' | 'p';
  showTitle?: boolean;
  /** Mention TVA sous la carte (hero : la carte parente l’affiche déjà). */
  showTvaFootnote?: boolean;
};

/** Carte tarif groupe NIV-10 — session dédiée, devis. */
export function DevWebIaTarifGroupeCard({
  className,
  showCta = true,
  ctaVariant = 'primary',
  headingLevel = 'h3',
  showTitle = true,
  showTvaFootnote = false,
}: Props) {
  const Heading = headingLevel;
  const ctaClass = ctaVariant === 'primary' ? OFC_CTA_PRIMARY : OFC_CTA_SECONDARY;

  return (
    <div className={cn(className)}>
      <article
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        aria-label={DEV_WEB_IA_TARIF_GROUPE_TITLE}
      >
        {showTitle ? (
          <Heading className="font-display text-base font-semibold leading-snug text-ofc-ink sm:text-lg">
            {DEV_WEB_IA_TARIF_GROUPE_TITLE}
          </Heading>
        ) : null}

        <div className={cn('flex flex-wrap items-center gap-2.5', showTitle ? 'mt-4' : 'mt-0')}>
          <FileText className="h-7 w-7 shrink-0 text-[#377CF3]" aria-hidden />
          <p className="font-display text-2xl font-bold leading-none text-[#377CF3] sm:text-[1.65rem]">
            {DEV_WEB_IA_TARIF_GROUPE_LIBELLE}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#377CF3]">
            <Tag className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {DEV_WEB_IA_TARIF_GROUPE_BADGE}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">{DEV_WEB_IA_TARIF_GROUPE_DESCRIPTION}</p>

        {showCta ? (
          <Link
            href={devWebIaProjectFormHref()}
            className={`${ctaClass} mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
          >
            {DEV_WEB_IA_TARIF_GROUPE_CTA}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        ) : null}
      </article>

      {showTvaFootnote ? (
        <p className="mt-2 text-xs leading-relaxed text-ofc-ink-subtle">{MENTIONS_TVA_INTRA_COURTE}</p>
      ) : null}
    </div>
  );
}
