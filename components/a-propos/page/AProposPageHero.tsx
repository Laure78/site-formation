'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import {
  A_PROPOS_PAGE_EN_BREF,
  A_PROPOS_PAGE_H1,
  A_PROPOS_PAGE_HERO_EYEBROW,
  A_PROPOS_PAGE_HERO_LEAD,
  A_PROPOS_PAGE_HOOK,
  A_PROPOS_PAGE_UPDATED_AT,
} from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';

export function AProposPageHero() {
  const photo = PHOTOS.aProposFormationGroupe;

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="a-propos-hero-title">
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 lg:px-8">
        <div className="min-w-0">
          <p className="inline-flex rounded-full border border-ofc-accent/25 bg-ofc-accent-soft px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ofc-accent">
            {A_PROPOS_PAGE_HERO_EYEBROW}
          </p>
          <h1
            id="a-propos-hero-title"
            className="mt-4 font-display text-[clamp(1.65rem,4.2vw,2.5rem)] font-extrabold leading-[1.14] tracking-tight text-[#101936]"
          >
            {A_PROPOS_PAGE_H1}
          </h1>
          <p className="mt-4 text-lg font-semibold text-[#101936]">{A_PROPOS_PAGE_HOOK}</p>
          <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ofc-ink-muted sm:text-base">
            {A_PROPOS_PAGE_HERO_LEAD.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <EnBref id="a-propos-en-bref" className="mt-5 max-w-xl">
            <p>{A_PROPOS_PAGE_EN_BREF}</p>
          </EnBref>
          <ContentUpdatedLine date={A_PROPOS_PAGE_UPDATED_AT} className="mt-3" />
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
            >
              Découvrir nos formations
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={LINKS.formateurs}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Découvrir notre équipe
            </Link>
          </div>
        </div>
        <figure className="relative min-w-0">
          <div className="overflow-hidden rounded-2xl border border-ofc-border bg-[#F2F2F2] shadow-sm">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 46vw"
              priority
              quality={85}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}