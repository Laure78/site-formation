import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { listRelances } from '@/lib/prospection/queries';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';

function bucket(relances: Awaited<ReturnType<typeof listRelances>>) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const endToday = new Date(start);
  endToday.setHours(23, 59, 59, 999);
  const endWeek = new Date(start);
  const day = endWeek.getDay();
  endWeek.setDate(endWeek.getDate() + (day === 0 ? 0 : 7 - day));
  endWeek.setHours(23, 59, 59, 999);

  const retard = [];
  const aujourdhui = [];
  const semaine = [];
  const plusTard = [];

  for (const p of relances) {
    if (!p.prochaine_relance_at) continue;
    const d = new Date(p.prochaine_relance_at);
    if (d < start) retard.push(p);
    else if (d <= endToday) aujourdhui.push(p);
    else if (d <= endWeek) semaine.push(p);
    else plusTard.push(p);
  }
  return { retard, aujourdhui, semaine, plusTard };
}

export default async function RelancesPage() {
  const supabase = createAdminClient();
  const relances = await listRelances(supabase);
  const groups = bucket(relances);

  const sections = [
    { key: 'retard', title: 'En retard', items: groups.retard },
    { key: 'aujourdhui', title: 'Aujourd’hui', items: groups.aujourdhui },
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
          <ul className="mt-3 space-y-2">
            {s.items.length === 0 ? (
              <li className="text-sm text-slate-500">Aucune.</li>
            ) : (
              s.items.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`${LINKS.adminProspectionProspects}/${p.id}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-800">
                      ☐ Relancer {p.prenom} {p.nom}
                      {p.entreprise ? ` — ${p.entreprise}` : ''}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {p.prochaine_relance_at
                          ? new Date(p.prochaine_relance_at).toLocaleDateString('fr-FR')
                          : ''}
                      </span>
                      <StatutBadge statut={p.statut} />
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
