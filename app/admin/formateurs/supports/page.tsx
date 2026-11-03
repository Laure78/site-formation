'use client';

import { useEffect, useState, useTransition } from 'react';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import {
  archiveResourceAction,
  getAdminResourceSignedUrlAction,
  uploadTrainerResourceAction,
} from '@/app/admin/formateurs/phase2-actions';
import { RESOURCE_TYPE_LABELS, type ExtranetResourceType } from '@/lib/extranet-formateurs/phase2-types';
import { LINKS } from '@/lib/internal-links';
import type { ExtranetTrainerResourceRow } from '@/lib/extranet-formateurs/phase2-types';

export default function AdminFormateursSupportsPage() {
  const [resources, setResources] = useState<ExtranetTrainerResourceRow[]>([]);
  const [programs, setPrograms] = useState<{ id: string; title: string }[]>([]);
  const [pending, startTransition] = useTransition();

  const reload = () => {
    fetch('/api/admin/formateurs/resources-list')
      .then((r) => r.json())
      .then((d: { resources?: ExtranetTrainerResourceRow[] }) => setResources(d.resources ?? []))
      .catch(() => {});
    fetch('/api/admin/formateurs/meta')
      .then((r) => r.json())
      .then((d: { programs?: { id: string; title: string }[] }) => setPrograms(d.programs ?? []))
      .catch(() => {});
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateursSupports} />
      <h1 className="font-display text-2xl font-bold text-slate-900">Supports formateurs</h1>
      <p className="text-sm text-slate-600">
        Bibliothèque réservée aux intervenants — ne pas confondre avec les ressources apprenants LMS.
      </p>

      <form
        className="max-w-2xl space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            const res = await uploadTrainerResourceAction(fd);
            if (!res.ok) alert(res.error);
            else {
              e.currentTarget.reset();
              reload();
            }
          });
        }}
      >
        <h2 className="font-display text-lg font-bold">Publier un support</h2>
        <label className="block text-sm">
          Titre
          <input name="title" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Type
          <select name="resource_type" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
            {(Object.keys(RESOURCE_TYPE_LABELS) as ExtranetResourceType[]).map((k) => (
              <option key={k} value={k}>
                {RESOURCE_TYPE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Programme lié (optionnel)
          <select name="program_id" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
            <option value="">—</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Description
          <textarea name="description" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Fichier
          <input type="file" name="file" required className="mt-1 block" />
        </label>
        <button type="submit" disabled={pending} className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
          Publier
        </button>
      </form>

      <ul className="space-y-2">
        {resources.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm">
            <span>
              {r.title} — {RESOURCE_TYPE_LABELS[r.resource_type]}
            </span>
            <span className="flex gap-2">
              <button
                type="button"
                className="text-[#377CF3] hover:underline"
                onClick={() => {
                  startTransition(async () => {
                    const res = await getAdminResourceSignedUrlAction(r.id);
                    if (res.ok) window.open(res.url, '_blank');
                  });
                }}
              >
                Ouvrir
              </button>
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => {
                  if (!confirm('Archiver ce support ?')) return;
                  startTransition(async () => {
                    await archiveResourceAction(r.id);
                    reload();
                  });
                }}
              >
                Archiver
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
