import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { getDashboardStats, listRelances } from '@/lib/prospection/queries';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';

export default async function ProspectionDashboardPage() {
  const supabase = createAdminClient();
  const [stats, relances] = await Promise.all([
    getDashboardStats(supabase),
    listRelances(supabase),
  ]);

  const cards = [
    { label: 'Prospects total', value: stats.total },
    { label: 'À contacter', value: stats.aContacter },
    { label: 'Emails envoyés', value: stats.emailEnvoye },
    { label: 'Relances à faire', value: stats.relancesAujourdhui + stats.relancesRetard },
    { label: 'Réponses', value: stats.reponses },
    { label: 'Rendez-vous', value: stats.rdv },
    { label: 'Opportunités', value: stats.opportunites },
    { label: 'Clients', value: stats.clients },
  ];

  const aujourdhui = relances.filter((r) => {
    if (!r.prochaine_relance_at) return false;
    const d = new Date(r.prochaine_relance_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });
  const retard = relances.filter(
    (r) => r.prochaine_relance_at && new Date(r.prochaine_relance_at) < new Date(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-slate-900">Tableau de bord</h2>
        <Link
          href={`${LINKS.adminProspectionProspects}/nouveau`}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
        >
          + Ajouter un prospect
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{c.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-slate-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Mes actions aujourd’hui</h3>
          <p className="mt-1 text-sm text-slate-500">
            Relances du jour : {aujourdhui.length} · En retard : {retard.length}
          </p>
          <ul className="mt-4 space-y-2">
            {[...retard.slice(0, 5), ...aujourdhui.slice(0, 5)].length === 0 ? (
              <li className="text-sm text-slate-500">Rien de prévu pour aujourd’hui.</li>
            ) : (
              [...retard, ...aujourdhui].slice(0, 8).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`${LINKS.adminProspectionProspects}/${p.id}`}
                    className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-800">
                      {p.prenom} {p.nom}
                      {p.entreprise ? ` — ${p.entreprise}` : ''}
                    </span>
                    <StatutBadge statut={p.statut} />
                  </Link>
                </li>
              ))
            )}
          </ul>
          <Link
            href={LINKS.adminProspectionRelances}
            className="mt-4 inline-block text-sm font-medium text-[#377CF3] hover:underline"
          >
            Voir toutes les relances →
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Mes prochaines relances</h3>
          <ul className="mt-4 space-y-2">
            {relances.slice(0, 8).map((p) => (
              <li key={p.id}>
                <Link
                  href={`${LINKS.adminProspectionProspects}/${p.id}`}
                  className="flex flex-col rounded-lg px-2 py-2 text-sm hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium text-slate-800">
                    {p.prenom} {p.nom}
                    {p.entreprise ? ` — ${p.entreprise}` : ''}
                  </span>
                  <span className="text-xs text-slate-500">
                    {p.prochaine_relance_at
                      ? new Date(p.prochaine_relance_at).toLocaleDateString('fr-FR')
                      : '—'}
                  </span>
                </Link>
              </li>
            ))}
            {relances.length === 0 ? (
              <li className="text-sm text-slate-500">Aucune relance planifiée.</li>
            ) : null}
          </ul>
        </section>
      </div>
    </div>
  );
}
