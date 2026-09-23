import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { canAccessAdmin, getProfileForAccessCheck } from '@/lib/admin-access';
import Link from 'next/link';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import ConnexionClient from '@/app/auth/connexion/ConnexionClient';

export const metadata = createPageMetadata({
  title: 'Accès espace admin',
  description:
    "Accès réservé administrateurs plateforme formation IA pour le BTP. Connexion requise pour gérer cours, apprenants, contenus pédagogiques et paramètres.",
  path: LINKS.accesAdmin,
  keywords: ['administration formation'],
  robots: { index: false, follow: false },
});

export default async function AccesAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAFC]">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <section
            aria-labelledby="acces-admin-title"
            className="flex flex-col justify-center px-6 py-12 md:px-10 lg:px-14"
          >
            <h1
              id="acces-admin-title"
              className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              Accès administrateur
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Connectez-vous avec votre compte formateur ou administrateur pour gérer les
              formations, les apprenants et le suivi Qualiopi.
            </p>
            <p className="mt-6 text-sm text-slate-500">
              Stagiaire ?{' '}
              <Link href={LINKS.authConnexion} className="font-medium text-[#377CF3] hover:underline">
                Connexion espace apprenant
              </Link>
            </p>
          </section>

          <section
            aria-label="Formulaire de connexion administrateur"
            className="flex items-center justify-center border-t border-slate-200 bg-white px-6 py-12 md:px-10 lg:border-l lg:border-t-0 lg:px-14"
          >
            <div className="w-full max-w-md">
              <Suspense
                fallback={
                  <div className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-500">
                    Chargement…
                  </div>
                }
              >
                <ConnexionClient forcedNext="/admin" adminMode />
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const profile = await getProfileForAccessCheck(user.id);

  if (canAccessAdmin(profile, user.email)) {
    redirect('/admin');
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Accès à l&apos;espace admin
      </h1>

      <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
        <div className="flex gap-3">
          <AlertCircle size={24} className="shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold text-amber-900">Accès non autorisé</p>
            <p className="mt-2 text-amber-800">
              Ce compte n&apos;a pas les droits d&apos;administration sur cette plateforme.
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, contactez le responsable
              du site.
            </p>
            <p className="mt-4 text-sm text-amber-900">
              Compte connecté :{' '}
              <strong className="font-semibold">{user.email ?? 'email inconnu'}</strong>
              {' · '}
              rôle :{' '}
              <strong className="font-semibold">{profile?.role ?? 'profil introuvable'}</strong>
            </p>
            <p className="mt-2 text-sm text-amber-900">
              L&apos;espace admin exige le rôle <strong>admin</strong> (ou formateur) en base.
              Compte autorisé : <strong>contact@laureolivie.fr</strong>
              {''} (ou <strong>laureolivie@yahoo.fr</strong> pour le compte historique) — après promotion du rôle dans Supabase.
            </p>
            <p className="mt-2 text-sm text-amber-900">
              Support :{' '}
              <a
                href={`mailto:${SCHEMA_CONTACT.email}`}
                className="font-medium underline hover:no-underline"
              >
                {SCHEMA_CONTACT.email}
              </a>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/auth/deconnexion?next=${LINKS.accesAdmin}`}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
              >
                Se déconnecter et réessayer
              </Link>
              <Link
                href="/espace-apprenant"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-6 py-3 font-semibold text-amber-900 hover:bg-amber-100"
              >
                Retour à l&apos;espace apprenant
                <ExternalLink size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Mode développement — promotion admin
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            En local uniquement :{' '}
            <Link
              href="/api/dev/promote-admin"
              className="text-[var(--accent)] font-medium hover:underline"
            >
              /api/dev/promote-admin
            </Link>{' '}
            ou voir <code className="rounded bg-slate-100 px-1">docs/CONNEXION-ADMIN.md</code>.
          </p>
        </div>
      )}
    </div>
  );
}
