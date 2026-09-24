import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Clock, FileText, Users } from 'lucide-react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueCasUsageTags,
  catalogueCardAnchorId,
  cataloguePublicOneLine,
} from '@/lib/formations-catalogue-page-config';
import {
  catalogueNiveauBadgeLabel,
  catalogueThemeSecondaryLabel,
  tarifLabelForEntry,
} from '@/lib/formations-catalogue-display';
import {
  DEV_WEB_IA_BADGE_NOUVEAU,
  DEV_WEB_IA_DUREE_COURTE,
  DEV_WEB_IA_PRIX_LANCEMENT_LABEL,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import { formatTarifHt } from '@/lib/tarifs-sessions';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  entry: FormationCatalogueEntry;
  highlighted?: boolean;
  dimmed?: boolean;
};

/** Carte catalogue — structure homogène avec badge niveau primaire. */
export function FormationsCatalogueCard({
  entry,
  highlighted = false,
  dimmed = false,
}: Props) {
  const tags = catalogueCasUsageTags(entry);
  const publicLine = cataloguePublicOneLine(entry.comparatif.publicLabel);
  const isNiveau1 = entry.ref === 'NIV-01';
  const isDevWebIa = entry.ref === 'NIV-10';
  const niveauBadge = catalogueNiveauBadgeLabel(entry.ref);
  const themeLabel = catalogueThemeSecondaryLabel(entry.ref);
  const visuel = entry.visuel;
  const caption =
    'description' in visuel && typeof visuel.description === 'string'
      ? visuel.description
      : undefined;

  return (
    <article
      id={catalogueCardAnchorId(entry.ref)}
      className={`${OFC_CARD} flex h-full min-h-[28rem] scroll-mt-28 flex-col overflow-hidden p-0 ${
        highlighted ? 'border-ofc-accent/40 shadow-ofc-md ring-1 ring-ofc-accent/25' : ''
      } ${dimmed ? 'opacity-45' : ''}`}
    >
      {/* Image */}
      <figure className="relative">
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <Image
            src={visuel.src}
            alt={visuel.alt}
            title={'title' in visuel && typeof visuel.title === 'string' ? visuel.title : undefined}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            quality={75}
          />
        </div>
        {isDevWebIa ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#377CF3] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
            {DEV_WEB_IA_BADGE_NOUVEAU}
          </span>
        ) : null}
        {caption ? <figcaption className="sr-only">{caption}</figcaption> : null}
      </figure>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Badge niveau (primaire) + catégorie thématique (secondaire) */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
              isNiveau1
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
            }`}
          >
            {niveauBadge}
          </span>
          {themeLabel ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              {themeLabel}
            </span>
          ) : null}
        </div>

        {/* Titre */}
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ofc-ink">
          {entry.title}
        </h3>

        {/* Bénéfice principal */}
        <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">
          {entry.promesse}
        </p>

        {/* Public */}
        <p className="mt-3 text-sm text-ofc-ink-muted">
          <span className="font-semibold text-ofc-ink">Pour : </span>
          {publicLine}
        </p>

        {/* Objectifs / cas d'usage (max 3) */}
        <ul className="mt-3 space-y-1" aria-label="Objectifs clés">
          {tags.map((tag) => (
            <li
              key={tag}
              className="flex items-start gap-2 text-sm text-ofc-ink-muted"
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ofc-accent" aria-hidden />
              {tag}
            </li>
          ))}
        </ul>

        {/* Infos pratiques — poussées en bas */}
        <div className="mt-auto space-y-3 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ofc-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-ofc-accent" aria-hidden />
              {isDevWebIa ? DEV_WEB_IA_DUREE_COURTE : entry.duree}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-ofc-accent" aria-hidden />
              {entry.effectif}
            </span>
          </div>

          <p className="text-sm font-semibold text-ofc-ink">
            {isDevWebIa ? (
              <>
                <span className="text-[#377CF3]">{DEV_WEB_IA_PRIX_LANCEMENT_LABEL}</span>
                {' · '}
                <span className="font-normal text-ofc-ink-muted">
                  {formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant
                </span>
              </>
            ) : (
              (entry.tarifParcoursLabel ?? tarifLabelForEntry(entry))
            )}
          </p>

          {/* CTA principal + lien PDF */}
          <div className="flex flex-col gap-2">
            <Link
              href={entry.href}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm`}
            >
              Découvrir la formation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {entry.programmePdfHref ? (
              <a
                href={entry.programmePdfHref}
                download
                className={`${OFC_LINK} inline-flex items-center justify-center gap-1.5 py-2 text-sm`}
              >
                <FileText className="h-3.5 w-3.5" aria-hidden />
                Programme PDF
                <span aria-hidden>→</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
