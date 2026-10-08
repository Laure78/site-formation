import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import {
  DEV_WEB_IA_CAS_USAGE,
  DEV_WEB_IA_CAS_USAGE_SECTION,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function DevWebIaCasUsageSection() {
  const { title, lead } = DEV_WEB_IA_CAS_USAGE_SECTION;

  return (
    <section
      id="exemples-erp"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="exemples-erp-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Cas d&apos;usage BTP</p>
        <h2 id="exemples-erp-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{lead}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_WEB_IA_CAS_USAGE.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
                <h3 className={OFC_TYPE_H3}>{item.title}</h3>
                <ol className="mt-4 flex flex-wrap items-center gap-1.5">
                  {item.steps.map((step, index) => (
                    <li key={step} className="inline-flex items-center gap-1.5">
                      <span className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-xs font-semibold text-[#377CF3]">
                        {step}
                      </span>
                      {index < item.steps.length - 1 ? (
                        <span className="text-slate-300" aria-hidden>
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
