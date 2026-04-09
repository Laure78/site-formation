import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';
import Link from 'next/link';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Accès espace admin',
  description:
    "Accès réservé administrateurs plateforme formation IA BTP. Connexion requise pour gérer cours, apprenants, contenus pédagogiques et paramètres.",
  path: '/acces-admin',
  keywords: ['administration formation'],
  robots: { index: false, follow: false },
});

export default async function AccesAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Accès à l&apos;espace admin
        </h1>
        <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-3">
            <AlertCircle size={24} className="shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-900">Vous n&apos;êtes pas connectée</p>
              <p className="mt-2 text-amber-800">
                Connectez-vous d&apos;abord avec votre compte (email et mot de passe), puis revenez sur cette page.
              </p>
              <Link
                href="/auth/connexion?next=/acces-admin"
                className="mt-4 inline-block rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const profile = await getProfile(user.id);
  const role = profile?.role ?? 'apprenant';

  if (isAdmin(role)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Accès à l&apos;espace admin
        </h1>
        <div className="mt-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
          <div className="flex gap-3">
            <CheckCircle size={24} className="shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-900">Vous avez accès à l&apos;admin</p>
              <p className="mt-2 text-emerald-800">
                Vous pouvez accéder à l&apos;espace d&apos;administration pour gérer les formations, les apprenants, etc.
              </p>
              <Link
                href="/admin"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Ouvrir l&apos;espace admin
                <ExternalLink size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Accès à l&apos;espace admin
      </h1>
      <p className="mt-2 text-slate-600">
        Connectée en tant que {user.email}
      </p>

      <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
        <div className="flex gap-3">
          <AlertCircle size={24} className="shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold text-amber-900">Accès admin non activé</p>
            <p className="mt-2 text-amber-800">
              Votre compte a le rôle « apprenant ». Pour accéder à l&apos;admin, il faut modifier votre rôle dans la base de données Supabase.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Solution : exécuter ce script SQL dans Supabase
        </h2>
        <ol className="mt-4 list-decimal space-y-3 text-slate-700">
          <li>Ouvrez <strong>Supabase</strong> (supabase.com) et connectez-vous à votre projet.</li>
          <li>Allez dans <strong>SQL Editor</strong> → <strong>New query</strong>.</li>
          <li>Copiez-collez le code ci-dessous.</li>
          <li>Remplacez <code className="rounded bg-slate-100 px-1">laureolivie@yahoo.fr</code> par votre email si besoin.</li>
          <li>Cliquez sur <strong>Run</strong>.</li>
          <li>Reconnectez-vous sur laureolivie.fr (déconnexion puis connexion).</li>
          <li>Retournez sur cette page ou allez directement sur <Link href="/admin" className="text-[var(--accent)] font-medium hover:underline">/admin</Link>.</li>
        </ol>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700">
            Code SQL à exécuter :
          </label>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
{`UPDATE public.profiles
SET role = 'admin', full_name = 'Laure Olivié', updated_at = now()
WHERE id IN (
  SELECT id FROM auth.users 
  WHERE email = 'laureolivie@yahoo.fr'
);`}
          </pre>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Si vous n&apos;avez pas accès à Supabase, demandez à la personne qui gère le projet d&apos;exécuter ce script.
        </p>
      </div>
    </div>
  );
}
