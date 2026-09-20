'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { extractDirectoryCompaniesAction } from '@/app/admin/prospection/annuaires/actions';

export function ExtractDirectoryButton({ directoryId }: { directoryId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setMsg(null);
          setError(null);
          startTransition(async () => {
            const res = await extractDirectoryCompaniesAction(directoryId);
            if (!res.ok) {
              setError(res.error);
              return;
            }
            setMsg(`${res.imported} entreprises extraites (${res.pageCount} pages)`);
            router.refresh();
          });
        }}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
      >
        {pending ? 'Extraction…' : 'Extraire les entreprises'}
      </button>
      {msg ? <p className="text-xs text-emerald-700">{msg}</p> : null}
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
