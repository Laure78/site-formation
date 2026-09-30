import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

type Props = {
  /** Lien du CTA principal (souvent devis). Alias historique. */
  devisHref?: string;
  primaryHref?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showFinancementNote?: boolean;
  note?: string;
  /** Variante visuelle sombre (page pilote) ou claire (catalogue legacy). */
  variant?: 'dark' | 'light';
};

/** CTA final conversion — devis + échange. */
export function TrainingFinalCta({
  devisHref,
  primaryHref,
  title = 'Parlons de votre projet de formation',
  description = 'Vous souhaitez organiser cette formation pour votre équipe ? Échangeons sur vos besoins, vos cas d’usage et le format adapté.',
  primaryLabel = 'Demander un devis',
  secondaryHref,
  secondaryLabel = 'Échanger sur votre projet',
  showFinancementNote = true,
  note,
  variant = 'light',
}: Props) {
  const resolvedPrimary = primaryHref ?? devisHref ?? LINKS.contact;
  const resolvedSecondary = secondaryHref ?? LINKS.prendreRdv;
  const isDark = variant === 'dark';

  return (
    <section
      className={
        isDark
          ? 'border-b border-slate-200 bg-slate-900 px-4 py-14 md:py-16'
          : 'border-b border-slate-200 bg-slate-50 px-4 py-14 md:py-16'
      }
      aria-labelledby="training-cta-final-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="training-cta-final-title"
          className={
            isDark
              ? 'font-display text-2xl font-bold tracking-tight text-white text-balance md:text-3xl'
              : 'font-display text-2xl font-bold tracking-tight text-slate-900 text-balance md:text-3xl'
          }
        >
          {title}
        </h2>
        <p
          className={
            isDark
              ? 'mt-4 text-base leading-relaxed text-slate-300'
              : 'mt-4 text-base leading-relaxed text-slate-600'
          }
        >
          {description}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={resolvedPrimary}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={resolvedSecondary}
            className={
              isDark
                ? 'inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto'
                : 'ofc-cta-secondary inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto'
            }
          >
            {secondaryLabel}
          </Link>
        </div>
        {note ? (
          <p className={isDark ? 'mt-4 text-sm font-medium text-slate-400' : 'mt-4 text-sm font-medium text-slate-500'}>
            {note}
          </p>
        ) : null}
        {showFinancementNote ? (
          <p
            className={
              isDark
                ? 'mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-slate-500'
                : 'mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-slate-500'
            }
          >
            {FINANCEMENT_FORMULATION_PRUDENTE}{' '}
            <Link
              href={LINKS.financement}
              className={
                isDark
                  ? 'font-medium text-[#93B4F8] hover:underline'
                  : 'font-medium text-[#377CF3] hover:underline'
              }
            >
              En savoir plus sur le financement
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
