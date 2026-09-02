import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueCasUsageTags,
  cataloguePublicOneLine,
} from '@/lib/formations-catalogue-page-config';
import {
  catalogueNiveauLabel,
  sortFormationsCatalogue,
  tarifLabelForEntry,
} from '@/lib/formations-catalogue-display';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Comparateur synthétique — tableau desktop + cartes mobile. */
export function FormationsCatalogueComparison({ formations }: { formations: FormationCatalogueEntry[] }) {
  const rows = sortFormationsCatalogue(formations);

  return (
    <section className="mt-16 scroll-mt-24" aria-labelledby="comparatif-formations-heading">
      <h2
        id="comparatif-formations-heading"
        className="font-display text-2xl font-bold text-ofc-ink md:text-3xl"
      >
        Comparez les formations en un coup d&apos;œil
      </h2>

      <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-ofc-accent text-white">
              <th className="px-4 py-3 font-semibold">Formation</th>
              <th className="px-4 py-3 font-semibold">Pour qui ?</th>
              <th className="px-4 py-3 font-semibold">Cas d&apos;usage</th>
              <th className="px-4 py-3 font-semibold">Niveau</th>
              <th className="px-4 py-3 font-semibold">Durée</th>
              <th className="px-4 py-3 font-semibold">Tarif</th>
              <th className="px-4 py-3 font-semibold"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.ref} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 align-top font-medium text-ofc-ink">
                  <Link href={row.href} className="hover:text-ofc-accent hover:underline">
                    {row.title}
                  </Link>
                </td>
                <td className="max-w-[12rem] px-4 py-3 align-top text-slate-600">
                  {cataloguePublicOneLine(row.comparatif.publicLabel, 2)}
                </td>
                <td className="px-4 py-3 align-top text-slate-600">
                  {catalogueCasUsageTags(row).join(' · ')}
                </td>
                <td className="px-4 py-3 align-top text-slate-700">{catalogueNiveauLabel(row.ref)}</td>
                <td className="px-4 py-3 align-top text-slate-700">{row.duree}</td>
                <td className="px-4 py-3 align-top text-slate-700">
                  {row.tarifParcoursLabel ?? tarifLabelForEntry(row)}
                </td>
                <td className="px-4 py-3 align-top">
                  <Link href={row.href} className={`${OFC_CTA_SECONDARY} whitespace-nowrap px-4 py-2 text-xs`}>
                    Voir la formation
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4 md:hidden">
        {rows.map((row) => (
          <div key={row.ref} className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-ofc-accent">
              {catalogueNiveauLabel(row.ref)}
            </p>
            <h3 className="mt-2 font-display text-base font-semibold text-ofc-ink">
              <Link href={row.href}>{row.title}</Link>
            </h3>
            <p className="mt-2 text-slate-600">
              <span className="font-medium text-slate-800">Pour qui : </span>
              {cataloguePublicOneLine(row.comparatif.publicLabel, 2)}
            </p>
            <p className="mt-2 text-slate-600">
              <span className="font-medium text-slate-800">Cas d&apos;usage : </span>
              {catalogueCasUsageTags(row).join(' · ')}
            </p>
            <p className="mt-2 text-slate-600">
              <span className="font-medium text-slate-800">Durée : </span>
              {row.duree}
              <span className="font-medium text-slate-800"> · Tarif : </span>
              {row.tarifParcoursLabel ?? tarifLabelForEntry(row)}
            </p>
            <Link
              href={row.href}
              className={`${OFC_CTA_SECONDARY} mt-4 inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5`}
            >
              Voir la formation
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
