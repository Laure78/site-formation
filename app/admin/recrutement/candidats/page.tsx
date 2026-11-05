import Link from 'next/link';
import { Users } from 'lucide-react';
import { RecruitmentSubnav } from '@/components/admin/recrutement/RecruitmentSubnav';
import { RecruitmentStatusBadge } from '@/components/admin/recrutement/RecruitmentStatusBadge';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import { adminRecrutementCandidat } from '@/lib/internal-links';
import {
  formatRecruitmentFormations,
  RECRUITMENT_FORMATION_OPTIONS,
  RECRUITMENT_STATUS,
  type RecruitmentStatus,
} from '@/lib/recruitment/constants';
import { listRecruitmentCandidats } from '@/lib/recruitment/queries';

type Props = {
  searchParams: Promise<{ status?: string; stage?: string; formation?: string; q?: string }>;
};

export default async function AdminRecrutementCandidatsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const rows = await listRecruitmentCandidats({
    status: sp.status,
    stage: sp.stage,
    formation: sp.formation,
    q: sp.q,
  });

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-7xl space-y-6">
        <OrgPageHeader
          eyebrow="Administration · Recrutement"
          title="Candidats formateurs"
          description="Filtrez par statut, étape ou formation. Recherche par nom."
          icon={<Users className="h-7 w-7 text-[#377CF3]" strokeWidth={1.5} aria-hidden />}
        />
        <RecruitmentSubnav />

        <OrgCard>
          <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-sm">
              Recherche nom
              <input
                name="q"
                defaultValue={sp.q ?? ''}
                placeholder="Nom ou prénom"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Statut
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
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-[#F2F2F2] text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Candidat</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Étape</th>
                <th className="px-4 py-3">Formations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-slate-500">
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
                    <td className="px-4 py-3">
                      <RecruitmentStatusBadge status={r.status as RecruitmentStatus} />
                    </td>
                    <td className="px-4 py-3">{r.stage}</td>
                    <td className="px-4 py-3 text-slate-600">{formatRecruitmentFormations(r.formations)}</td>
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
