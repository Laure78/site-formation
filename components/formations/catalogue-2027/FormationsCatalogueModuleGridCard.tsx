import Link from 'next/link';
import {
  DOMAINES_CATALOGUE_2027,
  formatPrixInterHt,
  prixModuleInterHt,
  type CatalogueModule,
} from '@/data/catalogue-2027';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { TARIF_PARTICIPANT_NIV10_14H_HT } from '@/lib/tarifs-catalogue-participant';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type Props = {
  module: CatalogueModule;
};

function metaLigne(mod: CatalogueModule): string {
  const domaine = DOMAINES_CATALOGUE_2027.find((d) => d.id === mod.domaineId)?.titre ?? '';
  const duree =
    mod.code === 'NUM-04'
      ? '14 h (catalogue)'
      : mod.variantesDureeHeures
        ? `${mod.dureeHeures} h ou ${mod.variantesDureeHeures.find((h) => h !== mod.dureeHeures) ?? 7} h`
        : `${mod.dureeHeures} h`;

  const prix = prixModuleInterHt(mod.code, mod.dureeHeures);
  const tarif =
    mod.code === 'NUM-04'
      ? `${formatPrixInterHt(TARIF_PARTICIPANT_NIV10_14H_HT)} HT (14 h)`
      : formatPrixInterHt(prix);

  return [duree, tarif, MODALITE_FORMATIONS_PRESENTIEL, libelleDisponibilite(mod.disponibilite)]
    .filter(Boolean)
    .join(' · ');
}

export function FormationsCatalogueModuleGridCard({ module: m }: Props) {
  const href =
    m.href ??
    catalogueDemandeHref({
      formationOuParcours: `${m.code} — ${m.titre}`,
      nature: 'choix-formation',
    });
  const ctaLabel = m.href ? 'Voir le programme' : 'Demander le programme';
  const titleId = `catalogue-module-${m.code}-title`;
  const ariaLabel = `${ctaLabel} : ${m.titre}`;

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
            Module métier
          </span>
          <span className="text-[11px] tabular-nums text-ofc-ink-muted">{m.code}</span>
        </div>

        <p className="mt-3 text-xs font-medium text-ofc-ink-muted line-clamp-1">{metaLigne(m)}</p>
        <p className="mt-1 text-[11px] text-ofc-ink-muted">HT · prise en charge possible</p>

        <h3
          id={titleId}
          className="mt-2 font-display text-base font-bold leading-snug text-ofc-ink text-balance line-clamp-2"
        >
          {m.titre}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-snug text-ofc-ink-muted line-clamp-2">
          {m.objectifPrincipal}
        </p>

        <p className="mt-2 text-xs text-ofc-ink-muted line-clamp-1">{m.publicCible}</p>

        <span
          className={`${OFC_CTA_PRIMARY} mt-4 inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm font-semibold`}
        >
          {ctaLabel}
        </span>
      </Link>
    </article>
  );
}
