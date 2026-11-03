import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_LEAD } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';
import { ACCUEIL_MAQUETTE_ICON_STROKE } from '@/components/landing/accueil/accueil-maquette-icons';

const HERO = PHOTOS.accueilHeroEquipeBtp;

const BTN_PRIMARY =
  'inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0755E8] px-5 py-2.5 text-sm font-semibold text-white motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:bg-[#0648c7] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755E8] sm:w-auto';

const BTN_SECONDARY =
  'inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#0755E8] bg-white px-5 py-2.5 text-sm font-semibold text-[#0755E8] motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:bg-[#F5F9FF] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755E8] sm:w-auto';

/** Hero accueil — reproduction maquette (texte ~44 % · visuel ~56 %). */
export function AccueilHeroSection() {
  return (
    <section id="accueil-hero" className="relative overflow-hidden bg-white">
      <div className={`${OFC_SECTION_INNER} accueil-maquette__inner relative px-4 sm:px-6 lg:px-8`}>
        <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-8">
          <div className="accueil-hero-content min-w-0 order-1">
            <p className="inline-block rounded-full bg-[#EAF3FF] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#081A3D] sm:text-[11px]">
              Formations professionnelles · BTP
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.5rem,1.05rem+1.45vw,2.125rem)] font-extrabold leading-[1.14] tracking-tight text-[#081A3D] text-balance">
              Formations IA et parcours métiers pour les professionnels du BTP
            </h1>
            <p
              className={`${OFC_TYPE_LEAD} mt-3 max-w-xl text-[0.875rem] leading-[1.5] text-ofc-ink-muted md:text-[0.9375rem]`}
            >
              Développez les compétences de vos équipes et intégrez l&apos;IA dans vos devis, appels
              d&apos;offres, chantiers et activités administratives.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link href="#accueil-formations-ia" data-cta="voir-formations" className={BTN_PRIMARY}>
                Voir les formations IA
                <ArrowRight className="h-4 w-4" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
              </Link>
              <Link
                href="#accueil-parcours-metiers"
                data-cta="parcours-metiers-hero"
                className={BTN_SECONDARY}
              >
                Découvrir les parcours métiers
                <ArrowRight className="h-4 w-4" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="accueil-hero-aside relative order-2 min-w-0">
            <div className="relative aspect-[538/239] w-full overflow-hidden rounded-2xl bg-[#F5F9FF] shadow-ofc-md ring-1 ring-[#DAE3F0]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
