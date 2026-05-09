import { JsonLd } from '@/components/JsonLd';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';

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
      url: 'https://laureolivie.fr',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.85',
      ratingCount: '1592',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['Onsite', 'Online'],
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
