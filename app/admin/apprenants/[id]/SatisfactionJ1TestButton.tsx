'use client';

import { useState } from 'react';

type Props = {
  enrollmentId: string;
};

/** Envoie l’email de test à l’admin connecté — ne change pas le statut de relance. */
export function SatisfactionJ1TestButton({ enrollmentId }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/satisfaction-j1/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || 'Échec d’envoi');
        return;
      }
      setMessage(data.message || 'Email de test envoyé');
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
      >
        {loading ? 'Envoi…' : 'Envoyer un email de test'}
      </button>
      {message ? <p className="mt-1 text-xs text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-1 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
