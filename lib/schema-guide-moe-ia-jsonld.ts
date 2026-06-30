import { SITE_CONFIG } from '@/lib/seo';
import {
  FAQ_GUIDE_MOE_IA,
  GUIDE_MOE_IA_H1,
  GUIDE_MOE_IA_PATH,
  METHODE_MOE_5_ETAPES,
} from '@/lib/guide-moe-ia-content';
import {
  SCHEMA_CONTACT,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';

export function buildGuideMoeIaUnifiedGraphJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const pageUrl = `${base}${GUIDE_MOE_IA_PATH}`;
  const orgId = `${base}/#organization`;
  const personId = `${base}/#laure-olivie`;
  const articleId = `${pageUrl}#article`;
  const courseId = `${pageUrl}#course-moe-ia`;
  const howToId = `${pageUrl}#howto-methode`;
  const faqId = `${pageUrl}#faq`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const description =
    'Guide gratuit : les 12 missions de maîtrise d\'œuvre classées IA / mixte / humain, limites, checklist et méthode pour créer ses skills Claude.';

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
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi — Actions de formation',
          credentialCategory: 'Certification qualité organisme de formation',
        },
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
        '@type': 'Course',
        '@id': courseId,
        name: 'Formation Maître d\'Œuvre × IA',
        description:
          'Formation IA pour maîtres d\'œuvre, BET et conducteurs : skills Claude, missions MOE classées IA/mixte/humain, présentiel Qualiopi Île-de-France.',
        provider: { '@id': orgId },
        instructor: { '@id': personId },
        inLanguage: 'fr-FR',
        url: `${base}${LINKS.formationIaMaitriseOeuvre}`,
        hasCourseInstance: [
          { '@type': 'CourseInstance', courseMode: 'onsite', inLanguage: 'fr-FR' },
          { '@type': 'CourseInstance', courseMode: 'online', inLanguage: 'fr-FR' },
        ],
      },
      {
        '@type': 'Article',
        '@id': articleId,
        headline: GUIDE_MOE_IA_H1,
        description,
        url: pageUrl,
        inLanguage: 'fr-FR',
        author: { '@id': personId },
        publisher: { '@id': orgId },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      },
      {
        '@type': 'HowTo',
        '@id': howToId,
        name: 'Méthode en 5 étapes — skills Claude pour la maîtrise d\'œuvre',
        description: 'Activer Skills, rassembler la matière, lancer le prompt, affiner, tester sur un vrai dossier.',
        totalTime: 'PT45M',
        step: METHODE_MOE_5_ETAPES.map((s) => ({
          '@type': 'HowToStep',
          position: s.position,
          name: s.name,
          text: s.text,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': faqId,
        mainEntity: FAQ_GUIDE_MOE_IA.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: base },
          { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${base}${LINKS.ressources}` },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Guide Maître d\'Œuvre × IA',
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
