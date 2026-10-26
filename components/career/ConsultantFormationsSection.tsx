import Link from 'next/link';
import { ConsultantParcoursMetiersCatalogue } from '@/components/career/ConsultantParcoursMetiersCatalogue';
import { LINKS } from '@/lib/internal-links';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

export function ConsultantParcoursMetiersSection() {
  if (!isParcoursMetiers2027Visible()) return null;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="parcours-metiers-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="parcours-metiers-heading" className={OFC_TYPE_H2}>
          Parcours métiers du catalogue
        </h2>
        <p className={`mt-3 text-base text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          Propositions acceptées pour les <strong>7 parcours métiers</strong> IA BTP — pas pour les
          modules isolés. Cochez vos filières dans le questionnaire ci-dessus.
        </p>
        <ConsultantParcoursMetiersCatalogue />
        <p className="mt-6 text-sm text-slate-600">
          Découvrir tous les parcours sur{' '}
          <Link href={LINKS.parcoursMetiers} className="font-medium text-[#377CF3] underline">
            Parcours métiers IA BTP
          </Link>
          , l&apos;équipe sur{' '}
          <Link href={LINKS.formateurs} className="font-medium text-[#377CF3] underline">
            nos formateurs
          </Link>{' '}
          ou en savoir plus sur{' '}
          <Link href={LINKS.aPropos} className="font-medium text-[#377CF3] underline">
            notre organisme
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
