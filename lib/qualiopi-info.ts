/**
 * Textes et données Qualiopi — source unique (indicateur 1, footer, pages légales).
 */

import { CONTACT } from '@/lib/constants';
import {
  QUALIOPI_ACCESSIBILITE_EXACT,
  QUALIOPI_CERTIFICAT_PDF_LABEL,
  QUALIOPI_CERTIFICAT_REALISATION,
  QUALIOPI_DELAI_ACCES_EXACT,
  QUALIOPI_FICHE_META,
  QUALIOPI_MENTION_PERIMETRE,
  QUALIOPI_MODALITES_ACCES_EXACT,
  QUALIOPI_NDA_MENTION_REGLEMENTAIRE,
} from '@/config/qualiopi';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { SITE_CONFIG } from '@/lib/seo';
import {
  libelleTarifIntraEntreprise,
  libelleTarifInterEntreprise,
  MODALITE_FORMATIONS_PRESENTIEL,
} from '@/lib/tarifs-sessions';
import {
  FORMATIONS_CATALOGUE,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';
import { getFormationByCode } from '@/data/formations';
import {
  DELAI_ACCES_NIV02,
  DELAI_ACCES_NIV03,
  DELAI_ACCES_NIV04,
  DELAI_ACCES_NIV05,
  EVALUATION_NIV02,
  EVALUATION_NIV03,
  EVALUATION_NIV04,
  EVALUATION_NIV05,
  MODALITES_ACCES_NIV02,
  MODALITES_ACCES_NIV04,
  MODALITES_ACCES_NIV05,
  PROGRAMME_CONTENU_CATALOGUE,
  PREREQUIS_NIV02,
  PREREQUIS_NIV03,
  PREREQUIS_NIV04,
  PREREQUIS_NIV05,
} from '@/lib/infos-pratiques-catalogue';
import type { FormationCode } from '@/data/formations';

/** Identité juridique OFC — réexport (définition : `lib/ofc-identite.ts`). */
export { OFC_IDENTITE } from '@/lib/ofc-identite';

export { QUALIOPI_CERTIFICAT_REALISATION } from '@/config/qualiopi';

export const QUALIOPI_PROGRAMME_LAST_UPDATED = QUALIOPI_FICHE_META.updatedAt;
export const QUALIOPI_FICHE_VERSION = QUALIOPI_FICHE_META.version;

export const QUALIOPI_LEGAL = {
  raisonSociale: OFC_IDENTITE.raisonSociale,
  formeJuridique: OFC_IDENTITE.formeJuridique,
  siret: OFC_IDENTITE.siret,
  nda: OFC_IDENTITE.nda,
  ndaExactMention: QUALIOPI_NDA_MENTION_REGLEMENTAIRE,
  qualiopiCategoryMention: QUALIOPI_MENTION_PERIMETRE,
  certificatPdfLabel: QUALIOPI_CERTIFICAT_PDF_LABEL,
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
  const siren = OFC_IDENTITE.siren;
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
  email: CONTACT.email,
  telephone: CONTACT.phoneDisplay,
  telephoneTel: CONTACT.phone,
} as const;

export const QUALIOPI_MODALITES_ACCES = `${QUALIOPI_MODALITES_ACCES_EXACT} ${QUALIOPI_DELAI_ACCES_EXACT}`;

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
  adresse: '14 rue Saint Jean, 75017 Paris',
  email: 'cm2c@cm2c.net',
  siteUrl: 'https://cm2c.net/',
  siteLabel: 'cm2c.net',
  conditionPrealable: `La médiation ne peut être saisie qu'après une réclamation écrite préalable auprès d'OFC restée sans réponse satisfaisante sous ${QUALIOPI_RECLAMATIONS.delaiReponse}.`,
  precisionLitiges:
    'La médiation de la consommation concerne les clients particuliers ; pour les litiges entre professionnels, règlement amiable puis juridictions compétentes selon les CGV.',
} as const;

