import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import {
  DEV_WEB_IA_ERP_MODULES,
  DEV_WEB_IA_ERP_MODULES_SECTION,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

export function DevWebIaErpModulesSection() {
  const { title, subtitle, note } = DEV_WEB_IA_ERP_MODULES_SECTION;

  return (
    <section
      id="modules-erp"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="modules-erp-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Modules métier possibles</p>
        <h2 id="modules-erp-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{subtitle}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">{note}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {DEV_WEB_IA_ERP_MODULES.map((module) => (
            <li key={module.id}>
              <article
                className={cn(
                  'flex h-full flex-col rounded-2xl border bg-white p-5',
                  module.highlighted
                    ? 'border-[#377CF3] shadow-[0_8px_24px_rgba(55,124,243,0.12)]'
                    : 'border-slate-200',
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">
                    Module {module.number}
                  </span>
                  {module.highlighted ? (
                    <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[#377CF3]">
                      Souvent prioritaire
                    </span>
                  ) : null}
                </div>
                <h3 className={`${OFC_TYPE_H3} mt-2`}>{module.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{module.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {module.useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="rounded-full bg-[#F2F2F2] px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {useCase}
                    </li>
                  ))}
                </ul>
                {module.disclaimer ? (
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">{module.disclaimer}</p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
