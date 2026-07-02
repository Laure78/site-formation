import { ExternalLink, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo';

type GoogleBusinessProfileCtaProps = {
  /** Libellé du lien */
  label?: string;
  /** outline = bordure accent ; inverse = sur fond bleu ; subtle = lien discret */
  variant?: 'outline' | 'inverse' | 'subtle';
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<GoogleBusinessProfileCtaProps['variant']>, string> = {
  outline:
    'rounded-xl border-2 border-[#377CF3] px-5 py-2.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]',
  inverse:
    'rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15',
  subtle:
    'inline-flex items-center gap-1.5 font-medium text-[#377CF3] underline-offset-2 hover:underline',
};

/** Lien vers la fiche Google Business Profile (avis, horaires, local). */
export function GoogleBusinessProfileCta({
  label = 'Ma fiche Google',
  variant = 'outline',
  className = '',
}: GoogleBusinessProfileCtaProps) {
  const isSubtle = variant === 'subtle';

  return (
    <a
      href={SITE_CONFIG.googleBusinessProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Fiche Google Business — avis et informations locales"
      className={`inline-flex items-center gap-2 ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      <MapPin size={isSubtle ? 16 : 18} strokeWidth={1.5} aria-hidden />
      {label}
      {!isSubtle ? <ExternalLink size={16} strokeWidth={1.5} aria-hidden /> : null}
    </a>
  );
}
