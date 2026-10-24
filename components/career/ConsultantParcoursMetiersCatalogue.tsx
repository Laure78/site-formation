import Link from 'next/link';
import { getConsultantParcoursMetiersOptions } from '@/lib/consultant-parcours-metiers-options';

export function ConsultantParcoursMetiersCatalogue() {
  const parcours = getConsultantParcoursMetiersOptions();

  return (
    <ul className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {parcours.map((p) => (
        <li
          key={p.id}
          className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
        >
          <div className="min-w-0 flex-1">
            <p className="font-medium text-slate-900">{p.titre}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.benefice}</p>
            <p className="mt-2 text-sm text-slate-500">
              {p.dureeLabel} · {p.dureeHeures} h · {p.moduleCount} modules
            </p>
          </div>
          <Link
            href={p.href}
            className="shrink-0 text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            Voir le parcours
          </Link>
        </li>
      ))}
    </ul>
  );
}
