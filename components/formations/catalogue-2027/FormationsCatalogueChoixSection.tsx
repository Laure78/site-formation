import Link from 'next/link';
import { FormationsOrientationWizard } from '@/components/formations/catalogue-2027/FormationsOrientationWizard';
import { FORMATION_ORIENTATION_SECTION_ID } from '@/lib/formation-orientation';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Questionnaire d’orientation — sous le catalogue principal. */
export function FormationsCatalogueChoixSection() {
  return (
    <section
      id={FORMATION_ORIENTATION_SECTION_ID}
      className="scroll-mt-24 border-b border-[#E2E8F0] bg-[#F8FAFC] py-12 md:py-14"
      aria-labelledby="formations-choix-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2 id="formations-choix-title" className="ofc-type-h2 text-ofc-ink">
          Quelle formation IA BTP choisir ?
        </h2>
        <p className="mt-3 max-w-2xl text-ofc-ink-muted">
          Si vous hésitez entre plusieurs programmes, ce questionnaire propose une recommandation
          catalogue — sans email. Les filtres ci-dessus restent la référence pour parcourir toutes les
          fiches.
        </p>

        <FormationsOrientationWizard />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={LINKS.parcoursMetiers}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Choisir mon parcours métier
          </Link>
          <Link
            href={LINKS.diagnostic}
            className="inline-flex min-h-11 items-center justify-center px-4 py-3 text-sm font-semibold text-ofc-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            Diagnostic IA BTP (analyse détaillée)
          </Link>
        </div>
      </div>
    </section>
  );
}
