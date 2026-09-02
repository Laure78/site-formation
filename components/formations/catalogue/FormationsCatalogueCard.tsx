import Link from 'next/link';
import { Clock, FileText, Users } from 'lucide-react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueCasUsageTags,
  catalogueCardAnchorId,
  cataloguePublicOneLine,
} from '@/lib/formations-catalogue-page-config';
import {
  catalogueGammeLabel,
  catalogueNiveauLabel,
  tarifLabelForEntry,
} from '@/lib/formations-catalogue-display';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  entry: FormationCatalogueEntry;
  highlighted?: boolean;
  dimmed?: boolean;
};

/** Carte catalogue — une formation, un CTA principal. */
export function FormationsCatalogueCard({
  entry,
  highlighted = false,
  dimmed = false,
}: Props) {
  const tags = catalogueCasUsageTags(entry);
  const publicLine = cataloguePublicOneLine(entry.comparatif.publicLabel);
  const isDebutant = entry.level === 'DÉBUTANT';

  return (
    <article
      id={catalogueCardAnchorId(entry.ref)}
      className={`${OFC_CARD} flex h-full scroll-mt-28 flex-col p-6 transition ${
        highlighted ? 'ring-2 ring-ofc-accent ring-offset-2' : ''
      } ${dimmed ? 'opacity-45' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#377CF3]">
          {catalogueGammeLabel(entry.gamme)}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
            isDebutant ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
          }`}
        >
          {catalogueNiveauLabel(entry.ref)}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ofc-ink md:text-xl">
        <Link href={entry.href} className="hover:text-ofc-accent">
          {entry.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{entry.promesse}</p>

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-800">Pour qui ? </span>
        {publicLine}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Cas d'usage">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
          >
            {tag}
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Durée</dt>
          <dd className="mt-0.5 flex items-center gap-1 text-slate-700">
            <Clock className="h-3.5 w-3.5 shrink-0 text-ofc-accent" aria-hidden />
            {entry.duree}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Effectif</dt>
          <dd className="mt-0.5 flex items-center gap-1 text-slate-700">
            <Users className="h-3.5 w-3.5 shrink-0 text-ofc-accent" aria-hidden />
            {entry.effectif}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Format</dt>
          <dd className="mt-0.5 text-slate-700">{PERIMETRE_FORMATIONS_COURT}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tarif</dt>
          <dd className="mt-0.5 text-slate-700">
            {entry.tarifParcoursLabel ?? tarifLabelForEntry(entry)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href={entry.href}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm`}
        >
          Voir la formation
        </Link>
        {entry.programmePdfHref ? (
          <a
            href={entry.programmePdfHref}
            download
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm`}
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden />
            Programme PDF
          </a>
        ) : null}
      </div>
    </article>
  );
}
