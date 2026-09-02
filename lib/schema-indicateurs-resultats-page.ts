/**
 * JSON-LD — page /indicateurs-resultats (WebPage + AggregateRating aligné sur la source unique).
 * Pas de Dataset artificiel : seule la satisfaction consolidée est publiée.
 */
import {
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { indicateursResultats } from '@/lib/data/indicateurs-resultats';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}${LINKS.indicateursResultats}`;

export const INDICATEURS_RESULTATS_PAGE_TITLE =
  'Indicateurs de résultats des formations | OFC';

export const INDICATEURS_RESULTATS_PAGE_DESCRIPTION =
  'Consultez les résultats des formations OFC : satisfaction à chaud, méthode de calcul, période et périmètre.';

export function getIndicateursResultatsPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: INDICATEURS_RESULTATS_PAGE_TITLE,
        description: INDICATEURS_RESULTATS_PAGE_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
        dateModified: indicateursResultats.lastCalculatedAt,
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${PAGE_URL}#org`,
        name: SCHEMA_ORGANIZATION_OFC.name,
        url: BASE,
        aggregateRating: buildSchemaAggregateRating(),
      },
    ],
  };
}
