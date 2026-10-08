import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_BENEFICES, DEV_WEB_IA_ERP_DEFINITION } from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function DevWebIaErpBeneficesSection() {
  return (
    <section
      id="erp-organisation"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="erp-organisation-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Objectifs du projet</p>
        <h2 id="erp-organisation-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Un ERP qui suit votre organisation
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          {DEV_WEB_IA_ERP_DEFINITION}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_WEB_IA_BENEFICES.map((item) => (
            <li key={item.title}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2]/60 p-5">
                <h3 className={OFC_TYPE_H3}>{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{item.texte}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
