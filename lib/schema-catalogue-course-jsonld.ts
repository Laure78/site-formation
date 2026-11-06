/**
 * JSON-LD `Course` — catalogue officiel (NIV-01 à NIV-10).
 * Données fixes : `lib/schema-constants.ts`, `lib/internal-links.ts`, `lib/tarifs-sessions.ts`.
 * Objectifs pédagogiques (`teaches`) : source `lib/formations-catalogue-display.ts`.
 */
import {
  CATALOGUE_DUREE_BASES_IA_ONLY,
  formationTimeRequiredIso,
  getFormationByCode,
  libelleEffectifFormation,
  libelleEffectifMaxFormation,
  type FormationCode,
} from '@/data/formations';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { TARIF_INTER_DEV_WEB_IA_14H_HT } from '@/lib/formation-developpement-web-ia-content';
import { LINKS } from '@/lib/internal-links';
import { TARIF_PARTICIPANT_NIV02_HT } from '@/lib/tarifs-catalogue-participant';
import { getFormationCatalogueImageObjectJsonLd } from '@/lib/photo-seo';
import {
  SCHEMA_CONTACT,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import {
  FORMATION_COURSE_OFFER_CATEGORY,
  buildFormationCourseInstances,
  buildFormationFicheCourseJsonLd,
} from '@/lib/schema-formation-course-jsonld';
import { buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';
import { SITE, siteProviderIdentifierSchema } from '@/lib/site-config';

/** URLs legacy NIV-06/07/08 (301 → NIV-10) — distinctes des constantes `LINKS` canoniques. */
const LEGACY_APPLICATION_METIER_PATH = {
  niveau1: '/formations/application-metier-btp-niveau-1',
  niveau2: '/formations/application-metier-btp-niveau-2',
  niveau3: '/formations/application-metier-btp-niveau-3',
} as const;

const APPLICATION_METIER_PATH_BY_REF = {
  'NIV-06': LEGACY_APPLICATION_METIER_PATH.niveau1,
  'NIV-07': LEGACY_APPLICATION_METIER_PATH.niveau2,
  'NIV-08': LEGACY_APPLICATION_METIER_PATH.niveau3,
} as const;

const CATALOGUE_REF_BY_PATH: Record<string, string> = {
  [LINKS.formationIaBtpNiveau1BatimentTp]: 'NIV-01',
  [LINKS.formationAO]: 'NIV-02',
  [LINKS.formationConduiteTravauxSuiviChantier]: 'NIV-03',
  [LINKS.formationMaitriserClaudeAiBtp]: 'NIV-04',
  [LINKS.formationIaMaitriseOeuvre]: 'NIV-05',
  [LINKS.formationIaAssistanceMaitriseOuvrage]: 'NIV-11',
  [LINKS.formationIaMaitriseOeuvreCctpDpgf]: 'NIV-12',
  [LEGACY_APPLICATION_METIER_PATH.niveau1]: 'NIV-06',
  [LEGACY_APPLICATION_METIER_PATH.niveau2]: 'NIV-07',
  [LEGACY_APPLICATION_METIER_PATH.niveau3]: 'NIV-08',
  [LINKS.formationAssistantsIaPersonnalisesBtp]: 'NIV-09',
  [LINKS.formationDeveloppementWebIaSansCoder]: 'NIV-10',
};

function priceSpecDescription(ref: string): string {
  const f = getFormationByCode(ref);
  if (f?.tarifParticipantHt && f.tarifParticipantHt > 0) {
    const effectif =
      f.effectifMin === f.effectifMax
        ? libelleEffectifMaxFormation(f)
        : libelleEffectifFormation(f);
    return `Tarif HT / participant — ${effectif}`;
  }
  if (f && f.prixHT <= 0) {
    return 'Session collective — tarif sur devis (HT / participant)';
  }
  if (f?.tarifParcoursAppMetier) {
    return 'Session collective — tarif sur devis (HT / participant)';
  }
  if (!f) return 'Tarif HT / participant';
  const effectif =
    f.effectifMin === f.effectifMax
      ? libelleEffectifMaxFormation(f)
      : libelleEffectifFormation(f);
  return `Tarif HT / participant — ${effectif}`;
}

const PRICE_SPEC_DESCRIPTION_BY_REF: Record<string, string> = Object.fromEntries(
  (['NIV-01', 'NIV-02', 'NIV-03', 'NIV-04', 'NIV-05', 'NIV-06', 'NIV-07', 'NIV-08', 'NIV-09', 'NIV-10', 'NIV-11', 'NIV-12'] as const).map((ref) => [
    ref,
    priceSpecDescription(ref),
  ])
);

function prixCatalogue(ref: string): number | undefined {
  if (ref === 'NIV-10') return TARIF_INTER_DEV_WEB_IA_14H_HT;
  if (ref === 'NIV-11' || ref === 'NIV-12') return TARIF_PARTICIPANT_NIV02_HT;
  const f = getFormationByCode(ref);
  if (!f) return undefined;
  if (f.tarifParticipantHt) return f.tarifParticipantHt;
  if (f.tarifParcoursAppMetier) return undefined;
  if (f.prixHT > 0) return f.prixHT;
  return undefined;
}
function teachesFromCatalogue(ref: string): string[] {
  const entry = getFormationCatalogueByRef(ref);
  if (!entry?.objectifs?.length) {
    throw new Error(`Objectifs pédagogiques manquants pour ${ref}`);
  }
  return [...entry.objectifs];
}

export type CatalogueCourseJsonLdConfig = {
  /** Chemin interne (sans domaine) — source `lib/internal-links.ts` */
  path:
    | typeof LINKS.formationIaBtpNiveau1BatimentTp
    | typeof LINKS.formationAO
    | typeof LINKS.formationConduiteTravauxSuiviChantier
    | typeof LINKS.formationMaitriserClaudeAiBtp
    | typeof LINKS.formationIaMaitriseOeuvre
    | typeof LINKS.formationIaAssistanceMaitriseOuvrage
    | typeof LINKS.formationIaMaitriseOeuvreCctpDpgf
    | typeof LINKS.formationApplicationMetierBtpNiveau1
    | typeof LINKS.formationApplicationMetierBtpNiveau2
    | typeof LINKS.formationApplicationMetierBtpNiveau3
    | typeof LINKS.formationAssistantsIaPersonnalisesBtp
    | typeof LINKS.formationDeveloppementWebIaSansCoder;
  name: string;
  description: string;
  price?: number;
  keywords: readonly string[];
  courseCode: 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-05' | 'NIV-06' | 'NIV-07' | 'NIV-08' | 'NIV-09' | 'NIV-10' | 'NIV-11' | 'NIV-12';
  educationalLevel: 'Beginner' | 'Advanced';
};

export type FormationCatalogueRichCourseConfig = {
  ref: FormationCode;
  path:
    | typeof LINKS.formationIaBtpNiveau1BatimentTp
    | typeof LINKS.formationAO
    | typeof LINKS.formationConduiteTravauxSuiviChantier
    | typeof LINKS.formationMaitriserClaudeAiBtp
    | typeof LINKS.formationIaMaitriseOeuvre
    | typeof LINKS.formationIaAssistanceMaitriseOuvrage
    | typeof LINKS.formationIaMaitriseOeuvreCctpDpgf
    | typeof LINKS.formationApplicationMetierBtpNiveau1
    | typeof LINKS.formationApplicationMetierBtpNiveau2
    | typeof LINKS.formationApplicationMetierBtpNiveau3
    | typeof LINKS.formationAssistantsIaPersonnalisesBtp
    | typeof LINKS.formationDeveloppementWebIaSansCoder
    | (typeof LEGACY_APPLICATION_METIER_PATH)[keyof typeof LEGACY_APPLICATION_METIER_PATH];
  name: string;
  description: string;
  price?: number;
  educationalLevel: 'Fondamentaux' | 'Perfectionnement' | 'Avancé';
  teaches: readonly string[];
  /** Public cible schema.org `audience.audienceType` (optionnel). */
  audienceType?: string;
};

export const CATALOGUE_COURSE_IA_BTP_NIV01: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: 'Les bases de l’IA pour les professionnels du BTP',
  description:
    `Formation IA BTP niveau débutant : ChatGPT et Claude pour préparer devis, emails, comptes rendus, DOE et PV. ${CATALOGUE_DUREE_BASES_IA_ONLY}, présentiel Île-de-France. Validation humaine obligatoire.`,
  price: prixCatalogue('NIV-01'),
  keywords: ['Devis BTP', 'administratif', 'comptes rendus', 'PPSPS', 'construction'],
  courseCode: 'NIV-01',
  educationalLevel: 'Beginner',
};

export const CATALOGUE_COURSE_IA_AO_NIV02: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAO,
  name: "L'IA appliquée aux appels d'offres BTP",
  description:
    'Formation IA appels d’offres BTP : méthode guidée pour analyser un DCE, préparer le chiffrage et structurer un mémoire technique avec l’IA. 4 h, présentiel Île-de-France, 6 à 12 participants.',
  price: prixCatalogue('NIV-02'),
  keywords: ['formation IA appels d’offres BTP', 'DCE', 'mémoire technique', 'chiffrage BTP', 'CCTP', 'DPGF'],
  courseCode: 'NIV-02',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV01: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-01',
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: CATALOGUE_COURSE_IA_BTP_NIV01.name,
  description: CATALOGUE_COURSE_IA_BTP_NIV01.description,
  price: prixCatalogue('NIV-01'),
  educationalLevel: 'Fondamentaux',
  teaches: teachesFromCatalogue('NIV-01'),
};

