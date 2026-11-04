/**
 * Identité juridique OFC — source unique (évite les imports circulaires
 * qualiopi-info ↔ schema-constants ↔ seo).
 * Réexportée depuis `lib/qualiopi-info.ts` (`OFC_IDENTITE`).
 */
import {
  SITE,
  siteRcsLibelle,
  siteSirenDigits,
  siteSirenDisplay,
  siteSiretSiegeFormatted,
} from '@/lib/site-config';

export const OFC_IDENTITE = {
  raisonSociale: SITE.raisonSociale,
  /** Forme inscrite au RCS (Kbis 03/11/2026) — unipersonnel possible sans changer la dénomination « SAS ». */
  formeJuridique: 'SAS',
  formeJuridiqueLongue: 'Société par actions simplifiée (SAS)',
  capitalSocial: SITE.capitalSocial,
  siren: siteSirenDisplay(),
  sirenDigits: siteSirenDigits(),
  siret: siteSiretSiegeFormatted(),
  rcsLibelle: siteRcsLibelle(),
  rcsGreffe: SITE.rcsGreffe,
  rcsNumero: SITE.rcsNumero,
  nda: SITE.nda,
  dateImmatriculationOrigine: '2021-11-17',
  dateImmatriculationRcsParis: '2026-11-03',
} as const;
