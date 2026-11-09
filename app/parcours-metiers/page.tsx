import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { ParcoursMetiersPage as ParcoursMetiersPageContent } from '@/components/formations/ParcoursMetiersPage';
import { createPageMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { PARCOURS_METIERS_HERO } from '@/lib/parcours-metiers-page-content';
import {
  parcoursMetiersHubDescription,
  parcoursMetiersHubTitle,
} from '@/lib/catalogue-2027/parcours-seo-metadata';
import { getParcoursMetiersPublicsOrdered } from '@/lib/parcours-metiers-public';
import { buildParcoursMetiersHubItemListJsonLd } from '@/lib/schema-parcours-metiers-jsonld';
export const revalidate = 3600;

const META_TITLE = parcoursMetiersHubTitle();
const META_DESCRIPTION = parcoursMetiersHubDescription();

export const metadata: Metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.parcoursMetiers,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
});

function getParcoursMetiersJsonLd() {
  const pageUrl = `${SITE_CONFIG.url}${LINKS.parcoursMetiers}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: PARCOURS_METIERS_HERO.h1,
        headline: PARCOURS_METIERS_HERO.h1,
        description: META_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_CONFIG.url}#website` },
      },
      getBreadcrumbSchema([
        { name: 'Accueil', path: LINKS.home },
        { name: 'Parcours métiers', path: LINKS.parcoursMetiers },
      ]),
    ],
  };
}

export default function ParcoursMetiersPage() {
  const parcours = getParcoursMetiersPublicsOrdered();
  const itemList = buildParcoursMetiersHubItemListJsonLd(parcours);
  const base = SITE_CONFIG.url.replace(/\/$/, '');

  return (
    <>
      <JsonLd id="schema-parcours-metiers" schema={getParcoursMetiersJsonLd()} />
      <JsonLd id="schema-parcours-metiers-itemlist" schema={itemList} />
      <BreadcrumbJsonLd
        id="schema-breadcrumb-parcours-metiers"
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'Parcours métiers', url: `${base}${LINKS.parcoursMetiers}` },
        ]}
      />
      <ParcoursMetiersPageContent />
    </>
  );
}
