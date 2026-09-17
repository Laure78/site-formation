import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/**
 * Passerelle discrète Formation IA BTP → BeWork (créer avec l’IA).
 * À placer en fin de fiche formation, avant le CTA RDV final.
 */
export function FormationBeworkPasserelle() {
  return (
    <section
      className="border-b border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white px-4 py-10 md:py-12"
      aria-labelledby="formation-bework-passerelle"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
          Vous maîtrisez déjà les bases de l’IA&nbsp;?
        </p>
        <h2
          id="formation-bework-passerelle"
          className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
        >
          Passez de l’utilisation de l’IA à la création avec l’IA.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#475569]">
          Avec BeWork, découvrez comment transformer une idée en première version de site,
          application ou outil métier avec l’aide de l’intelligence artificielle.
        </p>
        <div className="mt-6">
          <Link
            href={LINKS.bework}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center border-[#1D4ED8] px-6 py-3 text-[#1D4ED8] hover:bg-[#EFF6FF]`}
          >
            Découvrir BeWork
          </Link>
        </div>
      </div>
    </section>
  );
}
