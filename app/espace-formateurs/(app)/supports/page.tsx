import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchResourcesForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { SupportsListClient } from '@/components/espace-formateurs/SupportsListClient';

export default async function EspaceFormateursSupportsPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const resources = await fetchResourcesForTrainer(access.trainer.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Supports</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ressources réservées aux formateurs — distinctes des supports mis à disposition des
          apprenants en session.
        </p>
      </header>
      <SupportsListClient resources={resources} />
    </div>
  );
}
