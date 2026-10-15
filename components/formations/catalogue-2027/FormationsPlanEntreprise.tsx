import Link from 'next/link';
import { CATALOGUE_2027_INFOS_PRATIQUES } from '@/data/catalogue-2027';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function FormationsPlanEntreprise() {
  return (
    <section
      id="plan-formation-entreprise"
      className="mt-16 scroll-mt-24 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="plan-entreprise-title"
    >
      <h2 id="plan-entreprise-title" className="ofc-type-h2 text-ofc-ink">
        Plan de formation entreprise
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        Composez un plan pour votre équipe à partir des parcours métiers ou de modules ciblés.
        Intraentreprise et plan de formation : {CATALOGUE_2027_INFOS_PRATIQUES.intraTarif.toLowerCase()}.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-ofc-ink-muted">
        <li>Adaptation des modules à vos documents et processus</li>
        <li>Sessions dans vos locaux ou chez un partenaire en Île-de-France</li>
        <li>{CATALOGUE_2027_INFOS_PRATIQUES.effectifIntraMin}</li>
        <li>{CATALOGUE_2027_INFOS_PRATIQUES.financement}</li>
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={catalogueDemandeHref({
            formationOuParcours: 'Plan de formation entreprise',
            nature: 'intra',
          })}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
        >
          Adapter un parcours à mon équipe
        </Link>
        <Link
          href={LINKS.prendreRdv}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
        >
          {CTA_RDV_LABEL}
        </Link>
      </div>
    </section>
  );
}
