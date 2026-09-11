'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { sanitizeInternalPath } from '@/lib/admin-access';

/**
 * Confirmation email (recovery / signup) via token_hash — sans PKCE.
 * Bouton manuel : évite qu’un scan Yahoo/Outlook consomme le lien tout seul.
 */
function ConfirmContent() {
  const searchParams = useSearchParams();
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const nextRaw = searchParams.get('next');
  const nextPath = sanitizeInternalPath(nextRaw) ?? '/auth/reset-password';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!tokenHash || !type) {
      setError('Lien incomplet ou invalide. Demandez un nouveau lien depuis la page de connexion.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
      if (err) throw err;
      window.location.assign(nextPath);
    } catch {
      setError(
        'Lien expiré ou déjà utilisé. Demandez un nouveau lien « Mot de passe oublié » (ouvrez-le dans le même navigateur).'
      );
      setLoading(false);
    }
  };

  if (!tokenHash || !type) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-bold">Lien invalide</h1>
        <p className="mt-4 text-slate-600">
          Ce lien de confirmation est incomplet. Demandez un nouveau lien depuis la page de connexion.
        </p>
        <p className="mt-6">
          <Link href="/auth/connexion" className="font-medium text-[var(--accent)] hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Confirmer la réinitialisation</h1>
      <p className="mt-4 text-slate-600">
        Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. Cette étape protège le lien
        contre les scans automatiques de boîtes mail (Yahoo, Outlook…).
      </p>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Vérification…' : 'Continuer'}
      </button>
      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/auth/connexion" className="font-medium text-[var(--accent)] hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16">
          <p className="text-slate-500">Chargement…</p>
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
