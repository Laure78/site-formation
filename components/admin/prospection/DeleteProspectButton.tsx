'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProspectAction } from '@/app/admin/prospection/actions';
import { LINKS } from '@/lib/internal-links';

export function DeleteProspectButton({ prospectId }: { prospectId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm('Supprimer définitivement ce prospect ?')) return;
        startTransition(async () => {
          const res = await deleteProspectAction(prospectId);
          if (res.ok) {
            router.push(LINKS.adminProspectionProspects);
            router.refresh();
          }
        });
      }}
      className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50"
    >
      {pending ? '…' : 'Supprimer'}
    </button>
  );
}
