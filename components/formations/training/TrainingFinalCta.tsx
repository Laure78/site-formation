'use client';

import Link from 'next/link';
import { CtaVisio } from '@/components/CtaVisio';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

type Props = {
  devisHref?: string;
  primaryHref?: string;
  title?: string;
  description?: string;
  /** @deprecated Libellé fixe via CtaVisio / CtaDevis. */
  primaryLabel?: string;
  secondaryHref?: string;
  /** @deprecated Libellé fixe via CtaVisio / CtaDevis. */
  secondaryLabel?: string;
  showFinancementNote?: boolean;
  note?: string;
  variant?: 'dark' | 'light';
  /** `src` GA4 pour le bouton visio (défaut `training-final-cta`). */
  visioSrc?: string;
};

function isPrendreRdvHref(href: string): boolean {
  const path = href.split('?')[0]?.replace(/\/$/, '') ?? '';
  return path === LINKS.prendreRdv || path.endsWith('/prendre-rdv');
}

function isContactHref(href: string): boolean {
  const path = href.split('?')[0]?.replace(/\/$/, '') ?? '';
  return path === LINKS.contact || path.endsWith('/contact');
}

function CtaForHref({
  href,
  visioSrc,
  variant,
  fallbackLabel,
}: {
  href: string;
  visioSrc: string;
  variant: 'dark' | 'light';
  fallbackLabel?: string;
}) {
  const btnClass = 'inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto';

  if (isPrendreRdvHref(href)) {
    return (
      <CtaVisio
        src={visioSrc}
        variant="primary"
        className={
          variant === 'dark'
            ? `${btnClass} border-0 bg-[#377CF3] text-white hover:bg-[#2f6bd4]`
            : btnClass
        }
      />
    );
  }

  if (isContactHref(href)) {
    return (
      <CtaVisio
        src={visioSrc}
        variant="primary"
        className={
          variant === 'dark'
            ? `${btnClass} border-0 bg-[#377CF3] text-white hover:bg-[#2f6bd4]`
            : btnClass
        }
      />
    );
  }

  return (
    <Link href={href} className={`ofc-cta-primary ${btnClass}`}>
      {fallbackLabel ?? href}
    </Link>
  );
}

function SecondaryCtaForHref({
  href,
  visioSrc,
  isDark,
  fallbackLabel,
}: {
  href: string;
  visioSrc: string;
  isDark: boolean;
  fallbackLabel?: string;
}) {
  const btnClass = `inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto ${
    isDark
      ? 'rounded-xl border border-white/30 bg-transparent text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
      : 'ofc-cta-secondary'
  }`;

  if (isPrendreRdvHref(href)) {
    return <CtaVisio src={`${visioSrc}-secondary`} variant="secondary" className={btnClass} />;
  }

  if (isContactHref(href)) {
    return (
      <Link href={href} className={btnClass}>
        {fallbackLabel ?? 'Demander un devis'}
      </Link>
    );
  }

  return (
    <Link href={href} className={btnClass}>
      {fallbackLabel ?? href}
    </Link>
  );
}

/** CTA final conversion — visio + devis (libellés uniques). */
export function TrainingFinalCta({
  devisHref,
  primaryHref,
  primaryLabel,
  title = 'Parlons de votre projet de formation',
  description = 'Vous souhaitez organiser cette formation pour votre équipe ? Échangeons sur vos besoins, vos cas d’usage et le format adapté.',
  secondaryHref,
  secondaryLabel,
  showFinancementNote = true,
  note,
  variant = 'light',
  visioSrc = 'training-final-cta',
}: Props) {
  const resolvedPrimary = primaryHref ?? devisHref ?? LINKS.prendreRdv;
  const resolvedSecondary = secondaryHref ?? LINKS.contact;
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
              ? 'font-display text-xl font-bold tracking-tight text-white text-balance md:text-2xl'
              : 'font-display text-xl font-bold tracking-tight text-slate-900 text-balance md:text-2xl'
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
          <CtaForHref
            href={resolvedPrimary}
            visioSrc={visioSrc}
            variant={variant}
            fallbackLabel={primaryLabel}
          />
          <SecondaryCtaForHref
            href={resolvedSecondary}
            visioSrc={visioSrc}
            isDark={isDark}
            fallbackLabel={secondaryLabel}
          />
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
