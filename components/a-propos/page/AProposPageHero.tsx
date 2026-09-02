import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import {
  A_PROPOS_PAGE_H1,
  A_PROPOS_PAGE_PROOF_LINE,
  A_PROPOS_PAGE_SUBTITLE,
} from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';

export function AProposPageHero() {
  const portrait = PHOTOS.aProposHero2026;

  return (
    <section
      className="bg-gradient-to-b from-[#EFF6FF] via-white to-white px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-12"
      aria-labelledby="a-propos-hero-title"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)]">
        <div>
          <h1
            id="a-propos-hero-title"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl"
          >
            {A_PROPOS_PAGE_H1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">
            {A_PROPOS_PAGE_SUBTITLE}
          </p>
          <p className="mt-3 text-sm font-medium text-[#64748B]">{A_PROPOS_PAGE_PROOF_LINE}</p>
          <div id="formations-cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={LINKS.formations}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              Voir les formations
            </Link>
        <Link
          href="#contact-cta"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Calendar className="h-5 w-5 shrink-0" aria-hidden />
          Réserver un échange
        </Link>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[280px] lg:mx-0 lg:justify-self-end">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            className="h-auto w-full rounded-2xl object-cover shadow-md"
            sizes="(max-width: 1024px) 240px, 280px"
            priority
            quality={80}
          />
        </figure>
      </div>
    </section>
  );
}
