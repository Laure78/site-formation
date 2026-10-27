import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function FormationsCatalogueEntrepriseCompact() {
  return (
    <section
      id="plan-formation-entreprise"
      className="mt-12 scroll-mt-28 border-t border-[#E2E8F0] pt-10"
      aria-labelledby="catalogue-entreprise-title"
    >
      <h2 id="catalogue-entreprise-title" className="ofc-type-h2 text-ofc-ink">
        Vous souhaitez former votre équipe ?
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        Construisons une formation adaptée à vos métiers, à vos objectifs et à vos documents de
        travail.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.formationIaIntraEntrepriseBtp}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold`}
        >
          Découvrir les formations intra-entreprise
        </Link>
        <Link
          href={LINKS.contact}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold`}
        >
          Nous contacter
        </Link>
      </div>
    </section>
  );
}
