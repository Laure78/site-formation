import { Download } from 'lucide-react';
import { CtaDevis } from '@/components/CtaDevis';
import { CTA_TELECHARGER_PROGRAMME_LABEL } from '@/lib/cta-programme-label';
import { cn } from '@/lib/cn';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { trainingDevisHref } from '@/lib/training-page-helpers';

type Props = {
  formationTitle: string;
  pdfHref?: string;
  className?: string;
  /** Libellé court pour la barre sticky mobile. */
  programmeShortLabel?: string;
};

/**
 * CTA hero catalogue — « Demander un devis » + « Télécharger le programme » (PDF uniquement si disponible).
 */
export function TrainingFormationHeroActions({
  formationTitle,
  pdfHref,
  className,
  programmeShortLabel = 'Programme',
}: Props) {
  const devisHref = trainingDevisHref(formationTitle);

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
      <CtaDevis
        href={devisHref}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto"
      />
      {pdfHref ? (
        <a
          href={pdfHref}
          download
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">{CTA_TELECHARGER_PROGRAMME_LABEL}</span>
          <span className="sm:hidden">{programmeShortLabel}</span>
        </a>
      ) : null}
    </div>
  );
}
