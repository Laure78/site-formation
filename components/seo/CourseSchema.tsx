import { JsonLd } from '@/components/JsonLd';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';

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
  const path = url.replace(/^https?:\/\/[^/]+/, '') || '/';
  const schema = {
    ...buildFormationFicheCourseJsonLd({
      name,
      description,
      path,
      url,
      timeRequired: duration,
      educationalLevel: level,
      instructorName: 'Laure Olivié',
    }),
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: CALENDLY_OFFER_URL,
    },
    aggregateRating: buildSchemaAggregateRating(),
    isAccessibleForFree: false,
    creditsAwarded: 'Certification Qualiopi',
  };

  return <JsonLd id={`schema-course-${name.toLowerCase().replace(/\s+/g, '-')}`} schema={schema} />;
}
