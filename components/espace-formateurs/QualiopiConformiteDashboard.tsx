import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import { LINKS } from '@/lib/internal-links';
import {
  QUALIOPI_INDICATOR_LABELS,
  type InterventionReadiness,
  SUBCONTRACT_VALIDATION_LABELS,
} from '@/lib/extranet-formateurs/qualiopi-compliance';
import type { CompetencyEvaluationRow, SubcontractorControlRow } from '@/lib/extranet-formateurs/phase3-types';
import { ExtranetRgpdNotice } from '@/components/espace-formateurs/RgpdNotice';

type Props = {
  readiness: InterventionReadiness;
  evaluations: CompetencyEvaluationRow[];
  subcontractorControl: SubcontractorControlRow | null;
};

export function QualiopiConformiteDashboard({
  readiness,
  evaluations,
  subcontractorControl,
}: Props) {
  const qualiopi = SITE.qualiopi;
  const qualiopiFin = qualiopi.fin.slice(8, 10) + '/' + qualiopi.fin.slice(5, 7) + '/' + qualiopi.fin.slice(0, 4);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Conformité Qualiopi
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Cet espace regroupe les preuves et démarches liées à la certification Qualiopi d&apos;OFC
          Création d&apos;Entreprise (marque Laure Olivié) pour vos interventions en sous-traitance
          — présentiel Île-de-France uniquement.
        </p>
      </header>

      <div className="rounded-xl border border-[#93c5fd] bg-[#EFF6FF] p-5 text-sm text-slate-800">
        <p className="font-semibold text-[#1e40af]">
          Organisme certificateur : {qualiopi.certificateur} — certificat n° {qualiopi.numero}
        </p>
        <p className="mt-1">
          Validité au {qualiopiFin} · Actions de formation.{' '}
          <Link href={LINKS.indicateursResultats} className="font-medium text-[#377CF3] hover:underline">
            Indicateurs de résultats publiés
          </Link>
        </p>
      </div>

      <section
        className={`rounded-xl border p-6 shadow-sm ${
          readiness.canIntervene
            ? 'border-emerald-200 bg-emerald-50/50'
            : 'border-amber-200 bg-amber-50/50'
        }`}
        aria-labelledby="habilitation-intervention"
      >
        <div className="flex flex-wrap items-start gap-3">
          {readiness.canIntervene ? (
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden />
          ) : (
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" aria-hidden />
          )}
          <div className="min-w-0 flex-1">
            <h2 id="habilitation-intervention" className="font-display text-lg font-bold text-slate-900">
              Habilitation à intervenir
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              {readiness.canIntervene
                ? 'Votre dossier permet une intervention sous réserve de validation OFC sur chaque mission.'
                : 'Complétez les points ci-dessous avant toute animation en session au nom d’OFC.'}
            </p>
            {readiness.blockers.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-900">
                {readiness.blockers.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {readiness.checklist.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/80 bg-white px-4 py-3 text-sm"
            >
              <div className="flex min-w-0 items-start gap-2">
                {item.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                ) : (
                  <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-slate-300" aria-hidden />
                )}
                <div>
                  <p className="font-medium text-slate-900">{item.label}</p>
                  {item.detail ? <p className="text-xs text-slate-500">{item.detail}</p> : null}
                  {item.indicator ? (
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Réf. Qualiopi {item.indicator}
                    </p>
                  ) : null}
                </div>
              </div>
              {item.href ? (
                <Link href={item.href} className="shrink-0 text-sm font-semibold text-[#377CF3] hover:underline">
                  Accéder
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Object.values(QUALIOPI_INDICATOR_LABELS).map((ind) => (
          <article key={ind.code} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#377CF3]" aria-hidden />
              <h3 className="font-semibold text-slate-900">
                Indicateur {ind.code} — {ind.title}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{ind.summary}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Fiche sous-traitance (ind. 27)</h2>
        {subcontractorControl ? (
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Statut</dt>
              <dd className="font-medium text-slate-900">
                {SUBCONTRACT_VALIDATION_LABELS[subcontractorControl.validation_status]}
              </dd>
            </div>
            {subcontractorControl.authorized_scope ? (
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Périmètre autorisé</dt>
                <dd className="mt-1 whitespace-pre-wrap text-slate-800">{subcontractorControl.authorized_scope}</dd>
              </div>
            ) : null}
            {subcontractorControl.corrective_actions ? (
              <div className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <dt className="text-xs font-semibold uppercase text-amber-900">Actions correctives OFC</dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-amber-950">
                  {subcontractorControl.corrective_actions}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <p className="mt-2 text-sm text-slate-600">
            Aucune fiche enregistrée pour l&apos;instant. L&apos;équipe OFC la constitue lors de
            l&apos;onboarding.
          </p>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-slate-900">Synthèse compétences (ind. 21)</h2>
          <Link href={LINKS.espaceFormateursQualite} className="text-sm font-medium text-[#377CF3] hover:underline">
            Détail qualité →
          </Link>
        </div>
        {evaluations.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">Aucune évaluation enregistrée pour le moment.</p>
        ) : (
          <p className="mt-2 text-sm text-slate-600">
            Dernière évaluation :{' '}
            {new Date(evaluations[0].evaluated_at).toLocaleDateString('fr-FR')} (
            {evaluations.length} au total).
          </p>
        )}
      </section>

      <ExtranetRgpdNotice />
    </div>
  );
}