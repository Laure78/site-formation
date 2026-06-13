/**
 * JSON-LD combiné pour pages « Formation IA [métier] BTP ».
 *
 * Émet un seul script `<script type="application/ld+json">` avec un `@graph`
 * Schema.org regroupant :
 *  - Organization (OFC Création d'Entreprise — données légales + Qualiopi)
 *  - Service (serviceType "Professional Training")
 *  - Course (provider référencé via @id)
 *  - BreadcrumbList (Accueil → Formations → [métier])
 *  - FAQPage (optionnel, si la page contient une FAQ)
 *
 * Source unique pour SIRET / NDA / adresse : `lib/schema-constants.ts`.
 * Remplace l'usage couplé de `<CourseSchema />` + `<FAQSchema />` sur ces pages
 * pour éviter d'émettre plusieurs blocs JSON-LD séparés.
 */

import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';

export type FormationMetierFaqItem = {
  question: string;
  answer: string;
};

export type FormationMetierBreadcrumbItem = {
  name: string;
  /** Chemin relatif (ex. `/formations`) — sera absolutisé sur le domaine canonique. */
  path: string;
};

type Props = {
  /** Libellé court du métier pour le breadcrumb final, ex. "Étancheur". */
  metierLabel: string;
  /** Chemin canonique de la page, ex. "/formation-ia-etancheur". */
  path: string;
  /** Nom complet du cours pour `Course.name` et `Service.name`. */
  courseName: string;
  /** Description courte (≤ 320 caractères) — réutilisée sur Service + Course. */
  courseDescription: string;
  /** Durée ISO 8601, ex. "PT4H" pour 4 heures, "PT7H" pour journée. */
  duration: string;
  /** Prix HT de la session catalogue en EUR (forfait groupe). */
  price: number;
  /**
   * Niveau pédagogique. Schema.org accepte une chaîne libre, mais
   * recommande "Beginner" | "Intermediate" | "Advanced" pour les rich results.
   * Les pages internes peuvent aussi utiliser des libellés FR ("Professionnel").
   */
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | (string & {});
  /** Compétences couvertes — Schema.org Course.teaches (utile pour Perplexity / SGE). */
  teaches?: string[];
  /** Liste FAQ (≥ 3 items requis pour émettre le bloc FAQPage). */
  faqItems?: FormationMetierFaqItem[];
  /**
   * Fil d'Ariane personnalisé. Si omis, utilise par défaut :
   * Accueil → Formations → {metierLabel}.
   */
  breadcrumbItems?: FormationMetierBreadcrumbItem[];
  /** id HTML du <script> (utile si plusieurs blocs sur une même page). */
  scriptId?: string;
};

/** Date d'expiration de la certification Qualiopi (action de formation). */
const QUALIOPI_VALID_UNTIL = '2028-01-31';

const SITE_BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

const ORGANIZATION_ID = `${SITE_BASE}/#organization`;
const PERSON_LAURE_ID = `${SITE_BASE}/#person`;

