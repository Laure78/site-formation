import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueNiveauBadgeLabel,
  catalogueThemeSecondaryLabel,
} from '@/lib/formations-catalogue-display';
import { cataloguePublicOneLine } from '@/lib/formations-catalogue-page-config';
import {
  catalogueEntryDuree,
  catalogueEntryTarifLines,
  getCatalogueEntryDisponibiliteBadge,
  type CatalogueDisponibiliteBadge,
} from '@/lib/catalogue-formation-disponibilite';
import { getThematiqueById, FORMATION_THEMATIQUE_PRINCIPALE } from '@/lib/catalogue-thematiques-btp';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const BADGE_DISPONIBILITE_CLASS: Record<CatalogueDisponibiliteBadge['variant'], string> = {
  available: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80',
  soon: 'bg-amber-50 text-amber-900 ring-1 ring-amber-200/80',
  demand: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/80',
};

type Props = {
  entry: FormationCatalogueEntry;
  upcoming?: boolean;
};

export function FormationsCatalogueGridCard({ entry, upcoming = false }: Props) {
  const thematiqueId =
    FORMATION_THEMATIQUE_PRINCIPALE[entry.ref as FormationCatalogueCode] ?? undefined;
  const thematiqueLabel = thematiqueId
    ? getThematiqueById(thematiqueId).title
    : catalogueThemeSecondaryLabel(entry.ref);

  const niveauBadge = catalogueNiveauBadgeLabel(entry.ref);
  const disponibilite = getCatalogueEntryDisponibiliteBadge(entry.ref, { upcoming });
  const publicLine = cataloguePublicOneLine(entry.comparatif.publicLabel, 2);
  const tarif = catalogueEntryTarifLines(entry.ref);
  const duree = catalogueEntryDuree(entry);

  const action = upcoming
    ? {
        href: catalogueDemandeHref({ formationOuParcours: entry.title, nature: 'choix-formation' }),
        label: 'Demander le programme',
      }
    : { href: entry.href, label: 'Voir le programme' };

  const titleId = `catalogue-grid-${entry.ref}-title`;

  return (
    <article
      className={`${OFC_CARD} flex h-full flex-col p-5 sm:p-6`}
      aria-labelledby={titleId}
    >
      {thematiqueLabel ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-ofc-accent">{thematiqueLabel}</p>
      ) : null}

      <h3
        id={titleId}
        className="mt-2 font-display text-lg font-bold leading-snug text-ofc-ink text-balance"
      >
        {entry.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{entry.promesse}</p>

      <p className="mt-3 text-sm text-ofc-ink-muted">
        <span className="font-semibold text-ofc-ink">Public — </span>
        {publicLine}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-800 ring-1 ring-blue-100">
          {niveauBadge}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${BADGE_DISPONIBILITE_CLASS[disponibilite.variant]}`}
        >
          {disponibilite.label}
        </span>
      </div>

      <dl className="mt-4 space-y-1.5 text-sm text-ofc-ink-muted">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-semibold text-ofc-ink">Durée</dt>
          <dd>{duree}</dd>
        </div>
        {tarif ? (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-ofc-ink">Tarif</dt>
            <dd>{tarif}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-auto pt-5">
        <Link
          href={action.href}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3 text-sm font-semibold`}
        >
          {action.label}
        </Link>
      </div>
    </article>
  );
}
