'use client';

import { useTransition } from 'react';
import { saveCompetencyEvaluationAction } from '@/app/admin/formateurs/phase3-actions';
import {
  COMPETENCY_CRITERIA,
  EVALUATION_TYPE_LABELS,
  scoreLabel,
} from '@/lib/extranet-formateurs/competency-criteria';
import type { CompetencyEvaluationRow } from '@/lib/extranet-formateurs/phase3-types';

export function CompetencyEvaluationForm({
  trainerId,
  history,
}: {
  trainerId: string;
  history: CompetencyEvaluationRow[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Indicateur 21 — Compétences</h2>
        <p className="mt-1 text-sm text-slate-600">
          Le CV ne suffit pas : grille notée par un administrateur, avec preuves et plan de développement.
        </p>

        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(async () => {
              const res = await saveCompetencyEvaluationAction(trainerId, fd);
              if (!res.ok) alert(res.error);
              else e.currentTarget.reset();
            });
          }}
        >
          <label className="block text-sm">
            Type d&apos;évaluation
            <select name="evaluation_type" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
              {Object.entries(EVALUATION_TYPE_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            {COMPETENCY_CRITERIA.map(({ key, label }) => (
              <label key={key} className="text-sm">
                {label} (1–4)
                <select name={`score_${key}`} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5">
                  <option value="">—</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} — {scoreLabel(n)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <label className="block text-sm">
            Éléments de preuve (références documents, observation…)
            <textarea name="evidence_summary" rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">
            Plan de développement des compétences
            <textarea name="development_plan" rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Enregistrer l&apos;évaluation
          </button>
        </form>
      </section>

      {history.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Historique</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {history.map((ev) => (
              <li key={ev.id} className="rounded-lg border border-slate-100 p-3">
                <p className="font-medium">
                  {EVALUATION_TYPE_LABELS[ev.evaluation_type]} —{' '}
                  {new Date(ev.evaluated_at).toLocaleDateString('fr-FR')}
                </p>
                {ev.development_plan ? (
                  <p className="mt-1 text-slate-600 whitespace-pre-wrap">{ev.development_plan}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
