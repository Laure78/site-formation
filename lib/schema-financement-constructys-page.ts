/**
 * JSON-LD @graph — page /financement-constructys-formation-ia-btp (FAQ, Article, HowTo, LocalBusiness, Course).
 * Pas de nœud Organization dupliqué : références par @id uniquement.
 */

import { FAQ_FINANCEMENT_CONSTRUCTYS_PAGE } from '@/lib/faq';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { SITE_CONFIG, getArticleSchema, getFAQSchema } from '@/lib/seo';
import { buildFinancementConstructysImageObjectJsonLd } from '@/lib/schema-image-objects';
import {
  FINANCEMENT_ETAPES,
  FINANCEMENT_PAGE_H1,
  FINANCEMENT_PAGE_META_DESCRIPTION,
} from '@/lib/financement-constructys-page-config';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_SESSION_FORFAIT_HT,
} from '@/lib/tarifs-sessions';

const PATH = '/financement-constructys-formation-ia-btp' as const;

function stripJsonLdContext<T extends Record<string, unknown>>(obj: T): Omit<T, '@context'> {
  const { ['@context']: _c, ...rest } = obj;
  return rest as Omit<T, '@context'>;
}

export function getFinancementConstructysUnifiedJsonLd(): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const pageUrl = `${base}${PATH}`;
  const faqRaw = getFAQSchema(FAQ_FINANCEMENT_CONSTRUCTYS_PAGE);
  if (!faqRaw) {
    throw new Error('FAQ financement : schéma FAQPage invalide');
  }
  const faq = stripJsonLdContext(faqRaw as Record<string, unknown>);
  faq['@id'] = `${pageUrl}#faq`;

  const articleRaw = getArticleSchema({
    headline: FINANCEMENT_PAGE_H1,
    description: FINANCEMENT_PAGE_META_DESCRIPTION,
    path: PATH,
    datePublished: '2026-01-15',
    dateModified: getPillarPageContentUpdatedAt('/financement-constructys-formation-ia-btp'),
    authorName: SITE_CONFIG.name,
    image: '/images/financement-constructys-formation-ia-btp-hero.webp',
  });
  const article = stripJsonLdContext(articleRaw as Record<string, unknown>);
  article['@id'] = `${pageUrl}#article`;

  const howTo: Record<string, unknown> = {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name: 'Comment demander une prise en charge Constructys pour une formation IA BTP',
    description:
      'Cinq étapes pour préparer une demande de participation financière Constructys : vérification OPCO, programme et devis, dépôt eGestion, validation, justificatifs.',
    totalTime: 'P15D',
    step: FINANCEMENT_ETAPES.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.titre,
      text: s.texte,
    })),
  };

  const localBusiness: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': `${base}/#localbusiness`,
    name: SITE_CONFIG.legalName,
    image: `${base}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
    url: base,
    email: SCHEMA_CONTACT.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHEMA_GEO.latitude,
      longitude: SCHEMA_GEO.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [{ '@type': 'State', name: 'Île-de-France' }, { '@type': 'Country', name: 'France' }],
  };

  const course: Record<string, unknown> = {
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `Formation IA pour les pros du BTP — session ${SESSION_DUREE_LIBELLE}`,
    description:
      'Session présentiel sur l’IA générative (ChatGPT, Claude) appliquée au BTP — devis, chantier, administratif. Niveaux débutant et avancé.',
    url: pageUrl,
    provider: { '@id': `${base}/#organization` },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        location: {
          '@type': 'Place',
          name: 'Île-de-France & intra-entreprise France',
          address: {
            '@type': 'PostalAddress',
            addressLocality: SCHEMA_GEO.addressLocality,
            postalCode: SCHEMA_GEO.postalCode,
            addressCountry: SCHEMA_GEO.addressCountry,
          },
        },
        inLanguage: 'fr-FR',
        courseWorkload: 'PT4H',
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Session catalogue 4 h — intra-entreprise (forfait session)',
        price: String(TARIF_SESSION_FORFAIT_HT),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${base}/formations`,
      },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      faq,
      article,
      howTo,
      localBusiness,
      course,
      stripJsonLdContext(buildFinancementConstructysImageObjectJsonLd() as Record<string, unknown>),
    ],
  };
}