export const FORMATION_RICH_COURSE_NIV02: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-02',
  path: LINKS.formationAO,
  name: CATALOGUE_COURSE_IA_AO_NIV02.name,
  description: CATALOGUE_COURSE_IA_AO_NIV02.description,
  price: prixCatalogue('NIV-02'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-02'),
};

export const CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationConduiteTravauxSuiviChantier,
  name: "L'IA appliquée à la conduite de travaux",
  description:
    'Formation IA niveau 2 : conduite de travaux et suivi chantier (CCTP, CR, PPSPS). 4 h, présentiel Île-de-France.',
  price: prixCatalogue('NIV-03'),
  keywords: ['CCTP', 'DPGF', 'PPSPS', 'skills Claude', 'conduite de travaux'],
  courseCode: 'NIV-03',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV03: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-03',
  path: LINKS.formationConduiteTravauxSuiviChantier,
  name: CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03.name,
  description: CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03.description,
  price: prixCatalogue('NIV-03'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-03'),
};

export const CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationMaitriserClaudeAiBtp,
  name: getFormationByCode('NIV-04')!.titre,
  description: `${getFormationByCode('NIV-04')!.accroche} Session ${getFormationByCode('NIV-04')!.duree}, présentiel Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-04'),
  keywords: ['Projets Claude', 'Skills', 'Cowork', 'Claude Code', 'connecteurs BTP'],
  courseCode: 'NIV-04',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV04: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-04',
  path: LINKS.formationMaitriserClaudeAiBtp,
  name: CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04.name,
  description: CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04.description,
  price: prixCatalogue('NIV-04'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-04'),
};

export const CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaMaitriseOeuvre,
  name: "L'IA au service des maîtres d'œuvre",
  description:
    "Formation IA niveau 2 pour maîtres d'œuvre : DCE, CR chantier, OS, réserves. 4 h, présentiel Île-de-France.",
  price: prixCatalogue('NIV-05'),
  keywords: ['MOE', 'MOEX', 'DCE', 'CR chantier', 'réserves', 'Claude', 'ChatGPT'],
  courseCode: 'NIV-05',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV05: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-05',
  path: LINKS.formationIaMaitriseOeuvre,
  name: CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05.name,
  description: CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05.description,
  price: prixCatalogue('NIV-05'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-05'),
};

export const CATALOGUE_COURSE_APPLICATION_METIER_NIV06: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationApplicationMetierBtpNiveau1,
  name: getFormationByCode('NIV-06')!.titre,
  description: `${getFormationByCode('NIV-06')!.accroche} Session ${getFormationByCode('NIV-06')!.duree}, présentiel Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-06'),
  keywords: [
    'application métier BTP',
    'développement assisté IA',
    'prototype application',
    'automatiser processus BTP',
  ],
  courseCode: 'NIV-06',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV06: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-06',
  path: LEGACY_APPLICATION_METIER_PATH.niveau1,
  name: CATALOGUE_COURSE_APPLICATION_METIER_NIV06.name,
  description: CATALOGUE_COURSE_APPLICATION_METIER_NIV06.description,
  price: prixCatalogue('NIV-06'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-06'),
};

