import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllParcoursComputed } from '@/data/catalogue-2027';
import {
  getAccueilParcoursOffre,
  type AccueilParcoursOffreCard,
} from '@/lib/accueil-offre-catalogue';
import { PARCOURS_METIERS_PAGE } from '@/lib/parcours-metiers-orientation';
import { LINKS } from '@/lib/internal-links';
import { ParcoursFormationModulesList } from '@/components/formations/ParcoursFormationModulesList';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const USAGES_IA_FALLBACK_GENERIC = 'Usages IA alignés sur les modules du parcours';

function usagesMetierCarte(
  p: AccueilParcoursOffreCard,
  competencesById: Map<string, readonly string[]>,
): readonly string[] {
  const fromAccueil =
    p.usagesIa.length > 0 &&
    !(p.usagesIa.length === 1 && p.usagesIa[0] === USAGES_IA_FALLBACK_GENERIC)
      ? p.usagesIa
      : null;
  if (fromAccueil) return fromAccueil.slice(0, 3);

  return competencesById.get(p.id)?.slice(0, 3) ?? [];
}

export function ParcoursMetiersOrientation() {
  const parcours = getAccueilParcoursOffre();
  const competencesById = new Map(
    getAllParcoursComputed().map((x) => [x.id, x.competencesVisees] as const),
  );

  return (
    <>
      <section className={`${OFC_SEC.hero} relative overflow-hidden !py-10 md:!py-12`}>
        <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <p className="ofc-badge bg-ofc-accent-soft text-ofc-accent">Orientation · Parcours métiers</p>
          <h1 className="ofc-type-hero mt-5 max-w-3xl text-balance text-ofc-ink">
            {PARCOURS_METIERS_PAGE.h1}
          </h1>
          <p className="ofc-type-lead mt-5 max-w-2xl text-ofc-ink-muted">{PARCOURS_METIERS_PAGE.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Voir les formations IA
            </Link>
            <Link
              href={`${LINKS.prendreRdv}?src=parcours-metiers`}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Échanger sur mon besoin
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <ul className="grid list-none gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {parcours.map((p) => {
            const usages = usagesMetierCarte(p, competencesById);
            return (
              <li key={p.id} id={p.id} className="min-w-0 scroll-mt-28">
                <article className={`${OFC_CARD} flex h-full flex-col p-6 sm:p-8`}>
                  <h2 className={`${OFC_TYPE_H3} text-pretty`}>{p.titre}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">{p.benefice}</p>

                  {usages.length > 0 ? (
                    <>
                      <p className="mt-5 text-sm font-semibold text-ofc-ink">Usages métier</p>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ofc-ink-muted">
                        {usages.map((u) => (
                          <li key={u}>{u}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  <ParcoursFormationModulesList etapes={p.etapes} className="mt-5" />

                  {p.dureeLabel ? (
                    <p className="mt-3 text-xs font-medium text-ofc-ink-muted">
                      {p.dureeLabel} · {p.disponibiliteLabel}
                    </p>
                  ) : null}

                  <div className="mt-auto pt-6">
                    <Link
                      href={p.href}
                      className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 w-full items-center justify-center gap-2 px-5 py-2.5 text-sm sm:w-auto`}
                    >
                      Découvrir le parcours
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
