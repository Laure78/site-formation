'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export function AProposCtaSection() {
  const bandeau = PHOTOS.aProposChantierBandeau;

  return (
    <section
      id="contact-cta"
      className="scroll-mt-24 bg-ofc-accent py-10 md:py-12"
      aria-labelledby="a-propos-cta-title"
    >
      <div className={`${OFC_SECTION_INNER} px-4 sm:px-6 lg:px-8`}>
        <div className="grid overflow-hidden rounded-2xl bg-[#2563EB] shadow-lg md:grid-cols-[minmax(0,42%)_minmax(0,1fr)] md:items-center">
          <div className="relative min-h-[140px] md:min-h-[220px]">
            <Image
              src={bandeau.src}
              alt={bandeau.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 42vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/40 to-transparent md:hidden" aria-hidden />
          </div>
          <div className="px-6 py-8 md:px-10 md:py-10">
            <h2 id="a-propos-cta-title" className="font-display text-2xl font-bold text-white md:text-3xl">
              Parlons des besoins de votre équipe
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
              Présentez-moi les profils à former et les documents sur lesquels votre équipe souhaite
              gagner du temps.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaVisio
                src="a-propos-cta"
                className="inline-flex min-h-11 items-center justify-center gap-2 border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95"
              />
              <Link
                href={LINKS.formations}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border-2 border-white/50 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Voir les formations
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
