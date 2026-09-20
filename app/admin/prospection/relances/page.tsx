import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { listRelances } from '@/lib/prospection/queries';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';
import { RelanceRowActions } from '@/components/admin/prospection/RelanceRowActions';
import type { ProspectRow } from '@/lib/prospection/types';

function bucket(relances: ProspectRow[]) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const endToday = new Date(start);
  endToday.setHours(23, 59, 59, 999);
  const demainStart = new Date(start);
  demainStart.setDate(demainStart.getDate() + 1);
  const demainEnd = new Date(demainStart);
  demainEnd.setHours(23, 59, 59, 999);
  const endWeek = new Date(start);
  const day = endWeek.getDay();
  endWeek.setDate(endWeek.getDate() + (day === 0 ? 0 : 7 - day));
  endWeek.setHours(23, 59, 59, 999);

  const retard: ProspectRow[] = [];
  const aujourdhui: ProspectRow[] = [];
  const demain: ProspectRow[] = [];
  const semaine: ProspectRow[] = [];
  const plusTard: ProspectRow[] = [];

  for (const p of relances) {
    if (!p.prochaine_relance_at) continue;
    const d = new Date(p.prochaine_relance_at);
    if (d < start) retard.push(p);
    else if (d <= endToday) aujourdhui.push(p);
    else if (d >= demainStart && d <= demainEnd) demain.push(p);
    else if (d <= endWeek) semaine.push(p);
    else plusTard.push(p);
  }
  return { retard, aujourdhui, demain, semaine, plusTard };
}

export default async function RelancesPage() {
  const supabase = createAdminClient();
  const relances = await listRelances(supabase);
  const groups = bucket(relances);

  const sections = [
    { key: 'retard', title: 'En retard', items: groups.retard },
    { key: 'aujourdhui', title: 'Aujourd’hui', items: groups.aujourdhui },
    { key: 'demain', title: 'Demain', items: groups.demain },
    { key: 'semaine', title: 'Cette semaine', items: groups.semaine },
    { key: 'plus', title: 'Plus tard', items: groups.plusTard },
  ] as const;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-lg font-semibold text-slate-900">Relances</h2>
      {sections.map((s) => (
        <section key={s.key} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            {s.title}{' '}
            <span className="text-sm font-normal text-slate-500">({s.items.length})</span>
          </h3>
          {s.items.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Aucune.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-2 pr-3 font-medium">Prospect</th>
                    <th className="py-2 pr-3 font-medium">Entreprise</th>
                    <th className="py-2 pr-3 font-medium">Email</th>
                    <th className="py-2 pr-3 font-medium">Dernier contact</th>
                    <th className="py-2 pr-3 font-medium">Motif</th>
                    <th className="py-2 pr-3 font-medium">Date relance</th>
                    <th className="py-2 pr-3 font-medium">Statut</th>
                    <th className="py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {s.items.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50">
                      <td className="py-3 pr-3">
                        <Link
                          href={`${LINKS.adminProspectionProspects}/${p.id}`}
                          className="font-semibold text-slate-900 hover:text-[#377CF3] hover:underline"
                        >
                          {p.prenom} {p.nom}
                        </Link>
                      </td>
                      <td className="py-3 pr-3 text-slate-700">{p.entreprise ?? '—'}</td>
                      <td className="py-3 pr-3 text-slate-600">{p.email}</td>
                      <td className="py-3 pr-3 text-slate-600">
                        {p.dernier_contact_at
                          ? new Date(p.dernier_contact_at).toLocaleDateString('fr-FR')
                          : '—'}
                      </td>
                      <td className="py-3 pr-3 text-slate-600">{p.relance_motif ?? '—'}</td>
                      <td className="py-3 pr-3 text-slate-600">
                        {p.prochaine_relance_at
                          ? new Date(p.prochaine_relance_at).toLocaleString('fr-FR')
                          : '—'}
                      </td>
                      <td className="py-3 pr-3">
                        <StatutBadge statut={p.statut} />
                      </td>
                      <td className="py-3">
                        <RelanceRowActions prospectId={p.id} email={p.email} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
