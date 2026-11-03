'use client';

import { useTransition } from 'react';
import { updateExtranetProfileAction } from '@/app/espace-formateurs/actions';
import type { ExtranetTrainerRow } from '@/lib/extranet-formateurs/types';
import { ExtranetRgpdNotice } from './RgpdNotice';

export function ProfilForm({ trainer }: { trainer: ExtranetTrainerRow }) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          await updateExtranetProfileAction(fd);
        });
      }}
    >
      <h1 className="font-display text-2xl font-bold text-slate-900">Mon profil</h1>
      <p className="text-sm text-slate-600">
        Identité, expérience BTP et compétences IA / pédagogiques (indicateur Qualiopi 21).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Prénom</span>
          <input
            name="first_name"
            defaultValue={trainer.first_name ?? ''}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Nom</span>
          <input
            name="last_name"
            defaultValue={trainer.last_name ?? ''}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Téléphone</span>
        <input
          name="phone"
          defaultValue={trainer.phone ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Spécialité / métier BTP</span>
        <input
          name="specialty"
          defaultValue={trainer.specialty ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">SIREN</span>
          <input name="siren" defaultValue={trainer.siren ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">SIRET</span>
          <input name="siret" defaultValue={trainer.siret ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Raison sociale</span>
        <input
          name="company_name"
          defaultValue={trainer.company_name ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Numéro NDA (si connu)</span>
        <input
          name="nda_number"
          defaultValue={trainer.nda_number ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Années d&apos;expérience BTP</span>
        <input
          type="number"
          min={0}
          max={60}
          name="btp_experience_years"
          defaultValue={trainer.btp_experience_years ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Expérience professionnelle BTP</span>
        <textarea
          name="btp_experience_summary"
          rows={4}
          defaultValue={trainer.btp_experience_summary ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Compétences IA (outils, usages)</span>
        <textarea
          name="ia_tools_summary"
          rows={4}
          defaultValue={trainer.ia_tools_summary ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Compétences pédagogiques</span>
        <textarea
          name="pedagogy_summary"
          rows={3}
          defaultValue={trainer.pedagogy_summary ?? ''}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad8] disabled:opacity-60"
      >
        {pending ? 'Enregistrement…' : 'Enregistrer'}
      </button>

      <ExtranetRgpdNotice />
    </form>
  );
}
