import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_EVOLUTIF_POINTS } from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function DevWebIaErpEvolutifSection() {
  return (
    <section
      id="outil-evolutif"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="outil-evolutif-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Évolution progressive</p>
        <h2 id="outil-evolutif-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Un outil qui grandit avec votre entreprise
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
          Vous commencez par les relevés d&apos;heures. Vous les reliez ensuite aux chantiers, puis au planning
          et au suivi des coûts. Chaque évolution est testée avant d&apos;être utilisée.
        </p>

        <ol className="mt-8 flex flex-wrap gap-2" aria-label="Exemple de progression pédagogique">
          {['Heures', 'Chantiers', 'Planning', 'Coûts'].map((step, index) => (
            <li key={step} className="inline-flex items-center gap-2">
              <span className="rounded-full bg-[#EFF6FF] px-3 py-1.5 text-sm font-semibold text-[#377CF3]">
                {step}
              </span>
              {index < 3 ? (
                <span className="text-slate-400" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_WEB_IA_EVOLUTIF_POINTS.map((item) => (
            <li key={item.title}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className={OFC_TYPE_H3}>{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.texte}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
