/**
 * JSON-LD @graph — page d'accueil uniquement.
 * Organization (`#organization`) et Person (`#laure-olivie`) sont déclarés une seule fois
 * dans le layout (`GlobalSiteJsonLd`) — ici on les référence uniquement par `@id`.
 * FAQPage accueil injecté séparément via `buildHomeFAQPageJsonLd()`.
 */
import {
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { TARIF_SESSION_FORFAIT_HT } from '@/lib/tarifs-sessions';
import {
  buildHomeHeroImageObjectNode,
  buildHomeTerrainImageObjectNodes,
  HOME_HERO_IMAGE_OBJECT_ID,
} from '@/lib/schema-image-objects';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

export function buildHomeUnifiedGraphJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const laureId = `${base}/#laure-olivie`;
  const websiteId = `${base}/#website`;
  const webpageId = `${base}/#webpage`;
  const breadcrumbId = `${base}/#breadcrumb`;
  const courseId = `${base}/#course-pivot`;
  const imageHeroId = HOME_HERO_IMAGE_OBJECT_ID;

  const terrainImageNodes = buildHomeTerrainImageObjectNodes();
  const priceStr = String(TARIF_SESSION_FORFAIT_HT);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildHomeHeroImageObjectNode(),
      ...terrainImageNodes,
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: base,
        name: 'Formation IA pour le BTP Île-de-France',
        isPartOf: { '@id': websiteId },
        about: { '@id': courseId },
        primaryImageOfPage: { '@id': imageHeroId },
        image: [
          { '@id': imageHeroId },
          ...terrainImageNodes.map((node) => ({ '@id': node['@id'] as string })),
        ],
        datePublished: '2024-01-01',
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': breadcrumbId },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.citation-sentence', 'h1', 'h2'],
        },
        publisher: { '@id': orgId },
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
        name: "Formation IA pour les pros du BTP — niveau 1 bâtiment & travaux publics",
        description: `Formation pratique de 4 heures pour former les équipes BTP et du secteur de la construction à ChatGPT et Claude AI : devis, comptes rendus de chantier, administratif, documents bâtiment et TP. Satisfaction ${formatNoteSatisfactionAffichageComplet()}.`,
        url: `${base}${LINKS.formationIaBtpNiveau1BatimentTp}`,
        provider: { '@id': orgId },
        instructor: { '@id': laureId },
        inLanguage: 'fr-FR',
        educationalLevel: 'Professionnel',
        about: [
          { '@type': 'Thing', name: 'Bâtiment' },
          { '@type': 'Thing', name: 'Construction' },
          { '@type': 'Thing', name: 'Travaux publics' },
          { '@type': 'Thing', name: 'Intelligence artificielle' },
        ],
        keywords:
          'formation IA BTP, formation IA bâtiment, formation IA construction, ChatGPT BTP, travaux publics, entreprises de construction',
        teaches: [
          'Utilisation de ChatGPT pour rédiger des devis BTP',
          "Analyse de DCE et CCTP avec l'IA",
          "Rédaction de mémoires techniques pour appels d'offres",
          'Automatisation des comptes rendus de chantier',
          "Gestion des emails et de la relation client avec l'IA",
          "Confidentialité et bonnes pratiques de l'IA en entreprise BTP",
        ],
        coursePrerequisites: "Savoir naviguer sur internet, disposer d'un ordinateur",
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
          category: 'Intra-entreprise',
          eligibleRegion: { '@type': 'Country', name: 'France' },
          url: `${base}${LINKS.formations}`,
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole:
            "Dirigeants PME BTP, entreprises de construction, conducteurs de travaux, chargés d'affaires, équipes administratives BTP",
        },
      },
    ],
  };
}