export const CATALOGUE_COURSE_APPLICATION_METIER_NIV07: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationApplicationMetierBtpNiveau2,
  name: getFormationByCode('NIV-07')!.titre,
  description: `${getFormationByCode('NIV-07')!.accroche} Session ${getFormationByCode('NIV-07')!.duree}, présentiel Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-07'),
  keywords: ['application métier connectée', 'base de données BTP', 'API', 'workflow métier'],
  courseCode: 'NIV-07',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV07: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-07',
  path: LEGACY_APPLICATION_METIER_PATH.niveau2,
  name: CATALOGUE_COURSE_APPLICATION_METIER_NIV07.name,
  description: CATALOGUE_COURSE_APPLICATION_METIER_NIV07.description,
  price: prixCatalogue('NIV-07'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-07'),
};

export const CATALOGUE_COURSE_APPLICATION_METIER_NIV08: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationApplicationMetierBtpNiveau3,
  name: getFormationByCode('NIV-08')!.titre,
  description: `${getFormationByCode('NIV-08')!.accroche} Session ${getFormationByCode('NIV-08')!.duree}, présentiel Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-08'),
  keywords: ['IA intégrée application', 'analyse documentaire BTP', 'workflow IA', 'déploiement'],
  courseCode: 'NIV-08',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV08: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-08',
  path: LEGACY_APPLICATION_METIER_PATH.niveau3,
  name: CATALOGUE_COURSE_APPLICATION_METIER_NIV08.name,
  description: CATALOGUE_COURSE_APPLICATION_METIER_NIV08.description,
  price: prixCatalogue('NIV-08'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-08'),
};

