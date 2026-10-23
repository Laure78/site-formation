import Link from 'next/link';
import {
  CONSULTANT_SELECTION_DISCLAIMER,
  CONSULTANT_SELECTION_STEPS,
} from '@/lib/consultant-recruitment-content';
import { OFC_CTA_PRIMARY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export function ConsultantSelectionTimeline() {
  return (
    <section
      id="parcours-selection"
      className={`${ofcSectionClasses({ tone: 'white', size: 'default' })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="parcours-selection-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
        <h2 id="parcours-selection-heading" className={OFC_TYPE_H2}>
          Comment proposer votre expertise ?
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          Découvrez les principales étapes d&apos;étude d&apos;une proposition de collaboration.
        </p>

        <ol className="relative mt-10 grid gap-6 md:grid-cols-4 md:gap-4">
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-slate-200 md:block"
            aria-hidden
          />
          {CONSULTANT_SELECTION_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6"
            >
              <span
                className="font-display text-xl font-bold tracking-tight text-[#377CF3] md:text-2xl"
                aria-hidden
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-base font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm leading-relaxed text-slate-600">{CONSULTANT_SELECTION_DISCLAIMER}</p>

        <Link
          href="#candidature"
          className={`${OFC_CTA_PRIMARY} mt-8 inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
        >
          Proposer mon expertise
        </Link>
      </div>
    </section>
  );
}
