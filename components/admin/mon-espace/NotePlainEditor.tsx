'use client';

import { useTransition } from 'react';
import { updateNoteAction } from '@/app/admin/mon-espace/actions';
import type { WorkspaceNote } from '@/lib/admin/mon-espace/types';

export function NotePlainEditor({ note }: { note: WorkspaceNote }) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      action={(formData) => {
        startTransition(async () => {
          await updateNoteAction(formData);
        });
      }}
    >
      <input type="hidden" name="id" value={note.id} />
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
        Titre
        <input
          type="text"
          name="title"
          defaultValue={note.title}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-display text-lg font-semibold text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </label>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        Texte
        <textarea
          name="body"
          defaultValue={note.body}
          rows={10}
          placeholder="Notes en texte normal…"
          className="mt-1 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </label>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Dernière mise à jour :{' '}
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
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
