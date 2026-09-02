/**
 * JSON-LD @graph — page `/formations`.
 * ItemList pointe vers les fiches canoniques (Course complets sur chaque URL).
 * Pas d’offre « sur demande », pas de durée unique inventée, FAQ = contenu visible.
 */
import { getFaqCataloguePage } from '@/lib/faq';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { getFAQSchema } from '@/lib/seo';
import { getFormationsCatalogue } from '@/lib/formations-catalogue-display';
import {
  CATALOGUE_PAGE_TITLE,
  getCataloguePageMetaDescriptionShort,
} from '@/lib/formations-catalogue-page-config';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';
import { FINANCEMENT_FORMULATION_CATALOGUE } from '@/lib/financement-copy';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

export function buildFormationsPageUnifiedGraphJsonLd(at: Date = new Date()): Record<string, unknown> {
  const catalogue = getFormationsCatalogue(at);
  const count = catalogue.length;
  const faqSchema = getFAQSchema([...getFaqCataloguePage(at)]);
  const metaDescription = getCataloguePageMetaDescriptionShort(at);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE}/formations#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: BASE,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Catalogue formations',
          item: `${BASE}/formations`,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE}/formations#webpage`,
      url: `${BASE}/formations`,
      name: CATALOGUE_PAGE_TITLE,
      description: metaDescription,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${BASE}/#organization` },
      breadcrumb: { '@id': `${BASE}/formations#breadcrumb` },
      mainEntity: { '@id': `${BASE}/formations#course-list` },
      dateModified: getPillarPageContentUpdatedAt('/formations'),
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE}/formations#course-list`,
      name: `Catalogue ${count} formations IA pour le BTP`,
      description: `Catalogue d’orientation — ${count} formations publiées. ${PERIMETRE_FORMATIONS_COURT}. ${FINANCEMENT_FORMULATION_CATALOGUE}`,
      numberOfItems: count,
      itemListElement: catalogue.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.title,
        url: `${BASE}${entry.href}`,
        item: {
          '@type': 'Course',
          '@id': `${BASE}${entry.href}#course`,
          name: entry.title,
          url: `${BASE}${entry.href}`,
          courseCode: entry.ref,
          provider: { '@id': `${BASE}/#organization` },
        },
      })),
    },
  ];

  if (faqSchema) {
    const faqRest = { ...(faqSchema as Record<string, unknown>) };
    delete faqRest['@context'];
    graph.push({
      ...faqRest,
      '@id': `${BASE}/formations#faq`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
