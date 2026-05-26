/** Texte CTA Calendly standard — charte OFC (jamais « Cliquez ici »). */
export const CALENDLY_DEFAULT_BUTTON_TEXT = 'Réservez votre visio découverte gratuite';

export type CalendlyEmbedVariant = 'primary' | 'secondary' | 'slate' | 'nav' | 'unstyled';

export const CALENDLY_BUTTON_VARIANT_CLASS: Record<CalendlyEmbedVariant, string> = {
  primary:
    'inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]',
  secondary:
    'inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] bg-white px-8 py-4 text-base font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]',
  slate:
    'inline-flex items-center justify-center rounded-xl bg-[#1e293b] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#0f172a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]',
  nav: 'inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[#2d66d6] active:scale-[0.98] xl:px-5 xl:text-[0.9375rem]',
  unstyled: '',
};

export const CALENDLY_INLINE_DEFAULT_HEIGHT_PX = 680;
