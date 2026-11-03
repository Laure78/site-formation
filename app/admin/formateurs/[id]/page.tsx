import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdminAccess } from '@/lib/admin-access';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import { TrainerAdminPanel } from '@/components/admin/formateurs/TrainerAdminPanel';
import { TrainerGrantsPanel } from '@/components/admin/formateurs/TrainerGrantsPanel';
import { CompetencyEvaluationForm } from '@/components/admin/formateurs/CompetencyEvaluationForm';
import { SubcontractorControlForm } from '@/components/admin/formateurs/SubcontractorControlForm';
import {
  fetchCompetencyEvaluationsForTrainer,
  fetchLatestSubcontractorControl,
} from '@/lib/extranet-formateurs/queries-phase3';
import { fetchTrainerById, fetchTrainerDocuments } from '@/lib/extranet-formateurs/queries';
import {
  fetchProgramsForAdmin,
  fetchResourcesForAdmin,
} from '@/lib/extranet-formateurs/queries-phase2';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';

export default async function AdminFormateurDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const access = await requireAdminAccess();
  if (!access.ok) return null;

  const { id } = await params;
  const trainer = await fetchTrainerById(id);
  if (!trainer) notFound();

  const docs = await fetchTrainerDocuments(trainer.id);
  const [programs, resources, compEvals, subcontractControl] = await Promise.all([
    fetchProgramsForAdmin(),
    fetchResourcesForAdmin(),
    fetchCompetencyEvaluationsForTrainer(trainer.id),
    fetchLatestSubcontractorControl(trainer.id),
  ]);
  const admin = createAdminClient();
  const { data: programGrants } = await admin
    .from('extranet_trainer_program_grants')
    .select('program_id')
    .eq('trainer_id', trainer.id);
  const { data: resourceGrants } = await admin
    .from('extranet_trainer_resource_grants')
    .select('resource_id')
    .eq('trainer_id', trainer.id);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateurs} />
      <Link href={LINKS.adminFormateurs} className="text-sm font-medium text-[#377CF3] hover:underline">
        ← Retour à la liste
      </Link>
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          {[trainer.first_name, trainer.last_name].filter(Boolean).join(' ') || trainer.email}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{trainer.email}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a
            href={`/api/admin/formateurs/export/${trainer.id}?format=json`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#377CF3] hover:bg-slate-50"
          >
            Export audit JSON
          </a>
          <a
            href={`/api/admin/formateurs/export/${trainer.id}?format=zip`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#377CF3] hover:bg-slate-50"
          >
            Export audit ZIP
          </a>
        </div>
      </header>
      <TrainerGrantsPanel
        trainerId={trainer.id}
        programs={programs}
        resources={resources}
        grantedProgramIds={(programGrants ?? []).map((g) => g.program_id)}
        grantedResourceIds={(resourceGrants ?? []).map((g) => g.resource_id)}
      />
      <CompetencyEvaluationForm trainerId={trainer.id} history={compEvals} />
      <SubcontractorControlForm trainerId={trainer.id} latest={subcontractControl} />
      <TrainerAdminPanel trainer={trainer} documents={docs} />
    </div>
  );
}
