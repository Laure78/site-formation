import { TrainingSection } from '@/components/formations/training/TrainingSection';
import {
  ASSISTANTS_IA_ATELIERS,
  ASSISTANTS_IA_ATELIERS_NOTE,
  ASSISTANTS_IA_JOURNEE_TIMELINE,
  ASSISTANTS_IA_PREREQUIS_ITEMS,
  ASSISTANTS_IA_PUBLIC_ITEMS,
} from '@/lib/formation-assistants-ia-personnalises-btp-content';
import { ChevronDown, Layers, Users } from 'lucide-react';

const CAS_USAGE_SECTION_ID = 'assistants-metier';

export function AssistantsIaBtpProgrammeTimelineSection() {
  return (
    <TrainingSection
      id="planning-journee"
      title="Planning de la demi-journée"
      description="Créneau type — matin ou après-midi selon convocation."
      tone="muted"
    >
      <details className="group rounded-2xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3.5 text-base font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
          Horaires détaillés et pauses
          <ChevronDown
            className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <ol className="space-y-2 border-t border-slate-100 px-4 py-4">
          {ASSISTANTS_IA_JOURNEE_TIMELINE.map((step) => (
            <li key={step} className="text-base text-slate-800">
              {step}
            </li>
          ))}
        </ol>
      </details>
    </TrainingSection>
  );
}

export function AssistantsIaBtpAteliersSection() {
  return (
    <TrainingSection
      id={CAS_USAGE_SECTION_ID}
      title="Six assistants métier possibles"
      description={ASSISTANTS_IA_ATELIERS_NOTE}
      tone="white"
      icon={Layers}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ASSISTANTS_IA_ATELIERS.map((atelier) => (
          <article
            key={atelier.id}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm"
          >
            <h3 className="font-display text-lg font-semibold text-[#101936]">{atelier.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{atelier.description}</p>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cas d&apos;usage</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-800">
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
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                4 skills (bibliothèque)
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {atelier.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
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

export function AssistantsIaBtpPublicPrerequisCompact() {
  return (
    <TrainingSection id="public-prerequis" title="À qui s'adresse la formation ?" tone="white" icon={Users}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
          <h3 className="font-display text-lg font-semibold text-[#101936]">Public concerné</h3>
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
        <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
          <h3 className="font-display text-lg font-semibold text-[#101936]">Prérequis</h3>
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
