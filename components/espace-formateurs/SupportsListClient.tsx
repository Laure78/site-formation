'use client';

import { useTransition } from 'react';
import { getTrainerResourceSignedUrlAction } from '@/app/espace-formateurs/phase2-actions';
import { RESOURCE_TYPE_LABELS, type ExtranetTrainerResourceRow } from '@/lib/extranet-formateurs/phase2-types';

export function SupportsListClient({ resources }: { resources: ExtranetTrainerResourceRow[] }) {
  const [pending, startTransition] = useTransition();

  if (resources.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
        Aucun support ne vous a encore été attribué. Contactez l&apos;équipe OFC.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {resources.map((r) => (
        <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <p className="font-semibold text-slate-900">{r.title}</p>
            <p className="text-sm text-slate-600">
              {RESOURCE_TYPE_LABELS[r.resource_type]} · v{r.version_label}
            </p>
            {r.description ? <p className="mt-1 text-sm text-slate-500">{r.description}</p> : null}
          </div>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const res = await getTrainerResourceSignedUrlAction(r.id);
                if (res.ok) window.open(res.url, '_blank', 'noopener,noreferrer');
                else alert(res.error);
              });
            }}
            className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Télécharger
          </button>
        </li>
      ))}
    </ul>
  );
}
