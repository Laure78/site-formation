import Link from 'next/link';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { missionToAgendaSession } from '@/lib/extranet-formateurs/agenda';
import { fetchMissionsForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { FormateurAgendaCalendar } from '@/components/espace-formateurs/FormateurAgendaCalendar';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateursAgendaPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const missions = await fetchMissionsForTrainer(access.trainer.id);
  const sessions = missions.map(missionToAgendaSession);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Agenda</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Sessions et interventions planifiées par OFC Création d&apos;Entreprise. Les créneaux
          affichés proviennent des missions qui vous sont attribuées — présentiel Île-de-France.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          <Link href={LINKS.espaceFormateursInterventions} className="font-medium text-[#377CF3] hover:underline">
            Voir la liste des interventions
          </Link>
        </p>
      </header>

      <FormateurAgendaCalendar sessions={sessions} />
    </div>
  );
}