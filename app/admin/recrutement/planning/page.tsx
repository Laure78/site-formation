import { CalendarDays } from 'lucide-react';
import { PlanningDossiersSection } from '@/components/admin/recrutement/PlanningInterviewBrief';
import { PlanningDayView } from '@/components/admin/recrutement/PlanningDayView';
import { RecruitmentSubnav } from '@/components/admin/recrutement/RecruitmentSubnav';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import { LINKS } from '@/lib/internal-links';
import { RECRUITMENT_DEFAULT_PLANNING_DATE } from '@/lib/recruitment/constants';
import { resolvePlanningDate } from '@/lib/recruitment/interview-slots';
import { listCandidatsForPlanningDate, listRecruitmentCandidats, listStaleNonRetenus } from '@/lib/recruitment/queries';
import { RgpdStaleBanner } from '@/components/admin/recrutement/RgpdStaleBanner';

type Props = { searchParams: Promise<{ date?: string }> };

export default async function AdminRecrutementPlanningPage({ searchParams }: Props) {
  const sp = await searchParams;
  const dateYmd = resolvePlanningDate(sp.date);
  const [dayCandidats, all, stale] = await Promise.all([
    listCandidatsForPlanningDate(dateYmd),
    listRecruitmentCandidats(),
    listStaleNonRetenus(),
  ]);

  const unscheduled = all.filter((c) => !c.interview_at);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-5xl space-y-6">
        <OrgPageHeader
          eyebrow="Administration · Recrutement"
          title="Planning entretiens"
          description="Créneaux de 30 minutes (10h00–12h30 et 14h00–17h00). Usage interne admin — dossiers, grilles et disponibilités ci-dessous."
          icon={<CalendarDays className="h-7 w-7 text-[#377CF3]" strokeWidth={1.5} aria-hidden />}
        />
        <RecruitmentSubnav />

        <RgpdStaleBanner candidats={stale} />

        <OrgCard>
          <form method="get" className="flex flex-wrap items-end gap-3">
            <label className="text-sm">
              Date
              <input
                type="date"
                name="date"
                defaultValue={dateYmd}
                className="mt-1 block rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white"
            >
              Afficher
            </button>
            <a
              href={`${LINKS.adminRecrutementPlanning}?date=${RECRUITMENT_DEFAULT_PLANNING_DATE}`}
              className="text-sm text-[#377CF3] hover:underline"
            >
              Journée 9 nov. 2026
            </a>
          </form>
        </OrgCard>

        <PlanningDayView dateYmd={dateYmd} candidats={dayCandidats} unscheduled={unscheduled} />

        <OrgCard>
          <h2 className="font-display text-lg font-bold text-slate-900">Dossiers entretien</h2>
          <p className="mt-1 text-sm text-slate-600">
            Résumé CV, disponibilités, déroulé et questions — grille de notation accessible sur chaque dossier.
          </p>
          <div className="mt-6">
            <PlanningDossiersSection candidats={all} />
          </div>
        </OrgCard>
      </div>
    </div>
  );
}
