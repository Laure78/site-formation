import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/image-props';
import {
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_UMB_FFB,
  LOGO_UMB_FFB,
} from '@/lib/client-logos';
import { Temoignage } from '@/components/Temoignage';

export type PreuveSocialeProps = {
  auteur?: string;
  /** Rôle / fonction — uniquement si un verbatim `texte` est fourni. */
  role?: string;
  /** Verbatim métier. Absent ou vide → rien n’est inventé ni affiché. */
  texte?: string;
  className?: string;
};

const LOGOS = [
  {
    id: 'ffb-grand-paris',
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    width: 400,
    height: 120,
  },
  {
    id: 'csfe',
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    alt: ALT_LOGO_CSFE,
    width: 360,
    height: 120,
  },
  {
    id: 'umb-ffb',
    src: LOGO_UMB_FFB.src,
    alt: ALT_LOGO_UMB_FFB,
    width: LOGO_UMB_FFB.width,
    height: LOGO_UMB_FFB.height,
  },
] as const;

/**
 * Bandeau de preuve sous le H1 des landings métier.
 * Logos FFB Grand Paris, CSFE, UMB-FFB — sans effectif formé publié.
 */
export function PreuveSociale({ auteur, role, texte, className = '' }: PreuveSocialeProps) {
  const quote = texte?.trim() ?? '';

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-[#F2F2F2] px-5 py-4 md:px-6 md:py-5 ${className}`.trim()}
    >
      <p className="text-center text-sm font-semibold text-[#377CF3] md:text-base">
        Organisme certifié Qualiopi — FFB Grand Paris, CSFE, UMB-FFB
      </p>
      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {LOGOS.map((logo) => (
          <li key={logo.id} className="flex h-10 items-center md:h-12">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="max-h-10 w-auto object-contain grayscale md:max-h-12"
              sizes={IMAGE_SIZES.logoPartnerBand}
              loading="lazy"
              quality={70}
            />
          </li>
        ))}
      </ul>
      {quote ? (
        <Temoignage auteur={auteur ?? ''} role={role ?? ''} texte={quote} />
      ) : null}
    </div>
  );
}
