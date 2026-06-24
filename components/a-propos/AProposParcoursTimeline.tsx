/**
 * Parcours chronologique — dates explicites pour GEO / extraction LLM.
 */
import { LAURE_OLIVIE_PARCOURS_CONDENSE } from '@/lib/laure-olivie-profile';

const TIMELINE = LAURE_OLIVIE_PARCOURS_CONDENSE;

export function AProposParcoursTimeline() {
  return (
    <section
      id="parcours"
      className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16"
      aria-labelledby="titre-parcours"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="titre-parcours"
          className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl"
        >
          Parcours
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
          Parcours vérifiable : ALIA BTP (terrain), OFC (formation IA, Qualiopi), LinkedIn Learning et
          partenariats institutionnels.
        </p>
        <ol
          aria-label="Parcours Laure Olivié"
          className="relative mt-12 space-y-8 border-l-2 border-[#377CF3] pl-6"
        >
          {TIMELINE.map((item) => (
            <li key={item.datetime} className="relative">
              <p className="text-lg font-bold text-[#377CF3] md:text-xl">{item.datetime}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
