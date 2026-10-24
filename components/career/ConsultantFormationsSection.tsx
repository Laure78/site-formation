import Link from 'next/link';
import { ConsultantParcoursMetiersCatalogue } from '@/components/career/ConsultantParcoursMetiersCatalogue';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export function ConsultantParcoursMetiersSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
      aria-labelledby="parcours-metiers-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
        <h2 id="parcours-metiers-heading" className={OFC_TYPE_H2}>
          Sur quels parcours métiers pouvez-vous intervenir ?
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          OFC recueille des propositions de consultant-formateur pour animer les{' '}
          <strong>parcours métiers</strong> du catalogue (7 filières BTP). Indiquez dans le
          formulaire ceux sur lesquels vous souhaitez intervenir — pas les modules isolés du
          catalogue général.
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
