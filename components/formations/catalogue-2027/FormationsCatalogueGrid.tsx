import Link from 'next/link';
import { FormationsCatalogueGridCard } from '@/components/formations/catalogue/FormationsCatalogueGridCard';
import { FormationsCatalogueComplementaryCard } from '@/components/formations/catalogue/FormationsCatalogueComplementaryCard';
import { FormationsCatalogueResetFiltersButton } from '@/components/formations/catalogue-2027/FormationsCatalogueResetFiltersButton';
import type { CatalogueGridRow } from '@/lib/catalogue-page-grid';
import { formatFormationsCatalogueGridCount } from '@/lib/catalogue-page-grid';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { HEADER_PRIMARY_CTA_HREF } from '@/lib/header-cta';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type Props = {
  rows: readonly CatalogueGridRow[];
  totalVisible: number;
  hasActiveFilters: boolean;
};

/** Grille catalogue — rendu serveur (toutes les cartes dans le HTML). */
export function FormationsCatalogueGrid({ rows, totalVisible, hasActiveFilters }: Props) {
  const countLabel = formatFormationsCatalogueGridCount(totalVisible);

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-sm text-ofc-ink-muted" aria-live="polite">
          {countLabel}
        </p>
        {hasActiveFilters ? <FormationsCatalogueResetFiltersButton /> : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="text-base font-medium text-ofc-ink">
            Aucune formation ne correspond à vos critères.
          </p>
          <p className="mt-2 text-sm text-ofc-ink-muted">
            Élargissez la recherche, réinitialisez les filtres ou échangez avec Laure pour cadrer votre
            besoin.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasActiveFilters ? <FormationsCatalogueResetFiltersButton variant="secondary" /> : null}
            <Link
              href={`${HEADER_PRIMARY_CTA_HREF}?src=catalogue-vide`}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold`}
            >
              Échanger avec Laure
            </Link>
            <Link
              href={catalogueDemandeHref({
                formationOuParcours: 'Catalogue formations',
                nature: 'devis',
              })}
              className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold text-[#377CF3] underline"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-5 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
