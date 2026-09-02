/**
 * JSON-LD hub `/ressources` — CollectionPage + ItemList + BreadcrumbList.
 * Alimenté par `lib/ressources-catalog.ts` (source unique avec les cartes).
 */
import { LINKS } from '@/lib/internal-links';
import {
  getRessourcesCatalog,
  getRessourceEncodingFormat,
  RESSOURCES_HUB_H1,
} from '@/lib/ressources-catalog';
import { SCHEMA_ORGANIZATION_OFC } from '@/lib/schema-constants';
import { SITE_CONFIG } from '@/lib/seo';

const SITE_BASE = SITE_CONFIG.url.replace(/\/$/, '');
const PATH = LINKS.ressources;
const CANONICAL = `${SITE_BASE}${PATH}`;

function schemaTypeForResource(resourceType: string): string {
  switch (resourceType) {
    case 'tutoriel':
      return 'LearningResource';
    case 'guide':
    case 'modele-fichier':
      return 'DigitalDocument';
    case 'skill':
      return 'CreativeWork';
    case 'outil':
    case 'article':
    default:
      return 'CreativeWork';
  }
}

export function buildRessourcesHubJsonLd(): Record<string, unknown> {
  const catalog = getRessourcesCatalog();

  const itemListElement = catalog.map((entry, index) => {
    const url = entry.external ? entry.viewUrl : `${SITE_BASE}${entry.viewUrl}`;
    const encodingFormat = getRessourceEncodingFormat(entry.format);
    const schemaType = schemaTypeForResource(entry.resourceType);

    const item: Record<string, unknown> = {
      '@type': schemaType,
      name: entry.title,
      description: entry.shortDescription,
      url,
      inLanguage: 'fr-FR',
      author: SCHEMA_ORGANIZATION_OFC,
      isAccessibleForFree: entry.isFree,
    };

    if (encodingFormat) item.encodingFormat = encodingFormat;
    if (entry.publishedAt) item.datePublished = entry.publishedAt;
    if (entry.updatedAt) item.dateModified = entry.updatedAt;

    return {
      '@type': 'ListItem',
      position: index + 1,
      item,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${CANONICAL}#collection`,
        name: RESSOURCES_HUB_H1,
        description:
          'Guides, tutoriels, prompts et outils gratuits pour utiliser l’IA dans le BTP : DCE, mémoire technique, chantier, PPSPS, DOE et productivité.',
        url: CANONICAL,
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', name: 'laureolivie.fr', url: SITE_CONFIG.url },
        publisher: SCHEMA_ORGANIZATION_OFC,
        mainEntity: {
          '@type': 'ItemList',
          '@id': `${CANONICAL}#itemlist`,
          name: 'Bibliothèque ressources IA BTP',
          itemListOrder: 'https://schema.org/ItemListUnordered',
          numberOfItems: catalog.length,
          itemListElement,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${CANONICAL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: SITE_BASE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ressources',
            item: CANONICAL,
          },
        ],
      },
      SCHEMA_ORGANIZATION_OFC,
    ],
  };
}
