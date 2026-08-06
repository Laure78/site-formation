/**
 * JSON-LD `Course` — catalogue officiel (NIV-01 à NIV-06).
 * Données fixes : `lib/schema-constants.ts`, `lib/internal-links.ts`, `lib/tarifs-sessions.ts`.
 * Objectifs pédagogiques (`teaches`) : source `lib/formations-catalogue-display.ts`.
 */
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueImageObjectJsonLd } from '@/lib/photo-seo';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';
import {
  SCHEMA_CONTACT,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import {
  FORMATION_COURSE_DURATION_ISO,
  FORMATION_COURSE_OFFER_CATEGORY,
  buildFormationFicheCourseJsonLd,
} from '@/lib/schema-formation-course-jsonld';
import { buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';
import {
  TARIF_SESSION_AVANCE_HT,
  TARIF_SESSION_DEBUTANT_HT,
} from '@/lib/tarifs-sessions';

const CATALOGUE_REF_BY_PATH: Record<FormationCatalogueRichCourseConfig['path'], string> = {
  [LINKS.formationIaBtpNiveau1BatimentTp]: 'NIV-01',
  [LINKS.formationAO]: 'NIV-02',
  [LINKS.formationConduiteTravauxSuiviChantier]: 'NIV-03',
  [LINKS.formationMaitriserClaudeAiBtp]: 'NIV-04',
  [LINKS.formationIaMaitriseOeuvre]: 'NIV-05',
  [LINKS.formationClaudeIaBtpFiche]: 'NIV-06',
};

const PRICE_SPEC_DESCRIPTION_BY_REF: Record<string, string> = {
  'NIV-01': 'Forfait session groupe HT — niveau 1, max 12 participants',
  'NIV-02': 'Forfait session groupe HT — niveau 2, 8 à 12 participants',
  'NIV-03': 'Forfait session groupe HT — niveau 2, 8 participants max',
  'NIV-04': 'Forfait session groupe HT — niveau 2, matin, 8 participants max',
  'NIV-05': 'Forfait session groupe HT — niveau 2, 3 à 8 participants',
  'NIV-06': 'Session intra sur devis — 4 h matin, 8 participants max',
};

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
    | typeof LINKS.formationClaudeIaBtpFiche;
  name: string;
  description: string;
  /** Montant HT — omis pour NIV-06 (intra sur devis). */
  price?: number;
  keywords: readonly string[];
  courseCode: 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-05' | 'NIV-06';
  educationalLevel: 'Beginner' | 'Advanced';
};

export type FormationCatalogueRichCourseConfig = {
  path:
    | typeof LINKS.formationIaBtpNiveau1BatimentTp
    | typeof LINKS.formationAO
    | typeof LINKS.formationConduiteTravauxSuiviChantier
    | typeof LINKS.formationMaitriserClaudeAiBtp
    | typeof LINKS.formationIaMaitriseOeuvre
    | typeof LINKS.formationClaudeIaBtpFiche;
  name: string;
  description: string;
  /** Montant HT — `undefined` = sur devis (NIV-06). */
  price?: number;
  educationalLevel: 'Débutant' | 'Avancé';
  teaches: readonly string[];
};

export const CATALOGUE_COURSE_IA_BTP_NIV01: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: "L'IA au service des pros du bâtiment et des travaux publics",
  description:
    'Formation IA niveau 1 pour le BTP : devis, comptes rendus, administratif. 4 h, présentiel Île-de-France.',
  price: TARIF_SESSION_DEBUTANT_HT,
  keywords: ['Devis BTP', 'administratif', 'comptes rendus', 'PPSPS', 'construction'],
  courseCode: 'NIV-01',
  educationalLevel: 'Beginner',
};

export const CATALOGUE_COURSE_IA_AO_NIV02: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAO,
  name: "L'IA appliquée aux appels d'offres BTP",
  description:
    "Formation IA niveau 2 : appels d'offres BTP, DCE, mémoire technique (Claude AI). 4 h, présentiel Île-de-France.",
  price: TARIF_SESSION_AVANCE_HT,
  keywords: ['DCE', 'mémoire technique', 'Claude AI Pro', 'Cowork', 'Skills'],
  courseCode: 'NIV-02',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV01: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: CATALOGUE_COURSE_IA_BTP_NIV01.name,
  description: CATALOGUE_COURSE_IA_BTP_NIV01.description,
  price: TARIF_SESSION_DEBUTANT_HT,
  educationalLevel: 'Débutant',
  teaches: teachesFromCatalogue('NIV-01'),
};

export const FORMATION_RICH_COURSE_NIV02: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationAO,
  name: CATALOGUE_COURSE_IA_AO_NIV02.name,
  description: CATALOGUE_COURSE_IA_AO_NIV02.description,
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: teachesFromCatalogue('NIV-02'),
};

export const CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationConduiteTravauxSuiviChantier,
  name: "L'IA appliquée à la conduite de travaux",
  description:
    'Formation IA niveau 2 : conduite de travaux et suivi chantier (CCTP, CR, PPSPS). 4 h, présentiel Île-de-France.',
  price: TARIF_SESSION_AVANCE_HT,
  keywords: ['CCTP', 'DPGF', 'PPSPS', 'skills Claude', 'conduite de travaux'],
  courseCode: 'NIV-03',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV03: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationConduiteTravauxSuiviChantier,
  name: CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03.name,
  description: CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03.description,
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: teachesFromCatalogue('NIV-03'),
};

