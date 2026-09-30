import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  DEV_WEB_IA_TARIF_GROUPE_CTA,
  DEV_WEB_IA_TARIF_GROUPE_DESCRIPTION,
  DEV_WEB_IA_TARIF_GROUPE_HT,
  DEV_WEB_IA_TARIF_GROUPE_TITLE,
  devWebIaProjectFormHref,
} from '@/lib/formation-developpement-web-ia-content';
import { formatTarifHt } from '@/lib/tarifs-sessions';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  showCta?: boolean;
  /** CTA principal (section tarifs) ou secondaire (carte hero). */
  ctaVariant?: 'primary' | 'secondary';
  headingLevel?: 'h3' | 'p';
  showTitle?: boolean;
};

/** Carte tarif groupe NIV-10 — forfait par groupe, sans lien à un parcours 7 h / 14 h. */
export function DevWebIaTarifGroupeCard({
  className,
  showCta = true,
  ctaVariant = 'primary',
  headingLevel = 'h3',
  showTitle = true,
}: Props) {
  const Heading = headingLevel;
  const ctaClass = ctaVariant === 'primary' ? OFC_CTA_PRIMARY : OFC_CTA_SECONDARY;

  return (
    <article
      className={cn(
        'rounded-2xl border border-[#377CF3]/25 bg-gradient-to-br from-[#EFF6FF]/80 via-white to-white p-5 shadow-sm sm:p-6',
        className,
      )}
      aria-label={DEV_WEB_IA_TARIF_GROUPE_TITLE}
    >
      {showTitle ? (
        <Heading className="font-display text-base font-semibold leading-snug text-ofc-ink sm:text-lg">
          {DEV_WEB_IA_TARIF_GROUPE_TITLE}
        </Heading>
      ) : null}
      <p className="mt-3 font-display text-2xl font-bold leading-none text-[#377CF3] sm:text-3xl">
        {formatTarifHt(DEV_WEB_IA_TARIF_GROUPE_HT)} €
        <span className="ml-1 text-sm font-semibold text-ofc-ink-muted sm:text-base">
          HT par groupe
          <MentionTvaAsterisque />
        </span>
      </p>
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
  );
}
