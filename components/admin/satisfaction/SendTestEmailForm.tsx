'use client';

import { useTransition } from 'react';
import { sendTestSatisfactionEmailAction } from '@/app/admin/satisfaction/actions';

export function SendTestEmailForm({ templateKey }: { templateKey: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const to = String(fd.get('testEmail') ?? '');
        startTransition(async () => {
          await sendTestSatisfactionEmailAction(templateKey, to);
        });
      }}
    >
      <input
        name="testEmail"
        type="email"
        required
        placeholder="Email test"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50 disabled:opacity-60"
      >
        {pending ? '…' : 'Envoyer test'}
      </button>
    </form>
  );
}
