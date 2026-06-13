import { Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo';

/** Lien email inline (souligné) */
export function InlinePublicPhoneLink({ className }: { className?: string }) {
  return (
    <a href={`mailto:${SITE_CONFIG.email}`} className={className}>
      {SITE_CONFIG.email}
    </a>
  );
}

/** Lien secondaire hero/footer : email */
export function FooterTelOrMailLink({ className }: { className?: string }) {
  return (
    <a href={`mailto:${SITE_CONFIG.email}`} className={className}>
      {SITE_CONFIG.email}
    </a>
  );
}

/** Lien email — CTA secondaire (hero, footer, landings) */
export function PublicPhoneCta({
  className,
  iconSize = 20,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <a href={`mailto:${SITE_CONFIG.email}`} className={className}>
      <Mail size={iconSize} strokeWidth={1.5} aria-hidden />
      {SITE_CONFIG.email}
    </a>
  );
}
