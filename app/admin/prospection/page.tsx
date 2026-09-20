import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import {
  getDashboardStats,
  listProchainesActions,
  listProspects,
} from '@/lib/prospection/queries';
import { ImportProspectsJson } from '@/components/admin/prospection/ImportProspectsJson';
import { ImportProspectsCsv } from '@/components/admin/prospection/ImportProspectsCsv';
import { ProchainesActionsList } from '@/components/admin/prospection/ProchainesActionsList';
import {
  ProspectionWorkbench,
  type HubFilters,
} from '@/components/admin/prospection/ProspectionWorkbench';

export default async function ProspectionDashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const filters: HubFilters = {
    q: sp.q ?? '',
    typeGroup: sp.typeGroup ?? '',
    type: sp.type ?? '',
    dept: sp.dept ?? '',
    statut: sp.statut ?? '',
    segment: sp.segment ?? '',
    sansAction: sp.sansAction === '1',
    relance: sp.relance ?? '',
  };

  const supabase = createAdminClient();
  const [stats, actions, prospects] = await Promise.all([
    getDashboardStats(supabase),
    listProchainesActions(supabase, 10),
    listProspects(supabase, {
      q: filters.q || undefined,
      statut: filters.statut || undefined,
      typeStructure: filters.type || undefined,
      typeGroup: filters.typeGroup || undefined,
      departement: filters.dept || undefined,
      sansAction: filters.sansAction || undefined,
      sansContact: filters.segment === 'jamais-contactes' || undefined,
      relance: (filters.relance as 'retard' | 'aujourdhui' | undefined) || undefined,
      pageSize: 80,
    }),
  ]);

  const pipeline = [
    { label: 'À contacter', value: stats.aContacter, statut: 'a_contacter' },
    { label: 'Email envoyé', value: stats.emailEnvoye, statut: 'email_envoye' },
    { label: 'À relancer', value: stats.aRelancer, statut: 'a_relancer' },
    { label: 'Réponse reçue', value: stats.reponses, statut: 'reponse_recue' },
    { label: 'Rendez-vous', value: stats.rdv, statut: 'rdv_prevu' },
    { label: 'Opportunité', value: stats.opportunites, statut: 'opportunite' },
    { label: 'Proposition', value: stats.propositions, statut: 'proposition_envoyee' },
    { label: 'Client', value: stats.clients, statut: 'client' },
  ];

  const todayHref = (extra: Record<string, string>) => {
    const p = new URLSearchParams(extra);
    return `${LINKS.adminProspection}?${p.toString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Header actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Prospection
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Pilotez vos prospects, emails et relances depuis un seul espace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`${LINKS.adminProspectionProspects}/nouveau`}
            className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2A6BD9]"
          >
            + Ajouter un prospect
          </Link>
          <ImportProspectsJson />
          <ImportProspectsCsv />
          <Link
            href={LINKS.adminProspectionModeles}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Créer un email
          </Link>
        </div>
      </div>

      {/* À faire aujourd’hui */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
            À faire aujourd’hui
          </h3>
          <Link
            href={LINKS.adminProspectionRelances}
            className="text-sm font-medium text-[#377CF3] hover:underline"
          >
            Voir mes actions
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <TodayStat
            value={stats.relancesAujourdhui}
            label="Relances aujourd’hui"
            href={todayHref({ relance: 'aujourdhui' })}
          />
          <TodayStat
            value={stats.relancesRetard}
            label="Relances en retard"
            href={todayHref({ relance: 'retard' })}
            emphasize
          />
          <TodayStat
            value={stats.aContacter}
            label="À contacter"
            href={todayHref({ statut: 'a_contacter' })}
          />
          <TodayStat
            value={stats.reponses}
            label="Réponses à traiter"
            href={todayHref({ statut: 'reponse_recue' })}
          />
          <TodayStat
            value={stats.rdvAVenir}
            label="Rendez-vous"
            href={todayHref({ statut: 'rdv_prevu' })}
          />
        </div>
      </section>

      {/* Prochaines actions */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
          Mes prochaines actions
        </h3>
        <div className="mt-2">
          <ProchainesActionsList items={actions} />
        </div>
      </section>

      {/* Pipeline */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pipeline
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {pipeline.map((col) => {
            const active = filters.statut === col.statut;
            return (
              <Link
                key={col.label}
                href={todayHref({ statut: col.statut })}
                className={`rounded-xl px-2 py-3 text-center transition ${
                  active
                    ? 'bg-[#377CF3]/10 ring-1 ring-[#377CF3]/30'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <p className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  {col.value}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-slate-500">
                  {col.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Prospects workbench */}
      <section className="space-y-3">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
          Prospects
          <span className="ml-2 font-normal normal-case text-slate-400">
            ({prospects.length})
          </span>
        </h3>
        <ProspectionWorkbench prospects={prospects} initialFilters={filters} />
      </section>
    </div>
  );
}

function TodayStat({
  value,
  label,
  href,
  emphasize,
}: {
  value: number;
  label: string;
  href: string;
  emphasize?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl border px-4 py-4 transition hover:bg-white ${
        emphasize
          ? 'border-amber-200 bg-amber-50/60 hover:border-amber-300'
          : 'border-slate-100 bg-slate-50 hover:border-slate-200'
      }`}
    >
      <p className="font-display text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </Link>
  );
}
