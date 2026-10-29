import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export function FormationsCatalogue2027Hero() {
  return (
    <section
      id="formations-catalogue-hero"
      className={`${OFC_SEC.hero} pb-4 md:pb-5`}
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h1
          id="formations-catalogue-hero-h1"
          className="ofc-type-hero max-w-3xl text-balance text-ofc-ink"
        >
          Catalogue des formations IA pour le BTP
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
          Programmes dispensés par{' '}
          <Link href={LINKS.aPropos} className={`${OFC_LINK} font-medium`}>
            Laure Olivié, organisme de formation spécialisé dans le BTP (OFC Création d'Entreprise)
          </Link>{' '}
          — présentiel en Île-de-France, certification Qualiopi.
        </p>
      </div>
    </section>
  );
}
