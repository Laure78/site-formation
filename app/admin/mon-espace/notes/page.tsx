import { StickyNote } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import {
  getNotesFiltered,
  searchNotesAndResources,
} from '@/lib/admin/mon-espace/notes-ressources';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { NotePlainEditor } from '@/components/admin/mon-espace/NotePlainEditor';
import {
  CrossSearchResults,
  OrganisationSearchBar,
} from '@/components/admin/mon-espace/OrganisationSearchBar';
import { createNoteAction } from '@/app/admin/mon-espace/actions';

export default async function OrganisationNotesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; favoris?: string }>;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceNotes}`);
    }
    redirect('/admin?organisation=denied');
  }

  const params = await searchParams;
  const query = (params.q ?? '').trim();
  const favoritesOnly = params.favoris === '1';

  const supabase = await createClient();
  const notes = await getNotesFiltered(supabase, access.userId, {
    query,
    favoritesOnly,
  });

  let cross = { query: '', notes: [] as typeof notes, resources: [] as Awaited<ReturnType<typeof searchNotesAndResources>>['resources'] };
  if (query) {
    try {
      cross = await searchNotesAndResources(supabase, access.userId, query);
    } catch {
      /* table ressources absente : ignore le croisement */
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="max-w-3xl">
        <p className="text-sm text-slate-500">Organisation · admin uniquement</p>
        <h1 className="mt-1 flex items-center gap-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">
          <StickyNote className="text-[var(--accent)]" size={28} strokeWidth={1.75} />
          Notes
        </h1>
        <p className="mt-2 text-slate-600">
          Notes internes admin : création, édition, suppression, favoris et recherche.
          Éditeur texte simple — données privées à votre compte.
        </p>
      </div>

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceNotes} />

      <div className="mt-6 max-w-3xl space-y-4">
        <OrganisationSearchBar
          basePath={LINKS.adminMonEspaceNotes}
          query={query}
          preserve={{ favoris: favoritesOnly ? '1' : undefined }}
        />

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={
              favoritesOnly
                ? query
                  ? `${LINKS.adminMonEspaceNotes}?q=${encodeURIComponent(query)}`
                  : LINKS.adminMonEspaceNotes
                : `${LINKS.adminMonEspaceNotes}?favoris=1${query ? `&q=${encodeURIComponent(query)}` : ''}`
            }
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              favoritesOnly
                ? 'bg-amber-100 text-amber-900'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-amber-300'
            }`}
          >
            Favoris uniquement
          </a>
        </div>

        {query ? (
          <CrossSearchResults
            query={cross.query || query}
            notes={cross.notes}
            resources={cross.resources}
            current="notes"
          />
        ) : null}

        <form
          action={createNoteAction}
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-dashed border-slate-300 bg-white p-4"
        >
          <label className="min-w-[12rem] flex-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Nouvelle note
            <input
              type="text"
              name="title"
              placeholder="Titre"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Créer
          </button>
        </form>

        <div className="space-y-4">
          {notes.length === 0 ? (
            <p className="text-sm text-slate-500">
              {query || favoritesOnly
                ? 'Aucune note ne correspond.'
                : 'Aucune note pour le moment.'}
            </p>
          ) : (
            notes.map((note) => <NotePlainEditor key={note.id} note={note} />)
          )}
        </div>
      </div>
    </div>
  );
}
