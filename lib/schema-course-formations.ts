/**
 * Schémas JSON-LD Course + EducationalOrganization pour le catalogue et les fiches formation.
 */
import { formationsData } from '@/src/data/formations';
import { SITE_CONFIG } from '@/lib/seo';
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

/** Données alignées sur le catalogue (BTP-01 … BTP-06). */
export const FORMATIONS_CATALOG_SCHEMA: FormationCatalogEntry[] = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT',
    path: '/formations/ia-au-service-du-batiment',
    name: "L'IA au service du bâtiment",
    description:
      "Formation pratique de 4 heures pour professionnels du BTP et PME : automatiser les devis, comptes rendus de chantier, emails et administratif avec ChatGPT et l'IA. Finançable Constructys.",
    teaches: [
      'Utilisation de ChatGPT dans le BTP',
      'Automatisation des devis bâtiment',
      'Comptes rendus de chantier avec l’IA',
      'Réponses aux appels d’offres',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'BTP-02',
    level: 'AVANCÉ',
    path: '/formations/ia-appels-offre-btp',
    name: "Répondre aux appels d'offre avec l'IA",
    description:
      "Formation avancée 4 h : analyser un DCE, rédiger mémoires techniques et chiffrages avec l'IA, bibliothèque de prompts BTP, assistant DCE sur mesure — Qualiopi, OPCO Constructys.",
    teaches: [
      'Analyse rapide de DCE et critères d’évaluation',
      'Mémoires techniques et chiffrages avec méthode et IA',
      'Templates et prompts par métier pour marchés BTP',
      'Assistant IA DCE / mémoire adapté à l’entreprise',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'BTP-03',
    level: 'AVANCÉ',
    path: '/formations/ia-rh-btp',
    name: 'Formation IA pour la Fonction RH dans le BTP',
    description:
      "Session 4 h pour les RH du BTP : recrutement, GEPP, tableaux de bord et assistant IA RH sur mesure — finançable Constructys.",
    teaches: [
      'Automatiser le recrutement et la sélection',
      'Piloter la GEPP et anticiper les compétences',
      'Tableaux de bord RH opérationnels',
      'Assistant IA RH sur mesure',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'BTP-04',
    level: 'DÉBUTANT',
    path: '/formations/ia-travaux-publics',
    name: "L'IA au service des Travaux Publics",
    description:
      "Formation 4 h débutant : consultations TP, documents de chantier, reporting, templates et assistants par rôle — Qualiopi, Constructys.",
    teaches: [
      'Réponse aux consultations : DCE, trames, synthèses',
      'Documents de chantier et reporting avec validation',
      'Templates TP et charte d’usage IA en entreprise',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'BTP-05',
    level: 'DÉBUTANT',
    path: '/formations/sensibilisation-ia-assistants-personnalises',
    name: "Sensibilisation à l'IA & Assistants IA personnalisés",
    description:
      "Sensibilisation 4 h : usages terrain, banque de prompts par métier, conception d’assistants IA personnalisés — Qualiopi, OPCO Constructys.",
    teaches: [
      'Sensibilisation à l’IA et usages terrain',
      'Banque de prompts par métier',
      'Concevoir des assistants IA personnalisés',
      'Ressources et prolongement pédagogique',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'BTP-06',
    level: 'AVANCÉ',
    path: '/formations/ia-architecture-claude-dpgf',
    name: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    description:
      "Formation avancée 4 h : DPGF, métrés, planning, CR de chantier, courriers et actes de marché avec Claude AI et Google Workspace — cabinet d’architecture et BTP.",
    teaches: [
      'DPGF, métrés et planning avec Claude AI',
      'Comptes rendus de chantier et PV de réception',
      'Courriers et actes de marché via Google Drive',
      'Bibliothèque de prompts pour le cabinet',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
];

const DURATION_ISO = 'PT4H';
const COURSE_MODES = ['onsite', 'online'] as const;

function educationalLevelSchema(level: NiveauCatalogue): string {
  return level === 'DÉBUTANT' ? 'Beginner' : 'Advanced';
}

function buildCourseObject(entry: FormationCatalogEntry): Record<string, unknown> {
  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const url = `${SITE_CONFIG.url}${entry.path}`;
  return {
    '@type': 'Course',
    '@id': `${url}#course`,
    name: entry.name,
    description: entry.description,
    url,
    courseCode: entry.ref,
    duration: DURATION_ISO,
    courseMode: [...COURSE_MODES],
    inLanguage: 'fr',
    availableLanguage: 'fr',
    educationalLevel: educationalLevelSchema(entry.level),
    teaches: entry.teaches,
    occupationalCategory: entry.occupationalCategory,
    provider: { '@id': EDUCATIONAL_ORGANIZATION_FRAGMENT_ID },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url,
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
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi',
          credentialCategory: 'certification',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/formations#course-list`,
        name: 'Catalogue des formations IA BTP',
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
  const courseUrl = `${base}/formations/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    url: courseUrl,
    name: f.name,
    description: f.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      url: base,
    },
    instructor: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    timeRequired: f.duration,
    educationalLevel: 'Professionnel',
    courseLanguage: 'fr',
    inLanguage: 'fr',
    availableLanguage: 'fr',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      courseSchedule: {
        '@type': 'Schedule',
        duration: f.duration,
      },
    },
    offers: {
      '@type': 'Offer',
      price: f.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
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
  '/formations/ia-au-service-du-batiment',
  '/formations/ia-travaux-publics',
  '/formations/sensibilisation-ia-assistants-personnalises',
  '/formations/ia-btp-paris',
  '/formations/ia-architecture-claude-dpgf',
  '/formations/ia-appels-offre-btp',
  '/formations/formation-ia-cctp-analyse-dce-btp',
] as const;

export type DedicatedFormationCoursePath = (typeof DEDICATED_FORMATION_COURSE_PATHS)[number];

const PARIS_FORMATION_DEDICATED = {
  name: 'Formation IA BTP à Paris',
  description:
    'Formation de 4 h pour professionnels du BTP en Île-de-France : devis, chiffrages, ChatGPT. Paris (75) et huit départements. Qualiopi · Constructys.',
  educationalLevel: 'Débutant' as const,
  /** Aligné BTP-01 (débutant). */
  priceHt: tarifHtDepuisBadgeCatalogue('DÉBUTANT'),
  teaches: [
    'Devis et chiffrage assistés par l’IA pour le BTP',
    'Emails professionnels et suivi client en Île-de-France',
    'Automatisation de l’administratif chantier avec ChatGPT',
  ],
};

function niveauCatalogueToFr(level: NiveauCatalogue): 'Débutant' | 'Avancé' {
  return level === 'DÉBUTANT' ? 'Débutant' : 'Avancé';
}

function buildDedicatedFormationCourseObject(opts: {
  courseUrl: string;
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
    name,
    description,
    educationalLevel,
    priceString,
    teaches,
    organizationId,
    laurePersonId,
  } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    url: courseUrl,
    name,
    description,
    provider: { '@id': organizationId },
    instructor: { '@id': laurePersonId },
    educationalLevel,
    inLanguage: 'fr-FR',
    timeRequired: DURATION_ISO,
    courseMode: [...COURSE_MODES],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: { '@type': 'Place', name: 'Île-de-France' },
      courseWorkload: DURATION_ISO,
    },
    offers: {
      '@type': 'Offer',
      price: priceString,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      category: 'Formation professionnelle finançable Constructys',
    },
    teaches: [...teaches],
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
  const laurePersonId = `${base}/#laure`;

  if (path === '/formations/ia-btp-paris') {
    return buildDedicatedFormationCourseObject({
      courseUrl: `${base}${path}`,
      name: PARIS_FORMATION_DEDICATED.name,
      description: PARIS_FORMATION_DEDICATED.description,
      educationalLevel: PARIS_FORMATION_DEDICATED.educationalLevel,
      priceString: String(PARIS_FORMATION_DEDICATED.priceHt),
      teaches: [
        PARIS_FORMATION_DEDICATED.teaches[0],
        PARIS_FORMATION_DEDICATED.teaches[1],
        PARIS_FORMATION_DEDICATED.teaches[2],
      ],
      organizationId,
      laurePersonId,
    });
  }

  if (path === '/formations/formation-ia-cctp-analyse-dce-btp') {
    const price = tarifHtDepuisBadgeCatalogue('AVANCÉ');
    return buildDedicatedFormationCourseObject({
      courseUrl: `${base}${path}`,
      name: 'Formation IA analyse CCTP & DCE pour entreprises BTP',
      description:
        'Session 4 h : analyser CCTP, DPGF et DCE avec l’IA, détecter les risques et préparer un mémoire technique aligné. Qualiopi, finançable Constructys selon dossier.',
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
    name: entry.name,
    description: entry.description,
    educationalLevel: niveauCatalogueToFr(entry.level),
    priceString: String(price),
    teaches: [teaches3[0]!, teaches3[1]!, teaches3[2]!],
    organizationId,
    laurePersonId,
  });
}
