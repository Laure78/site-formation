/**
 * JSON-LD `Course` — catalogue officiel (NIV-01 à NIV-05).
 * Données fixes : `lib/schema-constants.ts`, `lib/internal-links.ts`, `lib/tarifs-sessions.ts`.
 */
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueImageObjectJsonLd } from '@/lib/photo-seo';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';
import {
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import {
  FORMATION_COURSE_DURATION_ISO,
  buildFormationFicheCourseJsonLd,
} from '@/lib/schema-formation-course-jsonld';
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

const OFFER_CATEGORY_BY_REF: Record<string, string> = {
  'NIV-01': 'Formation professionnelle continue',
  'NIV-02': 'Formation professionnelle continue — niveau avancé',
  'NIV-03': 'Formation professionnelle continue — niveau avancé',
  'NIV-04': 'Formation professionnelle continue — niveau avancé',
  'NIV-05': 'Formation professionnelle continue — maîtrise d\'œuvre',
  'NIV-06': 'Formation professionnelle continue — skills Claude BTP',
};

const PRICE_SPEC_DESCRIPTION_BY_REF: Record<string, string> = {
  'NIV-01': 'Prix HT par session (max 12 participants, niveau débutant)',
  'NIV-02': 'Prix HT par session (8 à 12 participants, niveau avancé)',
  'NIV-03': 'Prix HT par session (8 participants max, niveau avancé)',
  'NIV-04': 'Prix HT par session (8 participants max, niveau avancé, matin)',
  'NIV-05': 'Prix HT par session (3 à 8 participants, niveau avancé)',
  'NIV-06': 'Tarif intra sur devis — référence 4 h avancé, 8 participants max',
};

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
  price: number;
  keywords: readonly string[];
  courseCode: 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-05';
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
  price: number;
  educationalLevel: 'Débutant' | 'Avancé';
  teaches: readonly string[];
};

export const CATALOGUE_COURSE_IA_BTP_NIV01: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: "L'IA au service des pros du bâtiment et des travaux publics",
  description:
    'Formation IA appliquée au BTP : devis, comptes rendus de chantier, courriers, documents administratifs. Exercices terrain sur vos vrais documents BTP. Qualiopi, finançable Constructys.',
  price: TARIF_SESSION_DEBUTANT_HT,
  keywords: ['Devis BTP', 'administratif', 'comptes rendus', 'PPSPS'],
  courseCode: 'NIV-01',
  educationalLevel: 'Beginner',
};

export const CATALOGUE_COURSE_IA_AO_NIV02: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAO,
  name: "L'IA appliquée aux appels d'offres BTP",
  description:
    "Formation IA appliquée aux appels d'offres BTP : analyse DCE et CCTP, rédaction mémoire technique avec Claude AI Pro, Cowork & Skills. Exercices sur vos dossiers réels. Qualiopi, finançable Constructys.",
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
  teaches: [
    'IA générative BTP',
    'ChatGPT pour devis',
    'Automatisation administrative BTP',
    'Prompts BTP',
  ],
};

export const FORMATION_RICH_COURSE_NIV02: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationAO,
  name: CATALOGUE_COURSE_IA_AO_NIV02.name,
  description: CATALOGUE_COURSE_IA_AO_NIV02.description,
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: [
    'Analyse DCE et CCTP avec Claude AI',
    'Rédaction mémoire technique BTP',
    "Claude Cowork & Skills pour appels d'offres",
    'Assistants IA réutilisables marchés publics',
  ],
};

export const CATALOGUE_COURSE_CONDUITE_TRAVAUX_NIV03: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationConduiteTravauxSuiviChantier,
  name: "L'IA appliquée à la conduite de travaux",
  description:
    'Formation niveau 2 — 4 h : conduite de travaux et suivi chantier avec skills Claude (CCTP, DPGF, PPSPS, CR, réception). Qualiopi, finançable Constructys.',
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
  teaches: [
    'Skills Claude pour conduite de travaux BTP',
    'Analyse CCTP et DPGF chantier',
    'PPSPS, CR et suivi sous-traitants',
    'Réception, PV de réserves et DOE',
  ],
};