export const CATALOGUE_COURSE_ASSISTANTS_IA_NIV09: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAssistantsIaPersonnalisesBtp,
  name: getFormationByCode('NIV-09')!.titre,
  description: `${getFormationByCode('NIV-09')!.accroche} Session ${getFormationByCode('NIV-09')!.duree}, présentiel Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-09'),
  keywords: [
    'assistants IA BTP',
    'ChatGPT Plus BTP',
    'Claude Pro BTP',
    'formation assistants IA',
    'prompting BTP',
  ],
  courseCode: 'NIV-09',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV09: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-09',
  path: LINKS.formationAssistantsIaPersonnalisesBtp,
  name: CATALOGUE_COURSE_ASSISTANTS_IA_NIV09.name,
  description: CATALOGUE_COURSE_ASSISTANTS_IA_NIV09.description,
  price: prixCatalogue('NIV-09'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-09'),
};

export const CATALOGUE_COURSE_ASSISTANCE_MAITRISE_OUVRAGE_NIV11: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaAssistanceMaitriseOuvrage,
  name: getFormationByCode('NIV-11')!.titre,
  description: `${getFormationByCode('NIV-11')!.accroche} Session ${getFormationByCode('NIV-11')!.duree}, intra en Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-11'),
  keywords: ['AMO', 'assistance à maîtrise d’ouvrage', 'analyse des offres', 'rapport d’analyse', 'conduite d’opération', 'ChatGPT', 'Claude'],
  courseCode: 'NIV-11',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV11: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-11',
  path: LINKS.formationIaAssistanceMaitriseOuvrage,
  name: CATALOGUE_COURSE_ASSISTANCE_MAITRISE_OUVRAGE_NIV11.name,
  description: CATALOGUE_COURSE_ASSISTANCE_MAITRISE_OUVRAGE_NIV11.description,
  price: prixCatalogue('NIV-11'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-11'),
};

