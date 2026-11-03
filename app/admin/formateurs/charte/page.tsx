'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { publishCharterVersionAction } from '@/app/admin/formateurs/actions';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import { LINKS } from '@/lib/internal-links';

export default function AdminFormateursChartePage() {
  const [content, setContent] = useState('');
  const [version, setVersion] = useState('');
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    fetch('/api/admin/formateurs/charte-current')
      .then((r) => r.json())
      .then((data: { content_md?: string; version_label?: string }) => {
        if (data.content_md) setContent(data.content_md);
        if (data.version_label) setVersion(`${data.version_label}-next`);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateursCharte} />
      <Link href={LINKS.adminFormateurs} className="text-sm font-medium text-[#377CF3] hover:underline">
        ← Formateurs
      </Link>
      <h1 className="font-display text-2xl font-bold text-slate-900">Charte du formateur</h1>
      <p className="text-sm text-slate-600">
        Publier une nouvelle version désactive la précédente et demandera une nouvelle acceptation aux
        formateurs.
      </p>
      <form
        className="max-w-3xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            const res = await publishCharterVersionAction(fd);
            if (!res.ok) alert(res.error);
          });
        }}
      >
        <label className="block text-sm">
          Libellé de version
          <input
            name="version_label"
            required
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Contenu (Markdown)
          <textarea
            name="content_md"
            required
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          Publier la version
        </button>
      </form>
    </div>
  );
}
