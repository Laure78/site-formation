import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { getAllTasks, getBacklogTasks } from '@/lib/admin/mon-espace/queries';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import {
  addTaskAction,
  deleteTaskAction,
  toggleTaskAction,
  toggleTaskEmphasisAction,
} from '@/app/admin/mon-espace/actions';
import { Trash2 } from 'lucide-react';

export default async function MonEspaceTachesPage() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceTaches}`);
    }
    redirect('/espace-apprenant?admin=denied');
  }

  const supabase = await createClient();
  const [backlog, all] = await Promise.all([
    getBacklogTasks(supabase, access.userId),
    getAllTasks(supabase, access.userId),
  ]);

  const open = all.filter((t) => !t.done);
  const done = all.filter((t) => t.done);

  return (
    <div className="p-4 md:p-8">
      <p className="text-sm text-slate-500">Mon espace · personnel</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">Tâches</h1>
      <p className="mt-2 text-slate-600">
        Liste globale et backlog (hors colonnes d&apos;agenda).
      </p>

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceTaches} />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ouvertes</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">{open.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Terminées</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">{done.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Backlog</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">{backlog.length}</p>
        </div>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-slate-900">Backlog</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tâches sans colonne agenda — à planifier plus tard.
        </p>

        <form action={addTaskAction} className="mt-4 flex gap-2">
          <input
            type="text"
            name="title"
            required
            placeholder="Nouvelle tâche…"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
          <button
            type="submit"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Ajouter
          </button>
        </form>

        <ul className="mt-4 space-y-2">
          {backlog.length === 0 ? (
            <li className="text-sm text-slate-500">Backlog vide.</li>
          ) : (
            backlog.map((task) => (
              <li
                key={task.id}
                className="flex items-start gap-2 rounded-lg border border-slate-100 px-3 py-2"
              >
                <form action={toggleTaskAction} className="pt-0.5">
                  <input type="hidden" name="id" value={task.id} />
                  <input type="hidden" name="done" value={String(task.done)} />
                  <button
                    type="submit"
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      task.done
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                    aria-label={task.done ? 'Marquer non fait' : 'Marquer fait'}
                  >
                    {task.done ? <span className="text-[10px]">✓</span> : null}
                  </button>
                </form>
                <form action={toggleTaskEmphasisAction} className="min-w-0 flex-1">
                  <input type="hidden" name="id" value={task.id} />
                  <input type="hidden" name="emphasis" value={String(task.emphasis)} />
                  <button
                    type="submit"
                    className={`w-full text-left text-sm ${
                      task.done
                        ? 'text-slate-400 line-through'
                        : task.emphasis
                          ? 'font-medium text-rose-600'
                          : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </button>
                </form>
                <form action={deleteTaskAction}>
                  <input type="hidden" name="id" value={task.id} />
                  <button
                    type="submit"
                    className="rounded p-1 text-slate-400 hover:text-rose-600"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
              </li>
            ))
          )}
        </ul>
      </section>

      <p className="mt-6 text-sm text-slate-500">
        Les tâches planifiées se gèrent aussi dans l&apos;{' '}
        <Link href={LINKS.adminMonEspace} className="font-medium text-[var(--accent)] hover:underline">
          Agenda
        </Link>
        .
      </p>
    </div>
  );
}
