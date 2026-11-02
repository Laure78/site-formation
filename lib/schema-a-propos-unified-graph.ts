/**
 * JSON-LD @graph — page /a-propos (Person, ProfilePage, FAQPage, VideoObject, Course LinkedIn Learning, ImageObject).
 * Organization (#organization) : layout racine uniquement.
 */

import { PREUVES } from '@/lib/constants';
import {
  contentUpdatedAtToSchemaIso,
  getPillarPageContentUpdatedAt,
} from '@/lib/content-updated-at';
import { getAProposPagePersonDescription, FAQ_A_PROPOS_PAGE } from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';
import {
  SCHEMA_GEO,
  SCHEMA_PUBLIC_SITE_URL,
  buildPersonAffiliationSchemaNodes,
} from '@/lib/schema-constants';
import { getFAQSchema } from '@/lib/seo';
import { buildAProposImageObjectJsonLd } from '@/lib/schema-image-objects';
import { LINKEDIN_LEARNING_A_PROPOS_EMBEDS } from '@/lib/linkedin-learning-a-propos-embeds';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
import {
  SITE_PERSON_JOB_TITLE,
  sitePersonSchemaSameAs,
  siteSchemaOrganizationId,
  siteSchemaPersonId,
} from '@/lib/site-config';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_PATH = '/a-propos';
const PAGE_URL = `${BASE}${PAGE_PATH}`;
const PERSON_ID = siteSchemaPersonId(BASE);
const ORGANIZATION_ID = siteSchemaOrganizationId(BASE);
const PROFILE_PAGE_ID = `${PAGE_URL}#profilepage`;

const FAQ_COMPLET = FAQ_A_PROPOS_PAGE;

function stripAtContext(obj: Record<string, unknown>): Record<string, unknown> {
  const { ['@context']: _c, ...rest } = obj;
  return rest;
}

/** Durées indicatives (cours complets LinkedIn Learning — à ajuster si besoin). */
const LINKEDIN_COURSE_DURATION: [string, string] = ['PT2H', 'PT1H45M'];

export function getAProposUnifiedJsonLd(): Record<string, unknown> {
  const faqRaw = getFAQSchema(FAQ_COMPLET);
  if (!faqRaw) throw new Error('FAQ À propos : schéma invalide');
  const faq = stripAtContext(faqRaw as Record<string, unknown>);
  faq['@id'] = `${PAGE_URL}#faq`;

  const imageObj = stripAtContext(buildAProposImageObjectJsonLd() as Record<string, unknown>);
  imageObj['@id'] = `${PAGE_URL}#image-portrait-pro`;

  const personBase = buildPersonLaureSchemaNode({
    personId: PERSON_ID,
    pageUrl: PAGE_URL,
    organizationId: ORGANIZATION_ID,
  });

  const person: Record<string, unknown> = {
    ...personBase,
    honorificPrefix: 'Mme',
    description: getAProposPagePersonDescription(),
    image: `${BASE}${PHOTOS.aProposHero2026.src}`,
    nationality: { '@type': 'Country', name: 'France' },
    knowsLanguage: ['fr', 'en'],
    birthPlace: { '@type': 'Place', addressCountry: 'FR' },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'ALIA BTP — direction (2017-2024)',
        identifier: '85368731700018',
      },
      {
        '@type': 'Organization',
        name: 'Formatrice indépendante — création d’entreprise & marketing digital CPF (2019-2022)',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'CNAM Paris — Master Stratégie d\'entreprise (2021)',
      },
      {
        '@type': 'Organization',
        name: 'CNFPT Grande Couronne (chargée de formation 2009-2019)',
      },
    ],
    sameAs: [...sitePersonSchemaSameAs()],
    hasOccupation: {
      '@type': 'Occupation',
      name: SITE_PERSON_JOB_TITLE,
      occupationLocation: { '@type': 'City', name: SCHEMA_GEO.addressLocality },
      skills:
        'IA appliquée au BTP, ChatGPT bâtiment, Claude AI, mémoire technique, analyse DCE/CCTP, devis BTP',
    },
    award: [`Satisfaction ${PREUVES.satisfaction} (${PREUVES.repondants} répondants)`],
    workLocation: [{ '@type': 'AdministrativeArea', name: 'Île-de-France' }],
    memberOf: buildPersonAffiliationSchemaNodes(),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'LinkedIn Learning Instructor',
        name: 'Instructrice LinkedIn Learning',
      },
    ],
  };

  const profilePage: Record<string, unknown> = {
    '@type': 'ProfilePage',
    '@id': PROFILE_PAGE_ID,
    url: PAGE_URL,
    name: 'Laure Olivié — Organisme de formation IA BTP',
    dateCreated: '2022-01-15T12:00:00+01:00',
    dateModified: contentUpdatedAtToSchemaIso(getPillarPageContentUpdatedAt('/a-propos')),
    mainEntity: { '@id': PERSON_ID },
    about: { '@id': ORGANIZATION_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#organisme-title', '#positionnement-title'],
    },
  };

  const videosAndCourses: Record<string, unknown>[] = [];
  LINKEDIN_LEARNING_A_PROPOS_EMBEDS.forEach((item, index) => {
    const vidId = `${PAGE_URL}#video-linkedin-${index + 1}`;
    const courseId = `${PAGE_URL}#course-linkedin-${index + 1}`;
    const thumb = `${BASE}/images/laure-linkedin-learning-sommaire-cours.png`;
    const uploadIso = index === 0 ? '2024-04-15T10:00:00+02:00' : '2024-09-01T10:00:00+02:00';

    videosAndCourses.push({
      '@type': 'VideoObject',
      '@id': vidId,
      name: item.courseLabel,
      description: `Cours LinkedIn Learning par Laure Olivié — ${item.courseLabel}. Formation professionnelle IA appliquée au BTP.`,
      thumbnailUrl: thumb,
      uploadDate: uploadIso,
      duration: index === 0 ? 'PT45M' : 'PT40M',
      contentUrl: item.courseHref,
      embedUrl: item.embedSrc,
      inLanguage: 'fr-FR',
      publisher: { '@type': 'Organization', name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/' },
      author: { '@id': PERSON_ID },
      educationalUse: 'professional training',
    });

    videosAndCourses.push({
      '@type': 'Course',
      '@id': courseId,
      name: item.courseLabel,
      description: `Cours LinkedIn Learning à la demande — ${item.courseLabel}. Instructrice : Laure Olivié.`,
      url: item.courseHref,
      provider: { '@type': 'Organization', name: 'LinkedIn Learning' },
      instructor: { '@id': PERSON_ID },
      inLanguage: 'fr-FR',
      educationalLevel: 'professional',
      hasCourseInstance: [
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: LINKEDIN_COURSE_DURATION[index] ?? 'PT2H',
        },
      ],
    });
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [profilePage, person, faq, imageObj, ...videosAndCourses],
  };
}
