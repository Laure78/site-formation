'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteRecruitmentCandidatAction } from '@/app/admin/recrutement/actions';
import { LINKS } from '@/lib/internal-links';

export function DeleteCandidatDialog({
  candidatId,
  candidatLabel,
}: {
  candidatId: string;
  candidatLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Supprimer le candidat
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-candidat-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="delete-candidat-title" className="font-display text-lg font-bold text-slate-900">
              Supprimer ce candidat ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {candidatLabel} — suppression définitive (données, notes et grilles). Action conforme RGPD
              sur demande.
            </p>
            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  startTransition(async () => {
                    const res = await deleteRecruitmentCandidatAction(candidatId);
                    if (!res.ok) {
                      setError(res.error);
                      return;
                    }
                    setOpen(false);
                    router.push(LINKS.adminRecrutementCandidats);
                    router.refresh();
                  });
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {pending ? 'Suppression…' : 'Confirmer la suppression'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
