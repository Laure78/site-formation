'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { LINKS } from '@/lib/internal-links';

type LinkItem = { href: string; label: string };

type Props = {
  links: readonly LinkItem[];
};

export function AProposAllerPlusLoin({ links }: Props) {
  return (
    <Reveal as="section" aria-labelledby="aller-plus-loin-title" className="scroll-mt-24" distance={14}>
      <h2 id="aller-plus-loin-title" className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
        Aller plus loin
      </h2>
      <RevealGroup className="mt-8 grid gap-4 md:grid-cols-3" staggerMs={55}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="font-display text-base font-bold text-[#0F172A] transition-colors group-hover:text-[#377CF3]">
              {item.label}
            </span>
            <span className="mt-6 flex items-center gap-1 text-sm font-medium text-[#377CF3]">
              Ouvrir
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden />
            </span>
          </Link>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
