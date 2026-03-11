'use client';

import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { importApprenantsAction } from './actions';

interface Props {
  courses: { id: string; title: string }[];
}

export function ImportApprenantsForm({ courses }: Props) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ invited: number; errors: string[] } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !courseId) return;
    setLoading(true);
    setResult(null);
    try {
      const text = await file.text();
      const res = await importApprenantsAction(text, courseId);
      setResult(res ?? { invited: 0, errors: [] });
    } catch {
      setResult({ invited: 0, errors: ['Erreur lors de l\'import'] });
    } finally {
      setLoading(false);
    }
  };

  if (courses.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-display text-lg font-semibold text-slate-900">Importer des apprenants</h3>
      <p className="mt-1 text-sm text-slate-600">
        Fichier CSV avec colonnes : <code className="rounded bg-slate-100 px-1">email</code>, <code className="rounded bg-slate-100 px-1">prenom</code>, <code className="rounded bg-slate-100 px-1">nom</code> (optionnel)
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Formation</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Fichier CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-slate-700 hover:file:bg-slate-200"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !file}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {loading ? 'Import en cours...' : 'Importer et inviter'}
        </button>
      </form>
      {result && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-medium text-slate-900">{result.invited} invitation(s) créée(s)</p>
          {result.errors.length > 0 && (
            <ul className="mt-2 text-sm text-amber-700">
              {result.errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
