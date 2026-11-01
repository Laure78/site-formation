/**
 * Identité juridique OFC — source unique (évite les imports circulaires
 * qualiopi-info ↔ schema-constants ↔ seo).
 * Réexportée depuis `lib/qualiopi-info.ts` (`OFC_IDENTITE`).
 */
import { SITE } from '@/lib/site-config';

export const OFC_IDENTITE = {
  raisonSociale: SITE.raisonSociale,
  formeJuridique: 'SASU',
  formeJuridiqueLongue: 'Société par Actions Simplifiée Unipersonnelle (SASU)',
  siret: SITE.siret,
  siren: '905244281',
  nda: SITE.nda,
} as const;
