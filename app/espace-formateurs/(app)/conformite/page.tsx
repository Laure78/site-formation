import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { computeCompleteness } from '@/lib/extranet-formateurs/completeness';
import { computeInterventionReadiness } from '@/lib/extranet-formateurs/qualiopi-compliance';
import {
  fetchCompetencyEvaluationsForTrainer,
  fetchLatestSubcontractorControl,
  fetchQualityActionsForTrainer,
} from '@/lib/extranet-formateurs/queries-phase3';
import { fetchCharterAcceptance, fetchCurrentCharter, fetchTrainerDocuments } from '@/lib/extranet-formateurs/queries';
import { QualiopiConformiteDashboard } from '@/components/espace-formateurs/QualiopiConformiteDashboard';

export default async function EspaceFormateursConformitePage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const { trainer } = access;
  const [docs, charter, evaluations, subcontractorControl, actions] = await Promise.all([
    fetchTrainerDocuments(trainer.id),
    fetchCurrentCharter(),
    fetchCompetencyEvaluationsForTrainer(trainer.id),
    fetchLatestSubcontractorControl(trainer.id),
    fetchQualityActionsForTrainer(trainer.id),
  ]);

  const acceptance =
    charter != null ? await fetchCharterAcceptance(trainer.id, charter.id) : null;
  const completeness = computeCompleteness(trainer, docs, Boolean(acceptance));
  const readiness = computeInterventionReadiness({
    trainer,
    charterAccepted: Boolean(acceptance),
    completeness,
    subcontractorControl,
  });

  const openActionsCount = actions.filter((a) => a.status !== 'closed').length;

  return (
    <QualiopiConformiteDashboard
      readiness={readiness}
      evaluations={evaluations}
      subcontractorControl={subcontractorControl}
      openActionsCount={openActionsCount}
    />
  );
}