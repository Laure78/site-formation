import Link from 'next/link';
import {
  formatMontantHtApplicationMetier,
  getTarifApplicationMetierBtpHt,
} from '@/lib/tarifs-applications-metier-btp';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { CtaDevis } from '@/components/CtaDevis';
import { CTA_TELECHARGER_PROGRAMME_LABEL } from '@/lib/cta-programme-label';
import { trainingDevisHref } from '@/lib/training-page-helpers';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { TrainingDeliveryInfo } from '@/components/formations/TrainingDeliveryInfo';
import {
  APPLICATION_METIER_PARCOURS_MOTHER,
} from '@/lib/application-metier-btp-parcours-nav';
import { trainingCategoryBadge } from '@/lib/training-page-helpers';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import type { ApplicationMetierNiveauConfig } from '@/lib/parcours-applications-metier-btp-content';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { TrainingFormationBreadcrumb } from '@/components/formations/training/TrainingFormationBreadcrumb';

type Props = {
  config: ApplicationMetierNiveauConfig;
  stepBadge: string;
  formationHint: string;
};

/** Hero compact — sans image LCP, priorise H1 + promesse + tarif + CTA. */
export function ApplicationMetierFormationHero({ config, stepBadge }: Props) {
  const montant = formatMontantHtApplicationMetier(getTarifApplicationMetierBtpHt(config.tarifKey));
  const facts = config.ux?.heroFacts ?? `${config.duree} · Intra-entreprise · Île-de-France`;

  return (
    <header className="border-b border-slate-200 bg-white px-4 pb-10 pt-8 md:pb-12 md:pt-10">
      <div className="mx-auto max-w-3xl">
        <TrainingFormationBreadcrumb
          formationTitle={config.h1}
          formationPath={config.path}
          jsonLdId={`schema-breadcrumb-${config.ref.toLowerCase()}`}
        />
        <Link href={APPLICATION_METIER_PARCOURS_MOTHER.path} className={`mt-4 inline-block text-sm ${OFC_LINK}`}>
          {APPLICATION_METIER_PARCOURS_MOTHER.backLabel}
        </Link>

        <div className="mt-5 flex flex-wrap gap-2">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            {trainingCategoryBadge('applications-metier')}
          </p>
          <p className="inline-flex rounded-full bg-[#377CF3]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
            {config.ux?.heroBadge ?? config.progressionLabel}
          </p>
        </div>

        <h1 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
          {config.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-snug text-slate-600 sm:text-lg">
          {config.subtitle}
        </p>
        <p className="mt-3 text-sm font-medium text-slate-700">{facts}</p>
        <TrainingDeliveryInfo variant="inline" className="mt-2" />

        <p className="mt-5 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          {montant}
          <MentionTvaAsterisque />
          <span className="ml-2 text-base font-semibold text-slate-600">/ session</span>
        </p>
        <p className="mt-1 text-sm text-slate-600">Tarif pour l’ensemble du groupe.</p>

        <FormationHeroOutilsNote catalogueRef={config.ref} className="mt-5" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CtaDevis
            href={trainingDevisHref(config.h1)}
            className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto"
          />
          <a
            href="#programme"
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
          >
            {CTA_TELECHARGER_PROGRAMME_LABEL}
          </a>
        </div>
        <p className="sr-only">{stepBadge}</p>
      </div>
    </header>
  );
}
