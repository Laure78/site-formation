/**
 * JSON-LD JobPosting — page /rejoindre-equipe.
 */
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { siteOrganizationPostalAddress } from '@/lib/schema-site-proof';
import { OFC_IDENTITE } from '@/lib/ofc-identite';

const JOB_POSTING_TITLE = 'Formateur·rice IA pour les professionnels du BTP';

export const REJOINDRE_EQUIPE_JOB_POSTING = {
  datePosted: '2026-10-24',
  validThrough: '2027-04-30',
} as const;

export function buildRejoindreEquipeJobPostingJsonLd(pageUrl: string): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: JOB_POSTING_TITLE,
    description:
      'Laure Olivié recrute des formateurs et formatrices issus du BTP pour animer des formations IA en présentiel en Île-de-France. Supports pédagogiques fournis, intégration progressive.',
    identifier: {
      '@type': 'PropertyValue',
      name: OFC_IDENTITE.raisonSociale,
      value: 'rejoindre-equipe-formateur-ia-btp-2026',
    },
    datePosted: REJOINDRE_EQUIPE_JOB_POSTING.datePosted,
    validThrough: REJOINDRE_EQUIPE_JOB_POSTING.validThrough,
    employmentType: 'CONTRACTOR',
    directApply: false,
    hiringOrganization: {
      '@type': 'Organization',
      name: OFC_IDENTITE.raisonSociale,
      url: base,
      sameAs: base,
    },
    jobLocation: {
      '@type': 'Place',
      address: siteOrganizationPostalAddress(),
    },
    url: pageUrl,
  };
}
