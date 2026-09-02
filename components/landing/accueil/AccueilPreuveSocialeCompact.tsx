import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  ACCUEIL_LOGOS_PARTENAIRES,
  getAccueilHeroReassuranceLine,
} from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';

/** Bande preuve sociale compacte — logos réels, indicateurs uniques. */
export function AccueilPreuveSocialeCompact() {
  return (
    <section className={OFC_SEC.white} aria-labelledby="accueil-preuve-sociale">
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-preuve-sociale" className="sr-only">
          Ils me font confiance
        </h2>
        <p className="text-center font-display text-lg font-semibold text-ofc-ink md:text-xl">
          Ils me font confiance
        </p>
        <ul
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-6 md:gap-x-10"
          aria-label="Logos partenaires et clients"
        >
          {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
            <li key={logo.id}>
              <ExternalLinkAnchor
                href={logo.href}
                title={logo.linkTitle ?? `Site officiel ${logo.name}`}
                className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                <div className={PARTNER_LOGO_BAND_CELL.className}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    loading="lazy"
                    sizes={PARTNER_LOGO_BAND_CELL.sizes}
                    className="object-contain object-center opacity-90 transition group-hover:opacity-100"
                    quality={70}
                  />
                </div>
              </ExternalLinkAnchor>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-600 md:text-base">
          {getAccueilHeroReassuranceLine()}
          {' · '}
          <Link href={LINKS.indicateursResultats} className={OFC_LINK}>
            Indicateurs Qualiopi
          </Link>
        </p>
      </div>
    </section>
  );
}
