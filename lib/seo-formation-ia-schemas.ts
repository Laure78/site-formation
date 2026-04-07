import { SITE_CONFIG, getCourseSchema, getOrganizationSchema, getLocalBusinessSchema } from '@/lib/seo';

const DEPTS_IDF = [
  'Paris (75)',
  'Seine-et-Marne (77)',
  'Yvelines (78)',
  'Essonne (91)',
  'Hauts-de-Seine (92)',
  'Seine-Saint-Denis (93)',
  'Val-de-Marne (94)',
  "Val-d'Oise (95)",
];

/** Course + enseignement explicite ChatGPT / Claude AI */
export function buildFormationIaCourseJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return getCourseSchema({
    name: opts.name,
    description: opts.description,
    path: opts.path,
    providerName: SITE_CONFIG.legalName,
    instructorName: SITE_CONFIG.name,
    teaches: [
      'ChatGPT',
      'Claude AI',
      'Formation IA BTP',
      'Rédaction de devis et mémoires techniques',
      'Automatisation administrative chantier',
    ],
    areaServed: opts.areaServed ?? ['Île-de-France', 'France'],
    educationalLevel: 'Professionnel',
  });
}

/** LocalBusiness renforcé : zone Île-de-France + note agrégée */
export function buildFormationIaLocalBusinessJsonLd() {
  const base = getLocalBusinessSchema() as Record<string, unknown>;
  return {
    ...base,
    name: `${SITE_CONFIG.legalName} — ${SITE_CONFIG.name}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.85,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 1592,
      reviewCount: 1592,
    },
    areaServed: [
      { '@type': 'City', name: 'Paris' },
      ...DEPTS_IDF.map((d) => ({ '@type': 'State', name: d })),
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'Country', name: 'France' },
    ],
  };
}

/** Organisation certifiée Qualiopi (schéma déjà porté par getOrganizationSchema) */
export function buildEducationalOrgSnippetJsonLd() {
  return getOrganizationSchema();
}
