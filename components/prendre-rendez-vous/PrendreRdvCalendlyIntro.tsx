import Image from 'next/image';
import { Check } from 'lucide-react';

import {
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_LINKEDIN_LEARNING,
  ALT_LOGO_UMB_FFB,
  LOGO_LINKEDIN_LEARNING,
  LOGO_UMB_FFB,
} from '@/lib/client-logos';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { indicateursResultats } from '@/lib/data/indicateurs-resultats';
import { IMAGE_SIZES } from '@/lib/image-props';

const REASSURANCE = [
  '30 min, gratuit, sans engagement',
  'Devis personnalisé sous 24 h',
  'Organisme certifié Qualiopi — financement possible selon éligibilité',
] as const;

const PARTNER_LOGOS = [
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
  {
    id: 'linkedin-learning',
    src: LOGO_LINKEDIN_LEARNING.src,
    alt: ALT_LOGO_LINKEDIN_LEARNING,
    width: LOGO_LINKEDIN_LEARNING.width,
    height: LOGO_LINKEDIN_LEARNING.height,
  },
] as const;

/**
 * Réassurance, preuves et logos partenaires — au-dessus du widget Calendly (/prendre-rendez-vous).
 */
export function PrendreRdvCalendlyIntro() {
  return (
    <div className="mt-8 space-y-4">
      <ul className="grid gap-2.5 sm:grid-cols-3" aria-label="Engagements OFC">
        {REASSURANCE.map((text) => (
          <li
            key={text}
            className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-snug text-slate-700"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <p className="text-center text-xs text-slate-500">
        ·{' '}
        {formatNoteSatisfactionAffichageComplet()}
      </p>

      <ul
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        aria-label="Références partenaires"
      >
        {PARTNER_LOGOS.map((logo) => (
          <li key={logo.id} className="flex h-7 items-center sm:h-8">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="max-h-7 w-auto object-contain object-center grayscale opacity-80 sm:max-h-8"
              sizes={IMAGE_SIZES.logoPartnerBand}
              loading="lazy"
              quality={65}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
