/**
 * Identité juridique OFC — source unique (évite les imports circulaires
 * qualiopi-info ↔ schema-constants ↔ seo).
 * Réexportée depuis `lib/qualiopi-info.ts` (`OFC_IDENTITE`).
 */
export const OFC_IDENTITE = {
  raisonSociale: "OFC Création d'Entreprise",
  formeJuridique: 'SASU',
  formeJuridiqueLongue: 'Société par Actions Simplifiée Unipersonnelle (SASU)',
  siret: '905 244 281 00010',
  siren: '905244281',
  nda: '11788515078',
} as const;
