'use client';

import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { A_PROPOS_CERTIFICATIONS } from '@/lib/a-propos-eeat-content';
import { PHOTOS } from '@/lib/photos';

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
          <Image
            src={PHOTOS.qualiopiLogoOfficiel.src}
            alt={PHOTOS.qualiopiLogoOfficiel.alt}
            width={PHOTOS.qualiopiLogoOfficiel.width}
            height={PHOTOS.qualiopiLogoOfficiel.height}
            className="h-auto max-h-28 w-full max-w-sm object-contain bg-white p-2"
          />
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-wide text-[#377CF3]">LinkedIn Learning</p>
            <p className="mt-1 text-sm text-[#475569]">Instructrice officielle — cours IA BTP</p>
          </div>
        </div>
      </Reveal>
    </>
  );
}
