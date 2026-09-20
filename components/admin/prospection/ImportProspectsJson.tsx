'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  analyzeProspectsJsonAction,
  confirmProspectsJsonImportAction,
  type ConfirmImportDecision,
} from '@/app/admin/prospection/actions';
import {
  PROSPECTS_JSON_EXAMPLE,
  type AnalyzedProspectRow,
  type DuplicateMode,
  type ImportSourceMeta,
} from '@/lib/prospection/import-json';
import { typeStructureLabel } from '@/lib/prospection/constants';
import { LINKS } from '@/lib/internal-links';

export function ImportProspectsJson() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [json, setJson] = useState('');
  const [pending, startTransition] = useTransition();
  const [step, setStep] = useState<'paste' | 'preview' | 'done'>('paste');
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<ImportSourceMeta | null>(null);
  const [rows, setRows] = useState<AnalyzedProspectRow[]>([]);
  const [modes, setModes] = useState<Record<number, DuplicateMode>>({});
  const [report, setReport] = useState<string | null>(null);

  const counts = useMemo(() => {
    return {
      detected: rows.length,
      news: rows.filter((r) => r.status === 'new').length,
      duplicates: rows.filter((r) => r.status === 'duplicate').length,
      errors: rows.filter((r) => r.status === 'error').length,
    };
  }, [rows]);

  const reset = () => {
    setStep('paste');
    setError(null);
    setSource(null);
    setRows([]);
    setModes({});
    setReport(null);
  };

  const close = () => {
    setOpen(false);
    reset();
  };

  const onAnalyze = () => {
    setError(null);
    setReport(null);
    startTransition(async () => {
      const res = await analyzeProspectsJsonAction(json);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSource(res.source);
      setRows(res.rows);
      const nextModes: Record<number, DuplicateMode> = {};
      for (const r of res.rows) {
        if (r.status === 'duplicate') {
          nextModes[r.draft.rowIndex] = r.defaultMode;
        }
      }
      setModes(nextModes);
      setStep('preview');
    });
  };

  const onConfirm = () => {
    setError(null);
    startTransition(async () => {
      const decisions: ConfirmImportDecision[] = Object.entries(modes).map(
        ([rowIndex, mode]) => ({ rowIndex: Number(rowIndex), mode })
      );
      const res = await confirmProspectsJsonImportAction(json, decisions);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      const parts = [
        `${res.imported} créé${res.imported > 1 ? 's' : ''}`,
        res.updated ? `${res.updated} mis à jour` : null,
        res.skipped ? `${res.skipped} ignoré${res.skipped > 1 ? 's' : ''}` : null,
      ].filter(Boolean);
      let msg = parts.join(' · ');
      if (res.errors.length) {
        msg +=
          '\n' +
          res.errors
            .slice(0, 5)
            .map((e) => `${e.label} : ${e.reason}`)
            .join('\n');
      }
      setReport(msg);
      setStep('done');
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
      >
        Importer JSON
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-json-title"
        >
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div>
                <h2 id="import-json-title" className="font-display text-lg font-semibold text-slate-900">
                  Importer des prospects depuis un JSON
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Collez un bloc JSON, analysez, puis créez les fiches CRM.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {step === 'paste' ? (
                <div className="space-y-3">
                  <textarea
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    rows={14}
                    spellCheck={false}
                    placeholder={PROSPECTS_JSON_EXAMPLE}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 font-mono text-xs text-slate-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setJson(PROSPECTS_JSON_EXAMPLE)}
                    className="text-xs font-medium text-[#377CF3] hover:underline"
                  >
                    Charger un exemple
                  </button>
                </div>
              ) : null}

              {step === 'preview' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <StatChip label="détectés" value={counts.detected} />
                    <StatChip label="nouveaux" value={counts.news} tone="emerald" />
                    <StatChip label="doublons" value={counts.duplicates} tone="amber" />
                    <StatChip label="erreurs" value={counts.errors} tone="rose" />
                  </div>

                  {source ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">Source globale</p>
                      <ul className="mt-1 space-y-0.5 text-xs">
                        {source.event ? <li>Événement : {String(source.event)}</li> : null}
                        {source.organizer ? <li>Organisateur : {String(source.organizer)}</li> : null}
                        {source.location ? <li>Lieu : {String(source.location)}</li> : null}
                        {source.event_date ? (
                          <li>
                            Date :{' '}
                            {new Date(String(source.event_date)).toLocaleDateString('fr-FR')}
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  ) : null}

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-3 py-2">Nom</th>
                          <th className="px-3 py-2">Entreprise</th>
                          <th className="px-3 py-2">Email</th>
                          <th className="px-3 py-2">Fonction</th>
                          <th className="px-3 py-2">Catégorie</th>
                          <th className="px-3 py-2">Dpt</th>
                          <th className="px-3 py-2">Statut</th>
                          <th className="px-3 py-2">Source</th>
                          <th className="px-3 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.draft.rowIndex} className="border-t border-slate-100">
                            <td className="px-3 py-2 font-medium text-slate-900">
                              {r.draft.prenom} {r.draft.nom}
                              {r.status === 'error' ? (
                                <p className="text-xs text-rose-600">{r.error}</p>
                              ) : null}
                              {r.status === 'duplicate' ? (
                                <p className="text-xs text-amber-700">
                                  Déjà existant : {r.existingLabel}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-3 py-2 text-slate-700">
                              {r.draft.entreprise ?? '—'}
                            </td>
                            <td className="px-3 py-2 text-slate-600">{r.draft.email ?? '—'}</td>
                            <td className="px-3 py-2 text-slate-600">
                              {r.draft.fonction ?? '—'}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {typeStructureLabel(r.draft.type_structure)}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {r.draft.departement ?? '—'}
                            </td>
                            <td className="px-3 py-2 text-slate-600">{r.draft.statut ?? '—'}</td>
                            <td className="max-w-[10rem] truncate px-3 py-2 text-xs text-slate-500">
                              {r.draft.source_prospect ?? '—'}
                            </td>
                            <td className="px-3 py-2">
                              {r.status === 'duplicate' ? (
                                <select
                                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                                  value={modes[r.draft.rowIndex] ?? 'merge_missing'}
                                  onChange={(e) =>
                                    setModes((m) => ({
                                      ...m,
                                      [r.draft.rowIndex]: e.target.value as DuplicateMode,
                                    }))
                                  }
                                >
                                  <option value="ignore">Ignorer</option>
                                  <option value="merge_missing">Ajouter infos manquantes</option>
                                  <option value="update">Mettre à jour</option>
                                </select>
                              ) : r.status === 'error' ? (
                                <span className="text-xs text-rose-600">Ignoré</span>
                              ) : (
                                <span className="text-xs text-emerald-700">Créer</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {step === 'done' ? (
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap text-sm font-medium text-emerald-800">
                    {report}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Voir les prospects
                    </button>
                    <a
                      href={LINKS.adminProspectionCampagnes}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Créer une première campagne
                    </a>
                  </div>
                </div>
              ) : null}

              {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
              {step === 'paste' ? (
                <>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    disabled={pending || !json.trim()}
                    onClick={onAnalyze}
                    className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2A6BD9] disabled:opacity-50"
                  >
                    {pending ? 'Analyse…' : 'Analyser'}
                  </button>
                </>
              ) : null}
              {step === 'preview' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setStep('paste')}
                    className="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    disabled={pending || counts.news + counts.duplicates === 0}
                    onClick={onConfirm}
                    className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2A6BD9] disabled:opacity-50"
                  >
                    {pending ? 'Création…' : 'Créer les fiches prospects'}
                  </button>
                </>
              ) : null}
              {step === 'done' ? (
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Fermer
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function StatChip({
  label,
  value,
  tone = 'slate',
}: {
  label: string;
  value: number;
  tone?: 'slate' | 'emerald' | 'amber' | 'rose';
}) {
  const map = {
    slate: 'bg-slate-100 text-slate-800',
    emerald: 'bg-emerald-50 text-emerald-800',
    amber: 'bg-amber-50 text-amber-900',
    rose: 'bg-rose-50 text-rose-800',
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[tone]}`}>
      {value} {label}
    </span>
  );
}
