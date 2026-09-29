'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';

/** Inscrit laureolivie@yahoo.fr sur toutes les formations LMS existantes. */
export function EnrollLaureAllButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/enroll-laure-all', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Erreur d’inscription');
        return;
      }
      setMessage(data.message || `Inscrite sur ${data.enrolled} formation(s).`);
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
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-50"
      >
        <UserPlus size={18} strokeWidth={1.5} />
        {loading ? 'Inscription…' : 'M’inscrire à toutes les formations'}
      </button>
      {message && <p className="max-w-xs text-xs text-slate-600 sm:text-right">{message}</p>}
    </div>
  );
}
