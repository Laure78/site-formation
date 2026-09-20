import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { listProspects } from '@/lib/prospection/queries';
import {
  DEPARTEMENTS_IDF,
  PROSPECTION_STATUTS,
  TYPE_STRUCTURES,
  typeStructureLabel,
} from '@/lib/prospection/constants';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';

export default async function ProspectsListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const supabase = createAdminClient();
  const prospects = await listProspects(supabase, {
    q: sp.q,
    statut: sp.statut,
    typeStructure: sp.type,
    departement: sp.dept,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Prospects ({prospects.length})
        </h2>
        <Link
          href={`${LINKS.adminProspectionProspects}/nouveau`}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
        >
          + Ajouter
        </Link>
      </div>

      <form className="grid gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:grid-cols-4">
        <input
          name="q"
          defaultValue={sp.q ?? ''}
          placeholder="Rechercher nom, entreprise, email…"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
        />
        <select
          name="statut"
          defaultValue={sp.statut ?? ''}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Tous les statuts</option>
          {PROSPECTION_STATUTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          name="type"
          defaultValue={sp.type ?? ''}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Tous les types</option>
          {TYPE_STRUCTURES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          name="dept"
          defaultValue={sp.dept ?? ''}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Tous les départements</option>
          {DEPARTEMENTS_IDF.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 md:col-span-4 md:w-fit"
        >
          Filtrer
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
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
            </tr>
          </thead>
          <tbody>
            {prospects.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <Link
                    href={`${LINKS.adminProspectionProspects}/${p.id}`}
                    className="font-semibold text-slate-900 hover:text-[#377CF3] hover:underline"
                  >
                    {p.prenom} {p.nom}
                  </Link>
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
                <td className="px-4 py-3 text-slate-600">
                  {p.prochaine_relance_at
                    ? new Date(p.prochaine_relance_at).toLocaleDateString('fr-FR')
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <StatutBadge statut={p.statut} />
                </td>
              </tr>
            ))}
            {prospects.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  Aucun prospect. Ajoutez-en un ou élargissez les filtres.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
