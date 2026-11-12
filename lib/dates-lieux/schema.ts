import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_GEO } from '@/lib/schema-constants';
import type { DatesLieuxSessionRow } from '@/lib/dates-lieux/types';
import { formationTimeRequiredIso } from '@/data/formations';

const base = SITE_CONFIG.url.replace(/\/$/, '');

export function buildDatesLieuxBreadcrumbJsonLd() {
  return {
    '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}${LINKS.home}` },
    { '@type': 'ListItem', position: 2, name: 'Dates et lieux', item: `${base}${LINKS.datesEtLieux}` },
  ],
  };
}

/** CourseInstance uniquement pour les sessions réellement confirmées (ops ou LMS daté). */
export function buildDatesLieuxCourseInstancesJsonLd(sessions: readonly DatesLieuxSessionRow[]) {
  if (!sessions.length) return null;

  const instances = sessions
    .filter((s) => !s.isFull)
    .map((s) => {
      const location =
        s.city || s.address
          ? {
              '@type': 'Place' as const,
              name: s.city ?? 'Île-de-France',
              address: s.address
                ? {
                    '@type': 'PostalAddress' as const,
                    streetAddress: s.address,
                    addressLocality: s.city ?? undefined,
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  }
                : undefined,
            }
          : {
              '@type': 'Place' as const,
              name: 'Île-de-France',
              address: {
                '@type': 'PostalAddress' as const,
                streetAddress: SCHEMA_GEO.streetAddress,
                addressLocality: 'Paris',
                postalCode: '75012',
                addressCountry: 'FR',
              },
            };

      return {
        '@type': 'CourseInstance' as const,
        name: s.formationTitle,
        courseMode: 'Onsite' as const,
        startDate: s.sessionDate,
        endDate: s.sessionDate,
        location,
        offers: {
          '@type': 'Offer' as const,
          price: s.tarifParticipantHt,
          priceCurrency: 'EUR',
          url: `${base}${s.formationHref}`,
        },
        workLoad: formationTimeRequiredIso(s.formationCode),
      };
    });

  if (!instances.length) return null;

  return {
    '@type': 'ItemList',
    name: 'Sessions confirmées — formations IA BTP',
    itemListElement: instances.map((inst, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: inst,
    })),
  };
}
