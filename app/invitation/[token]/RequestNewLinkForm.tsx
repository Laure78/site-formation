'use client';

import { useState } from 'react';

export function RequestNewLinkForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/invitation/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
    } finally {
      setDone(true);
      setLoading(false);
    }
  };

  if (done) {
    return (
      <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        Si un compte correspond, un email sera envoyé.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
      <h2 className="font-display text-lg font-semibold text-slate-900">Demander un nouvel accès</h2>
      <p className="mt-1 text-sm text-slate-600">
        Indiquez l’email de l’invitation. Si un compte correspond, un nouvel email avec identifiants et mot de
        passe temporaire sera envoyé. Le message de confirmation est toujours le même (sécurité).
      </p>
      <label className="mt-4 block text-sm font-medium text-slate-700">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
        placeholder="vous@exemple.fr"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-[var(--accent)] py-2.5 font-medium text-white disabled:opacity-50"
      >
        {loading ? 'Envoi…' : 'Demander un nouvel accès'}
      </button>
    </form>
  );
}
