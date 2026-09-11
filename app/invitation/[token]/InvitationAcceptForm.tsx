'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { PASSWORD_MIN_LENGTH, passwordPolicyHint } from '@/lib/password-policy';
import { LINKS } from '@/lib/internal-links';

interface Props {
  token: string;
  emailHint?: string | null;
}

export function InvitationAcceptForm({ token, emailHint }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ redirectTo: string; needsLogin?: boolean } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
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

      setSuccess({
            redirectTo: data.redirectTo || '/espace-apprenant',
        needsLogin: Boolean(data.needsLogin),
      });
    } catch {
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Votre mot de passe a bien été créé.
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          {success.needsLogin
            ? 'Connectez-vous avec votre email et votre nouveau mot de passe.'
            : 'Vous pouvez accéder à votre espace de formation.'}
        </p>
        {emailHint ? (
          <p className="mt-2 text-sm text-slate-700">
            Identifiant : <strong className="break-all">{emailHint}</strong>
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {success.needsLogin ? (
            <Link
              href={LINKS.authConnexion}
              className="inline-flex justify-center rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-[#2d6ae0]"
            >
              Se connecter
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                router.push(success.redirectTo);
                router.refresh();
              }}
              className="inline-flex justify-center rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-[#2d6ae0]"
            >
              Accéder à mon espace de formation
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-display text-lg font-semibold text-slate-900">Créez votre mot de passe</h2>
      {emailHint ? (
        <p className="text-sm text-slate-600">
          Identifiant : <strong className="break-all text-slate-900">{emailHint}</strong>
        </p>
      ) : null}
      <div>
        <label className="block text-sm font-medium text-slate-700">Nouveau mot de passe *</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={PASSWORD_MIN_LENGTH}
            maxLength={128}
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pr-12 text-slate-900"
            placeholder={passwordPolicyHint()}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">{passwordPolicyHint()}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Confirmer le mot de passe *</label>
        <div className="relative mt-1">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={PASSWORD_MIN_LENGTH}
            maxLength={128}
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pr-12 text-slate-900"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            aria-label={showConfirm ? 'Masquer la confirmation' : 'Afficher la confirmation'}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#377CF3] px-4 py-3 font-semibold text-white hover:bg-[#2d6ae0] disabled:opacity-60"
      >
        {loading ? 'Création en cours…' : 'Créer mon mot de passe'}
      </button>
    </form>
  );
}
