import { createAdminClient } from '@/lib/supabase/admin';
import { listCompaniesDistinct } from '@/lib/prospection/queries';
import { typeStructureLabel } from '@/lib/prospection/constants';

export default async function EntreprisesPage() {
  const supabase = createAdminClient();
  const companies = await listCompaniesDistinct(supabase);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold text-slate-900">
        Entreprises ({companies.length})
      </h2>
      <p className="text-sm text-slate-500">
        Vue agrégée à partir des fiches prospects (V1). Une base entreprises dédiée est prête en
        base pour la suite.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Entreprise</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Dpt</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Taille</th>
              <th className="px-4 py-3">Contacts</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.name} className="border-b border-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3">{typeStructureLabel(c.type_structure)}</td>
                <td className="px-4 py-3">{c.departement ?? '—'}</td>
                <td className="px-4 py-3">{c.ville ?? '—'}</td>
                <td className="px-4 py-3">{c.taille ?? '—'}</td>
                <td className="px-4 py-3">{c.count}</td>
              </tr>
            ))}
            {companies.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  Aucune entreprise pour l’instant.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
