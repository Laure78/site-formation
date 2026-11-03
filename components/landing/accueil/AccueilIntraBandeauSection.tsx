import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { ACCUEIL_MAQUETTE_ICON_STROKE } from '@/components/landing/accueil/accueil-maquette-icons';
import { RevealShell } from '@/components/motion/RevealShell';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

/** Bandeau bleu marine — formation intra-entreprise. */
export function AccueilIntraBandeauSection() {
  return (
    <section
      className="bg-[#101936] py-7 md:py-8"
      aria-labelledby="accueil-intra-bandeau-title"
    >
      <RevealShell
        distance={ACCUEIL_MOTION_REVEAL.distance}
        className={`${OFC_SECTION_INNER} accueil-maquette__inner flex flex-col items-start justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center lg:px-8`}
      >
        <div className="max-w-2xl">
          <h2
            id="accueil-intra-bandeau-title"
            className="flex items-start gap-3 font-display text-xl font-extrabold tracking-tight text-white md:text-2xl"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20">
              <Building2 className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
            </span>
            <span>Formez votre équipe en intra-entreprise</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/85">
            Une formation adaptée à vos métiers, vos outils et vos documents, directement dans votre
            entreprise.
          </p>
        </div>
        <Link
          href={`${LINKS.formationIaIntraEntrepriseBtp}?src=accueil-intra-bandeau`}
          data-cta="intra-bandeau"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#101936] motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:bg-white/95 motion-reduce:transition-none md:text-base"
        >
          Demander une formation intra
        </Link>
      </RevealShell>
    </section>
  );
}
