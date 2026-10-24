import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';
import { CATALOGUE_HERO_SUBTITLE } from '@/lib/formations-catalogue-page-config';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export function FormationsCatalogue2027Hero() {
  const heroVisual = PHOTOS.formationsCatalogueHero2026;

  return (
    <section
      id="formations-catalogue-hero"
      className={`${OFC_SEC.hero} relative overflow-hidden pb-6 md:pb-8`}
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-12">
          <div className="min-w-0">
            <h1
              id="formations-catalogue-hero-h1"
              className="ofc-type-hero max-w-3xl text-balance text-ofc-ink"
            >
              Catalogue des formations IA pour le BTP
            </h1>
            <p className="ofc-type-lead mt-3 max-w-2xl text-ofc-ink-muted">{CATALOGUE_HERO_SUBTITLE}</p>
          </div>

          <aside className="mx-auto hidden w-full max-w-[340px] shrink-0 lg:mx-0 lg:block lg:max-w-none">
            <div className="ofc-card overflow-hidden bg-white/95 p-1.5 shadow-sm">
              <Image
                src={heroVisual.src}
                alt={heroVisual.alt}
                title={heroVisual.title}
                width={heroVisual.width}
                height={heroVisual.height}
                loading="lazy"
                className="h-auto w-full rounded-[1.05rem] object-contain"
                sizes="360px"
                quality={80}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
