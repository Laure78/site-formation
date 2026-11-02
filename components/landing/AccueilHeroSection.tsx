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
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const HERO = PHOTOS.accueilHeroEquipeBtp;

/** Hero accueil — proportions maquette (texte ~44 % · visuel ~56 %). */
export function AccueilHeroSection() {
  return (
    <section id="accueil-hero" className="relative overflow-hidden bg-white">
      <div className={`${OFC_SECTION_INNER} accueil-maquette__inner relative px-4 sm:px-6 lg:px-8`}>
        <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-8">
          <div className="min-w-0 order-1">
            <p className="inline-block rounded-full bg-[#EAF3FF] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#101936] sm:text-[11px]">
              Formation professionnelle · IA &amp; BTP
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.5rem,1.05rem+1.45vw,2.125rem)] font-extrabold leading-[1.14] tracking-tight text-[#101936] text-balance">
              Formations{' '}
              <span className="text-[#377CF3]">IA</span> pour les entreprises du{' '}
              <span className="text-[#377CF3]">BTP</span> en Île-de-France
            </h1>
            <p
              className={`${OFC_TYPE_LEAD} mt-3 max-w-xl text-[0.875rem] leading-[1.5] text-ofc-ink-muted md:text-[0.9375rem]`}
            >
              Devis, appels d&apos;offres et suivi de chantier avec ChatGPT et Claude. Des formations
              pratiques adaptées aux professionnels du bâtiment et des travaux publics.
            </p>
            <EnBref
              text={ACCUEIL_EN_BREF}
              className="mt-3 max-w-xl !px-3 !py-2.5 [&_p]:text-xs [&_p]:leading-relaxed md:[&_p]:text-[0.8125rem]"
            />
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.formations}
                data-cta="voir-formations"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 w-full items-center justify-center px-5 py-2.5 text-sm sm:w-auto`}
              >
                Découvrir les formations
              </Link>
              <Link
                href={`${LINKS.formationIaIntraEntrepriseBtp}?src=accueil-hero`}
                data-cta="intra-hero"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 w-full items-center justify-center px-5 py-2.5 text-sm sm:w-auto`}
              >
                Former mon équipe
              </Link>
            </div>
          </div>

          <div className="relative order-2 min-w-0">
            <div className="relative aspect-[5/4] w-full max-h-[min(380px,46vh)] overflow-hidden rounded-2xl shadow-ofc-md ring-1 ring-ofc-border sm:max-h-none">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                width={HERO.width}
                height={HERO.height}
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="absolute top-3 right-3 flex max-w-[11rem] items-center gap-1.5 rounded-lg border border-white/90 bg-white/95 px-2.5 py-2 text-[11px] font-semibold leading-snug text-[#101936] shadow-md sm:max-w-[13rem] sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" aria-hidden />
              Des usages concrets pour vos projets BTP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
