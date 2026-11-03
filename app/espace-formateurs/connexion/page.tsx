import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import ConnexionClient from '@/app/auth/connexion/ConnexionClient';
import { userHasExtranetTrainer } from '@/lib/extranet-formateurs/access';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Connexion — espace formateurs',
  description: 'Connexion à l’extranet formateurs Laure Olivié (OFC Création d’Entreprise).',
  path: LINKS.espaceFormateursConnexion,
  robots: { index: false, follow: false },
});

export default async function EspaceFormateursConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const ok = await userHasExtranetTrainer(user.email, user.id);
    if (ok) {
      redirect(params.next ?? LINKS.espaceFormateurs);
    }
  }

  const next = params.next ?? LINKS.espaceFormateurs;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2F2]">
      <div className="flex flex-1 flex-col items-center px-4 pb-8 pt-10 sm:px-6">
        <div className="mb-6 max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">Espace formateurs</h1>
          <p className="mt-2 text-sm text-slate-600">
            Accès réservé aux intervenants invités par Laure Olivié (OFC Création d&apos;Entreprise).
          </p>
          {params.error ? (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              {params.error}
            </p>
          ) : null}
        </div>
        <Suspense
          fallback={
            <div className="w-full max-w-[440px] animate-pulse rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Chargement…
            </div>
          }
        >
          <ConnexionClient forcedNext={next} />
        </Suspense>
        <p className="mt-6 text-sm text-slate-500">
          Stagiaire ?{' '}
          <Link href={LINKS.authConnexion} className="font-medium text-[#377CF3] hover:underline">
            Espace apprenant
          </Link>
        </p>
      </div>
    </div>
  );
}
