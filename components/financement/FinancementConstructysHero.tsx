import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { PHOTOS } from '@/lib/photos';
import { FC_CTA_PRIMARY, FC_CTA_SECONDARY } from '@/lib/financement-constructys-ui';

const ANCHOR_ETAPES = '#etapes-financement';

export function FinancementConstructysHero() {
  const photo = PHOTOS.financementConstructysHero2026;

  return (
    <section
      className="financement-constructys-hero relative overflow-hidden bg-gradient-to-b from-[#EAF3FF]/45 via-white to-white px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12"
      aria-labelledby="financement-hero-title"
    >
      <div className="relative mx-auto grid max-w-[80rem] min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,0.39fr)_minmax(0,0.61fr)] lg:gap-10">
        <div className="min-w-0 text-center lg:text-left">
          <p className="inline-flex rounded-full bg-[#EAF3FF] px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2563EB] sm:text-[0.7rem]">
            Financement OPCO · Constructys · 2026
          </p>
          <h1
            id="financement-hero-title"
            className="mt-4 font-display text-[clamp(1.625rem,1.1rem+1.55vw,2.25rem)] font-extrabold leading-[1.12] tracking-tight text-[#081943]"
          >
            Financer votre formation{' '}
            <span className="text-[#377CF3]">IA BTP</span> avec Constructys
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-[#64748B] lg:mx-0 lg:text-base">
            Conditions, plafonds et démarches pour les entreprises du bâtiment et des travaux
            publics.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <CtaVisio src="financement-constructys-hero" className={`${FC_CTA_PRIMARY} w-full sm:w-auto`} />
            <Link href={ANCHOR_ETAPES} className={`${FC_CTA_SECONDARY} w-full sm:w-auto`}>
              Voir les démarches
            </Link>
          </div>
        </div>

        <figure className="financement-constructys-hero__figure relative mx-auto w-full min-w-0 lg:mx-0">
          <div className="relative aspect-[1024/524] w-full overflow-hidden rounded-2xl bg-[#EAF3FF] shadow-[0_16px_48px_-20px_rgba(8,25,67,0.22)] ring-1 ring-[#D7E5F7]">
            <Image
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              fill
              priority
              className="object-cover object-[50%_38%]"
              sizes="(max-width: 1024px) 100vw, 61vw"
              quality={82}
            />
          </div>
          <p
            className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-xl border border-[#D7E5F7] bg-white px-3 py-2 text-xs font-semibold text-[#081943] shadow-md sm:bottom-5 sm:left-5 sm:text-sm"
            role="note"
          >
            <BadgeCheck className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
            Prise en charge selon éligibilité
          </p>
        </figure>
      </div>
    </section>
  );
}

/** CTA conversion bas de page — programme / devis Constructys. */
export function FinancementConstructysCta() {
  return (
    <section
      className="overflow-hidden rounded-2xl bg-[#081943] px-6 py-8 sm:px-10 sm:py-10"
      aria-labelledby="financement-cta-title"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl text-center md:text-left">
          <h2
            id="financement-cta-title"
            className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
          >
            Préparez votre demande avant le délai de dépôt
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
            Recevez le programme détaillé et le devis nécessaires à votre demande Constructys.
          </p>
        </div>
        <div className="flex shrink-0 justify-center md:justify-end">
          <CtaVisio
            src="financement-constructys-footer"
            variant="primary"
            className={`${FC_CTA_PRIMARY} min-w-[12rem] border-0 bg-white text-[#377CF3] shadow-none hover:bg-white/95`}
          />
        </div>
      </div>
    </section>
  );
}
