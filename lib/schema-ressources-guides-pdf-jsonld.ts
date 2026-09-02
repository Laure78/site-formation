/**
 * JSON-LD ItemList — section `#guides-pdf` uniquement.
 * Données depuis `lib/ressources-guides.ts` (pas de dates inventées).
 */
import { getGuidesLibraryEntries } from '@/lib/ressources-guides';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_ORGANIZATION_OFC } from '@/lib/schema-constants';
import { SITE_CONFIG } from '@/lib/seo';

const SITE_BASE = SITE_CONFIG.url.replace(/\/$/, '');
const SECTION_URL = `${SITE_BASE}${LINKS.ressources}#guides-pdf`;

export function buildGuidesPdfItemListJsonLd(): Record<string, unknown> {
  const guides = getGuidesLibraryEntries();

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SECTION_URL}-itemlist`,
    name: 'Guides & outils gratuits pour les professionnels du BTP',
    description:
      'Bibliothèque de guides PDF et fichier Excel de prompts IA pour les métiers du BTP — gratuits, sans inscription.',
    url: SECTION_URL,
    numberOfItems: guides.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: guides.map((guide, index) => {
      const pageUrl = `${SITE_BASE}${guide.href}`;
      const fileUrl = `${SITE_BASE}${guide.pdfHref}`;
      const encodingFormat =
        guide.fileKind === 'excel'
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'application/pdf';

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: guide.title,
          description: guide.promise,
          url: pageUrl,
          encodingFormat,
          inLanguage: 'fr-FR',
          isAccessibleForFree: true,
          author: SCHEMA_ORGANIZATION_OFC,
          publisher: SCHEMA_ORGANIZATION_OFC,
          about: guide.categoryLabel,
          audience: {
            '@type': 'Audience',
            audienceType: guide.audience,
          },
          associatedMedia: {
            '@type': 'MediaObject',
            contentUrl: fileUrl,
            encodingFormat,
          },
        },
      };
    }),
  };
}
