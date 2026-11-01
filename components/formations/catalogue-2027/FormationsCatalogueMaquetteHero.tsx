import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

const HERO_CHECKS = ['Qualiopi', 'Présentiel Île-de-France', 'Sur documents métier'] as const;

export function FormationsCatalogueMaquetteHero() {
  const visual = PHOTOS.formationsCatalogueHero2026;

  return (
    <section
      id="formations-catalogue-hero"
      className="relative overflow-hidden bg-white pb-8 pt-6 md:pb-10 md:pt-8"
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_0%,#EAF3FF_0%,transparent_55%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="min-w-0 order-2 lg:order-1">
          <p className="inline-flex rounded-full bg-[#EAF3FF] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#377CF3]">
            Catalogue formations IA BTP
          </p>
          <h1
            id="formations-catalogue-hero-h1"
            className="mt-4 font-display text-[clamp(1.65rem,1.2rem+1.5vw,2.35rem)] font-extrabold leading-[1.12] tracking-tight text-[#101936] text-balance"
          >
            Formations{' '}
            <span className="text-[#377CF3]">IA</span> pour les professionnels du BTP
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Des formations concrètes pour gagner du temps sur vos devis, appels d&apos;offres et
            chantiers.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Points clés">
            {HERO_CHECKS.map((label) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D4E3FC] bg-white px-3 py-1.5 text-xs font-semibold text-[#101936] shadow-sm"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#catalogue-formations"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold md:text-base`}
            >
              Explorer les formations
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="#plan-formation-entreprise"
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-[8px] px-6 py-3 text-sm font-semibold md:text-base`}
            >
              Former mon équipe
            </Link>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-lg lg:order-2 lg:max-w-none lg:justify-self-end">
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(16,25,54,0.12)] ring-1 ring-slate-200/80">
            <Image
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
            />
          </div>
          <div className="absolute -right-1 top-4 flex items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-3 py-2.5 text-sm font-semibold text-[#101936] shadow-lg backdrop-blur-sm sm:right-4 md:top-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#377CF3] text-white text-xs font-bold">
              IA
            </span>
            IA + expertise BTP
          </div>
        </div>
      </div>
    </section>
  );
}
