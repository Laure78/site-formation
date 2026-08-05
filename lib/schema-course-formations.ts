/**
 * Schémas JSON-LD Course + EducationalOrganization pour le catalogue et les fiches formation.
 */
import { formationsData } from '@/src/data/formations';
import { SITE_CONFIG } from '@/lib/seo';
import {
  FORMATION_COURSE_DURATION_ISO,
  buildFormationFicheCourseJsonLd,
  buildFormationFicheCourseNode,
} from '@/lib/schema-formation-course-jsonld';
import { buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';
import { tarifHtDepuisBadgeCatalogue } from '@/lib/tarifs-sessions';

export const EDUCATIONAL_ORGANIZATION_FRAGMENT_ID =
  `${SITE_CONFIG.url}/#educational-organization` as const;

export type NiveauCatalogue = 'DÉBUTANT' | 'AVANCÉ';

export type FormationCatalogEntry = {
  ref: string;
  level: NiveauCatalogue;
  path: `/formations/${string}`;
  name: string;
  description: string;
  teaches: string[];
  occupationalCategory: string;
};

/** Données alignées sur le catalogue (NIV-01, NIV-02). */
export const FORMATIONS_CATALOG_SCHEMA: FormationCatalogEntry[] = [
  {
    ref: 'NIV-01',
    level: 'DÉBUTANT',
    path: '/formations/ia-batiment-travaux-publics',
    name: "L'IA au service des pros du bâtiment et des travaux publics",
    description:
      "Formation niveau 1 — 4 h : IA pour bâtiment et travaux publics, devis, chantier, documents et administratif. Qualiopi, Constructys.",
    teaches: [
      'Usages de l’IA sur chantier et en bureau d’études',
      'Devis, comptes rendus et courriers avec ChatGPT / Claude',
      'Structuration de l’administratif et prompts métier BTP / TP',
      'Bonnes pratiques, RGPD et validation humaine',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'NIV-02',
    level: 'AVANCÉ',
    path: '/formations/ia-appels-offre-btp',
    name: "L'IA appliquée aux appels d'offres BTP",
    description:
      "Formation niveau 2 — 4 h : assistants IA DCE et mémoire technique avec Claude AI Pro, Cowork & Skills — Qualiopi, OPCO Constructys.",
    teaches: [
      'Paramétrage Claude AI Pro (Projects, instructions personnalisées) pour appels d\'offres',
      'Analyse DCE via Cowork — 15 informations critiques, CCAP, CCTP, verdict Go / No Go',
      'Structure d\'un plan de mémoire technique adapté aux pondérations du DCE',
      'Rédaction des 5 sections clés d\'un mémoire technique avec les skills Cowork',
      'Création de skills Cowork DCE/MT réutilisables, alimentés par les données entreprise',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'NIV-03',
    level: 'AVANCÉ',
    path: '/formations/ia-conduite-travaux-suivi-chantier',
    name: "L'IA appliquée à la conduite de travaux",
    description:
      'Formation niveau 2 — 4 h : conduite de travaux et suivi chantier avec skills Claude (CCTP, DPGF, PPSPS, CR, réception). Qualiopi, Constructys.',
    teaches: [
      'Bibliothèque de skills Claude pour conducteurs de travaux',
      'Analyse CCTP, DPGF et conformité DTU au démarrage chantier',
      'PPSPS, CR, sous-traitants et suivi budget avec l’IA',
      'Situations, PV de réserves, DOE et courriers de litige',
    ],
    occupationalCategory: 'BTP, conduite de travaux, suivi chantier',
  },
  {
    ref: 'NIV-04',
    level: 'AVANCÉ',
    path: '/formations/maitriser-claude-ai-btp',
    name: 'Maîtriser Claude AI pour le BTP',
    description:
      'Formation niveau 2 — 4 h le matin : industrialiser Claude (Projets, Skills, Cowork, connecteurs, Claude Code) dans l\'entreprise BTP. Qualiopi, Constructys.',
    teaches: [
      'Projets Claude et bibliothèque de Skills métier BTP',
      'Cowork pour production documentaire supervisée (CR, mémoires, dossiers)',
      'Connecteurs Gmail, Drive et agenda — sécurité RGPD',
      'Claude Code pour automatisation et génération de documents en lot',
    ],
    occupationalCategory: 'BTP, référents IA, direction et fonctions support',
  },
  {
    ref: 'NIV-05',
    level: 'AVANCÉ',
    path: '/formations/ia-maitrise-oeuvre',
    name: "L'IA au service des maîtres d'œuvre",
    description:
      "Formation niveau 2 — 4 h : IA pour maîtrise d'œuvre d'exécution — analyse DCE, CR chantier, OS, courriers et réserves. Qualiopi, Constructys.",
    teaches: [
      'Claude et ChatGPT pour cas d\'usage MOE (Projets, Connecteurs, Skills, Cowork)',
      'Analyse DCE et extraction conformité / alertes contractuelles',
      'Comptes rendus de chantier accélérés (notes vocales)',
      'Courriers, ordres de service et actes administratifs MOE',
      'Suivi réserves, réception et GPA avec assistant IA',
    ],
    occupationalCategory: 'BTP, maîtrise d\'œuvre, MOEX',
  },
  {
    ref: 'NIV-06',
    level: 'AVANCÉ',
    path: '/formations/formation-claude-ia-btp',
    name: 'Claude IA pour le BTP : Chat, Cowork & Code',
    description:
      'Formation IA pour le BTP — 4 h intra : Claude Chat, Cowork, Code et skills sur-mesure pour l\'administratif, les appels d\'offres, la gestion de chantier et le juridique. Qualiopi, Constructys.',
    teaches: [
      'Claude Chat, Cowork et Code pour équipes BTP',
      'Installation et usage de skills sur-mesure (AO, chantier, juridique)',
      'Analyse RC et DCE/DQE — GO / NO GO et chiffrage sécurisé',
      'CCTP organisation, CR de chantier, levée des réserves et normes hors-gel',
      'Qualification litiges marché de travaux',
    ],
    occupationalCategory: 'BTP, direction, bureau d\'études, conducteurs de travaux',
  },
];

const DURATION_ISO = FORMATION_COURSE_DURATION_ISO;

function educationalLevelSchema(level: NiveauCatalogue): string {
  return level === 'DÉBUTANT' ? 'Beginner' : 'Advanced';
}

function buildCourseObject(entry: FormationCatalogEntry): Record<string, unknown> {
  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  return {
    ...buildFormationFicheCourseNode({
      name: entry.name,
      description: entry.description,
      path: entry.path,
      courseCode: entry.ref,
      educationalLevel: educationalLevelSchema(entry.level),
      teaches: entry.teaches,
      organizationId: EDUCATIONAL_ORGANIZATION_FRAGMENT_ID,
    }),
    occupationalCategory: entry.occupationalCategory,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${base}${entry.path}`,
      category: 'Formation professionnelle',
    },
  };
}

/** Catalogue /formations : @graph = EducationalOrganization + ItemList (Course complètes). */
export function getFormationsCatalogJsonLd(): Record<string, unknown> {
  const list = FORMATIONS_CATALOG_SCHEMA;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': EDUCATIONAL_ORGANIZATION_FRAGMENT_ID,
        name: SITE_CONFIG.legalName,
        url: SITE_CONFIG.url,
        sameAs: 'https://www.linkedin.com/in/laure-olivie',
        hasCredential: buildQualiopiCredentialSchema(),
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/formations#course-list`,
        name: 'Catalogue des formations IA pour le BTP',
        description:
          'Formations IA pour dirigeants et équipes du BTP (bâtiment et travaux publics). Devis, appels d’offres, ChatGPT. Finançable Constructys.',
        numberOfItems: list.length,
        itemListElement: list.map((entry, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: buildCourseObject(entry),
        })),
      },
    ],
  };
}

