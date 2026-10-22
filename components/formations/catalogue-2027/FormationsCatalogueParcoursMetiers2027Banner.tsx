import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_ON_ACCENT } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

const BANNER_TITLE_ID = 'catalogue-parcours-metiers-2027-banner-title';

const visual = PHOTOS.accueilIaAppliqueeChantierBtp2026;

/**
 * Bandeau catalogue — annonce des parcours métiers BTP 2027 (ouverture future, pas de vente immédiate).
 */
export function FormationsCatalogueParcoursMetiers2027Banner() {
  return (
    <Reveal as="section" className="mb-10 md:mb-12" aria-labelledby={BANNER_TITLE_ID}>
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#1E40AF] via-[#377CF3] to-[#2563EB] text-white shadow-[0_12px_40px_-12px_rgba(30,64,175,0.35)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden
        />

        <div className="relative grid items-center gap-8 px-5 py-8 md:px-8 md:py-9 lg:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(240px,380px)]">
          <div className="min-w-0">
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white md:text-[11px]">
              Nouveauté
              <span className="mx-1.5 text-white/50" aria-hidden>
                •
              </span>
              2027
            </p>

            <h2
              id={BANNER_TITLE_ID}
              className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-white md:text-2xl lg:text-[1.65rem]"
            >
              Votre métier évolue. Votre formation aussi.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 md:text-[15px]">
              En 2027, découvrez nos nouveaux parcours de formation dédiés aux métiers du BTP : direction
              d&apos;entreprise, conduite de travaux, chiffrage, gestion de chantier et fonctions support.
            </p>

            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/95 md:text-[15px]">
              Des compétences concrètes, directement applicables à votre activité.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={LINKS.parcoursMetiers}
                className={`${OFC_CTA_ON_ACCENT} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 text-sm font-semibold sm:w-auto`}
              >
                Découvrir les parcours 2027 →
              </Link>
              <p className="text-xs font-medium text-white/75 md:text-sm">Ouverture prévue en 2027.</p>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-[320px] shrink-0 lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-xl border border-white/20 bg-white/10 p-1 shadow-lg">
              <Image
                src={visual.src}
                alt={visual.alt}
                width={visual.width}
                height={visual.height}
                className="h-auto w-full rounded-[0.65rem] object-cover"
                sizes="(max-width: 1024px) 280px, 380px"
                quality={80}
              />
            </div>
          </figure>
        </div>
      </div>
    </Reveal>
  );
}
