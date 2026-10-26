import {
  CONSULTANT_SELECTION_DISCLAIMER,
  CONSULTANT_SELECTION_STEPS,
} from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantSelectionTimeline() {
  return (
    <section
      id="parcours-selection"
      className={`${ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="parcours-selection-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="parcours-selection-heading" className={OFC_TYPE_H2}>
          Les étapes de votre candidature
        </h2>

        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONSULTANT_SELECTION_STEPS.map((step, index) => (
            <li
              key={step}
              className="rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm leading-relaxed text-slate-700"
            >
              <span className="font-display font-bold text-[#377CF3]" aria-hidden>
                {index + 1}.{' '}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className={`mt-4 text-sm leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          {CONSULTANT_SELECTION_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
