import { OFC_SEC } from '@/lib/ofc-section-classes';

export function FormationsCatalogue2027Hero() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h1
          id="formations-catalogue-hero-h1"
          className="ofc-type-hero max-w-3xl text-balance text-ofc-ink"
        >
          Catalogue des formations IA pour le BTP
        </h1>
        <p className="ofc-type-lead mt-5 max-w-2xl text-ofc-ink-muted">
          Trouvez la formation adaptée à votre métier et à vos objectifs. Découvrez les programmes
          pour utiliser l&apos;IA dans vos tâches quotidiennes et développer les compétences de
          votre équipe.
        </p>
        <p className="mt-3 text-sm font-medium text-ofc-ink">
          Formations en présentiel en Île-de-France
        </p>
      </div>
    </section>
  );
}
