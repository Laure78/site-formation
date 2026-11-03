import Link from 'next/link';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchMissionsForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { MISSION_STATUS_LABELS } from '@/lib/extranet-formateurs/phase2-types';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateursInterventionsPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const missions = await fetchMissionsForTrainer(access.trainer.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Mes interventions</h1>
        <p className="mt-2 text-sm text-slate-600">Missions qui vous sont confiées par OFC.</p>
      </header>

      {missions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
          Aucune intervention planifiée.
        </p>
      ) : (
        <ul className="space-y-3">
          {missions.map((m) => (
            <li key={m.id}>
              <Link
                href={`${LINKS.espaceFormateursInterventions}/${m.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#377CF3]/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{m.title}</p>
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {MISSION_STATUS_LABELS[m.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {new Date(m.starts_on).toLocaleDateString('fr-FR')}
                  {m.client_company_name ? ` · ${m.client_company_name}` : ''}
                  {m.location_city ? ` · ${m.location_city}` : ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
