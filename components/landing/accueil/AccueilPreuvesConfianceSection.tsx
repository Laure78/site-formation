import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { ACCUEIL_LOGOS_PARTENAIRES } from '@/lib/accueil-config';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { AccueilMaquetteSection } from '@/components/landing/accueil/AccueilMaquetteSection';

/** Logos partenaires — bande compacte (SEO / E-E-A-T). */
export function AccueilPreuvesConfianceSection() {
  return (
    <AccueilMaquetteSection tone="white" aria-labelledby="accueil-preuves-title">
      <h2 id="accueil-preuves-title" className="sr-only">
        Preuves de confiance
      </h2>

      <p className="text-center font-display text-base font-bold leading-snug text-ofc-ink">
        Des entreprises du BTP en Île-de-France nous font confiance.
      </p>

      <ul
        className="accueil-maquette__grid flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8"
        aria-label="Logos clients et partenaires"
      >
        {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
          <li key={logo.id} className="shrink-0 list-none">
            <ExternalLinkAnchor
              href={logo.href}
              title={logo.linkTitle ?? `Site officiel ${logo.name}`}
              className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              <div
                className={`${PARTNER_LOGO_BAND_CELL.className} grayscale opacity-75 transition group-hover:grayscale-0 group-hover:opacity-100`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  loading="lazy"
                  sizes={PARTNER_LOGO_BAND_CELL.sizes}
                  className="object-contain object-center"
                  quality={70}
                />
              </div>
            </ExternalLinkAnchor>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-center text-xs text-ofc-ink-muted">
        {QUALIOPI_LEGAL.raisonSociale} — organisme certifié Qualiopi ·{' '}
        <Link href={QUALIOPI_LEGAL.certificatPdfHref} className={`${OFC_LINK} font-semibold`}>
          Voir le certificat
        </Link>
        {' · '}
        <Link href={LINKS.avisClients} className={`${OFC_LINK} font-semibold`}>
          Lire les avis clients
        </Link>
      </p>
    </AccueilMaquetteSection>
  );
}