export const CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationMaitriserClaudeAiBtp,
  name: 'Maîtriser Claude AI pour le BTP',
  description:
    'Formation IA niveau 2 : Maîtriser Claude AI pour le BTP (Projets, Skills, Cowork, Code). 4 h, présentiel Île-de-France.',
  price: TARIF_SESSION_AVANCE_HT,
  keywords: ['Projets Claude', 'Skills', 'Cowork', 'Claude Code', 'connecteurs BTP'],
  courseCode: 'NIV-04',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV04: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationMaitriserClaudeAiBtp,
  name: CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04.name,
  description: CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04.description,
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: teachesFromCatalogue('NIV-04'),
};

export const CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaMaitriseOeuvre,
  name: "L'IA au service des maîtres d'œuvre",
  description:
    "Formation IA niveau 2 pour maîtres d'œuvre : DCE, CR chantier, OS, réserves. 4 h, présentiel Île-de-France.",
  price: TARIF_SESSION_AVANCE_HT,
  keywords: ['MOE', 'MOEX', 'DCE', 'CR chantier', 'réserves', 'Claude', 'ChatGPT'],
  courseCode: 'NIV-05',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV05: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationIaMaitriseOeuvre,
  name: CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05.name,
  description: CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05.description,
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: teachesFromCatalogue('NIV-05'),
};

export const FORMATION_RICH_COURSE_CLAUDE_SKILLS_BTP: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationClaudeIaBtpFiche,
  name: 'Claude IA pour le BTP : Chat, Cowork & Code',
  description:
    'Formation IA pour le BTP — 4 h intra : Claude Chat, Cowork, Code et skills sur-mesure. Présentiel Île-de-France, sur devis.',
  // Intra sur devis — pas de price
  educationalLevel: 'Avancé',
  teaches: teachesFromCatalogue('NIV-06'),
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
    offer.price = String(price);
    offer.priceSpecification = {
      '@type': 'PriceSpecification',
      price: String(price),
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      description: PRICE_SPEC_DESCRIPTION_BY_REF[catalogueRef] ?? FORMATION_COURSE_OFFER_CATEGORY,
    };
  } else {
    offer.description = PRICE_SPEC_DESCRIPTION_BY_REF[catalogueRef] ?? 'Session intra sur devis';
  }

  return offer;
}

/** JSON-LD `Course` enrichi — fiches catalogue NIV-01 à NIV-06 (Rich Results). */
export function buildFormationCatalogueRichCourseJsonLd(
  config: FormationCatalogueRichCourseConfig
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const courseUrl = `${base}${config.path}`;
  const catalogueRef = CATALOGUE_REF_BY_PATH[config.path];
  const courseImage = getFormationCatalogueImageObjectJsonLd(catalogueRef, base);
  const organizationId = `${base}/#organization`;
  const instructorId = `${base}/#laure-olivie`;

  const core = buildFormationFicheCourseJsonLd({
    name: config.name,
    description: config.description,
    path: config.path,
    courseCode: catalogueRef,
    educationalLevel: config.educationalLevel,
    teaches: [...config.teaches],
    organizationId,
    instructorId,
    courseId: `${courseUrl}#course`,
    timeRequired: FORMATION_COURSE_DURATION_ISO,
  });

  return {
    ...core,
    ...(courseImage ? { image: courseImage } : {}),
    provider: {
      '@type': 'Organization',
      '@id': organizationId,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      identifier: {
        '@type': 'PropertyValue',
        name: 'SIRET',
        value: SCHEMA_CONTACT.siretFormatted,
      },
      hasCredential: buildQualiopiCredentialSchema(),
    },
    instructor: { '@id': instructorId },
    aggregateRating: buildSchemaAggregateRating(),
    offers: buildCatalogueOffer(catalogueRef, courseUrl, config.price),
  };
}

/** Construit le JSON-LD `Course` complet pour une fiche catalogue (legacy — composant générique). */
export function buildCatalogueCourseJsonLd(
  config: CatalogueCourseJsonLdConfig
): Record<string, unknown> {
  const richByCode: Record<string, FormationCatalogueRichCourseConfig> = {
    'NIV-01': FORMATION_RICH_COURSE_NIV01,
    'NIV-02': FORMATION_RICH_COURSE_NIV02,
    'NIV-03': FORMATION_RICH_COURSE_NIV03,
    'NIV-04': FORMATION_RICH_COURSE_NIV04,
    'NIV-05': FORMATION_RICH_COURSE_NIV05,
    'NIV-06': FORMATION_RICH_COURSE_CLAUDE_SKILLS_BTP,
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
    educationalLevel: config.educationalLevel === 'Beginner' ? 'Débutant' : 'Avancé',
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

export function buildClaudeIaChatCoworkCodeSkillsBtpJsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_CLAUDE_SKILLS_BTP);
}
