'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import {
  addProspectNoteAction,
  markRelanceDoneAction,
} from '@/app/admin/prospection/actions';
import { LINKS } from '@/lib/internal-links';
import {
  DEPARTEMENTS_IDF,
  PRESET_SEGMENTS,
  TYPE_FILTER_GROUPS,
  typeStructureLabel,
} from '@/lib/prospection/constants';
import { resolveNextActionDisplay } from '@/lib/prospection/next-action';
import type { ProspectRow } from '@/lib/prospection/types';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';
import { ProspectDrawer } from '@/components/admin/prospection/ProspectDrawer';
import { QuickEmailModal } from '@/components/admin/prospection/QuickEmailModal';

export type HubFilters = {
  q: string;
  typeGroup: string;
  type: string;
  dept: string;
  statut: string;
  segment: string;
  sansAction: boolean;
  relance: string;
};

function buildHref(f: Partial<HubFilters>) {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.typeGroup) p.set('typeGroup', f.typeGroup);
  if (f.type) p.set('type', f.type);
  if (f.dept) p.set('dept', f.dept);
  if (f.statut) p.set('statut', f.statut);
  if (f.segment) p.set('segment', f.segment);
  if (f.sansAction) p.set('sansAction', '1');
  if (f.relance) p.set('relance', f.relance);
  const s = p.toString();
  return s ? `${LINKS.adminProspection}?${s}` : LINKS.adminProspection;
}

export function ProspectionWorkbench({
  prospects,
  initialFilters,
}: {
  prospects: ProspectRow[];
  initialFilters: HubFilters;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialFilters.q);
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [emailProspect, setEmailProspect] = useState<ProspectRow | null>(null);
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return prospects;
    return prospects.filter((p) =>
      [p.prenom, p.nom, p.email, p.entreprise, p.fonction]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [prospects, q]);

  const go = (patch: Partial<HubFilters>) => {
    router.push(buildHref({ ...initialFilters, ...patch }));
  };

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-medium transition ${
      active
        ? 'bg-[#377CF3] text-white'
        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
    }`;

  return (
    <div className="grid gap-6 lg:grid-cols-[210px_1fr]">
      <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Segments
        </p>
        <ul className="mt-3 space-y-1">
          <li>
            <button
              type="button"
              onClick={() =>
                go({
                  segment: '',
                  typeGroup: '',
                  type: '',
                  dept: '',
                  statut: '',
                  sansAction: false,
                  relance: '',
                  q: '',
                })
              }
              className={`w-full rounded-lg px-2 py-1.5 text-left text-sm ${
                !initialFilters.segment
                  ? 'bg-slate-100 font-medium text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tous
            </button>
          </li>
          {PRESET_SEGMENTS.map((s) => {
            const f = s.filters as Record<string, string>;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() =>
                    go({
                      segment: s.id,
                      typeGroup: f.typeGroup ?? '',
                      type: f.type ?? '',
                      dept: f.dept ?? '',
                      statut: f.statut ?? '',
                      sansAction: f.sansAction === '1',
                      relance: f.relance ?? '',
                    })
                  }
                  className={`w-full rounded-lg px-2 py-1.5 text-left text-sm ${
                    initialFilters.segment === s.id
                      ? 'bg-slate-100 font-medium text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s.name}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="min-w-0 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') go({ q });
            }}
            placeholder="Rechercher un prospect, une entreprise ou un email…"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
          <button
            type="button"
            onClick={() => go({ q })}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Rechercher
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TYPE_FILTER_GROUPS.map((g) => (
            <button
              key={g.value || 'all'}
              type="button"
              onClick={() => go({ typeGroup: g.value, type: '', segment: '' })}
              className={chip(initialFilters.typeGroup === g.value && !initialFilters.type)}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => go({ dept: '' })} className={chip(!initialFilters.dept)}>
            Tous dépts
          </button>
          {DEPARTEMENTS_IDF.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => go({ dept: d.value, segment: '' })}
              className={chip(initialFilters.dept === d.value)}
            >
              {d.value}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { v: '', l: 'Tous statuts' },
            { v: 'a_contacter', l: 'À contacter' },
            { v: 'a_relancer', l: 'À relancer' },
            { v: 'rdv_prevu', l: 'RDV' },
            { v: 'opportunite', l: 'Opportunité' },
            { v: 'client', l: 'Client' },
          ].map((s) => (
            <button
              key={s.v || 'all-s'}
              type="button"
              onClick={() => go({ statut: s.v, segment: '' })}
              className={chip(initialFilters.statut === s.v)}
            >
              {s.l}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go({ sansAction: !initialFilters.sansAction, segment: '' })}
            className={chip(initialFilters.sansAction)}
          >
            Sans prochaine action
          </button>
        </div>

        <div className="hidden overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm md:block">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Prospect</th>
                <th className="px-4 py-3 font-medium">Entreprise</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Dpt</th>
                <th className="px-4 py-3 font-medium">Dernier contact</th>
                <th className="px-4 py-3 font-medium">Prochaine action</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const next = resolveNextActionDisplay(p);
                return (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setDrawerId(p.id)}
                        className="text-left font-semibold text-slate-900 hover:text-[#377CF3]"
                      >
                        {p.prenom} {p.nom}
                      </button>
                      <p className="text-xs text-slate-500">{p.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{p.entreprise ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {typeStructureLabel(p.type_structure)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.departement ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {p.dernier_contact_at
                        ? new Date(p.dernier_contact_at).toLocaleDateString('fr-FR')
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-700">{next.label}</span>
                      {next.kind === 'retard' ? (
                        <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                          En retard
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <StatutBadge statut={p.statut} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <button
                          type="button"
                          onClick={() => setEmailProspect(p)}
                          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs"
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() =>
                            startTransition(async () => {
                              await markRelanceDoneAction(p.id, 5);
                              router.refresh();
                            })
                          }
                          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs"
                        >
                          Relancer
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNoteFor(p.id);
                            setNoteText('');
                          }}
                          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs"
                        >
                          Note
                        </button>
                        <button
                          type="button"
                          onClick={() => setDrawerId(p.id)}
                          className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-[#377CF3]"
                        >
                          Ouvrir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    Aucun prospect pour ces filtres.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {filtered.map((p) => {
            const next = resolveNextActionDisplay(p);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setDrawerId(p.id)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {p.prenom} {p.nom}
                    </p>
                    <p className="text-sm text-slate-600">{p.entreprise ?? '—'}</p>
                  </div>
                  <StatutBadge statut={p.statut} />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {next.label}
                  {next.kind === 'retard' ? ' · En retard' : ''}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <ProspectDrawer prospectId={drawerId} onClose={() => setDrawerId(null)} />

      {emailProspect ? (
        <QuickEmailModal
          prospect={emailProspect}
          onClose={() => setEmailProspect(null)}
          onSent={() => setEmailProspect(null)}
        />
      ) : null}

      {noteFor ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="font-semibold text-slate-900">+ Note</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
              className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Ex. Rencontrée au Café France Num…"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNoteFor(null)}
                className="rounded-lg px-3 py-2 text-sm text-slate-600"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={pending || !noteText.trim()}
                onClick={() =>
                  startTransition(async () => {
                    await addProspectNoteAction(noteFor, noteText);
                    setNoteFor(null);
                    router.refresh();
                  })
                }
                className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
