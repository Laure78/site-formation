'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { CtaVisio } from '@/components/CtaVisio';
import {
  A_PROPOS_PAGE_EN_BREF,
  A_PROPOS_PAGE_HERO_EYEBROW,
  A_PROPOS_PAGE_SUBTITLE,
  A_PROPOS_PAGE_UPDATED_AT,
} from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_TYPE_LEAD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';

export function AProposPageHero() {
  const portrait = PHOTOS.aProposHero2026;

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="a-propos-hero-title">
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,380px)] lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <p className="inline-flex rounded-full border border-ofc-accent/25 bg-ofc-accent-soft px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ofc-accent">
            {A_PROPOS_PAGE_HERO_EYEBROW}
          </p>
          <h1
            id="a-propos-hero-title"
            className="mt-5 font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-[#101936]"
          >
            Du{' '}
            <span className="text-ofc-accent">terrain</span>
            {' '}à l&apos;
            <span className="text-ofc-accent">intelligence artificielle.</span>
          </h1>
          <p className={`${OFC_TYPE_LEAD} mt-5 max-w-xl text-ofc-ink-muted`}>{A_PROPOS_PAGE_SUBTITLE}</p>
          <EnBref className="mt-5 max-w-xl">
            <p>{A_PROPOS_PAGE_EN_BREF}</p>
          </EnBref>
          <ContentUpdatedLine date={A_PROPOS_PAGE_UPDATED_AT} className="mt-3" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
            >
              Découvrir les formations
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <CtaVisio
              src="a-propos-hero"
              variant="secondary"
              className="inline-flex min-h-11 items-center justify-center px-6 py-3"
            />
          </div>
        </div>
        <figure className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-ofc-accent/10 blur-2xl" aria-hidden />
          <div className="ofc-card relative overflow-hidden p-1.5">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              className="h-auto w-full rounded-[1.05rem] object-cover"
              sizes="(max-width: 1024px) 320px, 380px"
              priority
              quality={80}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
