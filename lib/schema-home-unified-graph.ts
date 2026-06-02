/**
 * JSON-LD @graph unique — page d'accueil uniquement (Organization + Person + WebPage + BreadcrumbList + Course/Offer).
 * Service et HowTo retirés (allègement). La couverture géo exhaustive vit sur les pages géo dédiées.
 * Le FAQPage est injecté séparément dans `app/page.tsx` via `buildHomeFAQPageJsonLd()` + `<Script>` pour rester aligné sur la FAQ visuelle (toutes les entrées).
 * Données alignées sur `lib/schema-constants.ts`.
 */
import {
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
import { PHOTOS } from '@/lib/photos';

const ANNUAIRE_LABELS_CERT =
  'https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281';

export function buildHomeUnifiedGraphJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const laureId = `${base}/#laure-olivie`;
  const websiteId = `${base}/#website`;
  const webpageId = `${base}/#webpage`;
  const breadcrumbId = `${base}/#breadcrumb`;
  const courseId = `${base}/#course-pivot`;
  const imageHeroId = `${base}/#image-hero`;

  const heroImageUrl = `${base}/images/hero-accueil-formation-ia-btp-echange-2026.png`;
  const personImageUrl = `${base}${PHOTOS.portraitPro2026.src}`;
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
        alternateName: ['Laure Olivié Formation', 'OFC Formation IA appliquée au bâtiment'],
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
        // Couverture régionale synthétique sur l'accueil ; la couverture exhaustive
        // (Paris + 7 départements) vit sur /formation-ia-btp-ile-de-france et les pages géo dédiées.
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Île-de-France' },
          { '@type': 'Country', name: 'France' },
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
        name: 'Formation IA pour le BTP Île-de-France',
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
        name: "Formation IA pour les pro du BTP — niveau 1 bâtiment & travaux publics",
        description: `Formation pratique de 4 heures pour former les équipes BTP à ChatGPT et Claude AI : devis, comptes rendus de chantier, administratif, documents bâtiment et TP. ${formatProfessionalsTrainedCount()} professionnels déjà formés.`,
        url: `${base}${LINKS.formationIaBtpNiveau1BatimentTp}`,
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
          courseMode: ['onsite'],
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
    ],
  };
}