export const CATALOGUE_COURSE_MAITRISER_CLAUDE_NIV04: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationMaitriserClaudeAiBtp,
  name: 'Maîtriser Claude AI pour le BTP',
  description:
    'Formation niveau 2 — 4 h le matin : Projets, Skills, Cowork, connecteurs (Gmail/Drive) et Claude Code pour industrialiser Claude en entreprise BTP. Qualiopi, Constructys.',
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
  teaches: [
    'Projets Claude et bibliothèque de Skills BTP',
    'Cowork pour production documentaire supervisée',
    'Connecteurs Gmail, Drive, agenda — RGPD et marchés publics',
    'Claude Code — automatisation et documents en lot',
  ],
};

export const CATALOGUE_COURSE_MAITRISE_OEUVRE_NIV05: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaMaitriseOeuvre,
  name: "L'IA au service des maîtres d'œuvre",
  description:
    "Formation IA & ChatGPT pour la maîtrise d'œuvre d'exécution : analyse DCE, comptes rendus de chantier, OS et courriers, suivi des réserves. 4 h, Qualiopi, Constructys.",
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
  teaches: [
    'Claude et ChatGPT pour cas d\'usage MOE (Projets, Connecteurs, Skills, Cowork)',
    'Analyse DCE — conformité et alertes contractuelles',
    'Comptes rendus de chantier accélérés depuis notes vocales',
    'Courriers, ordres de service et actes administratifs MOE',
    'Suivi réserves, réception et GPA avec assistant IA',
  ],
};

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
      '@type': 'EducationalOrganization',
      '@id': organizationId,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        credentialCategory: 'certification',
      },
    },
    instructor: { '@id': instructorId },
    aggregateRating: buildSchemaAggregateRating(),
    offers: {
      '@type': 'Offer',
      price: config.price,
      priceCurrency: 'EUR',
      category: OFFER_CATEGORY_BY_REF[catalogueRef] ?? 'Formation professionnelle continue',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: config.price,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false,
        description: PRICE_SPEC_DESCRIPTION_BY_REF[catalogueRef] ?? 'Prix HT par session',
      },
      availability: 'https://schema.org/InStock',
      url: courseUrl,
    },
  };
}

/** Construit le JSON-LD `Course` complet pour une fiche catalogue (legacy — composant générique). */
export function buildCatalogueCourseJsonLd(
  config: CatalogueCourseJsonLdConfig
): Record<string, unknown> {
  const richConfig: FormationCatalogueRichCourseConfig = {
    path: config.path,
    name: config.name,
    description: config.description,
    price: config.price,
    educationalLevel: config.educationalLevel === 'Beginner' ? 'Débutant' : 'Avancé',
    teaches:
      config.courseCode === 'NIV-01'
        ? FORMATION_RICH_COURSE_NIV01.teaches
        : config.courseCode === 'NIV-02'
          ? FORMATION_RICH_COURSE_NIV02.teaches
        : config.courseCode === 'NIV-03'
          ? FORMATION_RICH_COURSE_NIV03.teaches
          : config.courseCode === 'NIV-04'
            ? FORMATION_RICH_COURSE_NIV04.teaches
            : FORMATION_RICH_COURSE_NIV05.teaches,
  };
  return buildFormationCatalogueRichCourseJsonLd(richConfig);
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

export const FORMATION_RICH_COURSE_CLAUDE_SKILLS_BTP: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationClaudeIaBtpFiche,
  name: 'Claude IA pour le BTP : Chat, Cowork & Code',
  description:
    'Formation IA pour le BTP — 4 h intra : Claude Chat, Cowork, Code et skills sur-mesure pour l\'administratif, les appels d\'offres (RC, DCE/DQE), la gestion de chantier (CCTP, CR, réserves, normes) et le juridique. Qualiopi, Constructys.',
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: [
    'Claude Chat, Cowork et Code pour équipes BTP',
    'Installation et usage de skills Claude sur-mesure (AO, chantier, juridique)',
    'Analyse RC et DCE/DQE — décision GO / NO GO et chiffrage sécurisé',
    'CCTP organisation, CR de chantier, levée des réserves et normes hors-gel',
    'Qualification litiges marché de travaux — l\'IA n\'est pas un avocat',
  ],
};

export function buildClaudeIaChatCoworkCodeSkillsBtpJsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_CLAUDE_SKILLS_BTP);
}
