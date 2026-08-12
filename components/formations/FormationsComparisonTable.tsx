import Link from 'next/link';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  CATALOGUE_FORMATIONS_COUNT,
  catalogueNiveauLabel,
  sortFormationsCatalogue,
} from '@/lib/formations-catalogue-display';

export function FormationsComparisonTable({
  formations,
}: {
  formations: FormationCatalogueEntry[];
}) {
  const rows = sortFormationsCatalogue(formations);

  return (
    <section
      className="mt-16 scroll-mt-24"
      aria-labelledby="comparatif-formations-heading"
    >
      <div className="text-center">
        <h2
          id="comparatif-formations-heading"
          className="font-display text-[32px] font-bold text-[#0F172A]"
        >
          Comparez les {CATALOGUE_FORMATIONS_COUNT} formations IA pour le BTP d&apos;un coup d&apos;œil
        </h2>
        <p className="mt-3 text-lg text-[#64748B]">
          Toutes Qualiopi, toutes {SESSION_DUREE_LIBELLE}, intra ou inter,
          exclusivement en présentiel en Île-de-France. Financement partiel possible selon éligibilité.
        </p>
      </div>

      <div className="mt-10 hidden overflow-hidden rounded-2xl border border-[#E2E8F0] md:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#377CF3] text-white">
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide first:rounded-tl-2xl">
                Niveau
              </th>
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide">Formation</th>
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide">Niveau</th>
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide">Public</th>
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide">Durée</th>
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide">Forfait session HT</th>
              <th className="px-[18px] py-[14px] text-[14px] font-semibold uppercase tracking-wide last:rounded-tr-2xl">
                Cas d&apos;usage
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.ref}
                className={`transition-colors duration-200 hover:bg-[#EFF6FF] ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                }`}
              >
                <td className="px-[18px] py-3 align-top">
                  <span className="inline-block rounded-md bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#1E40AF]">
                    {catalogueNiveauLabel(row.ref)}
                  </span>
                </td>
                <td className="px-[18px] py-3 align-top font-medium text-[#0F172A]">
                  <Link href={row.href} className="underline-offset-2 hover:text-[#377CF3] hover:underline">
                    {row.title}
                  </Link>
                </td>
                <td className="px-[18px] py-3 align-top">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      row.level === 'DÉBUTANT'
                        ? 'bg-[#D1FAE5] text-[#047857]'
                        : 'bg-[#FED7AA] text-[#C2410C]'
                    }`}
                  >
                    {row.level === 'DÉBUTANT' ? 'Débutant' : 'Avancé'}
                  </span>
                </td>
                <td className="px-[18px] py-3 align-top text-[#64748B]">{row.comparatif.publicLabel}</td>
                <td className="px-[18px] py-3 align-top text-[#334155]">{row.duree}</td>
                <td className="px-[18px] py-3 align-top">
                  <CataloguePriceBadge
                level={row.level}
                prixHT={row.prixHT}
                variant="pill"
              />
                </td>
                <td className="px-[18px] py-3 align-top text-[#64748B]">{row.comparatif.casUsage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-4 md:hidden">
        {rows.map((row) => (
          <div
            key={row.ref}
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-block rounded-md bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#1E40AF]">
                {catalogueNiveauLabel(row.ref)}
              </span>
              <CataloguePriceBadge level={row.level} prixHT={row.prixHT} variant="pill" />
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-[#0F172A]">
              <Link href={row.href} className="hover:text-[#377CF3] hover:underline">
                {row.title}
              </Link>
            </h3>
            <p className="mt-2 text-[#64748B]">
              <span className="font-medium text-[#334155]">Niveau : </span>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                  row.level === 'DÉBUTANT'
                    ? 'bg-[#D1FAE5] text-[#047857]'
                    : 'bg-[#FED7AA] text-[#C2410C]'
                }`}
              >
                {row.level === 'DÉBUTANT' ? 'Débutant' : 'Avancé'}
              </span>
              <span className="font-medium text-[#334155]"> · Durée : </span>
              {row.duree}
            </p>
            <p className="mt-2 text-[#64748B]">
              <span className="font-medium text-[#334155]">Public : </span>
              {row.comparatif.publicLabel}
            </p>
            <p className="mt-2 text-[#64748B]">
              <span className="font-medium text-[#334155]">Cas d&apos;usage : </span>
              {row.comparatif.casUsage}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