export const CATALOGUE_COURSE_MAITRISE_OEUVRE_CCTP_DPGF_NIV12: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaMaitriseOeuvreCctpDpgf,
  name: getFormationByCode('NIV-12')!.titre,
  description: `${getFormationByCode('NIV-12')!.accroche} Session ${getFormationByCode('NIV-12')!.duree}, intra en Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-12'),
  keywords: ['maîtrise d’œuvre', 'MOE', 'CCTP', 'DPGF', 'analyse des offres', 'CR chantier', 'planning', 'ChatGPT', 'Claude'],
  courseCode: 'NIV-12',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV12: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-12',
  path: LINKS.formationIaMaitriseOeuvreCctpDpgf,
  name: CATALOGUE_COURSE_MAITRISE_OEUVRE_CCTP_DPGF_NIV12.name,
  description: CATALOGUE_COURSE_MAITRISE_OEUVRE_CCTP_DPGF_NIV12.description,
  price: prixCatalogue('NIV-12'),
  educationalLevel: 'Perfectionnement',
  teaches: teachesFromCatalogue('NIV-12'),
};

function buildCatalogueOffer(
  catalogueRef: string,
  courseUrl: string,
  price: number | undefined
): Record<string, unknown> {
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    category: FORMATION_COURSE_OFFER_CATEGORY,
    availability: 'https://schema.org/InStock',
    url: courseUrl,
  };

  if (price != null) {
    offer.price = price;
    offer.priceSpecification = {
      '@type': 'PriceSpecification',
      price,
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      description: PRICE_SPEC_DESCRIPTION_BY_REF[catalogueRef] ?? FORMATION_COURSE_OFFER_CATEGORY,
    };
  } else {
    offer.description = PRICE_SPEC_DESCRIPTION_BY_REF[catalogueRef] ?? 'Session inter sur devis';
  }

  return offer;
}

function mapEducationalLevelSchema(
  level: 'Fondamentaux' | 'Perfectionnement' | 'Avancé',
): 'Beginner' | 'Advanced' {
  return level === 'Fondamentaux' ? 'Beginner' : 'Advanced';
}

/** JSON-LD `Course` enrichi — fiches catalogue NIV-01 à NIV-08 (Rich Results). */
export function buildFormationCatalogueRichCourseJsonLd(
  config: FormationCatalogueRichCourseConfig
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const courseUrl = `${base}${config.path}`;
  const catalogueRef = config.ref;
  const courseImage = getFormationCatalogueImageObjectJsonLd(catalogueRef, base);
  const organizationId = `${base}/#organization`;
  const instructorId = `${base}/#laure-olivie`;
  const educationalLevel = mapEducationalLevelSchema(config.educationalLevel);
  const durationIso = formationTimeRequiredIso(catalogueRef);

  const core = buildFormationFicheCourseJsonLd({
    name: config.name,
    description: config.description,
    path: config.path,
    courseCode: catalogueRef,
    educationalLevel,
    teaches: [...config.teaches],
    organizationId,
    instructorId,
    courseId: `${courseUrl}#course`,
    timeRequired: durationIso,
  });

  const courseNode = { ...core };
  delete (courseNode as { '@context'?: unknown })['@context'];

  return {
    '@context': 'https://schema.org',
    ...courseNode,
    timeRequired: durationIso,
    hasCourseInstance: buildFormationCourseInstances(durationIso),
    ...(courseImage ? { image: courseImage } : {}),
    ...(config.audienceType
      ? {
          audience: {
            '@type': 'Audience',
            audienceType: config.audienceType,
          },
        }
      : {}),
    provider: {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE.raisonSociale,
      url: base,
      identifier: (() => {
        const id = siteProviderIdentifierSchema();
        return { '@type': 'PropertyValue', name: id.name, value: id.value };
      })(),
      hasCredential: buildQualiopiCredentialSchema(),
    },
    instructor: { '@id': instructorId },
    offers: buildCatalogueOffer(catalogueRef, courseUrl, config.price),
  };
}

