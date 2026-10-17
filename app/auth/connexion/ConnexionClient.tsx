'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams, unstable_rethrow } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { loginWithPassword } from './actions';

/** Détecte une intention admin depuis ?next= (sans importer le module serveur admin-access). */
function isAdminNextPath(next: string | null | undefined): boolean {
  if (!next) return false;
  const pathname = next.split('?')[0] ?? next;
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

const inputClassName =
  'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/25 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70';

type ConnexionClientProps = {
  /** Forcer la destination post-login (ex. page /acces-admin). */
  forcedNext?: string;
  /** Affiche le libellé / UX « administrateur » même sans ?next=. */
  adminMode?: boolean;
};

export default function ConnexionClient({
  forcedNext,
  adminMode = false,
}: ConnexionClientProps) {
  const searchParams = useSearchParams();
  const nextParam = forcedNext ?? searchParams.get('next');
  const isAdminLogin = adminMode || isAdminNextPath(nextParam);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const urlError = useMemo(() => {
    if (searchParams.get('error') === 'auth') {
      if (searchParams.get('reason') === 'recovery') {
        return 'Lien de réinitialisation invalide ou expiré. Redemandez un lien et ouvrez-le dans le même navigateur.';
      }
      return 'Lien de connexion invalide ou expiré. Utilisez « Mot de passe oublié ? » pour en recevoir un nouveau.';
    }
    return null;
  }, [searchParams]);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [resetLoading, setResetLoading] = useState(false);
  const displayError = error ?? urlError;
  const resetOk = searchParams.get('reset') === 'ok';
  const loading = isPending || resetLoading;

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Indiquez votre adresse e-mail, puis cliquez sur « Mot de passe oublié ? ».');
      return;
    }
    setError(null);
    setResetLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (err) throw err;
      setResetSent(true);
    } catch {
      setResetSent(true);
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const result = await loginWithPassword(email, password, nextParam);
        if (result?.error) setError(result.error);
      } catch (err) {
        unstable_rethrow(err);
        setError('Connexion impossible. Réessayez dans quelques secondes.');
      }
    });
  };

  if (resetSent) {
    return (
      <div className="w-full max-w-[440px] rounded-xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-8">
        <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          E-mail envoyé
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Si un compte existe pour cette adresse, vous recevrez un lien pour réinitialiser votre mot
          de passe.
        </p>
        <button
          type="button"
          onClick={() => setResetSent(false)}
          className="mt-6 text-sm font-medium text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] rounded-xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-8">
      <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {isAdminLogin ? 'Connexion administrateur' : 'Votre espace apprenant'}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {isAdminLogin
          ? 'Accès réservé aux formateurs et administrateurs de la plateforme.'
          : 'Retrouvez vos supports et ressources de formation.'}
      </p>

      {resetOk ? (
        <p
          className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900"
          role="status"
        >
          Mot de passe mis à jour. Vous pouvez vous connecter.
        </p>
      ) : null}

      {displayError ? (
        <p
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          role="alert"
        >
          {displayError}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-800">
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className={inputClassName}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-800">
              Mot de passe
            </label>
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="shrink-0 text-sm font-medium text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] disabled:opacity-50"
            >
              Mot de passe oublié ?
            </button>
          </div>
          <div className="relative mt-1.5">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={`${inputClassName} mt-0 pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={loading}
              className="absolute right-2 top-1/2 flex min-h-10 min-w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] disabled:opacity-50"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.75} aria-hidden />
              ) : (
                <Eye size={18} strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-[#377CF3] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2A6BD9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Connexion…' : isAdminLogin ? 'Accéder à l’admin' : 'Se connecter'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Besoin d&apos;aide ?{' '}
        <a
          href={`mailto:${CONTACT.email}`}
          className="font-medium text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Contactez-nous
        </a>
      </p>

      {isAdminLogin ? (
        <p className="mt-4 text-center text-sm text-slate-500">
          Stagiaire ?{' '}
          <Link
            href={LINKS.authConnexion}
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            Connexion espace apprenant
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-center text-xs text-slate-500">
          <Link
            href={LINKS.accesAdmin}
            className="font-medium text-slate-600 underline-offset-2 hover:text-[#377CF3] hover:underline"
          >
            Accès formateur / administrateur
          </Link>
        </p>
      )}
    </div>
  );
}
