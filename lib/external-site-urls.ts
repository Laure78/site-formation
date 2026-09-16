/**
 * URLs de sites externes (hors maillage interne laureolivie.fr).
 * Utiliser avec ExternalLinkAnchor (noopener, noreferrer).
 */

export const EXTERNAL_SITE_URLS = {
  /** BeWork — formation « créer avec l’IA sans savoir coder » (site dédié). */
  bework: 'https://www.bework.fr/',
  /** Page formation BeWork (parcours 7 h / 14 h). */
  beworkFormation: 'https://www.bework.fr/formation',
  /** FAQ formation BeWork. */
  beworkFaq: 'https://www.bework.fr/faq',
  /** Demande de place / inscription session BeWork. */
  beworkParticiper: 'https://www.bework.fr/contact#participer',
  /** Plateforme BeWork — connexion espace entreprise (sous-domaine Laure Olivié). */
  beworkApp: 'https://app.laureolivie.fr/',
  /** Legacy Teachizy — import contenus uniquement (scripts/import-teachizy). */
  teachizyFormation: 'https://formation-ia-chatgpt.teachizy.fr/',
  /** OPCO Constructys — conditions et actualités financement formation BTP. */
  constructys: 'https://www.constructys.fr/',
  /** Plateforme de dépôt des dossiers de financement Constructys. */
  constructysEgestion: 'https://egestion.constructys.fr/',
  /** AGEFIPH — insertion professionnelle et handicap. */
  agefiph: 'https://www.agefiph.fr/',
  /** AGEFIPH — Ressource Handicap Formation (RHF). */
  agefiphRhf: 'https://www.agefiph.fr/services/ressource-handicap-formation',
  /** Cap emploi — accompagnement emploi des personnes en situation de handicap. */
  capEmploi: 'https://www.capemploi.info/',
  /** Service-Public — MDPH / MDA (orientation départementale). */
  servicePublicMdph: 'https://www.service-public.fr/particuliers/vosdroits/F16575',
  /** Mon Parcours Handicap — portail public d'information. */
  monParcoursHandicap: 'https://www.monparcourshandicap.gouv.fr/',
  /** Questionnaire de positionnement pré-formation (Tally) — toutes les sessions IA BTP. */
  questionnairePositionnement: 'https://tally.so/r/mVK6Ay',
  /** Questionnaire de satisfaction à chaud (Tally) — toutes les sessions IA BTP. */
  questionnaireSatisfaction: 'https://tally.so/r/3NNq7l',
} as const;

/** Chemins utiles sur app.laureolivie.fr */
export const BEWORK_APP_PATHS = {
  login: `${EXTERNAL_SITE_URLS.beworkApp}auth/connexion`,
  signup: `${EXTERNAL_SITE_URLS.beworkApp}auth/inscription`,
  lexique: `${EXTERNAL_SITE_URLS.beworkApp}lexique`,
} as const;
