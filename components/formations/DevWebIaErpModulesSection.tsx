import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_ERP_MODULES } from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

/** Illustration pédagogique : modules reliés autour du chantier (exemple, non exhaustif). */
function ErpArchitectureIllustration() {
  const satellites = [
    'Commercial',
    'Heures',
    'Planning',
    'Chantier',
    'Achats',
    'Tableau de bord',
  ];

  return (
    <div
      className="relative mx-auto mt-10 max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
      role="img"
      aria-label="Exemple pédagogique : modules d’ERP BTP reliés autour du chantier"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        Exemple pédagogique
      </p>
      <div className="relative mx-auto mt-6 flex h-56 items-center justify-center sm:h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-28 w-28 rounded-full border-2 border-[#377CF3]/40 bg-[#EFF6FF] sm:h-32 sm:w-32" />
        </div>
        <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#377CF3] text-center text-white sm:h-28 sm:w-28">
          <span className="text-[0.65rem] font-semibold uppercase tracking-wide">Chantier</span>
          <span className="mt-1 px-2 text-[0.7rem] font-medium leading-tight">Cœur de l’activité</span>
        </div>
        {satellites.map((label, index) => {
          const angle = (index / satellites.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 42;
          const left = 50 + radius * Math.cos(angle);
          const top = 50 + radius * Math.sin(angle);
          return (
            <div
              key={label}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[0.65rem] font-semibold text-slate-800 shadow-sm"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {label}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
        Les modules se relient progressivement autour du chantier — schéma illustratif, non un logiciel prêt à
        l&apos;emploi.
      </p>
    </div>
  );
}

export function DevWebIaErpModulesSection() {
  return (
    <section
      id="modules-erp"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="modules-erp-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Architecture modulaire</p>
        <h2 id="modules-erp-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Quelles applications métier BTP créer avec l&apos;IA sans coder&nbsp;?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Ces modules constituent des pistes d&apos;évolution. Pendant la formation, vous travaillez sur un
          périmètre adapté à votre niveau et à la durée choisie.
        </p>

        <ErpArchitectureIllustration />

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
                      À mettre en avant
                    </span>
                  ) : null}
                </div>
                <h3 className={`${OFC_TYPE_H3} mt-2`}>{module.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{module.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
