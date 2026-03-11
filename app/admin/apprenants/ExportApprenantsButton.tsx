'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { getApprenantsCsv } from './actions';

export function ExportApprenantsButton() {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const csv = await getApprenantsCsv();
      if (csv) {
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `apprenants-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
      {loading ? 'Export...' : 'Exporter (Excel)'}
    </button>
  );
}
