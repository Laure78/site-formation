import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_FFB_OFFICIEL,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';

const LEFEBVRE_ALT =
  'Logo Lefebvre Dalloz — partenaire formation et documentation professionnelle BTP';

const LOGOS = [
  {
    id: 'ffb-grand-paris',
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    width: 400,
    height: 120,
    href: PARTNER_WEBSITES.ffbGrandParis,
    linkTitle: 'Site officiel FFB Grand Paris Île-de-France',
  },
  {
    id: 'ffb-idf',
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    alt: ALT_LOGO_FFB_OFFICIEL,
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ffbIdf,
    linkTitle: 'Site officiel FFB Île-de-France',
  },
  {
    id: 'csfe',
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    alt: ALT_LOGO_CSFE,
    width: 360,
    height: 120,
    href: PARTNER_WEBSITES.csfe,
    linkTitle: 'Site officiel CSFE — Chambre Syndicale Française de l’Étanchéité',
  },
  {
    id: 'cnam',
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    width: 220,
    height: 72,
    href: PARTNER_WEBSITES.cnamIdf,
    linkTitle: 'Site officiel CNAM entreprises Île-de-France',
  },
  {
    id: 'lefebvre-dalloz',
    src: '/images/partenaires/logo-lefebvre-dalloz-partenaire-formation-ia-btp.webp',
    alt: LEFEBVRE_ALT,
    width: 200,
    height: 64,
    href: PARTNER_WEBSITES.lefebvreDalloz,
    linkTitle: 'Site officiel Lefebvre Dalloz Formation',
  },
  {
    id: 'ifrb',
    src: '/images/partenaires/logo-ifrb-77-formation-batiment.webp',
    alt: 'Logo IFRB 77 — Institut de Formation Régional du Bâtiment, partenaire 77',
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ifrb,
    linkTitle: 'Site officiel IFRB — Institut de Formation Régional du Bâtiment',
  },
] as const;

export function FormationsPartnersStrip() {
  return (
    <section
      className="mt-16 border-y border-[#E2E8F0] bg-[#F8FAFC] py-12"
      aria-labelledby="formations-partners-logos-heading"
    >
      <h2
        id="formations-partners-logos-heading"
        className="text-center text-base font-semibold uppercase tracking-widest text-[#64748B]"
      >
        Ils ont formé leurs équipes avec Laure Olivié
      </h2>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-3">
        {LOGOS.map((logo) => (
          <ExternalLinkAnchor
            key={logo.id}
            href={logo.href}
            title={logo.linkTitle}
            className="group relative block h-[60px] w-full max-w-[180px] grayscale transition duration-300 hover:grayscale-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#377CF3]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-full w-full object-contain object-center transition group-hover:opacity-95"
            />
          </ExternalLinkAnchor>
        ))}
      </div>
    </section>
  );
}
