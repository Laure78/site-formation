/**
 * JSON-LD — page pilier parcours applications métier BTP.
 */
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { APPLICATION_METIER_NIVEAUX, PARCOURS_APPLICATIONS_METIER } from '@/lib/parcours-applications-metier-btp-content';
import { TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT } from '@/lib/tarifs-applications-metier-btp';

export function buildParcoursApplicationsMetierJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const url = `${base}${LINKS.parcoursApplicationsMetierBtp}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    name: PARCOURS_APPLICATIONS_METIER.h1,
    description: PARCOURS_APPLICATIONS_METIER.metaDescription,
    url,
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      price: String(TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT),
      priceCurrency: 'EUR',
      url,
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: APPLICATION_METIER_NIVEAUX.map((n) => ({
      '@type': 'CourseInstance',
      name: n.h1,
      url: `${base}${n.path}`,
      courseMode: 'onsite',
      duration: 'PT7H',
    })),
    timeRequired: 'PT21H',
    inLanguage: 'fr-FR',
    educationalCredentialAwarded: 'Certificat de réalisation',
  };
}
