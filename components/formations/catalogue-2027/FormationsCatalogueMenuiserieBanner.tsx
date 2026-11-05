import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

export function FormationsCatalogueMenuiserieBanner() {
  const visual = PHOTOS.formationsCatalogueMenuiserieBanniere2026;

  return (
    <section aria-labelledby="catalogue-menuiserie-title" className="overflow-hidden rounded-2xl">
      <div className="relative min-h-[11rem] sm:min-h-[12rem]">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="(max-width: 1280px) 100vw, 80rem"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#101936]/85 via-[#101936]/55 to-[#101936]/35"
          aria-hidden
        />
        <div className="relative flex min-h-[11rem] flex-col justify-center px-5 py-8 sm:min-h-[12rem] sm:px-8 md:px-10">
          <h2
            id="catalogue-menuiserie-title"
            className="max-w-xl font-display text-xl font-bold leading-snug text-white md:text-2xl"
          >
            Vous travaillez dans la{' '}
            <span className="text-[#377CF3]">menuiserie</span> ? Une formation IA adaptée à vos
            devis et CCTP.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
            Page dédiée menuiserie extérieure, intérieure et agencement — cas d&apos;usage documentaires,
            validation humaine obligatoire.
          </p>
          <Link
            href={LINKS.formationIaMenuisierBtp}
            className="mt-5 inline-flex w-fit min-h-11 items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-2.5 text-sm font-semibold text-[#101936] transition-colors hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Découvrir la formation
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
