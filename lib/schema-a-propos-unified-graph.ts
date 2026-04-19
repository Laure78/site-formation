/**
 * JSON-LD @graph unique — page /a-propos (Person, ProfilePage, LocalBusiness, FAQ, VideoObject, Course, ImageObject).
 * Références Organization par @id — pas de duplication du nœud #organization.
 */

import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_OPENING_HOURS,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { getFAQSchema } from '@/lib/seo';
import { buildAProposImageObjectJsonLd } from '@/lib/schema-image-objects';
import { LINKEDIN_LEARNING_A_PROPOS_EMBEDS } from '@/lib/linkedin-learning-a-propos-embeds';
import { A_PROPOS_PROFILE_PERSON_DESCRIPTION } from '@/lib/schema-a-propos';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_PATH = '/a-propos';
const PAGE_URL = `${BASE}${PAGE_PATH}`;
const PERSON_ID = `${PAGE_URL}#person`;
const PROFILE_PAGE_ID = `${PAGE_URL}#profilepage`;
const OFC_LOCAL_ID = `${PAGE_URL}#ofc-local-business`;

const FAQ_COMPLET = [...FAQ_CLIENTS_PARTENAIRES, ...FAQ_A_PROPOS];

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

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Laure Olivié',
    honorificPrefix: 'Mme',
    jobTitle: 'Formatrice IA BTP',
    description: A_PROPOS_PROFILE_PERSON_DESCRIPTION,
    url: PAGE_URL,
    image: `${BASE}/images/laure-portrait-pro-2026.png`,
    telephone: SCHEMA_CONTACT.phone,
    email: SCHEMA_CONTACT.email,
    nationality: { '@type': 'Country', name: 'France' },
    knowsLanguage: ['fr', 'en'],
    birthPlace: { '@type': 'Place', addressCountry: 'FR' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    worksFor: { '@id': `${BASE}/#organization` },
    alumniOf: {
      '@type': 'Organization',
      name: 'ALIA BTP',
      identifier: '85368731700018',
    },
    sameAs: [
      'https://fr.linkedin.com/in/laure-olivie',
      'https://www.linkedin.com/learning/instructors/laure-olivie',
    ],
    knowsAbout: [
      'Intelligence artificielle',
      'ChatGPT',
      'Claude AI',
      'Formation BTP',
      'Devis BTP',
      "Appels d'offres BTP",
      'Qualiopi',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Formatrice IA spécialisée BTP',
      occupationLocation: { '@type': 'City', name: 'Guyancourt' },
      skills:
        'Intelligence artificielle, ChatGPT, Claude AI, formation BTP, appels d’offres BTP, devis BTP, Qualiopi',
    },
    award: [
      'Certification Qualiopi — organisme de formation (NDA 11788515078)',
      'Instructrice officielle LinkedIn Learning',
      'Labellisée Activateur France Num',
    ],
    workLocation: [{ '@type': 'AdministrativeArea', name: 'Île-de-France' }],
    memberOf: [{ '@type': 'Organization', name: 'FFB Grand Paris — organisme de formation référencé' }],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certification',
        name: 'Certification Qualiopi',
        recognizedBy: { '@type': 'Organization', name: 'État français' },
      },
    ],
  };

  const localBusiness: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': OFC_LOCAL_ID,
    name: SCHEMA_ORGANIZATION_OFC.name,
    legalName: SCHEMA_ORGANIZATION_OFC.legalName,
    url: BASE,
    logo: `${BASE}/logo-lo.svg`,
    image: `${BASE}/images/laure-portrait-pro-2026.png`,
    description: `Organisme de formation certifié Qualiopi spécialisé en intelligence artificielle pour les entreprises du bâtiment et des travaux publics. Formation IA BTP finançable Constructys. +${formatProfessionalsTrainedCount()} professionnels formés. Note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
    email: SCHEMA_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressCountry: SCHEMA_GEO.addressCountry,
      addressRegion: SCHEMA_GEO.addressRegion,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHEMA_GEO.latitude,
      longitude: SCHEMA_GEO.longitude,
    },
    areaServed: [
      'Île-de-France',
      'Paris',
      'Yvelines',
      'Hauts-de-Seine',
      'Seine-et-Marne',
      'Val-de-Marne',
      'Seine-Saint-Denis',
      "Val-d'Oise",
      'Essonne',
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    openingHours: SCHEMA_OPENING_HOURS,
    sameAs: [
      'https://fr.linkedin.com/in/laure-olivie',
      'https://www.malt.fr/profile/laureoli',
      'https://annuaire-entreprises.data.gouv.fr/entreprise/905244281',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certification Qualiopi',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Ministère du Travail' },
    },
    taxID: SCHEMA_CONTACT.siretFormatted,
    vatID: SCHEMA_CONTACT.vatId,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.85',
      ratingCount: String(SOCIAL_PROOF.PROFESSIONALS_TRAINED),
      bestRating: '5',
      worstRating: '1',
    },
  };

  const profilePage: Record<string, unknown> = {
    '@type': 'ProfilePage',
    '@id': PROFILE_PAGE_ID,
    url: PAGE_URL,
    name: 'Laure Olivié — Formatrice IA BTP (Qualiopi, FFB, LinkedIn Learning)',
    dateCreated: '2022-01-15T12:00:00+01:00',
    dateModified: '2026-04-17T12:00:00+02:00',
    mainEntity: { '@id': PERSON_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.tldr-bio', '#parcours'],
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
      description: `Formation en ligne LinkedIn Learning — ${item.courseLabel}. Instructrice : Laure Olivié.`,
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
    '@graph': [profilePage, person, localBusiness, faq, imageObj, ...videosAndCourses],
  };
}
