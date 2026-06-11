import { JsonLd } from '@/components/JsonLd';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';

type CourseSchemaProps = {
  name: string;
  description: string;
  url: string;
  duration: string;
  price: number;
  currency?: string;
  level: string;
};

const CALENDLY_OFFER_URL = buildSiteCalendlyCtaUrl('schema-jsonld-course-offer');

export function CourseSchema({
  name,
  description,
  url,
  duration,
  price,
  currency = 'EUR',
  level,
}: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: "OFC Création d'Entreprise",
      url: SCHEMA_PUBLIC_SITE_URL,
      sameAs: ['https://fr.linkedin.com/in/laure-olivie'],
    },
    instructor: {
      '@type': 'Person',
      name: 'Laure Olivié',
    },
    duration,
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: CALENDLY_OFFER_URL,
    },
    aggregateRating: buildSchemaAggregateRating(),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['Onsite'],
      courseWorkload: duration,
      location: {
        '@type': 'Place',
        name: 'Île-de-France',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Île-de-France',
          addressCountry: 'FR',
        },
      },
    },
    educationalLevel: level,
    inLanguage: 'fr',
    isAccessibleForFree: false,
    creditsAwarded: 'Certification Qualiopi',
  };

  return <JsonLd id={`schema-course-${name.toLowerCase().replace(/\s+/g, '-')}`} schema={schema} />;
}
