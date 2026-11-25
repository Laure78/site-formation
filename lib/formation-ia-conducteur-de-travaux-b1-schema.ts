/**
 * JSON-LD B1 — landing conducteur de travaux (`@graph` Course + FAQ + Breadcrumb).
 */
import { formationTimeRequiredIso } from '@/data/formations';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import {
  contentUpdatedAtToSchemaIso,
  getPillarPageContentUpdatedAt,
} from '@/lib/content-updated-at';
import { conducteurLandingEnBref, CONDUCTEUR_LANDING_FAQ } from '@/lib/formation-ia-conducteur-de-travaux-b1-content';
import {
  FORMATION_IA_CONDUCTEUR_B1_DESCRIPTION,
  FORMATION_IA_CONDUCTEUR_B1_H1,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
} from '@/lib/formation-ia-conducteur-de-travaux-landing';
import { LINKS } from '@/lib/internal-links';
import {
  FORMATION_COURSE_OFFER_CATEGORY,
  buildFormationFicheCourseNode,
} from '@/lib/schema-formation-course-jsonld';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import { TARIF_PARTICIPANT_NIV03_HT } from '@/lib/tarifs-catalogue-participant';

const COURSE_SCHEMA_TEACHES = [
  'Comptes rendus de chantier avec l’IA',
  'PPSPS et documents QSE assistés',
  'Courriers et emails MOA/MOE',
  'Synthèse CCTP et suivi réserves',
  'DOE et tableaux de suivi chantier',
] as const;

function stripJsonLdContext(node: Record<string, unknown>): Record<string, unknown> {
  const { '@context': _ctx, ...rest } = node;
  return rest;
}

export function buildFormationIaConducteurDeTravauxB1JsonLdGraph(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const dateModified = contentUpdatedAtToSchemaIso(
    getPillarPageContentUpdatedAt(FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH),
  );

  const courseDurationIso = formationTimeRequiredIso('NIV-03');
  const course: Record<string, unknown> = {
    ...buildFormationFicheCourseNode({
      name: FORMATION_IA_CONDUCTEUR_B1_H1,
      description: conducteurLandingEnBref(),
      path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
      courseCode: 'NIV-03',
      timeRequired: courseDurationIso,
      instructorName: SCHEMA_PERSON_LAURE.name,
      teaches: [...COURSE_SCHEMA_TEACHES],
      keywords:
        'formation IA conducteur de travaux, bâtiment, construction, ChatGPT, Claude AI, suivi chantier, Île-de-France',
    }),
    dateModified,
    provider: {
      '@id': `${base}/#organization`,
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
      url: `${base}/a-propos`,
      sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Conducteurs de travaux',
    },
    offers: {
      '@type': 'Offer',
      price: String(TARIF_PARTICIPANT_NIV03_HT),
      priceCurrency: 'EUR',
      category: FORMATION_COURSE_OFFER_CATEGORY,
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('formation-ia-conducteur-de-travaux-schema-offer'),
    },
  };

  const faqSchema = getFAQSchema([...CONDUCTEUR_LANDING_FAQ]);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: LINKS.home },
    { name: 'Formations', path: LINKS.formations },
    { name: 'Formation IA conducteur de travaux', path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH },
  ]);

  const graph: Record<string, unknown>[] = [course];
  if (faqSchema) {
    graph.push(stripJsonLdContext(faqSchema as Record<string, unknown>));
  }
  if (breadcrumbSchema) {
    graph.push(stripJsonLdContext(breadcrumbSchema as Record<string, unknown>));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}