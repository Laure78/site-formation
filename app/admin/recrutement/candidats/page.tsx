import Link from 'next/link';
import { Users } from 'lucide-react';
import { PlanningDossiersSection } from '@/components/admin/recrutement/PlanningInterviewBrief';
import { RecruitmentNdaBadge } from '@/components/admin/recrutement/RecruitmentNdaBadge';
import { RecruitmentTriageBadge } from '@/components/admin/recrutement/RecruitmentTriageBadge';
import { RgpdStaleBanner } from '@/components/admin/recrutement/RgpdStaleBanner';
import { RecruitmentStatusBadge } from '@/components/admin/recrutement/RecruitmentStatusBadge';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import { adminRecrutementCandidat } from '@/lib/internal-links';
import {
  formatRecruitmentFormations,
  RECRUITMENT_BTP_EXPERIENCE,
  RECRUITMENT_FORMATION_OPTIONS,
  RECRUITMENT_NDA_STATUS,
  RECRUITMENT_STATUS,
  RECRUITMENT_TRIAGE_STATUS,
  type RecruitmentNdaStatus,
  type RecruitmentStatus,
  type RecruitmentTriageStatus,
} from '@/lib/recruitment/constants';
import { listRecruitmentCandidats, listStaleNonRetenus } from '@/lib/recruitment/queries';

type Props = {
  searchParams: Promise<{
    status?: string;
    stage?: string;
    formation?: string;
    nda_status?: string;
    triage_status?: string;
    btp_experience_status?: string;
    q?: string;
  }>;
};

export default async function AdminRecrutementCandidatsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filters = {
    status: sp.status,
    stage: sp.stage,
    formation: sp.formation,
    nda_status: sp.nda_status,
    triage_status: sp.triage_status,
    btp_experience_status: sp.btp_experience_status,
    q: sp.q,
  };
  const [rows, stale, allCandidats] = await Promise.all([
    listRecruitmentCandidats(filters),
    listStaleNonRetenus(),
    listRecruitmentCandidats(),
  ]);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-7xl space-y-6">
        <OrgPageHeader
          eyebrow="Administration · Recrutement"
          title="Candidats formateurs"
          description="Dossiers entretien (CV, dispos, questions), puis liste et filtres."
          icon={<Users className="h-7 w-7 text-[#377CF3]" strokeWidth={1.5} aria-hidden />}
        />
        <RgpdStaleBanner candidats={stale} />

        <OrgCard>
          <h2 className="font-display text-lg font-bold text-slate-900">Dossiers entretien</h2>
          <p className="mt-1 text-sm text-slate-600">
            Résumé CV, disponibilités, déroulé et questions — grille accessible sur chaque dossier.
          </p>
          <div className="mt-6">
            <PlanningDossiersSection candidats={allCandidats} />
          </div>
        </OrgCard>

        <OrgCard>
          <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm lg:col-span-2">
              Recherche nom
              <input
                name="q"
                defaultValue={sp.q ?? ''}
                placeholder="Nom ou prénom"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Statut pipeline
              <select name="status" defaultValue={sp.status ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value="">Tous</option>
                {Object.entries(RECRUITMENT_STATUS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Vivier
              <select
                name="triage_status"
                defaultValue={sp.triage_status ?? ''}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              >
                <option value="">Tous</option>
                {Object.entries(RECRUITMENT_TRIAGE_STATUS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              NDA
              <select name="nda_status" defaultValue={sp.nda_status ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value="">Tous</option>
                {Object.entries(RECRUITMENT_NDA_STATUS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Expérience BTP
              <select
                name="btp_experience_status"
                defaultValue={sp.btp_experience_status ?? ''}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              >
                <option value="">Toutes</option>
                {Object.entries(RECRUITMENT_BTP_EXPERIENCE).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Étape
              <select name="stage" defaultValue={sp.stage ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value="">Toutes</option>
                <option value="1">Étape 1</option>
                <option value="2">Étape 2</option>
              </select>
            </label>
            <label className="text-sm">
              Formation
              <select name="formation" defaultValue={sp.formation ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value="">Toutes</option>
                {RECRUITMENT_FORMATION_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              <button type="submit" className="w-full rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
                Filtrer
              </button>
            </div>
          </form>
        </OrgCard>

        <OrgCard className="overflow-x-auto p-0">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-[#F2F2F2] text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Formateur</th>
                <th className="px-4 py-3">Profil</th>
                <th className="px-4 py-3">NDA</th>
                <th className="px-4 py-3">Disponibilité</th>
                <th className="px-4 py-3">Statut vivier</th>
                <th className="px-4 py-3 hidden md:table-cell">Pipeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-slate-500">
                    Aucun candidat.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">
                      <Link
                        href={adminRecrutementCandidat(r.id)}
                        className="font-medium text-[#377CF3] hover:underline"
                      >
                        {r.first_name} {r.last_name}
                        {r.is_example ? ' (Exemple)' : ''}
                      </Link>
                      <p className="text-xs text-slate-500">{r.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{r.current_role ?? '—'}</td>
                    <td className="px-4 py-3">
                      <RecruitmentNdaBadge status={r.nda_status as RecruitmentNdaStatus | null} />
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {r.availability_summary ?? r.availability_notes?.slice(0, 48) ?? '—'}
                      {r.notice_period ? (
                        <p className="text-xs text-slate-500">Préavis : {r.notice_period}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <RecruitmentTriageBadge status={r.triage_status as RecruitmentTriageStatus | null} />
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <RecruitmentStatusBadge status={r.status as RecruitmentStatus} />
                      <p className="mt-1 text-xs text-slate-500">{formatRecruitmentFormations(r.formations)}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </OrgCard>
      </div>
    </div>
  );
}