export type InfosQualiopiProps = {
  formationTitle: string;
  prerequis: string | readonly string[];
  objectifs: readonly string[];
  contenu: readonly string[];
  programmePdfHref: string;
  duree: string;
  dureeJours?: string;
  modalitesAcces: string;
  delaiAcces: string;
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
  if (entry.ref === 'NIV-02') {
    return [PREREQUIS_NIV02];
  }
  if (entry.ref === 'NIV-03') {
    return [PREREQUIS_NIV03];
  }
  if (entry.ref === 'NIV-04') {
    return [PREREQUIS_NIV04];
  }
  if (entry.ref === 'NIV-05') {
    return [PREREQUIS_NIV05];
  }
  return [
    'Aucune compétence technique en IA requise.',
    `Ordinateur portable et connexion internet. Niveau 1 : un compte gratuit Claude AI ou ChatGPT suffit.`,
  ];
}

function tarifsPourCatalogue(entry: FormationCatalogueEntry): { inter: string; intra: string } {
  const effectif = entry.effectif.toLowerCase();
  return {
    inter: libelleTarifInterEntreprise(entry.prixHT, effectif),
    intra: libelleTarifIntraEntreprise(entry.prixHT, effectif),
  };
}

export function getInfosQualiopiForCatalogue(ref: string): InfosQualiopiProps {
  const entry = FORMATIONS_CATALOGUE.find((f) => f.ref === ref);
  const formation = getFormationByCode(ref);
  if (!entry || !formation) {
    throw new Error(`[getInfosQualiopiForCatalogue] Référence catalogue inconnue : ${ref}`);
  }
  const code = formation.code as FormationCode;
  const contenu = PROGRAMME_CONTENU_CATALOGUE[code];
  if (!contenu?.length) {
    throw new Error(`[getInfosQualiopiForCatalogue] Contenu programme manquant pour ${ref}`);
  }
  const tarifs = tarifsPourCatalogue(entry);
  const isNiv02 = code === 'NIV-02';
  const isNiv03 = code === 'NIV-03';
  const isNiv04 = code === 'NIV-04';
  const isNiv05 = code === 'NIV-05';
  return {
    formationTitle: entry.title,
    programmeRef: entry.ref,
    prerequis: prerequisPourCatalogue(entry),
    objectifs: entry.objectifs,
    contenu: [...contenu],
    programmePdfHref: formation.pdfProgramme,
    duree: entry.duree,
    dureeJours: '0,5 jour (session unique)',
    modalitesAcces: isNiv02
      ? MODALITES_ACCES_NIV02
      : isNiv04
        ? MODALITES_ACCES_NIV04
        : isNiv05
          ? MODALITES_ACCES_NIV05
          : QUALIOPI_MODALITES_ACCES_EXACT,
    delaiAcces: isNiv02
      ? DELAI_ACCES_NIV02
      : isNiv03
        ? DELAI_ACCES_NIV03
        : isNiv04
          ? DELAI_ACCES_NIV04
          : isNiv05
            ? DELAI_ACCES_NIV05
            : QUALIOPI_DELAI_ACCES_EXACT,
    tarifInter: tarifs.inter,
    tarifIntra: tarifs.intra,
    methodes: QUALIOPI_METHODES_STANDARD,
    evaluation: isNiv02
      ? [...EVALUATION_NIV02]
      : isNiv03
        ? [...EVALUATION_NIV03]
        : isNiv04
          ? [...EVALUATION_NIV04]
          : isNiv05
            ? [...EVALUATION_NIV05]
            : QUALIOPI_EVALUATION_STANDARD,
    handicap: QUALIOPI_HANDICAP_STANDARD,
    lastUpdated: formation.programmeUpdatedAt,
    version: formation.programmeVersion,
  };
}

export const QUALIOPI_CONTACTS = {
  nom: 'Laure Olivié',
  fonction: 'Présidente et référente pédagogique, administrative et handicap',
  email: SCHEMA_CONTACT.email,
  telephone: QUALIOPI_REFERENT_HANDICAP.telephone,
  telephoneTel: QUALIOPI_REFERENT_HANDICAP.telephoneTel,
  adresse: `${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}`,
  site: SITE_CONFIG.url,
} as const;
