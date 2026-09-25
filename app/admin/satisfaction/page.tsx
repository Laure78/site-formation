import Link from 'next/link';
import { Star } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import {
  getSatisfactionKpis,
  listSatisfactionDashboardRows,
  type SatisfactionDashboardFilters,
} from '@/lib/training-ops/satisfaction/queries';
import { SatisfactionTableClient } from '@/components/admin/satisfaction/SatisfactionTableClient';
import {
  QUESTIONNAIRE_STATUSES,
  GOOGLE_STATUSES,
} from '@/lib/training-ops/satisfaction/types';
import {
  googleStatusLabel,
  questionnaireStatusLabel,
} from '@/lib/training-ops/satisfaction/labels';

export default async function AdminSatisfactionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters: SatisfactionDashboardFilters = {
    q: typeof sp.q === 'string' ? sp.q : undefined,
    actionsOnly: sp.actions === '1',
    questionnaireStatus:
      typeof sp.qStatus === 'string'
        ? (sp.qStatus as SatisfactionDashboardFilters['questionnaireStatus'])
        : undefined,
    googleStatus:
      typeof sp.gStatus === 'string'
        ? (sp.gStatus as SatisfactionDashboardFilters['googleStatus'])
        : undefined,
    dateFrom: typeof sp.dateFrom === 'string' ? sp.dateFrom : undefined,
    dateTo: typeof sp.dateTo === 'string' ? sp.dateTo : undefined,
    sort: typeof sp.sort === 'string' ? sp.sort : 'session_desc',
  };

  const [kpis, rows] = await Promise.all([
    getSatisfactionKpis().catch(() => null),
    listSatisfactionDashboardRows(filters).catch(() => []),
  ]);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-7xl space-y-8">
        <OrgPageHeader
          eyebrow="Administration · Qualiopi"
          title="Satisfaction & Avis"
          description="Questionnaires de satisfaction et demandes d’avis Google — envois automatiques et actions manuelles sur les sessions opérationnelles."
          icon={<Star className="h-7 w-7 text-[#377CF3]" strokeWidth={1.5} aria-hidden />}
          actions={
            <div className="flex flex-wrap gap-2">
              <Link
                href={`${LINKS.adminSatisfaction}/parametres`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Paramètres
              </Link>
              <Link
                href={`${LINKS.adminSatisfaction}/emails`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Modèles d’emails
              </Link>
            </div>
          }
        />

        {kpis ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <OrgCard padding="sm">
              <p className="text-xs font-medium uppercase text-slate-400">Taux de réponse</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900">{kpis.tauxReponse} %</p>
            </OrgCard>
            <OrgCard padding="sm">
              <p className="text-xs font-medium uppercase text-slate-400">Envoyés</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900">{kpis.envoyes}</p>
              <p className="text-xs text-slate-500">{kpis.enAttente} en attente</p>
            </OrgCard>
            <OrgCard padding="sm">
              <p className="text-xs font-medium uppercase text-slate-400">Complétés</p>
              <p className="mt-1 font-display text-2xl font-bold text-emerald-700">{kpis.completes}</p>
              <p className="text-xs text-slate-500">{kpis.sansReponse} sans réponse</p>
            </OrgCard>
            <OrgCard padding="sm">
              <p className="text-xs font-medium uppercase text-slate-400">Satisfaction moy.</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900">
                {kpis.satisfactionMoyenne != null ? `${kpis.satisfactionMoyenne}/5` : '—'}
              </p>
              <p className="text-xs text-slate-500">{kpis.relancesAEffectuer} relances à faire</p>
            </OrgCard>
            <OrgCard padding="sm">
              <p className="text-xs font-medium uppercase text-slate-400">Google programmés</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900">{kpis.googleProgrammes}</p>
              <p className="text-xs text-slate-500">{kpis.googleEnvoyes} envoyés</p>
            </OrgCard>
            <OrgCard padding="sm">
              <p className="text-xs font-medium uppercase text-slate-400">Google terminés</p>
              <p className="mt-1 font-display text-2xl font-bold text-emerald-700">{kpis.googleTermines}</p>
              <p className="text-xs text-slate-500">{kpis.googleRelances} relancés</p>
            </OrgCard>
          </div>
        ) : null}

        <OrgCard>
          <form className="flex flex-wrap items-end gap-3 border-b border-slate-100 pb-4">
            <div>
              <label htmlFor="q" className="text-xs font-medium text-slate-500">
                Recherche
              </label>
              <input
                id="q"
                name="q"
                defaultValue={filters.q}
                placeholder="Nom, email, réf. session"
                className="mt-1 block w-56 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="dateFrom" className="text-xs font-medium text-slate-500">
                Du
              </label>
              <input
                id="dateFrom"
                name="dateFrom"
                type="date"
                defaultValue={filters.dateFrom}
                className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="text-xs font-medium text-slate-500">
                Au
              </label>
              <input
                id="dateTo"
                name="dateTo"
                type="date"
                defaultValue={filters.dateTo}
                className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="qStatus" className="text-xs font-medium text-slate-500">
                Statut questionnaire
              </label>
              <select
                id="qStatus"
                name="qStatus"
                defaultValue={filters.questionnaireStatus ?? ''}
                className="mt-1 block w-44 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">Tous</option>
                {QUESTIONNAIRE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {questionnaireStatusLabel(s)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gStatus" className="text-xs font-medium text-slate-500">
                Statut Google
              </label>
              <select
                id="gStatus"
                name="gStatus"
                defaultValue={filters.googleStatus ?? ''}
                className="mt-1 block w-44 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">Tous</option>
                {GOOGLE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {googleStatusLabel(s)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="text-xs font-medium text-slate-500">
                Tri
              </label>
              <select
                id="sort"
                name="sort"
                defaultValue={typeof sp.sort === 'string' ? sp.sort : 'session_desc'}
                className="mt-1 block w-48 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="session_desc">Date formation ↓</option>
                <option value="session_asc">Date formation ↑</option>
                <option value="response_desc">Date réponse ↓</option>
                <option value="score_desc">Note ↓</option>
                <option value="name_asc">Nom A→Z</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="actions" value="1" defaultChecked={filters.actionsOnly} />
              Actions à effectuer
            </label>
            <button
              type="submit"
              className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Filtrer
            </button>
          </form>
          <div className="mt-6">
            <SatisfactionTableClient rows={rows} />
          </div>
        </OrgCard>
      </div>
    </div>
  );
}
