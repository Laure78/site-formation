/**
 * JSON-LD `Course` — catalogue officiel (NIV-01 à NIV-06).
 * Données fixes : `lib/schema-constants.ts`, `lib/internal-links.ts`, `lib/tarifs-sessions.ts`.
 * Objectifs pédagogiques (`teaches`) : source `lib/formations-catalogue-display.ts`.
 */
import { getFormationByCode, libelleEffectifFormation, libelleEffectifMaxFormation } from '@/data/formations';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueImageObjectJsonLd } from '@/lib/photo-seo';
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

const CATALOGUE_REF_BY_PATH: Record<FormationCatalogueRichCourseConfig['path'], string> = {
  [LINKS.formationIaBtpNiveau1BatimentTp]: 'NIV-01',
  [LINKS.formationAO]: 'NIV-02',
  [LINKS.formationConduiteTravauxSuiviChantier]: 'NIV-03',
  [LINKS.formationMaitriserClaudeAiBtp]: 'NIV-04',
  [LINKS.formationIaMaitriseOeuvre]: 'NIV-05',
  [LINKS.formationCursorBtp]: 'NIV-06',
};

function priceSpecDescription(ref: string): string {
  const f = getFormationByCode(ref);
  if (!f) return 'Forfait intra-entreprise — prix session groupe HT (non par participant)';
  const effectif =
    f.effectifMin === f.effectifMax
      ? libelleEffectifMaxFormation(f)
      : libelleEffectifFormation(f);
  const matin = f.horaires ? ', matin' : '';
  return `Forfait intra-entreprise — ${effectif}${matin} — prix session groupe HT`;
}

const PRICE_SPEC_DESCRIPTION_BY_REF: Record<string, string> = Object.fromEntries(
  (['NIV-01', 'NIV-02', 'NIV-03', 'NIV-04', 'NIV-05', 'NIV-06'] as const).map((ref) => [
    ref,
    priceSpecDescription(ref),
  ])
);

function prixCatalogue(ref: string): number {
  return getFormationByCode(ref)!.prixHT;
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
    | typeof LINKS.formationCursorBtp;
  name: string;
  description: string;
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
    | typeof LINKS.formationCursorBtp;
  name: string;
  description: string;
  price?: number;
  educationalLevel: 'Débutant' | 'Avancé';
  teaches: readonly string[];
};

export const CATALOGUE_COURSE_IA_BTP_NIV01: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: "L'IA au service des professionnels du BTP",
  description:
    'Formation IA niveau 1 : fondamentaux ChatGPT et IA générative, devis, DOE, PV, CR et communication. 4 h, présentiel Île-de-France.',
  price: prixCatalogue('NIV-01'),
  keywords: ['Devis BTP', 'administratif', 'comptes rendus', 'PPSPS', 'construction'],
  courseCode: 'NIV-01',
  educationalLevel: 'Beginner',
};

export const CATALOGUE_COURSE_IA_AO_NIV02: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAO,
  name: "L'IA appliquée aux appels d'offres BTP",
  description:
    "Formation IA appels d'offres BTP : DCE réel, chiffrage assisté, devis et mémoire technique (Claude AI Pro, Cowork & 8 assistants IA). 4 h, intra-entreprise présentiel, 8 à 12 participants.",
  price: prixCatalogue('NIV-02'),
  keywords: ['DCE', 'chiffrage BTP', 'mémoire technique', 'Claude AI Pro', 'Cowork', 'assistants IA'],
  courseCode: 'NIV-02',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV01: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: CATALOGUE_COURSE_IA_BTP_NIV01.name,
  description: CATALOGUE_COURSE_IA_BTP_NIV01.description,
  price: prixCatalogue('NIV-01'),
  educationalLevel: 'Débutant',
  teaches: teachesFromCatalogue('NIV-01'),
};

export const FORMATION_RICH_COURSE_NIV02: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationAO,
  name: CATALOGUE_COURSE_IA_AO_NIV02.name,
  description: CATALOGUE_COURSE_IA_AO_NIV02.description,
  price: prixCatalogue('NIV-02'),
  educationalLevel: 'Avancé',
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
  path: LINKS.formationConduiteTravauxSuiviChantier,
  name: CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03.name,
  description: CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03.description,
  price: prixCatalogue('NIV-03'),
  educationalLevel: 'Avancé',
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
  path: LINKS.formationMaitriserClaudeAiBtp,
  name: CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04.name,
  description: CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04.description,
  price: prixCatalogue('NIV-04'),
  educationalLevel: 'Avancé',
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
  path: LINKS.formationIaMaitriseOeuvre,
  name: CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05.name,
  description: CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05.description,
  price: prixCatalogue('NIV-05'),
  educationalLevel: 'Avancé',
  teaches: teachesFromCatalogue('NIV-05'),
};

export const CATALOGUE_COURSE_CURSOR_BTP_NIV06: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationCursorBtp,
  name: getFormationByCode('NIV-06')!.titre,
  description: `${getFormationByCode('NIV-06')!.accroche} Session ${getFormationByCode('NIV-06')!.duree}, présentiel Île-de-France, Qualiopi.`,
  price: prixCatalogue('NIV-06'),
  keywords: ['Cursor BTP', 'outil métier', 'application interne', 'GitHub', 'développement assisté IA'],
  courseCode: 'NIV-06',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV06: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationCursorBtp,
  name: CATALOGUE_COURSE_CURSOR_BTP_NIV06.name,
  description: CATALOGUE_COURSE_CURSOR_BTP_NIV06.description,
  price: prixCatalogue('NIV-06'),
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

function mapEducationalLevelSchema(level: 'Débutant' | 'Avancé'): 'Beginner' | 'Advanced' {
  return level === 'Débutant' ? 'Beginner' : 'Advanced';
}

/** JSON-LD `Course` enrichi — fiches catalogue NIV-01 à NIV-05 (Rich Results). */
export function buildFormationCatalogueRichCourseJsonLd(
  config: FormationCatalogueRichCourseConfig
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const courseUrl = `${base}${config.path}`;
  const catalogueRef = CATALOGUE_REF_BY_PATH[config.path];
  const courseImage = getFormationCatalogueImageObjectJsonLd(catalogueRef, base);
  const organizationId = `${base}/#organization`;
  const instructorId = `${base}/#laure-olivie`;
  const educationalLevel = mapEducationalLevelSchema(config.educationalLevel);

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
    'NIV-06': FORMATION_RICH_COURSE_NIV06,
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

export function buildCatalogueCourseCursorBtpNiv06JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV06);
}