/** Construit le JSON-LD `Course` complet pour une fiche catalogue (legacy — composant générique). */

export const CATALOGUE_COURSE_DEV_WEB_IA_NIV10: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationDeveloppementWebIaSansCoder,
  name: 'Créer des applications métier BTP avec l’IA',
  description:
    'Formation IA pour le BTP : créer une application métier sur mesure avec l’IA, sans coder. 14 heures — 2 jours, présentiel Île-de-France, Qualiopi.',
  price: prixCatalogue('NIV-10'),
  keywords: [
    'formation ERP BTP avec IA',
    'créer un ERP BTP',
    'outil de gestion BTP',
    'application métier BTP',
    'formation IA pour le BTP',
    'ChatGPT BTP',
  ],
  courseCode: 'NIV-10',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV10: FormationCatalogueRichCourseConfig = {
  ref: 'NIV-10',
  path: LINKS.formationDeveloppementWebIaSansCoder,
  name: CATALOGUE_COURSE_DEV_WEB_IA_NIV10.name,
  description: CATALOGUE_COURSE_DEV_WEB_IA_NIV10.description,
  price: prixCatalogue('NIV-10'),
  educationalLevel: 'Avancé',
  audienceType:
    'Dirigeants de TPE et PME du BTP, conducteurs de travaux, chargés d’affaires, fonctions support, indépendants du second œuvre',
  teaches: [
    'Analyser un besoin métier et fixer un périmètre réaliste pour une première version d’application',
    'Organiser le projet : parcours utilisateur, écrans, données et priorités fonctionnelles',
    'Formuler des consignes structurées exploitables par l’IA',
    'Obtenir une première version testable et définir une feuille de route',
  ],
};

export function buildCatalogueCourseJsonLd(
  config: CatalogueCourseJsonLdConfig
): Record<string, unknown> {
  const richByCode: Record<string, FormationCatalogueRichCourseConfig> = {
    'NIV-01': FORMATION_RICH_COURSE_NIV01,
    'NIV-02': FORMATION_RICH_COURSE_NIV02,
    'NIV-03': FORMATION_RICH_COURSE_NIV03,
    'NIV-04': FORMATION_RICH_COURSE_NIV04,
    'NIV-05': FORMATION_RICH_COURSE_NIV05,
    'NIV-06': FORMATION_RICH_COURSE_NIV06,
    'NIV-07': FORMATION_RICH_COURSE_NIV07,
    'NIV-08': FORMATION_RICH_COURSE_NIV08,
    'NIV-09': FORMATION_RICH_COURSE_NIV09,
    'NIV-10': FORMATION_RICH_COURSE_NIV10,
    'NIV-11': FORMATION_RICH_COURSE_NIV11,
    'NIV-12': FORMATION_RICH_COURSE_NIV12,
  };
  const rich = richByCode[config.courseCode];
  if (!rich) {
    throw new Error(`buildCatalogueCourseJsonLd: code inconnu ${config.courseCode}`);
  }
  return buildFormationCatalogueRichCourseJsonLd({
    ...rich,
    path: config.path,
    name: config.name,
    description: config.description,
    price: config.price,
    educationalLevel: config.educationalLevel === 'Beginner' ? 'Fondamentaux' : 'Perfectionnement',
  });
}

export function buildCatalogueCourseIaBtpNiv01JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV01);
}

