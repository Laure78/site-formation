'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { PASSWORD_MIN_LENGTH, passwordPolicyHint } from '@/lib/password-policy';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    (async () => {
      try {
        // PKCE : le code arrive parfois sur cette page (redirectTo direct).
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          url.searchParams.delete('code');
          window.history.replaceState({}, '', url.pathname + url.search);
          if (exchangeError) {
            if (!cancelled) {
              setError(
                'Lien expiré, déjà utilisé, ou ouvert dans un autre navigateur. Redemandez un lien « Mot de passe oublié » et ouvrez-le dans le même navigateur.'
              );
              setSessionReady(false);
              setChecking(false);
            }
            return;
          }
        }

        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        if (!data.session) {
          setError(
            'Lien de réinitialisation invalide ou expiré. Demandez un nouveau lien depuis la connexion.'
          );
          setSessionReady(false);
        } else {
          setSessionReady(true);
        }
      } catch {
        if (!cancelled) {
          setError('Impossible de valider le lien. Demandez un nouveau lien « Mot de passe oublié ».');
          setSessionReady(false);
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères`);
      return;
    }
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError('Le mot de passe doit contenir au moins une lettre et un chiffre.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      await supabase.auth.signOut();
      window.location.assign('/auth/connexion?reset=ok');
      return;
    } catch {
      setError('Impossible d’enregistrer le mot de passe. Le lien a peut-être expiré.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Nouveau mot de passe</h1>
      <p className="mt-2 text-slate-600">Choisissez un mot de passe sécurisé ({passwordPolicyHint()})</p>

      {checking ? (
        <p className="mt-8 text-slate-500">Vérification du lien…</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={PASSWORD_MIN_LENGTH}
              disabled={!sessionReady}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 disabled:bg-slate-100"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">
              Confirmer
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              disabled={!sessionReady}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 disabled:bg-slate-100"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !sessionReady}
            className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/auth/connexion" className="font-medium text-[var(--accent)] hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
