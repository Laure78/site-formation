import { OFC_SEC } from '@/lib/ofc-section-classes';
import { DEPARTEMENT_CAS_USAGE_STANDARD } from '@/lib/departement-pages/shared';

/** Cinq cas d’usage standard — texte IDENTIQUE sur toutes les pages département. */
export function DepartementCasUsageStandard() {
  return (
    <section className={OFC_SEC.white}>
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Les 5 cas d&apos;usage standard travaillés en formation
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
          Ces usages sont adaptés au vocabulaire du BTP ; chaque sortie reste une base de relecture,
          jamais un envoi sans validation interne.
        </p>
        <ol className="mt-8 list-decimal space-y-4 pl-5 text-base text-slate-700 marker:font-semibold md:text-lg">
          {DEPARTEMENT_CAS_USAGE_STANDARD.map((item) => (
            <li key={item} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
