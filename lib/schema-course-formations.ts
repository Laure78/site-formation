/**
 * Schémas JSON-LD Course + EducationalOrganization pour le catalogue et les fiches formation.
 */
import { formationsData } from '@/src/data/formations';
import { getFormationByCode } from '@/data/formations';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { SITE_CONFIG } from '@/lib/seo';
import {
  FORMATION_COURSE_DURATION_ISO,
  FORMATION_COURSE_OFFER_CATEGORY,
  buildFormationFicheCourseJsonLd,
  buildFormationFicheCourseNode,
} from '@/lib/schema-formation-course-jsonld';
import { buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { tarifHtDepuisBadgeCatalogue } from '@/lib/tarifs-sessions';
import { getTarifApplicationMetierBtpHt } from '@/lib/tarifs-applications-metier-btp';

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

function teachesFromCatalogueDisplay(ref: string): string[] {
  const entry = getFormationCatalogueByRef(ref);
  if (!entry?.objectifs?.length) {
    throw new Error(`FORMATIONS_CATALOG_SCHEMA: objectifs manquants pour ${ref}`);
  }
  return [...entry.objectifs];
}

/** Données alignées sur le catalogue (NIV-01 → NIV-06). */
export const FORMATIONS_CATALOG_SCHEMA: FormationCatalogEntry[] = [
  {
    ref: 'NIV-01',
    level: 'DÉBUTANT',
    path: '/formations/ia-batiment-travaux-publics',
    name: "L'IA au service des pros du bâtiment et des travaux publics",
    description:
      "Formation niveau 1 — 4 h : IA pour bâtiment et travaux publics, devis, chantier, documents et administratif. Qualiopi, Constructys.",
    teaches: teachesFromCatalogueDisplay('NIV-01'),
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'NIV-02',
    level: 'AVANCÉ',
    path: '/formations/ia-appels-offre-btp',
    name: "L'IA appliquée aux appels d'offres BTP",
    description:
      "Formation niveau 2 — 4 h : assistants IA DCE et mémoire technique avec Claude AI Pro, Cowork & Skills — Qualiopi, OPCO Constructys.",
    teaches: teachesFromCatalogueDisplay('NIV-02'),
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'NIV-03',
    level: 'AVANCÉ',
    path: '/formations/ia-conduite-travaux-suivi-chantier',
    name: "L'IA appliquée à la conduite de travaux",
    description:
      'Formation niveau 2 — 4 h : conduite de travaux et suivi chantier avec skills Claude (CCTP, DPGF, PPSPS, CR, réception). Qualiopi, Constructys.',
    teaches: teachesFromCatalogueDisplay('NIV-03'),
    occupationalCategory: 'BTP, conduite de travaux, suivi chantier',
  },
  {
    ref: 'NIV-04',
    level: 'AVANCÉ',
    path: '/formations/maitriser-claude-ai-btp',
    name: getFormationByCode('NIV-04')!.titre,
    description: `${getFormationByCode('NIV-04')!.accroche} Qualiopi, Constructys.`,
    teaches: teachesFromCatalogueDisplay('NIV-04'),
    occupationalCategory: 'BTP, référents IA, direction et fonctions support',
  },
  {
    ref: 'NIV-05',
    level: 'AVANCÉ',
    path: '/formations/ia-maitrise-oeuvre',
    name: "L'IA au service des maîtres d'œuvre",
    description:
      "Formation niveau 2 — 4 h : IA pour maîtrise d'œuvre d'exécution — analyse DCE, CR chantier, OS, courriers et réserves. Qualiopi, Constructys.",
    teaches: teachesFromCatalogueDisplay('NIV-05'),
    occupationalCategory: 'BTP, maîtrise d\'œuvre, MOEX',
  },
  {
    ref: 'NIV-06',
    level: 'AVANCÉ',
    path: '/formations/application-metier-btp-niveau-1',
    name: getFormationByCode('NIV-06')!.titre,
    description: `${getFormationByCode('NIV-06')!.accroche} Qualiopi, Constructys.`,
    teaches: teachesFromCatalogueDisplay('NIV-06'),
    occupationalCategory: 'BTP, applications métier, développement assisté IA',
  },
  {
    ref: 'NIV-07',
    level: 'AVANCÉ',
    path: '/formations/application-metier-btp-niveau-2',
    name: getFormationByCode('NIV-07')!.titre,
    description: `${getFormationByCode('NIV-07')!.accroche} Qualiopi, Constructys.`,
    teaches: teachesFromCatalogueDisplay('NIV-07'),
    occupationalCategory: 'BTP, applications métier connectées',
  },
  {
    ref: 'NIV-08',
    level: 'AVANCÉ',
    path: '/formations/application-metier-btp-niveau-3',
    name: getFormationByCode('NIV-08')!.titre,
    description: `${getFormationByCode('NIV-08')!.accroche} Qualiopi, Constructys.`,
    teaches: teachesFromCatalogueDisplay('NIV-08'),
    occupationalCategory: 'BTP, IA intégrée, applications métier avancées',
  },
];

const DURATION_ISO = FORMATION_COURSE_DURATION_ISO;

function educationalLevelSchema(level: NiveauCatalogue): string {
  return level === 'DÉBUTANT' ? 'Beginner' : 'Advanced';
}

function buildCatalogOffer(
  entry: FormationCatalogEntry,
  courseUrl: string
): Record<string, unknown> {
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: courseUrl,
    category: FORMATION_COURSE_OFFER_CATEGORY,
  };
  offer.price = (() => {
    const f = getFormationByCode(entry.ref);
    if (f?.tarifParcoursAppMetier) {
      return getTarifApplicationMetierBtpHt(f.tarifParcoursAppMetier);
    }
    if (f && f.prixHT > 0) return f.prixHT;
    return tarifHtDepuisBadgeCatalogue(entry.level);
  })();
  return offer;
}

