'use client';

import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { A_PROPOS_CERTIFICATIONS } from '@/lib/a-propos-eeat-content';
import { LOGO_LINKEDIN_LEARNING } from '@/lib/client-logos';

export function AProposCertificationCards() {
  return (
    <>
      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={50}>
        {A_PROPOS_CERTIFICATIONS.map((item) => (
          <div
            key={item.label}
            className="group rounded-xl border border-[#E2E8F0] bg-[#F8F8F8] p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:bg-white hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <p className="font-semibold text-[#0F172A]">{item.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.detail}</p>
          </div>
        ))}
      </RevealGroup>
      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center justify-center gap-8 rounded-xl border border-[#E2E8F0] bg-[#F8F8F8] p-6 transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
          <QualiopiBadge className="max-w-sm" />
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <Image
              src={LOGO_LINKEDIN_LEARNING.src}
              alt={LOGO_LINKEDIN_LEARNING.alt}
              width={LOGO_LINKEDIN_LEARNING.width}
              height={LOGO_LINKEDIN_LEARNING.height}
              className="h-10 w-auto max-w-[200px] object-contain bg-white"
              sizes="200px"
              loading="lazy"
              quality={70}
            />
            <p className="text-sm text-[#475569]">Instructrice officielle — cours IA BTP</p>
          </div>
        </div>
      </Reveal>
    </>
  );
}
