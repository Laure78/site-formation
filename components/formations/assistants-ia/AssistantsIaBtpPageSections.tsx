import { TrainingSection } from '@/components/formations/training/TrainingSection';
import {
  ASSISTANTS_IA_ATELIERS,
  ASSISTANTS_IA_ATELIERS_NOTE,
  ASSISTANTS_IA_CREATIONS,
  ASSISTANTS_IA_JOURNEE_TIMELINE,
  ASSISTANTS_IA_PREREQUIS_ITEMS,
  ASSISTANTS_IA_PUBLIC_ITEMS,
} from '@/lib/formation-assistants-ia-personnalises-btp-content';
import { Layers, Users } from 'lucide-react';

export function AssistantsIaBtpCreationsSection() {
  return (
    <TrainingSection
      id="ce-que-vous-creez"
      title="Ce que vous allez créer"
      description="Résultats concrets de la journée — 4 assistants visés, skills et ressources pour la suite."
      tone="muted"
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ASSISTANTS_IA_CREATIONS.map((item) => (
          <li
            key={item.title}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-4 py-4 md:px-5"
          >
            <h3 className="font-display text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-slate-700">{item.text}</p>
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}

export function AssistantsIaBtpAteliersSection() {
  return (
    <TrainingSection
      id="assistants-metier"
      title="Six assistants métier possibles"
      description={ASSISTANTS_IA_ATELIERS_NOTE}
      tone="white"
      icon={Layers}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ASSISTANTS_IA_ATELIERS.map((atelier) => (
          <article
            key={atelier.id}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
          >
            <h3 className="font-display text-lg font-semibold text-slate-900">{atelier.title}</h3>
            <p className="mt-2 text-base text-slate-700">{atelier.description}</p>
            <div className="mt-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Cas d&apos;usage</p>
              <ul className="mt-2 space-y-1 text-base text-slate-800">
                {atelier.usages.map((u) => (
                  <li key={u} className="flex gap-2">
                    <span className="text-[#377CF3]" aria-hidden>
                      ·
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                4 skills (bibliothèque)
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {atelier.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-sm font-medium text-slate-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </TrainingSection>
  );
}

export function AssistantsIaBtpProgrammeTimelineSection() {
  return (
    <TrainingSection
      id="planning-journee"
      title="Planning de la journée"
      description="7 heures annoncées — pauses 10h45–11h00 et 15 min incluse en module 3 (temps pédagogique effectif ~6h30)."
      tone="muted"
    >
      <ol className="space-y-2 border-l-2 border-[#377CF3]/30 pl-4">
        {ASSISTANTS_IA_JOURNEE_TIMELINE.map((step) => (
          <li key={step} className="text-base text-slate-800">
            {step}
          </li>
        ))}
      </ol>
    </TrainingSection>
  );
}

export function AssistantsIaBtpPublicPrerequisCompact() {
  return (
    <TrainingSection id="public-prerequis" title="À qui s'adresse la formation ?" tone="white" icon={Users}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-display text-lg font-semibold text-slate-900">Public concerné</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-800">
            {ASSISTANTS_IA_PUBLIC_ITEMS.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-[#377CF3]" aria-hidden>
                  ·
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-display text-lg font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-800">
            {ASSISTANTS_IA_PREREQUIS_ITEMS.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-[#377CF3]" aria-hidden>
                  ·
                </span>
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Vous devez déjà utiliser ChatGPT ou Claude au quotidien. Les abonnements ou comptes entreprise
            compatibles doivent être actifs avant le début de la session.
          </p>
        </div>
      </div>
    </TrainingSection>
  );
}
