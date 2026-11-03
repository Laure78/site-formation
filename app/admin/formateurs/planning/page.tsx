'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import { createExtranetMissionAction } from '@/app/admin/formateurs/phase2-actions';
import { LINKS } from '@/lib/internal-links';
import { MISSION_STATUS_LABELS } from '@/lib/extranet-formateurs/phase2-types';
import type { ExtranetMissionRow } from '@/lib/extranet-formateurs/phase2-types';

export default function AdminFormateursPlanningPage() {
  const [missions, setMissions] = useState<ExtranetMissionRow[]>([]);
  const [trainers, setTrainers] = useState<{ id: string; label: string }[]>([]);
  const [programs, setPrograms] = useState<{ id: string; title: string }[]>([]);
  const [pending, startTransition] = useTransition();

  const reload = () => {
    fetch('/api/admin/formateurs/missions-list')
      .then((r) => r.json())
      .then((d: { missions?: ExtranetMissionRow[] }) => setMissions(d.missions ?? []))
      .catch(() => {});
    fetch('/api/admin/formateurs/meta')
      .then((r) => r.json())
      .then((d: { trainers?: { id: string; label: string }[]; programs?: { id: string; title: string }[] }) => {
        setTrainers(d.trainers ?? []);
        setPrograms(d.programs ?? []);
      })
      .catch(() => {});
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateursPlanning} />
      <h1 className="font-display text-2xl font-bold text-slate-900">Planning des interventions</h1>

      <form
        className="grid max-w-3xl gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            const res = await createExtranetMissionAction(fd);
            if (!res.ok) alert(res.error);
            else {
              e.currentTarget.reset();
              reload();
            }
          });
        }}
      >
        <h2 className="font-display text-lg font-bold sm:col-span-2">Attribuer une mission</h2>
        <label className="text-sm sm:col-span-2">
          Formateur
          <select name="trainer_id" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
            <option value="">—</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          Programme
          <select name="program_id" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
            <option value="">—</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          Intitulé mission
          <input name="title" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          Date début
          <input name="starts_on" type="date" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          Date fin
          <input name="ends_on" type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          Horaires / créneau
          <input name="schedule_text" placeholder="ex. 9h–17h" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          Durée (h)
          <input name="duration_hours" type="number" step="0.5" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          Ville
          <input name="location_city" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          Lieu
          <input name="location_name" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          Adresse
          <input name="location_address" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          Entreprise cliente
          <input name="client_company_name" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          Consignes pédagogiques
          <textarea name="pedagogical_brief" rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm sm:col-span-2">
          Consignes administratives
          <textarea name="administrative_brief" rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <button type="submit" disabled={pending} className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white sm:col-span-2">
          Créer la mission
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Mission</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Client</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((m) => (
              <tr key={m.id} className="border-b border-slate-100">
                <td className="px-4 py-3">{new Date(m.starts_on).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3 font-medium">{m.title}</td>
                <td className="px-4 py-3">{MISSION_STATUS_LABELS[m.status]}</td>
                <td className="px-4 py-3">{m.client_company_name ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href={LINKS.adminFormateurs} className="text-sm text-[#377CF3] hover:underline">
        Dossiers formateurs
      </Link>
    </div>
  );
}
