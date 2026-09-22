import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import {
  MODALITY_LABELS,
  SESSION_STATUS_LABELS,
  SESSION_STATUS_TONES,
} from '@/lib/training-ops/constants';
import { listTrainingPrograms, syncAllCataloguePrograms } from '@/lib/training-ops/programs';
import { listTrainingSessions } from '@/lib/training-ops/sessions';
import { listTrainingCompanies } from '@/lib/training-ops/companies';
import type { TrainingModality, TrainingSessionStatus } from '@/lib/training-ops/types';
import { syncProgramsAction } from './actions';
import {
  archiveSessionAction,
  deleteSessionAction,
  duplicateSessionAction,
} from './actions';

const TONE: Record<string, string> = {
  slate: 'bg-slate-100 text-slate-700',
  amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet: 'bg-violet-100 text-violet-800',
  red: 'bg-red-100 text-red-800',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminSessionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === 'string' ? sp.q : '';
  const programId = typeof sp.programId === 'string' ? sp.programId : '';
  const companyId = typeof sp.companyId === 'string' ? sp.companyId : '';
  const status = (typeof sp.status === 'string' ? sp.status : 'all') as
    | TrainingSessionStatus
    | 'all';
  const modality = (typeof sp.modality === 'string' ? sp.modality : 'all') as
    | TrainingModality
    | 'all';
  const year = typeof sp.year === 'string' && sp.year ? Number(sp.year) : null;
  const archived = typeof sp.archived === 'string' ? sp.archived : 'exclude';
  const page = typeof sp.page === 'string' ? Number(sp.page) || 1 : 1;

  let programs = await listTrainingPrograms();
  if (programs.length === 0) {
    try {
      await syncAllCataloguePrograms();
      programs = await listTrainingPrograms();
    } catch {
      /* tables absentes tant que migration non appliquée */
    }
  }

  let rows: Awaited<ReturnType<typeof listTrainingSessions>>['rows'] = [];
  let total = 0;
  let companies: Awaited<ReturnType<typeof listTrainingCompanies>> = [];
  let loadError: string | null = null;

  try {
    const result = await listTrainingSessions({
      q,
      programId: programId || undefined,
      companyId: companyId || undefined,
      status,
      modality,
      year,
      archived: archived as 'exclude' | 'only' | 'include',
      page,
      pageSize: 20,
    });
    rows = result.rows;
    total = result.total;
    companies = await listTrainingCompanies();
  } catch (e) {
    loadError =
      e instanceof Error
        ? e.message
        : 'Impossible de charger les sessions (migration 063 à appliquer ?)';
  }

  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Sessions de formation
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Cockpit opérationnel — formation → session → client → participants → documents.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={LINKS.adminSessionsDashboard}
            className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
          >
            Tableau de bord
          </Link>
          <Link
            href={LINKS.adminSessionsEntreprises}
            className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
          >
            Entreprises clientes
          </Link>
          <form action={syncProgramsAction}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
            >
              Sync catalogue
            </button>
          </form>
          <Link
            href={LINKS.adminSessionsNouvelle}
            className="inline-flex min-h-11 items-center rounded-xl bg-[#377CF3] px-4 text-sm font-semibold text-white"
          >
            + Nouvelle session
          </Link>
        </div>
      </div>

      {loadError ? (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {loadError}
          <p className="mt-1 text-amber-800">
            Appliquez la migration{' '}
            <code className="rounded bg-white px-1">063_training_ops.sql</code> sur Supabase.
          </p>
        </div>
      ) : null}

      <form className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Recherche (réf., nom)"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
        />
        <select
          name="programId"
          defaultValue={programId}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Formation</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.catalogue_code ? `${p.catalogue_code} — ` : ''}
              {p.title}
            </option>
          ))}
        </select>
        <select
          name="companyId"
          defaultValue={companyId}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Client</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">Statut</option>
          {Object.entries(SESSION_STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          name="modality"
          defaultValue={modality}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">Modalité</option>
          {Object.entries(MODALITY_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <input
          name="year"
          type="number"
          defaultValue={year ?? ''}
          placeholder="Année"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <select
          name="archived"
          defaultValue={archived}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="exclude">Actives</option>
          <option value="only">Archives</option>
          <option value="include">Toutes</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:col-span-2"
        >
          Filtrer
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Référence</th>
              <th className="px-4 py-3">Formation</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Formateur</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Participants</th>
              <th className="px-4 py-3">Documents</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                  Aucune session. Créez la première avec « + Nouvelle session ».
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-semibold text-[#377CF3]">
                    <Link href={`${LINKS.adminSessions}/${row.id}`}>{row.reference}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">
                      {row.catalogue_code ?? '—'}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {row.program_title}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.company_name ?? '—'}</td>
                  <td className="px-4 py-3">{row.trainer_name ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.starts_on
                      ? `${row.starts_on}${row.ends_on && row.ends_on !== row.starts_on ? ` → ${row.ends_on}` : ''}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3">{row.participants_count}</td>
                  <td className="px-4 py-3">{row.documents_count}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        TONE[SESSION_STATUS_TONES[row.status]] ?? TONE.slate
                      }`}
                    >
                      {SESSION_STATUS_LABELS[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <Link
                        href={`${LINKS.adminSessions}/${row.id}`}
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium"
                      >
                        Ouvrir
                      </Link>
                      <form action={duplicateSessionAction}>
                        <input type="hidden" name="sessionId" value={row.id} />
                        <input type="hidden" name="keepCompany" value="1" />
                        <input type="hidden" name="keepTrainer" value="1" />
                        <button
                          type="submit"
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium"
                        >
                          Dupliquer
                        </button>
                      </form>
                      <form action={archiveSessionAction}>
                        <input type="hidden" name="sessionId" value={row.id} />
                        <button
                          type="submit"
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium"
                        >
                          Archiver
                        </button>
                      </form>
                      <form action={deleteSessionAction}>
                        <input type="hidden" name="sessionId" value={row.id} />
                        <button
                          type="submit"
                          className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-700"
                        >
                          Supprimer
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <p className="mt-4 text-sm text-slate-600">
          Page {page} / {totalPages} — {total} session{total > 1 ? 's' : ''}
        </p>
      ) : null}
    </div>
  );
}
