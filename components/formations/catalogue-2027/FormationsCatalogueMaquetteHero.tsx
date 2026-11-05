import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Check } from 'lucide-react';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { buildPrendreRdvHref } from '@/lib/prendre-rdv-href';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { CATALOGUE_MAQUETTE_HERO_CHECKS } from '@/lib/formations-catalogue-maquette';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';

export function FormationsCatalogueMaquetteHero() {
  const visual = PHOTOS.formationsCatalogueHero2026;
  const rdvHref = buildPrendreRdvHref('catalogue-hero');

  return (
    <section
      id="formations-catalogue-hero"
      className="relative overflow-hidden bg-[#101936]"
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={visual.src}
          alt=""
          width={visual.width}
          height={visual.height}
          className="h-full w-full object-cover object-[center_30%]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101936]/92 via-[#101936]/78 to-[#101936]/45" />
      </div>

      <div className="relative mx-auto max-w-[80rem] px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <p className="inline-flex rounded-full bg-[#377CF3]/90 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white">
          Formations IA · BTP
        </p>
        <h1
          id="formations-catalogue-hero-h1"
          className="mt-4 max-w-3xl font-display text-[clamp(1.75rem,1.25rem+1.8vw,2.65rem)] font-extrabold leading-[1.1] tracking-tight text-white text-balance"
        >
          Formations IA pour les professionnels{' '}
          <span className="text-[#377CF3]">du BTP</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          Devis, appels d&apos;offres, conduite de travaux : l&apos;IA au service de vos métiers.
        </p>
        <ul className="mt-6 flex flex-col gap-2 sm:gap-2.5" aria-label="Points clés">
          {CATALOGUE_MAQUETTE_HERO_CHECKS.map((label) => (
            <li key={label} className="flex items-start gap-2.5 text-sm text-white/95 md:text-base">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#catalogue-formations"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold md:text-base`}
          >
            Explorer les formations
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <Link
            href={rdvHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 md:text-base`}
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            {CTA_RDV_LABEL}
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/70">
          <Link href={LINKS.indicateursResultats} className="underline hover:text-white">
            Voir les indicateurs de résultats Qualiopi
          </Link>
        </p>
      </div>
    </section>
  );
}
