'use client';

import { useTransition } from 'react';
import { Star, Trash2 } from 'lucide-react';
import {
  deleteNoteAction,
  toggleNoteFavoriteAction,
  updateNoteAction,
} from '@/app/admin/mon-espace/actions';
import type { WorkspaceNote } from '@/lib/admin/mon-espace/types';

export function NotePlainEditor({ note }: { note: WorkspaceNote }) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"
      action={(formData) => {
        startTransition(async () => {
          await updateNoteAction(formData);
        });
      }}
    >
      <input type="hidden" name="id" value={note.id} />
      <div className="flex items-start justify-between gap-2">
        <label className="block min-w-0 flex-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Titre
          <input
            type="text"
            name="title"
            defaultValue={note.title}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-display text-lg font-semibold text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </label>
        <div className="flex shrink-0 gap-1 pt-5">
          <button
            type="button"
            title={note.pinned ? 'Retirer des favoris' : 'Mettre en favori'}
            className={`rounded-lg border p-2 ${
              note.pinned
                ? 'border-amber-200 bg-amber-50 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:text-amber-500'
            }`}
            onClick={() => {
              const fd = new FormData();
              fd.set('id', note.id);
              fd.set('pinned', String(note.pinned));
              startTransition(async () => {
                await toggleNoteFavoriteAction(fd);
              });
            }}
          >
            <Star
              size={16}
              className={note.pinned ? 'fill-current' : undefined}
              aria-hidden
            />
            <span className="sr-only">Favori</span>
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600"
            aria-label="Supprimer la note"
            onClick={() => {
              if (!confirm('Supprimer cette note ?')) return;
              const fd = new FormData();
              fd.set('id', note.id);
              startTransition(async () => {
                await deleteNoteAction(fd);
              });
            }}
          >
            <Trash2 size={16} aria-hidden />
          </button>
        </div>
      </div>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        Texte
        <textarea
          name="body"
          defaultValue={note.body}
          rows={10}
          placeholder="Notes en texte simple…"
          className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-3 py-2 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </label>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          {note.pinned ? 'Favori · ' : ''}
          Maj.{' '}
          {new Date(note.updated_at).toLocaleString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
