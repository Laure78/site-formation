import Link from 'next/link';
import {
  formatMontantHtApplicationMetier,
  getTarifApplicationMetierBtpHt,
} from '@/lib/tarifs-applications-metier-btp';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { ApplicationMetierRdvCta } from '@/components/formations/ApplicationMetierRdvCta';
import {
  APPLICATION_METIER_PARCOURS_MOTHER,
} from '@/lib/application-metier-btp-parcours-nav';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import type { ApplicationMetierNiveauConfig } from '@/lib/parcours-applications-metier-btp-content';

type Props = {
  config: ApplicationMetierNiveauConfig;
  stepBadge: string;
  formationHint: string;
};

/** Hero compact — sans image LCP, priorise H1 + promesse + tarif + CTA. */
export function ApplicationMetierFormationHero({ config, stepBadge, formationHint }: Props) {
  const montant = formatMontantHtApplicationMetier(getTarifApplicationMetierBtpHt(config.tarifKey));
  const facts = config.ux?.heroFacts ?? `${config.duree} · Intra-entreprise · Île-de-France`;

  return (
    <header className="border-b border-slate-200 bg-white px-4 pb-10 pt-8 md:pb-12 md:pt-10">
      <div className="mx-auto max-w-3xl">
        <Link href={APPLICATION_METIER_PARCOURS_MOTHER.path} className={`text-sm ${OFC_LINK}`}>
          {APPLICATION_METIER_PARCOURS_MOTHER.backLabel}
        </Link>

        <p className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
          {config.ux?.heroBadge ?? `Applications métier BTP · ${config.progressionLabel}`}
        </p>

        <h1 className="mt-4 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {config.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-snug text-slate-600 sm:text-lg">
          {config.subtitle}
        </p>
        <p className="mt-3 text-sm font-medium text-slate-700">{facts}</p>

        <p className="mt-5 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          {montant}
          <MentionTvaAsterisque />
          <span className="ml-2 text-base font-semibold text-slate-600">/ session</span>
        </p>
        <p className="mt-1 text-sm text-slate-600">Tarif pour l’ensemble du groupe.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ApplicationMetierRdvCta
            label={config.ux?.ctaHeroLabel ?? 'Parler de mon projet'}
            origin={`application-metier-${config.slug}-hero`}
            formationHint={formationHint}
          />
          <a
            href="#programme"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-800 hover:border-[var(--accent)]"
          >
            Voir le programme
          </a>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          <Link href={APPLICATION_METIER_PARCOURS_MOTHER.path} className={OFC_LINK}>
            Voir le parcours Niveau 1 → Niveau 2 → Niveau 3
          </Link>
        </p>
        <p className="sr-only">{stepBadge}</p>
      </div>
    </header>
  );
}
