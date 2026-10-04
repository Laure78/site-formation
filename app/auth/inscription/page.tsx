'use client';

import Link from 'next/link';

export default function InscriptionPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-8 md:py-16">
      <h1 className="font-display text-3xl font-bold">Inscription</h1>
      <p className="mt-2 text-slate-600">Crée ton compte pour accéder aux formations</p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-700">
          Les comptes sont créés lors d&apos;un <strong>achat de formation</strong> ou sur <strong>invitation</strong> par Laure.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Vous avez déjà un compte ou une invitation ? Connectez-vous pour accéder à l&apos;espace apprenant.
        </p>
      </div>

      <Link
        href="/auth/connexion"
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-[var(--accent)] py-3 font-semibold text-white hover:bg-blue-700"
      >
        Se connecter
      </Link>

      <p className="mt-6 text-center text-sm text-slate-600">
        Une question ?{' '}
        <a href="mailto:contact@laureolivie.fr" className="font-medium text-[var(--accent)] hover:underline">
          contact@laureolivie.fr
        </a>
      </p>
    </div>
  );
}
