/**
 * JSON-LD — page `/ressources/tuto-skill-pic` (Article + BreadcrumbList + FAQPage + HowTo).
 */
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_CONTACT,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import {
  TUTO_SKILL_PIC_FAQ,
  TUTO_SKILL_PIC_META,
  TUTO_SKILL_PIC_PATH,
  TUTO_SKILL_PIC_PUBLISHED_AT,
  TUTO_SKILL_PIC_STEPS,
  TUTO_SKILL_PIC_UPDATED_AT,
} from '@/lib/tuto-skill-pic-content';

export function buildTutoSkillPicJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const pageUrl = `${base}${TUTO_SKILL_PIC_PATH}`;
  const orgId = `${base}/#organization`;
  const personId = `${base}/#laure-olivie`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'EducationalOrganization'],
        '@id': orgId,
        name: SCHEMA_ORGANIZATION_OFC.name,
        legalName: SCHEMA_ORGANIZATION_OFC.legalNameSasu,
        url: base,
        logo: { '@type': 'ImageObject', url: schemaLogoUrl() },
        email: SCHEMA_CONTACT.email,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Laure Olivié',
        jobTitle: 'Formatrice IA spécialisée BTP',
        url: `${base}${LINKS.aPropos}`,
        worksFor: { '@id': orgId },
        sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: TUTO_SKILL_PIC_META.h1,
        description: TUTO_SKILL_PIC_META.description,
        url: pageUrl,
        inLanguage: 'fr-FR',
        datePublished: TUTO_SKILL_PIC_PUBLISHED_AT,
        dateModified: TUTO_SKILL_PIC_UPDATED_AT,
        author: { '@id': personId },
        publisher: { '@id': orgId },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${pageUrl}#webpage` },
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: TUTO_SKILL_PIC_META.h1,
        description: TUTO_SKILL_PIC_META.description,
        inLanguage: 'fr-FR',
        totalTime: 'PT45M',
        author: { '@id': personId },
        step: TUTO_SKILL_PIC_STEPS.map((s) => ({
          '@type': 'HowToStep',
          position: s.number,
          name: s.title,
          text: `${s.objectif} ${s.action}`,
          url: `${pageUrl}#etape-${s.number}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: base },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ressources',
            item: `${base}${LINKS.ressources}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: TUTO_SKILL_PIC_META.shortTitle,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: TUTO_SKILL_PIC_FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}
