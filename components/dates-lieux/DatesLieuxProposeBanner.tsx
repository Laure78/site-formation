import type { DatesLieuxProposeFormProps } from '@/components/dates-lieux/DatesLieuxProposeForm';
import { DatesLieuxProposeForm } from '@/components/dates-lieux/DatesLieuxProposeForm';

export function DatesLieuxProposeBanner({ formationOptions }: DatesLieuxProposeFormProps) {
  return (
    <section
      id="proposer-date"
      className="scroll-mt-24 overflow-hidden bg-[#101936] text-white"
      aria-labelledby="dates-lieux-propose-h2"
    >
      <div className="relative mx-auto grid max-w-[80rem] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
        <div
          className="pointer-events-none absolute -right-16 top-1/2 hidden h-64 w-64 -translate-y-1/2 opacity-20 lg:block"
          aria-hidden
        >
          <div className="h-full w-full rotate-12 bg-[linear-gradient(135deg,#377CF3_25%,transparent_25%,transparent_50%,#377CF3_50%,#377CF3_75%,transparent_75%)] bg-[length:24px_24px]" />
        </div>
        <div>
          <h2 id="dates-lieux-propose-h2" className="font-display text-2xl font-bold md:text-3xl">
            Aucune date ne vous convient ?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
            Proposez vos disponibilités pour que nous organisions une session adaptée à votre équipe, en
            présentiel en Île-de-France.
          </p>
        </div>
        <div
          id="formulaire-proposer-date"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6"
        >
          <DatesLieuxProposeForm formationOptions={formationOptions} />
        </div>
      </div>
    </section>
  );
}
