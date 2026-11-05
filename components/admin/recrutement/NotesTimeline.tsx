'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addRecruitmentNoteAction } from '@/app/admin/recrutement/actions';
import type { RecruitmentNoteRow } from '@/lib/recruitment/types';

export function NotesTimeline({
  candidatId,
  notes,
}: {
  candidatId: string;
  notes: RecruitmentNoteRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const body = String(fd.get('body') ?? '');
          startTransition(async () => {
            const res = await addRecruitmentNoteAction(candidatId, body);
            if (!res.ok) alert(res.error);
            else {
              e.currentTarget.reset();
              router.refresh();
            }
          });
        }}
      >
        <label className="block text-sm font-medium text-slate-800">
          Ajouter une note
          <textarea
            name="body"
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Compte-rendu d’appel, relance, observation entretien…"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {pending ? '…' : 'Ajouter'}
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-sm text-slate-500">Aucune note pour le moment.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((n) => (
            <li key={n.id} className="rounded-lg border border-slate-100 bg-[#F2F2F2]/60 px-3 py-2 text-sm">
              <p className="text-xs text-slate-500">
                {new Intl.DateTimeFormat('fr-FR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                  timeZone: 'Europe/Paris',
                }).format(new Date(n.created_at))}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-slate-800">{n.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
