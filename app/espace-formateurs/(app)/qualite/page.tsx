import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchMissionsForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { fetchCompetencyEvaluationsForTrainer } from '@/lib/extranet-formateurs/queries-phase3';
import { QualiteTrainerView } from '@/components/espace-formateurs/QualiteTrainerView';

export default async function EspaceFormateursQualitePage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const [evaluations, missions] = await Promise.all([
    fetchCompetencyEvaluationsForTrainer(access.trainer.id),
    fetchMissionsForTrainer(access.trainer.id),
  ]);

  const missionsForFeedback = missions.filter((m) =>
    ['completed', 'in_progress', 'confirmed'].includes(m.status)
  );

  return (
    <QualiteTrainerView evaluations={evaluations} missionsForFeedback={missionsForFeedback} />
  );
}