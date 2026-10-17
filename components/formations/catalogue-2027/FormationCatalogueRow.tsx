import Link from 'next/link';
import { DEV_WEB_IA_DUREE_COURTE } from '@/lib/formation-developpement-web-ia-content';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  catalogueNiveauBadgeLabel,
  libelleTarifParcoursCatalogue,
} from '@/lib/formations-catalogue-display';
import { getFormationByCode } from '@/data/formations';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export type FormationCatalogueRowProps = {
  entry: FormationCatalogueEntry;
  disponibiliteLabel?: string;
};

function dureeAffichage(entry: FormationCatalogueEntry): string {
  if (entry.ref === 'NIV-10') return DEV_WEB_IA_DUREE_COURTE;
  return entry.duree;
}

export function FormationCatalogueRow({
  entry,
  disponibiliteLabel = 'Disponible — inscription sur programme',
}: FormationCatalogueRowProps) {
  const formation = getFormationByCode(entry.ref);
  const tarif = formation ? libelleTarifParcoursCatalogue(formation) : 'Sur devis';
  const niveau = catalogueNiveauBadgeLabel(entry.ref);
  const duree = dureeAffichage(entry);

  return (
    <li className="border-b border-[#E2E8F0] last:border-b-0">
      <article className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-ofc-ink-muted">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-ofc-ink">{niveau}</span>
            <span aria-hidden>·</span>
            <span>{duree}</span>
            <span aria-hidden>·</span>
            <span>{tarif} / participant</span>
          </div>
          <h3 className="mt-2 font-display text-base font-bold text-ofc-ink md:text-lg">
            <Link
              href={entry.href}
              className="hover:text-ofc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            >
              {entry.title}
            </Link>
          </h3>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ofc-ink-muted">
            {entry.promesse}
          </p>
          <p className="mt-2 text-xs text-ofc-ink-muted">{disponibiliteLabel}</p>
        </div>
        <div className="shrink-0 md:text-right">
          <Link
            href={entry.href}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 w-full items-center justify-center px-5 py-2.5 text-sm font-semibold md:w-auto`}
          >
            Voir le programme
          </Link>
        </div>
      </article>
    </li>
  );
}

export type ComplementaryCatalogueRowProps = {
  title: string;
  promesse: string;
  href: string;
  dureeLabel: string;
  disponibiliteLabel: string;
};

export function ComplementaryCatalogueRow({
  title,
  promesse,
  href,
  dureeLabel,
  disponibiliteLabel,
}: ComplementaryCatalogueRowProps) {
  return (
    <li className="border-b border-dashed border-[#E2E8F0] last:border-b-0">
      <article className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            Entrée complémentaire · {dureeLabel}
          </p>
          <h3 className="mt-2 font-display text-base font-bold text-ofc-ink md:text-lg">
            <Link
              href={href}
              className="hover:text-ofc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ofc-ink-muted">{promesse}</p>
          <p className="mt-2 text-xs text-ofc-ink-muted">{disponibiliteLabel}</p>
        </div>
        <div className="shrink-0">
          <Link
            href={href}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 w-full items-center justify-center px-5 py-2.5 text-sm font-semibold md:w-auto`}
          >
            Voir le programme
          </Link>
        </div>
      </article>
    </li>
  );
}
