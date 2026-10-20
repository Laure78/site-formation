import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export function FormationsCatalogue2027Hero() {
  const heroVisual = PHOTOS.formationsCatalogueHero2026;

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-14">
          <div className="min-w-0">
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

          <aside className="mx-auto w-full max-w-[340px] shrink-0 lg:mx-0 lg:max-w-none">
            <div className="ofc-card overflow-hidden bg-white/95 p-1.5 shadow-sm">
              <Image
                src={heroVisual.src}
                alt={heroVisual.alt}
                title={heroVisual.title}
                width={heroVisual.width}
                height={heroVisual.height}
                priority
                className="h-auto w-full rounded-[1.05rem] object-contain"
                sizes="(max-width: 1024px) 90vw, 420px"
                quality={80}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
