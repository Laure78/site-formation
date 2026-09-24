import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const REASSURANCE_POINTS = [
  'Organisme certifié Qualiopi',
  'Présentiel en Île-de-France',
  'Intra et inter-entreprises',
  'Exercices sur des cas métier BTP',
] as const;

/** Hero catalogue — compact, conversion immédiate. */
export function FormationsCatalogueHero() {
  const heroVisual = PHOTOS.formationsCatalogueHero2026;
  const contentUpdatedAt = getPillarPageContentUpdatedAt('/formations');

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-[80rem]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:gap-14">
          <div className="min-w-0">
            <span className="ofc-badge bg-ofc-accent-soft text-ofc-accent">
              Catalogue formations IA pour le BTP
            </span>

            <h1
              id="formations-catalogue-hero-h1"
              className="ofc-type-hero mt-5 max-w-[18ch] text-ofc-ink text-balance"
            >
              {CATALOGUE_POSITIONNEMENT.h1}
            </h1>

            {contentUpdatedAt ? <ContentUpdatedLine date={contentUpdatedAt} /> : null}

            <p className="ofc-type-lead mt-5 max-w-2xl text-ofc-ink-muted">
              Des formations pratiques pour intégrer l&apos;IA dans vos métiers, vos documents et vos processus.
              Présentiel en Île-de-France.
            </p>

            <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm font-medium text-ofc-ink sm:grid-cols-2">
              {REASSURANCE_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-ofc-accent" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#catalogue-niveaux"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Trouver ma formation
              </a>
              <Link
                href={LINKS.prendreRdv}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Organiser une formation pour mon équipe
              </Link>
            </div>
          </div>

          <aside className="mx-auto flex w-full max-w-[300px] shrink-0 flex-col gap-5 lg:mx-0 lg:max-w-none">
            <div className="ofc-card overflow-hidden bg-white/95 p-1.5">
              <Image
                src={heroVisual.src}
                alt={heroVisual.alt}
                title={heroVisual.title}
                width={heroVisual.width}
                height={heroVisual.height}
                priority
                className="h-auto w-full rounded-[1.05rem] object-cover"
                sizes="(max-width: 1024px) 90vw, 380px"
                quality={75}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
