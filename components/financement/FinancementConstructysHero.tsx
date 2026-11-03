import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { CtaDevis } from '@/components/CtaDevis';
import { PHOTOS } from '@/lib/photos';
import {
  OFC_CTA_SECONDARY,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';

const ANCHOR_ETAPES = '#etapes-financement';

const FINANCEMENT_HERO_SURFACE =
  'ofc-section--muted ofc-section--mesh ofc-section--divide ofc-section--hero-bg';

export function FinancementConstructysHero() {
  const photo = PHOTOS.financementConstructysHero2026;

  return (
    <section
      className={`${FINANCEMENT_HERO_SURFACE} financement-constructys-hero relative overflow-hidden px-4 pt-6 pb-8 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12`}
      aria-labelledby="financement-hero-title"
    >
      <div className="relative mx-auto grid max-w-[80rem] min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,0.39fr)_minmax(0,0.61fr)] lg:gap-8">
        <div className="min-w-0 text-center md:text-left">
          <p className="inline-flex rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#2563EB] sm:text-xs">
            Financement OPCO · Constructys · 2026
          </p>
          <h1
            id="financement-hero-title"
            className="financement-constructys-hero__title mt-4 font-display text-[clamp(1.625rem,1.15rem+1.5vw,2.375rem)] font-extrabold leading-[1.15] tracking-tight text-[#081943]"
          >
            Financer votre formation{' '}
            <span className="text-[#377CF3]">IA BTP</span> avec Constructys
          </h1>
          <p className={`${OFC_TYPE_LEAD} mx-auto mt-4 max-w-xl text-ofc-ink-muted md:mx-0`}>
            Conditions, plafonds et démarches pour les entreprises du bâtiment et des travaux
            publics.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
            <CtaDevis className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto" />
            <Link
              href={ANCHOR_ETAPES}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
            >
              Voir les démarches
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>

        <figure className="financement-constructys-hero__figure relative mx-auto w-full min-w-0 lg:mx-0">
          <div className="relative aspect-[1024/524] w-full overflow-hidden rounded-2xl bg-[#EAF3FF] shadow-[0_12px_40px_-12px_rgba(8,25,67,0.18)] ring-1 ring-[#D7E5F7]">
            <Image
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              fill
              priority
              className="object-cover object-[50%_40%]"
              sizes="(max-width: 1024px) 100vw, 61vw"
              quality={80}
            />
          </div>
          <p
            className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-xl border border-[#D7E5F7] bg-white/95 px-3 py-2 text-xs font-medium text-[#081943] shadow-md backdrop-blur-sm sm:bottom-4 sm:left-4 sm:max-w-none sm:text-sm"
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
      className="overflow-hidden rounded-2xl bg-[#081943] p-8 text-white sm:p-10 md:p-12"
      aria-labelledby="financement-cta-title"
    >
      <h2
        id="financement-cta-title"
        className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl"
      >
        Préparez votre demande avant le délai de dépôt
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
        Recevez le programme détaillé et le devis nécessaires à votre demande Constructys. Le dépôt
        et la validation restent gérés par l’entreprise avec Constructys.
      </p>
      <div className="mt-8">
        <CtaDevis
          variant="primary"
          className="inline-flex min-h-11 items-center justify-center border-0 bg-white px-6 py-3 text-[#377CF3] shadow-none hover:bg-white/95"
        />
      </div>
    </section>
  );
}
