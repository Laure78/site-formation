/**
 * JSON-LD @graph unique — page d'accueil uniquement (Organization + WebSite + Course + FAQ + HowTo + Service + WebPage).
 * Données alignées sur `lib/schema-constants.ts` et `FAQ_ITEMS_HOME`.
 */
import type { FAQItem } from '@/lib/faq';
import { FAQ_ITEMS_HOME } from '@/lib/faq';
import { faqAnswerPlainTextForSchema } from '@/lib/faq-plain-text';
import {
  SCHEMA_AGGREGATE_RATING_HOME,
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { SITE_CONFIG, siteHasPublicPhone } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import { formatProfessionalsTrainedCount } from '@/lib/constants';

const ANNUAIRE_LABELS_CERT =
  'https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281';

const FAQ_GRAPH_MAX = 14;

function faqMainEntity(items: readonly FAQItem[]) {
  return items.slice(0, FAQ_GRAPH_MAX).map((item) => ({
    '@type': 'Question' as const,
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: faqAnswerPlainTextForSchema(item.a),
    },
  }));
}

export function buildHomeUnifiedGraphJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const laureId = `${base}/#laure-olivie`;
  const websiteId = `${base}/#website`;
  const webpageId = `${base}/#webpage`;
  const breadcrumbId = `${base}/#breadcrumb`;
  const courseId = `${base}/#course-pivot`;
  const serviceId = `${base}/#service`;
  const faqId = `${base}/#faq`;
  const howToId = `${base}/#howto-cas-usage`;
  const imageHeroId = `${base}/#image-hero`;

  const heroImageUrl = `${base}/images/hero-accueil-formation-ia-btp-echange-2026.png`;
  const personImageUrl = `${base}/images/laure-portrait-pro-2026.png`;
  const dateModified = new Date().toISOString().split('T')[0];

  const priceStr = String(TARIF_FORFAIT_DEBUTANT_HT);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'EducationalOrganization', 'LocalBusiness'],
        '@id': orgId,
        name: SCHEMA_ORGANIZATION_OFC.name,
        legalName: SCHEMA_ORGANIZATION_OFC.legalNameSasu,
        alternateName: ['Laure Olivié Formation', 'OFC Formation IA BTP'],
        url: base,
        logo: {
          '@type': 'ImageObject',
          url: schemaLogoUrl(),
          width: 200,
          height: 60,
        },
        image: heroImageUrl,
        description: SCHEMA_ORGANIZATION_OFC.descriptionShortGraph,
        founder: { '@id': laureId },
        foundingDate: SCHEMA_ORGANIZATION_OFC.foundingYear,
        email: SCHEMA_CONTACT.email,
        ...(siteHasPublicPhone() ? { telephone: SCHEMA_CONTACT.phone } : {}),
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: ['Bank transfer', 'OPCO Constructys'],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHEMA_GEO.streetAddress,
          addressLocality: SCHEMA_GEO.addressLocality,
          addressRegion: SCHEMA_GEO.addressRegion,
          postalCode: SCHEMA_GEO.postalCode,
          addressCountry: SCHEMA_GEO.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SCHEMA_GEO.latitude,
          longitude: SCHEMA_GEO.longitude,
        },
        areaServed: [
          { '@type': 'Country', name: 'France' },
          { '@type': 'AdministrativeArea', name: 'Île-de-France' },
          { '@type': 'City', name: 'Paris' },
          { '@type': 'AdministrativeArea', name: 'Yvelines' },
          { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine' },
          { '@type': 'AdministrativeArea', name: 'Essonne' },
          { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis' },
          { '@type': 'AdministrativeArea', name: 'Val-de-Marne' },
          { '@type': 'AdministrativeArea', name: "Val-d'Oise" },
          { '@type': 'AdministrativeArea', name: 'Seine-et-Marne' },
        ],
        identifier: [
          { '@type': 'PropertyValue', name: 'SIRET', value: SCHEMA_CONTACT.siretFormatted },
          { '@type': 'PropertyValue', name: 'NDA', value: SCHEMA_CONTACT.nda },
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi — Actions de formation',
          credentialCategory: 'Certification qualité organisme de formation',
          recognizedBy: { '@type': 'Organization', name: 'République française' },
          url: ANNUAIRE_LABELS_CERT,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SCHEMA_AGGREGATE_RATING_HOME.ratingValue,
          bestRating: SCHEMA_AGGREGATE_RATING_HOME.bestRating,
          worstRating: SCHEMA_AGGREGATE_RATING_HOME.worstRating,
          ratingCount: SCHEMA_AGGREGATE_RATING_HOME.ratingCount,
        },
        sameAs: [
          SCHEMA_LINKEDIN_PROFILE_URL,
          'https://www.linkedin.com/learning/instructors/laure-olivie',
          SITE_CONFIG.googleBusinessProfileUrl,
          `https://annuaire-entreprises.data.gouv.fr/entreprise/${SCHEMA_CONTACT.siretDigits}`,
        ],
      },
      {
        '@type': 'Person',
        '@id': laureId,
        name: 'Laure Olivié',
        givenName: 'Laure',
        familyName: 'Olivié',
        jobTitle: 'Formatrice IA & ChatGPT spécialisée BTP',
        description: `Laure Olivié est formatrice IA et ChatGPT pour le BTP. Ancienne conductrice de travaux pendant 10 ans, elle a formé ${formatProfessionalsTrainedCount()} professionnels du bâtiment depuis 2021. Instructrice LinkedIn Learning.`,
        url: `${base}/a-propos`,
        image: personImageUrl,
        email: SCHEMA_CONTACT.email,
        ...(siteHasPublicPhone() ? { telephone: SCHEMA_CONTACT.phone } : {}),
        worksFor: { '@id': orgId },
        knowsAbout: [
          'Intelligence artificielle pour le BTP',
          'ChatGPT pour le bâtiment',
          'Claude AI pour les travaux publics',
          'Automatisation des devis BTP',
          'Rédaction de mémoires techniques avec l\'IA',
          'Analyse de DCE et CCTP avec l\'IA',
          'Comptes rendus de chantier automatisés',
          'Formation professionnelle Qualiopi',
          'Conduite de travaux',
        ],
        alumniOf: { '@type': 'Organization', name: 'Conductrice de travaux ALIA BTP' },
        sameAs: [SCHEMA_LINKEDIN_PROFILE_URL, 'https://www.linkedin.com/learning/instructors/laure-olivie'],
      },
      {
        '@type': 'ImageObject',
        '@id': imageHeroId,
        url: heroImageUrl,
        contentUrl: heroImageUrl,
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: base,
        name: 'Formation IA BTP Île-de-France',
        isPartOf: { '@id': websiteId },
        about: { '@id': courseId },
        primaryImageOfPage: { '@id': imageHeroId },
        datePublished: '2024-01-01',
        dateModified,
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': breadcrumbId },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.citation-sentence', 'h1', 'h2'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: base,
          },
        ],
      },
      {
        '@type': 'Course',
        '@id': courseId,
        name: "Formation IA BTP — L'IA au service du bâtiment",
        description: `Formation pratique de 4 heures pour former les équipes BTP à ChatGPT et Claude AI : devis, comptes rendus de chantier, appels d'offres, mémoires techniques, administratif. ${formatProfessionalsTrainedCount()} professionnels déjà formés.`,
        url: `${base}${LINKS.formationBatiment}`,
        provider: { '@id': orgId },
        instructor: { '@id': laureId },
        inLanguage: 'fr-FR',
        educationalLevel: 'Professionnel',
        teaches: [
          'Utilisation de ChatGPT pour rédiger des devis BTP',
          'Analyse de DCE et CCTP avec l\'IA',
          'Rédaction de mémoires techniques pour appels d\'offres',
          'Automatisation des comptes rendus de chantier',
          'Gestion des emails et de la relation client avec l\'IA',
          'Confidentialité et bonnes pratiques de l\'IA en entreprise BTP',
        ],
        coursePrerequisites: 'Savoir naviguer sur internet, disposer d\'un ordinateur',
        numberOfCredits: 0,
        timeRequired: 'PT4H',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: ['onsite', 'online'],
          location: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Île-de-France',
              addressCountry: 'FR',
            },
          },
          instructor: { '@id': laureId },
          courseWorkload: 'PT4H',
          inLanguage: 'fr-FR',
        },
        offers: {
          '@type': 'Offer',
          price: priceStr,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          category: 'Inter-entreprises',
          eligibleRegion: { '@type': 'Country', name: 'France' },
          url: `${base}${LINKS.formations}`,
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole:
            'Dirigeants PME BTP, conducteurs de travaux, chargés d\'affaires, équipes administratives BTP',
        },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Formation IA et ChatGPT pour le BTP',
        serviceType: 'Formation professionnelle continue',
        provider: { '@id': orgId },
        areaServed: { '@type': 'AdministrativeArea', name: 'Île-de-France' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catalogue de formations IA BTP',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'L\'IA au service du bâtiment (BTP-01)' },
              price: priceStr,
              priceCurrency: 'EUR',
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'L\'IA au service des Travaux Publics (BTP-04)' },
              price: priceStr,
              priceCurrency: 'EUR',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Sensibilisation IA & Assistants personnalisés (BTP-05)',
              },
              price: priceStr,
              priceCurrency: 'EUR',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': faqId,
        mainEntity: faqMainEntity(FAQ_ITEMS_HOME),
      },
      {
        '@type': 'HowTo',
        '@id': howToId,
        name: 'Comment utiliser l\'IA dans le BTP : 5 cas d\'usage concrets',
        description:
          'Méthode éprouvée par Laure Olivié pour intégrer l\'IA générative (ChatGPT, Claude AI) dans le quotidien d\'une entreprise du BTP.',
        totalTime: 'PT4H',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Mémoires techniques et dossiers d\'appel d\'offres',
            text: 'Structurer et rédiger les mémoires techniques plus rapidement avec l\'IA, tout en gardant la validation métier de l\'expert BTP.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Analyse de CCTP et DCE',
            text: 'Utiliser l\'IA pour synthétiser les pièces longues d\'un dossier de consultation et repérer automatiquement les exigences techniques clés.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Comptes rendus de chantier',
            text: 'À partir de notes vocales ou écrites prises sur le chantier, l\'IA structure un compte rendu professionnel clair en quelques minutes.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Devis et chiffrage',
            text: 'Mise en forme automatique des devis, génération de variantes et relecture orthographique pour gagner 2 à 4 heures par devis détaillé.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Emails et administratif',
            text: 'Rédaction des relances clients, courriers fournisseurs et emails de gestion en quelques secondes avec le bon ton professionnel.',
          },
        ],
      },
    ],
  };
}
