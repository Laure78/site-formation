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
    /** OpenStreetMap Nominatim (node 1352821643) — 61 Rue de Lyon, 75012 Paris. */
    lat: 48.8506,
    lng: 2.3701,
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

/** Balises HTML geo.* (ISO 3166-2 — département siège). */
export const SITE_GEO_META = {
  region: 'FR-75',
  placename: SITE.adresse.ville,
} as const;

/** Meta geo.position / ICBM (WGS84, siège OFC). */
export function siteGeoPositionMeta(): { geoPosition: string; icbm: string } {
  const { lat, lng } = SITE.adresse;
  return {
    geoPosition: `${lat};${lng}`,
    icbm: `${lat}, ${lng}`,
  };
}

/** Objet `metadata.other` Next.js — geo.region, placename, position, ICBM. */
export function siteMetadataGeoOther(): Record<string, string> {
  const { geoPosition, icbm } = siteGeoPositionMeta();
  return {
    'geo.region': SITE_GEO_META.region,
    'geo.placename': SITE_GEO_META.placename,
    'geo.position': geoPosition,
    ICBM: icbm,
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

/** Chaîne YouTube — Laure Olivié (JSON-LD Person sameAs). */
export const SITE_YOUTUBE_CHANNEL_URL =
  'https://www.youtube.com/channel/UCnIc2a25xT8msvV69O2MeVg' as const;

/** Titre métier — Person (layout référence, page À propos). */
export const SITE_PERSON_JOB_TITLE = 'Formatrice IA spécialisée BTP' as const;

/** Zone de formation — présentiel catalogue (Schema.org Course / Organization). */
export const SITE_AREA_SERVED_LABEL = 'Île-de-France' as const;

/** SIRET sans espaces — taxID Schema.org. */
export function siteSiretDigits(): string {
  return SITE.siret.replace(/\s/g, '');
}

/** @id Organization — graph layout (#organization). */
export function siteSchemaOrganizationId(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}/#organization`;
}

/** @id Person — graph layout (#laure-olivie). */
export function siteSchemaPersonId(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}/#laure-olivie`;
}

/** sameAs Person — LinkedIn profil, YouTube, LinkedIn Learning. */
export function sitePersonSchemaSameAs(): readonly string[] {
  return [SITE_LINKEDIN_PROFILE_URL, SITE_YOUTUBE_CHANNEL_URL, SITE_LINKEDIN_LEARNING_INSTRUCTOR_URL];
}

/** hasCredential Qualiopi — EducationalOrganization (n° depuis SITE.qualiopi). */
export function siteQualiopiHasCredentialSchema(): Record<string, unknown> {
  return {
    '@type': 'EducationalOccupationalCredential',
    name: 'Certification Qualiopi — actions de formation',
    credentialCategory: 'certification',
    identifier: SITE.qualiopi.numero,
    recognizedBy: {
      '@type': 'Organization',
      name: SITE.qualiopi.certificateur,
    },
    validFrom: SITE.qualiopi.debut,
    validUntil: SITE.qualiopi.fin,
  };
}

/** Nœud JSON-LD layout — EducationalOrganization (sans @context). */
export function buildSiteLayoutEducationalOrganizationNode(
  siteUrl: string,
  logoAbsoluteUrl: string,
): Record<string, unknown> {
  const base = siteUrl.replace(/\/$/, '');
  return {
    '@type': 'EducationalOrganization',
    '@id': siteSchemaOrganizationId(base),
    name: SITE.raisonSociale,
    alternateName: SITE.marque,
    url: base,
    email: SITE.contact.email,
    telephone: SITE.contact.telIntl,
    logo: logoAbsoluteUrl,
    taxID: siteSiretDigits(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.adresse.rue,
      postalCode: SITE.adresse.cp,
      addressLocality: siteSiegeParis12(),
      addressCountry: 'FR',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: SITE_AREA_SERVED_LABEL,
    },
    hasCredential: siteQualiopiHasCredentialSchema(),
    sameAs: [...SITE.sameAs],
    founder: { '@id': siteSchemaPersonId(base) },
  };
}

/** Nœud JSON-LD Person — page /a-propos (sans @context). */
export function buildSiteAProposPersonSchemaNode(siteUrl: string): Record<string, unknown> {
  const base = siteUrl.replace(/\/$/, '');
  return {
    '@type': 'Person',
    '@id': siteSchemaPersonId(base),
    name: SITE.marque,
    jobTitle: SITE_PERSON_JOB_TITLE,
    url: `${base}/a-propos`,
    worksFor: {
      '@type': 'Organization',
      '@id': siteSchemaOrganizationId(base),
      name: SITE.raisonSociale,
    },
    sameAs: [...sitePersonSchemaSameAs()],
  };
}
