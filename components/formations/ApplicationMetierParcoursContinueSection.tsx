import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import {
  APPLICATION_METIER_PARCOURS_MOTHER,
  type ApplicationMetierParcoursStep,
} from '@/lib/application-metier-btp-parcours-nav';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

type Props = {
  step: ApplicationMetierParcoursStep;
};

/** Section « Poursuivre le parcours » ou clôture niveau 3 — après le programme. */
export function ApplicationMetierParcoursContinueSection({ step }: Props) {
  if (step.terminer) {
    const { terminer } = step;
    return (
      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="font-display text-2xl font-bold text-slate-900">{terminer.title}</h2>
          <p className="mt-4 text-slate-600">{terminer.text}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={APPLICATION_METIER_PARCOURS_MOTHER.path} className={OFC_CTA_PRIMARY}>
              {terminer.primaryCta}
            </Link>
            <RdvLink variant="unstyled" className={OFC_CTA_SECONDARY} campaign={terminer.secondaryCampaign} />
          </div>
        </div>
      </section>
    );
  }

  if (!step.poursuivre) return null;

  const { poursuivre } = step;

  return (
    <section className={OFC_SEC.muted}>
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-900">{poursuivre.title}</h2>
        <p className="mt-4 text-slate-600">{poursuivre.text}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href={poursuivre.primaryHref} className={OFC_CTA_PRIMARY}>
            {poursuivre.primaryCta}
          </Link>
          <Link
            href={APPLICATION_METIER_PARCOURS_MOTHER.path}
            className={`text-sm font-semibold ${OFC_LINK}`}
          >
            {poursuivre.secondaryCta}
          </Link>
        </div>
        {poursuivre.tertiaryLink ? (
          <p className="mt-6 text-sm text-slate-600">
            <Link href={poursuivre.tertiaryLink.href} className={OFC_LINK}>
              {poursuivre.tertiaryLink.label}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
