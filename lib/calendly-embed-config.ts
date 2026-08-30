import {
  OFC_CTA_ON_ACCENT,
  OFC_CTA_PRIMARY,
  OFC_CTA_PRIMARY_PILL,
  OFC_CTA_SECONDARY,
} from '@/lib/ofc-interaction-classes';

/** Texte CTA Calendly standard — charte OFC (jamais « Cliquez ici »). */
export const CALENDLY_DEFAULT_BUTTON_TEXT = 'Prendre rendez-vous';

export type CalendlyEmbedVariant =
  | 'primary'
  | 'secondary'
  | 'slate'
  | 'nav'
  | 'pill'
  | 'on-accent'
  | 'unstyled';

export const CALENDLY_BUTTON_VARIANT_CLASS: Record<CalendlyEmbedVariant, string> = {
  primary: OFC_CTA_PRIMARY,
  secondary: OFC_CTA_SECONDARY,
  pill: OFC_CTA_PRIMARY_PILL,
  'on-accent': OFC_CTA_ON_ACCENT,
  slate:
    'inline-flex items-center justify-center rounded-xl bg-[#1e293b] px-8 py-4 text-base font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-[#0f172a] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]',
  nav: `${OFC_CTA_PRIMARY} whitespace-nowrap rounded-full px-4 py-2.5 text-sm shadow-sm xl:px-5 xl:text-[0.9375rem]`,
  unstyled: '',
};

export const CALENDLY_INLINE_DEFAULT_HEIGHT_PX = 680;
