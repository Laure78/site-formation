import { CtaVisio } from '@/components/CtaVisio';
import { FormationsCatalogueGridCard } from '@/components/formations/catalogue/FormationsCatalogueGridCard';
import { FormationsCatalogueComplementaryCard } from '@/components/formations/catalogue/FormationsCatalogueComplementaryCard';
import { FormationsCatalogueResetFiltersButton } from '@/components/formations/catalogue-2027/FormationsCatalogueResetFiltersButton';
import type { CatalogueGridRow } from '@/lib/catalogue-page-grid';
import { formatFormationsCatalogueGridCount } from '@/lib/catalogue-page-grid';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
type Props = {
  rows: readonly CatalogueGridRow[];
  totalVisible: number;
  hasActiveFilters: boolean;
};

/** Grille catalogue — rendu serveur (cartes dans le HTML). */
export function FormationsCatalogueGrid({ rows, totalVisible, hasActiveFilters }: Props) {
  const countLabel = formatFormationsCatalogueGridCount(totalVisible);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <p className="text-sm text-slate-600" aria-live="polite">
          {countLabel}
        </p>
        {hasActiveFilters ? <FormationsCatalogueResetFiltersButton /> : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm">
          <p className="text-base font-medium text-[#101936]">
            Aucune formation ne correspond à vos critères.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Élargissez la recherche, réinitialisez les filtres ou échangez avec Laure pour cadrer votre
            besoin.
          </p>
          <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            {hasActiveFilters ? <FormationsCatalogueResetFiltersButton variant="secondary" /> : null}
            <CtaVisio src="catalogue-vide" className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold" />
</div>
        </div>
      ) : (
        <ul className="mt-6 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <li key={row.key} className="min-w-0">
              {row.kind === 'ia' ? (
                <FormationsCatalogueGridCard entry={row.entry} upcoming={row.upcoming} />
              ) : (
                <FormationsCatalogueComplementaryCard item={row.item} />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
