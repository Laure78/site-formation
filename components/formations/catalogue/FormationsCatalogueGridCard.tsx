import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueNiveauBadgeLabel,
} from '@/lib/formations-catalogue-display';
import { cataloguePublicOneLine } from '@/lib/formations-catalogue-page-config';
import {
  catalogueEntryDuree,
  catalogueEntryTarifLines,
  getCatalogueEntryDisponibiliteBadge,
} from '@/lib/catalogue-formation-disponibilite';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type Props = {
  entry: FormationCatalogueEntry;
  upcoming?: boolean;
};

export function FormationsCatalogueGridCard({ entry, upcoming = false }: Props) {
  const niveauBadge = catalogueNiveauBadgeLabel(entry.ref);
  const disponibilite = getCatalogueEntryDisponibiliteBadge(entry.ref, { upcoming });
  const publicLine = cataloguePublicOneLine(entry.comparatif.publicLabel, 2);
  const tarif = catalogueEntryTarifLines(entry.ref);
  const duree = catalogueEntryDuree(entry);

  const href = upcoming
    ? catalogueDemandeHref({ formationOuParcours: entry.title, nature: 'choix-formation' })
    : entry.href;
  const ctaLabel = upcoming ? 'Demander le programme' : 'Voir le programme';
  const titleId = `catalogue-grid-${entry.ref}-title`;
  const ariaLabel = `${ctaLabel} : ${entry.title}`;

  const meta = [duree, tarif, MODALITE_FORMATIONS_PRESENTIEL].filter(Boolean).join(' · ');

  return (
    <article className={`${OFC_CARD} h-full p-0`}>
      <Link
        href={href}
        aria-labelledby={titleId}
        aria-label={ariaLabel}
        className="flex h-full flex-col rounded-[inherit] p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:p-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F2F2F2] px-2.5 py-1 text-[11px] font-semibold text-ofc-ink">
            {niveauBadge}
          </span>
          <span className="rounded-full bg-[#F2F2F2] px-2.5 py-1 text-[11px] font-semibold text-ofc-ink-muted">
            {disponibilite.label}
          </span>
          <span className="text-[11px] tabular-nums text-ofc-ink-muted">{entry.ref}</span>
        </div>

        <p className="mt-3 text-xs font-medium text-ofc-ink line-clamp-2">{meta}</p>
        <p className="mt-1 text-[11px] text-ofc-ink-muted">HT · prise en charge possible</p>

        <h3
          id={titleId}
          className="mt-2 font-display text-base font-bold leading-snug text-ofc-ink text-balance line-clamp-2"
        >
          {entry.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-snug text-ofc-ink-muted line-clamp-2">
          {entry.promesse}
        </p>

        <p className="mt-2 text-xs text-ofc-ink-muted">
          <span className="font-semibold text-ofc-ink">Public — </span>
          {publicLine}
        </p>

        <span
          className={`${OFC_CTA_PRIMARY} mt-4 inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm font-semibold`}
        >
          {ctaLabel}
        </span>
      </Link>
    </article>
  );
}
