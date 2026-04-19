import Image from 'next/image';
import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_FFB_OFFICIEL,
} from '@/lib/client-logos';

const LEFEBVRE_ALT =
  'Logo Lefebvre Dalloz — partenaire formation et documentation professionnelle BTP';

const LOGOS = [
  {
    src: '/images/partenaires/ffb-grand-paris-ile-de-france.png',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    width: 400,
    height: 120,
  },
  {
    src: '/images/partenaires/ffb-logo-officiel.png',
    alt: `${ALT_LOGO_FFB_OFFICIEL} — FFB Île-de-France`,
    width: 200,
    height: 80,
  },
  {
    src: '/images/partenaires/csfe-logo.png',
    alt: ALT_LOGO_CSFE,
    width: 360,
    height: 120,
  },
  {
    src: '/images/partenaires/cnam-entreprises.png',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    width: 220,
    height: 72,
  },
  {
    src: '/images/partenaires/lefebvre-dalloz.png',
    alt: LEFEBVRE_ALT,
    width: 200,
    height: 64,
  },
  {
    src: '/images/partenaires/ifrb-78.jpg',
    alt: 'Logo IFRB 77 — Institut de Formation Régional du Bâtiment, partenaire 77',
    width: 200,
    height: 80,
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
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {LOGOS.map((logo) => (
          <div
            key={logo.src}
            className="relative h-[60px] w-full max-w-[180px] grayscale transition duration-300 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-full w-full object-contain object-center"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
