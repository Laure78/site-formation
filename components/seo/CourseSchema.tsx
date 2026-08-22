import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
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

const RDV_OFFER_URL = `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}${LINKS.prendreRdv}`;

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
      url: RDV_OFFER_URL,
    },
    isAccessibleForFree: false,
    creditsAwarded: 'Certificat de réalisation',
  };

  return <JsonLd id={`schema-course-${name.toLowerCase().replace(/\s+/g, '-')}`} schema={schema} />;
}
