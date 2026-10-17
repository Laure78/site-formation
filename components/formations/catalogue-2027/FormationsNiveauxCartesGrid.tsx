import Link from 'next/link';
import { buildFormationsIaNiveauHref } from '@/lib/catalogue-filter-url';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  ctaLabel?: string;
  className?: string;
};

/** Trois cartes de niveau pédagogique — source unique `FORMATIONS_NIVEAUX_IA`. */
export function FormationsNiveauxCartesGrid({
  ctaLabel = 'Voir les formations',
  className = '',
}: Props) {
  return (
    <ul className={`grid gap-5 md:grid-cols-3 ${className}`.trim()}>
      {FORMATIONS_NIVEAUX_IA.map((n) => (
        <li key={n.niveau}>
          <article className="flex h-full flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
              {n.labelComplet}
            </p>
            <p className="mt-2 text-sm font-semibold text-ofc-accent">{n.accrocheNiveau}</p>
            <p className="mt-2 text-sm font-medium text-ofc-ink-muted">
              Durée de référence : {n.accueilDuree}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink">{n.descriptionMenu}</p>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
              <span className="font-medium text-ofc-ink">Public — </span>
              {n.publicCible}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">
              <span className="font-medium text-ofc-ink">Prérequis — </span>
              {n.prerequis}
            </p>
            <p className="mt-3 text-sm font-semibold text-ofc-ink">Exemples de réalisations</p>
            <ul className="mt-1 list-inside list-disc text-sm text-ofc-ink-muted">
              {n.exemplesRealisations.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href={buildFormationsIaNiveauHref(n.niveau)}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 w-full items-center justify-center px-4 py-2.5 text-sm font-semibold`}
              >
                {ctaLabel}
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
