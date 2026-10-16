import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getParcoursMetiersProfilsAvecFormations,
  PARCOURS_METIERS_PAGE,
} from '@/lib/parcours-metiers-orientation';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export function ParcoursMetiersOrientation() {
  const profils = getParcoursMetiersProfilsAvecFormations();

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
        <ul className="grid list-none gap-6 lg:grid-cols-2 lg:gap-8">
          {profils.map((profil) => (
            <li key={profil.id} id={profil.id} className="min-w-0 scroll-mt-28">
              <article className={`${OFC_CARD} flex h-full flex-col p-6 sm:p-8`}>
                <h2 className={`${OFC_TYPE_H3} text-pretty`}>{profil.titre}</h2>
                <p className="mt-3 text-sm font-semibold text-ofc-ink">Besoins concrets</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ofc-ink-muted">
                  {profil.besoins.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                {profil.formations.length > 0 ? (
                  <>
                    <p className="mt-5 text-sm font-semibold text-ofc-ink">Formations adaptées</p>
                    <ul className="mt-2 space-y-3">
                      {profil.formations.map((f) => (
                        <li key={f.code} className="text-sm leading-snug">
                          <Link
                            href={f.href}
                            className="font-semibold text-ofc-accent hover:underline"
                          >
                            {f.titre}
                          </Link>
                          <span className="text-ofc-ink-muted">
                            {' '}
                            · {f.duree} · {f.public.split('.')[0]?.trim() ?? f.public}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:flex-wrap">
                  {profil.parcoursHref && profil.parcoursLabel ? (
                    <Link
                      href={profil.parcoursHref}
                      className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center gap-2 px-5 py-2.5 text-sm`}
                    >
                      {profil.parcoursLabel}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted">
          Les parcours regroupent plusieurs modules dans un ordre pédagogique. Chaque formation
          listée correspond à une fiche programme existante — présentiel en Île-de-France, organisme
          certifié Qualiopi.
        </p>
      </div>
    </>
  );
}
