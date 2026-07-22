/**
 * JSON-LD @graph — page /financement-constructys-formation-ia-btp (FAQ, Article, HowTo, LocalBusiness, Course).
 * Pas de nœud Organization dupliqué : références par @id uniquement.
 */

import { FAQ_FINANCEMENT_IA_BTP } from '@/lib/faq';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { SITE_CONFIG, getArticleSchema, getFAQSchema } from '@/lib/seo';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  TARIF_FORFAIT_DEBUTANT_HT,
} from '@/lib/tarifs-sessions';

const PATH = '/financement-constructys-formation-ia-btp' as const;

const H1 =
  'Financer une formation IA pour les pros du BTP avec Constructys en 2026 — guide OPCO, plafonds et dossier eGestion';

const HOWTO_STEPS: { name: string; text: string }[] = [
  {
    name: 'Vérifier le périmètre BTP',
    text:
      'Construire, travaux publics, négoce de matériaux : si c’est votre cas, Constructys est votre OPCO.',
  },
  {
    name: 'Choisir une formation Qualiopi et demander un devis',
    text:
      'OFC délivre des programmes avec programme détaillé et devis — deux pièces que Constructys attend.',
  },
  {
    name: 'Réunir les pièces du dossier',
    text:
      'Convention de formation, liste des participants, justificatifs d’effectif. Si vous êtes adhérent FFB, prévoyez l’attestation demandée.',
  },
  {
    name: 'Déposer sur eGestion au moins 15 jours avant le premier jour',
    text: "Depuis le 1er janvier 2026, un dossier incomplet ou tardif n'est plus financé.",
  },
  {
    name: 'Attendre la validation avant de lancer la formation',
    text: "La formation ne doit pas avoir démarré avant la réception de votre demande par Constructys.",
  },
];

function stripJsonLdContext<T extends Record<string, unknown>>(obj: T): Omit<T, '@context'> {
  const { ['@context']: _c, ...rest } = obj;
  return rest as Omit<T, '@context'>;
}

export function getFinancementConstructysUnifiedJsonLd(): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const pageUrl = `${base}${PATH}`;
  const faqRaw = getFAQSchema(FAQ_FINANCEMENT_IA_BTP);
  if (!faqRaw) {
    throw new Error('FAQ financement : schéma FAQPage invalide');
  }
  const faq = stripJsonLdContext(faqRaw as Record<string, unknown>);
  faq['@id'] = `${pageUrl}#faq`;

  const articleRaw = getArticleSchema({
    headline: H1,
    description:
      'Plafonds Constructys 2026 pour une formation IA pour le BTP : 24 € HT/h (< 11 salariés) ou 19 € HT/h (11–50 salariés depuis le 1er juin 2026), 840/665 € HT/jour intra, dépôt eGestion J-15.',
    path: PATH,
    datePublished: '2026-01-15',
    dateModified: '2026-06-01',
    authorName: SITE_CONFIG.name,
    image: '/images/financement-constructys-formation-ia-btp-hero-2026.webp',
  });
  const article = stripJsonLdContext(articleRaw as Record<string, unknown>);
  article['@id'] = `${pageUrl}#article`;

  const howTo: Record<string, unknown> = {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name: 'Comment obtenir le financement Constructys pour une formation IA appliquée au bâtiment',
    description:
      'Cinq étapes pour financer votre formation IA pour le BTP avec Constructys en 2026 : périmètre BTP, Qualiopi, pièces, eGestion, validation.',
    totalTime: 'P15D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '0',
    },
    step: HOWTO_STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  const localBusiness: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': `${base}/#localbusiness`,
    name: SITE_CONFIG.legalName,
    image: `${base}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
    url: base,
    email: SCHEMA_CONTACT.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressRegion: SCHEMA_GEO.addressRegion,
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
    areaServed: [{ '@type': 'State', name: 'Île-de-France' }, { '@type': 'Country', name: 'France' }],
  };

  const course: Record<string, unknown> = {
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `Formation IA pour les pros du BTP — session ${SESSION_DUREE_LIBELLE}`,
    description:
      'Session présentiel sur l’IA générative (ChatGPT, Claude) appliquée au BTP — devis, chantier, administratif. Niveaux débutant et avancé.',
    url: pageUrl,
    provider: { '@id': `${base}/#organization` },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        location: {
          '@type': 'Place',
          name: 'Île-de-France & intra-entreprise France',
          address: {
            '@type': 'PostalAddress',
            addressLocality: SCHEMA_GEO.addressLocality,
            postalCode: SCHEMA_GEO.postalCode,
            addressCountry: SCHEMA_GEO.addressCountry,
          },
        },
        inLanguage: 'fr-FR',
        courseWorkload: 'PT4H',
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Niveau débutant',
        price: String(TARIF_FORFAIT_DEBUTANT_HT),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${base}/formations`,
      },
      {
        '@type': 'Offer',
        name: 'Niveau avancé',
        price: String(TARIF_FORFAIT_AVANCE_HT),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${base}/formations`,
      },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [faq, article, howTo, localBusiness, course],
  };
}