function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_BASE}${normalized}`;
}

function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildPersonLaureNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_LAURE_ID,
    name: 'Laure Olivié',
    jobTitle: 'Formatrice IA pour les pro du BTP',
    url: `${SITE_BASE}/a-propos`,
    worksFor: { '@id': ORGANIZATION_ID },
    sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
  };
}

function buildOrganizationNode() {
  return {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': ORGANIZATION_ID,
    name: "OFC Création d'Entreprise",
    legalName: "OFC Création d'Entreprise SASU",
    url: SITE_BASE,
    logo: {
      '@type': 'ImageObject',
      url: schemaLogoUrl(),
    },
    email: SCHEMA_CONTACT.email,
    vatID: SCHEMA_CONTACT.vatId,
    taxID: SCHEMA_CONTACT.siretFormatted,
    founder: { '@id': PERSON_LAURE_ID },
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'SIRET',
        value: SCHEMA_CONTACT.siretFormatted,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'NDA',
        value: SCHEMA_CONTACT.nda,
        description:
          "Numéro de Déclaration d'Activité enregistré auprès de la DREETS Île-de-France",
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      postalCode: SCHEMA_GEO.postalCode,
      addressLocality: SCHEMA_GEO.addressLocality,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certification Qualiopi — Actions de formation',
      credentialCategory: 'Certification qualité',
      recognizedBy: {
        '@type': 'Organization',
        name: 'France Compétences',
        url: 'https://www.francecompetences.fr/',
      },
      validIn: { '@type': 'Country', name: 'France' },
      validUntil: QUALIOPI_VALID_UNTIL,
    },
    sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
  };
}

function buildServiceNode(params: {
  pageUrl: string;
  metierLabel: string;
  courseName: string;
  courseDescription: string;
  price: number;
}) {
  const { pageUrl, metierLabel, courseName, courseDescription, price } = params;
  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    serviceType: 'Professional Training',
    name: courseName,
    description: courseDescription,
    url: pageUrl,
    category: `Formation IA pour le BTP — ${metierLabel}`,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: `Entreprises BTP — ${metierLabel}`,
    },
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: String(price),
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false,
      },
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('schema-formation-metier-service-offer'),
      eligibleRegion: { '@type': 'Country', name: 'France' },
    },
  };
}

function buildCourseNode(params: {
  pageUrl: string;
  courseName: string;
  courseDescription: string;
  duration: string;
  price: number;
  level: string;
  teaches?: string[];
}) {
  const { pageUrl, courseName, courseDescription, duration, price, level, teaches } = params;
  return {
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: courseName,
    description: courseDescription,
    url: pageUrl,
    provider: { '@id': ORGANIZATION_ID },
    instructor: { '@id': PERSON_LAURE_ID },
    educationalLevel: level,
    inLanguage: 'fr',
    ...(teaches && teaches.length > 0 ? { teaches } : {}),
    isAccessibleForFree: false,
    creditsAwarded: 'Attestation de formation Qualiopi',
    timeRequired: duration,
    aggregateRating: buildSchemaAggregateRating(),
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('schema-formation-metier-course-offer'),
      category: 'Formation professionnelle continue',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['Onsite'],
      courseWorkload: duration,
      inLanguage: 'fr',
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
  };
}

function buildBreadcrumbNode(params: {
  pageUrl: string;
  items: FormationMetierBreadcrumbItem[];
}) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${params.pageUrl}#breadcrumb`,
    itemListElement: params.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

function buildFaqNode(params: { pageUrl: string; faqItems: FormationMetierFaqItem[] }) {
  const cleaned = params.faqItems
    .map(({ question, answer }) => ({
      question: question.trim(),
      answer: stripHtml(answer),
    }))
    .filter((it) => it.question.length > 0 && it.answer.length > 0)
    .slice(0, 10);

  if (cleaned.length < 3) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${params.pageUrl}#faq`,
    mainEntity: cleaned.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
}

export function FormationMetierJsonLd({
  metierLabel,
  path,
  courseName,
  courseDescription,
  duration,
  price,
  level = 'Intermediate',
  teaches,
  faqItems,
  breadcrumbItems,
  scriptId,
}: Props) {
  const pageUrl = absoluteUrl(path);

  const breadcrumb = breadcrumbItems ?? [
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/formations' },
    { name: metierLabel, path },
  ];

  const graph: object[] = [
    buildOrganizationNode(),
    buildPersonLaureNode(),
    buildServiceNode({ pageUrl, metierLabel, courseName, courseDescription, price }),
    buildCourseNode({ pageUrl, courseName, courseDescription, duration, price, level, teaches }),
    buildBreadcrumbNode({ pageUrl, items: breadcrumb }),
  ];

  if (faqItems && faqItems.length >= 3) {
    const faqNode = buildFaqNode({ pageUrl, faqItems });
    if (faqNode) graph.push(faqNode);
  }

  const payload = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      id={scriptId ?? `schema-formation-metier-${metierLabel.toLowerCase()}`}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD statique généré côté serveur
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
