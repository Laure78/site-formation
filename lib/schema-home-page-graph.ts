import { SCHEMA_CONTACT } from '@/lib/schema-constants';

/**
 * JSON-LD @graph (LocalBusiness + Person) — page d’accueil uniquement.
 */
export const HOME_PAGE_GRAPH_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.laureolivie.fr/#business',
      name: "OFC Création d'Entreprise",
      url: 'https://www.laureolivie.fr',
      email: SCHEMA_CONTACT.email,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: SCHEMA_CONTACT.email,
          availableLanguage: 'French',
          areaServed: 'FR',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6 Rue Henri Dunant',
        addressLocality: 'Guyancourt',
        postalCode: '78280',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 48.7739,
        longitude: 2.0688,
      },
      priceRange: '€€',
      openingHours: 'Mo-Fr 09:00-18:00',
      sameAs: [
        'https://fr.linkedin.com/in/laure-olivie',
        'https://annuaire-entreprises.data.gouv.fr/entreprise/905244281',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.laureolivie.fr/#laure',
      name: 'Laure Olivié',
      jobTitle: 'Formatrice IA spécialisée BTP',
      url: 'https://www.laureolivie.fr/a-propos',
      worksFor: { '@id': 'https://www.laureolivie.fr/#business' },
      sameAs: [
        'https://fr.linkedin.com/in/laure-olivie',
        'https://www.linkedin.com/learning/instructors/laure-olivie',
      ],
    },
  ],
};
