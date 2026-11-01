/**
 * Configuration publique du site — source unique (identité, contact, preuves, geo siège).
 * Importer `SITE` plutôt que recoder ces valeurs dans les pages ou composants.
 */

export type SiteQualiopi = {
  readonly numero: string;
  readonly certificateur: string;
  readonly debut: string;
  readonly fin: string;
};

export type SiteAdresse = {
  readonly rue: string;
  readonly cp: string;
  readonly ville: string;
  readonly lat: number;
  readonly lng: number;
};

export type SiteContact = {
  readonly email: string;
  readonly recrutement: string;
  readonly tel: string;
  readonly telIntl: string;
};

export type SiteSatisfaction = {
  /** Affichage FR avec virgule décimale (ex. « 4,45 »). */
  readonly note: string;
  readonly repondants: number;
  readonly periode: string;
};

export type SiteConfig = {
  readonly marque: string;
  readonly raisonSociale: string;
  readonly siret: string;
  readonly nda: string;
  readonly qualiopi: SiteQualiopi;
  readonly adresse: SiteAdresse;
  readonly contact: SiteContact;
  readonly satisfaction: SiteSatisfaction;
  /** Chiffre d’abonnés LinkedIn — saisi manuellement (affichage avec espaces). */
  readonly linkedinAbonnes: string;
  /** Libellé court expérience terrain BTP (ex. « 7 ans »). */
  readonly experienceBtp: string;
  readonly sameAs: readonly string[];
};

const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/laure-olivie/' as const;
const LINKEDIN_LEARNING_INSTRUCTOR_URL =
  'https://www.linkedin.com/learning/instructors/laure-olivie' as const;
const FRANCE_NUM_ACTIVATEUR_URL =
  'https://www.francenum.gouv.fr/activateurs/ofc-creation-dentreprise' as const;

export const SITE = {
  marque: 'Laure Olivié',
  raisonSociale: "OFC Création d'Entreprise",
  siret: '905 244 281 00010',
  nda: '11788515078',
  qualiopi: {
    numero: '520911-1',
    certificateur: 'Certifopac',
    debut: '2025-01-16',
    fin: '2028-01-15',
  },
  adresse: {
    rue: '61 rue de Lyon',
    cp: '75012',
    ville: 'Paris',
    lat: 48.8466,
    lng: 2.3713,
  },
  contact: {
    email: 'contact@laureolivie.fr',
    recrutement: 'recrutement@laureolivie.fr',
    tel: '06 95 66 18 18',
    telIntl: '+33695661818',
  },
  satisfaction: {
    note: '4,45',
    repondants: 20,
    periode: 'juillet 2025 – juin 2026',
  },
  linkedinAbonnes: '15 000',
  experienceBtp: '7 ans',
  sameAs: [LINKEDIN_PROFILE_URL, LINKEDIN_LEARNING_INSTRUCTOR_URL, FRANCE_NUM_ACTIVATEUR_URL],
} as const satisfies SiteConfig;

/** Note satisfaction numérique (JSON-LD, calculs). */
export function siteSatisfactionNoteNumber(): number {
  return Number.parseFloat(SITE.satisfaction.note.replace(',', '.'));
}

/** Ligne llms.txt / GEO — satisfaction consolidée. */
export function siteSatisfactionLlmsLine(): string {
  return `${SITE.satisfaction.note}/5 (${SITE.satisfaction.repondants} répondants, questionnaires à chaud, ${SITE.satisfaction.periode})`;
}

/** Adresse postale sur une ligne (UI, mentions). */
export function siteAdresseLigne(): string {
  return `${SITE.adresse.rue}, ${SITE.adresse.cp} ${SITE.adresse.ville}`;
}

/** Siège — libellé court SEO (ex. « Paris (75012) »). */
export function siteSiegeCourt(): string {
  return `${SITE.adresse.ville} (${SITE.adresse.cp})`;
}

/** Siège — libellé avec arrondissement (ex. « Paris 12e »). */
export function siteSiegeParis12(): string {
  return 'Paris 12e';
}

/** Lieu des sessions inter-entreprises (texte complet). */
export const SITE_INTER_LIEU = 'Inter à Paris 12e (61 rue de Lyon)' as const;

/** Lieu inter — libellé court réutilisable. */
export const SITE_INTER_LIEU_COURT = 'Paris 12e (61 rue de Lyon)' as const;

/** Variante « Inter : … » (catalogue Qualiopi). */
export const SITE_INTER_LIEU_PREFIX = `Inter : ${SITE_INTER_LIEU_COURT}` as const;

/** Déplacement depuis le siège (pages départements). */
export function siteDepuisSiege(): string {
  return `Depuis ${siteSiegeParis12()} (${SITE.adresse.cp})`;
}

/** Préfixe pour phrases de trajet (« Depuis Paris 12e (75012), »). */
export const SITE_DEPUIS_SIEGE_TRAJET = `${siteDepuisSiege()},` as const;

/** Meta geo.position / ICBM. */
export function siteGeoPositionMeta(): { geoPosition: string; icbm: string } {
  const { lat, lng } = SITE.adresse;
  return {
    geoPosition: `${lat};${lng}`,
    icbm: `${lat}, ${lng}`,
  };
}

/** Abonnés LinkedIn — entier pour compteurs. */
export function siteLinkedinAbonnesCount(): number {
  return Number.parseInt(SITE.linkedinAbonnes.replace(/\s/g, ''), 10);
}

/** « plus de 15 000 abonnés » */
export function siteLinkedinFollowersLabel(): string {
  return `plus de ${SITE.linkedinAbonnes} abonnés`;
}

/** « 7 ans d'expérience dans le BTP » */
export function siteExperienceBtpLong(): string {
  return `${SITE.experienceBtp} d'expérience dans le BTP`;
}

/** Années d’expérience BTP (nombre). */
export function siteExperienceBtpAnnees(): number {
  return Number.parseInt(SITE.experienceBtp.replace(/\D/g, ''), 10);
}

export const SITE_LINKEDIN_PROFILE_URL = LINKEDIN_PROFILE_URL;
export const SITE_LINKEDIN_LEARNING_INSTRUCTOR_URL = LINKEDIN_LEARNING_INSTRUCTOR_URL;
export const SITE_FRANCE_NUM_ACTIVATEUR_URL = FRANCE_NUM_ACTIVATEUR_URL;
