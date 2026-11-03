'use client';

import { useTransition } from 'react';
import { saveSubcontractorControlAction } from '@/app/admin/formateurs/phase3-actions';
import type { SubcontractorControlRow } from '@/lib/extranet-formateurs/phase3-types';

export function SubcontractorControlForm({
  trainerId,
  latest,
}: {
  trainerId: string;
  latest: SubcontractorControlRow | null;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-slate-900">Indicateur 27 — Sous-traitance</h2>
      <p className="mt-1 text-sm text-slate-600">
        Fiche de contrôle documentée. Cochez « Valider la fiche » pour enregistrer une validation humaine
        (jamais de conformité Qualiopi automatique).
      </p>
      {latest?.validation_status === 'validated' ? (
        <p className="mt-2 text-sm text-emerald-800">
          Dernière fiche validée v{latest.version} le{' '}
          {latest.validated_at ? new Date(latest.validated_at).toLocaleDateString('fr-FR') : '—'}.
        </p>
      ) : null}

      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            const res = await saveSubcontractorControlAction(trainerId, fd);
            if (!res.ok) alert(res.error);
          });
        }}
      >
        <label className="block text-sm">
          Périmètre d&apos;interventions autorisées
          <textarea
            name="authorized_scope"
            rows={2}
            defaultValue={latest?.authorized_scope ?? ''}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          {[
            ['admin_situation_ok', 'Situation administrative'],
            ['competencies_ok', 'Compétences'],
            ['contract_ok', 'Contrat de sous-traitance'],
            ['quality_obligations_ok', 'Obligations qualité'],
            ['procedures_ok', 'Respect des procédures'],
            ['evaluations_reviewed', 'Résultats des évaluations revus'],
          ].map(([name, label]) => (
            <label key={name} className="flex items-center gap-2">
              <input type="checkbox" name={name} />
              {label}
            </label>
          ))}
        </div>
        <label className="block text-sm">
          Difficultés constatées
          <textarea name="difficulties_notes" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Actions correctives
          <textarea name="corrective_actions" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Notes internes
          <textarea name="admin_notes" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
          <input type="checkbox" name="validate" />
          Valider la fiche (validation administrateur)
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          Enregistrer une nouvelle version
        </button>
      </form>
    </section>
  );
}
