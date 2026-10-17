/**
 * CTA principal du header — distinct du libellé RDV long utilisé dans le corps des pages.
 */
import { LINKS } from '@/lib/internal-links';

/** Bouton header — orientation projet (Calendly via page de prise de RDV). */
export const HEADER_PRIMARY_CTA_LABEL = 'Échanger sur mon besoin' as const;

export const HEADER_PRIMARY_CTA_HREF = LINKS.prendreRdv;
