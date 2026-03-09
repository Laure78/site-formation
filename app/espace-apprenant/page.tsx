import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, Award } from 'lucide-react';

export default async function EspaceApprenantPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/connexion');
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Espace apprenant</h1>
      <p className="mt-2 text-slate-600">Bienvenue, {user.email}</p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <BookOpen size={24} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-xl font-semibold">Mes formations</h2>
          </div>
          <p className="mt-4 text-slate-600">
            Accède à tes formations en cours et continue là où tu t&apos;es arrêté.
          </p>
          <Link
            href="/formations"
            className="mt-4 inline-block font-medium text-[var(--accent)] hover:underline"
          >
            Voir le catalogue →
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Award size={24} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-xl font-semibold">Ma progression</h2>
          </div>
          <p className="mt-4 text-slate-600">
            Suivi de tes modules validés, quiz réussis et certificats.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            (À connecter avec les données Supabase)
          </p>
        </div>
      </div>

      <form action="/auth/deconnexion" method="post" className="mt-12">
        <button
          type="submit"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}
