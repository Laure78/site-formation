import { JsonLd } from '@/components/JsonLd';

type CourseSchemaProps = {
  name: string;
  description: string;
  url: string;
  duration: string;
  price: number;
  currency?: string;
  level: string;
};

const CALENDLY_COURSE_URL =
  'https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation';

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
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: CALENDLY_COURSE_URL,
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
    inLanguage: 'fr-FR',
    isAccessibleForFree: false,
    creditsAwarded: 'Certification Qualiopi',
  };

  return <JsonLd id={`schema-course-${name.toLowerCase().replace(/\s+/g, '-')}`} schema={schema} />;
}
