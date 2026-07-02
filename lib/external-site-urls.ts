/**
 * URLs de sites externes (hors maillage interne laureolivie.fr).
 * Utiliser avec ExternalLinkAnchor (noopener, noreferrer).
 */

export const EXTERNAL_SITE_URLS = {
  /** BeWork — assistante gestion travaux BTP, relais bureau-chantier (site dédié). */
  bework: 'https://www.bework.fr/',
  /** Plateforme BeWork — connexion assistants MOEX (sous-domaine Laure Olivié). */
  beworkApp: 'https://app.laureolivie.fr/',
  /** Plateforme e-learning OFC — formations IA BTP (Teachizy). */
  teachizyFormation: 'https://formation-ia-chatgpt.teachizy.fr/',
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
  login: `${EXTERNAL_SITE_URLS.teachizyFormation}connexion`,
} as const;
