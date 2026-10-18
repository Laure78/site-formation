import Link from 'next/link';
import type { CatalogueComplementaryEntry } from '@/lib/catalogue-thematiques-btp';
import { getThematiqueById } from '@/lib/catalogue-thematiques-btp';
import { getComplementaryDisponibiliteBadge } from '@/lib/catalogue-formation-disponibilite';
import { OFC_CARD, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  item: CatalogueComplementaryEntry;
};

export function FormationsCatalogueComplementaryCard({ item }: Props) {
  const thematique = getThematiqueById(item.thematique);
  const disponibilite = getComplementaryDisponibiliteBadge(item);
  const titleId = `catalogue-complement-${item.id}-title`;

  return (
    <article
      className={`${OFC_CARD} flex h-full flex-col border-dashed p-5 sm:p-6`}
      aria-labelledby={titleId}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
        {thematique.title}
      </p>
      <h3
        id={titleId}
        className="mt-2 font-display text-lg font-bold leading-snug text-ofc-ink text-balance"
      >
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{item.promesse}</p>
      <p className="mt-3 text-sm text-ofc-ink-muted">
        <span className="font-semibold text-ofc-ink">Durée — </span>
        {item.dureeLabel}
      </p>
      <div className="mt-4">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200/80">
          {disponibilite.label}
        </span>
      </div>
      <div className="mt-auto pt-5">
        <Link
          href={item.href}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3 text-sm font-semibold`}
        >
          Voir le programme
        </Link>
      </div>
    </article>
  );
}
