import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_FIL_ROUGE } from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW } from '@/lib/ofc-interaction-classes';

export function DevWebIaFilRougeSection() {
  const { title, lead, steps, closing } = DEV_WEB_IA_FIL_ROUGE;

  return (
    <section
      id="fil-rouge-heures"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="fil-rouge-heures-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Projet fil rouge</p>
        <h2 id="fil-rouge-heures-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{lead}</p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="relative flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="text-sm font-medium leading-snug text-slate-800">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl rounded-xl border border-[#377CF3]/25 bg-[#EFF6FF]/50 px-4 py-4 text-sm font-medium leading-relaxed text-slate-800">
          {closing}
        </p>
      </div>
    </section>
  );
}
