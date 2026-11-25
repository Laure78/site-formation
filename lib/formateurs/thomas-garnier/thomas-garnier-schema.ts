import { faqAnswerPlainTextForSchema } from '@/lib/faq-plain-text';
import { contentUpdatedAtToSchemaIso, FORMATEUR_PROFILE_CONTENT_UPDATED_AT } from '@/lib/content-updated-at';
import {
  getThomasGarnierFaqItems,
  THOMAS_GARNIER_PATH,
} from '@/lib/formateurs/thomas-garnier/thomas-garnier-content';
import type { FormateurProfile } from '@/lib/formateurs/types';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const KNOWS_ABOUT = [
  'devis BTP',
  'chiffrage',
  'gestion d’affaires',
  'analyse DCE',
  'mémoires techniques',
  'appels d’offres',
] as const;

export function getThomasGarnierPageJsonLd(
  formateur: FormateurProfile,
  baseUrl: string,
): Record<string, unknown>[] {
  const base = baseUrl.replace(/\/$/, '');
  const pageUrl = `${base}${THOMAS_GARNIER_PATH}`;
  const personId = `${pageUrl}#person`;
  const profilePageId = `${pageUrl}#profilepage`;
  const orgId = `${base}/#organization`;
  const image =
    formateur.portrait.kind === 'photo' ? `${base}${formateur.portrait.src}` : undefined;
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const dateModified = contentUpdatedAtToSchemaIso(FORMATEUR_PROFILE_CONTENT_UPDATED_AT);

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: fullName,
    jobTitle: 'Formateur en devis, chiffrage et appels d’offres BTP',
    description: formateur.parcours,
    url: pageUrl,
    ...(image ? { image } : {}),
    knowsAbout: [...KNOWS_ABOUT],
    worksFor: { '@id': orgId },
  };

  const profilePage: Record<string, unknown> = {
    '@type': 'ProfilePage',
    '@id': profilePageId,
    url: pageUrl,
    name: `${fullName} — formateur chiffrage et appels d’offres BTP`,
    inLanguage: 'fr-FR',
    dateModified,
    mainEntity: { '@id': personId },
    about: { '@id': orgId },
    isPartOf: { '@id': `${base}/#website` },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Formateurs', item: `${base}/formateurs` },
      { '@type': 'ListItem', position: 3, name: fullName, item: pageUrl },
    ],
  };

  const faqItems = getThomasGarnierFaqItems();
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    isPartOf: { '@id': profilePageId },
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainTextForSchema(item.a),
      },
    })),
  };

  return [
    {
      '@context': 'https://schema.org',
      '@graph': [profilePage, person, breadcrumb, faqPage],
    },
  ];
}

/** URL canonique absolue — Open Graph. */
export function thomasGarnierCanonicalUrl(): string {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return `${base}${THOMAS_GARNIER_PATH}`;
}