'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  markProspectContactedAction,
  postponeRelanceAction,
} from '@/app/admin/prospection/actions';
import { LINKS } from '@/lib/internal-links';

export function RelanceRowActions({
  prospectId,
  email,
}: {
  prospectId: string;
  email: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-1.5">
      <a
        href={`mailto:${email}`}
        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        Email
      </a>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await markProspectContactedAction(prospectId, 5);
            router.refresh();
          })
        }
        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
      >
        Contacté
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await postponeRelanceAction(prospectId, 3);
            router.refresh();
          })
        }
        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
      >
        Reporter +3j
      </button>
      <Link
        href={`${LINKS.adminProspectionProspects}/${prospectId}`}
        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-[#377CF3] hover:bg-blue-50"
      >
        Fiche
      </Link>
    </div>
  );
}
