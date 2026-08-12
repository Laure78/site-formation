'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PASSWORD_MIN_LENGTH, passwordPolicyHint } from '@/lib/password-policy';

interface Props {
  token: string;
}

export function InvitationAcceptForm({ token }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`);
      return;
    }
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError('Le mot de passe doit contenir au moins une lettre et un chiffre.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/invitation/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.');
        return;
      }

      if (data.needsLogin) {
        router.push('/auth/connexion');
        return;
      }

      router.push(data.redirectTo || '/espace-apprenant');
      router.refresh();
    } catch {
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Mot de passe *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={128}
          autoComplete="new-password"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
          placeholder={passwordPolicyHint()}
        />
        <p className="mt-1 text-xs text-slate-500">{passwordPolicyHint()}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Confirmer le mot de passe *</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={128}
          autoComplete="new-password"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#377CF3] px-4 py-3 font-semibold text-white hover:bg-[#2d6ae0] disabled:opacity-60"
      >
        {loading ? 'Activation…' : 'Activer mon compte'}
      </button>
    </form>
  );
}
