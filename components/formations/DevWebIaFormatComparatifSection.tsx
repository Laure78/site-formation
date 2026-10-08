import { Check } from 'lucide-react';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_FORMAT_COMPARATIF } from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function DevWebIaFormatComparatifSection() {
  const { title, tagline, parcours7h, parcours14h } = DEV_WEB_IA_FORMAT_COMPARATIF;

  return (
    <section
      id="quel-format"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="quel-format-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Comparer les formats</p>
        <h2 id="quel-format-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          {title}
        </h2>

        <p className="mt-6 rounded-2xl border border-[#377CF3]/30 bg-[#EFF6FF]/40 px-5 py-4 text-center font-display text-lg font-bold text-slate-900 md:text-xl">
          {tagline}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className={OFC_TYPE_H3}>{parcours7h.title}</h3>
            <p className="mt-2 text-sm font-medium text-[#377CF3]">Idéal pour :</p>
            <ul className="mt-4 space-y-2.5">
              {parcours7h.ideals.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <a href="#parcours-7h" className="text-sm font-semibold text-[#377CF3] hover:underline">
                Voir le parcours 7 h
              </a>
            </p>
          </article>

          <article className="rounded-2xl border border-[#377CF3] bg-white p-6 shadow-[0_8px_24px_rgba(55,124,243,0.1)]">
            <h3 className={OFC_TYPE_H3}>{parcours14h.title}</h3>
            <p className="mt-2 text-sm font-medium text-[#377CF3]">Idéal pour :</p>
            <ul className="mt-4 space-y-2.5">
              {parcours14h.ideals.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <a href="#parcours-14h" className="text-sm font-semibold text-[#377CF3] hover:underline">
                Voir le parcours 14 h
              </a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
