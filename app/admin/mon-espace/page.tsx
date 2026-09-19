import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import {
  getAgendaBoard,
  getFavorites,
  getOrCreatePrimaryNote,
} from '@/lib/admin/mon-espace/queries';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { AgendaColumnCard } from '@/components/admin/mon-espace/AgendaColumnCard';
import { NotePlainEditor } from '@/components/admin/mon-espace/NotePlainEditor';

export default async function MonEspaceAgendaPage() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspace}`);
    }
    redirect('/espace-apprenant?admin=denied');
  }

  const supabase = await createClient();
  const [board, note, favorites] = await Promise.all([
    getAgendaBoard(supabase, access.userId),
    getOrCreatePrimaryNote(supabase, access.userId),
    getFavorites(supabase, access.userId),
  ]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Mon espace · personnel</p>
          <h1 className="mt-1 flex items-center gap-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            <CalendarDays className="text-[var(--accent)]" size={28} strokeWidth={1.75} />
            Agenda
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Votre planning personnel : notes, mois et semaine. Visible uniquement par vous.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
          <p className="font-medium text-slate-800">{board.weekLabel}</p>
          <p className="mt-0.5 text-slate-500">
            {board.openTaskCount} tâche{board.openTaskCount === 1 ? '' : 's'} ouverte
            {board.openTaskCount === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <MonEspaceSubnav pathname={LINKS.adminMonEspace} />

      {/* Agenda en haut */}
      <section className="mt-8" aria-labelledby="agenda-mois">
        <h2 id="agenda-mois" className="font-display text-lg font-semibold text-slate-900">
          Mois
        </h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {board.monthColumns.map((column) => (
            <AgendaColumnCard key={column.id} column={column} />
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="agenda-semaine">
        <h2 id="agenda-semaine" className="font-display text-lg font-semibold text-slate-900">
          Semaine
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {board.weekColumns.map((column) => (
            <AgendaColumnCard key={column.id} column={column} />
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="agenda-notes">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id="agenda-notes" className="font-display text-lg font-semibold text-slate-900">
            Notes
          </h2>
          <Link
            href={LINKS.adminMonEspaceNotes}
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Toutes les notes
          </Link>
        </div>
        <NotePlainEditor note={note} />
      </section>

      {favorites.length > 0 ? (
        <section className="mt-10" aria-labelledby="agenda-favoris">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="agenda-favoris" className="font-display text-lg font-semibold text-slate-900">
              Favoris
            </h2>
            <Link
              href={LINKS.adminMonEspaceFavoris}
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Gérer
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2">
            {favorites.slice(0, 8).map((fav) => (
              <li key={fav.id}>
                <Link
                  href={fav.href}
                  className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {fav.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
