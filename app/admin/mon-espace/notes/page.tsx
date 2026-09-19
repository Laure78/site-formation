import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { getNotes } from '@/lib/admin/mon-espace/queries';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { NotePlainEditor } from '@/components/admin/mon-espace/NotePlainEditor';
import { createNoteAction, deleteNoteAction } from '@/app/admin/mon-espace/actions';
import { Trash2 } from 'lucide-react';

export default async function MonEspaceNotesPage() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceNotes}`);
    }
    redirect('/espace-apprenant?admin=denied');
  }

  const supabase = await createClient();
  const notes = await getNotes(supabase, access.userId);

  return (
    <div className="p-4 md:p-8">
      <p className="text-sm text-slate-500">Mon espace · personnel</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">Notes</h1>
      <p className="mt-2 text-slate-600">Texte normal, privé à votre compte.</p>

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceNotes} />

      <form
        action={createNoteAction}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-4"
      >
        <label className="min-w-[12rem] flex-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Nouvelle note
          <input
            type="text"
            name="title"
            placeholder="Titre"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Créer
        </button>
      </form>

      <div className="mt-6 space-y-6">
        {notes.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune note pour le moment.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="relative">
              <NotePlainEditor note={note} />
              {!note.pinned ? (
                <form action={deleteNoteAction} className="absolute right-4 top-4">
                  <input type="hidden" name="id" value={note.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 shadow-sm hover:text-rose-600"
                    aria-label="Supprimer la note"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </form>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
