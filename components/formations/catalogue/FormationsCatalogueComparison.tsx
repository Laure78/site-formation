import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueNiveauLabel,
  sortFormationsCatalogue,
  tarifLabelForEntry,
} from '@/lib/formations-catalogue-display';
import { catalogueGammeLabel } from '@/lib/formations-catalogue-display';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Comparateur synthétique — tableau desktop, cartes mobile (pas de scroll horizontal). */
export function FormationsCatalogueComparison({ formations }: { formations: FormationCatalogueEntry[] }) {
  const rows = sortFormationsCatalogue(formations);

  return (
    <section className="mt-16 scroll-mt-24" aria-labelledby="comparatif-formations-heading">
      <h2
        id="comparatif-formations-heading"
        className="font-display text-2xl font-bold text-ofc-ink md:text-3xl"
      >
        Comparez les formations
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-600">
        Vue synthétique — le détail pédagogique reste sur chaque fiche.
      </p>

      <div className="mt-8 hidden md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-3 py-3 font-semibold text-ofc-ink">Formation</th>
              <th className="px-3 py-3 font-semibold text-ofc-ink">Besoin</th>
              <th className="px-3 py-3 font-semibold text-ofc-ink">Niveau</th>
              <th className="px-3 py-3 font-semibold text-ofc-ink">Durée</th>
              <th className="px-3 py-3 font-semibold text-ofc-ink">Format</th>
              <th className="px-3 py-3 font-semibold text-ofc-ink">Tarif</th>
              <th className="px-3 py-3 font-semibold text-ofc-ink">
                <span className="sr-only">Lien</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.ref} className="border-b border-slate-100">
                <td className="px-3 py-3 align-top font-medium text-ofc-ink">
                  <Link href={row.href} className={OFC_LINK}>
                    {row.title}
                  </Link>
                </td>
                <td className="px-3 py-3 align-top text-slate-600">{catalogueGammeLabel(row.gamme)}</td>
                <td className="px-3 py-3 align-top text-slate-700">{catalogueNiveauLabel(row.ref)}</td>
                <td className="px-3 py-3 align-top text-slate-700">{row.duree}</td>
                <td className="px-3 py-3 align-top text-slate-700">{PERIMETRE_FORMATIONS_COURT}</td>
                <td className="px-3 py-3 align-top text-slate-700">
                  {row.tarifParcoursLabel ?? tarifLabelForEntry(row)}
                </td>
                <td className="px-3 py-3 align-top">
                  <Link href={row.href} className={`${OFC_CTA_SECONDARY} whitespace-nowrap px-3 py-2 text-xs`}>
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.ref} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-ofc-accent">
              {catalogueGammeLabel(row.gamme)} · {catalogueNiveauLabel(row.ref)}
            </p>
            <h3 className="mt-1 font-display text-base font-semibold text-ofc-ink">
              <Link href={row.href}>{row.title}</Link>
            </h3>
            <p className="mt-2 text-slate-600">
              {row.duree} · {row.tarifParcoursLabel ?? tarifLabelForEntry(row)}
            </p>
            <Link
              href={row.href}
              className={`${OFC_CTA_SECONDARY} mt-3 inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5`}
            >
              Voir la formation
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
