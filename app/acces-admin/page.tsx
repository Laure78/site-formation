import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { canAccessAdmin } from '@/lib/admin-access';
import { getProfile } from '@/lib/auth';
import Link from 'next/link';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';

export const metadata = createPageMetadata({
  title: 'Accès espace admin',
  description:
    "Accès réservé administrateurs plateforme formation IA pour le BTP. Connexion requise pour gérer cours, apprenants, contenus pédagogiques et paramètres.",
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
              <p className="font-semibold text-amber-900">Connexion requise</p>
              <p className="mt-2 text-amber-800">
                Connectez-vous avec votre compte administrateur, puis accédez à l&apos;espace de gestion.
              </p>
              <Link
                href="/auth/connexion?next=/admin"
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
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, contactez le responsable du site.
            </p>
            <p className="mt-4 text-sm text-amber-900">
              <a
                href={`mailto:${SCHEMA_CONTACT.email}`}
                className="font-medium underline hover:no-underline"
              >
                {SCHEMA_CONTACT.email}
              </a>
            </p>
            <Link
              href="/espace-apprenant"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-6 py-3 font-semibold text-amber-900 hover:bg-amber-100"
            >
              Retour à l&apos;espace apprenant
              <ExternalLink size={18} strokeWidth={1.5} />
            </Link>
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
            <Link href="/api/dev/promote-admin" className="text-[var(--accent)] font-medium hover:underline">
              /api/dev/promote-admin
            </Link>
            {' '}ou voir{' '}
            <code className="rounded bg-slate-100 px-1">docs/CONNEXION-ADMIN.md</code>.
          </p>
        </div>
      )}
    </div>
  );
}
