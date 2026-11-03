'use client';

import { useTransition } from 'react';
import {
  grantProgramToTrainerAction,
  grantResourceToTrainerAction,
} from '@/app/admin/formateurs/phase2-actions';
import type { ExtranetTrainerResourceRow } from '@/lib/extranet-formateurs/phase2-types';
import type { ProgramWithCurrentVersion } from '@/lib/extranet-formateurs/queries-phase2';

export function TrainerGrantsPanel({
  trainerId,
  programs,
  resources,
  grantedProgramIds,
  grantedResourceIds,
}: {
  trainerId: string;
  programs: ProgramWithCurrentVersion[];
  resources: ExtranetTrainerResourceRow[];
  grantedProgramIds: string[];
  grantedResourceIds: string[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Programmes attribués</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {programs.map((p) => {
            const granted = grantedProgramIds.includes(p.id);
            return (
              <li key={p.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                <span>{p.title}</span>
                {granted ? (
                  <span className="text-emerald-700">Attribué</span>
                ) : (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      startTransition(async () => {
                        await grantProgramToTrainerAction(trainerId, p.id);
                      });
                    }}
                    className="text-[#377CF3] hover:underline disabled:opacity-60"
                  >
                    Attribuer
                  </button>
                )}
              </li>
            );
          })}
          {programs.length === 0 ? <li className="text-slate-500">Créez d’abord un programme.</li> : null}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Supports attribués</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {resources.map((r) => {
            const granted = grantedResourceIds.includes(r.id);
            return (
              <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                <span className="truncate">{r.title}</span>
                {granted ? (
                  <span className="shrink-0 text-emerald-700">Attribué</span>
                ) : (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      startTransition(async () => {
                        await grantResourceToTrainerAction(trainerId, r.id);
                      });
                    }}
                    className="shrink-0 text-[#377CF3] hover:underline disabled:opacity-60"
                  >
                    Attribuer
                  </button>
                )}
              </li>
            );
          })}
          {resources.length === 0 ? <li className="text-slate-500">Aucun support publié.</li> : null}
        </ul>
      </section>
    </div>
  );
}
