import { Phone } from 'lucide-react';
import { SITE_CONFIG, siteHasPublicPhone } from '@/lib/seo';

/** Lien texte inline (souligné) — null si pas de numéro public */
export function InlinePublicPhoneLink({ className }: { className?: string }) {
  if (!siteHasPublicPhone()) return null;
  return (
    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className={className}>
      {SITE_CONFIG.phoneDisplay}
    </a>
  );
}

/** Lien secondaire hero/footer : téléphone si configuré, sinon email */
export function FooterTelOrMailLink({ className }: { className?: string }) {
  if (siteHasPublicPhone()) {
    return (
      <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className={className}>
        {SITE_CONFIG.phoneDisplay}
      </a>
    );
  }
  return (
    <a href={`mailto:${SITE_CONFIG.email}`} className={className}>
      {SITE_CONFIG.email}
    </a>
  );
}

/** Lien téléphone — rendu uniquement si un numéro public est configuré dans SITE_CONFIG */
export function PublicPhoneCta({
  className,
  iconSize = 20,
}: {
  className?: string;
  iconSize?: number;
}) {
  if (!siteHasPublicPhone()) return null;
  return (
    <a
      href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
      className={className}
    >
      <Phone size={iconSize} strokeWidth={1.5} aria-hidden />
      {SITE_CONFIG.phoneDisplay}
    </a>
  );
}
