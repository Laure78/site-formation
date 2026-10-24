import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { ACCUEIL_LOGOS_PARTENAIRES } from '@/lib/accueil-config';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';

const TRUST_ITEMS = [
  'Qualiopi',
  `${formatNoteSatisfactionSur5()} de satisfaction`,
  'Présentiel Île-de-France',
  'Formateurs issus du BTP',
] as const;

/** Bandeau de confiance sous le H1 — réassurance + logos clients (niveaux de gris). */
export function FormateursTrustStrip() {
  return (
    <div className="formateurs-trust-strip mt-5 space-y-5">
      <p
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ofc-ink-muted sm:text-sm"
        aria-label="Garanties et preuves"
      >
        {TRUST_ITEMS.map((label, index) => (
          <span key={label} className="inline-flex items-center gap-2">
            {index > 0 ? (
              <span className="text-ofc-ink-subtle" aria-hidden>
                ·
              </span>
            ) : null}
            <span>{label}</span>
          </span>
        ))}
      </p>

      <div className="formateurs-trust-strip__logos -mx-1 overflow-x-auto px-1 sm:overflow-visible">
        <ul
          className="flex w-max min-w-full items-center gap-6 sm:w-auto sm:flex-wrap sm:justify-start sm:gap-x-8 sm:gap-y-3"
          aria-label="Logos clients et partenaires"
        >
          {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
            <li key={logo.id} className="shrink-0">
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
      </div>
    </div>
  );
}
