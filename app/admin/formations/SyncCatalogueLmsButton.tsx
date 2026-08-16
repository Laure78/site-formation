'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export function SyncCatalogueLmsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/sync-catalogue-lms', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Erreur de synchronisation');
        return;
      }
      setMessage(
        `Catalogue synchronisé : ${data.created} créée(s), ${data.updated} mise(s) à jour` +
          (data.errors?.length ? ` — ${data.errors.length} erreur(s)` : ''),
      );
      router.refresh();
    } catch {
      setMessage('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        type="button"
        onClick={handleSync}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-50"
      >
        <RefreshCw size={18} strokeWidth={1.5} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Synchronisation…' : 'Sync catalogue /formations → LMS'}
      </button>
      {message && <p className="text-xs text-slate-600 sm:text-right">{message}</p>}
    </div>
  );
}
