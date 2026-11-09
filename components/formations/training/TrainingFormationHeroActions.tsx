import Link from 'next/link';
import { Calendar, Download } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { CtaDevis } from '@/components/CtaDevis';
import { CTA_RECEVOIR_PROGRAMME_LABEL } from '@/lib/cta-programme-label';
import { cn } from '@/lib/cn';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { trainingDevisHref } from '@/lib/training-page-helpers';

type Props = {
  formationTitle: string;
  pdfHref?: string;
  /** Suivi GA4 — query `?src=` (ex. `formation-niv02-ao-hero`). */
  ctaSrc?: string;
  className?: string;
  /** Libellé court pour la barre sticky mobile. */
  programmeShortLabel?: string;
  /** Encadré format court : bouton programme seul (réf. NIV-02). */
  variant?: 'full' | 'programme-only';
  /** Hero catalogue : visio + programme (défaut) ou programme + devis (NIV-13). */
  ctaMode?: 'visio-programme' | 'programme-devis';
};

/**
 * CTA hero catalogue — « Prendre RDV » + « Recevoir le programme » (réf. NIV-02).
 */
export function TrainingFormationHeroActions({
  formationTitle,
  pdfHref,
  ctaSrc = 'formation-catalogue-unspecified',
  className,
  programmeShortLabel = 'Programme',
  variant = 'full',
  ctaMode = 'visio-programme',
}: Props) {
  const programmeButton = pdfHref ? (
    <a
      href={pdfHref}
      download
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{CTA_RECEVOIR_PROGRAMME_LABEL}</span>
      <span className="sm:hidden">{programmeShortLabel}</span>
    </a>
  ) : (
    <Link
      href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{CTA_RECEVOIR_PROGRAMME_LABEL}</span>
      <span className="sm:hidden">{programmeShortLabel}</span>
    </Link>
  );

  if (variant === 'programme-only') {
    return <div className={cn('flex', className)}>{programmeButton}</div>;
  }

  if (ctaMode === 'programme-devis') {
    return (
      <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
        {programmeButton}
        <CtaDevis
          href={trainingDevisHref(formationTitle)}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3 sm:w-auto`}
        />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
      <CtaVisio
        src={ctaSrc}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto"
        leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
      />
      {programmeButton}
    </div>
  );
}
