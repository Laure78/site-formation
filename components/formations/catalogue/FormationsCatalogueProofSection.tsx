import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { getCataloguePageProofLine } from '@/lib/formations-catalogue-page-config';
import { LINKS } from '@/lib/internal-links';
import {
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_MONITEUR_FORMATIONS,
  LOGO_MONITEUR_FORMATIONS,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const PROOF_LOGOS = [
  {
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    href: PARTNER_WEBSITES.ffbGrandParis,
    width: 400,
    height: 120,
  },
  {
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    alt: ALT_LOGO_FFB_OFFICIEL,
    href: PARTNER_WEBSITES.ffbIdf,
    width: 200,
    height: 80,
  },
  {
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    alt: ALT_LOGO_CSFE,
    href: PARTNER_WEBSITES.csfe,
    width: 360,
    height: 120,
  },
  {
    src: LOGO_MONITEUR_FORMATIONS.src,
    alt: ALT_LOGO_MONITEUR_FORMATIONS,
    href: PARTNER_WEBSITES.moniteurFormations,
    width: LOGO_MONITEUR_FORMATIONS.width,
    height: LOGO_MONITEUR_FORMATIONS.height,
  },
] as const;

/** Confiance — une seule section (Qualiopi, satisfaction, références, accessibilité). */
export function FormationsCatalogueProofSection() {
  return (
    <section
      className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-8"
      aria-labelledby="catalogue-preuves"
    >
      <h2 id="catalogue-preuves" className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
        Confiance et références
      </h2>
      <p className="mt-3 text-sm text-slate-600 md:text-base">
        {getCataloguePageProofLine()} —{' '}
        <Link href={LINKS.indicateursResultats} className={OFC_LINK}>
          Indicateurs de résultats
        </Link>
        . Accessibilité étudiée au cas par cas —{' '}
        <Link href={LINKS.accessibiliteHandicap} className={OFC_LINK}>
          aménagements handicap
        </Link>
        .
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {PROOF_LOGOS.map((logo) => (
          <li key={logo.src}>
            <ExternalLinkAnchor href={logo.href} className="block opacity-90 transition hover:opacity-100">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto max-w-[140px] object-contain md:h-11 md:max-w-[160px]"
                loading="lazy"
                quality={70}
              />
            </ExternalLinkAnchor>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-xs text-slate-500">
        Organisme certifié <QualiopiWordmark /> — catégorie actions de formation
      </p>
    </section>
  );
}
