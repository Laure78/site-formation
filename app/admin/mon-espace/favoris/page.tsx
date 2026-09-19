import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { getFavorites } from '@/lib/admin/mon-espace/queries';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { addFavoriteAction, deleteFavoriteAction } from '@/app/admin/mon-espace/actions';
import { Trash2 } from 'lucide-react';

const SUGGESTIONS = [
  { label: 'Dashboard admin', href: '/admin' },
  { label: 'Apprenants', href: '/admin/apprenants' },
  { label: 'Formations', href: '/admin/formations' },
  { label: 'Disponibilités', href: '/admin/disponibilites' },
  { label: 'Qualiopi / Qualité', href: '/admin/qualite' },
  { label: 'Catalogue public', href: LINKS.formations },
] as const;

export default async function MonEspaceFavorisPage() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceFavoris}`);
    }
    redirect('/espace-apprenant?admin=denied');
  }

  const supabase = await createClient();
  const favorites = await getFavorites(supabase, access.userId);

  return (
    <div className="p-4 md:p-8">
      <p className="text-sm text-slate-500">Mon espace · personnel</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">Favoris</h1>
      <p className="mt-2 text-slate-600">
        Raccourcis vers des pages internes de la plateforme (liens commençant par /).
      </p>

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceFavoris} />

      <form
        action={addFavoriteAction}
        className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]"
      >
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Libellé
          <input
            type="text"
            name="label"
            required
            placeholder="Ex. Apprenants"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Chemin
          <input
            type="text"
            name="href"
            required
            placeholder="/admin/…"
            pattern="/.*"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 sm:w-auto"
          >
            Ajouter
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-slate-400">Suggestions :</span>
        {SUGGESTIONS.map((s) => (
          <form key={s.href} action={addFavoriteAction}>
            <input type="hidden" name="label" value={s.label} />
            <input type="hidden" name="href" value={s.href} />
            <button
              type="submit"
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              + {s.label}
            </button>
          </form>
        ))}
      </div>

      <ul className="mt-8 space-y-2">
        {favorites.length === 0 ? (
          <li className="text-sm text-slate-500">Aucun favori pour le moment.</li>
        ) : (
          favorites.map((fav) => (
            <li
              key={fav.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="min-w-0">
                <Link
                  href={fav.href}
                  className="font-medium text-slate-900 hover:text-[var(--accent)]"
                >
                  {fav.label}
                </Link>
                <p className="truncate text-xs text-slate-400">{fav.href}</p>
              </div>
              <form action={deleteFavoriteAction}>
                <input type="hidden" name="id" value={fav.id} />
                <button
                  type="submit"
                  className="rounded p-2 text-slate-400 hover:text-rose-600"
                  aria-label="Supprimer le favori"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
