'use client';

import { useTransition } from 'react';
import { submitMissionFeedbackAction } from '@/app/espace-formateurs/phase3-actions';
import { COMPETENCY_CRITERIA, EVALUATION_TYPE_LABELS, scoreLabel } from '@/lib/extranet-formateurs/competency-criteria';
import type { CompetencyEvaluationRow, QualityActionRow } from '@/lib/extranet-formateurs/phase3-types';
import type { ExtranetMissionRow } from '@/lib/extranet-formateurs/phase2-types';

export function QualiteTrainerView({
  evaluations,
  actions,
  missionsForFeedback,
}: {
  evaluations: CompetencyEvaluationRow[];
  actions: QualityActionRow[];
  missionsForFeedback: ExtranetMissionRow[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Qualité</h1>
        <p className="mt-2 text-sm text-slate-600">
          Suivi de vos compétences, retours de session et plans d&apos;action OFC (Qualiopi).
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Évaluations de compétences</h2>
        {evaluations.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Aucune évaluation enregistrée pour le moment.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {evaluations.map((ev) => (
              <li key={ev.id} className="rounded-lg border border-slate-100 p-4 text-sm">
                <p className="font-semibold text-slate-900">
                  {EVALUATION_TYPE_LABELS[ev.evaluation_type]} —{' '}
                  {new Date(ev.evaluated_at).toLocaleDateString('fr-FR')}
                </p>
                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                  {COMPETENCY_CRITERIA.map(({ key, label }) => {
                    const s = ev.scores?.[key];
                    if (s == null) return null;
                    return (
                      <li key={key} className="text-slate-600">
                        {label} : {scoreLabel(s)}
                      </li>
                    );
                  })}
                </ul>
                {ev.development_plan ? (
                  <p className="mt-2 whitespace-pre-wrap text-slate-700">
                    <strong>Plan de développement :</strong> {ev.development_plan}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Plans d&apos;action</h2>
        {actions.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Aucun plan d&apos;action ouvert.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {actions.map((a) => (
              <li key={a.id} className="rounded-lg border border-slate-100 px-3 py-2">
                <span className="font-medium">Ind. {a.qualiopi_indicator}</span> — {a.title}
                {a.due_date ? (
                  <span className="text-slate-500"> · échéance {new Date(a.due_date).toLocaleDateString('fr-FR')}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {missionsForFeedback.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-slate-900">Retour d&apos;expérience (ind. 30)</h2>
          <p className="mt-1 text-sm text-slate-600">Sessions terminées ou en cours — complétez après intervention.</p>
          <ul className="mt-4 space-y-6">
            {missionsForFeedback.map((m) => (
              <li key={m.id} className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
                <p className="font-medium text-slate-900">{m.title}</p>
                <form
                  className="mt-3 grid gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    startTransition(async () => {
                      const res = await submitMissionFeedbackAction(m.id, fd);
                      if (!res.ok) alert(res.error);
                    });
                  }}
                >
                  <textarea name="difficulties" placeholder="Difficultés rencontrées" rows={2} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <textarea name="adaptations" placeholder="Adaptations réalisées" rows={2} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <textarea name="improvement_proposals" placeholder="Propositions d'amélioration" rows={2} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <textarea name="incident_report" placeholder="Signalement / réclamation éventuelle" rows={2} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <button type="submit" disabled={pending} className="w-fit rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                    Envoyer le retour
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
