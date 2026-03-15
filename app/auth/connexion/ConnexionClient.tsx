'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ConnexionClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Entrez votre email puis cliquez sur « Mot de passe oublié »');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` });
      if (err) throw err;
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      router.push('/espace-apprenant');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className="mx-auto max-w-md px-4 py-8 md:py-16">
        <h1 className="font-display text-3xl font-bold">Email envoyé</h1>
        <p className="mt-4 text-slate-600">Vérifiez votre boîte mail pour réinitialiser votre mot de passe.</p>
        <Link href="/auth/connexion" className="mt-6 inline-block font-medium text-[var(--accent)] hover:underline">Retour à la connexion</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8 md:py-16">
      <h1 className="font-display text-3xl font-bold">Connexion</h1>
      <p className="mt-2 text-slate-600">Accède à ton espace apprenant</p>

      {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <button type="button" onClick={handleResetPassword} className="mt-1 text-sm text-[var(--accent)] hover:underline">Mot de passe oublié ?</button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Pas encore de compte ?{' '}
        <Link href="/auth/inscription" className="font-medium text-[var(--accent)] hover:underline">S&apos;inscrire</Link>
      </p>
    </div>
  );
}
