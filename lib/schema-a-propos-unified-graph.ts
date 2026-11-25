/**
 * JSON-LD @graph — page /a-propos (AboutPage + FAQPage).
 * Organization (#organization) : layout racine uniquement.
 */

import {
  contentUpdatedAtToSchemaIso,
  getPillarPageContentUpdatedAt,
} from '@/lib/content-updated-at';
import { FAQ_A_PROPOS_PAGE, A_PROPOS_PAGE_H1 } from '@/lib/a-propos-page-config';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { getFAQSchema } from '@/lib/seo';
import { siteSchemaOrganizationId, siteSchemaPersonId } from '@/lib/site-config';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_PATH = '/a-propos';
const PAGE_URL = `${BASE}${PAGE_PATH}`;
const PERSON_ID = siteSchemaPersonId(BASE);
const ORGANIZATION_ID = siteSchemaOrganizationId(BASE);
const ABOUT_PAGE_ID = `${PAGE_URL}#aboutpage`;

const FAQ_COMPLET = FAQ_A_PROPOS_PAGE;

function stripAtContext(obj: Record<string, unknown>): Record<string, unknown> {
  const rest = { ...obj };
  delete rest['@context'];
  return rest;
}

export function getAProposUnifiedJsonLd(): Record<string, unknown> {
  const faqRaw = getFAQSchema(FAQ_COMPLET);
  if (!faqRaw) throw new Error('FAQ À propos : schéma invalide');
  const faq = stripAtContext(faqRaw as Record<string, unknown>);
  faq['@id'] = `${PAGE_URL}#faq`;

  const aboutPage: Record<string, unknown> = {
    '@type': 'AboutPage',
    '@id': ABOUT_PAGE_ID,
    url: PAGE_URL,
    name: A_PROPOS_PAGE_H1,
    inLanguage: 'fr-FR',
    dateModified: contentUpdatedAtToSchemaIso(getPillarPageContentUpdatedAt('/a-propos')),
    mainEntity: { '@id': ORGANIZATION_ID },
    about: { '@id': ORGANIZATION_ID },
    founder: { '@id': PERSON_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#a-propos-en-bref', '#specialisation-title', '#equipe-title'],
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [aboutPage, faq],
  };
}