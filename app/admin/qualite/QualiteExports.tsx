'use client';

import { useState } from 'react';
import { FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { getProgressionCsv, getSatisfactionCsv, getEmargementCsv } from './actions';

const exports = [
  { id: 'progression', label: 'Taux de complétion', desc: 'Export CSV des apprenants et leur progression', icon: FileSpreadsheet, action: getProgressionCsv, filename: 'progression-qualiopi.csv' },
  { id: 'satisfaction', label: 'Évaluations satisfaction', desc: 'Export CSV des questionnaires de fin de formation', icon: FileSpreadsheet, action: getSatisfactionCsv, filename: 'satisfaction-qualiopi.csv' },
  { id: 'emargement', label: 'Feuilles d\'émargement', desc: 'Export CSV des signatures de présence', icon: FileText, action: getEmargementCsv, filename: 'emargement-qualiopi.csv' },
];

export function QualiteExports() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleExport(id: string, action: () => Promise<string | null>, filename: string) {
    setLoading(id);
    try {
      const csv = await action();
      if (csv) {
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exports.map(({ id, label, desc, icon: Icon, action, filename }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleExport(id, action, filename)}
          disabled={loading !== null}
          className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:opacity-70"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            {loading === id ? (
              <Loader2 size={24} strokeWidth={1.5} className="animate-spin" />
            ) : (
              <Icon size={24} strokeWidth={1.5} />
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{label}</p>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
