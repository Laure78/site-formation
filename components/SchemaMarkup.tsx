import { JsonLd } from '@/components/JsonLd';
import { SCHEMA_CONTACT, SCHEMA_GEO, SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { SITE_CONFIG } from '@/lib/seo';

const SITE = SITE_CONFIG.url.replace(/\/$/, '');

type SchemaMarkupProps = {
  /** Schéma Course (objet JSON-LD complet ou partiel fusionné côté page avec `getCourseSchema`) */
  course?: object;
  /** Schéma FAQPage */
  faq?: object | null;
  /** BreadcrumbList */
  breadcrumb?: object;
  /** Person (Laure Olivié) — utile articles / formations si non déjà injecté ailleurs */
  person?: boolean;
  /** LocalBusiness — éviter doublon avec layout accueil ; réservé cas particuliers */
  localBusiness?: boolean;
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_CONFIG.name,
  jobTitle: 'Formatrice IA & ChatGPT spécialisée BTP',
  url: `${SITE}/a-propos`,
  sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
  worksFor: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE,
  },
};

const localBusinessJsonLdBase = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_CONFIG.legalName,
  '@id': `${SITE}/#localbusiness`,
  url: SITE,
  image: `${SITE}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
  email: SCHEMA_CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SCHEMA_GEO.streetAddress,
    addressLocality: SCHEMA_GEO.addressLocality,
    postalCode: SCHEMA_GEO.postalCode,
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
  priceRange: 'Sur devis',
} as const;

function buildLocalBusinessJsonLd() {
  const tel =
    typeof SCHEMA_CONTACT.phone === 'string' && SCHEMA_CONTACT.phone.length > 0
      ? { telephone: SCHEMA_CONTACT.phone }
      : {};
  return { ...localBusinessJsonLdBase, ...tel };
}

/**
 * Injection ciblée de JSON-LD (Course, FAQ, fil d’Ariane, Person, LocalBusiness).
 * L’Organization globale est déjà fournie dans `app/layout.tsx` — ne pas dupliquer ici.
 */
export function SchemaMarkup({ course, faq, breadcrumb, person, localBusiness }: SchemaMarkupProps) {
  return (
    <>
      {course != null && <JsonLd id="schema-markup-course" schema={course} />}
      {faq != null && <JsonLd id="schema-markup-faq" schema={faq} />}
      {breadcrumb != null && <JsonLd id="schema-markup-breadcrumb" schema={breadcrumb} />}
      {person === true && <JsonLd id="schema-markup-person" schema={personJsonLd} />}
      {localBusiness === true && (
        <JsonLd id="schema-markup-localbusiness" schema={buildLocalBusinessJsonLd()} />
      )}
    </>
  );
}
