'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  analyzeCreateProspectsFromDirectoryAction,
  createProspectsFromDirectoryAction,
} from '@/app/admin/prospection/annuaires/actions';
import { LINKS } from '@/lib/internal-links';
import { DEPARTEMENTS_IDF } from '@/lib/prospection/constants';
import { WORKFORCE_CATEGORIES as WF } from '@/lib/prospection/directories-types';
import type { DirectoryCompanyRow } from '@/lib/prospection/directories-types';

export function DirectoryCompaniesTable({
  directoryId,
  companies,
  directoryName,
}: {
  directoryId: string;
  companies: DirectoryCompanyRow[];
  directoryName: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [workforce, setWorkforce] = useState('');
  const [hasEmail, setHasEmail] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [hasManager, setHasManager] = useState(false);
  const [crm, setCrm] = useState<'all' | 'none' | 'in_crm'>('all');
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] = useState<{
    news: { id: string; name: string }[];
    duplicates: { id: string; name: string; reason: string }[];
  } | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (dept && c.departement !== dept) return false;
      if (workforce && c.workforce_category !== workforce) return false;
      if (specialty && !(c.specialties ?? []).includes(specialty)) return false;
      if (hasEmail && !c.email) return false;
      if (hasPhone && !c.phone) return false;
      if (hasManager && !c.manager_name) return false;
      if (crm === 'none' && c.prospect_id) return false;
      if (crm === 'in_crm' && !c.prospect_id) return false;
      const term = q.trim().toLowerCase();
      if (!term) return true;
      return [c.company_name, c.city, c.email, c.manager_name, c.phone]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [companies, q, dept, specialty, workforce, hasEmail, hasPhone, hasManager, crm]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
    }
  };

  const analyze = () => {
    startTransition(async () => {
      const res = await analyzeCreateProspectsFromDirectoryAction([...selected]);
      if (!res.ok) {
        setReport(res.error);
        return;
      }
      setPreview({
        news: res.news,
        duplicates: res.duplicates,
      });
    });
  };

  const confirmCreate = () => {
    startTransition(async () => {
      const ids = preview?.news.map((n) => n.id) ?? [...selected];
      const res = await createProspectsFromDirectoryAction(ids, false);
      if (!res.ok) {
        setReport(res.error);
        return;
      }
      setReport(
        `${res.created} prospect(s) créé(s)${res.errors.length ? ` · ${res.errors.length} ignoré(s)` : ''}`
      );
      setPreview(null);
      setSelected(new Set());
      router.refresh();
    });
  };

  const campaignName = [
    'FFB',
    specialty || null,
    dept ? `${dept}` : null,
    workforce ? WF.find((w) => w.value === workforce)?.label : null,
  ]
    .filter(Boolean)
    .join(' – ');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une entreprise…"
          className="min-w-[14rem] flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Département</option>
          {DEPARTEMENTS_IDF.map((d) => (
            <option key={d.value} value={d.value}>
              {d.value}
            </option>
          ))}
        </select>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Spécialité</option>
          {['Maçonnerie', 'Gros œuvre', 'Béton armé', 'Ravalement', 'Carrelage', 'Plâtrerie', 'Isolation', 'Entreprise générale', 'Autre'].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            )
          )}
        </select>
        <select
          value={workforce}
          onChange={(e) => setWorkforce(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Effectif</option>
          {WF.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
        <label className="inline-flex items-center gap-1.5">
          <input type="checkbox" checked={hasEmail} onChange={(e) => setHasEmail(e.target.checked)} />
          Avec email
        </label>
        <label className="inline-flex items-center gap-1.5">
          <input type="checkbox" checked={hasPhone} onChange={(e) => setHasPhone(e.target.checked)} />
          Avec téléphone
        </label>
        <label className="inline-flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hasManager}
            onChange={(e) => setHasManager(e.target.checked)}
          />
          Avec dirigeant
        </label>
        <select
          value={crm}
          onChange={(e) => setCrm(e.target.value as typeof crm)}
          className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
        >
          <option value="all">Tous CRM</option>
          <option value="none">Non encore prospecté</option>
          <option value="in_crm">Déjà dans le CRM</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={pending || selected.size === 0}
          onClick={analyze}
          className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Créer {selected.size || ''} prospect{selected.size > 1 ? 's' : ''}
        </button>
        <Link
          href={`${LINKS.adminProspectionCampagnes}?fromDirectory=${directoryId}&name=${encodeURIComponent(campaignName || directoryName)}`}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Créer une campagne
        </Link>
        <span className="text-xs text-slate-500">
          {filtered.length} affichée{filtered.length > 1 ? 's' : ''} · {selected.size} sélectionnée
          {selected.size > 1 ? 's' : ''}
        </span>
      </div>

      {report ? <p className="text-sm text-emerald-700">{report}</p> : null}

      {preview ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">
            {selected.size} sélectionnée{selected.size > 1 ? 's' : ''} · {preview.news.length}{' '}
            nouvelle{preview.news.length > 1 ? 's' : ''} · {preview.duplicates.length} déjà présente
            {preview.duplicates.length > 1 ? 's' : ''}
          </p>
          {preview.duplicates.length > 0 ? (
            <ul className="mt-2 max-h-32 overflow-y-auto text-xs text-amber-800">
              {preview.duplicates.slice(0, 8).map((d) => (
                <li key={d.id}>
                  {d.name} — {d.reason}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={pending || preview.news.length === 0}
              onClick={confirmCreate}
              className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Confirmer ({preview.news.length})
            </button>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="rounded-lg px-3 py-2 text-sm text-slate-600"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-3">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onChange={toggleAll}
                  aria-label="Tout sélectionner"
                />
              </th>
              <th className="px-3 py-3 font-medium">Entreprise</th>
              <th className="px-3 py-3 font-medium">Ville</th>
              <th className="px-3 py-3 font-medium">Dpt</th>
              <th className="px-3 py-3 font-medium">Dirigeant</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Tél.</th>
              <th className="px-3 py-3 font-medium">Effectif</th>
              <th className="px-3 py-3 font-medium">Spécialité</th>
              <th className="px-3 py-3 font-medium">Qualibat</th>
              <th className="px-3 py-3 font-medium">CRM</th>
              <th className="px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(c.id)}
                    onChange={() => toggle(c.id)}
                    aria-label={`Sélectionner ${c.company_name}`}
                  />
                </td>
                <td className="px-3 py-2 font-medium text-slate-900">
                  {c.company_name}
                  {c.source_page ? (
                    <span className="block text-[10px] font-normal text-slate-400">
                      p. {c.source_page}
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-2 text-slate-600">{c.city ?? '—'}</td>
                <td className="px-3 py-2 text-slate-600">{c.departement ?? '—'}</td>
                <td className="px-3 py-2 text-slate-600">
                  {c.manager_name ? (
                    <>
                      {c.manager_name}
                      {c.manager_role ? (
                        <span className="block text-[10px] text-slate-400">{c.manager_role}</span>
                      ) : null}
                    </>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-3 py-2 text-slate-600">{c.email ?? '—'}</td>
                <td className="px-3 py-2 text-slate-600">{c.phone ?? '—'}</td>
                <td className="px-3 py-2 text-slate-600">{c.workforce_label ?? '—'}</td>
                <td className="px-3 py-2 text-slate-600">
                  {(c.specialties ?? []).join(', ') || '—'}
                </td>
                <td className="px-3 py-2 text-xs text-slate-500">
                  {(c.qualibat_codes ?? []).join(' ') || '—'}
                </td>
                <td className="px-3 py-2">
                  {c.prospect_id ? (
                    <Link
                      href={`${LINKS.adminProspectionProspects}/${c.prospect_id}`}
                      className="text-xs font-medium text-emerald-700 hover:underline"
                    >
                      Dans CRM
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {!c.prospect_id ? (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => {
                          setSelected(new Set([c.id]));
                          startTransition(async () => {
                            const res = await createProspectsFromDirectoryAction([c.id]);
                            if (res.ok) {
                              setReport(`${res.created} prospect créé`);
                              router.refresh();
                            } else setReport(res.error);
                          });
                        }}
                        className="rounded-md border border-slate-200 px-2 py-0.5 text-xs"
                      >
                        Créer prospect
                      </button>
                    ) : null}
                    {c.email || c.manager_name ? (
                      <Link
                        href={
                          c.prospect_id
                            ? `${LINKS.adminProspectionProspects}/${c.prospect_id}`
                            : `${LINKS.adminProspectionAnnuaires}/${directoryId}/entreprises?q=${encodeURIComponent(c.company_name)}`
                        }
                        className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-[#377CF3]"
                      >
                        Préparer email
                      </Link>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-10 text-center text-slate-500">
                  Aucune entreprise. Lancez l’extraction ou élargissez les filtres.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
