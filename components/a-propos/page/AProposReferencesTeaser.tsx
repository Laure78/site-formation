import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { A_PROPOS_REFERENCES_LOGOS } from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';

export function AProposReferencesTeaser() {
  return (
    <section aria-labelledby="references-title">
      <h2
        id="references-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Des interventions pour des réseaux et organismes reconnus
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748B]">
        Découvrez la nature de chaque intervention et les organismes concernés.
      </p>
      <ul className="mt-6 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-5">
        {A_PROPOS_REFERENCES_LOGOS.map((logo) => (
          <li
            key={logo.id}
            className="flex h-16 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-3 py-2"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="max-h-10 w-auto max-w-full object-contain"
              sizes="120px"
              loading="lazy"
              quality={70}
            />
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href={LINKS.partenaires}
          className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#377CF3] hover:underline"
        >
          Voir les références
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </p>
    </section>
  );
}
