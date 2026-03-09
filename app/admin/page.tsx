import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/connexion');
  }

  // TODO: Vérifier le rôle admin/formateur via une table profiles
  // Pour l'instant, tout utilisateur connecté peut accéder

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Espace formateur / Admin</h1>
      <p className="mt-2 text-slate-600">Gère tes formations et ton contenu</p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/cours/nouveau"
          className="group flex flex-col rounded-2xl border-2 border-dashed border-slate-300 p-8 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]">
            <Plus size={28} strokeWidth={1.5} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-slate-900">
            Créer une formation
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Ajoute un nouveau cours avec modules, leçons (vidéos, PDF, quiz).
          </p>
        </Link>

        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <BookOpen size={28} strokeWidth={1.5} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-slate-900">
            Mes formations
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Liste des cours créés, édition, publication.
          </p>
          <p className="mt-4 text-xs text-slate-500">(À connecter Supabase)</p>
        </div>
      </div>
    </div>
  );
}
