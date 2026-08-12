'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Loader2, Upload } from 'lucide-react';
import { importApprenantsAction } from './actions';

interface Props {
  courses: { id: string; title: string }[];
}

const SAMPLE_CSV = `email;prenom;nom
jean.dupont@exemple.fr;Jean;Dupont
marie.martin@exemple.fr;Marie;Martin
`;

export function ImportApprenantsForm({ courses }: Props) {
  const router = useRouter();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ invited: number; skipped: number; errors: string[] } | null>(
    null
  );

  const downloadSample = () => {
    const blob = new Blob(['\ufeff' + SAMPLE_CSV], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modele-import-apprenants.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !courseId) return;
    setLoading(true);
    setResult(null);
    try {
      const text = await file.text();
      const res = await importApprenantsAction(text, courseId);
      if (!res) {
        setResult({
          invited: 0,
          skipped: 0,
          errors: ['Session expirée ou droits insuffisants. Reconnectez-vous en admin.'],
        });
        return;
      }
      setResult(res);
      if (res.invited > 0) {
        router.refresh();
      }
    } catch {
      setResult({ invited: 0, skipped: 0, errors: ['Erreur lors de l’import. Réessayez.'] });
    } finally {
      setLoading(false);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-display text-lg font-semibold text-slate-900">Importer des apprenants</h3>
        <p className="mt-2 text-sm text-amber-800">
          Aucune formation publiée. Publiez au moins une formation dans{' '}
          <a href="/admin/formations" className="font-medium underline">
            Admin → Formations
          </a>{' '}
          avant d’importer.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900">Importer des apprenants</h3>
          <p className="mt-1 text-sm text-slate-600">
            CSV Excel (séparateur <code className="rounded bg-slate-100 px-1">;</code> ou{' '}
            <code className="rounded bg-slate-100 px-1">,</code>) — colonnes{' '}
            <code className="rounded bg-slate-100 px-1">email</code>,{' '}
            <code className="rounded bg-slate-100 px-1">prenom</code>,{' '}
            <code className="rounded bg-slate-100 px-1">nom</code>. Max 50 lignes. Chaque ligne envoie un
            email d’invitation avec <strong>identifiants + mot de passe temporaire</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={downloadSample}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Download size={14} aria-hidden />
          Modèle CSV
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="import-course" className="block text-sm font-medium text-slate-700">
            Formation
          </label>
          <select
            id="import-course"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="import-csv" className="block text-sm font-medium text-slate-700">
            Fichier CSV
          </label>
          <input
            id="import-csv"
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setResult(null);
            }}
            className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-slate-700 hover:file:bg-slate-200"
          />
          {file ? (
            <p className="mt-1 text-xs text-slate-500">
              {file.name} · {(file.size / 1024).toFixed(1)} Ko
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={loading || !file || !courseId}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Upload size={18} aria-hidden />}
          {loading ? 'Import en cours…' : 'Importer et inviter'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 rounded-xl border p-4 ${
            result.invited > 0
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-slate-200 bg-slate-50'
          }`}
          role="status"
        >
          <p className="font-medium text-slate-900">
            {result.invited} invitation(s) créée(s)
            {result.skipped > 0 ? ` · ${result.skipped} déjà en attente` : ''}
          </p>
          {result.invited > 0 ? (
            <p className="mt-1 text-sm text-emerald-800">
              Chaque apprenant reçoit un email avec ses identifiants et un mot de passe temporaire.
            </p>
          ) : null}
          {result.errors.length > 0 && (
            <ul className="mt-2 max-h-40 list-inside list-disc overflow-y-auto text-sm text-amber-800">
              {result.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
