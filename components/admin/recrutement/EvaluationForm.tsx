'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { saveRecruitmentEvaluationAction } from '@/app/admin/recrutement/actions';
import {
  EVALUATION_CRITERIA_ETAPE_1,
  EVALUATION_CRITERIA_ETAPE_2,
  EVALUATION_DECISIONS_ETAPE_1,
  EVALUATION_DECISIONS_ETAPE_2,
  EVALUATION_MAX_ETAPE_1,
  EVALUATION_MAX_ETAPE_2,
  scoreLabel,
  sumEvaluationScores,
  type EvaluationCriterion,
} from '@/lib/recruitment/evaluation-criteria';
import type { RecruitmentEvaluationRow } from '@/lib/recruitment/types';

export function EvaluationForm({
  candidatId,
  stage,
  initial,
}: {
  candidatId: string;
  stage: 1 | 2;
  initial: RecruitmentEvaluationRow | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const criteria = stage === 1 ? EVALUATION_CRITERIA_ETAPE_1 : EVALUATION_CRITERIA_ETAPE_2;
  const max = stage === 1 ? EVALUATION_MAX_ETAPE_1 : EVALUATION_MAX_ETAPE_2;
  const decisions = stage === 1 ? EVALUATION_DECISIONS_ETAPE_1 : EVALUATION_DECISIONS_ETAPE_2;
  const scores = (initial?.scores ?? {}) as Record<string, number>;

  const [liveScores, setLiveScores] = useState<Record<string, number>>(scores);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const res = await saveRecruitmentEvaluationAction(
            candidatId,
            stage,
            new FormData(e.currentTarget),
          );
          if (!res.ok) alert(res.error);
          else router.refresh();
        });
      }}
    >
      <ScoreGrid criteria={criteria} scores={scores} onScoresChange={setLiveScores} />
      <p className="text-sm font-semibold text-slate-900">
        Total : {sumEvaluationScores(liveScores, criteria)} / {max}
      </p>

      {stage === 2 ? (
        <label className="block text-sm">
          Sujet choisi (cas pratique)
          <textarea
            name="cas_pratique_subject"
            rows={2}
            defaultValue={initial?.cas_pratique_subject ?? ''}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
      ) : null}

      <label className="block text-sm">
        Points forts
        <textarea
          name="strengths"
          rows={3}
          defaultValue={initial?.strengths ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Points de vigilance
        <textarea
          name="vigilance"
          rows={3}
          defaultValue={initial?.vigilance ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        Décision
        <select
          name="decision"
          defaultValue={initial?.decision ?? ''}
          className="mt-1 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="">—</option>
          {Object.entries(decisions).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : 'Enregistrer la grille'}
        </button>
        <a
          href={`/api/admin/recrutement/evaluation-pdf?candidatId=${encodeURIComponent(candidatId)}&stage=${stage}`}
          className="rounded-lg border border-[#377CF3] px-4 py-2 text-sm font-semibold text-[#377CF3]"
        >
          Export PDF
        </a>
      </div>
    </form>
  );
}

function readScoresFromForm(
  form: HTMLFormElement | null,
  criteria: readonly EvaluationCriterion[],
): Record<string, number> {
  const next: Record<string, number> = {};
  if (!form) return next;
  for (const { key } of criteria) {
    const el = form.elements.namedItem(`score_${key}`) as HTMLSelectElement | null;
    const raw = el?.value;
    if (raw) next[key] = Number(raw);
  }
  return next;
}

function ScoreGrid({
  criteria,
  scores,
  onScoresChange,
}: {
  criteria: readonly EvaluationCriterion[];
  scores: Record<string, number>;
  onScoresChange: (next: Record<string, number>) => void;
}) {
  const groups = useMemo(() => {
    const m = new Map<string, EvaluationCriterion[]>();
    for (const c of criteria) {
      const list = m.get(c.group) ?? [];
      list.push(c);
      m.set(c.group, list);
    }
    return [...m.entries()];
  }, [criteria]);

  return (
    <div className="space-y-6">
      {groups.map(([group, items]) => (
        <section key={group} className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="font-display text-sm font-bold text-[#377CF3]">{group}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {items.map(({ key, label }) => (
              <label key={key} className="text-sm">
                {label} (1–4)
                <select
                  name={`score_${key}`}
                  defaultValue={scores[key] != null ? String(scores[key]) : ''}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5"
                  onChange={(e) => {
                    onScoresChange(readScoresFromForm(e.currentTarget.form, criteria));
                  }}
                >
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
        </section>
      ))}
    </div>
  );
}
