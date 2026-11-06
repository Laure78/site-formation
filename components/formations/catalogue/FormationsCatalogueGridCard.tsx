import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Wallet } from 'lucide-react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { getFormationByCode } from '@/data/formations';
import {
  catalogueMaquetteNiveauBadgeShort,
  catalogueMaquetteNiveauBadgeTone,
  CATALOGUE_MAQUETTE_NIVEAU_BADGE_TONE_CLASS,
} from '@/lib/formations-catalogue-maquette';
import { cataloguePublicOneLine } from '@/lib/formations-catalogue-page-config';
import {
  catalogueEntryDuree,
  catalogueEntryTarifLines,
  getCatalogueEntryDisponibiliteBadge,
} from '@/lib/catalogue-formation-disponibilite';
import { getCatalogueFormationCardVisual } from '@/lib/catalogue-formation-card-visuals';
import { catalogueCardAnchorId } from '@/lib/formations-catalogue-page-config';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';

type Props = {
  entry: FormationCatalogueEntry;
  upcoming?: boolean;
};

export function FormationsCatalogueGridCard({ entry, upcoming = false }: Props) {
  const formation = getFormationByCode(entry.ref);
  const niveauBadge = formation
    ? catalogueMaquetteNiveauBadgeShort(entry.ref, formation.niveau)
    : 'Avancé';
  const badgeTone = formation
    ? catalogueMaquetteNiveauBadgeTone(entry.ref, formation.niveau)
    : 'avance';
  const badgeClass = CATALOGUE_MAQUETTE_NIVEAU_BADGE_TONE_CLASS[badgeTone];
  const disponibilite = getCatalogueEntryDisponibiliteBadge(entry.ref, { upcoming });
  const tarif = catalogueEntryTarifLines(entry.ref);
  const duree = catalogueEntryDuree(entry);
  const visual = getCatalogueFormationCardVisual(entry.ref);

  const programmeHref = upcoming
    ? catalogueDemandeHref({ formationOuParcours: entry.title, nature: 'choix-formation' })
    : entry.href;
  const ctaLabel = upcoming ? 'Demander le programme' : 'Voir le programme';
  const titleId = `catalogue-grid-${entry.ref}-title`;

  const showDisponibilite = upcoming || disponibilite.variant !== 'available';
  const description =
    entry.promesse.length > 140 ? `${entry.promesse.slice(0, 137)}…` : entry.promesse;

  return (
    <article
      id={catalogueCardAnchorId(entry.ref)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-[box-shadow,transform] duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)] scroll-mt-[calc(var(--site-header-height,4.5rem)+0.75rem)]"
      aria-labelledby={titleId}
    >
      <div className="relative aspect-[5/3] overflow-hidden bg-[#F2F2F2]">
        {visual ? (
          <Image
            src={visual.photo.src}
            alt={visual.photo.alt}
            width={visual.photo.width}
            height={visual.photo.height}
            className="h-full w-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : null}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeClass}`}
        >
          {niveauBadge}
        </span>
        {showDisponibilite ? (
          <span
            className={`absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
              disponibilite.variant === 'soon'
                ? 'bg-amber-100 text-amber-900'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {disponibilite.label}
          </span>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <h3
          id={titleId}
          className="font-display text-lg font-bold leading-snug text-[#101936] text-balance"
        >
          <Link
            href={programmeHref}
            className="hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{description}</p>
        <p className="mt-2 hidden text-xs text-slate-500 sm:block">
          {cataloguePublicOneLine(entry.comparatif.publicLabel, 2)}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-[#E2E8F0] bg-[#EFF6FF]/40 px-0 py-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#377CF3]">
              <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Durée</p>
              <p className="font-semibold tabular-nums text-[#101936]">{duree}</p>
            </div>
          </div>
          {tarif ? (
            <div className="flex items-center gap-2 text-right">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Tarif HT</p>
                <p className="font-semibold tabular-nums text-[#101936]">{tarif}</p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#377CF3]">
                <Wallet className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-auto border-t border-[#E2E8F0] px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <Link
          href={programmeHref}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] border-2 border-[#377CF3] bg-white px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#F8FAFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
