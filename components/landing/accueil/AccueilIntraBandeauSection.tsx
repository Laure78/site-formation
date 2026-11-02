import Link from 'next/link';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';

/** Bandeau bleu marine — formation intra-entreprise. */
export function AccueilIntraBandeauSection() {
  return (
    <section
      className="bg-[#101936] py-10 md:py-12"
      aria-labelledby="accueil-intra-bandeau-title"
    >
      <div className={`${OFC_SECTION_INNER} flex flex-col items-start justify-between gap-6 md:flex-row md:items-center`}>
        <div className="max-w-2xl">
          <h2
            id="accueil-intra-bandeau-title"
            className="font-display text-xl font-extrabold tracking-tight text-white md:text-2xl"
          >
            Formez votre équipe en intra-entreprise
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/85">
            Une formation adaptée à vos métiers, vos outils et vos documents, directement dans votre
            entreprise.
          </p>
        </div>
        <Link
          href={`${LINKS.formationIaIntraEntrepriseBtp}?src=accueil-intra-bandeau`}
          data-cta="intra-bandeau"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#101936] transition hover:bg-white/95 md:text-base"
        >
          Demander une formation intra
        </Link>
      </div>
    </section>
  );
}
