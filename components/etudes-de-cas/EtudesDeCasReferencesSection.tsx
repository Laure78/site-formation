import Link from 'next/link';
import { EtudesDeCasReferenceTeaserCard } from '@/components/etudes-de-cas/EtudesDeCasReferenceTeaserCard';
import { LINKS } from '@/lib/internal-links';
import {
  ETUDES_DE_CAS_REFERENCES_SECTION_LEAD,
  ETUDES_DE_CAS_REFERENCES_SECTION_TITLE,
  getEtudesDeCasReferencesTeaser,
} from '@/lib/etudes-de-cas-references-teaser';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

export function EtudesDeCasReferencesSection() {
  const references = getEtudesDeCasReferencesTeaser();

  return (
    <section
      className="mt-12 border-t border-slate-200/80 pt-10 md:mt-14 md:pt-12"
      aria-labelledby="etudes-cas-references-titre"
    >
      <h2
        id="etudes-cas-references-titre"
        className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
      >
        {ETUDES_DE_CAS_REFERENCES_SECTION_TITLE}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        {ETUDES_DE_CAS_REFERENCES_SECTION_LEAD}
      </p>

      <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {references.map((ref) => (
          <li key={ref.id}>
            <EtudesDeCasReferenceTeaserCard reference={ref} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Link href={LINKS.partenaires} className={OFC_CTA_PRIMARY}>
          Découvrir toutes nos références
        </Link>
      </div>
    </section>
  );
}
