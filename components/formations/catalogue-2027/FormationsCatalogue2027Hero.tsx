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
      </div>
    </section>
  );
}
