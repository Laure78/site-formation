'use client';

import { useState } from 'react';

export function SatisfactionFormationCompleteForm({ token }: { token: string }) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/satisfaction/formation/${token}/complete`, {
        method: 'POST',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Erreur');
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
        Réponse enregistrée — merci !
      </p>
    );
  }

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <p className="text-sm text-slate-600">
        Après avoir envoyé le questionnaire Tally, confirmez ici pour clôturer les relances automatiques.
      </p>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={() => void submit()}
        className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-60"
      >
        {pending ? 'Enregistrement…' : 'J’ai répondu au questionnaire'}
      </button>
    </div>
  );
}
