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
        <p className={OFC_EYEBROW}>Exemples concrets</p>
        <h2 id="modules-erp-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{subtitle}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <h3 className={OFC_TYPE_H3}>{module.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                  {module.description}
                </p>
                {module.disclaimer ? (
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{module.disclaimer}</p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
          {note}
        </p>
      </div>
    </section>
  );
}
