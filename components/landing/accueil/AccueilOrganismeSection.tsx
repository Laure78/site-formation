import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';
import { AccueilMaquetteSection } from '@/components/landing/accueil/AccueilMaquetteSection';

const PHOTO = PHOTOS.accueilOrganismeSalleBtp;

const ARGUMENTS = [
  'Une expertise des processus métier du BTP.',
  'Des exercices sur des cas pratiques.',
  'Des formations en présentiel en Île-de-France.',
] as const;

/** Présentation organisme + encart recrutement — grille pleine largeur. */
export function AccueilOrganismeSection() {
  return (
    <AccueilMaquetteSection tone="muted" id="accueil-equipe" aria-labelledby="accueil-organisme-title">
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,30%)_minmax(0,1fr)_minmax(0,15.5rem)] lg:items-start lg:gap-5 xl:grid-cols-[minmax(0,32%)_minmax(0,1fr)_minmax(0,17rem)] xl:gap-6">
        <div className="min-w-0">
          <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-ofc-md ring-1 ring-ofc-border lg:aspect-[5/4]">
            <Image
              src={PHOTO.src}
              alt={PHOTO.alt}
              width={PHOTO.width}
              height={PHOTO.height}
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h2 id="accueil-organisme-title" className={`${OFC_TYPE_H2} text-xl font-extrabold text-[#101936] md:text-2xl`}>
            Un organisme de formation spécialisé en IA pour le BTP
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted md:text-[0.9375rem]">
            Laure Olivié accompagne les professionnels du bâtiment et des travaux publics dans
            l&apos;utilisation concrète de l&apos;intelligence artificielle, à partir de leurs missions
            et documents métier.
          </p>
          <ul className="mt-3 space-y-2">
            {ARGUMENTS.map((line) => (
              <li key={line} className="flex gap-2.5 text-sm leading-snug text-ofc-ink">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#377CF3]"
                  aria-hidden
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <Link href={LINKS.aPropos} className={`${OFC_LINK} font-semibold`}>
              En savoir plus sur l&apos;organisme
            </Link>
            {' · '}
            <Link href={LINKS.formateurs} className={`${OFC_LINK} font-semibold`}>
              Nos formateurs
            </Link>
          </p>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height,4.5rem)+0.75rem)]">
          <div className="rounded-xl border border-[#377CF3]/15 bg-[#EAF3FF] p-4">
            <h3 className="font-display text-base font-bold leading-snug text-[#101936]">
              Recrutement formateurs
            </h3>
            <p className="mt-1 text-[11px] font-semibold text-[#377CF3]">Catalogue 2027</p>
            <p className="mt-2 text-xs leading-relaxed text-ofc-ink-muted sm:text-sm">
              Vous connaissez le BTP et utilisez l&apos;IA ? Rejoignez notre réseau de formateurs
              indépendants.
            </p>
            <Link
              href={LINKS.nousRejoindre}
              className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-[#377CF3] bg-white px-4 py-2 text-sm font-semibold text-[#377CF3] transition hover:bg-[#377CF3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </AccueilMaquetteSection>
  );
}
