import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

type Props = {
  devisHref: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showFinancementNote?: boolean;
};

/** CTA final sobre — devis + échange. */
export function TrainingFinalCta({
  devisHref,
  title = 'Parlons de votre projet de formation',
  description = 'Vous souhaitez organiser cette formation pour votre équipe ? Échangeons sur vos besoins, vos cas d’usage et le format adapté.',
  primaryLabel = 'Demander un devis',
  secondaryHref = LINKS.contact,
  secondaryLabel = 'Échanger sur votre projet',
  showFinancementNote = true,
}: Props) {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:py-16"
      aria-labelledby="training-cta-final-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="training-cta-final-title"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={devisHref}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            {secondaryLabel}
          </Link>
        </div>
        {showFinancementNote ? (
          <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-slate-500">
            {FINANCEMENT_FORMULATION_PRUDENTE}{' '}
            <Link href={LINKS.financement} className="font-medium text-[#377CF3] hover:underline">
              En savoir plus sur le financement
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
