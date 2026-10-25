import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ParcoursMetiersOrientation } from '@/components/formations/ParcoursMetiersOrientation';
import { createPageMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { PARCOURS_METIERS_PAGE } from '@/lib/parcours-metiers-orientation';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

export const revalidate = 3600;

const META_TITLE = 'Parcours métiers — formation IA BTP';
const META_DESCRIPTION =
  'Parcours formation IA BTP par métier : dirigeant, conducteur de travaux, études de prix, MOE ou gestion. Programmes Qualiopi en présentiel Île-de-France.';

export const metadata: Metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: `${META_TITLE} | Laure Olivié`,
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
        name: PARCOURS_METIERS_PAGE.h1,
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
  if (!isParcoursMetiers2027Visible()) {
    redirect(LINKS.formations);
  }

  return (
    <>
      <JsonLd id="schema-parcours-metiers" schema={getParcoursMetiersJsonLd()} />
      <ParcoursMetiersOrientation />
    </>
  );
}
