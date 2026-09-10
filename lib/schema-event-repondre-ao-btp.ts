/**
 * JSON-LD Event — webinaire AO BTP (5 nov. 2026).
 * Réutilise les @id Organization / Person du graphe global.
 * Pas de statut EventCompleted inventé ; pas de disponibilité inventée.
 */

import { EVENEMENT_AO_BTP } from '@/lib/evenements/repondre-appel-offres-btp-5-etapes';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

export function buildEvenementAoBtpEventJsonLd(): Record<string, unknown> {
  const event = EVENEMENT_AO_BTP;
  const pageUrl = `${BASE}${event.path}`;
  const imageUrl = `${BASE}${event.image.src}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${pageUrl}#event`,
    name: event.name,
    description: event.geoSummary,
    url: pageUrl,
    image: [imageUrl],
    startDate: event.startDateIso,
    endDate: event.endDateIso,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: event.eventbriteUrl,
    },
    organizer: {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
    },
    performer: {
      '@type': 'Person',
      '@id': `${BASE}/#laure-olivie`,
    },
    offers: {
      '@type': 'Offer',
      url: event.eventbriteUrl,
      price: event.priceEur,
      priceCurrency: event.priceCurrency,
    },
    inLanguage: 'fr-FR',
    isAccessibleForFree: false,
  };
}

export function buildEvenementAoBtpBreadcrumbJsonLd(): Record<string, unknown> {
  const event = EVENEMENT_AO_BTP;
  const pageUrl = `${BASE}${event.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${BASE}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: event.shortTitle,
        item: pageUrl,
      },
    ],
  };
}