/**
 * Schéma Course unique (données `src/data/formations.ts`) — page dynamique `/formations/[slug]`
 * et fiches qui réutilisent la même map.
 */
export function getCourseJsonLdFromFormationsData(
  slug: string
): Record<string, unknown> | null {
  const f = formationsData[slug as keyof typeof formationsData];
  if (!f) return null;
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const path = `/formations/${slug}`;
  return {
    ...buildFormationFicheCourseJsonLd({
      name: f.name,
      description: f.description,
      path,
      timeRequired: f.duration,
      educationalLevel: 'Professionnel',
      instructorName: SITE_CONFIG.name,
      organizationId: `${base}/#organization`,
    }),
    offers: {
      '@type': 'Offer',
      price: f.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${base}${path}`,
    },
  };
}

/** Fiche formation : schéma Course depuis la map `formationsData` (URL = /formations/{slug}). */
export function getFormationCoursePageJsonLd(
  path: FormationCatalogEntry['path']
): Record<string, unknown> | null {
  const slug = path.replace(/^\/formations\//, '').replace(/\/$/, '');
  return getCourseJsonLdFromFormationsData(slug);
}

/** Fiches catalogue prioritaires — Course JSON-LD enrichi (références @id organisation / formatrice, offre, avis). */
export const DEDICATED_FORMATION_COURSE_PATHS = [
  '/formations/ia-batiment-travaux-publics',
  '/formations/ia-appels-offre-btp',
  '/formations/ia-conduite-travaux-suivi-chantier',
  '/formations/maitriser-claude-ai-btp',
  '/formations/formation-claude-ia-btp',
  '/formations/ia-maitrise-oeuvre',
  '/formations/formation-ia-cctp-analyse-dce-btp',
] as const;

export type DedicatedFormationCoursePath = (typeof DEDICATED_FORMATION_COURSE_PATHS)[number];

function niveauCatalogueToFr(level: NiveauCatalogue): 'Débutant' | 'Avancé' {
  return level === 'DÉBUTANT' ? 'Débutant' : 'Avancé';
}

function buildDedicatedFormationCourseObject(opts: {
  courseUrl: string;
  path: string;
  name: string;
  description: string;
  educationalLevel: string;
  priceString: string;
  teaches: [string, string, string];
  organizationId: string;
  laurePersonId: string;
}): Record<string, unknown> {
  const {
    courseUrl,
    path,
    name,
    description,
    educationalLevel,
    priceString,
    teaches,
    organizationId,
    laurePersonId,
  } = opts;
  return {
    ...buildFormationFicheCourseJsonLd({
      name,
      description,
      path,
      url: courseUrl,
      educationalLevel,
      teaches: [...teaches],
      organizationId,
      instructorId: laurePersonId,
      timeRequired: DURATION_ISO,
    }),
    offers: {
      '@type': 'Offer',
      price: priceString,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: courseUrl,
      category: 'Formation professionnelle continue — financement possible selon éligibilité',
    },
  };
}

/**
 * Course dédiée pour les fiches formation listées (provider / instructor en @id).
 */
export function getDedicatedFormationCoursePageJsonLd(
  path: DedicatedFormationCoursePath
): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const organizationId = `${base}/#organization`;
  const laurePersonId = `${base}/#laure-olivie`;

  if (path === '/formations/formation-ia-cctp-analyse-dce-btp') {
    const price = tarifHtDepuisBadgeCatalogue('AVANCÉ');
    return buildDedicatedFormationCourseObject({
      courseUrl: `${base}${path}`,
      path,
      name: 'Formation IA analyse CCTP & DCE pour entreprises BTP',
      description:
        'Session 4 h : analyser CCTP, DPGF et DCE avec l’IA, détecter les risques et préparer un mémoire technique aligné. Qualiopi, financement possible selon éligibilité (Constructys ou OPCO).',
      educationalLevel: 'Avancé',
      priceString: String(price),
      teaches: [
        'Structurer la lecture d’un CCTP et d’un DCE avec l’IA sans perdre le contrôle',
        'Croiser exigences techniques, DPGF et critères du CCAP pour cadrer le chiffrage',
        'Créer prompts, projets et assistants réutilisables pour les réponses aux marchés',
      ],
      organizationId,
      laurePersonId,
    });
  }

  const entry = FORMATIONS_CATALOG_SCHEMA.find((e) => e.path === path);
  if (!entry) {
    throw new Error(`getDedicatedFormationCoursePageJsonLd: chemin inconnu ${path}`);
  }

  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const teaches3 = entry.teaches.slice(0, 3);
  if (teaches3.length < 3) {
    throw new Error(`getDedicatedFormationCoursePageJsonLd: pas assez de compétences "teaches" pour ${path}`);
  }

  return buildDedicatedFormationCourseObject({
    courseUrl: `${base}${entry.path}`,
    path: entry.path,
    name: entry.name,
    description: entry.description,
    educationalLevel: niveauCatalogueToFr(entry.level),
    priceString: String(price),
    teaches: [teaches3[0]!, teaches3[1]!, teaches3[2]!],
    organizationId,
    laurePersonId,
  });
}
