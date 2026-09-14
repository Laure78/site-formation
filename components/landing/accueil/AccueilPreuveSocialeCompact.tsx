import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ACCUEIL_LOGOS_PARTENAIRES } from '@/lib/accueil-config';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';

/** Bande preuve sociale légère — logos monochromes, sans carousel inaccessible. */
export function AccueilPreuveSocialeCompact() {
  return (
    <Section tone="white" aria-labelledby="accueil-preuve-sociale" className="!py-10 md:!py-14">
      <Eyebrow className="justify-center text-center">Ils me font confiance</Eyebrow>
      <h2 id="accueil-preuve-sociale" className="sr-only">
        Ils me font confiance
      </h2>
      <ul
        className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12"
        aria-label="Logos partenaires et clients"
      >
        {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
          <li key={logo.id}>
            <ExternalLinkAnchor
              href={logo.href}
              title={logo.linkTitle ?? `Site officiel ${logo.name}`}
              className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              <div className={`${PARTNER_LOGO_BAND_CELL.className} grayscale transition group-hover:grayscale-0`}>
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
    </Section>
  );
}