export function buildCatalogueCourseIaAppelsOffreNiv02JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV02);
}

export function buildCatalogueCourseConduiteTravauxNiv03JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV03);
}

export function buildCatalogueCourseMaitriserClaudeNiv04JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV04);
}

export function buildCatalogueCourseMaitriseOeuvreNiv05JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV05);
}

export function buildCatalogueCourseApplicationMetierJsonLd(
  ref: 'NIV-06' | 'NIV-07' | 'NIV-08',
): Record<string, unknown> {
  const richByRef = {
    'NIV-06': FORMATION_RICH_COURSE_NIV06,
    'NIV-07': FORMATION_RICH_COURSE_NIV07,
    'NIV-08': FORMATION_RICH_COURSE_NIV08,
  } as const;
  return buildFormationCatalogueRichCourseJsonLd(richByRef[ref]);
}

export function buildCatalogueCourseAssistantsIaNiv09JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV09);
}

export function buildCatalogueCourseAssistanceMaitriseOuvrageNiv11JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV11);
}

export function buildCatalogueCourseMaitriseOeuvreCctpDpgfNiv12JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV12);
}

/** @deprecated Utiliser buildCatalogueCourseApplicationMetierJsonLd('NIV-06') */
export function buildCatalogueCourseCursorBtpNiv06JsonLd(): Record<string, unknown> {
  return buildCatalogueCourseApplicationMetierJsonLd('NIV-06');
}

export function buildCatalogueCourseDeveloppementWebIaNiv10JsonLd(): Record<string, unknown> {
  const base = buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV10);
  const courseUrl = `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}${LINKS.formationDeveloppementWebIaSansCoder}`;
  const offer14h = buildCatalogueOffer('NIV-10', courseUrl, TARIF_INTER_DEV_WEB_IA_14H_HT);
  offer14h.name = 'Session 14 heures — 2 jours';
  offer14h.description = `${TARIF_INTER_DEV_WEB_IA_14H_HT} € HT / participant — 14 heures — 2 jours — 4 à 8 participants`;

  return {
    ...base,
    timeRequired: 'PT14H',
    offers: offer14h,
    hasCourseInstance: buildFormationCourseInstances(
      'PT14H',
      'Session inter-entreprises — présentiel — 14 heures (2 jours)',
    ),
  };
}

/** Course JSON-LD par référence catalogue NIV-01…NIV-10. */
export function buildCatalogueCourseJsonLdByRef(ref: FormationCode): Record<string, unknown> {
  const builders: Record<FormationCode, () => Record<string, unknown>> = {
    'NIV-01': buildCatalogueCourseIaBtpNiv01JsonLd,
    'NIV-02': buildCatalogueCourseIaAppelsOffreNiv02JsonLd,
    'NIV-03': buildCatalogueCourseConduiteTravauxNiv03JsonLd,
    'NIV-04': buildCatalogueCourseMaitriserClaudeNiv04JsonLd,
    'NIV-05': buildCatalogueCourseMaitriseOeuvreNiv05JsonLd,
    'NIV-06': () => buildCatalogueCourseApplicationMetierJsonLd('NIV-06'),
    'NIV-07': () => buildCatalogueCourseApplicationMetierJsonLd('NIV-07'),
    'NIV-08': () => buildCatalogueCourseApplicationMetierJsonLd('NIV-08'),
    'NIV-09': buildCatalogueCourseAssistantsIaNiv09JsonLd,
    'NIV-10': buildCatalogueCourseDeveloppementWebIaNiv10JsonLd,
    'NIV-11': buildCatalogueCourseAssistanceMaitriseOuvrageNiv11JsonLd,
    'NIV-12': buildCatalogueCourseMaitriseOeuvreCctpDpgfNiv12JsonLd,
  };
  const build = builders[ref];
  if (!build) {
    throw new Error(`buildCatalogueCourseJsonLdByRef: ref inconnue ${ref}`);
  }
  return build();
}
