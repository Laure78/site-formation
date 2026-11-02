import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { ACCUEIL_EN_BREF } from '@/lib/accueil-geo';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const HERO = PHOTOS.accueilHeroEquipeBtp;

/** Hero accueil — maquette 2026 (texte + photo, CTA catalogue / intra). */
export function AccueilHeroSection() {
  return (
    <section id="accueil-hero" className={`${OFC_SEC.heroWhite} relative overflow-hidden !py-8 md:!py-10 lg:!py-12`}>
      <div className={`${OFC_SECTION_INNER} relative`}>
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-10 xl:gap-12">
          <div className="min-w-0 order-1">
            <p className="inline-block rounded-full bg-[#EAF3FF] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#101936]">
              Formation professionnelle · IA &amp; BTP
            </p>
            <h1 className="mt-4 font-display text-[clamp(1.65rem,1.2rem+1.6vw,2.35rem)] font-extrabold leading-[1.15] tracking-tight text-[#101936] text-balance">
              Formations{' '}
              <span className="text-[#377CF3]">IA</span> pour les entreprises du{' '}
              <span className="text-[#377CF3]">BTP</span> en Île-de-France
            </h1>
            <EnBref text={ACCUEIL_EN_BREF} className="mt-4 max-w-xl" />
            <p className={`${OFC_TYPE_LEAD} mt-4 max-w-xl text-[0.9375rem] leading-[1.55] text-ofc-ink-muted md:text-base`}>
              Devis, appels d&apos;offres et suivi de chantier avec ChatGPT et Claude. Des formations
              pratiques adaptées aux professionnels du bâtiment et des travaux publics.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.formations}
                data-cta="voir-formations"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 text-sm sm:w-auto md:text-base`}
              >
                Découvrir les formations
              </Link>
              <Link
                href={`${LINKS.formationIaIntraEntrepriseBtp}?src=accueil-hero`}
                data-cta="intra-hero"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 text-sm sm:w-auto md:text-base`}
              >
                Former mon équipe
              </Link>
            </div>
          </div>

          <div className="relative order-2 min-w-0">
            <div className="relative overflow-hidden rounded-2xl shadow-ofc-md ring-1 ring-ofc-border">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                width={HERO.width}
                height={HERO.height}
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="absolute top-4 right-4 flex max-w-[12.5rem] items-center gap-2 rounded-xl border border-white/90 bg-white/95 px-3 py-2.5 text-xs font-semibold leading-snug text-[#101936] shadow-md sm:max-w-none sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Des usages concrets pour vos projets BTP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
