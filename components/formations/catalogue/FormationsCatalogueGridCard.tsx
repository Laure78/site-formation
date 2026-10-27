import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { catalogueNiveauBadgeLabel } from '@/lib/formations-catalogue-display';
import { cataloguePublicOneLine } from '@/lib/formations-catalogue-page-config';
import {
  catalogueEntryDuree,
  catalogueEntryTarifLines,
  getCatalogueEntryDisponibiliteBadge,
} from '@/lib/catalogue-formation-disponibilite';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type Props = {
  entry: FormationCatalogueEntry;
  upcoming?: boolean;
};

export function FormationsCatalogueGridCard({ entry, upcoming = false }: Props) {
  const niveauBadge = catalogueNiveauBadgeLabel(entry.ref);
  const disponibilite = getCatalogueEntryDisponibiliteBadge(entry.ref, { upcoming });
  const publicLine = cataloguePublicOneLine(entry.comparatif.publicLabel, 3);
  const tarif = catalogueEntryTarifLines(entry.ref);
  const duree = catalogueEntryDuree(entry);

  const programmeHref = upcoming
    ? catalogueDemandeHref({ formationOuParcours: entry.title, nature: 'choix-formation' })
    : entry.href;
  const ctaLabel = upcoming ? 'Demander le programme' : 'Voir le programme';
  const titleId = `catalogue-grid-${entry.ref}-title`;

  const showDisponibilite = upcoming || disponibilite.variant !== 'available';

  return (
    <article className={`${OFC_CARD} flex h-full flex-col p-0`} aria-labelledby={titleId}>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F2F2F2] px-2.5 py-1 text-xs font-semibold text-ofc-ink">
            {niveauBadge}
          </span>
          {showDisponibilite ? (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                disponibilite.variant === 'soon'
                  ? 'bg-amber-50 text-amber-900 ring-1 ring-amber-200/80'
                  : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/80'
              }`}
            >
              {disponibilite.label}
            </span>
          ) : null}
        </div>

        <h3
          id={titleId}
          className="mt-3 font-display text-lg font-bold leading-snug text-ofc-ink text-balance sm:text-xl"
        >
          <Link
            href={programmeHref}
            className="hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {entry.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ofc-ink">{entry.promesse}</p>

        <p className="mt-3 text-sm text-ofc-ink-muted">
          <span className="font-medium text-ofc-ink">Public — </span>
          {publicLine}
        </p>

        <dl className="mt-4 grid gap-2 border-t border-[#E2E8F0] pt-4 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <dt className="font-medium text-ofc-ink-muted">Durée</dt>
            <dd className="font-semibold tabular-nums text-ofc-ink">{duree}</dd>
          </div>
          {tarif ? (
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <dt className="font-medium text-ofc-ink-muted">Tarif</dt>
              <dd className="text-right font-semibold tabular-nums text-ofc-ink">{tarif}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className="border-t border-[#E2E8F0] p-4 sm:px-5 sm:pb-5">
        <Link
          href={programmeHref}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm font-semibold`}
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
