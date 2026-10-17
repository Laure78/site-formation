import Link from 'next/link';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_STATS } from '@/config/qualiopi';
import { PREUVES_MENTION_SOURCE } from '@/lib/constants';

/** Bandeau « Nos engagements qualité » — Qualiopi + satisfaction OFC (pas de logos tiers). */
export function TrainingQualiopiEngagementsBand() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 px-4 py-10 md:py-12"
      aria-labelledby="engagements-qualite-title"
    >
      <div className="mx-auto max-w-[78rem]">
        <h2
          id="engagements-qualite-title"
          className="text-center font-display text-xl font-bold text-slate-900 md:text-2xl"
        >
          Nos engagements qualité
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <QualiopiCertificationNotice compact showIndicateursLink />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
              Satisfaction stagiaires
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-slate-900">
              {QUALIOPI_STATS.NOTE_MOYENNE_VALEUR}/5
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {QUALIOPI_STATS.NB_REPONDANTS} répondants · {QUALIOPI_STATS.PERIODE_REFERENCE} ·{' '}
              {PREUVES_MENTION_SOURCE}
            </p>
            <p className="mt-4 text-sm">
              <Link href={LINKS.indicateursResultats} className="font-semibold text-[#377CF3] hover:underline">
                Indicateurs de résultats
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
