'use client';

import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import { createExtranetProgramAction } from '@/app/admin/formateurs/phase2-actions';
import { LINKS } from '@/lib/internal-links';
import type { ProgramWithCurrentVersion } from '@/lib/extranet-formateurs/queries-phase2';

export default function AdminFormateursProgrammesPage() {
  const [programs, setPrograms] = useState<ProgramWithCurrentVersion[]>([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    fetch('/api/admin/formateurs/programs-list')
      .then((r) => r.json())
      .then((d: { programs?: ProgramWithCurrentVersion[] }) => setPrograms(d.programs ?? []))
      .catch(() => {});
  }, [pending]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateursProgrammes} />
      <h1 className="font-display text-2xl font-bold text-slate-900">Programmes formateurs</h1>

      <form
        className="max-w-3xl space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            const res = await createExtranetProgramAction(fd);
            if (!res.ok) alert(res.error);
            else e.currentTarget.reset();
          });
        }}
      >
        <h2 className="font-display text-lg font-bold text-slate-900">Nouveau programme</h2>
        <label className="block text-sm">
          Titre
          <input name="title" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Code catalogue (optionnel, ex. NIV-01)
          <input name="catalogue_code" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Version
          <input name="version_label" defaultValue="1.0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Durée (h)
          <input name="duration_hours" type="number" step="0.5" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Objectifs (Markdown)
          <textarea name="objectives_md" rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs" />
        </label>
        <label className="block text-sm">
          Public
          <textarea name="audience" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Prérequis
          <textarea name="prerequisites" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Déroulé pédagogique
          <textarea name="schedule_md" rows={4} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Méthodes
          <textarea name="methods_md" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Évaluation
          <textarea name="evaluation_md" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Adaptations
          <textarea name="adaptations_md" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <button type="submit" disabled={pending} className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          Publier le programme
        </button>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Programme</th>
              <th className="px-4 py-3 text-left">Version</th>
              <th className="px-4 py-3 text-left">Code</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3">{p.current_version?.version_label ?? '—'}</td>
                <td className="px-4 py-3">{p.catalogue_code ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href={LINKS.adminFormateurs} className="text-sm text-[#377CF3] hover:underline">
        Retour dossiers formateurs
      </Link>
    </div>
  );
}
