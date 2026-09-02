/**
 * JSON-LD — page /partenaires (WebPage + ItemList neutre, sans affiliation non prouvée).
 */
import {
  PARTENAIRES_PAGE_H1,
  PARTENAIRES_PAGE_META_DESCRIPTION,
  PARTENAIRES_REFERENCES,
} from '@/lib/partenaires-references-config';
import { SITE_CONFIG, getArticleSchema } from '@/lib/seo';

const PATH = '/partenaires' as const;

function stripJsonLdContext<T extends Record<string, unknown>>(obj: T): Omit<T, '@context'> {
  const { ['@context']: _c, ...rest } = obj;
  return rest as Omit<T, '@context'>;
}

export function getPartenairesPageJsonLd(): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const pageUrl = `${base}${PATH}`;

  const articleRaw = getArticleSchema({
    headline: PARTENAIRES_PAGE_H1,
    description: PARTENAIRES_PAGE_META_DESCRIPTION,
    path: PATH,
    datePublished: '2024-01-15',
    dateModified: '2026-09-02',
    authorName: SITE_CONFIG.name,
    image: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
  });
  const webPage = stripJsonLdContext(articleRaw as Record<string, unknown>);
  webPage['@type'] = 'WebPage';
  webPage['@id'] = `${pageUrl}#webpage`;

  const itemList: Record<string, unknown> = {
    '@type': 'ItemList',
    '@id': `${pageUrl}#references`,
    name: 'Réseaux et organismes — références de formation IA BTP',
    description: PARTENAIRES_PAGE_META_DESCRIPTION,
    numberOfItems: PARTENAIRES_REFERENCES.length,
    itemListElement: [...PARTENAIRES_REFERENCES]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((ref, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: ref.name,
        url: ref.proofUrl ? `${base}${ref.proofUrl}` : ref.officialUrl,
        description: ref.interventionSummary,
      })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, itemList],
  };
}
