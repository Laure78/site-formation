/**
 * URLs de sites externes (hors maillage interne laureolivie.fr).
 * Utiliser avec ExternalLinkAnchor (noopener, noreferrer).
 */

export const EXTERNAL_SITE_URLS = {
  /** BeWork — solutions IA sur mesure pour le BTP (site dédié). */
  bework: 'https://www.bework.fr/',
  /** Plateforme BeWork — connexion espace entreprise (sous-domaine Laure Olivié). */
  beworkApp: 'https://app.laureolivie.fr/',
  /** Espace apprenant OFC — plateforme Teachizy (formation IA ChatGPT BTP). */
  teachizyFormation: 'https://formation-ia-chatgpt.teachizy.fr/',
  /** OPCO Constructys — conditions et actualités financement formation BTP. */
  constructys: 'https://www.constructys.fr/',
  /** Plateforme de dépôt des dossiers de financement Constructys. */
  constructysEgestion: 'https://egestion.constructys.fr/',
  /** AGEFIPH — insertion professionnelle et handicap. */
  agefiph: 'https://www.agefiph.fr/',
} as const;

/** Chemins utiles sur app.laureolivie.fr */
export const BEWORK_APP_PATHS = {
  login: `${EXTERNAL_SITE_URLS.beworkApp}auth/connexion`,
  signup: `${EXTERNAL_SITE_URLS.beworkApp}auth/inscription`,
  lexique: `${EXTERNAL_SITE_URLS.beworkApp}lexique`,
} as const;

/** Chemins utiles sur la plateforme Teachizy (stagiaires OFC). */
export const TEACHIZY_PATHS = {
  home: EXTERNAL_SITE_URLS.teachizyFormation,
  login: EXTERNAL_SITE_URLS.teachizyFormation,
} as const;
