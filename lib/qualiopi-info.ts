/**
 * Textes et données Qualiopi — source unique (indicateur 1, footer, pages légales).
 */

import {
  QUALIOPI_ACCESSIBILITE_EXACT,
  QUALIOPI_CERTIFICAT_REALISATION,
  QUALIOPI_DELAI_ACCES_EXACT,
  QUALIOPI_FICHE_META,
} from '@/config/qualiopi';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { SITE_CONFIG } from '@/lib/seo';
import {
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  EFFECTIF_GROUPE_MAX,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  MENTIONS_TVA_EXONERATION_COURTE,
  MODALITE_FORMATIONS_PRESENTIEL,
  SESSION_DUREE_LIBELLE,
  TARIF_SESSION_FORFAIT_HT,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import {
  FORMATIONS_CATALOGUE,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';

export const QUALIOPI_PROGRAMME_LAST_UPDATED = QUALIOPI_FICHE_META.updatedAt;
export const QUALIOPI_FICHE_VERSION = QUALIOPI_FICHE_META.version;

export const QUALIOPI_LEGAL = {
  raisonSociale: "OFC Création d'Entreprise",
  formeJuridique: 'SASU',
  siret: SCHEMA_CONTACT.siretFormatted,
  nda: SCHEMA_CONTACT.nda,
  ndaExactMention:
    "Enregistré sous le numéro 11788515078 auprès du préfet de région Île-de-France. Cet enregistrement ne vaut pas agrément de l'État.",
  qualiopiCategoryMention:
    "La certification qualité a été délivrée au titre de la catégorie d'actions suivante : ACTIONS DE FORMATION",
  certificatNumero: '520911-1',
  /** Libellé humain (footer, pages légales). */
  certificatValidite: 'du 16/01/2025 au 15/01/2028',
  /** ISO 8601 — JSON-LD `validFrom` / `validUntil` (dérivé de `certificatValidite`). */
  certificatValidFrom: '2025-01-16',
  certificatValidUntil: '2028-01-15',
  certificatPdfHref: '/documents/certificat-qualiopi-ofc.pdf',
  organismeCertificateur: 'Certifopac',
} as const;

/**
 * Credential Qualiopi — Organization / EducationalOrganization / LocalBusiness.
 * Source unique : `QUALIOPI_LEGAL` + `SCHEMA_CONTACT` (pas de hardcode SIRET / n° certificat).
 */
export function buildQualiopiCredentialSchema(): Record<string, unknown> {
  const siren = SCHEMA_CONTACT.siretDigits.slice(0, 9);
  return {
    '@type': 'EducationalOccupationalCredential',
    name: 'Certification Qualiopi — actions de formation',
    credentialCategory: 'certification',
    identifier: QUALIOPI_LEGAL.certificatNumero,
    recognizedBy: {
      '@type': 'Organization',
      name: QUALIOPI_LEGAL.organismeCertificateur,
    },
    validFrom: QUALIOPI_LEGAL.certificatValidFrom,
    validUntil: QUALIOPI_LEGAL.certificatValidUntil,
    url: `https://annuaire-entreprises.data.gouv.fr/labels-certificats/${siren}`,
  };
}

export const QUALIOPI_REFERENT_HANDICAP = {
  nom: 'Laure Olivié',
  role: 'Référente handicap',
  email: 'laureolivie@yahoo.fr',
  telephone: '06 95 66 18 18',
  telephoneTel: '+33695661818',
} as const;

export const QUALIOPI_MODALITES_ACCES = QUALIOPI_DELAI_ACCES_EXACT;

export const QUALIOPI_METHODES_STANDARD = [
  `Formation animée en présentiel par une formatrice experte IA × BTP — ${MODALITE_FORMATIONS_PRESENTIEL}`,
  'Pédagogie active : exposés courts, démonstrations, exercices guidés et cas concrets sur documents métier.',
  'Supports pédagogiques remis selon convention (PDF, trames, prompts).',
  'Moyens techniques : ordinateur par participant, connexion internet, comptes IA (gratuits ou Pro selon parcours).',
] as const;

export const QUALIOPI_EVALUATION_STANDARD = [
  'Questionnaire de positionnement amont (attentes, niveau, cas d\'usage prioritaires).',
  'Évaluation des acquis en cours et en fin de session (mise en situation, exercices pratiques, restitution).',
  'Évaluation à chaud : questionnaire de satisfaction en fin de session.',
  QUALIOPI_CERTIFICAT_REALISATION,
] as const;

export const QUALIOPI_HANDICAP_STANDARD = QUALIOPI_ACCESSIBILITE_EXACT;

export const QUALIOPI_RECLAMATIONS = {
  email: SCHEMA_CONTACT.email,
  delaiReponse: '15 jours ouvrés',
  delaiAccuseReception: '48 h ouvrées',
} as const;

/** Médiateur de la consommation — adhésion OFC (indicateur 31 Qualiopi, art. L612-1). */
export const QUALIOPI_MEDIATION_CM2C = {
  nom: 'CM2C — Centre de la Médiation de la Consommation de Conciliateurs de justice',
  adresse: '49 rue de Ponthieu, 75008 Paris',
  siteUrl: 'https://www.cm2c.net',
  siteLabel: 'www.cm2c.net',
  conditionPrealable:
    "La médiation ne peut être saisie qu'après une réclamation écrite préalable auprès d'OFC restée sans réponse satisfaisante sous 15 jours ouvrés.",
  precisionLitiges:
    'La médiation de la consommation concerne les clients particuliers ; pour les litiges entre professionnels, règlement amiable puis juridictions compétentes selon les CGV.',
} as const;

export type InfosQualiopiProps = {
  formationTitle: string;
  prerequis: string | readonly string[];
  objectifs: readonly string[];
  duree: string;
  dureeJours?: string;
  modalitesAcces: string;
  tarifInter: string;
  tarifIntra: string;
  methodes: readonly string[];
  evaluation: readonly string[];
  handicap: string;
  lastUpdated: string;
  version?: string;
  programmeRef: string;
};

function prerequisPourCatalogue(entry: FormationCatalogueEntry): string[] {
  if (entry.ref === 'NIV-02' || entry.ref === 'NIV-03' || entry.ref === 'NIV-04' || entry.ref === 'NIV-05') {
    return [
      'Maîtrise de l\'outil informatique et des usages bureautiques courants.',
      EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
      'Pour NIV-03 : niveau 1 IA BTP recommandé ou expérience équivalente sur les usages IA chantier.',
    ];
  }
  if (entry.ref === 'NIV-06') {
    return [
      'Maîtrise de l\'outil informatique. Expérience terrain BTP (chantier, appels d\'offres ou administratif).',
      EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
    ];
  }
  return [
    'Aucune compétence technique en IA requise.',
    `Ordinateur portable et connexion internet. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT}`,
  ];
}

function tarifsPourCatalogue(entry: FormationCatalogueEntry): { inter: string; intra: string } {
  const montant = TARIF_SESSION_FORFAIT_HT;
  const inter = `${formatTarifHt(montant)} € HT / session forfaitaire en inter-entreprise (${entry.effectif.toLowerCase()}). ${MENTIONS_TVA_EXONERATION_COURTE}.`;
  const intra =
    entry.ref === 'NIV-06'
      ? `Intra-entreprise : sur devis (demande de devis par email ou formulaire de contact). ${MENTIONS_TVA_EXONERATION_COURTE}.`
      : `Intra-entreprise : forfait ${formatTarifHt(montant)} € HT / session selon effectif et lieu (${entry.effectif.toLowerCase()}). ${MENTIONS_TVA_EXONERATION_COURTE}.`;
  return { inter, intra };
}

export function getInfosQualiopiForCatalogue(ref: string): InfosQualiopiProps {
  const entry = FORMATIONS_CATALOGUE.find((f) => f.ref === ref);
  if (!entry) {
    return buildLandingInfosQualiopiProps('Formation IA BTP');
  }
  const tarifs = tarifsPourCatalogue(entry);
  return {
    formationTitle: entry.title,
    programmeRef: entry.ref,
    prerequis: prerequisPourCatalogue(entry),
    objectifs: entry.objectifs,
    duree: entry.duree,
    dureeJours: '0,5 jour (session unique)',
    modalitesAcces: QUALIOPI_MODALITES_ACCES,
    tarifInter: tarifs.inter,
    tarifIntra: tarifs.intra,
    methodes: QUALIOPI_METHODES_STANDARD,
    evaluation: QUALIOPI_EVALUATION_STANDARD,
    handicap: QUALIOPI_HANDICAP_STANDARD,
    lastUpdated: QUALIOPI_PROGRAMME_LAST_UPDATED,
    version: QUALIOPI_FICHE_VERSION,
  };
}

export function buildLandingInfosQualiopiProps(formationTitle: string): InfosQualiopiProps {
  const entry = FORMATIONS_CATALOGUE[0];
  const tarifs = tarifsPourCatalogue(entry);
  return {
    formationTitle,
    programmeRef: 'NIV-01 (programme catalogue de référence)',
    prerequis: prerequisPourCatalogue(entry),
    objectifs: entry.objectifs,
    duree: SESSION_DUREE_LIBELLE,
    dureeJours: '0,5 jour (session unique)',
    modalitesAcces: QUALIOPI_MODALITES_ACCES,
    tarifInter: `${formatTarifHt(TARIF_SESSION_FORFAIT_HT)} € HT / session forfaitaire en inter-entreprise (max ${EFFECTIF_GROUPE_MAX} participants). ${MENTIONS_TVA_EXONERATION_COURTE}.`,
    tarifIntra: tarifs.intra,
    methodes: QUALIOPI_METHODES_STANDARD,
    evaluation: QUALIOPI_EVALUATION_STANDARD,
    handicap: QUALIOPI_HANDICAP_STANDARD,
    lastUpdated: QUALIOPI_PROGRAMME_LAST_UPDATED,
    version: QUALIOPI_FICHE_VERSION,
  };
}

export const QUALIOPI_CONTACTS = {
  email: SCHEMA_CONTACT.email,
  telephone: QUALIOPI_REFERENT_HANDICAP.telephone,
  telephoneTel: QUALIOPI_REFERENT_HANDICAP.telephoneTel,
  adresse: `${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}`,
  site: SITE_CONFIG.url,
} as const;
