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
      "Formation pratique de 4 heures pour artisans et PME du BTP : automatiser les devis, comptes rendus de chantier, emails et administratif avec ChatGPT et l'IA. Finançable Constructys.",
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
