'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BESOINS_PROSPECTION,
  DEPARTEMENTS_IDF,
  PROSPECTION_STATUTS,
  TAILLES_ENTREPRISE,
  TYPE_STRUCTURES,
} from '@/lib/prospection/constants';
import { upsertProspectAction, type ProspectInput } from '@/app/admin/prospection/actions';
import { LINKS } from '@/lib/internal-links';
import type { ProspectRow } from '@/lib/prospection/types';

export function ProspectForm({
  initial,
  prospectId,
}: {
  initial?: Partial<ProspectRow>;
  prospectId?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [besoins, setBesoins] = useState<string[]>(initial?.besoins_identifies ?? []);

  const toggleBesoin = (b: string) => {
    setBesoins((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const input: ProspectInput = {
      prenom: String(fd.get('prenom') ?? ''),
      nom: String(fd.get('nom') ?? ''),
      email: String(fd.get('email') ?? ''),
      telephone: String(fd.get('telephone') ?? '') || null,
      entreprise: String(fd.get('entreprise') ?? '') || null,
      fonction: String(fd.get('fonction') ?? '') || null,
      linkedin_url: String(fd.get('linkedin_url') ?? '') || null,
      site_web: String(fd.get('site_web') ?? '') || null,
      ville: String(fd.get('ville') ?? '') || null,
      departement: String(fd.get('departement') ?? '') || null,
      region: String(fd.get('region') ?? '') || 'Île-de-France',
      type_structure: String(fd.get('type_structure') ?? '') || null,
      taille_entreprise: String(fd.get('taille_entreprise') ?? '') || null,
      corps_metier: String(fd.get('corps_metier') ?? '') || null,
      effectif_approx: String(fd.get('effectif_approx') ?? '') || null,
      source_prospect: String(fd.get('source_prospect') ?? '') || null,
      notes_crm: String(fd.get('notes_crm') ?? '') || null,
      statut: String(fd.get('statut') ?? '') || 'a_contacter',
      prochaine_relance_at: (() => {
        const raw = String(fd.get('prochaine_relance_at') ?? '').trim();
        if (!raw) return null;
        const d = new Date(raw);
        return Number.isNaN(d.getTime()) ? null : d.toISOString();
      })(),
      besoins_identifies: besoins,
    };

    startTransition(async () => {
      const res = await upsertProspectAction(input, prospectId);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push(`${LINKS.adminProspectionProspects}/${res.id}`);
      router.refresh();
    });
  };

  const field =
    'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20';

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6">
      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium text-slate-700">Prénom *</span>
          <input name="prenom" required defaultValue={initial?.prenom ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Nom *</span>
          <input name="nom" required defaultValue={initial?.nom ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Email *</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={initial?.email ?? ''}
            className={field}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Téléphone</span>
          <input name="telephone" defaultValue={initial?.telephone ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Fonction</span>
          <input name="fonction" defaultValue={initial?.fonction ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Entreprise</span>
          <input name="entreprise" defaultValue={initial?.entreprise ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">LinkedIn</span>
          <input name="linkedin_url" defaultValue={initial?.linkedin_url ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Site internet</span>
          <input name="site_web" defaultValue={initial?.site_web ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Type de structure</span>
          <select
            name="type_structure"
            defaultValue={initial?.type_structure ?? ''}
            className={field}
          >
            <option value="">—</option>
            {TYPE_STRUCTURES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Taille</span>
          <select
            name="taille_entreprise"
            defaultValue={initial?.taille_entreprise ?? ''}
            className={field}
          >
            <option value="">—</option>
            {TAILLES_ENTREPRISE.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Département</span>
          <select name="departement" defaultValue={initial?.departement ?? ''} className={field}>
            <option value="">—</option>
            {DEPARTEMENTS_IDF.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Ville</span>
          <input name="ville" defaultValue={initial?.ville ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Région</span>
          <input
            name="region"
            defaultValue={initial?.region ?? 'Île-de-France'}
            className={field}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Corps de métier</span>
          <input name="corps_metier" defaultValue={initial?.corps_metier ?? ''} className={field} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Effectif approx.</span>
          <input
            name="effectif_approx"
            defaultValue={initial?.effectif_approx ?? ''}
            className={field}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Source</span>
          <input
            name="source_prospect"
            defaultValue={initial?.source_prospect ?? ''}
            className={field}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Statut</span>
          <select name="statut" defaultValue={initial?.statut ?? 'a_contacter'} className={field}>
            {PROSPECTION_STATUTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Prochaine relance</span>
          <input
            name="prochaine_relance_at"
            type="datetime-local"
            defaultValue={
              initial?.prochaine_relance_at
                ? new Date(initial.prochaine_relance_at).toISOString().slice(0, 16)
                : ''
            }
            className={field}
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">Besoins identifiés</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {BESOINS_PROSPECTION.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggleBesoin(b)}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${
                besoins.includes(b)
                  ? 'bg-[#377CF3] text-white ring-[#377CF3]'
                  : 'bg-white text-slate-600 ring-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Notes</span>
        <textarea
          name="notes_crm"
          rows={4}
          defaultValue={initial?.notes_crm ?? ''}
          className={field}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9] disabled:opacity-50"
        >
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <Link
          href={prospectId ? `${LINKS.adminProspectionProspects}/${prospectId}` : LINKS.adminProspectionProspects}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
