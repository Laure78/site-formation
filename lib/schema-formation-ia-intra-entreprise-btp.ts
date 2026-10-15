/**
 * JSON-LD — page formation IA intra-entreprise BTP.
 * WebPage + BreadcrumbList + FAQPage (pas de Course daté ni d’offre tarifaire inventée).
 */
import {
  INTRA_FAQ,
  INTRA_META,
  INTRA_PATH,
} from '@/lib/formation-ia-intra-entreprise-btp-content';
import { getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${INTRA_PATH}`;
const ORG_ID = `${BASE}/#organization`;
const PERSON_ID = `${BASE}/#laure-olivie`;

export function getFormationIaIntraEntrepriseBtpJsonLd(): Record<string, unknown> {
  const faq = getFAQSchema([...INTRA_FAQ]);
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/formations' },
    { name: 'Formation IA intra-entreprise BTP', path: INTRA_PATH },
  ]);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: INTRA_META.title,
      description: INTRA_META.description,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${BASE}/#website` },
      about: [
        { '@type': 'Thing', name: 'Formation IA intra-entreprise BTP' },
        { '@type': 'Thing', name: 'Formation IA pour le BTP' },
      ],
      mainEntity: {
        '@type': 'Service',
        name: 'Formation IA intra-entreprise pour le BTP',
        description: INTRA_META.description,
        provider: { '@id': ORG_ID },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Île-de-France',
        },
        audience: {
          '@type': 'Audience',
          audienceType:
            'Dirigeants PME du BTP, RH, conducteurs de travaux, chargés d’affaires, bureaux d’études',
        },
      },
      author: { '@id': PERSON_ID },
    },
    breadcrumb,
  ];

  if (faq) graph.push(faq);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
