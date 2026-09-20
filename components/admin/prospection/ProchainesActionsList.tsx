'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  markRelanceDoneAction,
  postponeRelanceAction,
} from '@/app/admin/prospection/actions';
import { LINKS } from '@/lib/internal-links';
import { typeStructureLabel } from '@/lib/prospection/constants';
import type { NextActionItem } from '@/lib/prospection/queries';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';
import { QuickEmailModal } from '@/components/admin/prospection/QuickEmailModal';

export function ProchainesActionsList({ items }: { items: NextActionItem[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [emailFor, setEmailFor] = useState<NextActionItem | null>(null);
  const [relancePrompt, setRelancePrompt] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Aucune action prioritaire. Ajoutez des prospects ou planifiez des relances.
      </p>
    );
  }

  return (
    <>
      <ul className="divide-y divide-slate-100">
        {items.map((p) => {
          const isLate =
            p.prochaine_relance_at &&
            new Date(p.prochaine_relance_at) <
              new Date(new Date().setHours(0, 0, 0, 0));
          return (
            <li
              key={p.id}
              className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900">
                  {p.prenom} {p.nom}
                  {isLate ? (
                    <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                      En retard
                    </span>
                  ) : null}
                </p>
                <p className="text-sm text-slate-600">
                  {[p.entreprise, typeStructureLabel(p.type_structure)]
                    .filter((x) => x && x !== '—')
                    .join(' · ')}
                </p>
                <p className="mt-0.5 text-sm text-slate-500">{p.actionLabel}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <StatutBadge statut={p.statut} />
                  {p.prochaine_relance_at || p.next_action_at ? (
                    <span className="text-xs text-slate-400">
                      {new Date(
                        p.prochaine_relance_at ?? p.next_action_at!
                      ).toLocaleDateString('fr-FR')}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setEmailFor(p)}
                  className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Créer email
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setRelancePrompt(p.id)}
                  className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Marquer relancé
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    startTransition(async () => {
                      await postponeRelanceAction(p.id, 3);
                      router.refresh();
                    })
                  }
                  className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Reporter
                </button>
                <Link
                  href={`${LINKS.adminProspectionProspects}/${p.id}`}
                  className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-[#377CF3] hover:bg-blue-50"
                >
                  Ouvrir
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      {emailFor ? (
        <QuickEmailModal
          prospect={emailFor}
          onClose={() => setEmailFor(null)}
          onSent={() => setEmailFor(null)}
        />
      ) : null}

      {relancePrompt ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <p className="font-semibold text-slate-900">Programmer la prochaine relance</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[3, 5, 7, 15].map((d) => (
                <button
                  key={d}
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    startTransition(async () => {
                      await markRelanceDoneAction(relancePrompt, d);
                      setRelancePrompt(null);
                      router.refresh();
                    })
                  }
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                >
                  {d} j
                </button>
              ))}
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await markRelanceDoneAction(relancePrompt, null);
                    setRelancePrompt(null);
                    router.refresh();
                  })
                }
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
              >
                Aucune
              </button>
            </div>
            <button
              type="button"
              onClick={() => setRelancePrompt(null)}
              className="mt-3 text-sm text-slate-500 hover:underline"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
