import {
  CONSULTANT_SELECTION_DISCLAIMER,
  CONSULTANT_SELECTION_STEPS,
} from '@/lib/consultant-recruitment-content';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantSelectionTimeline() {
  return (
    <section
      id="parcours-selection"
      className={`${ofcSectionClasses({ tone: 'soft', size: 'compact', divide: true })} bg-[#EAF3FF] scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="parcours-selection-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2 id="parcours-selection-heading" className={`${OFC_TYPE_H2} text-center text-[#101936]`}>
          Processus de recrutement
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONSULTANT_SELECTION_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative flex flex-col rounded-2xl border border-white/90 bg-white px-4 py-5 text-center shadow-sm"
            >
              <span
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3] font-display text-lg font-bold text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <p className="mt-3 font-display text-base font-bold text-[#101936]">{step.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
          {CONSULTANT_SELECTION_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
