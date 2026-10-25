import { getBarometre2026, BAROMETRE_IA_BTP_IDF_PATH } from '@/lib/barometre-2026';
import { BAROMETRE_IA_BTP_FAQ } from '@/lib/barometre-2026-faq';
import { faqAnswerPlainTextForSchema } from '@/lib/faq-plain-text';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { SCHEMA_SITE_ORG } from '@/lib/schema-site-proof';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}${BAROMETRE_IA_BTP_IDF_PATH}`;

export const BAROMETRE_PAGE_TITLE = 'Baromètre IA BTP Île-de-France 2026 | Laure Olivié';

export const BAROMETRE_PAGE_DESCRIPTION =
  'Baromètre IA BTP Île-de-France 2026 : outils déjà utilisés, tâches visées et freins (n=20, juillet 2025 – juin 2026). Données anonymisées OFC.';

export function getBarometrePageJsonLd(): Record<string, unknown> {
  const b = getBarometre2026();
  const orgId = `${BASE}/#organization`;

  const dataset = {
    '@type': 'Dataset',
    '@id': `${PAGE_URL}#dataset`,
    name: b.meta.title,
    description: `${b.meta.collectionMethod} Période : ${b.meta.periodLabel}. Géographie : ${b.meta.geography}.`,
    url: PAGE_URL,
    creator: { '@type': 'Organization', '@id': orgId, name: SCHEMA_SITE_ORG.legalName },
    datePublished: b.meta.lastUpdated,
    temporalCoverage: `${b.meta.periodStart}/${b.meta.periodEnd}`,
    spatialCoverage: { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    variableMeasured: [
      'Outils IA déjà utilisés',
      'Tâches BTP visées',
      'Freins à l’adoption',
      'Profil entreprise',
      'Fonction du répondant',
    ],
    distribution: { '@type': 'DataDownload', encodingFormat: 'text/html', contentUrl: PAGE_URL },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
  };

  const article = {
    '@type': 'Article',
    '@id': `${PAGE_URL}#article`,
    headline: 'Baromètre IA BTP Île-de-France 2026',
    description: BAROMETRE_PAGE_DESCRIPTION,
    url: PAGE_URL,
    datePublished: b.meta.lastUpdated,
    dateModified: b.meta.lastUpdated,
    author: { '@type': 'Person', '@id': `${BASE}/#laure-olivie`, name: SCHEMA_SITE_ORG.personName },
    publisher: { '@id': orgId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    about: { '@type': 'Thing', name: 'Intelligence artificielle dans le BTP' },
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    mainEntity: BAROMETRE_IA_BTP_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainTextForSchema(item.a),
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [dataset, article, faq],
  };
}
