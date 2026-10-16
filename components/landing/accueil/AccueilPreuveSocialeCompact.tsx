import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_LOGOS_PARTENAIRES, getAccueilHeroReassuranceLine } from '@/lib/accueil-config';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';

type AccueilPreuveSocialeCompactProps = {
  /** Intégré au hero (sans section séparée, logos plus compacts). */
  variant?: 'section' | 'embedded';
};

const LOGO_CELL_EMBEDDED = 'relative h-10 w-[8.25rem] shrink-0 overflow-hidden md:h-11 md:w-[9rem]';

/** Bande preuve sociale légère — logos monochromes, sans carousel inaccessible. */
export function AccueilPreuveSocialeCompact({ variant = 'section' }: AccueilPreuveSocialeCompactProps) {
  const cellClass = variant === 'embedded' ? LOGO_CELL_EMBEDDED : PARTNER_LOGO_BAND_CELL.className;

  const bandeau = (
    <>
      <p
        id="accueil-preuve-sociale"
        className={
          variant === 'embedded'
            ? 'text-center font-display text-xs font-semibold tracking-tight text-ofc-ink-muted md:text-sm'
            : 'text-center font-display text-sm font-semibold tracking-tight text-ofc-ink-muted md:text-base'
        }
      >
        Ils me font confiance
      </p>
      <ul
        className={
          variant === 'embedded'
            ? 'mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-3 md:gap-x-8'
            : 'mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:mt-5 md:gap-x-10'
        }
        aria-label="Logos partenaires et clients"
      >
        {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
          <li key={logo.id}>
            <ExternalLinkAnchor
              href={logo.href}
              title={logo.linkTitle ?? `Site officiel ${logo.name}`}
              className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              <div className={`${cellClass} grayscale transition group-hover:grayscale-0`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  loading="lazy"
                  sizes={PARTNER_LOGO_BAND_CELL.sizes}
                  className="object-contain object-center opacity-70 transition group-hover:opacity-100"
                  quality={70}
                />
              </div>
            </ExternalLinkAnchor>
          </li>
        ))}
      </ul>
    </>
  );

  if (variant === 'embedded') {
    return (
      <div
        className="accueil-hero-logos mt-5 border-t border-ofc-border/80 pt-4 md:mt-6 md:pt-5"
        aria-labelledby="accueil-preuve-sociale"
      >
        {bandeau}
      </div>
    );
  }

  return (
    <Section tone="white" aria-labelledby="accueil-preuve-sociale" className="!py-4 md:!py-5">
      {bandeau}
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ofc-ink-muted md:mt-5 md:text-sm">
        {getAccueilHeroReassuranceLine()}
      </p>
    </Section>
  );
}
