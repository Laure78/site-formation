import {
  getIaFonctionnalite,
  labelOutil,
  type FormationIaApplicationsBundle,
  type FormationIaUsage,
} from '@/lib/formation-ia';
import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  bundle: FormationIaApplicationsBundle;
  /** Ancre de section (nav sticky). */
  id?: string;
};

function UsageCard({ usage }: { usage: FormationIaUsage }) {
  const feature = getIaFonctionnalite(usage.fonctionnaliteId);
  const badges: string[] = [labelOutil(usage.outil), feature.label];
  if (usage.demoFormateur) badges.push('Démo formateur');
  if (usage.pratiqueParticipant !== false) badges.push('Pratique participant');

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[#377CF3]">
            {usage.moduleLabel}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">
            {usage.competenceMetier}
          </h3>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Outils et modalités">
          {badges.map((b) => (
            <li
              key={b}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-4 grid gap-3 text-base text-slate-700 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-semibold text-slate-900">Tâche confiée à l’IA</dt>
          <dd className="mt-0.5">{usage.tacheIa}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-900">Documents ou données</dt>
          <dd className="mt-0.5">{usage.documentsOuDonnees}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-900">Travail du participant</dt>
          <dd className="mt-0.5">{usage.travailParticipant}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-900">Livrable attendu</dt>
          <dd className="mt-0.5">{usage.livrable}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-900">Contrôles humains</dt>
          <dd className="mt-0.5">{usage.controlesHumains}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-900">Critère d’évaluation</dt>
          <dd className="mt-0.5">{usage.critereEvaluation}</dd>
        </div>
      </dl>

      <details className="mt-4 rounded-xl border border-slate-100 bg-slate-50 open:bg-slate-50">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]">
          Fonctionnalité mobilisée — prérequis et alternative
        </summary>
        <div className="space-y-2 border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
          <p>{feature.description}</p>
          <p>
            <span className="font-semibold text-slate-900">Prérequis : </span>
            {feature.prerequisTechniques}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Accès : </span>
            {feature.accesEtAbonnement}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Si indisponible : </span>
            {feature.remplacementPedagogique}
          </p>
          <p className="text-slate-500">
            Source :{' '}
            <a
              href={feature.sourceUrl}
              className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              rel="noopener noreferrer"
              target="_blank"
            >
              {feature.sourceLabel}
            </a>
          </p>
        </div>
      </details>
    </article>
  );
}

/**
 * Section visible sur fiche formation : usages IA intégrés au déroulé
 * et critères d’évaluation par exercice.
 */
export function FormationIaApplicationsSection({
  bundle,
  id = 'applications-ia',
}: Props) {
  return (
    <TrainingSection id={id} title={bundle.title} tone="muted">
      <p className="max-w-3xl text-base leading-relaxed text-slate-700">{bundle.intro}</p>

      <div className="mt-6 space-y-4">
        {bundle.usages.map((usage) => (
          <UsageCard key={usage.id} usage={usage} />
        ))}
      </div>
    </TrainingSection>
  );
}
