/**
 * JSON-LD @graph Person + Organization (GEO / rich results)
 * — injecté globalement via next/script dans app/layout.tsx
 */
import { SITE_CONFIG } from '@/lib/seo';

export function getSchemaPersonOrganization() {
  const base = SITE_CONFIG.url;
  const photoUrl = `${base}/images/laure-olivie-formatrice.png`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${base}/#laure-olivie`,
        name: 'Laure Olivié',
        givenName: 'Laure',
        familyName: 'Olivié',
        jobTitle: 'Formatrice IA et ChatGPT pour le BTP',
        description:
          'Formatrice experte en intelligence artificielle spécialisée dans le secteur BTP. 1 592 professionnels formés, note 4,85/5. Ancienne conductrice de travaux reconvertie en formatrice IA. Instructrice LinkedIn Learning.',
        url: `${base}/a-propos`,
        image: photoUrl,
        email: 'laureolivie@yahoo.fr',
        telephone: '+33695661818',
        sameAs: [
          'https://fr.linkedin.com/in/laure-olivie',
          'https://www.linkedin.com/learning/instructors/laure-olivie',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Certification Qualiopi',
            credentialCategory: 'Organisme de formation certifié',
            recognizedBy: {
              '@type': 'Organization',
              name: 'France Compétences',
            },
          },
        ],
        worksFor: {
          '@id': `${base}/#ofc`,
        },
        knowsAbout: [
          'Intelligence artificielle pour le BTP',
          'ChatGPT formation professionnelle',
          'Claude AI',
          'Formation IA bâtiment',
          "Appels d'offres BTP",
          'Chiffrage et devis BTP',
          'Mémoire technique',
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${base}/#ofc`,
        name: "OFC Création d'Entreprise",
        legalName: "OFC Création d'Entreprise SASU",
        url: base,
        logo: `${base}/logo-lo.svg`,
        description:
          'Organisme de formation certifié Qualiopi spécialisé en formation IA et ChatGPT pour les entreprises du BTP. 1 592 professionnels formés. Finançable Constructys.',
        foundingDate: '2021',
        founder: {
          '@id': `${base}/#laure-olivie`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Guyancourt',
          addressRegion: 'Île-de-France',
          postalCode: '78280',
          addressCountry: 'FR',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+33695661818',
          email: 'laureolivie@yahoo.fr',
          contactType: 'customer service',
          availableLanguage: 'French',
        },
        identifier: [
          {
            '@type': 'PropertyValue',
            name: 'SIRET',
            value: '905 244 281 00010',
          },
          {
            '@type': 'PropertyValue',
            name: 'NDA',
            value: '11788515078',
          },
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi',
          credentialCategory: 'Certification qualité organisme de formation',
        },
        areaServed: [
          'Île-de-France',
          'Paris',
          'Yvelines',
          'Essonne',
          'Hauts-de-Seine',
          'Seine-Saint-Denis',
          'Val-de-Marne',
          "Val-d'Oise",
          'Seine-et-Marne',
          'France',
        ],
        knowsAbout: [
          'Formation IA BTP',
          'Formation ChatGPT bâtiment',
          'Formation intelligence artificielle construction',
        ],
        sameAs: ['https://fr.linkedin.com/in/laure-olivie'],
      },
    ],
  };
}
