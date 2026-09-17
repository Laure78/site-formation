import Link from 'next/link';
import Image from 'next/image';
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
import { Badge } from '@/components/ui/Badge';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

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
  const visuel = entry.visuel;
  const caption =
    'description' in visuel && typeof visuel.description === 'string'
      ? visuel.description
      : undefined;

  return (
    <article
      id={catalogueCardAnchorId(entry.ref)}
      className={`${OFC_CARD} flex h-full scroll-mt-28 flex-col overflow-hidden p-0 ${
        highlighted ? 'border-ofc-accent/40 shadow-ofc-md ring-1 ring-ofc-accent/25' : ''
      } ${dimmed ? 'opacity-45' : ''}`}
    >
      <figure className="relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={visuel.src}
            alt={visuel.alt}
            title={'title' in visuel && typeof visuel.title === 'string' ? visuel.title : undefined}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={75}
          />
        </div>
        {caption ? <figcaption className="sr-only">{caption}</figcaption> : null}
      </figure>

      <div className="flex flex-1 flex-col p-6 sm:p-7 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-ofc-accent-soft text-ofc-accent">{catalogueGammeLabel(entry.gamme)}</Badge>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
              isDebutant ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
            }`}
          >
            {catalogueNiveauLabel(entry.ref)}
          </span>
        </div>

        <h3 className={`${OFC_TYPE_H3} mt-5 text-ofc-ink`}>{entry.title}</h3>

        <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted md:text-base">{entry.promesse}</p>

        <p className="mt-4 text-sm text-ofc-ink-muted">
          <span className="font-semibold text-ofc-ink">Pour qui ? </span>
          {publicLine}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Cas d'usage">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-ofc-border bg-[var(--ofc-color-canvas)] px-2.5 py-1 text-xs font-medium text-ofc-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ofc-border pt-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-subtle">Durée</dt>
            <dd className="mt-0.5 flex items-center gap-1 text-ofc-ink-muted">
              <Clock className="h-3.5 w-3.5 shrink-0 text-ofc-accent" aria-hidden />
              {entry.duree}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-subtle">Effectif</dt>
            <dd className="mt-0.5 flex items-center gap-1 text-ofc-ink-muted">
              <Users className="h-3.5 w-3.5 shrink-0 text-ofc-accent" aria-hidden />
              {entry.effectif}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-subtle">Format</dt>
            <dd className="mt-0.5 text-ofc-ink-muted">{PERIMETRE_FORMATIONS_COURT}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-subtle">Tarif</dt>
            <dd className="mt-0.5 text-ofc-ink-muted">
              {entry.tarifParcoursLabel ?? tarifLabelForEntry(entry)}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-col gap-2">
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
      </div>
    </article>
  );
}
