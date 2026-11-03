import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchCharterAcceptance, fetchCurrentCharter } from '@/lib/extranet-formateurs/queries';
import { CharterPanel } from '@/components/espace-formateurs/CharterPanel';

export default async function EspaceFormateursChartePage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const charter = await fetchCurrentCharter();
  if (!charter) {
    return (
      <p className="text-sm text-slate-600">
        Aucune charte publiée pour le moment. Contactez contact@laureolivie.fr.
      </p>
    );
  }

  const acceptance = await fetchCharterAcceptance(access.trainer.id, charter.id);
  return <CharterPanel charter={charter} acceptance={acceptance} />;
}
