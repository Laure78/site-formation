import Image from 'next/image';
import { CtaVisio } from '@/components/CtaVisio';
import { PHOTOS } from '@/lib/photos';

export function FormationsCatalogueConversionRdv() {
  const portrait = PHOTOS.aProposHero2026;

  return (
    <aside
      className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
      aria-labelledby="catalogue-rdv-aside-title"
    >
      <div className="relative aspect-[4/3] max-h-52 w-full overflow-hidden bg-[#EAF3FF] sm:max-h-none sm:aspect-[16/10]">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          className="h-full w-full object-cover object-[center_20%]"
          sizes="(max-width: 1024px) 100vw, 400px"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h2 id="catalogue-rdv-aside-title" className="font-display text-xl font-bold text-[#101936]">
          Parlons de vos besoins
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Visio découverte gratuite pour cadrer votre parcours, le format (4 h ou 14 h sur 2 jours) et les
          options intra ou inter.
        </p>
        <CtaVisio
          src="catalogue-conversion-rdv"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center px-5 py-2.5 text-sm font-semibold sm:w-auto"
        />
      </div>
    </aside>
  );
}