function buildCourseObject(entry: FormationCatalogEntry): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const courseUrl = `${base}${entry.path}`;
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
    offers: buildCatalogOffer(entry, courseUrl),
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
        identifier: {
          '@type': 'PropertyValue',
          name: 'SIRET',
          value: SCHEMA_CONTACT.siretFormatted,
        },
        hasCredential: buildQualiopiCredentialSchema(),
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/formations#course-list`,
        name: 'Catalogue des formations IA pour le BTP',
        description:
          'Formations IA pour dirigeants et équipes du BTP (bâtiment et travaux publics). Devis, appels d’offres, ChatGPT. Finançable par Constructys selon éligibilité.',
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
  const courseUrl = `${base}${path}`;
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: courseUrl,
    category: FORMATION_COURSE_OFFER_CATEGORY,
  };
  offer.price = f.price;
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
    offers: offer,
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
  '/formations/ia-maitrise-oeuvre',
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
  priceString?: string;
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
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: courseUrl,
    category: FORMATION_COURSE_OFFER_CATEGORY,
  };
  if (priceString != null) {
    offer.price = priceString;
  } else {
    offer.description = 'Session intra sur devis';
  }
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
    offers: offer,
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

  const entry = FORMATIONS_CATALOG_SCHEMA.find((e) => e.path === path);
  if (!entry) {
    throw new Error(`getDedicatedFormationCoursePageJsonLd: chemin inconnu ${path}`);
  }

  const teaches3 = entry.teaches.slice(0, 3);
  if (teaches3.length < 3) {
    throw new Error(`getDedicatedFormationCoursePageJsonLd: pas assez de compétences "teaches" pour ${path}`);
  }

  const price = tarifHtDepuisBadgeCatalogue(entry.level);

  return buildDedicatedFormationCourseObject({
    courseUrl: `${base}${entry.path}`,
    path: entry.path,
    name: entry.name,
    description: entry.description,
    educationalLevel: niveauCatalogueToFr(entry.level),
    priceString: price != null ? String(price) : undefined,
    teaches: [teaches3[0]!, teaches3[1]!, teaches3[2]!],
    organizationId,
    laurePersonId,
  });
}
