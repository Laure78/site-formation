'use client';

import { useTransition } from 'react';
import {
  confirmMissionPreparationAction,
  getTrainerMissionDocSignedUrlAction,
  saveMissionTrainerReportAction,
  uploadMissionDocumentAction,
} from '@/app/espace-formateurs/phase2-actions';
import { MISSION_STATUS_LABELS } from '@/lib/extranet-formateurs/phase2-types';
import type { ExtranetMissionDocumentRow, ExtranetMissionRow } from '@/lib/extranet-formateurs/phase2-types';

const DOC_KIND_LABELS: Record<string, string> = {
  attendance_sheet: 'Feuille d’émargement',
  learning_assessment: 'Évaluation des acquis',
  trainer_report_file: 'Compte rendu (fichier)',
  mission_order: 'Ordre de mission',
  other: 'Autre',
};

export function MissionDetailClient({
  mission,
  documents,
}: {
  mission: ExtranetMissionRow;
  documents: ExtranetMissionDocumentRow[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-slate-900">{mission.title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {new Date(mission.starts_on).toLocaleDateString('fr-FR')}
          {mission.schedule_text ? ` · ${mission.schedule_text}` : ''}
          {' · '}
          {MISSION_STATUS_LABELS[mission.status]}
        </p>
        {mission.client_company_name ? (
          <p className="mt-1 text-sm text-slate-700">Client : {mission.client_company_name}</p>
        ) : null}
        {[mission.location_name, mission.location_address, mission.location_city].filter(Boolean).length > 0 ? (
          <p className="mt-1 text-sm text-slate-700">
            Lieu : {[mission.location_name, mission.location_address, mission.location_city].filter(Boolean).join(', ')}
          </p>
        ) : null}
        {mission.pedagogical_brief ? (
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
            <strong>Consignes pédagogiques</strong>
            <p className="mt-1 whitespace-pre-wrap">{mission.pedagogical_brief}</p>
          </div>
        ) : null}
        {mission.administrative_brief ? (
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
            <strong>Consignes administratives</strong>
            <p className="mt-1 whitespace-pre-wrap">{mission.administrative_brief}</p>
          </div>
        ) : null}
      </header>

      {!mission.preparation_confirmed_at && mission.status === 'assigned' ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            startTransition(async () => {
              await confirmMissionPreparationAction(mission.id);
            });
          }}
          className="rounded-lg bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          Confirmer ma préparation pédagogique
        </button>
      ) : mission.preparation_confirmed_at ? (
        <p className="text-sm text-emerald-800">
          Préparation confirmée le {new Date(mission.preparation_confirmed_at).toLocaleString('fr-FR')}.
        </p>
      ) : null}

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Compte rendu formateur</h2>
        <form
          className="mt-3 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(async () => {
              await saveMissionTrainerReportAction(mission.id, String(fd.get('report') ?? ''));
            });
          }}
        >
          <textarea
            name="report"
            rows={6}
            defaultValue={mission.trainer_report ?? ''}
            placeholder="Difficultés, adaptations, propositions d’amélioration…"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
          >
            Enregistrer le compte rendu
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Documents de session</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {documents.length === 0 ? (
            <li className="text-slate-500">Aucun document déposé.</li>
          ) : (
            documents.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                <span>
                  {DOC_KIND_LABELS[d.doc_kind] ?? d.doc_kind} — {d.original_filename}
                </span>
                <button
                  type="button"
                  className="text-[#377CF3] hover:underline"
                  onClick={() => {
                    startTransition(async () => {
                      const res = await getTrainerMissionDocSignedUrlAction(d.id);
                      if (res.ok) window.open(res.url, '_blank', 'noopener,noreferrer');
                    });
                  }}
                >
                  Télécharger
                </button>
              </li>
            ))
          )}
        </ul>

        <form
          className="mt-4 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            fd.set('mission_id', mission.id);
            startTransition(async () => {
              const res = await uploadMissionDocumentAction(fd);
              if (!res.ok) alert(res.error);
              else e.currentTarget.reset();
            });
          }}
        >
          <label className="text-sm">
            Type
            <select name="doc_kind" className="mt-1 block rounded-lg border border-slate-200 px-2 py-1.5">
              {Object.entries(DOC_KIND_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Fichier
            <input type="file" name="file" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="mt-1 block" />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Déposer
          </button>
        </form>
      </section>
    </div>
  );
}
