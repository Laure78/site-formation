import Link from 'next/link';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchProgramsForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateursProgrammesPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const programs = await fetchProgramsForTrainer(access.trainer.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Programmes</h1>
        <p className="mt-2 text-sm text-slate-600">
          Programmes pédagogiques validés qui vous sont attribués (version de référence).
        </p>
      </header>

      {programs.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
          Aucun programme attribué pour le moment.
        </p>
      ) : (
        <ul className="space-y-3">
          {programs.map((p) => (
            <li key={p.id}>
              <Link
                href={`${LINKS.espaceFormateursProgrammes}/${p.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#377CF3]/40"
              >
                <p className="font-semibold text-slate-900">{p.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {p.current_version?.version_label ? `Version ${p.current_version.version_label}` : 'Sans version'}
                  {p.catalogue_code ? ` · ${p.catalogue_code}` : ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
