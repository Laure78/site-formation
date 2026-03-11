'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProspectNoteAction } from '@/app/actions/prospects';

export function AddNoteForm({ prospectId }: { prospectId: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    const ok = await addProspectNoteAction(prospectId, {
      type_note: (fd.get('type_note') as string) || 'note',
      contenu: (fd.get('contenu') as string)?.trim() || '',
    });
    setSubmitting(false);
    if (ok) {
      (e.target as HTMLFormElement).reset();
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <select
        name="type_note"
        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
      >
        <option value="note">Note</option>
        <option value="cr_rdv">Compte rendu RDV</option>
        <option value="action_suivante">Action suivante</option>
      </select>
      <textarea
        name="contenu"
        rows={3}
        required
        placeholder="Ajouter une note..."
        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? 'Envoi...' : 'Ajouter'}
      </button>
    </form>
  );
}
