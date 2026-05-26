import type { CalendlyEmbedProps } from '@/components/CalendlyEmbed';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

type RdvLinkProps = Omit<CalendlyEmbedProps, 'type'> & {
  page?: string;
};

/** Bouton popup Calendly — alias métier pour prise de RDV. */
export function RdvLink({
  className,
  children,
  page,
  ctaPosition = 'unknown',
  campaign,
  variant = 'unstyled',
  ...rest
}: RdvLinkProps) {
  return (
    <CalendlyEmbed
      type="popup"
      className={className}
      ctaPosition={ctaPosition}
      campaign={campaign}
      variant={variant}
      {...rest}
    >
      {children}
    </CalendlyEmbed>
  );
}
