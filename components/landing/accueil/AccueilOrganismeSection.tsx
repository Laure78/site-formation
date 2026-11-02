import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

const PHOTO = PHOTOS.accueilOrganismeSalleBtp;

const ARGUMENTS = [
  'Une expertise des processus métier du BTP.',
  'Des exercices sur des cas pratiques.',
  'Des formations en présentiel en Île-de-France.',
] as const;

/** Présentation organisme + encart recrutement. */
export function AccueilOrganismeSection() {
  return (
    <Section tone="muted" id="accueil-equipe" aria-labelledby="accueil-organisme-title">
      <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start lg:gap-6 xl:gap-8">
        <div className="min-w-0 lg:col-span-4">
          <div className="overflow-hidden rounded-2xl shadow-ofc-md ring-1 ring-ofc-border">
            <Image
              src={PHOTO.src}
              alt={PHOTO.alt}
              width={PHOTO.width}
              height={PHOTO.height}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <h2 id="accueil-organisme-title" className={`${OFC_TYPE_H2} text-[#101936]`}>
            Un organisme de formation spécialisé en IA pour le BTP
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted">
            Laure Olivié accompagne les professionnels du bâtiment et des travaux publics dans
            l&apos;utilisation concrète de l&apos;intelligence artificielle, à partir de leurs missions
            et documents métier.
          </p>
          <ul className="mt-5 space-y-3">
            {ARGUMENTS.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-ofc-ink md:text-base">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2.25} aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            <Link href={LINKS.aPropos} className={`${OFC_LINK} text-sm font-semibold`}>
              En savoir plus sur l&apos;organisme
            </Link>
            {' · '}
            <Link href={LINKS.formateurs} className={`${OFC_LINK} text-sm font-semibold`}>
              Nos formateurs
            </Link>
          </p>
        </div>

        <aside className="min-w-0 lg:col-span-3">
          <div className="rounded-2xl border border-[#377CF3]/15 bg-[#EAF3FF] p-5 md:p-6">
            <h3 className="font-display text-lg font-bold leading-snug text-[#101936]">
              Recrutement de formateurs — Catalogue 2027
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
              Vous connaissez le BTP et utilisez l&apos;IA ? Rejoignez notre réseau de formateurs
              indépendants.
            </p>
            <Link
              href={LINKS.nousRejoindre}
              className={`${OFC_CTA_SECONDARY} mt-5 inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm sm:w-auto`}
            >
              En savoir plus
            </Link>
          </div>
        </aside>
      </div>
    </Section>
  );
}
